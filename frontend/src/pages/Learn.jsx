import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import WatchAndListenPlayer from '../components/WatchAndListenPlayer';
import {
  WhatAreStemCellsVisual,
  HowDoTheyWorkVisual,
  TypesOfStemCellsVisual,
  UsesAndBenefitsVisual,
  SafetyAndRisksVisual,
  MythsVsFactsVisual
} from '../components/LearnTopicVisuals';
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Gamepad2,
  FileCheck,
  Search,
  Check,
  X,
  Droplet,
  Dna,
  Activity,
  Layers,
  HelpCircle,
  Maximize2,
  Headphones,
  Video,
  Award,
  Flame
} from 'lucide-react';

// -------------------------------------------------------------
// HIGH-FIDELITY VECTOR ILLUSTRATIONS (Matching User Reference)
// -------------------------------------------------------------

// Card 01: Glowing 3D Stem Cell Orb
const StemCellOrbSvg = () => (
  <svg width="112" height="112" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <defs>
      <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f472b6" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="orbBody" cx="36%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#fdf2f8" />
        <stop offset="25%" stopColor="#f472b6" />
        <stop offset="70%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#7e22ce" />
      </radialGradient>
      <radialGradient id="orbNucleus" cx="35%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="45%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#9333ea" />
      </radialGradient>
      <radialGradient id="satellite1" cx="35%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#fdf2f8" />
        <stop offset="100%" stopColor="#ec4899" />
      </radialGradient>
      <radialGradient id="satellite2" cx="35%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#e0e7ff" />
        <stop offset="100%" stopColor="#818cf8" />
      </radialGradient>
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <circle cx="68" cy="55" r="48" fill="url(#orbGlow)" />
    <circle cx="95" cy="30" r="9" fill="url(#satellite1)" />
    <circle cx="93" cy="28" r="3" fill="#ffffff" opacity="0.7" />
    <circle cx="28" cy="78" r="7.5" fill="url(#satellite2)" />
    <circle cx="27" cy="77" r="2.5" fill="#ffffff" opacity="0.7" />
    <circle cx="36" cy="32" r="5" fill="#f472b6" opacity="0.6" />
    <circle cx="66" cy="56" r="33" fill="url(#orbBody)" filter="url(#softGlow)" />
    <circle cx="66" cy="56" r="29" stroke="#fdf2f8" strokeWidth="1.5" strokeOpacity="0.45" />
    <circle cx="63" cy="53" r="16" fill="url(#orbNucleus)" />
    <circle cx="60" cy="50" r="6" fill="#ffffff" opacity="0.7" />
    <circle cx="67" cy="56" r="3.5" fill="#ffffff" opacity="0.4" />
    <circle cx="58" cy="57" r="2" fill="#ffffff" opacity="0.3" />
  </svg>
);

// Card 02: Cell Division & Self-Renewal Cycle
const CellDivisionSvg = () => (
  <svg width="112" height="112" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <defs>
      <radialGradient id="divParent" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#fdf2f8" />
        <stop offset="40%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#c084fc" />
      </radialGradient>
      <radialGradient id="divDaughter1" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#eff6ff" />
        <stop offset="45%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#3b82f6" />
      </radialGradient>
      <radialGradient id="divDaughter2" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#fdf4ff" />
        <stop offset="45%" stopColor="#e879f9" />
        <stop offset="100%" stopColor="#a855f7" />
      </radialGradient>
    </defs>
    {/* Parent Cell */}
    <circle cx="34" cy="58" r="20" fill="url(#divParent)" />
    <circle cx="31" cy="55" r="9" fill="#a855f7" opacity="0.85" />
    <circle cx="29" cy="53" r="3.5" fill="#ffffff" opacity="0.75" />

    {/* Branching arrows */}
    <path d="M 52 46 Q 66 32 78 30" stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeDasharray="3 3" />
    <polygon points="78,27 84,30 78,33" fill="#38bdf8" />

    <path d="M 52 70 Q 66 84 78 86" stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeDasharray="3 3" />
    <polygon points="78,83 84,86 78,89" fill="#38bdf8" />

    {/* Daughter Cell 1 */}
    <circle cx="94" cy="28" r="16" fill="url(#divDaughter1)" />
    <circle cx="92" cy="26" r="7" fill="#1d4ed8" opacity="0.8" />
    <circle cx="90" cy="24" r="2.5" fill="#ffffff" opacity="0.7" />

    {/* Daughter Cell 2 */}
    <circle cx="94" cy="88" r="17" fill="url(#divDaughter2)" />
    <circle cx="92" cy="86" r="7.5" fill="#9333ea" opacity="0.8" />
    <circle cx="90" cy="84" r="3" fill="#ffffff" opacity="0.7" />
  </svg>
);

// Card 03: Stem Cell Differentiation & Types
const StemCellTypesSvg = () => (
  <svg width="112" height="112" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <defs>
      <radialGradient id="tType1" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#fff7ed" />
        <stop offset="60%" stopColor="#fb923c" />
        <stop offset="100%" stopColor="#ea580c" />
      </radialGradient>
      <radialGradient id="tType2" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#fdf2f8" />
        <stop offset="60%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#db2777" />
      </radialGradient>
      <radialGradient id="tType3" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#f5f3ff" />
        <stop offset="60%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#6d28d9" />
      </radialGradient>
      <radialGradient id="tCluster" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="70%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#ca8a04" />
      </radialGradient>
    </defs>
    {/* Type 1: Key Receptor */}
    <circle cx="28" cy="28" r="13" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1.5" />
    <path d="M28 20 C25 20 23 22 23 25 C23 27 24.5 28.5 26.5 29 L26.5 35 L29.5 35 L29.5 31 L31 31 L31 29 L29.5 29 C31.5 28.5 33 27 33 25 C33 22 31 20 28 20 Z" fill="url(#tType1)" />

    {/* Type 2: Ovum / Blastocyst */}
    <circle cx="70" cy="24" r="14" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="1.5" />
    <circle cx="70" cy="24" r="8" fill="url(#tType2)" />
    <circle cx="70" cy="24" r="3" fill="#ffffff" opacity="0.8" />

    {/* Type 3: Core stem cell (purple) */}
    <circle cx="36" cy="74" r="16" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1.5" />
    <circle cx="36" cy="74" r="10" fill="url(#tType3)" />
    <circle cx="34" cy="72" r="3.5" fill="#ffffff" opacity="0.85" />

    {/* Arrow pointing to specialized cluster */}
    <path d="M 56 74 L 70 74" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    <polygon points="70,70 76,74 70,78" fill="#94a3b8" />

    {/* Specialized Honeycomb Cluster */}
    <g transform="translate(86, 74)">
      <circle cx="0" cy="0" r="7" fill="url(#tCluster)" />
      <circle cx="-6" cy="-8" r="6" fill="url(#tCluster)" />
      <circle cx="7" cy="-7" r="6" fill="url(#tCluster)" />
      <circle cx="9" cy="4" r="5.5" fill="url(#tCluster)" />
      <circle cx="-5" cy="8" r="6" fill="url(#tCluster)" />
      <circle cx="5" cy="11" r="5" fill="url(#tCluster)" />
    </g>
  </svg>
);

// Card 04: Human Silhouette with Organ Badges
const HumanOrgansSvg = () => (
  <svg width="112" height="112" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <defs>
      <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#bae6fd" />
        <stop offset="100%" stopColor="#7dd3fc" />
      </linearGradient>
    </defs>
    {/* Human Body Silhouette in soft cyan */}
    <g opacity="0.85">
      <circle cx="48" cy="20" r="9" fill="url(#bodyGrad)" />
      <rect x="45.5" y="28" width="5" height="4" fill="url(#bodyGrad)" />
      <path d="M38 32 C38 32 43 32 48 32 C53 32 58 32 58 32 C60 32 62 34 61 37 L58 66 C58 68 56 70 54 70 L42 70 C40 70 38 68 38 66 L35 37 C34 34 36 32 38 32 Z" fill="url(#bodyGrad)" />
      <path d="M35 35 L26 56 C25 58 23 58 22 56 L20 54 C19 52 20 50 21 48 L32 33 Z" fill="url(#bodyGrad)" />
      <path d="M61 35 L70 56 C71 58 73 58 74 56 L76 54 C77 52 76 50 75 48 L64 33 Z" fill="url(#bodyGrad)" />
      <path d="M41 69 L39 104 C39 106 41 108 43 108 L45 108 C47 108 48 106 48 104 L47 70 Z" fill="url(#bodyGrad)" />
      <path d="M49 70 L48 104 C48 106 49 108 51 108 L53 108 C55 108 57 106 57 104 L55 69 Z" fill="url(#bodyGrad)" />
    </g>

    {/* Brain (top right) */}
    <g transform="translate(86, 16)">
      <circle cx="10" cy="10" r="12" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="1.2" />
      <path d="M6 10 C5 7 8 5 10 5 C11 4 13 4 14 6 C16 6 17 8 16 10 C17 11 16 14 14 14 C13 15 11 15 10 14 C8 15 5 13 6 10 Z" fill="#f43f5e" opacity="0.9" />
    </g>

    {/* Heart (chest left) */}
    <g transform="translate(12, 36)">
      <circle cx="10" cy="10" r="12" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1.2" />
      <path d="M10 6 C7.5 3 4 5 4 8 C4 11 10 15 10 15 C10 15 16 11 16 8 C16 5 12.5 3 10 6 Z" fill="#e11d48" />
    </g>

    {/* Kidneys (mid body right) */}
    <g transform="translate(86, 50)">
      <circle cx="10" cy="10" r="12" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1.2" />
      <ellipse cx="7" cy="10" rx="3.5" ry="5.5" fill="#e11d48" transform="rotate(-15 7 10)" />
      <ellipse cx="13" cy="10" rx="3.5" ry="5.5" fill="#e11d48" transform="rotate(15 13 10)" />
    </g>

    {/* Bone / Marrow (bottom right) */}
    <g transform="translate(84, 84)">
      <circle cx="10" cy="10" r="12" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1.2" />
      <path d="M5 8 C4 7 4 6 5 5 C6 4 7 4 8 5 L14 11 C15 12 15 13 14 14 C13 15 12 15 11 14 Z" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
);

// Card 05: Glossy Cyan Medical Security Shield
const SafetyShieldSvg = () => (
  <svg width="112" height="112" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <defs>
      <linearGradient id="shieldGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="shieldGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <filter id="shieldShadow" x="-15%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#0284c7" floodOpacity="0.22" />
      </filter>
    </defs>
    <g filter="url(#shieldShadow)">
      <path d="M60 22 C78 22 96 28 96 28 C96 58 84 84 60 98 C36 84 24 58 24 28 C24 28 42 22 60 22 Z" fill="#e0f2fe" />
      <path d="M60 26 C45 26 30 31 30 31 C30 56 40 78 60 90 L60 26 Z" fill="url(#shieldGradLeft)" />
      <path d="M60 26 C75 26 90 31 90 31 C90 56 80 78 60 90 L60 26 Z" fill="url(#shieldGradRight)" />
      <path d="M46 56 L55 65 L75 45" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

// Card 06: Green Fact & Red Myth Speech Bubbles
const MythsVsFactsSvg = () => (
  <svg width="112" height="112" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <defs>
      <linearGradient id="factGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="mythGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <filter id="bubbleDrop" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.1" />
      </filter>
    </defs>
    {/* Green Fact Bubble (Top Left) */}
    <g filter="url(#bubbleDrop)">
      <path d="M48 20 C62 20 73 31 73 44 C73 57 62 68 48 68 C43 68 38 66 34 64 L22 68 L26 57 C23 53 22 49 22 44 C22 31 34 20 48 20 Z" fill="url(#factGrad)" />
      <path d="M38 44 L44 50 L56 38" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Red Myth Bubble (Bottom Right) */}
    <g filter="url(#bubbleDrop)">
      <path d="M78 52 C91 52 102 62 102 74 C102 86 91 96 78 96 C74 96 70 95 67 93 L57 97 L60 88 C58 84 57 80 57 76 C57 63 67 52 78 52 Z" fill="url(#mythGrad)" />
      <path d="M70 68 L86 84 M86 68 L70 84" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

// Bottom Banner: Open Book with Glowing Bulb & Leaves
const InteractiveBookSvg = () => (
  <svg width="128" height="88" viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <defs>
      <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="bulbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="60%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#eab308" />
      </linearGradient>
      <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fde047" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Botanical leaf flourishes */}
    <path d="M30 45 C20 40 18 28 22 20 C28 28 32 38 30 45 Z" fill="#99f6e4" opacity="0.8" />
    <path d="M110 45 C120 40 122 28 118 20 C112 28 108 38 110 45 Z" fill="#99f6e4" opacity="0.8" />
    <circle cx="20" cy="18" r="4" fill="#5eead4" opacity="0.6" />
    <circle cx="120" cy="18" r="4" fill="#5eead4" opacity="0.6" />

    {/* Glowing aura around bulb */}
    <circle cx="70" cy="26" r="28" fill="url(#bulbGlow)" />

    {/* Light rays */}
    <line x1="70" y1="2" x2="70" y2="7" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="52" y1="8" x2="56" y2="13" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="88" y1="8" x2="84" y2="13" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="44" y1="24" x2="49" y2="25" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="96" y1="24" x2="91" y2="25" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />

    {/* Open Book Base */}
    <path d="M26 62 C40 60 56 63 68 70 L68 76 C56 70 40 67 26 70 Z" fill="#94a3b8" opacity="0.4" />
    <path d="M28 58 C42 56 58 59 70 66 L70 72 C58 66 42 63 28 66 Z" fill="#cbd5e1" />
    <path d="M30 52 C44 50 58 54 70 62 L70 68 C58 62 44 58 30 60 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
    <path d="M114 62 C100 60 84 63 72 70 L72 76 C84 70 100 67 114 70 Z" fill="#94a3b8" opacity="0.4" />
    <path d="M112 58 C98 56 82 59 70 66 L70 72 C82 66 98 63 112 66 Z" fill="#cbd5e1" />
    <path d="M110 52 C96 50 82 54 70 62 L70 68 C82 62 96 58 110 60 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
    <path d="M28 66 Q70 76 112 66 L112 72 Q70 82 28 72 Z" fill="url(#bookCover)" />

    {/* Glowing Lightbulb */}
    <path d="M63 32 C61 30 60 26 60 23 C60 17.5 64.5 13 70 13 C75.5 13 80 17.5 80 23 C80 26 79 30 77 32 L75 37 L65 37 Z" fill="url(#bulbGrad)" stroke="#ca8a04" strokeWidth="1" />
    <rect x="65" y="38" width="10" height="3" rx="1" fill="#94a3b8" />
    <rect x="66" y="42" width="8" height="2" rx="1" fill="#64748b" />
    <path d="M67 22 Q70 18 73 22" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const TOPICS = [
  {
    id: 'what-are-stem-cells',
    num: '01',
    badgeBg: '#e0f2fe',
    badgeColor: '#0284c7',
    cardTitle: 'What are Stem Cells?',
    cardDesc: 'Understand what stem cells are and why they are important.',
    SvgComp: StemCellOrbSvg,
    titleKey: 'tabWhatAre',
    fallbackTitle: 'What are Stem Cells?',
    icon: Dna,
    color: '#be123c',
    bgColor: '#fdf2f8',
    borderColor: '#fbcfe8',
    category: 'Basics',
    simpleWords: {
      en: 'Stem cells are special cells that can renew themselves and develop into different types of cells in the body.',
      hi: 'स्टेम कोशिकाएं विशेष कोशिकाएं हैं जो स्वयं को नवीनीकृत कर सकती हैं और शरीर में विभिन्न प्रकार की कोशिकाओं में विकसित हो सकती हैं।',
      mr: 'स्टेम पेशी या विशेष पेशी असतात ज्या स्वतःचे नूतनीकरण करू शकतात आणि शरीरातील विविध प्रकारच्या पेशींमध्ये विकसित होऊ शकतात।'
    },
    keyPoints: [
      'They can divide and make more cells of the same type.',
      'They can develop into specialized cells (blood, nerve, muscle, bone).',
      'They act as the body’s internal repair system.',
      'Used in curative bone marrow and stem cell transplants.'
    ]
  },
  {
    id: 'how-do-stem-cells-work',
    num: '02',
    badgeBg: '#e0f2fe',
    badgeColor: '#0284c7',
    cardTitle: 'How Do They Work?',
    cardDesc: 'Learn how stem cells can self-renew and develop into different cell types.',
    SvgComp: CellDivisionSvg,
    titleKey: 'tabHowWork',
    fallbackTitle: 'How do Stem Cells work?',
    icon: Sparkles,
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    borderColor: '#ddd6fe',
    category: 'Mechanism',
    simpleWords: {
      en: 'Stem cells receive chemical signals from tissues, homing in to damaged areas to self-divide and transform into replacement cells.',
      hi: 'स्टेम कोशिकाएं ऊतकों से रासायनिक संकेत प्राप्त करती हैं और क्षतिग्रस्त क्षेत्रों में जाकर विभाजित होती हैं तथा नई कोशिकाओं में बदल जाती हैं।',
      mr: 'स्टेम पेशी उतींमधून रासायनिक संकेत मिळवतात, आणि खराब झालेल्या भागात जाऊन विभाजित होतात व नवीन पेशींमध्ये रूपांतरित होतात.'
    },
    keyPoints: [
      'Homing: Cells migrate naturally to injured or diseased marrow cavities.',
      'Differentiation: They transform into RBCs, WBCs, platelets, or structural tissue.',
      'Self-Renewal: They maintain a continuous reserve pool of unspecialized cells.',
      'Paracrine Signaling: They release healing growth factors to assist local repair.'
    ]
  },
  {
    id: 'types-of-stem-cells',
    num: '03',
    badgeBg: '#dcfce7',
    badgeColor: '#16a34a',
    cardTitle: 'Types of Stem Cells',
    cardDesc: 'Explore different types of stem cells and where they come from.',
    SvgComp: StemCellTypesSvg,
    titleKey: 'videoEp2Title',
    fallbackTitle: 'Types of Stem Cells',
    icon: Layers,
    color: '#1d72b8',
    bgColor: '#edf5ff',
    borderColor: '#c8e0fc',
    category: 'Biology',
    simpleWords: {
      en: 'Main types include Hematopoietic Stem Cells (HSCs) which make blood, and Mesenchymal Stem Cells (MSCs) which form bone and cartilage.',
      hi: 'मुख्य प्रकारों में हेमटोपोइएटिक स्टेम कोशिकाएं (HSCs) शामिल हैं जो रक्त बनाती हैं, और मेसेनकाइमल स्टेम कोशिकाएं (MSCs) जो हड्डी और उपास्थि बनाती हैं।',
      mr: 'मुख्य प्रकारांमध्ये हेमॅटोपोएटिक स्टेम पेशी (HSCs) समाविष्ट आहेत ज्या रक्त तयार करतात, आणि मेसेन्कायमल स्टेम पेशी (MSCs) ज्या हाडे आणि कूर्चा तयार करतात।'
    },
    keyPoints: [
      'Hematopoietic Stem Cells (HSCs): Give rise to red blood cells, white blood cells, and platelets.',
      'Mesenchymal Stem Cells (MSCs): Form structural tissues like cartilage, bone, and connective tissue.',
      'Umbilical Cord Blood Stem Cells: Rich in young, highly potent hematopoietic progenitors.',
      'Induced Pluripotent Stem Cells (iPSCs): Reprogrammed adult cells used in drug research.'
    ]
  },
  {
    id: 'how-are-they-used',
    num: '04',
    badgeBg: '#dcfce7',
    badgeColor: '#16a34a',
    cardTitle: 'Uses & Benefits',
    cardDesc: 'Learn how stem cells are used in various medical conditions.',
    SvgComp: HumanOrgansSvg,
    titleKey: 'whereUsed',
    fallbackTitle: 'How are they used?',
    icon: Activity,
    color: '#0e7971',
    bgColor: '#eaf7f4',
    borderColor: '#bfe5dd',
    category: 'Therapy',
    simpleWords: {
      en: 'In bone marrow transplantation, healthy stem cells are infused into the bloodstream to rebuild a healthy immune system after chemotherapy.',
      hi: 'अस्थि मज्जा प्रत्यारोपण में, कीमोथेरेपी के बाद एक स्वस्थ प्रतिरक्षा प्रणाली के पुनर्निर्माण के लिए स्वस्थ स्टेम कोशिकाओं को रक्तप्रवाह में डाला जाता है।',
      mr: 'बोन मॅरो ट्रान्सप्लांटमध्ये, केमोथेरपीनंतर निरोगी रोगप्रतिकारक शक्ती पुन्हा तयार करण्यासाठी निरोगी स्टेम पेशी रक्तप्रवाहात सोडल्या जातात।'
    },
    keyPoints: [
      'Curative therapy for Acute Myeloid Leukemia (AML) and Lymphoma.',
      'Life-saving treatment for Severe Aplastic Anemia (SAA).',
      'Definitive cure for Thalassemia Major and Sickle Cell Disease.',
      'Administered through a simple venous infusion similar to a blood transfusion.'
    ]
  },
  {
    id: 'benefits-and-risks',
    num: '05',
    badgeBg: '#dcfce7',
    badgeColor: '#16a34a',
    cardTitle: 'Safety & Risks',
    cardDesc: 'Understand the safety, limitations and possible risks of stem cell therapies.',
    SvgComp: SafetyShieldSvg,
    titleKey: 'tabRisks',
    fallbackTitle: 'Benefits & Risks',
    icon: ShieldCheck,
    color: '#15803d',
    bgColor: '#edfcf2',
    borderColor: '#bbf7d0',
    category: 'Safety',
    simpleWords: {
      en: 'Stem cell therapy can cure life-threatening diseases, but requires careful matching to prevent Graft-versus-Host Disease (GvHD) and infections.',
      hi: 'स्टेम सेल थेरेपी जानलेवा बीमारियों को ठीक कर सकती है, लेकिन ग्राफ्ट-बनाम-होस्ट रोग (GvHD) और संक्रमण को रोकने के लिए सावधानीपूर्वक मिलान की आवश्यकता होती है।',
      mr: 'स्टेम सेल थेरपी जीवघेण्या आजारांवर उपचार करू शकते, परंतु ग्राफ्ट-विरुद्ध-होस्ट रोग (GvHD) आणि संसर्ग टाळण्यासाठी काळजीपूर्वक जुळणी आवश्यक आहे।'
    },
    keyPoints: [
      'Benefit: Can permanently replace cancerous or non-functioning bone marrow.',
      'Risk: Graft-versus-Host Disease (GvHD) if donor HLA alleles are not closely matched.',
      'Risk: Temporary low immunity during the engraftment phase (14-21 days).',
      'Protection: Performed in certified HEPA-filtered positive pressure isolation units.'
    ]
  },
  {
    id: 'myths-vs-facts',
    num: '06',
    badgeBg: '#dcfce7',
    badgeColor: '#16a34a',
    cardTitle: 'Myths vs Facts',
    cardDesc: 'Know the difference between scientific facts and common myths.',
    SvgComp: MythsVsFactsSvg,
    titleKey: 'mythsFacts',
    fallbackTitle: 'Myths vs Facts',
    icon: Lightbulb,
    color: '#d97706',
    bgColor: '#fff7ed',
    borderColor: '#fde0bc',
    category: 'Awareness',
    simpleWords: {
      en: 'Myth: Stem cell donation requires painful surgery on the spine. Fact: 90% of donations are done through the arm via painless blood filtration (apheresis).',
      hi: 'भ्रम: स्टेम सेल दान के लिए रीढ़ की हड्डी पर दर्दनाक सर्जरी की आवश्यकता होती है। तथ्य: 90% दान बांह के माध्यम से दर्द रहित रक्त निस्पंदन (एफेरेसिस) द्वारा किया जाता है।',
      mr: 'समज: स्टेम सेल दानासाठी मणक्यावर वेदनादायक शस्त्रक्रिया करावी लागते. वस्तुस्थिती: ९०% दाने हाताद्वारे वेदनारहित रक्त गाळणी (एफेरेसिस) द्वारे केली जातात.'
    },
    keyPoints: [
      'Myth: Stem cells can cure autism, anti-aging, or diabetes. Fact: Only blood disorders have regulatory approval.',
      'Myth: Donation weakens the donor permanently. Fact: Donors regenerate all cells within 2-3 weeks.',
      'Fact: Only hospitals accredited by FACT-JACIE or NABH have verified clean rooms.',
      'Fact: Commercial clinics guaranteeing "100% cure" violate medical ethics.'
    ]
  },
  {
    id: 'watch-and-listen',
    titleKey: 'videoHubTitle',
    fallbackTitle: 'Watch & Listen',
    icon: Play,
    color: '#2563eb',
    bgColor: '#eff6ff',
    borderColor: '#dbeafe',
    category: 'Media',
    isVideoHub: true
  },
  {
    id: 'play-and-learn',
    titleKey: 'navLearnPlay',
    fallbackTitle: 'Learn & Play (Interactive Lab)',
    icon: Gamepad2,
    color: '#0891b2',
    bgColor: '#ecfeff',
    borderColor: '#cffafe',
    category: 'Interactive',
    isGameHub: true
  },
  {
    id: 'quick-quiz',
    titleKey: 'awarenessGames',
    fallbackTitle: 'Quick Safety Quiz',
    icon: FileCheck,
    color: '#7e22ce',
    bgColor: '#faf5ff',
    borderColor: '#f3e8ff',
    category: 'Quiz',
    isQuizHub: true
  }
];

const VIDEO_PLAYLIST = [
  {
    id: 'v1',
    slug: 'ep1',
    titleKey: 'videoEp1Title',
    descKey: 'videoEp1Desc',
    narrationKey: 'videoEp1Narration',
    fallbackTitle: 'What are Stem Cells?',
    fallbackDesc: 'Visual introduction to human stem cells, their self-renewal, and specialization.',
    duration: '2:15 min',
    topics: ['Cell Biology', 'Basics', 'Regeneration']
  },
  {
    id: 'v2',
    slug: 'ep2',
    titleKey: 'videoEp2Title',
    descKey: 'videoEp2Desc',
    narrationKey: 'videoEp2Narration',
    fallbackTitle: 'Types of Stem Cells',
    fallbackDesc: 'Explains Hematopoietic (HSC), Mesenchymal (MSC), and Cord Blood stem cells and their distinct medical roles.',
    duration: '2:45 min',
    topics: ['HSCs', 'MSCs', 'Cord Blood']
  },
  {
    id: 'v3',
    slug: 'ep3',
    titleKey: 'videoEp3Title',
    descKey: 'videoEp3Desc',
    narrationKey: 'videoEp3Narration',
    fallbackTitle: 'How Stem-Cell Therapy Works',
    fallbackDesc: 'Step-by-step animation of conditioning chemotherapy, donor cell infusion, and the 21-day marrow engraftment process.',
    duration: '3:10 min',
    topics: ['Transplant', 'Conditioning', 'Engraftment']
  },
  {
    id: 'v4',
    slug: 'ep4',
    titleKey: 'videoEp4Title',
    descKey: 'videoEp4Desc',
    narrationKey: 'videoEp4Narration',
    fallbackTitle: 'Cord Blood Collection & Biobanking',
    fallbackDesc: 'How newborn umbilical cord blood is safely collected at birth with zero pain and preserved at -196°C in liquid nitrogen vapor.',
    duration: '2:30 min',
    topics: ['Cord Blood', 'Cryo Vaults', '-196°C']
  },
  {
    id: 'v5',
    slug: 'ep5',
    titleKey: 'videoEp5Title',
    descKey: 'videoEp5Desc',
    narrationKey: 'videoEp5Narration',
    fallbackTitle: 'Risks & Avoiding Unapproved Treatments',
    fallbackDesc: 'Critical medical warnings from oncologists on identifying illegal clinics and false "miracle cure" advertisements.',
    duration: '2:48 min',
    topics: ['Safety', 'Regulations', 'Scam Warnings']
  }
];

const Learn = () => {
  const { langCode, t, changeLanguage } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const sectionParam = searchParams.get('section');
  const topicParam = searchParams.get('topic');

  const [activeTopic, setActiveTopic] = useState(() => {
    if (topicParam) {
      return TOPICS.find((t) => t.id === topicParam) || TOPICS[0];
    }
    return null;
  });

  // Learning Progress State (defaults to 2 completed to reflect user screenshot, persisted locally)
  const [completedTopics, setCompletedTopics] = useState(() => {
    try {
      const saved = localStorage.getItem('koshika_completed_topics');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['what-are-stem-cells', 'how-do-stem-cells-work'];
  });

  const toggleTopicCompletion = (topicId) => {
    setCompletedTopics((prev) => {
      const next = prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId];
      try {
        localStorage.setItem('koshika_completed_topics', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Audio language for player narration
  const [selectedLang, setSelectedLang] = useState(langCode || 'en');
  const [selectedVideo, setSelectedVideo] = useState(VIDEO_PLAYLIST[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Keep selectedLang synced with global langCode
  useEffect(() => {
    if (langCode === 'en' || langCode === 'hi' || langCode === 'mr') {
      setSelectedLang(langCode);
    }
  }, [langCode]);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const QUIZ_QUESTIONS = [
    {
      q: 'Which stem cell type produces red blood cells, white blood cells, and platelets?',
      options: ['Hematopoietic Stem Cells (HSCs)', 'Skin Cells', 'Adipose Fat Cells'],
      correct: 0,
      expl: 'HSCs located in the bone marrow and cord blood are the master progenitors of the human blood system.'
    },
    {
      q: 'Is donating stem cells via peripheral blood (PBSC) painful surgery?',
      options: ['Yes, requires drilling into spine', 'No, 90% done via painless blood filtration (apheresis)', 'Yes, requires organ removal'],
      correct: 1,
      expl: '90% of stem cell donations are completed through an outpatient blood filtering process with no surgery or spine contact.'
    },
    {
      q: 'Are cosmetic stem cell injections for anti-aging approved by ICMR/CDSCO?',
      options: ['Yes, fully approved', 'No, they are unproven and warn against scams', 'Approved only in beauty spas'],
      correct: 1,
      expl: 'ICMR and international medical councils strictly warn against commercial spas offering unproven cosmetic stem cell injections.'
    }
  ];

  useEffect(() => {
    if (sectionParam === 'videos') {
      setActiveTopic(TOPICS.find((t) => t.id === 'watch-and-listen'));
    } else if (sectionParam === 'quiz') {
      setActiveTopic(TOPICS.find((t) => t.id === 'quick-quiz'));
    } else if (topicParam) {
      const found = TOPICS.find((t) => t.id === topicParam);
      if (found) setActiveTopic(found);
    }
  }, [sectionParam, topicParam]);

  // Cleanup speech synthesis on unmount or view change
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSelectTopic = (topic) => {
    if (topic.isGameHub) {
      navigate('/games');
      return;
    }
    setActiveTopic(topic);
    if (topic.isVideoHub) {
      setSearchParams({ section: 'videos' });
    } else if (topic.isQuizHub) {
      setSearchParams({ section: 'quiz' });
    } else {
      setSearchParams({ topic: topic.id });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setActiveTopic(null);
    setSearchParams({});
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Text to speech function for article explanations
  const handleReadAloud = (text, targetLang) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    if (isSpeaking && !text) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const lang = targetLang || selectedLang;
    if (lang === 'hi') utterance.lang = 'hi-IN';
    else if (lang === 'mr') utterance.lang = 'mr-IN';
    else utterance.lang = 'en-US';

    utterance.rate = 0.95;
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const filteredTopics = TOPICS.filter((tp) => {
    const title = t[tp.titleKey] || tp.fallbackTitle || '';
    const matchSearch = !searchQuery ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tp.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchSearch) return false;

    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'BASICS') return tp.category === 'Basics' || tp.category === 'Mechanism';
    if (selectedCategory === 'BIOLOGY') return tp.category === 'Biology';
    if (selectedCategory === 'THERAPY') return tp.category === 'Therapy';
    if (selectedCategory === 'SAFETY') return tp.category === 'Safety' || tp.category === 'Awareness';
    if (selectedCategory === 'INTERACTIVE') return tp.isVideoHub || tp.isGameHub || tp.isQuizHub;
    return true;
  });

  // -------------------------------------------------------------
  // VIEW 1: WATCH & LISTEN (Passive Video Explainer Hub)
  // -------------------------------------------------------------
  if (activeTopic && activeTopic.isVideoHub) {
    return (
      <div className="koshika-animate-fadein pb-5">
        {/* Header */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <button
            type="button"
            className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 text-muted hover-translate-y"
            onClick={handleBackToList}
            title="Back to Topics"
          >
            <ArrowLeft size={16} />
            <span>Back to Topics</span>
          </button>
          <div>
            <h2 className="fw-bold text-dark mb-0 fs-4">{t.videoHubTitle || 'Watch & Listen'}</h2>
            <span className="small text-muted">{t.videoHubSubtitle || 'Animated educational videos in simple language'}</span>
          </div>
        </div>

        {/* Real Multilingual Watch & Listen Explainer Player */}
        <WatchAndListenPlayer
          selectedVideo={selectedVideo}
          playlist={VIDEO_PLAYLIST}
          onSelectVideo={setSelectedVideo}
          lang={selectedLang}
          onChangeLang={(newLang) => {
            setSelectedLang(newLang);
            changeLanguage(newLang);
          }}
          t={t}
        />

        {/* Safety Note */}
        <div className="koshika-disclaimer-box">
          <ShieldCheck size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <strong>{t.trustInfoTitle || 'Trusted Information'}:</strong> {t.medicalDisclaimer || 'For education only. KOSHIKA does not replace professional medical advice.'}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: QUICK QUIZ
  // -------------------------------------------------------------
  if (activeTopic && activeTopic.isQuizHub) {
    const q = QUIZ_QUESTIONS[quizIndex];
    return (
      <div className="koshika-animate-fadein pb-5" style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div className="d-flex align-items-center gap-3 mb-4">
          <button
            type="button"
            className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 text-muted hover-translate-y"
            onClick={handleBackToList}
            title="Back to Topics"
          >
            <ArrowLeft size={16} />
            <span>Back to Topics</span>
          </button>
          <div>
            <h2 className="fw-bold text-dark mb-0 fs-4">{t.awarenessGames || 'Stem Cell Awareness Quiz'}</h2>
            <span className="small text-muted">Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}</span>
          </div>
        </div>

        {!quizFinished ? (
          <div className="koshika-card p-4 bg-white border shadow-sm">
            <h5 className="fw-bold text-dark mb-3">{q.q}</h5>

            <div className="d-flex flex-column gap-2 mb-4">
              {q.options.map((opt, optIdx) => {
                const isSelected = userAnswer === optIdx;
                const isCorrect = optIdx === q.correct;
                let optStyle = { backgroundColor: 'var(--k-surface)', borderColor: 'var(--k-border)', color: 'var(--k-text-primary)' };

                if (userAnswer !== null) {
                  if (isCorrect) optStyle = { backgroundColor: 'var(--k-success-bg, #edfcf2)', borderColor: 'var(--k-success, #15803d)', color: 'var(--k-success, #15803d)' };
                  else if (isSelected) optStyle = { backgroundColor: 'var(--k-danger-bg, #fef2f2)', borderColor: 'var(--k-danger, #ef4444)', color: 'var(--k-danger, #b91c1c)' };
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    className="btn text-start p-3 rounded-4 border fw-semibold d-flex align-items-center justify-content-between"
                    style={optStyle}
                    onClick={() => {
                      if (userAnswer !== null) return;
                      setUserAnswer(optIdx);
                      if (optIdx === q.correct) setQuizScore((prev) => prev + 1);
                    }}
                  >
                    <span>{opt}</span>
                    {userAnswer !== null && isCorrect && <CheckCircle2 size={18} className="text-success" />}
                  </button>
                );
              })}
            </div>

            {userAnswer !== null && (
              <div className="p-3 rounded-4 bg-light border mb-4">
                <span className="fw-bold d-block mb-1 small text-dark">Medical Explanation:</span>
                <span className="small text-muted">{q.expl}</span>
              </div>
            )}

            {userAnswer !== null && (
              <button
                type="button"
                className="btn-koshika-primary w-100"
                onClick={() => {
                  if (quizIndex + 1 < QUIZ_QUESTIONS.length) {
                    setQuizIndex((prev) => prev + 1);
                    setUserAnswer(null);
                  } else {
                    setQuizFinished(true);
                  }
                }}
              >
                <span>{quizIndex + 1 < QUIZ_QUESTIONS.length ? 'Next Question' : 'View Results'}</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        ) : (
          <div className="koshika-card p-5 bg-white border text-center shadow-sm">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white"
              style={{ width: '70px', height: '70px', backgroundColor: '#0d9488' }}
            >
              <CheckCircle2 size={36} />
            </div>
            <h3 className="fw-bold text-dark mb-1">Quiz Completed!</h3>
            <p className="text-muted mb-3">You scored {quizScore} out of {QUIZ_QUESTIONS.length}</p>

            <button
              type="button"
              className="btn-koshika-primary rounded-pill px-4"
              onClick={() => {
                setQuizIndex(0);
                setQuizScore(0);
                setUserAnswer(null);
                setQuizFinished(false);
              }}
            >
              <RotateCcw size={16} />
              <span>Retake Quiz</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 3: DETAILED LEARN CONTENT (Topic Explanation)
  // -------------------------------------------------------------
  if (activeTopic && !activeTopic.isVideoHub && !activeTopic.isQuizHub) {
    const currentTopicIdx = TOPICS.findIndex((t) => t.id === activeTopic.id);
    const nextTopic = TOPICS[currentTopicIdx + 1] || TOPICS[0];
    const topicHeading = t[activeTopic.titleKey] || activeTopic.fallbackTitle;

    return (
      <div className="koshika-animate-fadein pb-5" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 16px' }}>
        {/* Header with Back Arrow, Audio Player, and Completion Status */}
        <div className="d-flex align-items-center justify-content-between mb-3.5 flex-wrap gap-2.5">
          <div className="d-flex align-items-center gap-2.5">
            <button
              type="button"
              className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 text-muted hover-translate-y shadow-xs"
              onClick={handleBackToList}
              title="Back to Topics"
            >
              <ArrowLeft size={16} />
              <span className="small fw-semibold">Topics</span>
            </button>
            <h2 className="fw-bold text-dark mb-0 fs-5">{topicHeading}</h2>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {/* Audio Voice Narration Button */}
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 transition-all shadow-xs ${
                isSpeaking ? 'btn-warning text-dark fw-bold' : 'btn-white border text-dark'
              }`}
              style={{ background: isSpeaking ? '#f59e0b' : '#ffffff' }}
              onClick={() => handleReadAloud(activeTopic.simpleWords[selectedLang] || activeTopic.simpleWords.en, selectedLang)}
              title={isSpeaking ? 'Stop audio narration' : 'Listen to audio narration'}
            >
              {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} className="text-warning" />}
              <span className="small fw-semibold">{isSpeaking ? 'Listening...' : 'Listen Audio'}</span>
            </button>

            {/* Mark Completed Button */}
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 transition-all shadow-xs ${
                completedTopics.includes(activeTopic.id)
                  ? 'btn-success text-white'
                  : 'btn-light border text-secondary'
              }`}
              onClick={() => toggleTopicCompletion(activeTopic.id)}
              title="Toggle completion status"
            >
              <CheckCircle2 size={15} />
              <span className="small fw-semibold">
                {completedTopics.includes(activeTopic.id) ? 'Completed' : 'Mark Completed'}
              </span>
            </button>
          </div>
        </div>

        {/* Dedicated Interactive Visual Guide for Each Topic (Diagrams & Charts) */}
        <div className="mb-4">
          {activeTopic.id === 'what-are-stem-cells' && <WhatAreStemCellsVisual />}
          {activeTopic.id === 'how-do-stem-cells-work' && <HowDoTheyWorkVisual />}
          {activeTopic.id === 'types-of-stem-cells' && <TypesOfStemCellsVisual />}
          {activeTopic.id === 'how-are-they-used' && <UsesAndBenefitsVisual />}
          {activeTopic.id === 'benefits-and-risks' && <SafetyAndRisksVisual />}
          {activeTopic.id === 'myths-vs-facts' && <MythsVsFactsVisual />}
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="d-flex flex-column flex-sm-row align-items-center gap-2.5 pt-2">
          <button
            type="button"
            className="btn btn-light border rounded-pill px-4 py-3 text-muted w-100 w-sm-auto d-flex align-items-center justify-content-center gap-2 hover-translate-y"
            onClick={handleBackToList}
          >
            <ArrowLeft size={16} />
            <span>Back to All Topics</span>
          </button>

          <button
            type="button"
            className="btn-koshika-primary flex-grow-1 w-100 py-3 shadow-xs d-flex align-items-center justify-content-center gap-2"
            onClick={() => handleSelectTopic(nextTopic)}
          >
            <span>Next: {t[nextTopic.titleKey] || nextTopic.fallbackTitle}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // DEFAULT VIEW: TOPIC LIST (Clean, Visual, Responsive)
  // -------------------------------------------------------------
  const coreTopics = TOPICS.slice(0, 6);

  return (
    <div className="koshika-animate-fadein pb-5 mx-auto" style={{ maxWidth: '1240px', padding: '0 8px' }}>
      <style>{`
        .stem-topic-card {
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1.5px solid var(--k-border);
          box-shadow: var(--k-shadow-card);
          background: var(--k-surface);
          border-radius: 22px;
        }
        .stem-topic-card:hover {
          transform: translateY(-4px);
          border-color: rgba(13, 148, 136, 0.35) !important;
          box-shadow: 0 14px 30px rgba(13, 148, 136, 0.12) !important;
        }
        .stem-card-btn {
          transition: all 0.22s ease;
          background-color: #0d9488;
        }
        .stem-topic-card:hover .stem-card-btn {
          background-color: #0f766e !important;
          transform: scale(1.08);
        }
      `}</style>

      {/* Top Header Section - Cohesive Fit with Zero Extra Empty Space */}
      <div 
        className="rounded-4 p-3.5 p-md-4 mb-4 position-relative overflow-hidden koshika-hero-banner"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          boxShadow: '0 10px 30px -5px rgba(6, 78, 59, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#ffffff'
        }}
      >
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4">
          {/* Left Column: Title, Subtitle, Progress Card */}
          <div className="flex-grow-1" style={{ maxWidth: '640px', width: '100%' }}>
            <div className="mb-2">
              <Link
                to="/"
                className="btn btn-sm rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 hover-translate-y shadow-xs"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  color: '#ffffff',
                  fontSize: '0.85rem'
                }}
                title="Back to Home"
              >
                <ArrowLeft size={15} color="#ffffff" />
                <span className="text-white">Back to Home</span>
              </Link>
            </div>

            <h1 className="fw-bold text-white mb-1.5" style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', letterSpacing: '-0.025em', lineHeight: 1.18 }}>
              Learn About <span style={{ color: '#a7f3d0' }}>Stem Cells</span>
            </h1>
            <p className="text-white mb-3" style={{ fontSize: '0.96rem', lineHeight: 1.5, maxWidth: '580px', opacity: 0.95 }}>
              Simple, reliable and easy-to-understand information to help you make informed decisions.
            </p>

            {/* Learning Progress Card - Clean, Balanced, Full-width of left column */}
            <div 
              className="card border-0 rounded-4 shadow-sm p-3 position-relative top-head-subcard"
              style={{
                backgroundColor: 'var(--k-surface)',
                border: '1px solid var(--k-border)',
                boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
                width: '100%',
                maxWidth: '560px'
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fw-bold" style={{ fontSize: '0.92rem', color: 'var(--k-primary)' }}>Your Learning Progress</span>
                <ChevronRight size={17} style={{ color: 'var(--k-primary)' }} />
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="progress flex-grow-1" style={{ height: '8px', backgroundColor: 'var(--k-surface-tint, #e2e8f0)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div 
                    className="progress-bar"
                    role="progressbar"
                    style={{ 
                      width: `${Math.round((completedTopics.length / 6) * 100)}%`, 
                      backgroundColor: '#0d9488',
                      borderRadius: '999px',
                      transition: 'width 0.4s ease'
                    }}
                    aria-valuenow={completedTopics.length} 
                    aria-valuemin="0" 
                    aria-valuemax="6"
                  />
                </div>
                <span className="small fw-bold flex-shrink-0" style={{ fontSize: '0.82rem', whiteSpace: 'nowrap', color: 'var(--k-text-secondary)' }}>
                  {completedTopics.length} / 6 topics completed
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Artwork - Sized proportionally so it sits adjacent without dead space */}
          <div className="flex-shrink-0 text-center">
            <img 
              src="/images/hero_stem_cell.jpg" 
              alt="Stem Cell Microscopic View" 
              className="img-fluid rounded-4 shadow-sm hover-lift transition-all"
              style={{
                maxHeight: '250px',
                maxWidth: '360px',
                width: '100%',
                objectFit: 'cover',
                border: '1px solid rgba(13, 148, 136, 0.15)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Explore Topics Header */}
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1" style={{ fontSize: '1.65rem', letterSpacing: '-0.02em' }}>
          Explore Topics
        </h2>
        <p className="text-secondary mb-0" style={{ fontSize: '0.95rem' }}>
          Learn step by step at your own pace. Each topic is short, visual and easy to understand.
        </p>
      </div>

      {/* 6 Visual Cards Grid */}
      <div className="row g-4 mb-4">
        {coreTopics.map((topic) => {
          const SvgIcon = topic.SvgComp;
          return (
            <div key={topic.id} className="col-12 col-md-6 col-lg-4">
              <div 
                className="stem-topic-card p-4 h-100 d-flex flex-column justify-content-between cursor-pointer"
                onClick={() => handleSelectTopic(topic)}
              >
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div className="flex-grow-1 pe-2">
                    <span 
                      className="badge rounded-pill fw-bold mb-2.5 px-2.5 py-1 d-inline-block"
                      style={{
                        backgroundColor: topic.badgeBg,
                        color: topic.badgeColor,
                        fontSize: '0.82rem'
                      }}
                    >
                      {topic.num}
                    </span>
                    <h5 className="fw-bold text-dark mb-2" style={{ fontSize: '1.18rem', letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                      {topic.cardTitle}
                    </h5>
                    <p className="text-secondary mb-0" style={{ fontSize: '0.86rem', lineHeight: 1.48 }}>
                      {topic.cardDesc}
                    </p>
                  </div>

                  <div className="flex-shrink-0 d-flex align-items-center justify-content-center">
                    {SvgIcon && <SvgIcon />}
                  </div>
                </div>

                <div className="d-flex justify-content-end align-items-center mt-3 pt-1">
                  <div 
                    className="stem-card-btn rounded-circle d-flex align-items-center justify-content-center text-white shadow-xs"
                    style={{ width: '36px', height: '36px' }}
                  >
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Learning Quick Access (Subtle Bar) */}
      <div className="d-flex align-items-center justify-content-between p-3 rounded-4 bg-white border mb-4 flex-wrap gap-2 shadow-xs">
        <div className="d-flex align-items-center gap-2">
          <Sparkles size={18} style={{ color: '#0d9488' }} />
          <span className="small fw-semibold text-dark">Additional Educational Resources:</span>
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 text-muted hover-translate-y"
            onClick={() => handleSelectTopic(TOPICS.find(t => t.id === 'watch-and-listen'))}
          >
            <Play size={14} className="text-danger" />
            <span>Watch 5 Animated Videos</span>
          </button>
          <button
            type="button"
            className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 text-muted hover-translate-y"
            onClick={() => handleSelectTopic(TOPICS.find(t => t.id === 'quick-quiz'))}
          >
            <FileCheck size={14} style={{ color: '#7c3aed' }} />
            <span>Quick Safety Quiz</span>
          </button>
        </div>
      </div>

      {/* Bottom Interactive Banner */}
      <div 
        className="card border-0 rounded-4 shadow-sm p-4 mt-2 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #e6f5f2 0%, #d8ece8 100%)',
          border: '1px solid rgba(13, 148, 136, 0.2)'
        }}
      >
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
          <div className="d-flex flex-column flex-sm-row align-items-center gap-3">
            <InteractiveBookSvg />
            <div>
              <h4 className="fw-bold text-dark mb-1" style={{ letterSpacing: '-0.01em', fontSize: '1.25rem' }}>
                Learn in a More Interactive Way
              </h4>
              <p className="text-secondary mb-0" style={{ fontSize: '0.9rem', maxWidth: '480px' }}>
                Try our short games and activities to strengthen your understanding.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn rounded-pill px-4 py-2.5 text-white fw-bold d-inline-flex align-items-center gap-2 shadow-xs hover-translate-y flex-shrink-0"
            style={{ backgroundColor: '#0d9488' }}
            onClick={() => navigate('/games')}
          >
            <span>Go to Learn & Play</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Learn;
