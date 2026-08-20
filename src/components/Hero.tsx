import { Shield, Award, Building2, CheckCircle2, ArrowRight, Download, Mail, Linkedin } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import { CountUp } from './CountUp';

interface HeroProps {
  onOpenResumeModal: () => void;
  onNavigateSection: (sec: string) => void;
}

export function Hero({ onOpenResumeModal, onNavigateSection }: HeroProps) {
  const { personalInfo, photoUrl } = useSiteData();

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 hero-rise">
            
            {/* Status & Certification Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Available for Senior Integration & PM Leadership
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                PMP® Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
                <Building2 className="w-3.5 h-3.5 text-teal-400" />
                Boston Medical Center Lead
              </span>
            </div>

            {/* Title & Name */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-balance">
                {personalInfo.name}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">{personalInfo.credentials}</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-200">
                {personalInfo.title}
              </p>
            </div>

            {/* Professional Summary */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {personalInfo.summary}
            </p>

            {/* Key Strengths Grid Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                'Physical Security Architecture',
                'Milestone XProtect & Lenel',
                'Construction Site Readiness',
                '24x7 Healthcare Operations',
                'PMP® Project Delivery',
                'Active Directory & Networks'
              ].map((strength, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/80 border border-slate-800/80 px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{strength}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                id="hero-view-projects-btn"
                onClick={() => onNavigateSection('projects')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02]"
              >
                <span>View Portfolio Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-download-resume-btn"
                onClick={onOpenResumeModal}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-sm font-medium transition-all"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Resume</span>
              </button>
            </div>

            {/* Direct Links */}
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-emerald-400" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>{personalInfo.email}</span>
              </a>
            </div>

          </div>

          {/* Right Visual Card & Quick Metrics */}
          <div className="lg:col-span-5 relative hero-rise">
            
            {/* Visual Profile Display Box */}
            <div id="hero-profile-panel" className="relative rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 p-5 sm:p-6 shadow-2xl space-y-6">

              {/* Executive portrait. Falls back to a monogram plate until a photo is supplied —
                  see photoUrl in src/data/portfolioData.ts. */}
              <div id="hero-portrait" className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 group shadow-xl">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={`${personalInfo.name}, ${personalInfo.credentials}`}
                    className="w-full h-80 sm:h-96 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    id="hero-monogram"
                    role="img"
                    aria-label={`${personalInfo.name} — portrait placeholder`}
                    className="w-full h-80 sm:h-96 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"
                  >
                    <div className="w-28 h-28 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner">
                      <span className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-600">
                        {personalInfo.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div className="w-14 h-0.5 rounded-full bg-emerald-500/30" />
                  </div>
                )}

                {/* Top Badge Overlay */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PMP® Lead</span>
                </div>

                {/* Bottom Info Gradient Overlay */}
                <div id="hero-portrait-overlay" className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-4 pt-12 text-left pointer-events-none">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">{personalInfo.name}, {personalInfo.credentials}</h3>
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                  <p className="text-xs text-emerald-400 font-medium">{personalInfo.title}</p>
                  <p className="text-[11px] text-slate-300">Boston Medical Center • Public Safety & Systems Integration</p>
                </div>
              </div>

              {/* Stat Counter Grid */}
              <div className="grid grid-cols-2 gap-4" data-reveal data-reveal-stagger>
                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                  <div className="text-3xl font-extrabold text-emerald-400"><CountUp value={personalInfo.yearsExperience} /></div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Years Experience</div>
                  <div className="text-[10px] text-slate-400">Security, IT & Operations</div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                  <div className="text-3xl font-extrabold text-teal-400"><CountUp value={personalInfo.facilitiesManaged} /></div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Hospital Campuses</div>
                  <div className="text-[10px] text-slate-400">Boston Medical Center</div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                  <div className="text-3xl font-extrabold text-cyan-400"><CountUp value={personalInfo.projectsCompleted} /></div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Projects Delivered</div>
                  <div className="text-[10px] text-slate-400">Acquisitions & Renovations</div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                  <div className="text-3xl font-extrabold text-emerald-400"><CountUp value={personalInfo.certificationsCount} /></div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">Certifications</div>
                  <div className="text-[10px] text-slate-400">PMP, AWS, MS 365, Server</div>
                </div>
              </div>

              {/* Highlight Banner */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Role Model Award Winner</div>
                  <p className="text-[11px] text-slate-300">Boston Medical Center (2022–2025) for leadership & integration excellence.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
