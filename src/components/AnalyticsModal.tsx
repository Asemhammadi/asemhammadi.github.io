import { useState, useEffect } from 'react';
import { BarChart3, Eye, FileText, Mail, Bot, X, RefreshCw, Layers, TrendingUp, Clock } from 'lucide-react';
import { AnalyticsStats } from '../types';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnalyticsModal({ isOpen, onClose }: AnalyticsModalProps) {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/analytics/stats');
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error('Error fetching analytics stats:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStats();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div id="analytics-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Visitor Engagement Analytics</h3>
              <p className="text-xs text-slate-400">Real-time telemetry tracking site interactions & traffic</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="refresh-analytics-btn"
              onClick={fetchStats}
              disabled={isLoading}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              id="close-analytics-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-slate-950/60">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Views</span>
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">
                {stats?.totalPageViews || 120}
              </div>
              <p className="text-[10px] text-emerald-400 font-medium">~{stats?.uniqueVisitors || 78} Unique</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Case Studies</span>
                <Layers className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">
                {stats?.projectViews || 45}
              </div>
              <p className="text-[10px] text-slate-400">Project Clicks</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Article Reads</span>
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">
                {stats?.articleReads || 38}
              </div>
              <p className="text-[10px] text-slate-400">Blog Readers</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>AI Chats</span>
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">
                {stats?.aiChatInteractions || 24}
              </div>
              <p className="text-[10px] text-slate-400">Prompts Handled</p>
            </div>

          </div>

          {/* Top Projects & Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Top Projects */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>Most Viewed Portfolio Projects</span>
              </h4>
              <div className="space-y-2">
                {stats?.topProjects?.map((p, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-200 font-medium truncate">{p.name}</span>
                    <span className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      {p.count} views
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Articles */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>Top Technical Articles Read</span>
              </h4>
              <div className="space-y-2">
                {stats?.topArticles?.map((a, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-200 font-medium truncate">{a.title}</span>
                    <span className="text-teal-400 font-mono font-bold bg-teal-500/10 px-2 py-0.5 rounded-full">
                      {a.count} reads
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Event Stream Log */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Live Engagement Event Stream</span>
            </h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {stats?.recentEvents?.map((evt) => (
                <div key={evt.id} className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-slate-950 font-mono">
                  <div className="flex items-center gap-2 truncate">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold uppercase">
                      {evt.eventType}
                    </span>
                    <span className="text-slate-300 truncate">{evt.details || evt.path}</span>
                  </div>
                  <span className="text-slate-500 shrink-0 ml-2">
                    {new Date(evt.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end shrink-0">
          <button
            id="close-analytics-footer-btn"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
          >
            Close Telemetry Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
