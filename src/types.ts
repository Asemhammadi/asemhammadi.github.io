export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
  category: 'systems-integration' | 'project-management' | 'networking' | 'it-support';
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  year: string;
  details?: string;
  grade?: string;
  thesisOrProject?: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  volumeInfo?: string;
  url?: string;
  abstractSnippet?: string;
}

export interface LanguageItem {
  language: string;
  level: string;
  note?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year?: string;
  status?: 'Completed' | 'In Progress';
  iconName?: string;
  badgeUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: string;
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  clientOrOrg: string;
  category: 'Physical Security' | 'Hospital Systems' | 'Network Infrastructure' | 'Project Management';
  period: string;
  summary: string;
  fullDescription: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  technologies: string[];
  featured: boolean;
  imageSeed: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Physical Security' | 'Healthcare IT' | 'Project Management' | 'Networking';
  publishedDate: string;
  readTime: string;
  author: string;
  tags: string[];
  likes: number;
  featured?: boolean;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  serviceInterest?: string;
  message: string;
  timestamp: string;
}

export interface AnalyticsEvent {
  id: string;
  eventType: 'page_view' | 'project_view' | 'blog_read' | 'contact_submit' | 'resume_download' | 'ai_chat';
  details?: string;
  timestamp: string;
  path?: string;
}

export interface AnalyticsStats {
  totalPageViews: number;
  uniqueVisitors: number;
  projectViews: number;
  articleReads: number;
  contactSubmissions: number;
  aiChatInteractions: number;
  topProjects: { name: string; count: number }[];
  topArticles: { title: string; count: number }[];
  recentEvents: AnalyticsEvent[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
}
