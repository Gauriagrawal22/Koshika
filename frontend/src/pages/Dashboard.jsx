import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowRight,
  Play,
  Pause,
  X,
  ClipboardCheck,
  FileText,
  Calendar,
  Sparkles,
  ShieldCheck,
  Bot,
  BookOpen,
  Stethoscope,
  Building2,
  Check
} from 'lucide-react';

const Dashboard = () => {
  const { patientProfile } = useRole();
  const { user } = useAuth();
  const { t, langCode } = useLanguage();

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [modalPlaying, setModalPlaying] = useState(false);
  const [modalLang, setModalLang] = useState(langCode || 'en');

  // Dynamic user name greeting
  const displayName = patientProfile?.name?.split(' ')[0] || user?.name?.split(' ')[0] || 'Aarav';

  // Greeting by time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const toggleModalPlayback = (customLang) => {
    const nextState = !modalPlaying;
    setModalPlaying(nextState);

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      if (nextState) {
        const text =
          t.videoEp1Narration ||
          'Stem cells are special cells in the human body that can self-renew and develop into different types of specialized blood and tissue cells.';
        const utterance = new SpeechSynthesisUtterance(text);
        const l = customLang || modalLang;
        if (l === 'hi') utterance.lang = 'hi-IN';
        else if (l === 'mr') utterance.lang = 'mr-IN';
        else utterance.lang = 'en-US';
        utterance.rate = 0.95;
        utterance.onend = () => setModalPlaying(false);
        utterance.onerror = () => setModalPlaying(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
    setModalPlaying(false);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  // 3 Guided Care Journey Cards Matching Reference Image
  const careJourneyCards = [
    {
      step: '01',
      pillar: t.pillarUnderstand || 'UNDERSTAND',
      tag: `01 — ${t.pillarUnderstand || 'UNDERSTAND'}`,
      tagClass: 'k-badge-understand',
      buttonClass: 'k-btn-understand',
      topBgClass: 'k-card-top-understand',
      cardClass: 'k-card-understand',
      title: t.cardUnderstandTitle || 'Learn about stem cells in simple language.',
      bullet: t.cardUnderstandBullet || 'What are stem cells?',
      bulletColor: '#0d9488',
      image: '/images/home/card_understand_clean.jpg',
      primaryLink: '/learn',
      primaryLabel: t.cardExploreLearning || 'Explore Learning',
      secondaryLink: '/games',
      secondaryLabel: t.cardPlayGames || 'Play Games'
    },
    {
      step: '02',
      pillar: t.pillarPrepare || 'PREPARE',
      tag: `02 — ${t.pillarPrepare || 'PREPARE'}`,
      tagClass: 'k-badge-prepare',
      buttonClass: 'k-btn-prepare',
      topBgClass: 'k-card-top-prepare',
      cardClass: 'k-card-prepare',
      title: t.cardPrepareTitle || 'Make sense of your own information.',
      bullet: t.cardPrepareBullet || 'Upload medical report',
      bulletColor: '#2563eb',
      image: '/images/home/card_prepare_clean.jpg',
      primaryLink: '/ocr-reports',
      primaryLabel: t.cardUploadReport || 'Upload Report',
      secondaryLink: '/preliminary-assessment',
      secondaryLabel: t.cardCheckEligibility || 'Check Eligibility'
    },
    {
      step: '03',
      pillar: t.pillarConnect || 'CONNECT',
      tag: `03 — ${t.pillarConnect || 'CONNECT'}`,
      tagClass: 'k-badge-connect',
      buttonClass: 'k-btn-connect',
      topBgClass: 'k-card-top-connect',
      cardClass: 'k-card-connect',
      title: t.cardConnectTitle || 'Find the right kind of support.',
      bullet: t.cardConnectBullet || 'Find specialists',
      bulletColor: '#d97706',
      image: '/images/home/card_connect_clean.jpg',
      primaryLink: '/find-care/doctors',
      primaryLabel: t.cardFindSpecialists || 'Find Specialists',
      secondaryLink: '/find-care/centres',
      secondaryLabel: t.cardViewCentres || 'View Centres'
    }
  ];

  // Quick Action Items — Cohesive with Understand, Prepare, Connect semantic palette
  const quickActions = [
    {
      id: 'assessment',
      title: t.quickAssessmentTitle || 'Baseline Assessment',
      desc: t.quickAssessmentDesc || 'Check preliminary health eligibility & criteria',
      icon: ClipboardCheck,
      iconColor: '#2563eb',
      iconBg: 'rgba(37, 99, 235, 0.1)',
      link: '/preliminary-assessment',
      badge: t.quickAssessmentBadge || 'Health Check'
    },
    {
      id: 'reports',
      title: t.quickReportsTitle || 'Medical Reports & OCR',
      desc: t.quickReportsDesc || 'Upload lab tests, CBC & view HLA allele parameters',
      icon: FileText,
      iconColor: '#2563eb',
      iconBg: 'rgba(37, 99, 235, 0.1)',
      link: '/ocr-reports',
      badge: t.quickReportsBadge || 'Smart OCR'
    },
    {
      id: 'consultations',
      title: t.quickConsultTitle || 'Doctor Consultations',
      desc: t.quickConsultDesc || 'Join video telehealth calls & hospital OPD visits',
      icon: Calendar,
      iconColor: '#d97706',
      iconBg: 'rgba(217, 119, 6, 0.1)',
      link: '/appointments',
      badge: t.quickConsultBadge || 'Telehealth'
    }
  ];

  return (
    <div className="koshika-animate-fadein pb-5">
      {/* ---------------------------------------------------------------------
          1. HERO: SHORT WELCOME + CTA + PROPERLY FITTED EDUCATIONAL VIDEO
      ---------------------------------------------------------------------- */}
      {/* ---------------------------------------------------------------------
          1. HERO: MATCHING USER REFERENCE PALETTE & BG
      ---------------------------------------------------------------------- */}
      {/* ---------------------------------------------------------------------
          1. HERO: COMPACT MEDIUM-SIZE WELCOME + FITTED EDUCATIONAL VIDEO
      ---------------------------------------------------------------------- */}
      <div
        className="card border-0 mb-3.5 p-3.5 p-md-4 koshika-hero-banner overflow-hidden position-relative"
        style={{ 
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          boxShadow: '0 8px 24px -4px rgba(6, 78, 59, 0.22)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#ffffff'
        }}
      >
        <div className="row g-3.5 align-items-center">
          {/* Left: Headline & CTAs */}
          <div className="col-12 col-md-7 col-lg-7">
            <h1
              className="fw-bold mb-1.5 text-white"
              style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.7rem)', letterSpacing: '-0.02em', lineHeight: 1.25 }}
            >
              {t.greetingHello || 'Hello'} 👋<br />
              {t.heroTakeOneStep || "Let's take this one step at a time."}
            </h1>

            <p
              className="mb-3 text-white"
              style={{ fontSize: '0.88rem', lineHeight: 1.45, maxWidth: '460px', color: 'rgba(255, 255, 255, 0.9)' }}
            >
              {t.heroUnderstandSupport || "Understand stem cells, make sense of your information, and find the right support."}
            </p>

            <div className="d-flex align-items-center gap-2 flex-wrap">
              <Link
                to="/preliminary-assessment"
                className="btn rounded-pill px-3.5 py-1.5 fw-bold d-inline-flex align-items-center gap-1.5 shadow-sm transition-all hover-translate-y koshika-hero-action-btn"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#064e3b',
                  border: 'none',
                  fontSize: '0.82rem'
                }}
              >
                <span>{t.startYourJourney || "Start your journey"}</span>
                <ArrowRight size={14} color="currentColor" />
              </Link>

              <Link
                to="/learn"
                className="btn rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-1 shadow-xs transition-all hover-translate-y"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  fontSize: '0.82rem'
                }}
              >
                <span>{t.justBrowsing || "Just browsing"}</span>
              </Link>
            </div>
          </div>

          {/* Right: Clean, Properly Proportioned Video Preview Card */}
          <div className="col-12 col-md-5 col-lg-5">
            <div
              className="card border-0 overflow-hidden shadow-sm top-head-subcard ms-md-auto"
              style={{
                borderRadius: '16px',
                backgroundColor: 'var(--k-surface)',
                border: '1px solid var(--k-border)',
                maxWidth: '350px'
              }}
            >
              {/* Video Thumbnail with Hover Overlay & Play Badge */}
              <div
                className="position-relative cursor-pointer overflow-hidden"
                style={{ height: '110px' }}
                onClick={() => setShowVideoModal(true)}
                role="button"
                tabIndex={0}
                aria-label={t.watchVideo || "Watch video: What Are Stem Cells?"}
                onKeyDown={(e) => { if (e.key === 'Enter') setShowVideoModal(true); }}
              >
                <img
                  src="/images/home/stem_cell_video_thumb.jpg"
                  alt={t.whatAreStemCellsTitle || "What are stem cells?"}
                  className="w-100 h-100 object-fit-cover transition-all"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                {/* Center Play Overlay Icon */}
                <div
                  className="position-absolute top-50 start-50 translate-middle rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'rgba(6, 78, 59, 0.88)',
                    color: '#ffffff',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  <Play size={13} fill="#ffffff" style={{ marginLeft: '2px' }} />
                </div>
              </div>

              {/* Video Info Strip */}
              <div
                className="d-flex align-items-center justify-content-between p-2 px-3"
                style={{ backgroundColor: 'var(--k-surface)' }}
              >
                <div style={{ paddingRight: '8px' }}>
                  <h3
                    className="fw-bold mb-0 text-truncate"
                    style={{ fontSize: '0.84rem', color: 'var(--k-text-primary)', letterSpacing: '-0.01em', maxWidth: '210px' }}
                  >
                    {t.whatAreStemCellsTitle || "What are stem cells?"}
                  </h3>
                  <p className="mb-0 text-truncate" style={{ fontSize: '0.72rem', color: 'var(--k-text-secondary)', maxWidth: '210px' }}>
                    {t.video3MinIntro || "A 3 minute intro, in plain language"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowVideoModal(true)}
                  className="btn btn-sm rounded-pill px-2.5 py-1 fw-bold d-inline-flex align-items-center gap-1 shadow-xs flex-shrink-0"
                  style={{
                    backgroundColor: 'var(--k-surface-tint)',
                    border: '1px solid var(--k-border)',
                    color: 'var(--k-primary)',
                    fontSize: '0.74rem'
                  }}
                >
                  <Play size={11} fill="currentColor" />
                  <span>{t.watch || "Watch"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          2. YOUR CARE JOURNEY: 3 CLEAR CARDS MATCHING REFERENCE
             01 UNDERSTAND -> 02 PREPARE -> 03 CONNECT
      ---------------------------------------------------------------------- */}
      <div className="mb-4.5">
        <div className="row g-3.5">
          {careJourneyCards.map((card) => (
            <div key={card.step} className="col-12 col-md-4">
              <div
                className={`card h-100 koshika-journey-card ${card.cardClass}`}
                style={{
                  borderRadius: '26px',
                  border: '1px solid var(--k-border)',
                  backgroundColor: 'var(--k-surface)',
                  boxShadow: '0 4px 20px -2px rgba(13, 118, 110, 0.04)'
                }}
              >
                {/* Fitted 16:9 Medical Artwork Header */}
                <div
                  className={`k-card-img-wrapper position-relative ${card.topBgClass}`}
                  style={{ height: '215px', overflow: 'hidden', borderTopLeftRadius: '25px', borderTopRightRadius: '25px' }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-100 h-100 object-fit-cover"
                    style={{ objectPosition: 'center center' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>

                {/* Card Body: Clean, Not Congested */}
                <div className="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                  <div>
                    <span className={`${card.tagClass} mb-2.5 d-inline-flex`}>
                      {card.tag}
                    </span>
                    <h3 className="h6 fw-bold mb-2" style={{ fontSize: '1.02rem', lineHeight: 1.4, color: 'var(--k-text-primary)' }}>
                      {card.title}
                    </h3>
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="rounded-circle flex-shrink-0" style={{ width: '7px', height: '7px', backgroundColor: card.bulletColor }} />
                      <Link
                        to={card.primaryLink}
                        className="fw-semibold small text-decoration-none"
                        style={{ color: 'var(--k-text-primary)', fontSize: '0.86rem' }}
                      >
                        {card.bullet}
                      </Link>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-3 border-top" style={{ borderColor: 'var(--k-border-subtle)' }}>
                    <Link
                      to={card.primaryLink}
                      className={`btn btn-sm rounded-pill px-3.5 py-1.5 fw-semibold text-white d-inline-flex align-items-center gap-1.5 text-decoration-none shadow-xs ${card.buttonClass}`}
                      style={{ fontSize: '0.82rem' }}
                    >
                      <span>{card.primaryLabel}</span>
                      <ArrowRight size={13} />
                    </Link>

                    {card.secondaryLink && (
                      <Link
                        to={card.secondaryLink}
                        className="small text-secondary text-decoration-none fw-medium hover-text-dark"
                        style={{ fontSize: '0.78rem' }}
                      >
                        {card.secondaryLabel}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          3. QUICK ACTIONS: SMALL, CLEAN CARDS (ASSESSMENT, REPORTS, VISITS)
      ---------------------------------------------------------------------- */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-2.5 px-1">
          <div>
            <h2 className="h6 fw-bold text-dark mb-0.5" style={{ fontSize: '0.98rem' }}>
              {t.quickActionsTitle || 'Quick Actions'}
            </h2>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.78rem' }}>
              {t.quickActionsDesc || 'Direct shortcuts for essential patient tools and records'}
            </p>
          </div>
        </div>

        <div className="row g-3">
          {quickActions.map((action) => {
            const ActionIcon = action.icon;
            return (
              <div key={action.id} className="col-12 col-md-4">
                <Link
                  to={action.link}
                  className="card border-0 rounded-4 p-3 text-decoration-none hover-translate-y transition-all shadow-xs h-100 koshika-card"
                  style={{
                    border: '1px solid var(--k-border)',
                    backgroundColor: 'var(--k-surface)',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: '42px',
                      height: '42px',
                      backgroundColor: action.iconBg,
                      color: action.iconColor
                    }}
                  >
                    <ActionIcon size={20} />
                  </div>

                  <div className="flex-grow-1 overflow-hidden">
                    <div className="d-flex align-items-center justify-content-between mb-0.5">
                      <span className="fw-bold text-dark small" style={{ fontSize: '0.86rem' }}>
                        {action.title}
                      </span>
                      <ArrowRight size={13} className="text-muted flex-shrink-0" />
                    </div>
                    <p className="text-secondary small mb-0 text-truncate" style={{ fontSize: '0.75rem' }}>
                      {action.desc}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          4. KOSHIKA AI: SUBTLE SUPPORT ACTION (SLIM & NON-INTRUSIVE)
      ---------------------------------------------------------------------- */}
      <div
        className="p-3 rounded-4 d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2.5"
        style={{
          backgroundColor: 'var(--k-surface-tint)',
          border: '1px solid var(--k-border)'
        }}
      >
        <div className="d-flex align-items-center gap-2.5">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
            style={{ width: '32px', height: '32px', backgroundColor: '#7c3aed' }}
          >
            <Bot size={17} />
          </div>
          <div>
            <span className="fw-bold text-dark small d-block" style={{ fontSize: '0.82rem', lineHeight: 1.25 }}>
              {t.aiBannerQuestion || 'Need fast answers on stem cell therapies or reports?'}
            </span>
            <span className="text-secondary small" style={{ fontSize: '0.74rem' }}>
              {t.aiBannerDesc || 'KOSHIKA AI companion is available 24/7 in plain language.'}
            </span>
          </div>
        </div>

        <Link
          to="/ai-assistant"
          className="btn btn-sm rounded-pill px-3 py-1.5 fw-semibold text-white d-inline-flex align-items-center gap-1.5 text-nowrap align-self-end align-self-sm-center"
          style={{ backgroundColor: '#7c3aed', fontSize: '0.78rem' }}
        >
          <Sparkles size={13} />
          <span>{t.askAiAssistantBtn || 'Ask AI Assistant'}</span>
        </Link>
      </div>

      {/* ---------------------------------------------------------------------
          EDUCATIONAL VIDEO MODAL (Interactive with audio voiceover)
      ---------------------------------------------------------------------- */}
      {showVideoModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4 shadow-2xl bg-white overflow-hidden">
              <div className="modal-header border-0 pb-0 pt-3 px-4 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{ width: '30px', height: '30px', backgroundColor: '#0d9488' }}
                  >
                    <Play size={14} className="ms-0.5" fill="#ffffff" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">{t.videoModalTitle || 'What Are Stem Cells?'}</h6>
                    <span className="text-muted small" style={{ fontSize: '0.72rem' }}>
                      {t.videoModalSub || '3 min • Educational Video Guide'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-light rounded-circle p-1.5"
                  onClick={handleCloseVideoModal}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="modal-body p-4">
                <div
                  className="rounded-4 position-relative overflow-hidden mb-3 d-flex align-items-center justify-content-center text-white"
                  style={{
                    height: '320px',
                    background: 'radial-gradient(circle at center, #0f766e 0%, #0f172a 100%)'
                  }}
                >
                  <img
                    src="/images/home/stem_cell_video_thumb.jpg"
                    alt={t.videoModalTitle || "Stem Cell Animation"}
                    className="w-100 h-100 object-fit-cover opacity-50"
                  />

                  <button
                    type="button"
                    onClick={() => toggleModalPlayback()}
                    className="btn rounded-circle d-flex align-items-center justify-content-center shadow-lg position-absolute border-0"
                    style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: '#0d9488',
                      color: '#ffffff'
                    }}
                    aria-label={modalPlaying ? 'Pause narration' : 'Play narration'}
                  >
                    {modalPlaying ? <Pause size={28} /> : <Play size={28} className="ms-1" fill="#ffffff" />}
                  </button>

                  <div
                    className="position-absolute bottom-0 start-0 w-100 p-3 text-center small text-light"
                    style={{ background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)', fontSize: '0.82rem' }}
                  >
                    {modalPlaying
                      ? (t.audioPlayingIn || '🔊 Audio narration playing in ') + (modalLang === 'hi' ? 'हिन्दी' : modalLang === 'mr' ? 'मराठी' : 'English')
                      : (t.clickPlayAudio || 'Click play to listen to beginner stem cell explanation in your language')}
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pt-2 border-top">
                  <div className="d-flex align-items-center gap-1.5">
                    <span className="small text-muted me-1" style={{ fontSize: '0.78rem' }}>{t.voiceLanguage || 'Voice Language'}:</span>
                    {['en', 'hi', 'mr'].map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          setModalLang(lang);
                          if (modalPlaying) toggleModalPlayback(lang);
                        }}
                        className="btn btn-sm rounded-pill px-2.5 py-0.5"
                        style={{
                          backgroundColor: modalLang === lang ? '#0d9488' : '#f1f5f9',
                          color: modalLang === lang ? '#ffffff' : '#64748b',
                          fontSize: '0.74rem'
                        }}
                      >
                        {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : 'मराठी'}
                      </button>
                    ))}
                  </div>

                  <Link
                    to="/learn"
                    className="btn btn-sm rounded-pill px-3 py-1 text-white"
                    style={{ backgroundColor: '#0d9488', fontSize: '0.78rem' }}
                    onClick={handleCloseVideoModal}
                  >
                    {t.exploreFullCourse || 'Explore Full Course →'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;