import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle2, AlertCircle, FileText, Download } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';

interface ContactSectionProps {
  selectedServiceInterest?: string;
  onOpenResumeModal: () => void;
}

export function ContactSection({ selectedServiceInterest, onOpenResumeModal }: ContactSectionProps) {
  const { personalInfo } = useSiteData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Consulting / Systems Integration Opportunity',
    serviceInterest: selectedServiceInterest || '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setResponseMsg('Please fill in your name, email address, and message.');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
        setResponseMsg(data.error || 'Failed to submit message. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setResponseMsg('A network error occurred. Please try contacting Asem directly via email or phone.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900/60 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Contact Details
              </h3>

              <div className="space-y-4 text-sm">
                
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Phone & Mobile</span>
                    <p className="text-white font-semibold">{personalInfo.phone}</p>
                    <p className="text-xs text-slate-400">617-413-6807 (Alt)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Email Address</span>
                    <p className="text-white font-semibold">{personalInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Location</span>
                    <p className="text-white font-semibold">{personalInfo.location}</p>
                    <p className="text-xs text-slate-400">Greater Boston Area, MA</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">LinkedIn Profile</span>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline font-semibold block"
                    >
                      {personalInfo.linkedin}
                    </a>
                  </div>
                </div>

              </div>

              {/* Resume Trigger Card */}
              <div className="pt-2">
                <button
                  id="contact-section-resume-btn"
                  onClick={onOpenResumeModal}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Full Printable Resume</span>
                </button>
              </div>

            </div>

          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
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
