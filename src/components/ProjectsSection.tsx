import { useState, useRef, useCallback } from 'react';
import { CheckCircle2, ArrowRight, X, Sparkles, AlertTriangle, Layers } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import { ProjectItem } from '../types';
import { useModalA11y } from '../hooks/useModalA11y';
import { FocusReticle } from './FocusReticle';

export function ProjectsSection() {
  const { projectsData } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Hospital Systems', 'Physical Security', 'Network Infrastructure', 'Project Management'];

  const filteredProjects = projectsData
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory);

  const panelRef = useRef<HTMLDivElement>(null);
  const closeProjectModal = useCallback(() => setActiveModalProject(null), []);

  useModalA11y(activeModalProject !== null, closeProjectModal, panelRef);

  const openProjectModal = (proj: ProjectItem) => {
    setActiveModalProject(proj);
  };

  return (
    <section id="projects" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12" data-reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Portfolio Projects & Case Studies
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Real-world enterprise systems integration, hospital acquisitions, and physical security upgrades.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-reveal data-reveal-stagger>
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="relative bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 group"
            >
              <FocusReticle />

              {/* Top Banner & Header */}
              <div className="p-6 space-y-4">
                
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    {proj.category}
                  </span>
                  {proj.featured && (
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    {proj.clientOrOrg} • {proj.period}
                  </p>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {proj.summary}
                </p>

                {/* Measurable Results Snippet */}
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    Key Project Outcome
                  </span>
                  <div className="flex items-start gap-2 text-xs text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{proj.results[0]}</span>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

              {/* Card Footer Action */}
              <div className="p-6 pt-0">
                <button
                  id={`open-project-${proj.id}`}
                  onClick={() => openProjectModal(proj)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white font-bold text-xs transition-all shadow-sm"
                >
                  <span>Explore Case Study Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {activeModalProject && (
        <div
          id="project-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
          onClick={closeProjectModal}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="modal-panel bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
          >

            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md p-6 border-b border-slate-800 flex items-start justify-between gap-4 z-10">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  {activeModalProject.category} Case Study
                </span>
                <h3 id="project-modal-title" className="text-2xl font-extrabold text-white mt-1">
                  {activeModalProject.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {activeModalProject.clientOrOrg} • {activeModalProject.period}
                </p>
              </div>

              <button
                id="close-project-modal-btn"
                onClick={closeProjectModal}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Full Description */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Project Overview
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {activeModalProject.fullDescription}
                </p>
              </div>

              {/* Challenges Grid */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Key Site & Operational Challenges</span>
                </h4>
