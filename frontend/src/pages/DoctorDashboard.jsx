import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Video,
  Users,
  FileText,
  Building2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Calendar,
  Clock,
  Activity,
  HeartPulse,
  ChevronRight,
  Bot
} from 'lucide-react';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();

  // Dynamic doctor name
  const doctorName = user?.name
    ? (user.name.startsWith('Dr.') ? user.name : `Dr. ${user.name}`)
    : 'Dr. Mitesh Sawant';

  // Greeting by time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // 3 Primary Clinical Care Cards with fitted imagery
  const clinicalPillars = [
    {
      step: '01',
      pillar: 'CARE',
      title: 'Patient Consultations',
      desc: 'Conduct encrypted 1-on-1 telehealth video rounds or manage hospital OPD walk-in passes with instant clinical summaries.',
      image: '/images/home/doc_telehealth_rounds.jpg',
      badge: 'Live Telehealth & OPD',
      badgeColor: '#0d9488',
      primaryLink: '/doctor/consultations',
      primaryText: 'Launch Consultations',
      secondaryLink: '/doctor/appointments',
      secondaryText: 'Appointments'
    },
    {
      step: '02',
      pillar: 'DIAGNOSTICS',
      title: 'Medical Reports & OCR',
      desc: 'Verify automated CD34+ cell counts, flow cytometry assays, and high-resolution HLA typing reports with AI safety cross-checks.',
      image: '/images/home/doc_diagnostics_hla.jpg',
      badge: 'Smart OCR & HLA',
      badgeColor: '#2563eb',
      primaryLink: '/doctor/reports',
      primaryText: 'Review Reports',
      secondaryLink: '/doctor/patients',
      secondaryText: 'Patient Cohort'
    },
    {
      step: '03',
      pillar: 'BIOBANKS',
      title: 'Donor & Biobank Search',
      desc: 'Search national stem cell registries, verify allogeneic donor matches, and assess cryopreservation inventory in real time.',
      image: '/images/home/doc_cryovault_registry.jpg',
      badge: 'Cord Blood & Donors',
      badgeColor: '#7c3aed',
      primaryLink: '/doctor/banks',
      primaryText: 'Explore Biobanks',
      secondaryLink: '/ml-match',
      secondaryText: 'Match Calculator'
    }
  ];

  // Quick Priority Actions (Minimal, direct, high-value)
  const priorityActions = [
    {
      id: 'next-visit',
      title: 'Telehealth: Aarav Sharma',
      desc: '10:30 AM • AML BMT Evaluation (PT-9042)',
      icon: Video,
      iconColor: '#2563eb',
      iconBg: '#eff6ff',
      link: '/doctor/consultations?patient=PT-9042',
      actionText: 'Join Call',
      badge: '10:30 AM'
    },
    {
      id: 'lab-signoff',
      title: 'CD34+ Assay Verification',
      desc: 'Priyanka Sen • 5.82 × 10⁶/kg yield',
      icon: FileText,
      iconColor: '#d97706',
      iconBg: '#fffbeb',
      link: '/doctor/reports',
      actionText: 'Sign Off',
      badge: 'Sign-off Due'
    },
    {
      id: 'follow-up',
      title: 'Post-BMT Engraftment',
      desc: 'Vikramaditya Iyer • Day +30 check',
      icon: HeartPulse,
      iconColor: '#0d9488',
      iconBg: '#f0fdfa',
      link: '/doctor/patients',
      actionText: 'Open Chart',
      badge: 'Follow-up'
    }
  ];

  return (
    <div className="koshika-animate-fadein pb-5">
      {/* ---------------------------------------------------------------------
          1. HERO BANNER: WARM GREETING + STATUS + FITTED CLINICAL VIDEO CARD
      ---------------------------------------------------------------------- */}
      <div
        className="card border-0 rounded-4 mb-4 p-4 p-md-4 koshika-hero-banner overflow-hidden position-relative"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          boxShadow: '0 10px 30px -5px rgba(6, 78, 59, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#ffffff'
        }}
      >
        <div className="row g-4 align-items-center">
          {/* Left Column: Greeting, Role & Primary CTAs */}
          <div className="col-12 col-lg-7">
            <div className="d-flex align-items-center gap-2 mb-2.5 flex-wrap">
              <span
                className="badge rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)', fontSize: '0.76rem' }}
              >
                <span
                  className="rounded-circle d-inline-block bg-success"
                  style={{ width: '7px', height: '7px' }}
                />
                <span>Attending Clinician &bull; On Duty</span>
              </span>

              <span
                className="badge rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)', fontSize: '0.76rem' }}
              >
                <ShieldCheck size={13} />
                <span>ICMR &bull; EBMT Triage Active</span>
              </span>
            </div>

            <h1
              className="fw-extrabold text-white mb-2"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.15rem)', letterSpacing: '-0.025em', lineHeight: 1.25 }}
            >
              {getGreeting()}, {doctorName} 🩺
            </h1>

            <p
              className="text-white text-opacity-90 mb-3.5"
              style={{ fontSize: '0.94rem', lineHeight: 1.5, maxWidth: '520px' }}
            >
              Hematology &amp; BMT Clinical Workspace. Review scheduled consultations, sign off diagnostic reports, and verify stem cell donor matches.
            </p>

            <div className="d-flex align-items-center gap-2.5 flex-wrap">
              <Link
                to="/doctor/consultations"
                className="btn rounded-pill px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2 shadow-sm transition-all hover-translate-y koshika-hero-action-btn"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#064e3b',
                  border: 'none',
                  fontSize: '0.88rem'
                }}
              >
                <Video size={16} color="currentColor" />
                <span>Start Consultation</span>
                <ArrowRight size={15} color="currentColor" />
              </Link>

              <Link
                to="/doctor/patients"
                className="btn rounded-pill px-3.5 py-2.5 fw-semibold d-inline-flex align-items-center gap-1.5 hover-translate-y"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  fontSize: '0.85rem'
                }}
              >
                <Users size={15} color="#ffffff" />
                <span className="text-white">Patient Cohort</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Properly Fitted Clinical Visual Card */}
          <div className="col-12 col-lg-5">
            <div
              className="card border-0 rounded-4 overflow-hidden bg-white shadow-xs"
              style={{ border: '1px solid #e2e8f0' }}
            >
              <div className="position-relative overflow-hidden" style={{ height: '160px' }}>
                <img
                  src="/images/home/doc_telehealth_rounds.jpg"
                  alt="Clinical Cellular Therapy Suite"
                  className="w-100 h-100 object-fit-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />

                {/* Dark Gradient Overlay */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-between p-3"
                  style={{ background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.7) 100%)' }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span
                      className="badge rounded-pill px-2.5 py-1 text-white fw-semibold"
                      style={{ backgroundColor: 'rgba(13, 148, 136, 0.85)', backdropFilter: 'blur(4px)', fontSize: '0.7rem' }}
                    >
                      Virtual Suite 4B
                    </span>
                    <span
                      className="badge rounded-pill px-2.5 py-1 text-white fw-normal"
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)', fontSize: '0.68rem' }}
                    >
                      WebRTC Encrypted
                    </span>
                  </div>

                  <div className="d-flex align-items-center justify-content-between text-white">
                    <div>
                      <div className="fw-bold small" style={{ fontSize: '0.85rem' }}>Next: Aarav Sharma</div>
                      <div className="small opacity-75" style={{ fontSize: '0.72rem' }}>10:30 AM &bull; Telehealth Review</div>
                    </div>
                    <Link
                      to="/doctor/consultations?patient=PT-9042"
                      className="btn btn-sm btn-warning rounded-pill px-3 py-1 fw-bold d-inline-flex align-items-center gap-1 shadow-sm"
                      style={{
                        fontSize: '0.75rem',
                        backgroundColor: isDark ? 'rgba(234, 179, 8, 0.22)' : '#fef08a',
                        borderColor: isDark ? '#eab308' : '#fef08a',
                        color: isDark ? '#fde047' : '#1e293b'
                      }}
                    >
                      <span className={isDark ? 'text-warning' : 'text-dark'}>Join Room</span>
                      <ArrowRight size={13} className={isDark ? 'text-warning' : 'text-dark'} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Status Footer Strip */}
              <div className={`p-3 d-flex align-items-center justify-content-between ${isDark ? 'bg-surface' : 'bg-white'}`}>
                <div className="d-flex align-items-center gap-2">
                  <Activity size={16} style={{ color: '#0d9488' }} />
                  <span className={`small fw-semibold ${isDark ? 'text-white' : 'text-dark'}`} style={{ fontSize: '0.8rem' }}>
                    Mazumdar Shaw Cancer Centre &bull; BMT Unit
                  </span>
                </div>
                <span className="badge rounded-pill bg-light text-secondary border small px-2 py-0.5" style={{ fontSize: '0.68rem' }}>
                  OPD Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          CLINICAL TELEMETRY STRIP: IMMEDIATE DECISION-SUPPORT COUNTS
      ---------------------------------------------------------------------- */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Active BMT Cohort', count: '24', sub: '3 High Priority', link: '/doctor/patients', color: '#0d9488', bg: 'rgba(13, 148, 136, 0.08)' },
          { label: 'Diagnostic Sign-Offs', count: '3', sub: 'Awaiting Attending Sign', link: '/doctor/reports', color: '#e11d48', bg: 'rgba(225, 29, 72, 0.08)' },
          { label: "Today's Consultations", count: '4', sub: 'Next call at 10:30 AM', link: '/doctor/consultations', color: '#2563eb', bg: 'rgba(37, 99, 235, 0.08)' },
          { label: 'Donor Matches Found', count: '18', sub: '10/10 & 9/10 HLA Alleles', link: '/doctor/banks', color: '#d97706', bg: 'rgba(217, 119, 6, 0.08)' }
        ].map((item, idx) => (
          <div key={idx} className="col-6 col-lg-3">
            <Link
              to={item.link}
              className="card border-0 rounded-4 p-3 text-decoration-none shadow-xs transition-all hover-translate-y d-flex flex-column justify-content-between h-100"
              style={{
                backgroundColor: 'var(--k-surface)',
                border: '1px solid var(--k-border)',
                borderTop: `3px solid ${item.color}`
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="text-secondary small fw-semibold" style={{ fontSize: '0.78rem' }}>
                  {item.label}
                </span>
                <span
                  className="rounded-circle d-inline-block"
                  style={{ width: '6px', height: '6px', backgroundColor: item.color }}
                />
              </div>
              <div className="d-flex align-items-baseline gap-2">
                <span className="fw-extrabold text-dark" style={{ fontSize: '1.65rem', lineHeight: 1.1 }}>
                  {item.count}
                </span>
                <span className="text-secondary small text-truncate" style={{ fontSize: '0.72rem' }}>
                  {item.sub}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------------------
          2. CORE CLINICAL WORKFLOW PILLARS (3 CLEAR CARDS IN CONSISTENT FORMAT)
      ---------------------------------------------------------------------- */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3 px-1">
          <div>
            <h2 className="h5 fw-bold text-dark mb-0.5" style={{ fontSize: '1.12rem', letterSpacing: '-0.01em' }}>
              Clinical Focus Areas
            </h2>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.82rem' }}>
              Three guided pillars to manage your daily patient rounds and donor matches
            </p>
          </div>
        </div>

        <div className="row g-3.5">
          {clinicalPillars.map((card) => (
            <div key={card.step} className="col-12 col-md-4">
              <div
                className="card h-100 rounded-4 border-0 bg-white overflow-hidden transition-all shadow-xs"
                style={{
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                {/* Properly Fitted 16:9 Image Header */}
                <div className="position-relative" style={{ height: '210px', overflow: 'hidden' }}>
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-100 h-100 object-fit-cover"
                    style={{ objectPosition: 'center center', transition: 'transform 0.4s ease' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />

                  {/* Step Pill */}
                  <div
                    className="position-absolute top-0 start-0 m-2.5 badge rounded-pill px-2.5 py-1 fw-bold text-white shadow-xs"
                    style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(3px)', fontSize: '0.7rem' }}
                  >
                    {card.step} {card.pillar}
                  </div>

                  {/* Feature Tag */}
                  <div
                    className="position-absolute top-0 end-0 m-2.5 badge rounded-pill px-2.5 py-1 fw-semibold shadow-xs"
                    style={{
                      backgroundColor: 'var(--k-surface)',
                      color: card.badgeColor,
                      fontSize: '0.68rem',
                      border: `1px solid ${card.badgeColor}40`
                    }}
                  >
                    {card.badge}
                  </div>
                </div>

                {/* Card Body: Clean, Not Congested */}
                <div className="p-3.5 flex-grow-1 d-flex flex-column justify-content-between">
                  <div>
                    <h3 className="h6 fw-bold text-dark mb-1.5" style={{ fontSize: '1rem' }}>
                      {card.title}
                    </h3>
                    <p className="text-secondary small mb-3.5" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
                      {card.desc}
                    </p>
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-2 border-top" style={{ borderColor: '#f1f5f9' }}>
                    <Link
                      to={card.primaryLink}
                      className="btn btn-sm rounded-pill px-3 py-1.5 fw-semibold text-white d-inline-flex align-items-center gap-1.5 text-decoration-none shadow-xs hover-translate-y"
                      style={{ backgroundColor: card.badgeColor, fontSize: '0.8rem' }}
                    >
                      <span>{card.primaryText}</span>
                      <ArrowRight size={13} />
                    </Link>

                    <Link
                      to={card.secondaryLink}
                      className="btn btn-sm btn-link text-decoration-none text-muted small p-0 fw-semibold hover-text-dark"
                      style={{ fontSize: '0.78rem' }}
                    >
                      {card.secondaryText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          3. PRIORITY CLINICAL ACTIONS (3 CLEAN CARDS, NO EXCESSIVE STATS)
      ---------------------------------------------------------------------- */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3 px-1">
          <div>
            <h2 className="h5 fw-bold text-dark mb-0.5" style={{ fontSize: '1.12rem', letterSpacing: '-0.01em' }}>
              Priority Clinical Actions
            </h2>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.82rem' }}>
              Immediate tasks requiring attending clinician review
            </p>
          </div>
          <Link
            to="/doctor/patients"
            className="small fw-semibold text-decoration-none d-flex align-items-center gap-1"
            style={{ color: '#0d9488', fontSize: '0.82rem' }}
          >
            <span>View All Patients</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="row g-3">
          {priorityActions.map((action) => {
            const ActionIcon = action.icon;
            return (
              <div key={action.id} className="col-12 col-md-4">
                <div
                  className="card border-0 rounded-4 p-3.5 bg-white shadow-xs h-100 hover-lift transition-all"
                  style={{ border: '1px solid #e2e8f0' }}
                >
                  <div className="d-flex align-items-start justify-content-between mb-2.5">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: '42px',
                        height: '42px',
                        backgroundColor: action.iconBg,
                        color: action.iconColor
                      }}
                    >
                      <ActionIcon size={20} />
                    </div>
                    <span
                      className="badge rounded-pill px-2.5 py-1 small fw-semibold"
                      style={{
                        backgroundColor: action.iconBg,
                        color: action.iconColor,
                        fontSize: '0.7rem'
                      }}
                    >
                      {action.badge}
                    </span>
                  </div>

                  <h3 className="h6 fw-bold text-dark mb-1" style={{ fontSize: '0.92rem' }}>
                    {action.title}
                  </h3>
                  <p className="text-secondary small mb-3 flex-grow-1" style={{ fontSize: '0.78rem', lineHeight: 1.4 }}>
                    {action.desc}
                  </p>

                  <div className="pt-2 border-top" style={{ borderColor: '#f8fafc' }}>
                    <Link
                      to={action.link}
                      className="btn btn-sm w-100 rounded-pill py-1.5 fw-semibold d-inline-flex align-items-center justify-content-center gap-1.5 shadow-xs hover-translate-y"
                      style={{
                        backgroundColor: action.iconColor,
                        color: '#ffffff',
                        fontSize: '0.8rem',
                        border: 'none'
                      }}
                    >
                      <span>{action.actionText}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          4. SUBTLE KOSHIKA CLINICAL AI COPILOT CARD (CALM & TRUSTWORTHY)
      ---------------------------------------------------------------------- */}
      <div
        className="card border-0 rounded-4 p-3.5 shadow-xs position-relative overflow-hidden"
        style={{
          border: '1px solid var(--k-border)',
          backgroundColor: 'var(--k-surface-tint)'
        }}
      >
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 shadow-xs"
              style={{
                width: '42px',
                height: '42px',
                background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)'
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 mb-0.5">
                <span className="fw-bold text-dark small" style={{ fontSize: '0.9rem' }}>
                  KOSHIKA Clinical AI Copilot Active
                </span>
                <span className="badge rounded-pill bg-teal text-white small px-2 py-0.5" style={{ backgroundColor: '#0d9488', fontSize: '0.65rem' }}>
                  EFI &bull; NABL Validated
                </span>
              </div>
              <p className="text-secondary small mb-0" style={{ fontSize: '0.78rem', lineHeight: 1.4 }}>
                Instant reference for HLA high-resolution allele matching, CD34+ cell dosing formulas, and EBMT conditioning guidelines.
              </p>
            </div>
          </div>

          <Link
            to="/ai-assistant"
            className="btn btn-sm rounded-pill px-3.5 py-2 fw-semibold text-teal d-inline-flex align-items-center gap-1.5 flex-shrink-0 align-self-end align-self-md-center hover-translate-y shadow-xs"
            style={{ backgroundColor: 'var(--k-surface)', border: '1px solid var(--k-border)', color: 'var(--k-primary)', fontSize: '0.8rem' }}
          >
            <Bot size={15} />
            <span>Consult Clinical AI</span>
            <ChevronRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
