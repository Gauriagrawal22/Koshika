import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Info,
  Check,
  XCircle,
  RefreshCw,
  Sparkles,
  BookOpen,
  Compass,
  Volume2,
  VolumeX,
  Stethoscope,
  Heart,
  HelpCircle,
  Award,
  Layers,
  Lightbulb,
  Zap,
  Activity
} from 'lucide-react';
import {
  getLocalizedText,
  getRandomFlashcards,
  getRandomCareQuestScenario,
  getRandomSafeOrUnsafe
} from '../data/learnAndPlayData';

// ---------------------------------------------------------------------------
// CREATIVE & MODERN GAME ILLUSTRATIONS (Section 12)
// Rich layered SVGs with vibrant palettes, biological motifs & modern gradients
// ---------------------------------------------------------------------------

// 1. Discovery Flashcards Illustration (mint / teal / soft pink)
const FlashcardsIllustration = ({ size = 130 }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
    <defs>
      <linearGradient id="fcBgGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fdf2f8" />
        <stop offset="50%" stopColor="#f0fdfa" />
        <stop offset="100%" stopColor="#ccfbf1" />
      </linearGradient>
      <linearGradient id="fcCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f0fdfa" />
      </linearGradient>
      <linearGradient id="stemGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
      <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0d9488" floodOpacity="0.15" />
      </filter>
    </defs>

    {/* Ambient Glow Backdrop Disc */}
    <circle cx="70" cy="70" r="58" fill="url(#fcBgGlow)" />
    <circle cx="70" cy="70" r="50" stroke="#99f6e4" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />

    {/* Background Angled Card */}
    <g transform="rotate(-12 70 70)">
      <rect x="34" y="38" width="68" height="52" rx="12" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="2" filter="url(#softShadow)" />
      <circle cx="50" cy="54" r="6" fill="#f472b6" opacity="0.6" />
      <path d="M62 52 H88 M62 60 H82 M62 68 H74" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </g>

    {/* Foreground Floating Hero Card */}
    <g transform="rotate(4 70 70)">
      <rect x="36" y="44" width="70" height="54" rx="14" fill="url(#fcCardGrad)" stroke="#2dd4bf" strokeWidth="2.5" filter="url(#softShadow)" />
      {/* Cellular Nucleus Motif */}
      <circle cx="56" cy="71" r="14" fill="#fce7f3" />
      <circle cx="56" cy="71" r="9" fill="url(#stemGlow)" />
      <circle cx="53" cy="68" r="2.5" fill="#ffffff" />
      {/* Connecting Cytoplasm Ribbons */}
      <path d="M68 64 C76 60, 84 66, 92 62" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M68 76 C78 72, 82 80, 94 76" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="94" cy="62" r="3.5" fill="#14b8a6" />
      <circle cx="94" cy="76" r="3" fill="#2dd4bf" />
    </g>

    {/* Bio Leaf Sprout */}
    <path d="M88 32 C98 34 102 44 96 50 C90 56 84 50 88 32 Z" fill="#14b8a6" />
    <path d="M82 42 C76 38 80 30 88 32" stroke="#0f766e" strokeWidth="1.8" strokeLinecap="round" />

    {/* Energy Sparkle */}
    <path d="M30 46 L32 40 L38 38 L32 36 L30 30 L28 36 L22 38 L28 40 Z" fill="#f59e0b" opacity="0.9" />
  </svg>
);

// 2. Koshika Care Quest Illustration (soft purple / lavender)
const CareQuestIllustration = ({ size = 130 }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
    <defs>
      <linearGradient id="cqBgGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#faf5ff" />
        <stop offset="60%" stopColor="#f3e8ff" />
        <stop offset="100%" stopColor="#e9d5ff" />
      </linearGradient>
      <linearGradient id="cqPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="50%" stopColor="#7e22ce" />
        <stop offset="100%" stopColor="#0d9488" />
      </linearGradient>
      <filter id="cqShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#7e22ce" floodOpacity="0.18" />
      </filter>
    </defs>

    {/* Background Soft Glow Disc */}
    <circle cx="70" cy="70" r="58" fill="url(#cqBgGlow)" />
    <circle cx="70" cy="70" r="50" stroke="#d8b4fe" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

    {/* S-curve Patient Healthcare Pathway */}
    <path 
      d="M30 110 C52 110 46 80 72 76 C94 72 90 48 106 44" 
      stroke="#e9d5ff" 
      strokeWidth="14" 
      strokeLinecap="round" 
    />
    <path 
      d="M30 110 C52 110 46 80 72 76 C94 72 90 48 106 44" 
      stroke="url(#cqPathGrad)" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
      strokeDasharray="6 6"
    />

    {/* Modern Clinic / Hospital Center */}
    <g filter="url(#cqShadow)">
      <rect x="76" y="22" width="40" height="34" rx="10" fill="#ffffff" stroke="#7e22ce" strokeWidth="2.5" />
      <rect x="91" y="38" width="10" height="18" rx="3" fill="#faf5ff" stroke="#c084fc" strokeWidth="1.5" />
      {/* Healing Red/Purple Cross */}
      <path d="M96 28 V34 M93 31 H99" stroke="#7e22ce" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Waypoint Decision Discs (Step 1, Step 2, Goal) */}
    {/* Step 1 Node */}
    <circle cx="44" cy="98" r="9" fill="#7e22ce" stroke="#ffffff" strokeWidth="2.5" filter="url(#cqShadow)" />
    <circle cx="44" cy="98" r="3.5" fill="#ffffff" />
    {/* Step 2 Node */}
    <circle cx="72" cy="74" r="10" fill="#a855f7" stroke="#ffffff" strokeWidth="2.5" filter="url(#cqShadow)" />
    <circle cx="72" cy="74" r="4" fill="#ffffff" />
    {/* Goal Reached Node (Green Checkmark) */}
    <circle cx="106" cy="44" r="11" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" filter="url(#cqShadow)" />
    <path d="M102 44 L105 47 L111 41" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    {/* Compass / Direction Star */}
    <path d="M26 42 L29 34 L37 31 L29 28 L26 20 L23 28 L15 31 L23 34 Z" fill="#c084fc" opacity="0.8" />
  </svg>
);

// 3. Safe or Unsafe Illustration (warm amber / orange / emerald)
const SafeUnsafeIllustration = ({ size = 130 }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
    <defs>
      <linearGradient id="suBgGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fffbeb" />
        <stop offset="60%" stopColor="#fef3c7" />
        <stop offset="100%" stopColor="#fed7aa" />
      </linearGradient>
      <linearGradient id="suShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#fffdf5" />
      </linearGradient>
      <filter id="suShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#d97706" floodOpacity="0.18" />
      </filter>
    </defs>

    {/* Ambient Glow Backdrop Disc */}
    <circle cx="70" cy="70" r="58" fill="url(#suBgGlow)" />
    <circle cx="70" cy="70" r="50" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />

    {/* Protective Medical Verification Shield */}
    <g filter="url(#suShadow)">
      <path 
        d="M70 24 C88 24 108 30 108 50 C108 80 86 102 70 112 C54 102 32 80 32 50 C32 30 52 24 70 24 Z" 
        fill="url(#suShieldGrad)" 
        stroke="#d97706" 
        strokeWidth="3" 
      />
      {/* Warm Golden Half-Split Shade */}
      <path 
        d="M70 27 C86 27 105 32 105 50 C105 77 85 98 70 108 V27 Z" 
        fill="#fef3c7" 
        opacity="0.7"
      />
    </g>

    {/* Dynamic Verification Split: Left Check (Safe), Right Cross (Unsafe) */}
    {/* Safe Verification Disc */}
    <g filter="url(#suShadow)">
      <circle cx="54" cy="65" r="16" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
      <path d="M47 65 L52 70 L61 60" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Unsafe Alert Disc */}
    <g filter="url(#suShadow)">
      <circle cx="86" cy="65" r="16" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" />
      <path d="M80 59 L92 71 M92 59 L80 71" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Verification Sparkle Crown */}
    <circle cx="70" cy="38" r="4.5" fill="#f59e0b" />
    <path d="M66 38 H74 M70 34 V42" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LearnAndPlay = () => {
  const { t, langCode } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active game: null (landing) | 'discovery-flashcards' | 'care-quest' | 'safe-or-unsafe'
  const rawGameParam = searchParams.get('game');
  let activeGame = null;
  if (['discovery-flashcards', 'grow-and-discover', 'flashcards'].includes(rawGameParam)) {
    activeGame = 'discovery-flashcards';
  } else if (['care-quest', 'care-journey'].includes(rawGameParam)) {
    activeGame = 'care-quest';
  } else if (['safe-or-unsafe', 'daily-challenge', 'safe-or-scam'].includes(rawGameParam)) {
    activeGame = 'safe-or-unsafe';
  }

  const handleSelectGame = (gameId) => {
    setSearchParams({ game: gameId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // GAME 1: DISCOVERY FLASHCARDS — BEGINNER BASICS
  // =========================================================================
  const [flashcards, setFlashcards] = useState(() => getRandomFlashcards(6));
  const [fcIndex, setFcIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [fcCompleted, setFcCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentCard = flashcards[fcIndex] || flashcards[0];

  const handleToggleFlip = () => setIsFlipped((prev) => !prev);

  const handleNextCard = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    if (fcIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setFcIndex((prev) => prev + 1);
    } else {
      setFcCompleted(true);
    }
  };

  const handlePrevCard = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    if (fcIndex > 0) {
      setIsFlipped(false);
      setFcIndex((prev) => prev - 1);
    }
  };

  const handleResetFlashcards = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setFlashcards(getRandomFlashcards(6));
    setFcIndex(0);
    setIsFlipped(false);
    setFcCompleted(false);
  };

  const handleSpeakText = (text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (langCode === 'hi') utterance.lang = 'hi-IN';
    else if (langCode === 'mr') utterance.lang = 'mr-IN';
    else utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // =========================================================================
  // GAME 2: KOSHIKA CARE QUEST — STORY DECISIONS
  // =========================================================================
  const [currentScenario, setCurrentScenario] = useState(() => getRandomCareQuestScenario());
  const [cqStepIdx, setCqStepIdx] = useState(0);
  const [cqSelectedChoice, setCqSelectedChoice] = useState(null);
  const [cqEvaluated, setCqEvaluated] = useState(false);
  const [cqCompleted, setCqCompleted] = useState(false);

  const currentScenarioStep = currentScenario.steps[cqStepIdx] || currentScenario.steps[0];

  const handleCqSelectChoice = (choiceIdx) => {
    if (cqEvaluated) return;
    setCqSelectedChoice(choiceIdx);
    setCqEvaluated(true);
  };

  const handleCqNextStep = () => {
    if (cqStepIdx < currentScenario.steps.length - 1) {
      setCqStepIdx((prev) => prev + 1);
      setCqSelectedChoice(null);
      setCqEvaluated(false);
    } else {
      setCqCompleted(true);
    }
  };

  const handleResetCareQuest = () => {
    setCurrentScenario(getRandomCareQuestScenario());
    setCqStepIdx(0);
    setCqSelectedChoice(null);
    setCqEvaluated(false);
    setCqCompleted(false);
  };

  // =========================================================================
  // GAME 3: SAFE OR UNSAFE — MEDICAL CLAIM VERIFICATION
  // =========================================================================
  const [safetySession, setSafetySession] = useState(() => getRandomSafeOrUnsafe(8));
  const [souIdx, setSouIdx] = useState(0);
  const [souUserAnswer, setSouUserAnswer] = useState(null);
  const [souEvaluated, setSouEvaluated] = useState(false);
  const [souScore, setSouScore] = useState(0);
  const [souCompleted, setSouCompleted] = useState(false);

  const currentClaimItem = safetySession[souIdx] || safetySession[0];

  const handleSouChoice = (isSafeChosen) => {
    if (souEvaluated) return;
    setSouUserAnswer(isSafeChosen);
    setSouEvaluated(true);
    if (isSafeChosen === currentClaimItem.isSafe) {
      setSouScore((prev) => prev + 1);
    }
  };

  const handleSouNext = () => {
    if (souIdx < safetySession.length - 1) {
      setSouIdx((prev) => prev + 1);
      setSouUserAnswer(null);
      setSouEvaluated(false);
    } else {
      setSouCompleted(true);
    }
  };

  const handleResetSafety = () => {
    setSafetySession(getRandomSafeOrUnsafe(8));
    setSouIdx(0);
    setSouUserAnswer(null);
    setSouEvaluated(false);
    setSouScore(0);
    setSouCompleted(false);
  };

  // =========================================================================
  // FOCUSED GAME EXPERIENCE 1: DISCOVERY FLASHCARDS
  // =========================================================================
  if (activeGame === 'discovery-flashcards') {
    const cardQuestion = getLocalizedText(currentCard.question || currentCard.front, langCode);
    const cardAnswer = getLocalizedText(currentCard.answer || currentCard.back, langCode);

    return (
      <div className="koshika-animate-fadein pb-5" style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Navigation & Header */}
        <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
          <button
            type="button"
            className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5 text-secondary hover-translate-y shadow-xs"
            onClick={handleBackToLanding}
          >
            <ArrowLeft size={16} />
            <span>← Back to Learn &amp; Play</span>
          </button>
          
          <div className="d-flex align-items-center gap-2">
            <span 
              className="badge rounded-pill px-3 py-1.5 fw-bold"
              style={{ backgroundColor: '#ccfbf1', color: '#0f766e', fontSize: '0.8rem', border: '1px solid #99f6e4' }}
            >
              Card {fcIndex + 1} of {flashcards.length}
            </span>
          </div>
        </div>

        {/* Stepper Dots & Progress Track */}
        <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
          {flashcards.map((c, i) => (
            <div
              key={c.id || i}
              style={{
                width: i === fcIndex ? '28px' : '10px',
                height: '8px',
                borderRadius: '5px',
                backgroundColor: i === fcIndex ? '#0d9488' : i < fcIndex ? '#14b8a6' : 'var(--k-border)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        <div className="text-center mb-4">
          <span className="badge rounded-pill px-3 py-1 text-uppercase fw-bold small mb-1" style={{ backgroundColor: '#f0fdfa', color: '#0d9488', border: '1px solid #99f6e4' }}>
            🌿 Beginner Basics &amp; Bio-Foundations
          </span>
          <h2 className="fw-bold text-dark mb-1" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)' }}>
            Discovery Flashcards
          </h2>
          <p className="text-secondary small mb-0">
            Interactive visual flip-cards. Tap the card or flip button to reveal the scientific insight.
          </p>
        </div>

        {!fcCompleted ? (
          <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white position-relative text-center" style={{ border: '1px solid var(--k-border)' }}>
            {/* 3D Flip Card Interaction Container */}
            <div 
              className="rounded-4 p-3.5 p-md-4 cursor-pointer mb-3.5 d-flex flex-column align-items-center justify-content-center transition-all position-relative k-flashcard-active"
              style={{
                minHeight: '380px',
                backgroundColor: isFlipped ? 'var(--k-surface-alt, #f0fdfa)' : 'var(--k-surface)',
                border: isFlipped ? '2.5px solid #0d9488' : '2px dashed #99f6e4',
                boxShadow: isFlipped ? '0 16px 36px rgba(13, 148, 136, 0.16)' : '0 4px 16px rgba(0, 0, 0, 0.04)',
                transform: isFlipped ? 'scale(1.005)' : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onClick={handleToggleFlip}
            >
              {/* Question / Explanation Header Bar */}
              <div className="d-flex align-items-center justify-content-between w-100 mb-3 px-1">
                <div className="d-flex align-items-center gap-2">
                  <span 
                    className="badge rounded-pill px-3 py-1.5 small fw-bold"
                    style={{
                      backgroundColor: isFlipped ? '#ccfbf1' : '#f1f5f9',
                      color: isFlipped ? '#0f766e' : '#334155',
                      fontSize: '0.76rem',
                      letterSpacing: '0.03em',
                      border: isFlipped ? '1px solid #99f6e4' : '1px solid #cbd5e1'
                    }}
                  >
                    {isFlipped ? '✨ SCIENTIFIC DISCOVERY' : '💡 CLINICAL QUESTION'}
                  </span>
                  
                  <span 
                    className="badge rounded-pill px-2.5 py-1 small fw-semibold"
                    style={{ backgroundColor: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0', fontSize: '0.72rem' }}
                  >
                    {currentCard.icon} {getLocalizedText(currentCard.category, langCode)}
                  </span>
                </div>

                {/* Audio Narration Button */}
                <button
                  type="button"
                  className="btn btn-sm btn-light border rounded-pill px-2.5 py-1 d-inline-flex align-items-center gap-1.5 hover-translate-y shadow-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeakText(isFlipped ? cardAnswer : cardQuestion);
                  }}
                  title={isSpeaking ? 'Stop narration' : 'Listen with audio'}
                >
                  {isSpeaking ? <VolumeX size={15} className="text-danger" /> : <Volume2 size={15} className="text-teal" style={{ color: '#0d9488' }} />}
                  <span className="small fw-semibold" style={{ fontSize: '0.75rem', color: isSpeaking ? '#dc2626' : '#0d9488' }}>
                    {isSpeaking ? 'Pause' : 'Listen'}
                  </span>
                </button>
              </div>

              {/* Dedicated Medical Illustration Matching Every Question */}
              <div 
                className="w-100 rounded-3 overflow-hidden mb-3.5 position-relative shadow-xs"
                style={{ 
                  height: '215px', 
                  backgroundColor: '#f8fafc', 
                  border: '1.5px solid var(--k-border)' 
                }}
              >
                <img
                  src={currentCard.image || '/images/learn/topic1_branches.jpg'}
                  alt={cardQuestion}
                  className="w-100 h-100 object-fit-cover"
                  style={{ objectPosition: 'center 45%' }}
                />
                <span 
                  className="badge rounded-pill px-2.5 py-1 small position-absolute bottom-0 start-0 m-2.5 text-white"
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', fontSize: '0.7rem' }}
                >
                  <Layers size={11} className="me-1 d-inline" />
                  Cellular Architecture
                </span>
              </div>

              {/* Main Card Content (Question or Answer) */}
              <h3 
                className="fw-bold mb-3 px-2" 
                style={{ 
                  color: isFlipped ? '#0f766e' : 'var(--k-text-primary)', 
                  lineHeight: 1.45,
                  fontSize: 'clamp(1.15rem, 2vw, 1.4rem)'
                }}
              >
                {isFlipped ? cardAnswer : cardQuestion}
              </h3>

              {/* Interactive Flip Hint */}
              <div 
                className="mt-1 small fw-semibold d-inline-flex align-items-center gap-1.5 px-3.5 py-1.5 rounded-pill shadow-xs"
                style={{
                  backgroundColor: isFlipped ? '#ccfbf1' : '#f1f5f9',
                  color: isFlipped ? '#0f766e' : '#475569',
                  fontSize: '0.78rem',
                  border: isFlipped ? '1px solid #99f6e4' : '1px solid #cbd5e1'
                }}
              >
                <RotateCcw size={13} />
                <span>{isFlipped ? 'Tap card to revisit question' : 'Tap card to reveal scientific answer'}</span>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="d-flex align-items-center justify-content-between pt-2">
              <button
                type="button"
                className="btn btn-sm btn-light border rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-1.5"
                onClick={handlePrevCard}
                disabled={fcIndex === 0}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary rounded-pill px-3.5 py-2 fw-semibold d-flex align-items-center gap-1.5"
                onClick={handleToggleFlip}
              >
                <RotateCcw size={15} />
                <span>Flip Card</span>
              </button>

              <button
                type="button"
                className="btn btn-sm btn-teal text-white rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-1.5 shadow-xs"
                style={{ backgroundColor: '#0d9488' }}
                onClick={handleNextCard}
              >
                <span>{fcIndex < flashcards.length - 1 ? 'Next Card' : 'Finish'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* Well done summary screen */
          <div className="card border-0 shadow-sm rounded-4 p-5 bg-white text-center">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow-xs"
              style={{ width: '80px', height: '80px', backgroundColor: '#ccfbf1', color: '#0d9488' }}
            >
              <CheckCircle2 size={44} />
            </div>
            <h3 className="fw-bold text-dark mb-1">Well done!</h3>
            <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: '480px', lineHeight: 1.5 }}>
              You reviewed all foundational stem cell flashcards! You now understand cellular self-renewal, hematopoiesis, and curative clinical applications.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn btn-teal text-white rounded-pill px-4 py-2.5 fw-bold shadow-xs"
                style={{ backgroundColor: '#0d9488' }}
                onClick={handleResetFlashcards}
              >
                Play Again
              </button>
              <button
                type="button"
                className="btn btn-light border rounded-pill px-4 py-2.5 fw-semibold text-secondary hover-translate-y"
                onClick={handleBackToLanding}
              >
                Back to Learn &amp; Play
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // FOCUSED GAME EXPERIENCE 2: CARE QUEST
  // =========================================================================
  if (activeGame === 'care-quest') {
    return (
      <div className="koshika-animate-fadein pb-5" style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Top Header */}
        <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
          <button
            type="button"
            className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5 text-secondary hover-translate-y shadow-xs"
            onClick={handleBackToLanding}
          >
            <ArrowLeft size={16} />
            <span>← Back to Learn &amp; Play</span>
          </button>
          <span className="badge rounded-pill px-3 py-1.5 text-white fw-bold shadow-xs" style={{ backgroundColor: '#7e22ce' }}>
            Milestone {cqStepIdx + 1} of {currentScenario.steps.length}
          </span>
        </div>

        {/* 3-Step Healthcare Decision Roadmap */}
        <div className="card border-0 rounded-4 p-3 mb-4 bg-white shadow-xs" style={{ border: '1px solid var(--k-border)' }}>
          <div className="d-flex align-items-center justify-content-between position-relative px-2 py-1">
            {currentScenario.steps.map((st, sIdx) => {
              const isCurrent = sIdx === cqStepIdx;
              const isDone = sIdx < cqStepIdx;
              return (
                <div key={sIdx} className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 1, flex: 1 }}>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-xs transition-all mb-1"
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: isDone ? '#10b981' : isCurrent ? '#7e22ce' : 'var(--k-surface-alt, #f1f5f9)',
                      color: isDone || isCurrent ? '#ffffff' : '#64748b',
                      border: isCurrent ? '3px solid #d8b4fe' : isDone ? '2px solid #10b981' : '2px solid var(--k-border)',
                      fontSize: '0.82rem'
                    }}
                  >
                    {isDone ? <Check size={18} /> : sIdx + 1}
                  </div>
                  <span
                    className="small fw-semibold text-center text-truncate px-1"
                    style={{
                      fontSize: '0.72rem',
                      color: isCurrent ? '#7e22ce' : isDone ? '#059669' : '#64748b',
                      maxWidth: '120px'
                    }}
                  >
                    {sIdx === 0 ? 'Clinical Case' : sIdx === 1 ? 'Diagnostic Path' : 'Safe Outcome'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-4 text-center">
          <span className="badge rounded-pill px-3 py-1 text-uppercase fw-bold small mb-1" style={{ backgroundColor: '#f3e8ff', color: '#7e22ce', border: '1px solid #d8b4fe' }}>
            🧭 Story Journey &amp; Patient Decision Flow
          </span>
          <h2 className="fw-bold text-dark mb-1" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)' }}>
            Koshika Care Quest
          </h2>
          <p className="text-secondary small mb-0">
            Real healthcare dilemmas. Make informed decisions and understand clinical perspectives.
          </p>
        </div>

        {!cqCompleted ? (
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white" style={{ border: '1px solid var(--k-border)' }}>
            {/* Scenario Narrative Box */}
            <div 
              className="p-4 rounded-4 mb-4 position-relative overflow-hidden" 
              style={{ 
                backgroundColor: 'var(--k-surface-alt, #faf5ff)', 
                border: '1.5px solid #d8b4fe',
                boxShadow: '0 4px 16px rgba(126, 34, 206, 0.06)'
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="d-flex align-items-center gap-1.5 small fw-bold text-uppercase" style={{ color: '#7e22ce', fontSize: '0.75rem' }}>
                  <Stethoscope size={15} />
                  <span>Clinical Case Dilemma • Decision #{cqStepIdx + 1}</span>
                </div>
                <span className="badge rounded-pill px-2.5 py-0.5 small" style={{ backgroundColor: '#f3e8ff', color: '#6b21a8', border: '1px solid #d8b4fe', fontSize: '0.7rem' }}>
                  Medical Ethics &amp; Safety
                </span>
              </div>
              <p className="fw-bold mb-0 fs-6" style={{ lineHeight: 1.55, color: 'var(--k-text-primary)' }}>
                {getLocalizedText(currentScenarioStep.prompt || currentScenarioStep.narrative, langCode)}
              </p>
            </div>

            {/* Decision Choices */}
            <div className="d-flex flex-column gap-3 mb-4">
              {currentScenarioStep.choices.map((choice, idx) => {
                const isSelected = cqSelectedChoice === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    className="btn text-start p-3.5 rounded-4 border d-flex align-items-start gap-3 transition-all k-game-choice-btn"
                    style={{
                      borderColor: isSelected ? '#7e22ce' : 'var(--k-border)',
                      backgroundColor: isSelected ? '#f3e8ff' : 'var(--k-surface)',
                      borderLeft: isSelected ? '5px solid #7e22ce' : '1px solid var(--k-border)',
                      boxShadow: isSelected ? '0 4px 16px rgba(126, 34, 206, 0.14)' : 'none',
                      transform: isSelected ? 'translateY(-1px)' : 'none'
                    }}
                    onClick={() => handleCqSelectChoice(idx)}
                  >
                    <span 
                      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0 mt-0.5 shadow-xs" 
                      style={{ 
                        width: '28px', 
                        height: '28px',
                        backgroundColor: isSelected ? '#7e22ce' : '#94a3b8',
                        fontSize: '0.84rem'
                      }}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="fw-semibold flex-grow-1" style={{ fontSize: '0.92rem', lineHeight: 1.45, color: 'var(--k-text-primary)' }}>
                      {getLocalizedText(choice.text, langCode)}
                    </span>
                    {isSelected && (
                      <CheckCircle2 size={20} className="text-purple flex-shrink-0 mt-0.5" style={{ color: '#7e22ce' }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback on selection */}
            {cqEvaluated && (
              <div 
                className="p-3.5 rounded-4 mb-4 border k-game-feedback-box" 
                style={{ 
                  backgroundColor: '#f8fafc', 
                  borderColor: '#cbd5e1',
                  borderLeft: '4px solid #7e22ce'
                }}
              >
                <div className="fw-bold small mb-1.5 d-flex align-items-center gap-1.5" style={{ color: '#6b21a8' }}>
                  <Stethoscope size={16} />
                  <span>Physician Consultation Perspective &amp; Clinical Guidance:</span>
                </div>
                <p className="text-secondary small mb-0" style={{ lineHeight: 1.55 }}>
                  {getLocalizedText(currentScenarioStep.choices[cqSelectedChoice]?.explanation, langCode) || 
                   'Consulting board-certified hematologists and reviewing evidence-based registry options is always the safest course.'}
                </p>
              </div>
            )}

            {/* Next Button */}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                disabled={!cqEvaluated}
                className="btn text-white rounded-pill px-4.5 py-2.5 fw-bold d-flex align-items-center gap-1.5 shadow-xs"
                style={{ backgroundColor: '#7e22ce' }}
                onClick={handleCqNextStep}
              >
                <span>{cqStepIdx < currentScenario.steps.length - 1 ? 'Next Decision' : 'Complete Quest'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* Well done summary screen */
          <div className="card border-0 shadow-sm rounded-4 p-5 bg-white text-center">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow-xs"
              style={{ width: '80px', height: '80px', backgroundColor: '#f3e8ff', color: '#7e22ce' }}
            >
              <CheckCircle2 size={44} />
            </div>
            <h3 className="fw-bold text-dark mb-1">Well done!</h3>
            <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: '480px', lineHeight: 1.5 }}>
              You successfully navigated the healthcare pathway! You prioritized verified doctor consultations, high-resolution HLA typing, and evidence-based clinical guidance.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn text-white rounded-pill px-4 py-2.5 fw-bold shadow-xs"
                style={{ backgroundColor: '#7e22ce' }}
                onClick={handleResetCareQuest}
              >
                Play Again
              </button>
              <button
                type="button"
                className="btn btn-light border rounded-pill px-4 py-2.5 fw-semibold text-secondary hover-translate-y"
                onClick={handleBackToLanding}
              >
                Back to Learn &amp; Play
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // FOCUSED GAME EXPERIENCE 3: SAFE OR UNSAFE
  // =========================================================================
  if (activeGame === 'safe-or-unsafe') {
    return (
      <div className="koshika-animate-fadein pb-5" style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Top Header */}
        <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
          <button
            type="button"
            className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5 text-secondary hover-translate-y shadow-xs"
            onClick={handleBackToLanding}
          >
            <ArrowLeft size={16} />
            <span>← Back to Learn &amp; Play</span>
          </button>
          <span className="badge rounded-pill px-3 py-1.5 text-white fw-bold shadow-xs" style={{ backgroundColor: '#d97706' }}>
            Claim {souIdx + 1} of {safetySession.length}
          </span>
        </div>

        {/* 8-Claim Visual Progress Tracker */}
        <div className="d-flex justify-content-center align-items-center gap-1.5 mb-3 flex-wrap">
          {safetySession.map((claim, cIdx) => {
            const isCurrent = cIdx === souIdx;
            const isDone = cIdx < souIdx;
            return (
              <div
                key={claim.id || cIdx}
                className="d-flex align-items-center justify-content-center fw-bold transition-all shadow-xs"
                style={{
                  width: isCurrent ? '26px' : '18px',
                  height: '18px',
                  borderRadius: '9px',
                  backgroundColor: isCurrent ? '#d97706' : isDone ? '#10b981' : 'var(--k-border)',
                  color: '#ffffff',
                  fontSize: '0.65rem'
                }}
                title={`Claim ${cIdx + 1}`}
              >
                {isDone ? '✓' : cIdx + 1}
              </div>
            );
          })}
        </div>

        <div className="mb-4 text-center">
          <span className="badge rounded-pill px-3 py-1 text-uppercase fw-bold small mb-1" style={{ backgroundColor: '#fffbeb', color: '#d97706', border: '1px solid #fde68a' }}>
            🛡️ Claim Detector &amp; Medical Fraud Shield
          </span>
          <h2 className="fw-bold text-dark mb-1" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)' }}>
            Safe or Unsafe
          </h2>
          <p className="text-secondary small mb-0">
            Identify verified clinical therapies versus dangerous or unproven commercial claims.
          </p>
        </div>

        {!souCompleted ? (
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white text-center" style={{ border: '1px solid var(--k-border)' }}>
            {/* Medical Claim Card */}
            <div 
              className="rounded-4 p-4 p-md-5 mb-4 position-relative k-claim-card-box"
              style={{
                backgroundColor: 'var(--k-surface-alt, #fffdf5)',
                border: '2px solid #fde68a',
                boxShadow: '0 6px 20px rgba(217, 119, 6, 0.08)'
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom" style={{ borderColor: 'rgba(217, 119, 6, 0.2)' }}>
                <span className="small fw-bold text-uppercase d-flex align-items-center gap-1.5" style={{ color: '#b45309', fontSize: '0.72rem' }}>
                  <ShieldCheck size={14} />
                  <span>CDSCO &amp; ICMR Evaluation Criteria</span>
                </span>
                <span className="badge rounded-pill px-2.5 py-0.5 small" style={{ backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', fontSize: '0.7rem' }}>
                  Claim #{souIdx + 1}
                </span>
              </div>
              <h3 className="fw-bold px-2 mb-0" style={{ lineHeight: 1.45, fontSize: 'clamp(1.15rem, 2vw, 1.4rem)', color: 'var(--k-text-primary)' }}>
                "{getLocalizedText(currentClaimItem.claim, langCode)}"
              </h3>
            </div>

            {/* Binary Choice Buttons */}
            <div className="row g-3 mb-4">
              <div className="col-6">
                <button
                  type="button"
                  disabled={souEvaluated}
                  className={`btn w-100 py-3 rounded-4 fw-bold d-flex flex-column align-items-center justify-content-center gap-1 transition-all shadow-xs ${
                    souEvaluated 
                      ? currentClaimItem.isSafe 
                        ? 'btn-success text-white' 
                        : 'btn-light border opacity-50'
                      : 'btn-outline-success hover-translate-y'
                  }`}
                  style={{ minHeight: '94px', borderWidth: '2px' }}
                  onClick={() => handleSouChoice(true)}
                >
                  <CheckCircle2 size={24} />
                  <span style={{ fontSize: '0.96rem', letterSpacing: '0.03em' }}>SAFE &amp; APPROVED</span>
                  <small className="opacity-75 fw-normal" style={{ fontSize: '0.72rem' }}>Authorized Clinical Protocol</small>
                </button>
              </div>

              <div className="col-6">
                <button
                  type="button"
                  disabled={souEvaluated}
                  className={`btn w-100 py-3 rounded-4 fw-bold d-flex flex-column align-items-center justify-content-center gap-1 transition-all shadow-xs ${
                    souEvaluated 
                      ? !currentClaimItem.isSafe 
                        ? 'btn-danger text-white' 
                        : 'btn-light border opacity-50'
                      : 'btn-outline-danger hover-translate-y'
                  }`}
                  style={{ minHeight: '94px', borderWidth: '2px' }}
                  onClick={() => handleSouChoice(false)}
                >
                  <XCircle size={24} />
                  <span style={{ fontSize: '0.96rem', letterSpacing: '0.03em' }}>UNSAFE / UNPROVEN</span>
                  <small className="opacity-75 fw-normal" style={{ fontSize: '0.72rem' }}>Unregulated Commercial Risk</small>
                </button>
              </div>
            </div>

            {/* Scientific Explanation after answering */}
            {souEvaluated && (
              <div 
                className="p-3.5 rounded-4 mb-4 border text-start"
                style={{
                  backgroundColor: currentClaimItem.isSafe === souUserAnswer ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  borderColor: currentClaimItem.isSafe === souUserAnswer ? '#a7f3d0' : '#fecaca',
                  borderLeft: currentClaimItem.isSafe === souUserAnswer ? '5px solid #059669' : '5px solid #dc2626'
                }}
              >
                <div className="fw-bold small mb-1.5 d-flex align-items-center gap-1.5">
                  <ShieldCheck size={18} className={currentClaimItem.isSafe ? 'text-success' : 'text-danger'} />
                  <span className={currentClaimItem.isSafe === souUserAnswer ? 'text-success' : 'text-danger'}>
                    {currentClaimItem.isSafe === souUserAnswer ? 'Correct Assessment!' : 'Important Safety Clarification:'}
                  </span>
                </div>
                <p className="small mb-0" style={{ lineHeight: 1.55, color: 'var(--k-text-primary)' }}>
                  {getLocalizedText(currentClaimItem.explanation, langCode)}
                </p>
              </div>
            )}

            {/* Next Button */}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                disabled={!souEvaluated}
                className="btn text-white rounded-pill px-4 py-2.5 fw-bold d-flex align-items-center gap-1.5 shadow-xs"
                style={{ backgroundColor: '#d97706' }}
                onClick={handleSouNext}
              >
                <span>{souIdx < safetySession.length - 1 ? 'Next Claim' : 'View Results'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* Well done summary screen */
          <div className="card border-0 shadow-sm rounded-4 p-5 bg-white text-center">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow-xs"
              style={{ width: '80px', height: '80px', backgroundColor: '#fef3c7', color: '#d97706' }}
            >
              <ShieldCheck size={44} />
            </div>
            <h3 className="fw-bold text-dark mb-1">Well done!</h3>
            <p className="text-secondary mb-2 mx-auto" style={{ maxWidth: '480px', lineHeight: 1.5 }}>
              You reviewed medical safety claims. You completed {souScore} / {safetySession.length} accurate assessments.
            </p>
            <p className="text-muted small mb-4" style={{ fontSize: '0.84rem' }}>
              Always verify stem cell treatments with authorized registries and licensed hospital hematologists under ICMR/CDSCO guidelines.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn text-white rounded-pill px-4 py-2.5 fw-bold shadow-xs"
                style={{ backgroundColor: '#d97706' }}
                onClick={handleResetSafety}
              >
                Play Again
              </button>
              <button
                type="button"
                className="btn btn-light border rounded-pill px-4 py-2.5 fw-semibold text-secondary hover-translate-y"
                onClick={handleBackToLanding}
              >
                Back to Learn &amp; Play
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // LANDING HUB: EXACTLY THREE DISTINCTIVE GAME CARDS (Sections 11 & 12)
  // ABSOLUTELY NO STREAKS, NO POINTS, NO COMPETITIVE RANKING
  // =========================================================================
  return (
    <div className="koshika-animate-fadein pb-5" style={{ maxWidth: '1060px', margin: '0 auto' }}>
      
      {/* Compact Creative Hero Header Banner with Generous Spacing */}
      <div 
        className="card border-0 rounded-4 mb-4 position-relative overflow-hidden shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          color: '#ffffff',
          padding: '2rem 2.25rem',
          minHeight: '190px'
        }}
      >
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 position-relative z-1">
          {/* Left Text Content */}
          <div style={{ maxWidth: '640px' }}>
            <div 
              className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill mb-2.5"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', border: '1px solid rgba(255, 255, 255, 0.3)' }}
            >
              <Sparkles size={13} className="text-warning" />
              <span className="small fw-bold text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.05em', color: '#ffffff' }}>
                Interactive Science &amp; Safety Lab
              </span>
            </div>
            
            <h2 className="fw-bold mb-2 text-white" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)', letterSpacing: '-0.02em' }}>
              Learn &amp; Play Studio
            </h2>
            
            <p className="text-white mb-3" style={{ fontSize: '0.92rem', lineHeight: 1.55, opacity: 0.95 }}>
              Hands-on visual activities that demystify stem-cell biology and clinical safety. No streaks, no competitive pressure—pure, self-paced learning.
            </p>

            {/* Clear, High-Contrast Meaningful Badges with dark legible text */}
            <div className="d-flex flex-wrap gap-2.5">
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-bold d-inline-flex align-items-center gap-1.5 shadow-xs top-head-badge-white"
                style={{ backgroundColor: 'var(--k-surface)', color: 'var(--k-primary)', border: '1px solid var(--k-border)', fontSize: '0.78rem' }}
              >
                <span>🌿</span>
                <span>100% Educational</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-bold d-inline-flex align-items-center gap-1.5 shadow-xs top-head-badge-white"
                style={{ backgroundColor: 'var(--k-surface)', color: 'var(--k-primary)', border: '1px solid var(--k-border)', fontSize: '0.78rem' }}
              >
                <span>🔬</span>
                <span>Evidence-Based</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-bold d-inline-flex align-items-center gap-1.5 shadow-xs top-head-badge-white"
                style={{ backgroundColor: 'var(--k-surface)', color: 'var(--k-primary)', border: '1px solid var(--k-border)', fontSize: '0.78rem' }}
              >
                <span>🛡️</span>
                <span>Scam Prevention</span>
              </span>
            </div>
          </div>

          {/* Right Visual: Meaningful Stem-Cell Science & Learning Artwork */}
          <div className="d-none d-md-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '180px', height: '110px' }}>
            <svg width="180" height="110" viewBox="0 0 180 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="cellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#db2777" />
                </linearGradient>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>

              {/* Central Glowing Stem Cell */}
              <circle cx="85" cy="55" r="28" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="85" cy="55" r="18" fill="url(#cellGrad)" />
              <circle cx="80" cy="50" r="4" fill="#ffffff" opacity="0.8" />
              <text x="85" y="79" fill="#a7f3d0" fontSize="7.5" fontWeight="bold" textAnchor="middle">Stem Cell</text>

              {/* Differentiation Arrows & Satellite Cells */}
              {/* Top Right: Blood Cell (RBC) */}
              <path d="M102 44 L126 32" stroke="#ffffff" strokeWidth="1.8" strokeDasharray="2 2" strokeLinecap="round" />
              <circle cx="138" cy="26" r="13" fill="#ef4444" opacity="0.9" />
              <circle cx="134" cy="23" r="3" fill="#ffffff" opacity="0.8" />
              <text x="138" y="30" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">RBC</text>

              {/* Bottom Right: Immune Cell (WBC) */}
              <path d="M102 66 L126 78" stroke="#ffffff" strokeWidth="1.8" strokeDasharray="2 2" strokeLinecap="round" />
              <circle cx="138" cy="84" r="13" fill="#10b981" opacity="0.9" />
              <circle cx="134" cy="81" r="3" fill="#ffffff" opacity="0.8" />
              <text x="138" y="88" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">WBC</text>

              {/* Left Side: Medical Shield Verification Emblem */}
              <path d="M68 55 L42 55" stroke="#ffffff" strokeWidth="1.8" strokeDasharray="2 2" strokeLinecap="round" />
              <circle cx="28" cy="55" r="15" fill="url(#shieldGrad)" />
              <path d="M23 55 L27 59 L34 51" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

              {/* DNA Helix Wave Spark */}
              <path d="M65 20 Q75 12 85 20 T105 20" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
            </svg>
          </div>
        </div>
      </div>

      {/* Safety Notice Strip */}
      <div className="card border-0 rounded-4 p-3 bg-white border shadow-xs d-flex flex-row align-items-center gap-2.5 mb-4">
        <Info size={18} className="text-teal flex-shrink-0" style={{ color: '#0d9488' }} />
        <span className="small text-muted" style={{ fontSize: '0.84rem' }}>
          All interactive games are built exclusively for patient empowerment and scientific clarity. No streaks, no competition—learn freely at your own speed.
        </span>
      </div>

      {/* THREE DISTINCTIVE GAME CARDS (Section 12) */}
      <div className="row g-4">
        
        {/* Game 1: Discovery Flashcards (mint / teal / soft pink) */}
        <div className="col-12 col-md-4">
          <div 
            className="card border-0 rounded-4 shadow-sm p-4 h-100 d-flex flex-column justify-content-between hover-lift position-relative overflow-hidden k-game-card-teal"
            style={{ 
              background: 'var(--k-surface)',
              border: '1.5px solid var(--k-border)',
              boxShadow: 'var(--k-shadow-card)',
              backgroundImage: 'linear-gradient(180deg, rgba(13, 148, 136, 0.05) 0%, transparent 120px)'
            }}
          >
            <div>
              {/* Top Category Badge */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span 
                  className="badge rounded-pill px-2.5 py-1 small fw-bold"
                  style={{ backgroundColor: '#ccfbf1', color: '#0f766e', fontSize: '0.72rem', border: '1px solid #99f6e4' }}
                >
                  🌿 BEGINNER BASICS
                </span>
                <span className="small text-muted fw-semibold" style={{ fontSize: '0.75rem' }}>6 Visual Cards</span>
              </div>

              {/* Meaningful Illustration */}
              <div className="d-flex justify-content-center my-3">
                <FlashcardsIllustration size={120} />
              </div>

              {/* Title */}
              <h4 className="fw-bold text-dark mb-1.5 text-center" style={{ fontSize: '1.2rem' }}>
                Discovery Flashcards
              </h4>

              {/* Short Description */}
              <p className="text-secondary small text-center mb-3" style={{ fontSize: '0.86rem', lineHeight: 1.5 }}>
                Interactive visual flip-cards for beginners who know nothing about stem cells.
              </p>

              {/* Feature Tags with distinct semantic medical palettes */}
              <div className="d-flex justify-content-center gap-1.5 mb-4 flex-wrap">
                <span className="badge rounded-pill px-2.5 py-1 small fw-semibold" style={{ backgroundColor: '#ccfbf1', color: '#0f766e', border: '1px solid #99f6e4', fontSize: '0.72rem' }}>
                  🧬 Self-Renewal
                </span>
                <span className="badge rounded-pill px-2.5 py-1 small fw-semibold" style={{ backgroundColor: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd', fontSize: '0.72rem' }}>
                  🔊 Audio Voice
                </span>
                <span className="badge rounded-pill px-2.5 py-1 small fw-semibold" style={{ backgroundColor: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', fontSize: '0.72rem' }}>
                  🔬 Cell Types
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              className="btn btn-teal text-white rounded-pill py-2.5 fw-bold w-100 d-flex align-items-center justify-content-center gap-2 shadow-xs"
              style={{ backgroundColor: '#0d9488' }}
              onClick={() => handleSelectGame('discovery-flashcards')}
            >
              <span>Explore Flashcards</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Game 2: Koshika Care Quest (soft purple / lavender) */}
        <div className="col-12 col-md-4">
          <div 
            className="card border-0 rounded-4 shadow-sm p-4 h-100 d-flex flex-column justify-content-between hover-lift position-relative overflow-hidden k-game-card-purple"
            style={{ 
              background: 'var(--k-surface)',
              border: '1.5px solid var(--k-border)',
              boxShadow: 'var(--k-shadow-card)',
              backgroundImage: 'linear-gradient(180deg, rgba(126, 34, 206, 0.05) 0%, transparent 120px)'
            }}
          >
            <div>
              {/* Top Category Badge */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span 
                  className="badge rounded-pill px-2.5 py-1 small fw-bold"
                  style={{ backgroundColor: '#f3e8ff', color: '#7e22ce', fontSize: '0.72rem', border: '1px solid #d8b4fe' }}
                >
                  🧭 DECISION JOURNEY
                </span>
                <span className="small text-muted fw-semibold" style={{ fontSize: '0.75rem' }}>3 Milestones</span>
              </div>

              {/* Meaningful Illustration */}
              <div className="d-flex justify-content-center my-3">
                <CareQuestIllustration size={120} />
              </div>

              {/* Title */}
              <h4 className="fw-bold text-dark mb-1.5 text-center" style={{ fontSize: '1.2rem' }}>
                Koshika Care Quest
              </h4>

              {/* Short Description */}
              <p className="text-secondary small text-center mb-3" style={{ fontSize: '0.86rem', lineHeight: 1.5 }}>
                Story-based decisions that help users navigate real-world healthcare situations.
              </p>

              {/* Feature Tags with distinct semantic medical palettes */}
              <div className="d-flex justify-content-center gap-1.5 mb-4 flex-wrap">
                <span className="badge rounded-pill px-2.5 py-1 small fw-semibold" style={{ backgroundColor: '#f3e8ff', color: '#6b21a8', border: '1px solid #d8b4fe', fontSize: '0.72rem' }}>
                  🩺 Doctor Insights
                </span>
                <span className="badge rounded-pill px-2.5 py-1 small fw-semibold" style={{ backgroundColor: '#e0e7ff', color: '#3730a3', border: '1px solid #c7d2fe', fontSize: '0.72rem' }}>
                  🧪 HLA Matching
                </span>
                <span className="badge rounded-pill px-2.5 py-1 small fw-semibold" style={{ backgroundColor: '#ede9fe', color: '#5b21b6', border: '1px solid #ddd6fe', fontSize: '0.72rem' }}>
                  🏥 Safe Pathway
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              className="btn text-white rounded-pill py-2.5 fw-bold w-100 d-flex align-items-center justify-content-center gap-2 shadow-xs"
              style={{ backgroundColor: '#7e22ce' }}
              onClick={() => handleSelectGame('care-quest')}
            >
              <span>Start Care Quest</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Game 3: Safe or Unsafe (warm amber / orange) */}
        <div className="col-12 col-md-4">
          <div 
            className="card border-0 rounded-4 shadow-sm p-4 h-100 d-flex flex-column justify-content-between hover-lift position-relative overflow-hidden k-game-card-amber"
            style={{ 
              background: 'var(--k-surface)',
              border: '1.5px solid var(--k-border)',
              boxShadow: 'var(--k-shadow-card)',
              backgroundImage: 'linear-gradient(180deg, rgba(217, 119, 6, 0.05) 0%, transparent 120px)'
            }}
          >
            <div>
              {/* Top Category Badge */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span 
                  className="badge rounded-pill px-2.5 py-1 small fw-bold"
                  style={{ backgroundColor: '#fef3c7', color: '#b45309', fontSize: '0.72rem', border: '1px solid #fde68a' }}
                >
                  🛡️ TRUTH VS HYPE
                </span>
                <span className="small text-muted fw-semibold" style={{ fontSize: '0.75rem' }}>8 Clinical Claims</span>
              </div>

              {/* Meaningful Illustration */}
              <div className="d-flex justify-content-center my-3">
                <SafeUnsafeIllustration size={120} />
              </div>

              {/* Title */}
              <h4 className="fw-bold text-dark mb-1.5 text-center" style={{ fontSize: '1.2rem' }}>
                Safe or Unsafe
              </h4>

              {/* Short Description */}
              <p className="text-secondary small text-center mb-3" style={{ fontSize: '0.86rem', lineHeight: 1.5 }}>
                Identify safe medical information versus dangerous, illegal or unproven claims.
              </p>

              {/* Feature Tags with distinct semantic medical palettes */}
              <div className="d-flex justify-content-center gap-1.5 mb-4 flex-wrap">
                <span className="badge rounded-pill px-2.5 py-1 small fw-semibold" style={{ backgroundColor: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', fontSize: '0.72rem' }}>
                  ⚖️ ICMR Rules
                </span>
                <span className="badge rounded-pill px-2.5 py-1 small fw-semibold" style={{ backgroundColor: '#fee2e2', color: '#b91c1c', border: '1px solid #fecaca', fontSize: '0.72rem' }}>
                  🚨 Scam Alerts
                </span>
                <span className="badge rounded-pill px-2.5 py-1 small fw-semibold" style={{ backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0', fontSize: '0.72rem' }}>
                  💊 Approved Cures
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              className="btn text-white rounded-pill py-2.5 fw-bold w-100 d-flex align-items-center justify-content-center gap-2 shadow-xs"
              style={{ backgroundColor: '#d97706' }}
              onClick={() => handleSelectGame('safe-or-unsafe')}
            >
              <span>Launch Claim Detector</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LearnAndPlay;
