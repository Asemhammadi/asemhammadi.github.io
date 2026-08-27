import { useState, useRef } from 'react';
import { FileText, Copy, Check, X, Printer } from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCE, EDUCATION_DATA, CERTIFICATIONS, TECHNICAL_SKILLS } from '../data/portfolioData';
import { useModalA11y } from '../hooks/useModalA11y';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useModalA11y(isOpen, onClose, panelRef);

  if (!isOpen) return null;

  const handleCopyResumeText = () => {
    const text = `
ASEM ALHAMMADI, M.Sc., PMP®
${PERSONAL_INFO.location} | ${PERSONAL_INFO.email} | ${PERSONAL_INFO.linkedin}

${PERSONAL_INFO.title}
${PERSONAL_INFO.summary}

PROFESSIONAL EXPERIENCE:
${WORK_EXPERIENCE.map(w => `
- ${w.role} | ${w.company} (${w.period})
  ${w.description}
  Key Highlights:
  ${w.highlights.map(h => `  * ${h}`).join('\n')}
`).join('\n')}

EDUCATION:
${EDUCATION_DATA.map(e => `- ${e.degree} in ${e.field}, ${e.institution} (${e.year})`).join('\n')}

CERTIFICATIONS:
${CERTIFICATIONS.map(c => `- ${c.name} (${c.issuer})`).join('\n')}

TECHNICAL TOOLS:
${TECHNICAL_SKILLS.map(s => `${s.name}`).join(' | ')}
`;

    navigator.clipboard.writeText(text.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn print:p-0 print:bg-white print:static"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="modal-panel bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative print:border-none print:shadow-none print:max-h-none print:w-full"
      >

        {/* Header Controls */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 id="resume-modal-title" className="text-base sm:text-lg font-bold text-white">Curriculum Vitae / Resume</h3>
              <p className="text-xs text-slate-400">Asem Alhammadi, M.Sc., PMP®</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-resume-text-btn"
              onClick={handleCopyResumeText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Plain Text'}</span>
            </button>

            <button
              id="print-resume-btn"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs text-slate-950 font-bold transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              id="close-resume-modal-btn"
              onClick={onClose}
              aria-label="Close resume"
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted Resume Body */}
        <div id="printable-resume-area" className="p-8 overflow-y-auto space-y-8 bg-slate-950/80 print:bg-white print:text-black print:p-0">
          
          {/* Resume Header */}
          <div className="text-center space-y-2 border-b border-slate-800 print:border-black pb-6">
            <h1 className="text-3xl font-extrabold text-white print:text-black tracking-tight">
              ASEM ALHAMMADI, M.Sc., PMP®
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-emerald-400 print:text-emerald-800">
              SENIOR IT LEADER | SYSTEMS INTEGRATION & ENTERPRISE INFRASTRUCTURE | PMP® PROJECT DELIVERY
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-400 print:text-gray-700 pt-1">
              <span>{PERSONAL_INFO.location}</span>
              <span>•</span>
              <span>{PERSONAL_INFO.email}</span>
              <span>•</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-emerald-400 print:text-blue-700 underline">
                linkedin.com/in/asem-alhammadi
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 print:text-black border-b border-slate-800 print:border-black pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 print:text-gray-800 leading-relaxed">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Targeted Strengths */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 print:text-black border-b border-slate-800 print:border-black pb-1">
              Targeted Strengths & Core Competencies
            </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-300 print:text-gray-800 font-medium">
              <div>• Enterprise IT Infrastructure</div>
              <div>• Network Engineering & Administration</div>
              <div>• Project Delivery & PMP Methodology</div>
              <div>• Systems Integration & Architecture</div>
              <div>• Vendor & Stakeholder Coordination</div>
              <div>• Risk & Issue Management</div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 print:text-black border-b border-slate-800 print:border-black pb-1">
              Professional Experience
            </h2>

            <div className="space-y-6">
              {WORK_EXPERIENCE.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-sm text-white print:text-black">
                    <span>{exp.role} | {exp.company}</span>
                    <span className="text-xs text-emerald-400 print:text-gray-600 font-mono">{exp.period}</span>
                  </div>
                  <p className="text-xs text-slate-400 print:text-gray-700 italic">
                    {exp.description}
                  </p>
                  <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-300 print:text-gray-800">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 print:text-black border-b border-slate-800 print:border-black pb-1">
              Education & Leadership
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.id} className="text-slate-300 print:text-gray-800">
                  <div className="font-bold text-white print:text-black">{edu.degree} - {edu.field}</div>
                  <div className="text-slate-400 print:text-gray-600">{edu.institution} ({edu.year})</div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 print:text-black border-b border-slate-800 print:border-black pb-1">
              Certifications & Technical Badges
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {CERTIFICATIONS.map((cert) => (
                <span key={cert.id} className="px-2.5 py-1 bg-slate-900 border border-slate-800 print:bg-gray-100 print:border-gray-300 rounded-lg text-slate-300 print:text-black font-medium">
                  {cert.name} ({cert.issuer})
                </span>
              ))}
            </div>
          </div>

          {/* Technical Tools */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 print:text-black border-b border-slate-800 print:border-black pb-1">
              Technical Systems & Tools
            </h2>
            <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed">
              <strong className="text-white print:text-black">VMS & Access Control:</strong> Milestone XProtect, Lenel OnGuard, CCURE 9000, Axis Communications, Avigilon, Hikvision, Lorex. <br />
              <strong className="text-white print:text-black">IT Infrastructure:</strong> Windows Server 2019/2012, Active Directory, DNS/DHCP, TCP/IP, AWS, Linux. <br />
              <strong className="text-white print:text-black">Project Management:</strong> MS Project, Visio, Trello, Monday.com, Microsoft 365.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
