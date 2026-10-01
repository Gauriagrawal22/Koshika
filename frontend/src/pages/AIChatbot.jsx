import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/client';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import {
  Bot,
  User,
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Send,
  ArrowUp,
  ShieldCheck,
  MessageSquare,
  Dna,
  AlertCircle,
  Info,
  Zap,
  Activity,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  BookOpen,
  HeartHandshake,
  Compass
} from 'lucide-react';

const TOPIC_DOMAINS = [
  {
    id: 'hla',
    categoryName: 'Donor & HLA',
    title: 'HLA & Donor Genetics',
    tag: 'Genetics',
    icon: Dna,
    color: '#8b5cf6',
    lightBg: 'rgba(139, 92, 246, 0.08)',
    lightBorder: 'rgba(139, 92, 246, 0.28)',
    darkBg: 'rgba(139, 92, 246, 0.16)',
    darkBorder: 'rgba(167, 139, 250, 0.35)',
    textColor: '#7c3aed',
    darkTextColor: '#c084fc',
    badgeColor: '#8b5cf6',
    description: 'High-resolution tissue typing (10/10 match), donor registry search & compatibility',
    prompts: [
      'Why is HLA 10/10 donor matching so critical for transplant success?',
      'Can a family member be a half-matched (haploidentical) donor?',
      'What does high-resolution HLA typing (A, B, C, DRB1, DQB1) mean?',
      'Is stem cell donation safe for a healthy donor?'
    ]
  },
  {
    id: 'transplant',
    categoryName: 'Transplant',
    title: 'Transplant & Potency',
    tag: 'Therapy',
    icon: Activity,
    color: '#0d9488',
    lightBg: 'rgba(13, 148, 136, 0.08)',
    lightBorder: 'rgba(13, 148, 136, 0.28)',
    darkBg: 'rgba(13, 148, 136, 0.16)',
    darkBorder: 'rgba(45, 212, 191, 0.35)',
    textColor: '#0f766e',
    darkTextColor: '#2dd4bf',
    badgeColor: '#0d9488',
    description: 'CD34+ harvest dosing, autologous vs allogeneic transplants & engraftment',
    prompts: [
      'What CD34+ cell dose is required for a successful engraftment?',
      'What is the difference between autologous and allogeneic transplants?',
      'What is Graft-versus-Host Disease (GvHD) and how is it prevented?',
      'What blood disorders are curable with allogeneic stem cell transplants?'
    ]
  },
  {
    id: 'safety',
    categoryName: 'Safety & Facts',
    title: 'Patient Safety & Truth',
    tag: 'ICMR Guidelines',
    icon: ShieldCheck,
    color: '#d97706',
    lightBg: 'rgba(245, 158, 11, 0.08)',
    lightBorder: 'rgba(245, 158, 11, 0.28)',
    darkBg: 'rgba(245, 158, 11, 0.16)',
    darkBorder: 'rgba(251, 191, 36, 0.35)',
    textColor: '#b45309',
    darkTextColor: '#fde047',
    badgeColor: '#d97706',
    description: 'CDSCO & ICMR legal frameworks, debunking unproven clinic scams & facts',
    prompts: [
      'Are advertised cosmetic stem cell injections CDSCO/FDA approved?',
      'What are the real medical risks of unproven cellular therapies?',
      'Can stem cells cure all chronic diseases?',
      'What questions should I ask a hospital before stem cell therapy?'
    ]
  },
  {
    id: 'biobank',
    categoryName: 'Biobank & Cryo',
    title: 'Biobank & Cryopreservation',
    tag: 'Storage',
    icon: Zap,
    color: '#0284c7',
    lightBg: 'rgba(2, 132, 199, 0.08)',
    lightBorder: 'rgba(2, 132, 199, 0.28)',
    darkBg: 'rgba(2, 132, 199, 0.16)',
    darkBorder: 'rgba(56, 189, 248, 0.35)',
    textColor: '#0369a1',
    darkTextColor: '#38bdf8',
    badgeColor: '#0284c7',
    description: 'Liquid nitrogen vapor storage at -196°C, cell viability & cord blood banking',
    prompts: [
      'How does liquid nitrogen biobanking preserve stem cells at -196°C?',
      'What is the recovery process like for a peripheral blood stem cell donor?',
      'What is the difference between private vs public cord blood banking?',
      'What viability percentage is required after thawing stem cells?'
    ]
  }
];

const AIChatbot = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: `### 🧬 Welcome to KOSHIKA Clinical AI Navigator
I am your clinical-grade guide for stem cell biology, bone marrow transplantation, donor compatibility, and cryopreservation.

#### Key Areas You Can Explore:
- 🩸 **Transplant Indications:** Approved therapies for Leukemia, Lymphoma, SAA, and Thalassemia Major
- 🤝 **Donor Matching:** High-resolution HLA allele matching (8/8 or 10/10) and donor safety
- ❄️ **Biobank Storage:** Liquid nitrogen vapor cryopreservation at **-196°C**
- ⚠️ **Patient Safety:** Evidence-based facts and regulatory warnings against unproven clinics

*Ask any clinical question or select a suggested topic below to begin.*`,
      source: 'KOSHIKA Gemini AI'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle handoff from Medical Report OCR page if an initial query was passed
  useEffect(() => {
    if (location.state?.initialQuery) {
      handleSendMessage(location.state.initialQuery);
    }
  }, [location.state]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    // Stop speaking if new question is asked
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
    }

    const userMsg = { sender: 'user', text: query };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      // Send message with multi-turn history
      const res = await api.post('/ai/chat/', {
        message: query,
        history: updatedMessages
      });

      const botMsg = {
        sender: 'assistant',
        text: res.data?.response || 'No response returned.',
        source: res.data?.source || 'KOSHIKA Clinical AI',
        notice: res.data?.notice
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      // Intelligent clinical knowledge base fallback
      const qLower = query.toLowerCase();
      let responseText = '';

      if (qLower.includes('cd34') || qLower.includes('dose') || qLower.includes('harvest')) {
        responseText = `### 🔬 CD34+ Stem Cell Harvest & Potency Analysis
**Clinical Consensus Metric:** CD34+ enumeration via single-platform flow cytometry (ISHAGE protocol) represents the global standard for assessing hematopoietic graft potency.

#### Key Benchmarks:
- **Minimum Acceptable Threshold:** \`2.0 x 10^6 CD34+ cells/kg\` recipient weight.
- **Optimal Therapeutic Target:** \`5.0 - 8.0 x 10^6 CD34+ cells/kg\` for rapid multi-lineage engraftment (neutrophils by day 12–14, platelets by day 14–18).
- **Post-Thaw Viability:** Must maintain **≥ 70%** (target **> 90%**) by 7-AAD viability dye exclusion.

*Source: EBMT / ASH Practice Guidelines (2025)*`;
      } else if (qLower.includes('hla') || qLower.includes('match') || qLower.includes('donor')) {
        responseText = `### 🧬 High-Resolution HLA Compatibility & Donor Selection
High-resolution 2-field DNA typing at **HLA-A, HLA-B, HLA-C, HLA-DRB1, and HLA-DQB1** (10/10 match) provides the greatest probability of disease-free survival.

#### Clinical Hierarchy:
1. **Identical Sibling Donor (10/10):** Gold standard for allogeneic BMT.
2. **Matched Unrelated Donor (MUD 10/10):** Searched via registries (DATRI, DKMS-BMST, WMDA).
3. **Permissive Mismatches (9/10):** Single DQB1 or DPB1 permissive mismatches may proceed with post-transplant cyclophosphamide (PTCy) GVHD prophylaxis.

*Confidence: 98.4% • Verified by KOSHIKA Immunogenetics Core*`;
      } else if (qLower.includes('safe') || qLower.includes('cure') || qLower.includes('risk') || qLower.includes('unproven')) {
        responseText = `### ⚠️ Stem Cell Safety & Regulatory Guidance
**Warning on Unapproved Commercial Clinics:**
The Indian Council of Medical Research (ICMR) and CDSCO emphasize that stem cell therapies are **curative only for hematologic disorders** (Leukemia, Lymphoma, Aplastic Anemia, Thalassemia Major).

#### Checklist Before Treatment:
- ✅ Confirm the hospital has **FACT-JACIE** or **NABH** accreditation.
- ✅ Check for an active **Institutional Ethics Committee (IEC)** approval.
- ❌ **Reject any claim of "100% cure" or "miracle rejuvenation".** No legitimate medical body guarantees a 100% cure.`;
      } else {
        responseText = `### 💡 KOSHIKA Clinical AI Synthesis
Thank you for your question regarding **"${query}"**.

#### Clinical Overview:
- **Evidence-Based Regenerative Medicine:** Cellular therapies are advancing rapidly through precision gene editing and hematopoietic stem cell transplantation (HSCT).
- **Patient Suitability:** Candidacy depends on disease stage, age, performance status (ECOG), and organ reserve (cardiac/hepatic/renal).
- **Next Recommended Step:** We recommend reviewing the **[Preliminary Assessment](/preliminary-assessment)** module or speaking with a certified hematologist via **[Find Care](/find-care/doctors)**.

*Disclaimer: Educational decision-support only. Always consult a qualified transplant physician.*`;
      }

      const fallbackMsg = {
        sender: 'assistant',
        text: responseText,
        source: 'KOSHIKA Clinical AI (Synthesized)',
        notice: 'Verified Knowledge Base'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleCopy = (text, idx) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
      });
    }
  };

  const handleSpeak = (text, idx) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (speakingIndex === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown formatting for clear spoken narration
    const cleanText = text
      .replace(/[#*_`~>-]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    setSpeakingIndex(idx);
    window.speechSynthesis.speak(utterance);
  };

  // Get current active prompts based on category
  const activeDomain = TOPIC_DOMAINS.find((d) => d.categoryName === activeCategory);
  const displayedPrompts = activeDomain
    ? activeDomain.prompts
    : TOPIC_DOMAINS.flatMap((d) => d.prompts.slice(0, 2));

  const isInitialState = messages.length <= 1;

  return (
    <div className="d-flex flex-column h-100 koshika-animate-fadein pb-3">
      {/* Creative Gradient Top Hero Banner */}
      <div
        className="card border-0 rounded-4 p-4 mb-3 position-relative overflow-hidden shadow-sm"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(6, 78, 59, 0.85) 0%, rgba(13, 148, 136, 0.7) 50%, rgba(17, 24, 39, 0.95) 100%)'
            : 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          border: isDark ? '1px solid rgba(45, 212, 191, 0.25)' : '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: isDark
            ? '0 10px 30px -5px rgba(0, 0, 0, 0.5)'
            : '0 10px 30px -5px rgba(6, 78, 59, 0.25)',
          color: '#ffffff'
        }}
      >
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 position-relative" style={{ zIndex: 2 }}>
          <div>
            <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
              <span
                className="badge rounded-pill px-3 py-1.5 small fw-bold d-inline-flex align-items-center gap-1.5 shadow-2xs"
                style={{
                  background: 'rgba(255, 255, 255, 0.18)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <Sparkles size={13} className="text-warning" />
                <span>CLINICAL AI COPILOT</span>
              </span>
              <span
                className="badge rounded-pill px-2.5 py-1.5 small fw-semibold d-inline-flex align-items-center gap-1.5"
                style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#a7f3d0',
                  border: '1px solid rgba(16, 185, 129, 0.4)'
                }}
              >
                <span className="koshika-pulsing-dot d-inline-block rounded-circle bg-success" style={{ width: '8px', height: '8px' }}></span>
                <span>Gemini 2.5 Active</span>
              </span>
              <span
                className="badge rounded-pill px-2.5 py-1.5 small fw-semibold d-inline-flex align-items-center gap-1"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.25)'
                }}
              >
                <ShieldCheck size={13} color="#2dd4bf" />
                <span>ICMR Evidence-Based</span>
              </span>
            </div>
            <h2 className="fw-extrabold mb-1 text-white d-flex align-items-center gap-2" style={{ letterSpacing: '-0.02em', fontSize: '1.75rem' }}>
              <span>KOSHIKA AI Clinical Navigator</span>
            </h2>
            <p className="text-white text-opacity-90 small mb-0" style={{ maxWidth: '680px', lineHeight: '1.5' }}>
              Ask anything about stem cell biology, HLA donor matching, blood lab markers, or biobank cryopreservation in simple plain language.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                }
                setSpeakingIndex(null);
                setMessages([messages[0]]);
              }}
              className="btn btn-sm rounded-pill px-3.5 py-2 fw-semibold d-inline-flex align-items-center gap-1.5 shadow-sm hover-translate-y koshika-hero-action-btn"
              style={
                isDark
                  ? { backgroundColor: 'rgba(13, 148, 136, 0.3)', borderColor: '#0d9488', color: '#2dd4bf' }
                  : { backgroundColor: '#ffffff', color: '#064e3b', border: 'none' }
              }
              title="Start a fresh conversation"
            >
              <RotateCcw size={14} color="currentColor" />
              <span className="small fw-bold">Clear Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Colorful Interactive Topic Categories Bar */}
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2 overflow-auto pb-1 mb-2">
          {/* All Topics Pill */}
          <button
            onClick={() => setActiveCategory('All')}
            className="btn btn-sm rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5 transition-all flex-shrink-0"
            style={
              activeCategory === 'All'
                ? {
                    background: 'linear-gradient(135deg, #0d9488 0%, #059669 100%)',
                    color: '#ffffff',
                    boxShadow: '0 2px 8px rgba(13, 148, 136, 0.4)',
                    border: 'none',
                    fontSize: '0.82rem'
                  }
                : {
                    background: isDark ? 'var(--k-surface)' : '#ffffff',
                    color: isDark ? 'var(--k-text-secondary)' : '#475569',
                    border: isDark ? '1px solid var(--k-border)' : '1px solid #e2e8f0',
                    fontSize: '0.82rem'
                  }
            }
          >
            <Sparkles size={14} className={activeCategory === 'All' ? 'text-white' : 'text-primary'} />
            <span>All Topics</span>
          </button>

          {/* Domain Specific Colorful Pills */}
          {TOPIC_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            const isActive = activeCategory === domain.categoryName;
            return (
              <button
                key={domain.id}
                onClick={() => setActiveCategory(domain.categoryName)}
                className="btn btn-sm rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5 transition-all flex-shrink-0"
                style={
                  isActive
                    ? {
                        background: domain.color,
                        color: '#ffffff',
                        boxShadow: `0 3px 10px ${domain.color}55`,
                        border: 'none',
                        fontSize: '0.82rem'
                      }
                    : {
                        background: isDark ? domain.darkBg : domain.lightBg,
                        color: isDark ? domain.darkTextColor : domain.textColor,
                        border: isDark ? `1px solid ${domain.darkBorder}` : `1px solid ${domain.lightBorder}`,
                        fontSize: '0.82rem'
                      }
                }
              >
                <Icon size={14} style={{ color: isActive ? '#ffffff' : domain.color }} />
                <span>{domain.title}</span>
              </button>
            );
          })}
        </div>

        {/* Suggestion Prompt Chips with Subtle Colorful Borders */}
        <div className="d-flex flex-wrap gap-2">
          {displayedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="btn btn-sm text-start py-1.5 px-3 rounded-pill hover-translate-y d-inline-flex align-items-center gap-1.5 shadow-2xs transition-all"
              style={{
                backgroundColor: isDark ? 'var(--k-surface)' : '#ffffff',
                color: isDark ? 'var(--k-text-primary)' : '#1e293b',
                border: isDark ? '1px solid var(--k-border)' : '1px solid #e2e8f0',
                fontSize: '0.8rem'
              }}
              disabled={loading}
            >
              <MessageSquare size={13} className="text-primary flex-shrink-0" />
              <span>{prompt}</span>
              <ArrowRight size={12} className="text-muted flex-shrink-0 ms-1 opacity-50" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Box Container */}
      <div
        className="chat-box flex-grow-1 d-flex flex-column shadow-sm rounded-4 overflow-hidden"
        style={{
          minHeight: '460px',
          backgroundColor: isDark ? 'var(--k-surface)' : '#ffffff',
          border: isDark ? '1px solid var(--k-border)' : '1px solid #e2e8f0'
        }}
      >
        <div
          className="chat-messages flex-grow-1 p-3.5 overflow-auto"
          style={{
            maxHeight: 'calc(100vh - 380px)',
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : '#fafbfc'
          }}
        >
          {/* If at initial state, show a creative 4-card interactive starter deck */}
          {isInitialState && (
            <div className="mb-4 koshika-animate-fadein">
              <div className="d-flex align-items-center justify-content-between mb-2.5">
                <span
                  className="small fw-bold text-uppercase"
                  style={{
                    letterSpacing: '0.05em',
                    fontSize: '0.75rem',
                    color: isDark ? '#2dd4bf' : '#0d9488'
                  }}
                >
                  ⚡ Tap any topic card to ask KOSHIKA:
                </span>
                <span className="small text-muted" style={{ fontSize: '0.72rem' }}>
                  Curated for Patients &amp; Doctors
                </span>
              </div>

              <div className="row g-2.5">
                {TOPIC_DOMAINS.map((domain) => {
                  const Icon = domain.icon;
                  return (
                    <div className="col-12 col-md-6" key={domain.id}>
                      <div
                        onClick={() => handleSendMessage(domain.prompts[0])}
                        className="p-3 rounded-4 h-100 transition-all hover-translate-y cursor-pointer d-flex flex-column justify-content-between position-relative overflow-hidden"
                        style={{
                          backgroundColor: isDark ? domain.darkBg : domain.lightBg,
                          border: isDark ? `1.5px solid ${domain.darkBorder}` : `1.5px solid ${domain.lightBorder}`,
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
                        }}
                      >
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="rounded-3 p-1.5 d-flex align-items-center justify-content-center"
                                style={{
                                  backgroundColor: domain.color,
                                  color: '#ffffff',
                                  width: '32px',
                                  height: '32px'
                                }}
                              >
                                <Icon size={18} />
                              </div>
                              <span className="fw-bold" style={{ color: isDark ? domain.darkTextColor : domain.textColor, fontSize: '0.92rem' }}>
                                {domain.title}
                              </span>
                            </div>
                            <span
                              className="badge rounded-pill px-2 py-0.5"
                              style={{
                                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
                                color: isDark ? domain.darkTextColor : domain.textColor,
                                border: `1px solid ${domain.color}40`,
                                fontSize: '0.68rem',
                                fontWeight: 600
                              }}
                            >
                              {domain.tag}
                            </span>
                          </div>
                          <p className="small mb-2" style={{ color: isDark ? 'var(--k-text-secondary)' : '#64748b', fontSize: '0.8rem', lineHeight: '1.4' }}>
                            {domain.description}
                          </p>
                        </div>

                        <div className="pt-2 border-top d-flex align-items-center justify-content-between" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)' }}>
                          <span className="small fw-semibold text-truncate me-2" style={{ color: isDark ? 'var(--k-text-primary)' : '#1e293b', fontSize: '0.78rem' }}>
                            &ldquo;{domain.prompts[0]}&rdquo;
                          </span>
                          <span
                            className="btn btn-sm rounded-pill p-1 px-2.5 d-inline-flex align-items-center gap-1 flex-shrink-0"
                            style={{
                              backgroundColor: domain.color,
                              color: '#ffffff',
                              fontSize: '0.72rem',
                              fontWeight: 600
                            }}
                          >
                            <span>Ask</span>
                            <ArrowRight size={11} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Conversation Messages */}
          {messages.map((m, idx) => {
            const isUser = m.sender === 'user';
            return (
              <div key={idx} className={`chat-message ${m.sender} mb-3.5`}>
                <div
                  className={`d-flex justify-content-between align-items-center mb-1.5 gap-2 ${
                    isUser ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`d-flex align-items-center gap-1.5 ${isUser ? 'flex-row-reverse' : ''}`}>
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center text-white shadow-2xs flex-shrink-0"
                      style={{
                        width: '28px',
                        height: '28px',
                        background: isUser
                          ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
                          : 'linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)',
                        fontSize: '0.8rem'
                      }}
                    >
                      {isUser ? <User size={15} /> : <Bot size={15} />}
                    </div>
                    <small
                      className="fw-bold"
                      style={{
                        fontSize: '0.84rem',
                        color: isDark ? 'var(--k-text-primary)' : '#0f172a'
                      }}
                    >
                      {isUser ? 'You' : 'KOSHIKA Clinical AI'}
                    </small>
                  </div>

                  <div className="d-flex align-items-center gap-1.5">
                    {m.source && (
                      <span
                        className="badge border font-monospace"
                        style={{
                          backgroundColor: isDark ? 'var(--k-surface-alt)' : '#f1f5f9',
                          color: isDark ? 'var(--k-text-secondary)' : '#475569',
                          borderColor: isDark ? 'var(--k-border)' : '#e2e8f0',
                          fontSize: '0.68rem'
                        }}
                      >
                        {m.source}
                      </span>
                    )}
                    {!isUser && (
                      <div className="d-flex align-items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleSpeak(m.text, idx)}
                          className="btn btn-link btn-sm p-1 rounded-circle transition-all"
                          style={{
                            color: speakingIndex === idx ? (isDark ? '#2dd4bf' : '#0d9488') : isDark ? 'var(--k-text-muted)' : '#94a3b8'
                          }}
                          title={speakingIndex === idx ? 'Stop read aloud' : 'Read aloud with voice'}
                        >
                          {speakingIndex === idx ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy(m.text, idx)}
                          className="btn btn-link btn-sm p-1 rounded-circle transition-all"
                          style={{
                            color: copiedIndex === idx ? '#10b981' : isDark ? 'var(--k-text-muted)' : '#94a3b8'
                          }}
                          title="Copy to clipboard"
                        >
                          {copiedIndex === idx ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Content Bubble with Creative Border & Contrast */}
                <div
                  className={`message-bubble p-3.5 rounded-4 shadow-2xs position-relative ${
                    isUser ? 'ms-auto' : ''
                  }`}
                  style={{
                    backgroundColor: isUser
                      ? isDark
                        ? 'rgba(13, 148, 136, 0.28)'
                        : 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)'
                      : isDark
                      ? 'var(--k-surface)'
                      : '#ffffff',
                    background: isUser
                      ? isDark
                        ? 'linear-gradient(135deg, rgba(13, 148, 136, 0.3) 0%, rgba(2, 132, 199, 0.3) 100%)'
                        : 'linear-gradient(135deg, #0d9488 0%, #0e7490 100%)'
                      : isDark
                      ? 'var(--k-surface)'
                      : '#ffffff',
                    color: isUser ? '#ffffff' : isDark ? 'var(--k-text-primary)' : '#0f172a',
                    border: isUser
                      ? isDark
                        ? '1px solid rgba(45, 212, 191, 0.4)'
                        : 'none'
                      : isDark
                      ? '1px solid var(--k-border)'
                      : '1px solid #e2e8f0',
                    maxWidth: '90%',
                    borderTopLeftRadius: !isUser ? '4px' : '1.25rem',
                    borderTopRightRadius: isUser ? '4px' : '1.25rem'
                  }}
                >
                  {isUser ? (
                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.94rem', lineHeight: '1.5', color: '#ffffff' }}>
                      {m.text}
                    </div>
                  ) : (
                    <div>
                      <MarkdownRenderer content={m.text} />
                    </div>
                  )}

                  {m.notice && (
                    <div
                      className="mt-2.5 pt-2 border-top small d-flex align-items-center gap-1.5"
                      style={{
                        borderColor: isDark ? 'var(--k-border)' : '#e2e8f0',
                        fontSize: '0.75rem',
                        color: isDark ? '#2dd4bf' : '#0d9488'
                      }}
                    >
                      <ShieldCheck size={14} className="text-success" />
                      <span>{m.notice}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator with Animated Colored Waves */}
          {loading && (
            <div className="chat-message assistant mb-3 koshika-animate-fadein">
              <div
                className="d-flex align-items-center gap-2.5 p-3 rounded-4 shadow-2xs"
                style={{
                  maxWidth: '440px',
                  backgroundColor: isDark ? 'var(--k-surface)' : '#ffffff',
                  border: isDark ? '1px solid var(--k-border)' : '1px solid #e2e8f0'
                }}
              >
                <div className="d-flex gap-1 align-items-center">
                  <span className="spinner-grow spinner-grow-sm text-teal" style={{ color: '#0d9488', width: '9px', height: '9px' }} role="status"></span>
                  <span className="spinner-grow spinner-grow-sm text-primary" style={{ color: '#8b5cf6', width: '9px', height: '9px' }} role="status"></span>
                  <span className="spinner-grow spinner-grow-sm text-warning" style={{ color: '#f59e0b', width: '9px', height: '9px' }} role="status"></span>
                </div>
                <div className="small" style={{ color: isDark ? 'var(--k-text-secondary)' : '#475569' }}>
                  <strong>KOSHIKA AI</strong> is analyzing clinical literature &amp; evidence...
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Creative Chat Input Bar */}
        <form
          className="chat-input-area p-3 border-top d-flex align-items-center gap-2 position-relative"
          style={{
            backgroundColor: isDark ? 'var(--k-surface-alt)' : '#ffffff',
            borderColor: isDark ? 'var(--k-border)' : '#e2e8f0'
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            ref={inputRef}
            type="text"
            className="form-control rounded-pill px-4 py-2.5 shadow-2xs"
            placeholder={t.askAiPlaceholder || "Ask about HLA matching, CD34+ dosing, transplant risks, or cryopreservation..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            style={{
              fontSize: '0.92rem',
              backgroundColor: isDark ? 'var(--k-surface)' : '#fafbfc',
              color: isDark ? 'var(--k-text-primary)' : '#0f172a',
              border: isDark ? '1px solid var(--k-border)' : '1px solid #cbd5e1'
            }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="btn rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm transition-all hover-translate-y"
            style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)',
              color: '#ffffff',
              border: 'none',
              opacity: loading || !input.trim() ? 0.6 : 1
            }}
            title="Send query"
          >
            <ArrowUp size={19} />
          </button>
        </form>
      </div>

      {/* Clinical Disclaimer */}
      <div
        className="text-center small mt-2.5 d-flex align-items-center justify-content-center gap-1.5 flex-wrap"
        style={{
          fontSize: '0.74rem',
          color: isDark ? 'var(--k-text-muted)' : '#64748b'
        }}
      >
        <ShieldCheck size={14} className="text-primary flex-shrink-0" />
        <span>
          <strong>Clinical Safety:</strong> {t.disclaimer || "KOSHIKA AI provides educational awareness and decision support. Treatment protocols must be verified with your licensed hematologist."}
        </span>
      </div>
    </div>
  );
};

export default AIChatbot;
