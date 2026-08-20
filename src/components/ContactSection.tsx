import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';

interface ContactSectionProps {
  selectedServiceInterest?: string;
  onOpenResumeModal: () => void;
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export function ContactSection({ selectedServiceInterest, onOpenResumeModal }: ContactSectionProps) {
  const { personalInfo } = useSiteData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Consulting / Systems Integration Opportunity',
    serviceInterest: selectedServiceInterest || '',
    message: ''
  });
  // botcheck is a honeypot: real users never see it, bots fill it in and get rejected.
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setResponseMsg('Please fill in your name, email address, and message.');
      return;
    }

    if (!WEB3FORMS_KEY) {
      setStatus('error');
      setResponseMsg(
        `This form is not configured yet. Please email ${personalInfo.email} directly.`
      );
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio inquiry: ${formData.subject || 'General'}`,
          from_name: 'Portfolio Contact Form',
          replyto: formData.email,
          botcheck,
          name: formData.name,
          email: formData.email,
          service_interest: formData.serviceInterest || 'General / Career Opportunity',
          message: formData.message
        })
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setResponseMsg(`Thank you, ${formData.name}! Your message was successfully sent to Asem Alhammadi.`);
        setFormData({
          name: '',
          email: '',
          subject: 'Consulting / Systems Integration Opportunity',
          serviceInterest: '',
          message: ''
        });
      } else {
        setStatus('error');
        setResponseMsg(data.message || 'Failed to submit message. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setResponseMsg('A network error occurred. Please try contacting Asem directly via email.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900/60 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3" data-reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Line & Inquiry Form</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get In Touch With Asem
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Open for Senior Systems Integration Lead roles, IT Project Management consulting, and enterprise physical security advisory.
          </p>
        </div>

        {/* Interactive Form — now centered as a single column */}
        <div className="max-w-2xl mx-auto" data-reveal data-reveal-stagger>
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
              Send a Direct Message
            </h3>

            {status === 'success' ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-3">
                <div className="flex items-center gap-2 text-base font-bold text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Message Delivered!</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200">{responseMsg}</p>
                <button
                  id="send-another-msg-btn"
                  onClick={() => setStatus('idle')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Spam honeypot — hidden from real users, checked by Web3Forms */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  checked={botcheck}
                  onChange={(e) => setBotcheck(e.target.checked)}
                  className="hidden"
                  aria-hidden="true"
                />

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{responseMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Your Name *</label>
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Your Email Address *</label>
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      placeholder="e.g. s.jenkins@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Subject</label>
                    <input
                      id="contact-subject-input"
                      type="text"
                      placeholder="Subject of inquiry..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Specific Service Interest</label>
                    <select
                      id="contact-service-select"
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      <option value="">-- General / Career Opportunity --</option>
                      <option value="Physical Security Systems Architecture">Physical Security Systems Architecture</option>
                      <option value="Systems Integration with IT Infrastructure">Systems Integration with IT Infrastructure</option>
                      <option value="IT Project Management & Vendor Oversight">IT Project Management & Vendor Oversight</option>
                      <option value="Construction & Site Readiness Support">Construction & Site Readiness Support</option>
                      <option value="Technical Documentation & Operational Training">Technical Documentation & Operational Training</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Your Message *</label>
                  <textarea
                    id="contact-message-textarea"
                    required
                    rows={5}
                    placeholder="Describe your project, hiring initiative, or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? 'Transmitting Message...' : 'Send Message to Asem'}</span>
                </button>

              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
