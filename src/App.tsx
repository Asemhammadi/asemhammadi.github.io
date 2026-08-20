import { useState, useEffect, useRef } from 'react';
import { SiteProvider } from './context/SiteContext';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useScrollSpy } from './hooks/useScrollSpy';
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

const SECTION_IDS = ['hero', 'experience', 'services', 'projects', 'skills', 'blog', 'contact'];

function PortfolioApp() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedServiceInterest, setSelectedServiceInterest] = useState<string>('');

  // Nav highlight follows the scroll position, not just clicks.
  const activeSection = useScrollSpy(SECTION_IDS);
  useScrollReveal();

  // Reading-progress rail. Driven by a transform on a ref rather than React
  // state so scrolling never triggers a re-render.
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(pct, 1)})`;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

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
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900 light-theme'
    }`}>

      <a href="#main" className="skip-link">Skip to main content</a>

      <div id="scroll-progress" ref={progressRef} className="w-full" style={{ transform: 'scaleX(0)' }} />

      {/* Main Header Nav */}
      <Header
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Main Body Content */}
      <main id="main">
        <Hero
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onNavigateSection={(sec) => {
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
