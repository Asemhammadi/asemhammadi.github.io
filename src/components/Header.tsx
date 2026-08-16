import { useState, useEffect } from 'react';
import { Bot, BarChart3, Menu, X, Shield, Phone, Mail, FileText, ChevronRight, Sun, Moon, Lock, Settings } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenAIModal: () => void;
  onOpenAnalyticsModal: () => void;
  onOpenResumeModal: () => void;
  onOpenAdminModal: () => void;
}

export function Header({
  activeSection,
  setActiveSection,
  theme,
  onToggleTheme,
  onOpenAIModal,
  onOpenAnalyticsModal,
  onOpenResumeModal,
  onOpenAdminModal
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'experience', label: 'Career History' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Portfolio Projects' },
    { id: 'skills', label: 'Skills & Credentials' },
    { id: 'blog', label: 'Technical Articles' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Signature */}
          <button
            id="header-brand-btn"
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold tracking-tight text-base sm:text-lg group-hover:text-emerald-400 transition-colors">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-medium">
                  {PERSONAL_INFO.credentials}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Systems Integration Lead & PMP®
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Dark / Light Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            {/* Admin Control Panel Button */}
            <button
              id="admin-panel-header-btn"
              onClick={onOpenAdminModal}
              title="Admin Control Panel"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold hidden xl:inline">Admin</span>
            </button>

            <button
              id="ai-assistant-header-btn"
              onClick={onOpenAIModal}
              title="Ask Asem's AI Career Assistant"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all shadow-sm cursor-pointer"
            >
              <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Career AI</span>
            </button>

            <button
              id="analytics-header-btn"
              onClick={onOpenAnalyticsModal}
              title="Visitor Analytics Dashboard"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
            </button>

            <button
              id="resume-header-btn"
              onClick={onOpenResumeModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-theme-btn"
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>
            <button
              id="mobile-admin-btn"
              onClick={onOpenAdminModal}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400"
            >
              <Lock className="w-4 h-4" />
            </button>
            <button
              id="mobile-ai-btn"
              onClick={onOpenAIModal}
              className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
            >
              <Bot className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 mt-3 space-y-3 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
            <button
              id="mobile-resume-btn"
              onClick={() => { setIsMobileMenuOpen(false); onOpenResumeModal(); }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              <FileText className="w-4 h-4" />
              View Resume
            </button>
            <button
              id="mobile-analytics-btn"
              onClick={() => { setIsMobileMenuOpen(false); onOpenAnalyticsModal(); }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-medium"
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Analytics
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>

          <div className="pt-2 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800/80">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              {PERSONAL_INFO.phone}
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              {PERSONAL_INFO.email}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
