import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import MarkdownRenderer from './MarkdownRenderer';
import { useRole, ROLES } from '../context/RoleContext';
import { useTheme } from '../context/ThemeContext';
import {
  Bot,
  X,
  Maximize2,
  Send,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Dna,
  ShieldCheck,
  Activity,
  Zap,
  FileText,
  HeartHandshake,
  ArrowRight
} from 'lucide-react';

const REFERENCE_CHIPS = [
  { text: 'What is HLA typing?', icon: Dna, color: '#8b5cf6' },
  { text: 'What are stem cells?', icon: Activity, color: '#0d9488' },
  { text: 'Are cosmetic cures safe?', icon: ShieldCheck, color: '#d97706' },
  { text: 'Cord blood banking facts', icon: Zap, color: '#0284c7' },
  { text: 'How do I read my report?', icon: FileText, color: '#10b981' },
  { text: 'Doctor consultation prep', icon: HeartHandshake, color: '#6366f1' }
];

const CLINICAL_CHIPS = [
  { text: 'HLA 10/10 vs 9/10 match', icon: Dna, color: '#8b5cf6' },
  { text: 'CD34+ target dose guidelines', icon: Activity, color: '#0d9488' },
  { text: 'Conditioning regimen protocols', icon: ShieldCheck, color: '#d97706' },
  { text: 'Post-BMT engraftment milestones', icon: Zap, color: '#0284c7' }
];

const FloatingAIAssistant = ({ isOpenExternal, onCloseExternal }) => {
  const navigate = useNavigate();
  const { role } = useRole();
  const { isDark } = useTheme();
  const isDoctor = role === ROLES.DOCTOR;
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [messages, setMessages] = useState(() => [
    {
      sender: 'assistant',
      text: role === ROLES.DOCTOR
        ? "Hello Doctor. I am your **KOSHIKA Clinical Copilot**.\n\nI can assist with cellular therapy guidelines, HLA typing interpretations, conditioning regimens, and clinical trial matching.\n\nHow may I assist your clinical workflow today?"
        : "Hi! I'm **Koshika AI**.\n\nI can help you understand stem cell biology, interpret your medical reports, explore biobanking, and prepare for doctor consultations in simple words.\n\nHow can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: role === ROLES.DOCTOR ? 'KOSHIKA Clinical Copilot' : 'KOSHIKA AI'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  useEffect(() => {
    const handleCustomOpen = (e) => {
      const query = e.detail?.query;
      setIsOpen(true);
      if (query) {
        handleSend(query);
      }
    };
    window.addEventListener('open-koshika-ai', handleCustomOpen);
    return () => window.removeEventListener('open-koshika-ai', handleCustomOpen);
  }, [loading]);

  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (!nextState && onCloseExternal) {
      onCloseExternal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSend = async (customPrompt) => {
    const query = (customPrompt || input).trim();
    if (!query || loading) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/ai/chat/', {
        message: query,
        history: updatedMessages
      });
      const botMsg = {
        sender: 'assistant',
        text: res.data?.response || 'I am ready to help you with any questions regarding stem cells, donor matching, or your clinical reports.',
        source: res.data?.source || 'KOSHIKA AI',
        notice: res.data?.notice,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        sender: 'assistant',
        text: 'I am currently operating in resilient offline mode. ' + (err.response?.data?.error || err.message || 'Please consult your primary oncologist for personal medical decisions.'),
        source: 'KOSHIKA Offline Support',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, idx) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    }
  };

  return (
    <div className="koshika-floating-bot">
      {/* Creative Floating Trigger Button (Ask KOSHI) with Pulsing Live Status */}
      {!isOpen && (
        <button
          type="button"
          className="koshika-bot-pill-trigger shadow-sm hover-translate-y d-inline-flex align-items-center gap-2"
          onClick={toggleOpen}
          aria-label={isDoctor ? "Open KOSHIKA Clinical Copilot" : "Open Ask KOSHI"}
          title={isDoctor ? "KOSHIKA Clinical Copilot" : "Ask KOSHI"}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1050,
            background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
            color: '#ffffff',
            borderRadius: '9999px',
            padding: '11px 22px',
            fontWeight: 700,
            fontSize: '0.88rem',
            border: '1.5px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 8px 24px rgba(13, 148, 136, 0.45)',
            cursor: 'pointer',
            transition: 'all 0.22s ease'
          }}
        >
          <span
            className="koshika-pulsing-dot d-inline-block rounded-circle bg-success flex-shrink-0"
            style={{ width: '8px', height: '8px', boxShadow: '0 0 8px #10b981' }}
          ></span>
          <Bot size={18} />
          <span>{isDoctor ? 'Clinical Copilot' : 'Ask KOSHI'}</span>
          <Sparkles size={13} className="text-warning opacity-85" />
        </button>
      )}

      {/* Floating Chat Sheet / Modal */}
      {isOpen && (
        <div
          className="koshika-chat-modal"
          style={{
            backgroundColor: isDark ? 'var(--k-surface)' : '#ffffff',
            borderColor: isDark ? 'var(--k-border)' : '#e2e8f0'
          }}
        >
          {/* Header */}
          <div
            className="koshika-chat-header"
            style={{
              backgroundColor: isDark ? 'var(--k-surface)' : '#ffffff',
              borderColor: isDark ? 'var(--k-border)' : '#e2e8f0'
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white position-relative"
                style={{
                  width: '34px',
                  height: '34px',
                  background: 'linear-gradient(135deg, #0d9488 0%, #8b5cf6 100%)'
                }}
              >
                <Bot size={19} />
                <span
                  className="position-absolute bottom-0 end-0 rounded-circle bg-success border border-white"
                  style={{ width: '9px', height: '9px' }}
                ></span>
              </div>
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-1.5">
                  <span
                    className="fw-bold"
                    style={{
                      fontSize: '0.92rem',
                      color: isDark ? 'var(--k-text-primary)' : '#0f172a'
                    }}
                  >
                    {isDoctor ? 'KOSHIKA Copilot' : 'Ask Koshika'}
                  </span>
                  <span
                    className="badge rounded-pill px-2 py-0.5"
                    style={{
                      backgroundColor: isDoctor ? 'rgba(13, 148, 136, 0.15)' : 'rgba(2, 132, 199, 0.15)',
                      color: isDoctor ? '#2dd4bf' : '#38bdf8',
                      fontSize: '0.66rem',
                      fontWeight: 700
                    }}
                  >
                    {isDoctor ? 'Clinical AI' : 'Navigator'}
                  </span>
                </div>
                <span className="small text-muted" style={{ fontSize: '0.7rem' }}>
                  ICMR &amp; FACT-JACIE Aware
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center gap-1">
              <button
                type="button"
                className="btn btn-sm btn-light border-0 p-1.5 rounded-circle"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/ai-assistant');
                }}
                title="Open Fullscreen Assistant"
                style={{
                  backgroundColor: isDark ? 'var(--k-surface-alt)' : '#f1f5f9',
                  color: isDark ? 'var(--k-text-secondary)' : '#64748b'
                }}
              >
                <Maximize2 size={15} />
              </button>
              <button
                type="button"
                className="btn btn-sm btn-light border-0 p-1.5 rounded-circle"
                onClick={toggleOpen}
                aria-label="Close Assistant"
                style={{
                  backgroundColor: isDark ? 'var(--k-surface-alt)' : '#f1f5f9',
                  color: isDark ? 'var(--k-text-secondary)' : '#64748b'
                }}
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div
            className="koshika-chat-body"
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : '#fafbfc'
            }}
          >
            {messages.map((m, idx) => {
              const isBot = m.sender === 'assistant';
              return (
                <div
                  key={idx}
                  className={`koshika-chat-msg ${isBot ? 'koshika-chat-bot-msg' : 'koshika-chat-user-msg'}`}
                  style={
                    isBot
                      ? {
                          backgroundColor: isDark ? 'var(--k-surface)' : '#ffffff',
                          color: isDark ? 'var(--k-text-primary)' : '#0f172a',
                          borderColor: isDark ? 'var(--k-border)' : '#e2e8f0'
                        }
                      : {
                          background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                          color: '#ffffff',
                          border: 'none'
                        }
                  }
                >
                  {isBot && (
                    <div
                      className="d-flex align-items-center justify-content-between mb-1.5 pb-1 border-bottom"
                      style={{ borderColor: isDark ? 'var(--k-border)' : '#f1f5f9' }}
                    >
                      <span
                        className="badge fw-semibold d-inline-flex align-items-center gap-1"
                        style={{
                          backgroundColor: isDark ? 'var(--k-surface-alt)' : '#f1f5f9',
                          color: isDark ? '#2dd4bf' : '#0d9488',
                          fontSize: '0.68rem'
                        }}
                      >
                        <Sparkles size={11} />
                        <span>{m.source || 'Koshika AI'}</span>
                      </span>
                      <button
                        type="button"
                        className="btn btn-link p-0"
                        style={{ color: isDark ? 'var(--k-text-muted)' : '#94a3b8' }}
                        onClick={() => handleCopy(m.text, idx)}
                        title="Copy Response"
                      >
                        {copiedIdx === idx ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                      </button>
                    </div>
                  )}

                  <MarkdownRenderer content={m.text} />

                  <div
                    className="small text-end mt-1"
                    style={{
                      fontSize: '0.68rem',
                      color: isBot ? (isDark ? 'var(--k-text-muted)' : '#94a3b8') : 'rgba(255, 255, 255, 0.75)'
                    }}
                  >
                    {m.time}
                  </div>
                </div>
              );
            })}

            {/* Quick Colorful Suggestion Chips */}
            {messages.length <= 3 && !loading && (
              <div className="pt-1">
                <span
                  className="small fw-bold d-block mb-2"
                  style={{
                    fontSize: '0.76rem',
                    color: isDark ? '#2dd4bf' : '#0d9488'
                  }}
                >
                  ⚡ {isDoctor ? 'Clinical Inquiries:' : 'Popular Questions to Ask:'}
                </span>
                <div className="d-flex flex-wrap gap-1.5">
                  {(isDoctor ? CLINICAL_CHIPS : REFERENCE_CHIPS).map((chip, cIdx) => {
                    const ChipIcon = chip.icon;
                    return (
                      <button
                        key={cIdx}
                        type="button"
                        className="btn btn-sm text-start py-1 px-2.5 rounded-pill d-inline-flex align-items-center gap-1.5 hover-translate-y transition-all"
                        onClick={() => handleSend(chip.text)}
                        style={{
                          backgroundColor: isDark ? 'var(--k-surface)' : '#ffffff',
                          color: isDark ? 'var(--k-text-primary)' : '#1e293b',
                          border: isDark ? '1px solid var(--k-border)' : '1px solid #e2e8f0',
                          fontSize: '0.76rem',
                          cursor: 'pointer'
                        }}
                      >
                        <ChipIcon size={12} style={{ color: chip.color }} className="flex-shrink-0" />
                        <span>{chip.text}</span>
                        <ArrowRight size={10} className="text-muted opacity-50 ms-0.5" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {loading && (
              <div
                className="koshika-chat-msg koshika-chat-bot-msg d-flex align-items-center gap-2"
                style={{
                  backgroundColor: isDark ? 'var(--k-surface)' : '#ffffff',
                  borderColor: isDark ? 'var(--k-border)' : '#e2e8f0'
                }}
              >
                <div className="d-flex gap-1 align-items-center">
                  <span className="spinner-grow spinner-grow-sm text-teal" style={{ color: '#0d9488', width: '8px', height: '8px' }} role="status"></span>
                  <span className="spinner-grow spinner-grow-sm text-primary" style={{ color: '#8b5cf6', width: '8px', height: '8px' }} role="status"></span>
                </div>
                <span className="small" style={{ color: isDark ? 'var(--k-text-muted)' : '#64748b', fontSize: '0.8rem' }}>
                  {isDoctor ? 'Clinical Copilot is analyzing...' : 'Koshika AI is thinking...'}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div
            className="koshika-chat-input-bar"
            style={{
              backgroundColor: isDark ? 'var(--k-surface)' : '#ffffff',
              borderColor: isDark ? 'var(--k-border)' : '#e2e8f0'
            }}
          >
            <input
              ref={inputRef}
              type="text"
              className="koshika-chat-input"
              placeholder={isDoctor ? "Ask HLA match, CD34, regimen..." : "Ask your question..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={loading}
              style={{
                backgroundColor: isDark ? 'var(--k-surface-alt)' : '#fafbfc',
                color: isDark ? 'var(--k-text-primary)' : '#0f172a',
                borderColor: isDark ? 'var(--k-border)' : '#cbd5e1',
                fontSize: '0.86rem'
              }}
            />
            <button
              type="button"
              className="koshika-chat-send-btn shadow-2xs"
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)',
                color: '#ffffff',
                border: 'none',
                opacity: !input.trim() || loading ? 0.6 : 1
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingAIAssistant;
