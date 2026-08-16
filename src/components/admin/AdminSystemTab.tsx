import React, { useState } from 'react';
import { Settings, Key, RefreshCw, Shield, CheckCircle2, AlertTriangle, Download, Upload, FileJson } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';

export function AdminSystemTab() {
  const {
    personalInfo,
    workExperience,
    educationData,
    publicationsData,
    languagesData,
    certificationsData,
    projectsData,
    servicesData,
    blogPostsData,
    skillsData,
    awardsData,
    resetToDefaults
  } = useSiteData();

  const [newPass, setNewPass] = useState('');
  const [msg, setMsg] = useState('');

  const handleUpdatePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass.trim()) return;
    localStorage.setItem('admin_passcode', newPass.trim());
    setMsg('Admin passcode updated successfully!');
    setNewPass('');
    setTimeout(() => setMsg(''), 4000);
  };

  const handleExportBackup = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      personalInfo,
      workExperience,
      educationData,
      publicationsData,
      languagesData,
      certificationsData,
      projectsData,
      servicesData,
      blogPostsData,
      skillsData,
      awardsData
    };

    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `asem_alhammadi_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setMsg('Backup file downloaded successfully!');
    setTimeout(() => setMsg(''), 4000);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.personalInfo) localStorage.setItem('site_personal_info', JSON.stringify(data.personalInfo));
        if (data.workExperience) localStorage.setItem('site_work_exp', JSON.stringify(data.workExperience));
        if (data.educationData) localStorage.setItem('site_education', JSON.stringify(data.educationData));
        if (data.certificationsData) localStorage.setItem('site_certifications', JSON.stringify(data.certificationsData));
        if (data.projectsData) localStorage.setItem('site_projects', JSON.stringify(data.projectsData));
        if (data.servicesData) localStorage.setItem('site_services', JSON.stringify(data.servicesData));
        if (data.blogPostsData) localStorage.setItem('site_blog_posts', JSON.stringify(data.blogPostsData));
        if (data.skillsData) localStorage.setItem('site_skills', JSON.stringify(data.skillsData));
        if (data.awardsData) localStorage.setItem('site_awards', JSON.stringify(data.awardsData));

        setMsg('Portfolio state restored! Reloading application...');
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        alert('Invalid JSON backup file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetSite = () => {
    if (confirm('Are you sure you want to reset all portfolio data back to official factory defaults?')) {
      resetToDefaults();
      setMsg('All site data reset to factory default state.');
      setTimeout(() => setMsg(''), 4000);
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

      {/* Backup & Restore Section */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <FileJson className="w-5 h-5 text-teal-400" />
          <h4 className="text-sm font-bold text-white">Data Backup & One-Click Restore</h4>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Export your entire portfolio configuration (personal bio, project updates, services, skills, and articles) into a JSON backup file, or restore a previous backup.
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          <button
            onClick={handleExportBackup}
            className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Full JSON Backup</span>
          </button>

          <label className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all border border-slate-700">
            <Upload className="w-4 h-4 text-teal-400" />
            <span>Restore From JSON File</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Change Passcode */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Key className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-white">Change Admin Security Passcode</h4>
        </div>

        <form onSubmit={handleUpdatePasscode} className="space-y-3 max-w-md">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">New Administrator Passcode</label>
            <input
              type="password"
              required
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Enter new passcode"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-md"
          >
            Update Passcode
          </button>
        </form>
      </div>

      {/* Reset Factory Defaults */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <h4 className="text-sm font-bold text-white">Factory Reset Portfolio Content</h4>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Reset all customized profile info, experience roles, degrees, publications, and projects back to the original default values.
        </p>

        <button
          onClick={handleResetSite}
          className="py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset Portfolio to Factory Defaults</span>
        </button>
      </div>
    </div>
  );
}
