import React, { useState, useEffect } from 'react';
import { Mail, RefreshCw, Trash2, CheckCircle2, Download, Search, Tag, MessageSquare, Clock } from 'lucide-react';

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  serviceInterest?: string;
  message: string;
  timestamp: string;
}

export function AdminInquiriesTab() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  const [statusMsg, setStatusMsg] = useState('');

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.submissions) {
        setSubmissions(data.submissions);
      }
    } catch (e) {
      console.error('Failed to fetch contact inquiries:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const exportToCSV = () => {
    if (submissions.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Subject', 'Service Interest', 'Message', 'Timestamp'];
    const rows = submissions.map(s => [
      s.id,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${s.subject.replace(/"/g, '""')}"`,
      `"${(s.serviceInterest || '').replace(/"/g, '""')}"`,
      `"${s.message.replace(/"/g, '""')}"`,
      s.timestamp
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `contact_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = submissions.filter(s =>
    s.name.toLowerCase().includes(filter.toLowerCase()) ||
    s.email.toLowerCase().includes(filter.toLowerCase()) ||
    s.subject.toLowerCase().includes(filter.toLowerCase()) ||
    s.message.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      {statusMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{statusMsg}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-400" />
            <span>Client Inquiries & Contact Submissions</span>
          </h4>
          <p className="text-xs text-slate-400">View and respond to direct messages and consulting leads.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchSubmissions}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 cursor-pointer"
            title="Refresh submissions"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={exportToCSV}
            disabled={submissions.length === 0}
            className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by sender name, email, topic, or content..."
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Inquiries List & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
          {loading ? (
            <div className="p-8 text-center text-xs text-slate-500">Loading inquiries...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-500">
              No inquiries found.
            </div>
          ) : (
            filtered.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedSub(s)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                  selectedSub?.id === s.id
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-white'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h5 className="text-xs font-bold text-white truncate">{s.name}</h5>
                  <span className="text-[10px] text-slate-500 whitespace-nowrap">
                    {new Date(s.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-[11px] font-medium text-emerald-400 truncate">{s.subject}</p>
                <p className="text-[11px] text-slate-400 line-clamp-2">{s.message}</p>

                {s.serviceInterest && (
                  <span className="inline-block text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                    {s.serviceInterest}
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-4">
          {selectedSub ? (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-start gap-3">
                <div>
                  <h4 className="text-base font-bold text-white">{selectedSub.subject}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    From <span className="text-emerald-400 font-semibold">{selectedSub.name}</span> ({selectedSub.email})
                  </p>
                </div>

                <span className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {new Date(selectedSub.timestamp).toLocaleString()}
                </span>
              </div>

              {selectedSub.serviceInterest && (
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <Tag className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Service Interest: <strong>{selectedSub.serviceInterest}</strong></span>
                </div>
              )}

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Message Content</span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedSub.message}
                </p>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <a
                  href={`mailto:${selectedSub.email}?subject=Re: ${encodeURIComponent(selectedSub.subject)}`}
                  className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
              <Mail className="w-8 h-8 text-slate-700" />
              <span>Select an inquiry from the left list to view full details.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
