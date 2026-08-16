import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, RefreshCw, MessageSquare, Phone, Mail, FileText } from 'lucide-react';
import { ChatMessage } from '../types';

interface AICareerAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal: () => void;
}

export function AICareerAssistantModal({ isOpen, onClose, onOpenResumeModal }: AICareerAssistantModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am Asem Alhammadi's AI Career Assistant powered by Gemini. Ask me anything about Asem's PMP certification, Boston Medical Center security integration projects, technical tools, or how to contact him!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedQuestions: [
        "What is Asem's role at Boston Medical Center?",
        "Tell me about his PMP® & Boston University Master's degree",
        "What VMS & Access Control systems does he integrate?",
        "How can I contact or hire Asem for a consulting role?"
      ]
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages
        })
      });

      const data = await response.json();
      const assistantText = data.text || "I'd be glad to answer more about Asem's qualifications or projects!";

      const assistantMsg: ChatMessage = {
        id: `msg_ai_${Date.now()}`,
        sender: 'assistant',
        text: assistantText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error fetching chat response:', err);
      const fallbackMsg: ChatMessage = {
        id: `msg_err_${Date.now()}`,
        sender: 'assistant',
        text: "Asem Alhammadi, M.Sc., PMP is a Senior Systems Integrator at Boston Medical Center with 15+ years experience across Milestone XProtect, Lenel OnGuard, CCURE 9000, and IT Infrastructure. You can reach him directly at asemalhamady92@yahoo.com or 781-426-7496.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-chat-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-slate-950 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Ask Asem's Career AI</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono">
                  Gemini 3.6
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Interactive Assistant for Resumes, Projects & Availability
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="ai-modal-resume-btn"
              onClick={onOpenResumeModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-emerald-400 font-semibold transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </button>

            <button
              id="close-ai-chat-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-950/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-500 px-1">
                {msg.sender === 'assistant' ? (
                  <>
                    <Bot className="w-3 h-3 text-emerald-400" />
                    <span className="font-bold text-emerald-400">Asem's Career AI</span>
                  </>
                ) : (
                  <>
                    <User className="w-3 h-3 text-slate-400" />
                    <span>You</span>
                  </>
                )}
                <span>• {msg.timestamp}</span>
              </div>

              <div
                className={`p-4 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-md space-y-2'
                }`}
              >
                {msg.text.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              {/* Suggested prompt chips */}
              {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 max-w-[90%]">
                  {msg.suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      id={`chip-q-${i}`}
                      onClick={() => handleSendMessage(q)}
                      className="text-left text-[11px] px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-500/20 border border-slate-800 hover:border-emerald-500/40 text-emerald-300 font-medium transition-all"
                    >
                      💡 "{q}"
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 p-3 bg-slate-900 border border-slate-800 rounded-2xl w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
              <span>Analyzing Asem's credentials & generating response...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="ai-chat-input"
              type="text"
              placeholder="Ask about Asem's PMP skills, BMC projects, or contact info..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              id="ai-chat-send-btn"
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
