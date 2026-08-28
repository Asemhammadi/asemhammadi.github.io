import { WorkExperience, EducationItem, CertificationItem, ServiceItem, ProjectItem, BlogPost, PublicationItem, LanguageItem } from '../types';
import portrait from '../assets/asem-alhammadi.webp';

export const PERSONAL_INFO = {
  fullName: "Asem Esmail Ghanem Al-Hammadi",
  name: "Asem Alhammadi",
  title: "Senior IT Leader & Systems Integration Executive",
  credentials: "M.Sc., PMP®",
  // Imported, not a hardcoded path, so Vite fingerprints it and resolves the
  // deployed base path. Empty string here falls back to the monogram plate.
  photoUrl: portrait,
  tagline: "Bridging Technology, Systems Integration & Mission-Critical Operations",
  location: "Malden, MA 02148",
  email: "asemalhamady92@yahoo.com",
  linkedin: "https://www.linkedin.com/in/asem-alhammadi",
  summary: "Senior IT Professional and Systems Integrator with 15+ years of experience across enterprise IT infrastructure, network engineering, cloud architecture, and project management — including physical security systems integration within large-scale, mission-critical environments. Background spans network design and administration, systems architecture, IT operations, and technical training, with a track record of leading cross-functional technology initiatives from planning through delivery. PMP® certified, with M.Sc. in Communication Engineering and M.S. in Computer Information Systems (Boston University).",
  yearsExperience: "15+",
  projectsCompleted: "50+",
  facilitiesManaged: "5+",
  certificationsCount: "10+"
};

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    id: "exp-1",
    role: "Senior Systems Integrator - Public Safety Department",
    company: "Boston Medical Center",
    location: "Boston, MA",
    period: "May 2025 – Present",
    isCurrent: true,
    category: "systems-integration",
    description: "Promoted to oversee physical security systems integration and technical strategy across three hospital campuses following major organizational expansion.",
    highlights: [
      "Oversee enterprise physical security system integrations across three major hospital campuses and regional clinics.",
      "Lead enterprise upgrades to CCTV, access control (Lenel, CCURE), and video management systems (Milestone XProtect) across newly acquired facilities.",
      "Direct multi-site physical security risk assessments and align physical security architecture with enterprise IT standards.",
      "Manage end-to-end project timelines, vendor coordination, and cross-campus security system harmonization.",
      "Oversaw technical documentation, staff training, and ensured regulatory compliance for all system deployments."
    ],
    technologies: ["Systems Integration","Enterprise IT Infrastructure","Active Directory","TCP/IP Networking","Project Management", "Enterprise Systems","Technology Operations","Milestone XProtect","Lenel OnGuard"]
  },
  {
    id: "exp-2",
    role: "Systems Integrator - Public Safety Department",
    company: "Boston Medical Center",
    location: "Boston, MA",
    period: "July 2020 – April 2025",
    isCurrent: false,
    category: "systems-integration",
    description: "Primary technical contact for Public Safety access control, video management, CCTV, and physical security technology systems.",
    highlights: [
      "Led delivery of Public Safety technology projects in close coordination with IT Infrastructure, Facilities/construction teams, operational users, and vendors.",
      "Translated site and department needs into practical implementation plans, including scope clarification, infrastructure readiness, go-live prep, and user training.",
      "Led the Public Safety Systems Upgrade for newly acquired BMC Brighton hospital, aligning systems with existing BMC infrastructure.",
      "Supported BMC Campus Redesign 2.0 security technology across active construction areas (Crosstown 7th Fl, 960 Mass Ave, Yawkey Fl 5 & 6, Menino Lobby).",
      "Tracked project risks, site issues, vendor actions, and remediation needs while delivering technical documentation and training materials."
    ],
    technologies: ["Systems Integration","IT Infrastructure","Enterprise Systems","Project Delivery","Windows Server","Network Infrastructure","Technical Documentation","Vendor Management","Milestone XProtect","Lenel","CCURE","Avigilon"]
  },
  {
    id: "exp-3",
    role: "Network Administrator",
    company: "International Modern Arabic School (IMAS)",
    location: "Selangor, Malaysia",
    period: "March 2017 – 2019",
    isCurrent: false,
    category: "networking",
    description: "Planned, configured, maintained, and optimized enterprise network hardware, pfSense firewalls, server deployments, and IT infrastructure.",
    highlights: [
      "Designed and deployed school network architecture, hardware, VPN gateways, and intrusion detection systems.",
      "Administered pfSense firewall, routers, switches, servers, Active Directory, desktop deployments, and security updates.",
      "Monitored network integrity, daily performance, and implemented IT asset tracking procedures for lifecycle quality control.",
      "Conducted research on network products, protocols, and standards to support IT procurement and system upgrades."
    ],
    technologies: ["pfSense Firewall", "VPN Gateways", "Switches & Routers", "Active Directory", "Packet Tracer", "Windows Server", "TCP/IP"]
  },
  {
    id: "exp-4",
    role: "IGCSE ICT Teacher",
    company: "Baseerah International School",
    location: "Malaysia",
    period: "Sep 2016 – Feb 2017",
    isCurrent: false,
    category: "it-support",
    description: "Delivered IGCSE ICT curriculum, covering computer systems, networking fundamentals, and practical software application skills.",
    highlights: [
      "Taught Cambridge IGCSE ICT modules including system architecture, database design, spreadsheet modeling, and web technologies.",
      "Prepared students for practical and theoretical international board examinations with high pass rates."
    ],
    technologies: ["IGCSE Curriculum", "Database Systems", "MS Office", "Networking Fundamentals"]
  },
  {
    id: "exp-5",
    role: "Assistant Lecturer & Lab Instructor",
    company: "Arab Open University (AOU)",
    location: "Faculty of Computer Studies, Oman",
    period: "Feb 2016 – May 2016",
    isCurrent: false,
    category: "it-support",
    description: "Lectured degree-level computer science courses and led hands-on technical laboratory sessions.",
    highlights: [
      "Instructed MATLAB Programming Lab, Data Computing & Information Labs, and Discrete Mathematics tutorials.",
      "Guided university students in numerical analysis, signal processing simulation, and algorithmic logic."
    ],
    technologies: ["MATLAB", "Discrete Mathematics", "Data Computing", "Algorithmic Logic"]
  },
  {
    id: "exp-6",
    role: "Lecturer, IT Technician & CLMS Administrator",
    company: "University of Science and Technology (UST)",
    location: "Faculty of Computing & IT, Yemen",
    period: "2010 – 2016",
    isCurrent: false,
    category: "it-support",
    description: "Served as Lecturer, Computer Technician, and Central Learning Management System (CLMS) / Website Administrator.",
    highlights: [
      "Taught Data Communication Lab, Fundamentals of Computer, and Hardware Maintenance for diploma and degree programs.",
      "Managed Faculty website, social channels, and CLMS portal; earned #1 Faculty Website Award in 2014/2015.",
      "Executed preventive maintenance, operating system diagnostics, electrical safety checks, and Active Directory user support across computer labs."
    ],
    technologies: ["Data Communication", "MATLAB", "Windows Server 2012 R2", "CLMS", "Web Administration", "Hardware Maintenance"]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-1",
    degree: "M.S. in Computer Information Systems",
    field: "IT Project Management Specialization",
    institution: "Boston University",
    year: "2022 – 2025",
    grade: "3.670 / 4.00 (GPA)",
    details: "Focus on IT project governance, Agile/PMP frameworks, enterprise systems architecture, and strategic technology delivery."
  },
  {
    id: "edu-2",
    degree: "M.Sc. in Electronics Engineering",
    field: "Communications Engineering Specialization",
    institution: "University of Science and Technology (UST), Faculty of Engineering",
    year: "2012 – 2015",
    grade: "92.76% (High Distinction)",
    thesisOrProject: "Thesis Title: Performance Evaluation of Space-Time Block Code for LTE-Advanced Systems",
    details: "Awarded full UST Academic Scholarship (2012-2015). Focus on Space-Time Block Codes (STBC), MIMO systems, LTE-A signal processing, and RF propagation."
  },
  {
    id: "edu-3",
    degree: "B.Sc. in Electronics Engineering",
    field: "Communications Engineering Specialization",
    institution: "University of Science and Technology (UST), Faculty of Science & Engineering",
    year: "2004 – 2008",
    grade: "84.46% (Very Good)",
    thesisOrProject: "Graduation Project Title: Radio Planning of CDMA Network",
    details: "Foundational engineering, electronic circuit design, CDMA radio frequency planning, microwave antennas, and data networking."
  },
  {
    id: "edu-4",
    degree: "Leadership Acceleration Program",
    field: "Executive Leadership & Stakeholder Engagement",
    institution: "Boston Medical Center",
    year: "2026",
    details: "Specialized training focused on executive communication, stakeholder engagement, leadership presence, and critical decision-making in healthcare."
  }
];

export const PUBLICATIONS_DATA: PublicationItem[] = [
  {
    id: "pub-1",
    title: "On OSTBC Codes for LTE-A Systems - Design and Performance Evaluation",
    authors: "Adnan Zain Alsaqqaf, Asem Alhammadi",
    journal: "Journal of Science and Technology",
    year: "2015",
    volumeInfo: "Vol. 20, No. 2",
    url: "https://journals.ust.edu/index.php/JST/article/view/940",
    abstractSnippet: "Evaluated Orthogonal Space-Time Block Codes (OSTBC) for LTE-Advanced MIMO wireless systems, analyzing Bit Error Rate (BER) performance across fading channels."
  },
  {
    id: "pub-2",
    title: "Microcontroller-based High-way Tunnel Electrical Controlling System",
    authors: "Asem Alhammadi, Motea Alsamawi, Mokarram Aljamali, Abdullatif Alquradhi, Amin Elkustaban",
    journal: "Journal of Science and Technology",
    year: "2014",
    volumeInfo: "Vol. 19, No. 1",
    url: "https://journals.ust.edu/index.php/JST/article/view/710",
    abstractSnippet: "Designed and implemented an automated microcontroller-based electrical control system for tunnel illumination and environmental safety monitoring."
  },
  {
    id: "pub-3",
    title: "Microstrip Antenna Design & Electromagnetic Analysis",
    authors: "Asem Alhammadi",
    journal: "Faculty of Engineering Research Monograph",
    year: "2013",
    abstractSnippet: "Electromagnetic design, simulation, and return-loss optimization of microstrip patch antennas for wireless communication bands."
  }
];

export const LANGUAGES_DATA: LanguageItem[] = [
  { language: "Arabic", level: "Native / Mother Tongue", note: "Fluent written & spoken communication" },
  { language: "English", level: "Advanced / Professional", note: "IELTS Overall Score 6.0 - Full professional proficiency" }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-1",
    name: "Project Management Professional (PMP)®",
    issuer: "Project Management Institute (PMI)",
    status: "Completed",
    iconName: "Award"
  },
  {
    id: "cert-2",
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    status: "Completed",
    iconName: "Cloud"
  },
  {
    id: "cert-3",
    name: "Google Project Management Professional",
    issuer: "Google",
    status: "In Progress",
    iconName: "CheckCircle"
  },
  {
    id: "cert-4",
    name: "Microsoft 365 Administration",
    issuer: "Microsoft",
    status: "Completed",
    iconName: "Shield"
  },
  {
    id: "cert-5",
    name: "Windows Server 2019 & 2012 R2 Administration",
    issuer: "Microsoft",
    status: "Completed",
    iconName: "Server"
  },
  {
    id: "cert-6",
    name: "Cisco CCNA Training",
    issuer: "Cisco Networking Academy",
    status: "Completed",
    iconName: "Terminal"
  },
  {
    id: "cert-7",
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    status: "Completed",
    iconName: "Lock"
  },
  {
    id: "cert-8",
    name: "International Computer Driving License (ICDL)",
    issuer: "ICDL Foundation",
    status: "Completed",
    iconName: "CheckCircle"
  },
  {
    id: "cert-9",
    name: "Writing & Publication of Scientific Articles",
    issuer: "Teaching & Learning Center, UST",
    status: "Completed",
    iconName: "Award"
  },
  {
    id: "cert-10",
    name: "SAFe Agilist Certification (SAFe)",
    issuer: "Scaled Agile",
    status: "In Progress",
    iconName: "Zap"
  }
];

export const SERVICES_DATA: ServiceItem[] = [
{
  id: "service-1",
  title: "Security Systems",
  subtitle: "Design, Integration, Installation & Support",
  description:
    "Helping homeowners and small organizations design, upgrade, install, and support security systems that fit their needs.",
  deliverables: [
    "Security System Assessment & Design",
    "Camera & Video Surveillance",
    "Access Control",
    "Intercom & Emergency Systems",
    "Installation & Configuration",
    "System Integration & Troubleshooting"
  ],
  icon: "ShieldCheck",
  technologies: [
    "IP Cameras",
    "Video Management Systems",
    "Access Control",
    "Intercom Systems",
    "PoE & Network Infrastructure"
  ]
},
{
  id: "service-2",
  title: "IT Infrastructure & Support",
  subtitle: "Networks, Servers, Devices & Everyday IT",
  description:
    "Practical IT support for individuals and small organizations, from network and server setup to troubleshooting PCs, printers, and other devices.",
  deliverables: [
    "Network Setup & Troubleshooting",
    "Server & Identity Services",
    "PC & Device Support",
    "Printer & Peripheral Support",
    "IT Infrastructure Setup",
    "Technology Troubleshooting"
  ],
  icon: "Server",
  technologies: [
    "Windows",
    "Windows Server",
    "Active Directory",
    "Entra ID",
    "TCP/IP Networking",
    "DNS & DHCP",
    "Wi-Fi & Switching"
  ]
},
{
  id: "service-3",
  title: "Technology Project Management",
  subtitle: "Planning, Coordination & Delivery",
  description:
    "Managing technology projects from planning and budgeting through vendor coordination, implementation, testing, and completion.",
  deliverables: [
    "Requirements & Project Planning",
    "Budget & Vendor Evaluation",
    "Vendor & Schedule Coordination",
    "Implementation & Cutover",
    "Testing & Acceptance",
    "Project Documentation & Closeout"
  ],
  icon: "Briefcase",
  technologies: [
    "MS Project",
    "Microsoft 365",
    "Trello",
    "Monday.com",
    "Visio"
  ]
},
{
  id: "service-4",
  title: "Technology Assessment & Planning",
  subtitle: "Know What You Have. Know What You Need.",
  description:
    "Reviewing existing technology, identifying outdated systems and risks, and developing practical plans for upgrades and improvements.",
  deliverables: [
    "Technology Assessments",
    "System & Infrastructure Reviews",
    "Technology Gap Analysis",
    "Upgrade & Modernization Plans",
    "Product & Vendor Comparison",
    "Technology Roadmaps"
  ],
  icon: "SearchCheck",
  technologies: [
    "Technology Lifecycle Planning",
    "System Assessment",
    "Infrastructure Planning",
    "Vendor Evaluation"
  ]
},
{
  id: "service-5",
  title: "Documentation & Training",
  subtitle: "Make Technology Easier to Understand and Manage",
  description:
    "Creating clear documentation and training resources that help people understand, operate, and support their technology.",
  deliverables: [
    "System Documentation",
    "Network & System Diagrams",
    "Standard Operating Procedures",
    "User Guides",
    "Staff Training",
    "Knowledge Transfer"
  ],
  icon: "FileText",
  technologies: [
    "Microsoft 365",
    "Visio",
    "Technical Documentation",
    "Training Materials"
  ]
}
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-1",
    title: "BMC Brighton Public Safety Systems Modernization",
    clientOrOrg: "Boston Medical Center",
    category: "Hospital Systems",
    period: "October 2024 – March 2026",
    summary: "Led the technical leadership, systems integration, and project coordination for a comprehensive Public Safety modernization initiative, replacing outdated security technologies and integrating the upgraded systems into BMC's enterprise environment.",
    fullDescription: "Following Boston Medical Center's acquisition of the Brighton hospital facility, the existing Public Safety systems were outdated, unreliable, and difficult to maintain or recover. As a Senior Systems Integrator, Asem provided technical leadership and project coordination throughout the modernization initiative, working with Public Safety leadership, hospital leadership, BMC IT teams, vendors, contractors, and a third-party systems integrator. The project modernized access control, video surveillance, emergency communication, patrol management, and parking garage systems while bringing the upgraded technologies into BMC's IT environment.",
    challenges: [
      "Modernizing multiple legacy Public Safety systems with different technologies and platforms.",
      "Integrating new security technologies with BMC network, infrastructure, cybersecurity, and information security requirements.",
      "Working with existing infrastructure and wiring limitations within an operating hospital environment.",
      "Coordinating multiple BMC IT teams, vendors, contractors, and stakeholders.",
      "Managing project budget development, vendor proposals, and approval requirements.",
      "Resolving unexpected technical issues during implementation, testing, and post-cutover operations."
    ],
    solutions: [
      "Migrated the access control environment from C•CURE 800 to C•CURE 9000 across approximately 16 panels and 70 doors.",
      "Replaced the legacy Milestone XProtect VMS with Motorola Alta and expanded video surveillance from approximately 56 existing cameras to 163 Avigilon Alta cameras for improved interior and exterior coverage.",
      "Implemented five Verkada emergency call boxes at key hospital entrances as part of the facility's Laura's Law compliance effort.",
      "Implemented Omnigo Patrol Management / TourGuard to modernize patrol management and supported the upgrade of the parking garage security system.",
      "Provided technical requirements and direction, reviewed proposed designs and deliverables, participated in testing and acceptance, identified deficiencies, and approved completed work delivered by the third-party integrator.",
      "Coordinated integration requirements with BMC Network, Cybersecurity, Information Security, Server/Infrastructure, and IT Field Services teams.",
      "Supported system configuration, troubleshooting, cutover activities, documentation, vendor coordination, and Public Safety training."
    ],
    results: [
      "Modernized the facility's Public Safety technology environment and brought the upgraded systems in line with BMC standards.",
      "Successfully integrated the upgraded Public Safety systems into the BMC network and enterprise environment.",
      "Expanded video surveillance coverage from approximately 56 to 163 cameras, significantly improving interior and exterior visibility.",
      "Successfully migrated approximately 70 access-controlled doors across 16 panels from C•CURE 800 to C•CURE 9000.",
      "Improved the facility's physical security posture, system reliability, maintainability, and operational resilience.",
      "Successfully implemented modern patrol management and upgraded parking garage security capabilities.",
      "Trained Public Safety management on the upgraded systems and supported the transition to the modernized environment."
    ],
    technologies: ["C•CURE 800", "C•CURE 9000", "Milestone XProtect", "Motorola Alta", "Avigilon Alta", "Verkada", "Omnigo Patrol Management", "TourGuard", "Windows Server", "Active Directory", "Network Infrastructure", "MS Project"],
    featured: true,
    imageSeed: "bmc-brighton"
  },
  {
    id: "proj-2",
    title: "BMC Campus Redesign 2.0 Security Technology",
    clientOrOrg: "Boston Medical Center",
    category: "Physical Security",
    period: "2021 – 2025",
    summary: "Managed security technology deployment across active construction and renovation areas including Crosstown 7th Floor, 960 Mass Ave, Yawkey 5/6, and Menino Lobby.",
    fullDescription: "A multi-year campus redesign project transforming key patient care, outpatient, and administrative spaces across Boston Medical Center. Asem managed physical security site readiness, vendor coordination, and system integration.",
    challenges: [
      "Navigating fast-paced construction environments with shifting trade dependencies.",
      "Ensuring network cabling, wall backing, and power dependencies were ready prior to ceiling tile closure.",
      "Coordinating multi-vendor teams including electrical contractors, door hardware technicians, and security integrators."
    ],
    solutions: [
      "Established weekly site readiness walkthroughs and pre-install commissioning checklists.",
      "Created unified risk and issue tracking logs in Trello/Monday to escalate construction delays immediately.",
      "Engineered high-density camera placement plans for high-traffic public lobbies like Menino and Yawkey."
    ],
    results: [
      "Delivered security technology on time across 5 major renovated building floors.",
      "Reduced post-installation commissioning bugs by 35% through standardized pre-inspection SOPs.",
      "Ensured seamless integration with hospital panic alarm and emergency dispatch systems."
    ],
    technologies: ["Lenel OnGuard", "CCURE 9000", "Axis Cameras", "Avigilon VMS", "Visio", "Facilities Coordination"],
    featured: true,
    imageSeed: "campus-redesign"
  },
   {
    id: "proj-3",
    title: "BMC Public Safety Systems Lifecycle Modernization",
    clientOrOrg: "Boston Medical Center",
    category: "Physical Security",
    period: "Ongoing Lifecycle Program",
    summary: "Led, with a teammate, the ongoing modernization and lifecycle management of BMC Public Safety systems, bringing critical technologies to current supported versions while decommissioning legacy platforms and upgrading supporting hardware and infrastructure.",
    fullDescription: "An ongoing Public Safety technology lifecycle program focused on keeping BMC's critical security and Public Safety systems current, supported, reliable, and maintainable. Working closely with a teammate, BMC IT teams, and technology vendors, Asem helped develop and execute modernization plans across approximately 10 systems and platforms, including access control, video management, cameras, servers, investigation systems, audio recording, infant protection, CAD, and other Public Safety applications. The program also included upgrading supporting hardware and infrastructure and safely transitioning from legacy platforms to modern supported solutions.",
    challenges: [
      "Managing multiple Public Safety systems with different vendors, technologies, lifecycle schedules, and end-of-support requirements.",
      "Maintaining 24/7 Public Safety operations while upgrading critical systems and infrastructure.",
      "Prioritizing modernization efforts based on end-of-life status, system age, available budget, and business and operational criticality.",
      "Coordinating vendors and multiple BMC IT teams across network, server, infrastructure, security, and other technical dependencies.",
      "Migrating from legacy systems while preserving required configurations, data, integrations, and operational capabilities.",
      "Maintaining compatibility between new technologies and existing BMC infrastructure during phased modernization.",
      "Scheduling upgrades and cutovers for operationally critical systems while minimizing disruption.",
      "Safely decommissioning obsolete hardware and software after successful validation of replacement systems."
    ],
    solutions: [
      "Developed modernization requirements and lifecycle priorities with a teammate based on system age, end-of-life/end-of-support status, budget, and operational criticality.",
      "Modernized approximately 10 Public Safety systems and platforms, including access control, VMS, cameras, servers, investigation, audio recording, infant protection, CAD, and other critical applications.",
      "Worked closely with BMC IT and technology vendors to replace or upgrade approximately 20 servers and supporting infrastructure as required by the modernized systems.",
      "Supported modernization involving approximately 60 cameras and 80 access-control panels.",
      "Coordinated the migration from legacy platforms to current supported technologies, including planning, configuration/data migration where applicable, testing, validation, and cutover.",
      "Coordinated the safe decommissioning of three legacy systems after successful validation of their replacement platforms.",
      "Worked with vendors and BMC IT teams to troubleshoot technical issues, maintain system compatibility, and resolve unexpected problems throughout the modernization lifecycle.",
      "Maintained technical and project documentation and coordinated stakeholder communication throughout planning, implementation, testing, and decommissioning activities."
    ],
    results: [
      "Brought critical Public Safety systems to current supported versions and established a sustainable lifecycle modernization approach.",
      "Successfully decommissioned three legacy Public Safety systems and reduced dependence on obsolete hardware and software.",
      "Modernized approximately 10 Public Safety systems and platforms, 20 servers, 60 cameras, and 80 access-control panels.",
      "Improved system reliability, security, supportability, maintainability, and compatibility with BMC's IT environment.",
      "Reduced operational risk associated with aging, unsupported, and obsolete Public Safety technologies.",
      "Improved the ability of Public Safety and IT teams to maintain, troubleshoot, and support critical systems.",
      "Strengthened the long-term reliability and operational resilience of Public Safety technology supporting the BMC main campus."
    ],
    technologies: [
      "Access Control",
      "Video Management Systems",
      "IP Cameras",
      "Windows Server",
      "Public Safety Applications",
      "Investigation Systems",
      "Audio Recording Systems",
      "Infant Protection Systems",
      "CAD Systems",
      "IT Infrastructure"
    ],
    featured: true,
    imageSeed: "access-control"
  },
];
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "integrating-enterprise-physical-security-with-healthcare-it",
    title: "Integrating Enterprise Physical Security with Healthcare IT Infrastructure",
    excerpt: "Discover how bridging access control, VMS platforms, and Active Directory creates a seamless, secure, and compliant 24x7 healthcare environment.",
    category: "Healthcare IT",
    publishedDate: "May 14, 2026",
    readTime: "6 min read",
    author: "Asem Alhammadi, M.Sc., PMP",
    tags: ["Physical Security", "Healthcare IT", "Active Directory", "Lenel", "Milestone"],
    featured: true,
    content: `
# Integrating Enterprise Physical Security with Healthcare IT Infrastructure

In modern 24x7 healthcare environments, physical security can no longer operate in an isolated silo. Access control doors, CCTV cameras, panic buttons, and infant protection systems must seamlessly communicate with enterprise IT networks, server architecture, and identity management systems.

## The Challenge of Healthcare Isolation
Historically, facilities management oversaw door locks and analog cameras while IT managed servers and email accounts. This division created major vulnerabilities:
- Terminated staff retaining physical badge access hours after HR offboarding.
- Unmonitored bandwidth spikes on core networks due to high-resolution IP video streams.
- Lack of centralized audit trails during security incidents.

## Key Pillars of Successful Integration

### 1. Identity & Access Synchronization (Active Directory)
By connecting access control platforms like **Lenel OnGuard** or **CCURE 9000** directly with **Active Directory (AD)** or HR management software, user access profiles are automated. When HR updates an employee's status or department, card reader permissions adjust dynamically.

### 2. Network Segmentation & Multicast Bandwidth Management
Video Management Systems (VMS) such as **Milestone XProtect** generate gigabytes of traffic per second across hundreds of IP cameras. Implementing dedicated VLANs, Quality of Service (QoS) prioritization, and multicast streaming prevents camera feeds from degrading clinical diagnostic software or EHR access.

### 3. Redundant Server & Storage Infrastructure
Healthcare facilities cannot afford video dropouts during critical incidents. Utilizing Windows Server clusters, RAID-6 storage arrays, and cloud backup endpoints ensures 99.999% surveillance uptime.

## Operational Outcomes
At Boston Medical Center, harmonizing security technology with IT infrastructure cut badge provisioning lead times from days to under 15 minutes while establishing complete compliance with HIPAA and healthcare physical security mandates.
`
  },
  {
    id: "post-2",
    slug: "navigating-site-readiness-in-active-construction-projects",
    title: "Navigating Site Readiness for Public Safety Tech in Active Construction",
    excerpt: "Practical insights on coordinating network drops, door hardware, vendor commissioning, and turnover in fast-paced healthcare renovations.",
    category: "Project Management",
    publishedDate: "Apr 02, 2026",
    readTime: "8 min read",
    author: "Asem Alhammadi, M.Sc., PMP",
    tags: ["PMP", "Site Readiness", "Construction", "Vendor Coordination", "Commissioning"],
    featured: true,
    content: `
# Navigating Site Readiness for Public Safety Tech in Active Construction

Installing physical security hardware during active construction or hospital renovation is one of the most complex challenges an IT Project Manager faces. Walls are going up, electrical trades are pulling conduit, and schedule changes occur daily.

## The Site Readiness Checklist
Before any high-value IP camera or door controller is mounted on site, five critical dependencies must be verified:

1. **Environmental Readiness**: The room or corridor must be dust-free, enclosed, and climate-controlled to protect sensitive optical lenses and server circuit boards.
2. **Power & Network Infrastructure**: Network drops (Cat6/Cat6A) must be tested, labeled, and patched back to the IDF cabinet with PoE (Power over Ethernet) active.
3. **Door Hardware Alignment**: Electrified door hardware (mortise locks, panic bars, door position switches) must be installed and tested by the door vendor before access control panels are wired.
4. **As-Built Plan Verification**: Ensure field camera placements align with physical line-of-sight drawings to prevent obstruction by HVAC ductwork or exit signage.
5. **Vendor QA Inspection**: Conduct pre-installation walkthroughs with security integrators to flag deficiencies before ceiling tile closure.

## Practical Remediation & Risk Logs
Using lightweight collaborative tracking tools (like Trello or Monday.com alongside MS Project) allows field engineers, electrical contractors, and Public Safety leads to flag issues instantly with photo evidence.

When issues are identified early, commissioning delays drop significantly, allowing smooth operational handoff to hospital security teams.
`
  },
  {
    id: "post-3",
    slug: "pmp-strategies-for-multi-site-hospital-acquisitions",
    title: "PMP Strategies for Multi-Site Healthcare Hospital Acquisitions",
    excerpt: "How applying structured Project Management Professional (PMP) principles accelerates technology alignment when bringing new facilities into a healthcare network.",
    category: "Project Management",
    publishedDate: "Feb 18, 2026",
    readTime: "7 min read",
    author: "Asem Alhammadi, M.Sc., PMP",
    tags: ["PMP", "Hospital Acquisition", "Leadership", "Stakeholder Alignment"],
    featured: false,
    content: `
# PMP Strategies for Multi-Site Healthcare Hospital Acquisitions

Acquiring a new hospital facility brings immediate operational complexity. The acquired site typically operates on legacy hardware, different vendor contracts, and unique local workflows.

Applying PMP® principles provides a clear roadmap for harmonizing public safety and IT technology:

## Phase 1: Initiation & Comprehensive Audit
- Conduct exhaustive site inventory of existing CCTV cameras, badging stations, panic alarms, and server rooms.
- Perform threat and risk assessments to identify immediate security compliance gaps.

## Phase 2: Scope Definition & Infrastructure Harmonization
- Define clear migration milestones: Phase A (Emergency Cutover), Phase B (Badging & Access Alignment), Phase C (Full VMS Centralization).
- Align new site hardware with enterprise standards (e.g., standardizing on Milestone XProtect or Lenel OnGuard).

## Phase 3: Stakeholder Communication & Training
- Communicate go-live schedules clearly to nursing leadership, facilities staff, and local security officers.
- Deliver tailored support runbooks and hands-on training workshops prior to launch.

Through proactive stakeholder engagement and risk mitigation, site acquisitions transition smoothly without compromising patient safety or operational continuity.
`
  },
  {
    id: "post-4",
    slug: "optimizing-ip-video-surveillance-throughput-in-enterprise-networks",
    title: "Optimizing IP Video Surveillance Throughput in Enterprise Networks",
    excerpt: "Engineering principles for configuring bitrate, resolution, H.265 compression, and storage retention in large-scale Milestone XProtect deployments.",
    category: "Networking",
    publishedDate: "Jan 10, 2026",
    readTime: "5 min read",
    author: "Asem Alhammadi, M.Sc., PMP",
    tags: ["VMS", "Milestone", "Networking", "Video Analytics", "H.265"],
    featured: false,
    content: `
# Optimizing IP Video Surveillance Throughput in Enterprise Networks

High-definition IP cameras deliver exceptional clarity, but streaming hundreds of 4K camera feeds can strain enterprise bandwidth and storage pools if not properly architected.

## Core Video Engineering Techniques

1. **H.265 & Smart Codec Compression**: Utilizing advanced codecs reduces network bandwidth requirements by up to 50% compared to legacy H.264 without sacrificing image fidelity.
2. **Dynamic Resolution Scaling**: Stream lower-resolution (720p/Sub-stream) feeds for live multi-camera grid viewing on security wall monitors, while recording full 4K resolution directly to storage servers.
3. **Motion-Based Frame Rate Adjustment**: Record at 15 FPS during motion detection events, dropping to 5 FPS during static hours to optimize disk retention cycles.
4. **Tiered Storage Management**: Store fast live video on high-speed NVMe/SAS drives for 7 days, archiving long-term footage to secondary SAN/NAS arrays for mandatory 30/90-day retention periods.
`
  }
];

export const TECHNICAL_SKILLS = [
  { name: "Milestone XProtect VMS", category: "Security & Surveillance Systems", level: 95 },
  { name: "Lenel OnGuard Access Control", category: "Security & Surveillance Systems", level: 95 },
  { name: "CCURE 9000 Access Control", category: "Security & Surveillance Systems", level: 90 },
  { name: "Axis & Avigilon IP Cameras", category: "Security & Surveillance Systems", level: 95 },
  { name: "Hikvision & Lorex CCTV", category: "Security & Surveillance Systems", level: 90 },
  { name: "PMP® Project Management", category: "Project & Program Management", level: 95 },
  { name: "MS Project, Trello, Monday.com", category: "Project & Program Management", level: 90 },
  { name: "Risk & Issue Remediation", category: "Project & Program Management", level: 95 },
  { name: "Construction Site Readiness", category: "Project & Program Management", level: 95 },
  { name: "Windows Server 2019/2012", category: "IT Infrastructure & Networking", level: 90 },
  { name: "Active Directory, DNS/DHCP", category: "IT Infrastructure & Networking", level: 92 },
  { name: "pfSense Firewall & VPNs", category: "IT Infrastructure & Networking", level: 92 },
  { name: "TCP/IP & Network Security", category: "IT Infrastructure & Networking", level: 90 },
  { name: "AWS Cloud Infrastructure", category: "IT Infrastructure & Networking", level: 85 },
  { name: "MATLAB & Signal Processing", category: "Engineering & Technical Research", level: 88 },
  { name: "LTE-A & Wireless RF Planning", category: "Engineering & Technical Research", level: 85 },
  { name: "Arduino, Proteus & VHDL", category: "Engineering & Technical Research", level: 85 },
  { name: "C/C++, Java & JavaScript", category: "Engineering & Technical Research", level: 82 }
];

export const AWARDS_RECOGNITION = [
  {
    title: "Role Model Award",
    organization: "Boston Medical Center",
    period: "2022 – 2025",
    description: "Consistently recognized across multiple annual reviews for outstanding leadership, performance excellence, and professionalism in healthcare technology delivery."
  },
  {
    title: "Certificate of Achievement",
    organization: "Boston Medical Center",
    period: "2021",
    description: "Awarded for excellence in leading complex IT and physical security system integration projects during campus expansion."
  },
  {
    title: "Certificate of Achievement",
    organization: "IMAS (Malaysia)",
    period: "2019",
    description: "Recognized for outstanding network engineering contributions, pfSense security firewall configurations, and system integrations."
  },
  {
    title: "Deanship Award of Appreciation (#1 Faculty Portal)",
    organization: "University of Science & Technology (UST)",
    period: "2015",
    description: "Awarded a Certificate of Appreciation from the Deanship of Faculty of Computing & IT for elevating the faculty website and CLMS portal to the #1 rank among all faculties at UST."
  },
  {
    title: "M.Sc. Academic Scholarship",
    organization: "University of Science & Technology (UST)",
    period: "2012 – 2015",
    description: "Merit-based full graduate scholarship awarded for outstanding academic achievement in Communication Engineering (M.Sc. Grade: 92.76%)."
  }
];
