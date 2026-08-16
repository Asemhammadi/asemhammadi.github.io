import React, { useState, FormEvent } from 'react';
import { GraduationCap, BookOpen, Plus, Trash2, Edit3, Save, X, CheckCircle2 } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';
import { EducationItem, PublicationItem } from '../../types';

export function AdminEducationTab() {
  const { educationData, setEducationData, publicationsData, setPublicationsData } = useSiteData();
  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);
  const [isAddingEdu, setIsAddingEdu] = useState(false);
  const [editingPub, setEditingPub] = useState<PublicationItem | null>(null);
  const [isAddingPub, setIsAddingPub] = useState(false);
  const [msg, setMsg] = useState('');

  const notify = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 4000);
  };

  /* Education Handlers */
  const handleSaveEdu = (e: FormEvent) => {
    e.preventDefault();
    if (!editingEdu) return;

    if (isAddingEdu) {
      setEducationData(prev => [editingEdu, ...prev]);
      notify('New education record added!');
    } else {
      setEducationData(prev => prev.map(item => item.id === editingEdu.id ? editingEdu : item));
      notify('Education record updated!');
    }
    setEditingEdu(null);
  };

  /* Publication Handlers */
  const handleSavePub = (e: FormEvent) => {
    e.preventDefault();
    if (!editingPub) return;

    if (isAddingPub) {
      setPublicationsData(prev => [editingPub, ...prev]);
      notify('New academic publication added!');
    } else {
      setPublicationsData(prev => prev.map(p => p.id === editingPub.id ? editingPub : p));
      notify('Publication record updated!');
    }
    setEditingPub(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {msg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{msg}</span>
        </div>
      )}

      {/* SECTION 1: Academic Degrees & MSc GPA */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <span>Degrees & Academic Achievements</span>
            </h4>
            <p className="text-xs text-slate-400">Manage degree records and final MSc grade (Boston University 3.670 / 4.00).</p>
          </div>

          <button
            onClick={() => {
              setEditingEdu({
                id: `edu-${Date.now()}`,
                degree: 'Master of Science',
                field: '',
                institution: '',
                year: '',
                grade: '3.670 / 4.00 (GPA)',
                details: ''
              });
              setIsAddingEdu(true);
            }}
            className="py-2 px-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Degree</span>
          </button>
        </div>

        {/* Edu Form */}
        {editingEdu && (
          <form onSubmit={handleSaveEdu} className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h5 className="text-xs font-bold text-indigo-300 uppercase">
                {isAddingEdu ? 'Add Degree Entry' : 'Edit Degree Entry'}
              </h5>
              <button type="button" onClick={() => setEditingEdu(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Degree</label>
                <input
                  type="text"
                  required
                  value={editingEdu.degree}
                  onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Field / Specialization</label>
                <input
                  type="text"
                  required
                  value={editingEdu.field}
                  onChange={(e) => setEditingEdu({ ...editingEdu, field: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Institution / University</label>
                <input
                  type="text"
                  required
                  value={editingEdu.institution}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Final Grade / GPA</label>
                <input
                  type="text"
                  value={editingEdu.grade || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, grade: e.target.value })}
                  placeholder="3.670 / 4.00 (GPA)"
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-300 font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Year Period</label>
                <input
                  type="text"
                  value={editingEdu.year}
                  onChange={(e) => setEditingEdu({ ...editingEdu, year: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Program Details & Focus</label>
                <textarea
                  rows={2}
                  value={editingEdu.details}
                  onChange={(e) => setEditingEdu({ ...editingEdu, details: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingEdu(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Degree</span>
              </button>
            </div>
          </form>
        )}

        {/* Edu List */}
        <div className="space-y-3">
          {educationData.map((edu) => (
            <div key={edu.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h5 className="text-sm font-bold text-white">{edu.degree} in {edu.field}</h5>
                  {edu.grade && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                      {edu.grade}
                    </span>
                  )}
                </div>
                <p className="text-xs text-indigo-300 font-semibold">{edu.institution} ({edu.year})</p>
                <p className="text-xs text-slate-400">{edu.details}</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => { setEditingEdu(edu); setIsAddingEdu(false); }}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Delete degree?')) setEducationData(prev => prev.filter(e => e.id !== edu.id));
                  }}
                  className="p-2 rounded-lg bg-rose-500/10 text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Academic Publications */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-400" />
              <span>Research & Publications</span>
            </h4>
            <p className="text-xs text-slate-400">Master's Capstone projects and published academic research papers.</p>
          </div>

          <button
            onClick={() => {
              setEditingPub({
                id: `pub-${Date.now()}`,
                title: '',
                publisher: '',
                date: '',
                type: 'Master\'s Capstone Project',
                description: '',
                doi: '',
                url: ''
              });
              setIsAddingPub(true);
            }}
            className="py-2 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Publication</span>
          </button>
        </div>

        {/* Publication Form */}
        {editingPub && (
          <form onSubmit={handleSavePub} className="p-4 rounded-2xl bg-slate-950 border border-teal-500/40 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h5 className="text-xs font-bold text-teal-300 uppercase">
                {isAddingPub ? 'Add Research Publication' : 'Edit Research Publication'}
              </h5>
              <button type="button" onClick={() => setEditingPub(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-semibold text-slate-300">Paper Title</label>
                <input
                  type="text"
                  required
                  value={editingPub.title}
                  onChange={(e) => setEditingPub({ ...editingPub, title: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Publisher / Academic Body</label>
                <input
                  type="text"
                  value={editingPub.publisher}
                  onChange={(e) => setEditingPub({ ...editingPub, publisher: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Date</label>
                <input
                  type="text"
                  value={editingPub.date}
                  onChange={(e) => setEditingPub({ ...editingPub, date: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Abstract / Summary</label>
                <textarea
                  rows={2}
                  value={editingPub.description}
                  onChange={(e) => setEditingPub({ ...editingPub, description: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingPub(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Save Publication
              </button>
            </div>
          </form>
        )}

        {/* Pubs list */}
        <div className="space-y-3">
          {publicationsData.map((pub) => (
            <div key={pub.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-white">{pub.title}</h5>
                <p className="text-xs text-teal-300">{pub.publisher} ({pub.date})</p>
                <p className="text-xs text-slate-400">{pub.description}</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => { setEditingPub(pub); setIsAddingPub(false); }}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Delete publication?')) setPublicationsData(prev => prev.filter(p => p.id !== pub.id));
                  }}
                  className="p-2 rounded-lg bg-rose-500/10 text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
