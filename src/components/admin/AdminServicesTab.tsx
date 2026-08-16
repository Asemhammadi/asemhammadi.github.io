import React, { useState, FormEvent } from 'react';
import { Cpu, Plus, Trash2, Edit3, Save, X, CheckCircle2, ShieldAlert, Briefcase, Building, FileText } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';
import { ServiceItem } from '../../types';

export function AdminServicesTab() {
  const { servicesData, setServicesData } = useSiteData();
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [msg, setMsg] = useState('');

  const notify = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 4000);
  };

  const emptyService: ServiceItem = {
    id: `service-${Date.now()}`,
    title: '',
    subtitle: '',
    description: '',
    deliverables: [''],
    icon: 'Briefcase',
    technologies: ['']
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    if (isAdding) {
      setServicesData(prev => [...prev, editingService]);
      notify('New service added successfully!');
    } else {
      setServicesData(prev => prev.map(s => s.id === editingService.id ? editingService : s));
      notify('Service updated successfully!');
    }
    setEditingService(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this service from offerings?')) {
      setServicesData(prev => prev.filter(s => s.id !== id));
      notify('Service removed.');
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
            <Cpu className="w-5 h-5 text-teal-400" />
            <span>Services & Consulting Capabilities</span>
          </h4>
          <p className="text-xs text-slate-400">Manage consulting offerings, deliverables, and tech stack.</p>
        </div>

        <button
          onClick={() => {
            setEditingService(emptyService);
            setIsAdding(true);
          }}
          className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Service Form */}
      {editingService && (
        <form onSubmit={handleSave} className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h5 className="text-xs font-bold text-emerald-300 uppercase">
              {isAdding ? 'Add New Consulting Service' : 'Edit Service Offering'}
            </h5>
            <button type="button" onClick={() => setEditingService(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] font-semibold text-slate-300">Service Title</label>
              <input
                type="text"
                required
                value={editingService.title}
                onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Subtitle / Tagline</label>
              <input
                type="text"
                value={editingService.subtitle}
                onChange={(e) => setEditingService({ ...editingService, subtitle: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Icon Name</label>
              <select
                value={editingService.icon}
                onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              >
                <option value="ShieldAlert">ShieldAlert (Physical Security)</option>
                <option value="Cpu">Cpu (IT Infrastructure)</option>
                <option value="Briefcase">Briefcase (Project Management)</option>
                <option value="Building">Building (Construction Readiness)</option>
                <option value="FileText">FileText (Documentation & SOPs)</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Service Overview / Description</label>
              <textarea
                rows={3}
                value={editingService.description}
                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Deliverables (one per line)</label>
              <textarea
                rows={3}
                value={editingService.deliverables.join('\n')}
                onChange={(e) => setEditingService({
                  ...editingService,
                  deliverables: e.target.value.split('\n').filter(Boolean)
                })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Technologies (comma separated)</label>
              <input
                type="text"
                value={editingService.technologies.join(', ')}
                onChange={(e) => setEditingService({
                  ...editingService,
                  technologies: e.target.value.split(',').map(s => s.trim())
                })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingService(null)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Save Service
            </button>
          </div>
        </form>
      )}

      {/* Services List */}
      <div className="space-y-3">
        {servicesData.map((s) => (
          <div key={s.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h5 className="text-sm font-bold text-white">{s.title}</h5>
                <span className="text-[10px] bg-teal-500/10 text-teal-300 border border-teal-500/20 px-2 py-0.5 rounded-full">
                  {s.subtitle}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">{s.description}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {s.technologies.map((tech, i) => (
                  <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => { setEditingService(s); setIsAdding(false); }}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(s.id)}
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
