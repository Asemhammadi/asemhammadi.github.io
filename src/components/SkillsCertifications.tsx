import { Award, Shield, CheckCircle2, Cloud, Server, Lock, Terminal, Zap, Trophy, Cpu, Wrench, BookOpen, Globe, ExternalLink } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import { PropagationField } from './PropagationField';

export function SkillsCertifications() {
  const { certificationsData, skillsData, publicationsData, awardsData, languagesData } = useSiteData();

  const getCertIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-5 h-5 text-emerald-400" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-teal-400" />;
      case 'CheckCircle': return <CheckCircle2 className="w-5 h-5 text-cyan-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'Server': return <Server className="w-5 h-5 text-teal-400" />;
      case 'Lock': return <Lock className="w-5 h-5 text-amber-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-slate-300" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      default: return <Award className="w-5 h-5 text-emerald-400" />;
    }
  };

  const categories = ['IT Infrastructure & Networking', 'Project & Program Management', 'Security & Surveillance Systems', 'Engineering & Technical Research'];

  return (
    <section id="skills" className="py-20 bg-slate-900/60 relative border-t border-slate-800 overflow-hidden">
      <PropagationField />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3" data-reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials, Research & Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications, Research & Technical Proficiency
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Professional credentials, peer-reviewed scientific publications, technical mastery, and institutional awards.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Award className="w-5 h-5 text-emerald-400" />
            <span>Professional Certifications & Diplomas</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-emerald-500/5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/60">
                      {getCertIcon(cert.iconName)}
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      cert.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    }`}>
                      {cert.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peer-Reviewed Publications & Academic Research */}
        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <BookOpen className="w-5 h-5 text-teal-400" />
            <span>Academic Research & Peer-Reviewed Publications</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publicationsData.map((pub) => (
              <div key={pub.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      {pub.year} {pub.volumeInfo && `• ${pub.volumeInfo}`}
                    </span>
                    <BookOpen className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {pub.title}
                  </h4>

                  <p className="text-xs text-emerald-400 font-medium">
                    {pub.authors}
                  </p>

                  <p className="text-xs text-slate-400 italic">
                    {pub.journal}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {pub.abstractSnippet}
                  </p>
                </div>

                {pub.url && (
                  <div className="pt-4 mt-2 border-t border-slate-800/80">
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      <span>Read Published Journal Article</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technical Proficiency Breakdown */}
        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Wrench className="w-5 h-5 text-teal-400" />
            <span>Technical Tools & Systems Mastery</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-reveal data-reveal-stagger>
            {categories.map((cat) => {
              const skillsInCat = skillsData.filter(s => s.category === cat);
              return (
                <div key={cat} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-2">
                    {cat}
                  </h4>
                  <div className="space-y-3">
                    {skillsInCat.map((skill, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-200">{skill.name}</span>
                          <span className="text-slate-400 font-mono">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="skill-meter h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                            style={{ ['--level' as string]: `${skill.level}%` } as React.CSSProperties}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Languages & Honors Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          
          {/* Multilingual Proficiency */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span>Languages</span>
            </h3>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              {languagesData.map((lang, idx) => (
                <div key={idx} className="flex items-start justify-between border-b border-slate-800/60 pb-3 last:border-0 last:pb-0">
                  <div>
                    <h4 className="text-sm font-bold text-white">{lang.language}</h4>
                    {lang.note && <p className="text-xs text-slate-400 mt-0.5">{lang.note}</p>}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Recognition */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Awards & Academic Scholarships</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {awardsData.map((award, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex gap-3 hover:border-slate-700 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-white">{award.title}</h4>
                      <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full shrink-0">
                        {award.period}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-emerald-400">{award.organization}</p>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {award.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
