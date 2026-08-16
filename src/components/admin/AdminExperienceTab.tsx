import React, { useState, FormEvent } from 'react';
import { Briefcase, Plus, Trash2, Edit3, Save, X, CheckCircle2 } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';
import { WorkExperience } from '../../types';

export function AdminExperienceTab() {
  const { workExperience, setWorkExperience } = useSiteData();
  const [editingExp, setEditingExp] = useState<WorkExperience | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [msg, setMsg] = useState('');

  const notify = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 4000);
  };

  const emptyExp: WorkExperience = {
    id: `exp-${Date.now()}`,
    role: '',
    company: '',
    location: '',
    period: '',
    isCurrent: false,
    category: 'systems-integration',
    description: '',
    highlights: [''],
    technologies: ['']
  };

  const handleStartAdd = () => {
    setEditingExp(emptyExp);
    setIsAdding(true);
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    if (isAdding) {
      setWorkExperience(prev => [editingExp, ...prev]);
      notify('New career experience added!');
    } else {
      setWorkExperience(prev => prev.map(item => item.id === editingExp.id ? editingExp : item));
      notify('Career experience updated!');
    }
    setEditingExp(null);
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this experience position?')) {
      setWorkExperience(prev => prev.filter(item => item.id !== id));
      notify('Position deleted.');
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
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <span>Career History Management</span>
          </h4>
          <p className="text-xs text-slate-400">Add, edit, or reorder roles shown in the Career Timeline.</p>
        </div>

        <button
          onClick={handleStartAdd}
          className="py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      {/* Experience Form Modal/Panel */}
      {editingExp && (
        <form onSubmit={handleSave} className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h5 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              {isAdding ? 'Add New Experience Entry' : 'Edit Experience Entry'}
            </h5>
            <button type="button" onClick={() => setEditingExp(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Job Title / Role</label>
              <input
                type="text"
                required
                value={editingExp.role}
                onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Organization / Company</label>
              <input
                type="text"
                required
                value={editingExp.company}
                onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Location</label>
              <input
                type="text"
                value={editingExp.location}
                onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Period (e.g. May 2025 – Present)</label>
              <input
                type="text"
                value={editingExp.period}
                onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Overview Description</label>
              <textarea
                rows={2}
                value={editingExp.description}
                onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Highlights (comma separated)</label>
              <input
                type="text"
                value={editingExp.highlights.join('; ')}
                onChange={(e) => setEditingExp({ ...editingExp, highlights: e.target.value.split(';').map(s => s.trim()) })}
                placeholder="Highlight 1; Highlight 2; Highlight 3"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Technologies / Tools (comma separated)</label>
              <input
                type="text"
                value={editingExp.technologies.join(', ')}
                onChange={(e) => setEditingExp({ ...editingExp, technologies: e.target.value.split(',').map(s => s.trim()) })}
                placeholder="Lenel, Milestone, Cisco, AWS"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingExp(null)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Entry</span>
            </button>
          </div>
        </form>
      )}

      {/* Experience List */}
      <div className="space-y-3">
        {workExperience.map((exp) => (
          <div key={exp.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h5 className="text-sm font-bold text-white">{exp.role}</h5>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {exp.period}
                </span>
              </div>
              <p className="text-xs text-emerald-300 font-semibold">{exp.company} • {exp.location}</p>
              <p className="text-xs text-slate-400 line-clamp-2">{exp.description}</p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => { setEditingExp(exp); setIsAdding(false); }}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Edit"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                title="Delete"
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
