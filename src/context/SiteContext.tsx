import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  PERSONAL_INFO as DEFAULT_PERSONAL_INFO,
  WORK_EXPERIENCE as DEFAULT_WORK_EXPERIENCE,
  EDUCATION_DATA as DEFAULT_EDUCATION_DATA,
  PUBLICATIONS_DATA as DEFAULT_PUBLICATIONS_DATA,
  LANGUAGES_DATA as DEFAULT_LANGUAGES_DATA,
  CERTIFICATIONS as DEFAULT_CERTIFICATIONS,
  SERVICES_DATA as DEFAULT_SERVICES_DATA,
  PROJECTS_DATA as DEFAULT_PROJECTS_DATA,
  TECHNICAL_SKILLS as DEFAULT_TECHNICAL_SKILLS,
  AWARDS_RECOGNITION as DEFAULT_AWARDS,
  BLOG_POSTS as DEFAULT_BLOG_POSTS
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
  skillsData: typeof DEFAULT_TECHNICAL_SKILLS;
  awardsData: typeof DEFAULT_AWARDS;
  
  updatePersonalInfo: (info: Partial<PersonalInfoType>) => void;
  updatePhotoUrl: (url: string) => void;
  setWorkExperience: React.Dispatch<React.SetStateAction<WorkExperience[]>>;
  setEducationData: React.Dispatch<React.SetStateAction<EducationItem[]>>;
  setPublicationsData: React.Dispatch<React.SetStateAction<PublicationItem[]>>;
  setCertificationsData: React.Dispatch<React.SetStateAction<CertificationItem[]>>;
  setProjectsData: React.Dispatch<React.SetStateAction<ProjectItem[]>>;
  setServicesData: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  setBlogPostsData: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  setLanguagesData: React.Dispatch<React.SetStateAction<LanguageItem[]>>;
  setSkillsData: React.Dispatch<React.SetStateAction<typeof DEFAULT_TECHNICAL_SKILLS>>;
  setAwardsData: React.Dispatch<React.SetStateAction<typeof DEFAULT_AWARDS>>;
  resetToDefaults: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [personalInfo, setPersonalInfoState] = useState<PersonalInfoType>(() => {
    const saved = localStorage.getItem('site_personal_info');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_PERSONAL_INFO;
  });

  const [photoUrl, setPhotoUrlState] = useState<string>(() => {
    return localStorage.getItem('asem_alhammadi_photo') || DEFAULT_PERSONAL_INFO.photoUrl || '/asem_alhammadi_photo.png';
  });

  const [workExperience, setWorkExperience] = useState<WorkExperience[]>(() => {
    const saved = localStorage.getItem('site_work_exp');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_WORK_EXPERIENCE;
  });

  const [educationData, setEducationData] = useState<EducationItem[]>(() => {
    const saved = localStorage.getItem('site_education');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_EDUCATION_DATA;
  });

  const [publicationsData, setPublicationsData] = useState<PublicationItem[]>(() => {
    const saved = localStorage.getItem('site_publications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_PUBLICATIONS_DATA;
  });

  const [languagesData, setLanguagesData] = useState<LanguageItem[]>(() => {
    const saved = localStorage.getItem('site_languages');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_LANGUAGES_DATA;
  });

  const [certificationsData, setCertificationsData] = useState<CertificationItem[]>(() => {
    const saved = localStorage.getItem('site_certifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_CERTIFICATIONS;
  });

  const [projectsData, setProjectsData] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem('site_projects');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_PROJECTS_DATA;
  });

  const [servicesData, setServicesData] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('site_services');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_SERVICES_DATA;
  });

  const [blogPostsData, setBlogPostsData] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('site_blog_posts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_BLOG_POSTS;
  });

  const [skillsData, setSkillsData] = useState<typeof DEFAULT_TECHNICAL_SKILLS>(() => {
    const saved = localStorage.getItem('site_skills');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_TECHNICAL_SKILLS;
  });

  const [awardsData, setAwardsData] = useState<typeof DEFAULT_AWARDS>(() => {
    const saved = localStorage.getItem('site_awards');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_AWARDS;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('site_personal_info', JSON.stringify(personalInfo));
  }, [personalInfo]);

  useEffect(() => {
    localStorage.setItem('asem_alhammadi_photo', photoUrl);
  }, [photoUrl]);

  useEffect(() => {
    localStorage.setItem('site_work_exp', JSON.stringify(workExperience));
  }, [workExperience]);

  useEffect(() => {
    localStorage.setItem('site_education', JSON.stringify(educationData));
  }, [educationData]);

  useEffect(() => {
    localStorage.setItem('site_publications', JSON.stringify(publicationsData));
  }, [publicationsData]);

  useEffect(() => {
    localStorage.setItem('site_languages', JSON.stringify(languagesData));
  }, [languagesData]);

  useEffect(() => {
    localStorage.setItem('site_certifications', JSON.stringify(certificationsData));
  }, [certificationsData]);

  useEffect(() => {
    localStorage.setItem('site_projects', JSON.stringify(projectsData));
  }, [projectsData]);

  useEffect(() => {
    localStorage.setItem('site_services', JSON.stringify(servicesData));
  }, [servicesData]);

  useEffect(() => {
    localStorage.setItem('site_blog_posts', JSON.stringify(blogPostsData));
  }, [blogPostsData]);

  useEffect(() => {
    localStorage.setItem('site_skills', JSON.stringify(skillsData));
  }, [skillsData]);

  useEffect(() => {
    localStorage.setItem('site_awards', JSON.stringify(awardsData));
  }, [awardsData]);

  const updatePersonalInfo = (info: Partial<PersonalInfoType>) => {
    setPersonalInfoState(prev => ({ ...prev, ...info }));
  };

  const updatePhotoUrl = (url: string) => {
    setPhotoUrlState(url);
  };

  const resetToDefaults = () => {
    localStorage.clear();

    setPersonalInfoState(DEFAULT_PERSONAL_INFO);
    setPhotoUrlState(DEFAULT_PERSONAL_INFO.photoUrl || '/asem_alhammadi_photo.png');
    setWorkExperience(DEFAULT_WORK_EXPERIENCE);
    setEducationData(DEFAULT_EDUCATION_DATA);
    setPublicationsData(DEFAULT_PUBLICATIONS_DATA);
    setLanguagesData(DEFAULT_LANGUAGES_DATA);
    setCertificationsData(DEFAULT_CERTIFICATIONS);
    setProjectsData(DEFAULT_PROJECTS_DATA);
    setServicesData(DEFAULT_SERVICES_DATA);
    setBlogPostsData(DEFAULT_BLOG_POSTS);
    setSkillsData(DEFAULT_TECHNICAL_SKILLS);
    setAwardsData(DEFAULT_AWARDS);
  };

  return (
    <SiteContext.Provider
      value={{
        personalInfo,
        photoUrl,
        workExperience,
        educationData,
        publicationsData,
        languagesData,
        certificationsData,
        projectsData,
        servicesData,
        blogPostsData,
        skillsData,
        awardsData,
        updatePersonalInfo,
        updatePhotoUrl,
        setWorkExperience,
        setEducationData,
        setPublicationsData,
        setLanguagesData,
        setCertificationsData,
        setProjectsData,
        setServicesData,
        setBlogPostsData,
        setSkillsData,
        setAwardsData,
        resetToDefaults
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteProvider');
  }
  return context;
}
