import { useState } from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, ChevronDown, ChevronUp, Building, Award } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';

export function CareerTimeline() {
  const { workExperience, educationData } = useSiteData();
  const [activeTab, setActiveTab] = useState<'all' | 'work' | 'education'>('all');
  const [expandedId, setExpandedId] = useState<string>('exp-1');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? '' : id));
  };

  return (
    <section id="experience" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12" data-reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>15+ Years Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Career History & Education
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From university network technician to Senior Systems Integration Lead at Boston Medical Center.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              id="timeline-tab-all"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Milestones
            </button>
            <button
              id="timeline-tab-work"
              onClick={() => setActiveTab('work')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'work'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Professional Experience
            </button>
            <button
              id="timeline-tab-education"
              onClick={() => setActiveTab('education')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'education'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Education & Leadership
            </button>
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="space-y-8">
          
          {/* Work Experience Section */}
          {(activeTab === 'all' || activeTab === 'work') && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                <span>Professional Experience</span>
              </h3>

              <div className="relative border-l-2 border-slate-800 ml-4 pl-6 sm:ml-6 sm:pl-8 space-y-8">

                {/* Emerald rail drawn over the static border, growing downward as the
                    section comes into view. Decorative only. */}
                <span
                  aria-hidden="true"
                  data-reveal
                  className="timeline-rail absolute -left-[2px] top-0 w-[2px] h-full bg-gradient-to-b from-emerald-500 via-teal-500 to-transparent"
                />

                {workExperience.map((exp) => {
                  const isExpanded = expandedId === exp.id;
                  return (
                    <div key={exp.id} className="relative group" data-reveal data-reveal-dir="left">
                      
                      {/* Timeline Node Dot */}
                      <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        exp.isCurrent
                          ? 'bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/50 ring-4 ring-emerald-500/10'
                          : 'bg-slate-900 border-slate-700'
                      }`} />

                      {/* Card Content */}
                      <div className="bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 rounded-2xl p-6 transition-all shadow-xl">
                        
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                                {exp.role}
                              </h4>
                              {exp.isCurrent && (
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                                  Current Lead
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                              <span className="font-semibold text-slate-200 flex items-center gap-1">
                                <Building className="w-3.5 h-3.5 text-emerald-400" />
                                {exp.company}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                                {exp.location}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 w-fit">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{exp.period}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Toggle Expansion Button */}
                        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                          <button
                            id={`toggle-exp-${exp.id}`}
                            onClick={() => toggleExpand(exp.id)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                          >
                            <span>{isExpanded ? 'Hide Accomplishments' : 'View Key Accomplishments & Tools'}</span>
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>

                          {/* Tech Pills */}
                          <div className="hidden sm:flex flex-wrap gap-1.5 max-w-md justify-end">
                            {exp.technologies.slice(0, 4).map((tech, i) => (
                              <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                                {tech}
                              </span>
                            ))}
                            {exp.technologies.length > 4 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400">
                                +{exp.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                            <div className="space-y-2">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Key Contributions & Accomplishments
                              </h5>
                              <ul className="space-y-2">
                                {exp.highlights.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-2">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                Security & Infrastructure Tools Used
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech, idx) => (
                                  <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Education & Leadership Section */}
          {(activeTab === 'all' || activeTab === 'education') && (
            <div className="space-y-6 pt-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <GraduationCap className="w-5 h-5 text-teal-400" />
                <span>Degrees & Executive Leadership Training</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-reveal data-reveal-stagger="alternate">
                {educationData.map((edu) => (
                  <div key={edu.id} className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-slate-700 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-mono font-semibold text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                              {edu.year}
                            </span>
                            {edu.grade && (
                              <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                                Grade: {edu.grade}
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-bold text-white mt-2">
                            {edu.degree}
                          </h4>
                          <p className="text-xs font-medium text-emerald-400">{edu.field}</p>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-800 text-teal-400 shrink-0">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 pt-1">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>{edu.institution}</span>
                      </div>

                      {edu.thesisOrProject && (
                        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-emerald-300 font-medium">
                          <span className="font-bold text-slate-200">Research Focus: </span>
                          {edu.thesisOrProject}
                        </div>
                      )}
                    </div>

                    {edu.details && (
                      <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2.5 mt-2">
                        {edu.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
