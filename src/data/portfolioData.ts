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
    degree: "M.Sc. in Communication Engineering",
    field: "Signal Processing & Wireless Communications",
    institution: "University of Science and Technology (UST), Faculty of Engineering",
    year: "2012 – 2015",
    grade: "92.76% (High Distinction)",
    thesisOrProject: "Thesis Title: Performance Evaluation of Space-Time Block Code for LTE-Advanced Systems",
    details: "Awarded full UST Academic Scholarship (2012-2015). Focus on Space-Time Block Codes (STBC), MIMO systems, LTE-A signal processing, and RF propagation."
  },
  {
    id: "edu-3",
    degree: "B.Sc. in Communication Engineering",
    field: "Electronics & Telecommunications Engineering",
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
    title: "Enterprise Systems Integration",
    subtitle: "Connecting Complex Technology, Infrastructure & Business Operations",
    description:
      "Designing and integrating enterprise technology solutions across IT infrastructure, networks, servers, applications, and specialized systems. Translating operational requirements into reliable, scalable technology solutions for complex environments.",
    deliverables: [
      "Enterprise Systems Integration Planning",
      "Technology Architecture & Integration Design",
      "Infrastructure & System Dependency Mapping",
      "Deployment & Implementation Planning",
      "System Migration & Upgrade Support"
    ],
    icon: "Cpu",
    technologies: [
      "Enterprise Systems",
      "Windows Server",
      "Active Directory",
      "TCP/IP Networking",
      "AWS"
    ]
  },

  {
    id: "service-2",
    title: "IT Infrastructure & Technology Integration",
    subtitle: "Networks, Servers, Cloud, Identity & Enterprise Infrastructure",
    description:
      "Connecting enterprise applications and technology platforms with the infrastructure required for reliable and secure operation, including networks, servers, identity services, storage, and cloud environments.",
    deliverables: [
      "Infrastructure Readiness Assessments",
      "Network & Connectivity Planning",
      "Server & Storage Architecture",
      "Active Directory & Identity Integration",
      "Infrastructure Deployment Coordination"
    ],
    icon: "Server",
    technologies: [
      "Windows Server",
      "Active Directory",
      "DNS/DHCP",
      "TCP/IP Networking",
      "AWS Cloud"
    ]
  },

  {
    id: "service-3",
    title: "IT Project Management & Technology Delivery",
    subtitle: "PMP-Certified Project Leadership from Planning Through Implementation",
    description:
      "Leading technology initiatives from planning and requirements through implementation, stakeholder coordination, risk management, vendor oversight, and operational handoff.",
    deliverables: [
      "Project Scope, Schedule & Resource Planning",
      "Risk & Issue Management",
      "Vendor & Stakeholder Coordination",
      "Implementation & Go-Live Management",
      "Executive Progress Reporting"
    ],
    icon: "Briefcase",
    technologies: [
      "MS Project",
      "Trello",
      "Monday.com",
      "Visio",
      "PMP Methodology"
    ]
  },

  {
    id: "service-4",
    title: "Specialized Systems & Security Integration",
    subtitle: "Enterprise Video, Access Control & Specialized Technology Integration",
    description:
      "Integrating specialized technology systems with enterprise IT infrastructure, including video management, access control, surveillance, identity services, and network environments. Bringing together specialized platforms and core IT infrastructure to support reliable operations.",
    deliverables: [
      "Specialized Technology Architecture",
      "VMS & Access Control Integration",
      "Enterprise Network & Infrastructure Integration",
      "System Migration & Upgrade Planning",
      "Technical Risk & Readiness Assessments"
    ],
    icon: "ShieldCheck",
    technologies: [
      "Milestone XProtect",
      "Lenel OnGuard",
      "CCURE 9000",
      "Avigilon",
      "Axis Communications"
    ]
  },

  {
    id: "service-5",
    title: "Technical Documentation & Operational Readiness",
    subtitle: "Documentation, Training, Knowledge Transfer & Technology Adoption",
    description:
      "Developing technical documentation, operational procedures, training materials, and support resources that help organizations successfully implement, adopt, and operate technology solutions.",
    deliverables: [
      "Technical Documentation & SOPs",
      "System & Operational Runbooks",
      "Training Materials & Knowledge Transfer",
      "Support Documentation",
      "Post-Implementation Operational Handoff"
    ],
    icon: "FileText",
    technologies: [
      "Microsoft 365",
      "Visio",
      "Technical Writing",
      "Runbook Development",
      "Training Programs"
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
    period: "2021 – Present",
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
    title: "Enterprise Access Control & VMS Modernization",
    clientOrOrg: "Boston Medical Center / Healthcare Operations",
    category: "Physical Security",
    period: "2022 – 2024",
    summary: "Architected system upgrades unifying Lenel OnGuard, CCURE 9000, and Milestone XProtect into a central command infrastructure.",
    fullDescription: "A strategic initiative to centralize physical security management across multiple hospital facilities, enabling real-time video analytics, centralized badging, and instant incident response.",
    challenges: [
      "Managing dual access control systems (Lenel and CCURE) while transitioning to unified badge credentials.",
      "Bandwidth constraints for streaming hundreds of high-definition video feeds across enterprise WAN connections.",
      "Configuring strict role-based permissions for medical staff, security officers, and external contractors."
    ],
    solutions: [
      "Configured dedicated VLANs and multicast streaming profiles to optimize video throughput.",
      "Implemented automated badge provisioning rules linked with HR Active Directory accounts.",
      "Created detailed visual maps in Milestone for instant camera view retrieval during emergency dispatch."
    ],
    results: [
      "Centralized video surveillance monitoring for 500+ cameras across 3 campuses.",
      "Decreased badge access provisioning lead time from 48 hours to under 15 minutes.",
      "Earned BMC Certificate of Achievement for excellence in enterprise security system integration."
    ],
    technologies: ["Milestone XProtect", "Lenel OnGuard", "CCURE 9000", "Active Directory", "TCP/IP WAN", "Windows Server 2019"],
    featured: true,
    imageSeed: "access-control"
  },
  {
    id: "proj-4",
    title: "IMAS Production Network & Security Infrastructure",
    clientOrOrg: "IMAS Malaysia",
    category: "Network Infrastructure",
    period: "2017 – 2019",
    summary: "Engineered robust network infrastructure, security firewall configurations, and system failover mechanisms for enterprise production environments.",
    fullDescription: "Deployed enterprise-grade networking solutions for corporate client infrastructure in Malaysia. Focused on hardening network security policies, minimizing downtime, and supporting technical operations.",
    challenges: [
      "Frequent network latency bottlenecks during peak traffic times.",
      "Inconsistent security policy enforcement across remote branch offices."
    ],
    solutions: [
      "Redesigned core network routing and implemented Quality of Service (QoS) rules.",
      "Configured site-to-site IPsec VPN tunnels with automated failover links.",
      "Established strict firewall rule sets and intrusion detection monitoring."
    ],
    results: [
      "Achieved 99.9% network uptime for production operations.",
      "Reduced network latency by 40% and awarded Certificate of Achievement at IMAS."
    ],
    technologies: ["TCP/IP", "DNS/DHCP", "Firewalls", "VPN Tunnels", "Switching & Routing", "Network Diagnostics"],
    featured: false,
    imageSeed: "imas-network"
  },
  {
    id: "proj-5",
    title: "UST University IT & Windows Server Infrastructure",
    clientOrOrg: "University of Science and Technology (UST)",
    category: "Project Management",
    period: "2010 – 2015",
    summary: "Managed campus-wide IT system installations, Active Directory domain management, and technical support for 5,000+ university users.",
    fullDescription: "Overseeing university IT infrastructure operations, Windows Server maintenance, network cabling, user accounts, and technical staff training.",
    challenges: [
      "High volume of support tickets across multiple academic departments.",
      "Need for standardized user access security and virus protection across hundreds of workstations."
    ],
    solutions: [
      "Deployed centralized Active Directory Group Policy Objects (GPO) for system lockdown and automatic updates.",
      "Established a structured ticketing workflow and technical documentation library for university staff.",
      "Conducted regular cybersecurity and basic IT safety workshops for non-technical faculty."
    ],
    results: [
      "Standardized computer laboratory images and server backup routines.",
      "Recognized with Certificate of Appreciation (2015) for outstanding IT support and infrastructure improvements."
    ],
    technologies: ["Windows Server 2012 R2", "Active Directory", "Group Policy", "Desktop Systems", "User Training"],
    featured: false,
    imageSeed: "ust-infrastructure"
  }
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
  { name: "Milestone XProtect VMS", category: "Public Safety Systems", level: 95 },
  { name: "Lenel OnGuard Access Control", category: "Public Safety Systems", level: 95 },
  { name: "CCURE 9000 Access Control", category: "Public Safety Systems", level: 90 },
  { name: "Axis & Avigilon IP Cameras", category: "Public Safety Systems", level: 95 },
  { name: "Hikvision & Lorex CCTV", category: "Public Safety Systems", level: 90 },
  { name: "PMP® Project Management", category: "Project & Governance", level: 95 },
  { name: "MS Project, Trello, Monday.com", category: "Project & Governance", level: 90 },
  { name: "Risk & Issue Remediation", category: "Project & Governance", level: 95 },
  { name: "Construction Site Readiness", category: "Project & Governance", level: 95 },
  { name: "Windows Server 2019/2012", category: "IT & Networking", level: 90 },
  { name: "Active Directory, DNS/DHCP", category: "IT & Networking", level: 92 },
  { name: "pfSense Firewall & VPNs", category: "IT & Networking", level: 92 },
  { name: "TCP/IP & Network Security", category: "IT & Networking", level: 90 },
  { name: "AWS Cloud Infrastructure", category: "IT & Networking", level: 85 },
  { name: "MATLAB & Signal Processing", category: "Engineering & Research", level: 88 },
  { name: "LTE-A & Wireless RF Planning", category: "Engineering & Research", level: 85 },
  { name: "Arduino, Proteus & VHDL", category: "Engineering & Research", level: 85 },
  { name: "C/C++, Java & JavaScript", category: "Engineering & Research", level: 82 }
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
