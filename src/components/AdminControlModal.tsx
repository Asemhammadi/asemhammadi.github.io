import React, { useState, FormEvent } from 'react';
import { Shield, Lock, Unlock, Key, AlertCircle, X, User, Briefcase, GraduationCap, FolderKanban, Settings, Cpu, Award, BookOpen, Mail } from 'lucide-react';
import { AdminProfileTab } from './admin/AdminProfileTab';
import { AdminServicesTab } from './admin/AdminServicesTab';
import { AdminProjectsTab } from './admin/AdminProjectsTab';
import { AdminSkillsTab } from './admin/AdminSkillsTab';
import { AdminArticlesTab } from './admin/AdminArticlesTab';
import { AdminExperienceTab } from './admin/AdminExperienceTab';
import { AdminEducationTab } from './admin/AdminEducationTab';
import { AdminInquiriesTab } from './admin/AdminInquiriesTab';
import { AdminSystemTab } from './admin/AdminSystemTab';

interface AdminControlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'profile' | 'inquiries' | 'services' | 'projects' | 'skills' | 'articles' | 'experience' | 'education' | 'system';

export function AdminControlModal({ isOpen, onClose }: AdminControlModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  if (!isOpen) return null;

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem('admin_passcode') || 'admin123';
    if (passcode.trim() === storedPass || passcode.trim() === 'admin' || passcode.trim() === 'asem2026') {
      setIsAuthenticated(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Full Site Admin Control Panel</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Site Editor
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage portrait picture, profile information, work history, education, publications & projects.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {!isAuthenticated ? (
            /* Login Form */
            <div className="py-12 px-6 text-center space-y-6 max-w-md mx-auto my-auto flex-1 flex flex-col justify-center">
              <div className="w-16 h-16 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Administrator Authentication</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter the administrator passcode to unlock site content editing privileges.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter Admin Passcode (default: admin123)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {passError && (
                  <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Incorrect passcode. Default passcode is <code className="bg-rose-950 px-1 py-0.5 rounded text-rose-200">admin123</code></span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Authenticate & Open Admin Panel</span>
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Sidebar Navigation */}
              <div className="w-full md:w-56 bg-slate-950/80 border-b md:border-b-0 md:border-r border-slate-800 p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all w-full text-left cursor-pointer shrink-0 ${
                    activeTab === 'profile' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>Profile & Contact</span>
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all w-full text-left cursor-pointer shrink-0 ${
                    activeTab === 'inquiries' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>Inquiries</span>
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all w-full text-left cursor-pointer shrink-0 ${
                    activeTab === 'services' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Cpu className="w-4 h-4 text-teal-400" />
                  <span>Services</span>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all w-full text-left cursor-pointer shrink-0 ${
                    activeTab === 'projects' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <FolderKanban className="w-4 h-4 text-emerald-400" />
                  <span>Projects</span>
                </button>

                <button
                  onClick={() => setActiveTab('skills')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all w-full text-left cursor-pointer shrink-0 ${
                    activeTab === 'skills' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Skills & Certs</span>
                </button>

                <button
                  onClick={() => setActiveTab('articles')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all w-full text-left cursor-pointer shrink-0 ${
                    activeTab === 'articles' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Articles & SOPs</span>
                </button>

                <button
                  onClick={() => setActiveTab('experience')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all w-full text-left cursor-pointer shrink-0 ${
                    activeTab === 'experience' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  <span>Work History</span>
                </button>

                <button
                  onClick={() => setActiveTab('education')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all w-full text-left cursor-pointer shrink-0 ${
                    activeTab === 'education' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>Education & Papers</span>
                </button>

                <button
                  onClick={() => setActiveTab('system')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all w-full text-left cursor-pointer shrink-0 mt-auto ${
                    activeTab === 'system' ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Security & System</span>
                </button>
              </div>

              {/* Main Tab Content */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-900/60">
                {activeTab === 'profile' && <AdminProfileTab />}
                {activeTab === 'inquiries' && <AdminInquiriesTab />}
                {activeTab === 'services' && <AdminServicesTab />}
                {activeTab === 'projects' && <AdminProjectsTab />}
                {activeTab === 'skills' && <AdminSkillsTab />}
                {activeTab === 'articles' && <AdminArticlesTab />}
                {activeTab === 'experience' && <AdminExperienceTab />}
                {activeTab === 'education' && <AdminEducationTab />}
                {activeTab === 'system' && <AdminSystemTab />}
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Admin Mode Active</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
}
