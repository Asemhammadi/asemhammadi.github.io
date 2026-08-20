import { Shield, ArrowUp, Send, Linkedin, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenResumeModal: () => void;
}

export function Footer({ onOpenResumeModal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Brand & Summary */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 font-bold">
                <Shield className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-white font-bold text-base">
                {PERSONAL_INFO.name}, {PERSONAL_INFO.credentials}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              {PERSONAL_INFO.title}. Specializing in enterprise physical security integration, hospital acquisitions, network infrastructure, and PMP® project delivery in 24x7 operations.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation & Resources
            </h4>
            <div className="grid grid-cols-2 gap-2 text-slate-400">
              <a href="#hero" className="hover:text-emerald-400 transition-colors">Overview</a>
              <a href="#experience" className="hover:text-emerald-400 transition-colors">Career Timeline</a>
              <a href="#services" className="hover:text-emerald-400 transition-colors">Services</a>
              <a href="#projects" className="hover:text-emerald-400 transition-colors">Portfolio Case Studies</a>
              <a href="#skills" className="hover:text-emerald-400 transition-colors">Certifications & Skills</a>
              <a href="#blog" className="hover:text-emerald-400 transition-colors">Technical Articles</a>
            </div>
          </div>

          {/* Direct Contact & Resume */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Get In Touch
            </h4>
            <div className="space-y-2">
              <button id="footer-resume-btn" onClick={onOpenResumeModal} className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer transition-colors">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>View Full Resume</span>
                </span>
              </button>

              <a href="#contact" className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors">
                <Send className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Send a Message</span>
              </a>

              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Asem Alhammadi, M.Sc., PMP. All rights reserved.</p>

          <button id="back-to-top-btn" onClick={scrollToTop} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-colors">
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
