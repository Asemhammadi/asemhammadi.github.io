import { useState } from 'react';
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
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';

function PortfolioApp() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedServiceInterest, setSelectedServiceInterest] = useState<string>('');

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('portfolio_theme') as 'dark' | 'light') || 'dark';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('portfolio_theme', nextTheme);
  };

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setSelectedServiceInterest(serviceTitle);
    setActiveSection('contact');
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
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
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Main Body Content */}
      <main>
        <Hero
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onNavigateSection={(sec) => {
            setActiveSection(sec);
            document.getElementById(sec)?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <CareerTimeline />

        <ServicesSection
          onSelectServiceForContact={handleSelectServiceForContact}
        />

        <ProjectsSection />

        <SkillsCertifications />

        <BlogSection />

        <ContactSection
          selectedServiceInterest={selectedServiceInterest}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
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
