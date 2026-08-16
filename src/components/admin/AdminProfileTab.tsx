import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { User, Image as ImageIcon, Save, Upload, RefreshCw, Lock, CheckCircle2 } from 'lucide-react';
import { useSiteData, PersonalInfoType } from '../../context/SiteContext';

export function AdminProfileTab() {
  const { personalInfo, photoUrl, updatePersonalInfo, updatePhotoUrl } = useSiteData();
  const [form, setForm] = useState<PersonalInfoType>(personalInfo);
  const [photoInput, setPhotoInput] = useState<string>(photoUrl);
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const notify = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 4000);
  };

  const handleSaveInfo = (e: FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(form);
    notify('Personal profile and contact info saved successfully!');
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Please choose an image under 10MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const res = ev.target?.result as string;
        if (res) {
          setPhotoInput(res);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyPhoto = () => {
    updatePhotoUrl(photoInput);
    notify('Official portrait picture updated across the site!');
  };

  const handleResetPhoto = () => {
    const def = '/asem_alhammadi_photo.png';
    setPhotoInput(def);
    updatePhotoUrl(def);
    notify('Reset to default portrait picture.');
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {msg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{msg}</span>
        </div>
      )}

      {/* Profile Photo Section */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">Official Portrait Management</h4>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-mono border border-emerald-500/20 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>Admin Protected</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-44 bg-slate-900 flex items-center justify-center">
            <img
              src={photoInput}
              alt="Asem Portrait"
              className="w-full h-full object-cover object-top"
              onError={(e) => { e.currentTarget.src = '/asem_alhammadi_photo.png'; }}
            />
          </div>

          <div className="sm:col-span-2 space-y-3">
            <input type="file" ref={fileRef} accept="image/*" onChange={handleFileUpload} className="hidden" />
            
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Upload New Photo File</span>
            </button>

            <input
              type="text"
              value={photoInput}
              onChange={(e) => setPhotoInput(e.target.value)}
              placeholder="Or enter image URL"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
            />

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleApplyPhoto}
                className="flex-1 py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Apply Photo</span>
              </button>

              <button
                type="button"
                onClick={handleResetPhoto}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Info Form */}
      <form onSubmit={handleSaveInfo} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-teal-400" />
            <h4 className="text-sm font-bold text-white">Full Profile & Contact Fields</h4>
          </div>
          <button
            type="submit"
            className="py-2 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Display Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Credentials</label>
            <input
              type="text"
              value={form.credentials}
              onChange={(e) => setForm({ ...form, credentials: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <input
              type="text"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">LinkedIn URL</label>
            <input
              type="text"
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-300">Executive Summary</label>
            <textarea
              rows={3}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
