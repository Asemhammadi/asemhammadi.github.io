import { createContext, useContext, ReactNode } from 'react';
import {
  WorkExperience,
  EducationItem,
  CertificationItem,
  ProjectItem,
  PublicationItem,
  LanguageItem,
  ServiceItem,
  BlogPost
} from '../types';
import {
  PERSONAL_INFO,
  WORK_EXPERIENCE,
  EDUCATION_DATA,
  PUBLICATIONS_DATA,
  LANGUAGES_DATA,
  CERTIFICATIONS,
  SERVICES_DATA,
  PROJECTS_DATA,
  TECHNICAL_SKILLS,
  AWARDS_RECOGNITION,
  BLOG_POSTS
} from '../data/portfolioData';

export interface PersonalInfoType {
  fullName: string;
  name: string;
  title: string;
  credentials: string;
  photoUrl?: string;
  tagline: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  summary: string;
  yearsExperience: string;
  projectsCompleted: string;
  facilitiesManaged: string;
  certificationsCount: string;
}

interface SiteContextType {
  personalInfo: PersonalInfoType;
  photoUrl: string;
  workExperience: WorkExperience[];
  educationData: EducationItem[];
  publicationsData: PublicationItem[];
  languagesData: LanguageItem[];
  certificationsData: CertificationItem[];
  projectsData: ProjectItem[];
  servicesData: ServiceItem[];
  blogPostsData: BlogPost[];
  skillsData: typeof TECHNICAL_SKILLS;
  awardsData: typeof AWARDS_RECOGNITION;
}

// Site content is compiled in from portfolioData.ts. To change what visitors see,
// edit that file and redeploy — there is no runtime editor.
const siteData: SiteContextType = {
  personalInfo: PERSONAL_INFO,
  photoUrl: PERSONAL_INFO.photoUrl || '/asem_alhammadi_photo.png',
  workExperience: WORK_EXPERIENCE,
  educationData: EDUCATION_DATA,
  publicationsData: PUBLICATIONS_DATA,
  languagesData: LANGUAGES_DATA,
  certificationsData: CERTIFICATIONS,
  projectsData: PROJECTS_DATA,
  servicesData: SERVICES_DATA,
  blogPostsData: BLOG_POSTS,
  skillsData: TECHNICAL_SKILLS,
  awardsData: AWARDS_RECOGNITION
};

const SiteContext = createContext<SiteContextType>(siteData);

export function SiteProvider({ children }: { children: ReactNode }) {
  return (
    <SiteContext.Provider value={siteData}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteContext);
}
