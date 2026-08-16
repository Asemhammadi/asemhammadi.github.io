import React, { useState, FormEvent } from 'react';
import { FolderKanban, Plus, Trash2, Edit3, Save, X, CheckCircle2 } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';
import { ProjectItem } from '../../types';

export function AdminProjectsTab() {
  const { projectsData, setProjectsData } = useSiteData();
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [msg, setMsg] = useState('');

  const notify = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 4000);
  };

  const emptyProject: ProjectItem = {
    id: `proj-${Date.now()}`,
    title: '',
    clientOrOrg: 'Boston Medical Center',
    category: 'Physical Security',
    period: '2024 – Present',
    summary: '',
    fullDescription: '',
    challenges: [''],
    solutions: [''],
    results: [''],
    technologies: ['Milestone XProtect', 'Lenel OnGuard'],
    featured: false,
    imageSeed: 'security'
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (isAdding) {
      setProjectsData(prev => [editingProject, ...prev]);
      notify('New enterprise project added!');
    } else {
      setProjectsData(prev => prev.map(p => p.id === editingProject.id ? editingProject : p));
      notify('Project updated successfully!');
    }
    setEditingProject(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete project from portfolio?')) {
      setProjectsData(prev => prev.filter(p => p.id !== id));
      notify('Project removed.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {msg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{msg}</span>
        </div>
      )}

      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-emerald-400" />
            <span>Enterprise Projects Portfolio</span>
          </h4>
          <p className="text-xs text-slate-400">Manage case studies, scale metrics, and tech stacks.</p>
        </div>

        <button
          onClick={() => {
            setEditingProject(emptyProject);
            setIsAdding(true);
          }}
          className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Project Form */}
      {editingProject && (
        <form onSubmit={handleSave} className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h5 className="text-xs font-bold text-emerald-300 uppercase">
              {isAdding ? 'Add Enterprise Project' : 'Edit Project Details'}
            </h5>
            <button type="button" onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] font-semibold text-slate-300">Project Title</label>
              <input
                type="text"
                required
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Client / Organization</label>
              <input
                type="text"
                value={editingProject.clientOrOrg}
                onChange={(e) => setEditingProject({ ...editingProject, clientOrOrg: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Period / Timeline</label>
              <input
                type="text"
                value={editingProject.period}
                onChange={(e) => setEditingProject({ ...editingProject, period: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Short Summary</label>
              <textarea
                rows={2}
                value={editingProject.summary}
                onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Technologies (comma separated)</label>
              <input
                type="text"
                value={editingProject.technologies.join(', ')}
                onChange={(e) => setEditingProject({
                  ...editingProject,
                  technologies: e.target.value.split(',').map(s => s.trim())
                })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Save Project
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="space-y-3">
        {projectsData.map((p) => (
          <div key={p.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h5 className="text-sm font-bold text-white">{p.title}</h5>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                  {p.category}
                </span>
              </div>
              <p className="text-xs text-slate-400">{p.summary}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {p.technologies.map((tech, i) => (
                  <span key={i} className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => { setEditingProject(p); setIsAdding(false); }}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="p-2 rounded-lg bg-rose-500/10 text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
