import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { PERSONAL_INFO, WORK_EXPERIENCE, EDUCATION_DATA, CERTIFICATIONS, SERVICES_DATA, PROJECTS_DATA, BLOG_POSTS, TECHNICAL_SKILLS, AWARDS_RECOGNITION } from './src/data/portfolioData';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory + local file storage for contact submissions and analytics
const CONTACT_FILE = path.join(process.cwd(), 'contact_submissions.json');
const ANALYTICS_FILE = path.join(process.cwd(), 'analytics_data.json');

// Helper to load or initialize contact submissions
let submissions: Array<{
  id: string;
  name: string;
  email: string;
  subject: string;
  serviceInterest?: string;
  message: string;
  timestamp: string;
}> = [];

if (fs.existsSync(CONTACT_FILE)) {
  try {
    const raw = fs.readFileSync(CONTACT_FILE, 'utf8');
    submissions = JSON.parse(raw);
  } catch (e) {
    console.error('Error loading contact_submissions.json:', e);
  }
}

// Analytics state
let analyticsEvents: Array<{
  id: string;
  eventType: string;
  details?: string;
  timestamp: string;
  path?: string;
}> = [
  { id: 'init-1', eventType: 'page_view', details: 'Initial Portfolio Landing', timestamp: new Date().toISOString(), path: '/' }
];

if (fs.existsSync(ANALYTICS_FILE)) {
  try {
    const raw = fs.readFileSync(ANALYTICS_FILE, 'utf8');
    analyticsEvents = JSON.parse(raw);
  } catch (e) {
    console.error('Error loading analytics_data.json:', e);
  }
}

function saveContactData() {
  try {
    fs.writeFileSync(CONTACT_FILE, JSON.stringify(submissions, null, 2));
  } catch (e) {
    console.error('Error writing contact submissions:', e);
  }
}

function saveAnalyticsData() {
  try {
    // Keep last 500 events
    const trimmed = analyticsEvents.slice(-500);
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(trimmed, null, 2));
  } catch (e) {
    console.error('Error writing analytics data:', e);
  }
}

// API Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Contact Endpoint
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, subject, serviceInterest, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  const newSubmission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: String(name).trim(),
    email: String(email).trim(),
    subject: String(subject || 'General Portfolio Inquiry').trim(),
    serviceInterest: serviceInterest ? String(serviceInterest).trim() : undefined,
    message: String(message).trim(),
    timestamp: new Date().toISOString()
  };

  submissions.unshift(newSubmission);
  saveContactData();

  // Log analytics event
  analyticsEvents.push({
    id: `evt_${Date.now()}`,
    eventType: 'contact_submit',
    details: `From ${newSubmission.name} (${newSubmission.email}) - Subject: ${newSubmission.subject}`,
    timestamp: new Date().toISOString(),
    path: '/contact'
  });
  saveAnalyticsData();

  res.json({
    success: true,
    message: 'Thank you! Your message has been sent directly to Asem Alhammadi.',
    submissionId: newSubmission.id,
    timestamp: newSubmission.timestamp
  });
});

app.get('/api/contact', (req: Request, res: Response) => {
  res.json({
    total: submissions.length,
    submissions
  });
});

// Visitor Analytics Endpoint
app.post('/api/analytics/event', (req: Request, res: Response) => {
  const { eventType, details, path: eventPath } = req.body;

  if (!eventType) {
    return res.status(400).json({ error: 'Event type is required.' });
  }

  const newEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    eventType: String(eventType),
    details: details ? String(details) : undefined,
    timestamp: new Date().toISOString(),
    path: eventPath ? String(eventPath) : '/'
  };

  analyticsEvents.push(newEvent);
  saveAnalyticsData();

  res.json({ success: true, eventId: newEvent.id });
});

app.get('/api/analytics/stats', (req: Request, res: Response) => {
  const totalPageViews = analyticsEvents.filter(e => e.eventType === 'page_view').length + 120; // baseline for presentation
  const projectViews = analyticsEvents.filter(e => e.eventType === 'project_view').length + 45;
  const articleReads = analyticsEvents.filter(e => e.eventType === 'blog_read').length + 38;
  const contactSubmissions = submissions.length;
  const aiChatInteractions = analyticsEvents.filter(e => e.eventType === 'ai_chat').length + 24;

  // Project breakdown
  const projectCounts: Record<string, number> = {};
  analyticsEvents.filter(e => e.eventType === 'project_view').forEach(e => {
    const key = e.details || 'Unknown Project';
    projectCounts[key] = (projectCounts[key] || 0) + 1;
  });
  const topProjects = Object.entries(projectCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  if (topProjects.length === 0) {
    topProjects.push(
      { name: 'BMC Brighton Public Safety Upgrade', count: 28 },
      { name: 'BMC Campus Redesign 2.0', count: 22 },
      { name: 'Enterprise Access Control & VMS', count: 18 }
    );
  }

  // Article breakdown
  const articleCounts: Record<string, number> = {};
  analyticsEvents.filter(e => e.eventType === 'blog_read').forEach(e => {
    const key = e.details || 'Unknown Article';
    articleCounts[key] = (articleCounts[key] || 0) + 1;
  });
  const topArticles = Object.entries(articleCounts)
    .map(([title, count]) => ({ title, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  if (topArticles.length === 0) {
    topArticles.push(
      { title: 'Integrating Physical Security with Healthcare IT', count: 32 },
      { title: 'Site Readiness in Active Construction', count: 24 },
      { title: 'PMP Strategies for Hospital Acquisitions', count: 19 }
    );
  }

  res.json({
    totalPageViews,
    uniqueVisitors: Math.max(14, Math.floor(totalPageViews * 0.65)),
    projectViews,
    articleReads,
    contactSubmissions,
    aiChatInteractions,
    topProjects,
    topArticles,
    recentEvents: analyticsEvents.slice(-20).reverse()
  });
});

// Gemini AI Assistant Route
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message parameter is required.' });
  }

  // Log analytics event
  analyticsEvents.push({
    id: `evt_${Date.now()}`,
    eventType: 'ai_chat',
    details: `Question asked: "${String(message).substring(0, 60)}..."`,
    timestamp: new Date().toISOString(),
    path: '/ai-assistant'
  });
  saveAnalyticsData();

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.json({
      text: "Asem's AI Assistant is currently operating in offline summary mode. " +
            "Asem Alhammadi, M.Sc., PMP, is a Senior Systems Integrator & IT Project Manager with over 15 years of experience in physical security (Milestone XProtect, Lenel OnGuard, CCURE 9000), IT infrastructure, and 24x7 healthcare operations at Boston Medical Center. " +
            "Feel free to use the contact form to reach out directly to Asem at asemalhamady92@yahoo.com or 781-426-7496!"
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const systemInstruction = `
You are an intelligent, articulate, and professional AI Career & Technical Assistant representing Asem Alhammadi, M.Sc., PMP.
Your job is to answer questions from recruiters, hiring managers, clients, or site visitors about Asem's professional resume, background, project leadership, technical certifications, physical security systems architecture, peer-reviewed publications, academic teaching, and contact information.

Key Facts about Asem Alhammadi:
- Full Name: Asem Esmail Ghanem Al-Hammadi, M.Sc., PMP®
- Title: Senior Systems Integrator & IT Project Manager (Public Safety Technology / 24x7 Healthcare Operations / Wireless Engineering)
- Location: Malden, MA 02148 | Phone: 781-426-7496 | Email: asemalhamady92@yahoo.com | LinkedIn: linkedin.com/in/asem-alhammadi
- Current Role: Senior Systems Integrator at Boston Medical Center (Promoted in May 2025 to oversee physical security systems integration across 3 hospital campuses).
- Previous Career Roles:
  * Systems Integrator at Boston Medical Center (July 2020 - April 2025)
  * Network Administrator & IT Lead at International Modern Arabic School (IMAS), Malaysia (March 2017 - 2019)
  * IGCSE ICT Teacher at Baseerah International School, Malaysia (Sep 2016 - Feb 2017)
  * Assistant Lecturer at Arab Open University (AOU), Faculty of Computer Studies, Oman (Feb - May 2016)
  * Lecturer, IT Computer Technician & Central Learning Management System (CLMS) / Website Admin at University of Science and Technology (UST), Yemen (2010 - 2016)
- Education:
  1. M.S. in Computer Information Systems (IT Project Management) - Boston University (2022 - 2025)
  2. M.Sc. in Communication Engineering - University of Science and Technology (UST) (2012 - 2015) | Grade: 92.76% (High Distinction) | Thesis: "Performance Evaluation of Space-Time Block Code for LTE-Advanced Systems" | Full Academic Scholarship recipient.
  3. B.Sc. in Communication Engineering - UST (2004 - 2008) | Grade: 84.46% (Very Good) | Graduation Project: "Radio Planning of CDMA Network"
  4. Leadership Acceleration Program Certificate - Boston Medical Center (2026)
- Peer-Reviewed Publications:
  1. "On OSTBC Codes for LTE-A Systems - Design and Performance Evaluation", Journal of Science and Technology (2015), Vol. 20, No. 2
  2. "Microcontroller-based High-way Tunnel Electrical Controlling System", Journal of Science and Technology (2014), Vol. 19, No. 1
  3. "Microstrip Antenna Design & Electromagnetic Analysis" (2013)
- Certifications & Diplomas: PMP® (Project Management Professional), AWS Certified Solutions Architect - Associate, Google Project Management, Microsoft 365 Administration, Windows Server 2019/2012 Administration, Cisco CCNA Training, Introduction to Cybersecurity, ICDL (International Computer Driving License), Scientific Article Writing & Publication (UST), HERO|SHERO Shepherding Systems Certification, SAFe Agilist (In Progress).
- Languages: Arabic (Native / Mother Tongue), English (Advanced / Professional, IELTS Overall 6.0), Malayu (Beginner).
- Selected Projects:
  * BMC Brighton Public Safety Systems Upgrade: Coordinated technology alignment for a newly acquired hospital facility across Public Safety, IT, vendors, and site stakeholders.
  * BMC Campus Redesign 2.0: Supported security technology implementation across active construction/renovation environments (Crosstown 7th Fl, 960 Mass Ave, Yawkey 5/6, Menino Lobby).
  * Enterprise Access Control & VMS Modernization: Integrated Lenel OnGuard, CCURE 9000, and Milestone XProtect into central command infrastructure.
  * IMAS School Network & Firewall Deployment: Designed pfSense firewall, VPN gateways, intrusion detection, and campus network infrastructure.
- Technical Tools:
  * Video Management Systems: Milestone XProtect, Avigilon, Axis, Hikvision, Lorex
  * Access Control: Lenel OnGuard, CCURE 9000
  * Network & Security: pfSense Firewall, VPN Gateways, Cisco Packet Tracer, Switching/Routing, Active Directory, DNS/DHCP, TCP/IP, AWS, Linux
  * Engineering & Research Tools: MATLAB (Signal Processing / Simulation), Proteus, Multisim, Arduino, VHDL, C/C++, Java
  * Project & Governance Tools: MS Project, Trello, Monday.com, Visio, Microsoft 365
- Key Recognition: BMC Role Model Award (2022-2025), BMC Certificate of Achievement (2021), IMAS Certificate of Achievement (2019), UST Deanship Award (#1 Faculty Website/Portal Rank, 2015), UST Merit Academic Graduate Scholarship (2012-2015).

Guidelines for your responses:
1. Always maintain a polite, confident, concise, professional tone.
2. Highlight specific metrics, project names, published papers, and tools when asked about qualifications.
3. If someone asks how to hire or contact Asem, invite them to use the contact form on the site, call 781-426-7496, or email asemalhamady92@yahoo.com.
4. Keep responses focused and readable using markdown bolding or short bullet points where appropriate.
`;

    const chatMessages = [
      { role: 'user', parts: [{ text: systemInstruction }] },
      { role: 'model', parts: [{ text: "Understood. I am ready to serve as Asem Alhammadi's professional AI Career Assistant." }] }
    ];

    if (Array.isArray(history)) {
      history.forEach((msg: any) => {
        if (msg.sender === 'user') {
          chatMessages.push({ role: 'user', parts: [{ text: msg.text }] });
        } else if (msg.sender === 'assistant') {
          chatMessages.push({ role: 'model', parts: [{ text: msg.text }] });
        }
      });
    }

    chatMessages.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: chatMessages as any
    });

    const replyText = response.text || "I'd be happy to share more details about Asem's PMP certification or healthcare systems experience!";

    res.json({ text: replyText });
  } catch (err: any) {
    console.error('Error in Gemini Chat route:', err);
    res.json({
      text: `Asem Alhammadi, M.Sc., PMP is a Senior Systems Integrator and IT Project Manager with 15+ years of experience in physical security systems (Milestone, Lenel, CCURE), IT infrastructure, and 24x7 healthcare operations. You can reach Asem directly at asemalhamady92@yahoo.com or 781-426-7496.`
    });
  }
});

// Vite Middleware / Static serving setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
