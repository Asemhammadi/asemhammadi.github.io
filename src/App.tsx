import { useState, useEffect } from 'react';
import { SiteProvider } from './context/SiteContext';
import { SEOHead } from './components/SEOHead';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CareerTimeline } from './components/CareerTimeline';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsCertifications } from './components/SkillsCertifications';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { AICareerAssistantModal } from './components/AICareerAssistantModal';
import { AnalyticsModal } from './components/AnalyticsModal';
import { ResumeModal } from './components/ResumeModal';
import { AdminControlModal } from './components/AdminControlModal';
import { Footer } from './components/Footer';

function PortfolioApp() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedServiceInterest, setSelectedServiceInterest] = useState<string>('');

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('portfolio_theme') as 'dark' | 'light') || 'dark';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('portfolio_theme', nextTheme);
  };

  // Log page view telemetry
  useEffect(() => {
    try {
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'page_view',
          details: 'User loaded portfolio website',
          path: '/'
        })
      });
    } catch (e) {
      console.error('Analytics tracking error:', e);
    }
  }, []);

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setSelectedServiceInterest(serviceTitle);
    setActiveSection('contact');
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogProjectView = (projectName: string) => {
    try {
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'project_view',
          details: projectName,
          path: '/projects'
        })
      });
    } catch (e) {
      console.error('Error logging project view:', e);
    }
  };

  const handleLogArticleRead = (articleTitle: string) => {
    try {
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'blog_read',
          details: articleTitle,
          path: '/blog'
        })
      });
    } catch (e) {
      console.error('Error logging article read:', e);
    }
  };

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900 light-theme'
    }`}>
      
      {/* SEO & OpenGraph Injector */}
      <SEOHead activeSection={activeSection} />

      {/* Main Header Nav */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenAIModal={() => setIsAIModalOpen(true)}
        onOpenAnalyticsModal={() => setIsAnalyticsModalOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Main Body Content */}
      <main>
        <Hero
          onOpenAIModal={() => setIsAIModalOpen(true)}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
          onNavigateSection={(sec) => {
            setActiveSection(sec);
            document.getElementById(sec)?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <CareerTimeline />

        <ServicesSection
          onSelectServiceForContact={handleSelectServiceForContact}
        />

        <ProjectsSection
          onLogProjectView={handleLogProjectView}
        />

        <SkillsCertifications />

        <BlogSection
          onLogArticleRead={handleLogArticleRead}
        />

        <ContactSection
          selectedServiceInterest={selectedServiceInterest}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAIModal={() => setIsAIModalOpen(true)}
        onOpenAnalyticsModal={() => setIsAnalyticsModalOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Interactive Modals */}
      <AICareerAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onOpenResumeModal={() => {
          setIsAIModalOpen(false);
          setIsResumeModalOpen(true);
        }}
      />

      <AnalyticsModal
        isOpen={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      <AdminControlModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <PortfolioApp />
    </SiteProvider>
  );
}
