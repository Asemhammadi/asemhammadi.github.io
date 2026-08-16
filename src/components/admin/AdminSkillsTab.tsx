import React, { useState, FormEvent } from 'react';
import { Award, Plus, Trash2, Edit3, Save, X, CheckCircle2, Wrench, Shield, Zap } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';
import { CertificationItem } from '../../types';

export function AdminSkillsTab() {
  const { skillsData, setSkillsData, certificationsData, setCertificationsData } = useSiteData();
  const [activeSubTab, setActiveSubTab] = useState<'skills' | 'certifications'>('skills');
  const [msg, setMsg] = useState('');

  // Skill state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCat, setNewSkillCat] = useState('Public Safety Systems');
  const [newSkillLevel, setNewSkillLevel] = useState(90);

  // Cert state
  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [isAddingCert, setIsAddingCert] = useState(false);

  const notify = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 4000);
  };

  // Skill handlers
  const handleAddSkill = (e: FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    setSkillsData(prev => [...prev, { name: newSkillName.trim(), category: newSkillCat, level: Number(newSkillLevel) }]);
    setNewSkillName('');
    notify(`Added skill: ${newSkillName}`);
  };

  const handleDeleteSkill = (index: number) => {
    setSkillsData(prev => prev.filter((_, i) => i !== index));
    notify('Skill removed.');
  };

  const handleUpdateSkillLevel = (index: number, level: number) => {
    setSkillsData(prev => prev.map((s, i) => i === index ? { ...s, level } : s));
  };

  // Cert handlers
  const emptyCert: CertificationItem = {
    id: `cert-${Date.now()}`,
    name: '',
    issuer: '',
    status: 'Completed',
    iconName: 'Award'
  };

  const handleSaveCert = (e: FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    if (isAddingCert) {
      setCertificationsData(prev => [...prev, editingCert]);
      notify('Certification added!');
    } else {
      setCertificationsData(prev => prev.map(c => c.id === editingCert.id ? editingCert : c));
      notify('Certification updated!');
    }
    setEditingCert(null);
  };

  const handleDeleteCert = (id: string) => {
    if (confirm('Delete certification?')) {
      setCertificationsData(prev => prev.filter(c => c.id !== id));
      notify('Certification deleted.');
    }
  };

  const categories = ['Public Safety Systems', 'Project & Governance', 'IT & Networking', 'Engineering & Research'];

  return (
    <div className="space-y-6 animate-in fade-in">
      {msg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{msg}</span>
        </div>
      )}

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('skills')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'skills'
              ? 'bg-emerald-500 text-slate-950 shadow'
              : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          Technical Skills & Tools ({skillsData.length})
        </button>
        <button
          onClick={() => setActiveSubTab('certifications')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'certifications'
              ? 'bg-emerald-500 text-slate-950 shadow'
              : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          Certifications & Credentials ({certificationsData.length})
        </button>
      </div>

      {activeSubTab === 'skills' ? (
        /* Technical Skills Section */
        <div className="space-y-6">
          {/* Add Skill Form */}
          <form onSubmit={handleAddSkill} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[180px] space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Skill Name</label>
              <input
                type="text"
                required
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="e.g. Milestone XProtect VMS"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Category</label>
              <select
                value={newSkillCat}
                onChange={(e) => setNewSkillCat(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="w-24 space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Level ({newSkillLevel}%)</label>
              <input
                type="range"
                min="50"
                max="100"
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </button>
          </form>

          {/* Skills List by Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map(cat => {
              const catSkills = skillsData.filter(s => s.category === cat);
              return (
                <div key={cat} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h5 className="text-xs font-bold text-emerald-400 border-b border-slate-800 pb-1.5 uppercase">
                    {cat}
                  </h5>
                  <div className="space-y-2">
                    {catSkills.map((s, idx) => {
                      const globalIndex = skillsData.findIndex(orig => orig.name === s.name && orig.category === s.category);
                      return (
                        <div key={idx} className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800/80">
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between text-xs font-semibold text-white">
                              <span>{s.name}</span>
                              <span className="text-emerald-400 font-mono text-[11px]">{s.level}%</span>
                            </div>
                            <input
                              type="range"
                              min="50"
                              max="100"
                              value={s.level}
                              onChange={(e) => handleUpdateSkillLevel(globalIndex, Number(e.target.value))}
                              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteSkill(globalIndex)}
                            className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Certifications Section */
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h5 className="text-xs font-bold text-slate-300">Certifications & Diplomas</h5>
            <button
              onClick={() => { setEditingCert(emptyCert); setIsAddingCert(true); }}
              className="py-1.5 px-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Certification</span>
            </button>
          </div>

          {editingCert && (
            <form onSubmit={handleSaveCert} className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-300">Certification Name</label>
                  <input
                    type="text"
                    required
                    value={editingCert.name}
                    onChange={(e) => setEditingCert({ ...editingCert, name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Issuer / Authority</label>
                  <input
                    type="text"
                    value={editingCert.issuer}
                    onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Status</label>
                  <select
                    value={editingCert.status || 'Completed'}
                    onChange={(e) => setEditingCert({ ...editingCert, status: e.target.value as 'Completed' | 'In Progress' })}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                >
                  Save Certification
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {certificationsData.map((cert) => (
              <div key={cert.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <h6 className="text-xs font-bold text-white">{cert.name}</h6>
                  <p className="text-[11px] text-slate-400">{cert.issuer} • <span className="text-emerald-400">{cert.status}</span></p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => { setEditingCert(cert); setIsAddingCert(false); }}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCert(cert.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
