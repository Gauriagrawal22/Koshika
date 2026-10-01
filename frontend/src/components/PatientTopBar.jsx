import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRole } from '../context/RoleContext';
import { useLanguage } from '../context/LanguageContext';
import RoleSelectionModal from './RoleSelectionModal';
import {
  Menu,
  Bell,
  Globe,
  ChevronRight,
  ShieldCheck,
  ChevronDown,
  Search,
  X,
  Heart,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const PatientTopBar = ({ onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { unreadCount, patientProfile } = useRole();
  const { currentLang, languages, changeLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const langRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Compute breadcrumb / title based on patient routes
  const getPageInfo = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard' || path === '/my-journey') {
      return { section: t.crumbCareJourney || 'Care Journey', page: t.crumbPatientDashboard || 'Patient Dashboard' };
    }
    if (path.startsWith('/learn')) {
      return { section: t.crumbEducationSupport || 'Education & Support', page: t.crumbLearnStemCells || 'Learn Stem Cells' };
    }
    if (path.startsWith('/games')) {
      return { section: t.crumbInteractiveLearning || 'Interactive Learning', page: t.navLearnPlay || 'Learn & Play' };
    }
    if (path.startsWith('/my-health/profile') || path === '/profile') {
      return { section: t.crumbMyHealth || 'My Health', page: t.crumbHealthProfile || 'Health Profile' };
    }
    if (path.startsWith('/my-health/history')) {
      return { section: t.crumbMyHealth || 'My Health', page: t.medicalHistory || 'Medical History' };
    }
    if (path.startsWith('/ocr-reports')) {
      return { section: t.crumbHealthIntelligence || 'Health Intelligence', page: t.crumbMedicalReportOcr || 'Medical Report OCR' };
    }
    if (path.startsWith('/preliminary-assessment')) {
      return { section: t.crumbHealthAssessment || 'Health Assessment', page: t.crumbPreliminaryCheck || 'Preliminary Check' };
    }
    if (path.startsWith('/ml-match')) {
      return { section: t.crumbTherapyMatching || 'Therapy & Matching', page: t.crumbCompatibilityMatch || 'Compatibility Match' };
    }
    if (path.startsWith('/find-care/doctors')) {
      return { section: t.navFindHelp || 'Find Care', page: t.crumbSpecialistDoctors || 'Specialist Doctors' };
    }
    if (path.startsWith('/find-care/centres')) {
      return { section: t.navFindHelp || 'Find Care', page: t.crumbHospitalsCentres || 'Hospitals & Centres' };
    }
    if (path.startsWith('/bank')) {
      return { section: t.crumbCellularResources || 'Cellular Resources', page: t.navBanks || 'Stem Cell Banks' };
    }
    if (path.startsWith('/appointments') || path.startsWith('/consultation') || path.startsWith('/my-consultation')) {
      return { section: t.crumbTelehealthCare || 'Telehealth & Care', page: t.crumbMyConsultations || 'My Consultations' };
    }
    if (path.startsWith('/notifications')) {
      return { section: t.crumbCareUpdates || 'Care Updates', page: t.notificationsTitle || 'Notifications' };
    }
    if (path.startsWith('/ai-assistant') || path.startsWith('/ai-insights')) {
      return { section: t.crumbAiCareNavigator || 'AI Care Navigator', page: t.crumbKoshikaAssistant || 'KOSHIKA Assistant' };
    }
    if (path.startsWith('/help') || path.startsWith('/support')) {
      return { section: t.crumbCareGuidance || 'Care & Guidance', page: t.navHelpSupport || 'Help & Support' };
    }
    return { section: t.crumbCareJourney || 'Care Journey', page: t.navOverview || 'Overview' };
  };

  const { section, page } = getPageInfo();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const term = searchQuery.trim().toLowerCase();
    if (term.includes('doctor') || term.includes('specialist') || term.includes('surgeon')) {
      navigate(`/find-care/doctors?q=${encodeURIComponent(searchQuery.trim())}`);
    } else if (term.includes('centre') || term.includes('hospital') || term.includes('bank')) {
      navigate(`/find-care/centres?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/learn?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const userInitials = (user?.name || patientProfile?.name || 'PT').slice(0, 2).toUpperCase();

  return (
    <>
      <header className="patient-top-bar" aria-label="Patient Platform Header">
        {/* Left: Mobile Toggle & Contextual Breadcrumb */}
        <div className="d-flex align-items-center gap-3">
          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            className="btn btn-sm btn-light border rounded-circle p-1.5 d-lg-none d-flex align-items-center justify-content-center"
            onClick={onToggleSidebar}
            aria-label="Open Navigation Sidebar"
            title="Open Menu"
          >
            <Menu size={18} className="text-dark" />
          </button>

          {/* Breadcrumb / Title */}
          <nav aria-label="breadcrumb" className="d-flex align-items-center gap-1.5 text-secondary small">
            <span className="fw-medium text-muted d-none d-sm-inline" style={{ fontSize: '0.8rem' }}>
              {section}
            </span>
            <ChevronRight size={13} className="text-muted d-none d-sm-inline opacity-50" />
            <h1 className="h6 mb-0 fw-bold text-dark" style={{ fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
              {page}
            </h1>
          </nav>
        </div>

        {/* Center: Patient Search Input (Desktop) */}
        <div className="d-none d-md-block flex-grow-1 mx-4" style={{ maxWidth: '380px' }}>
          <form onSubmit={handleSearchSubmit} className="position-relative">
            <Search
              size={15}
              className="position-absolute text-muted"
              style={{ top: '50%', left: '12px', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              className="form-control form-control-sm rounded-pill border bg-light text-dark ps-4 pe-3 py-1.5 small"
              placeholder={t.searchPlaceholderPatient || "Search therapies, doctors, stem cell guides..."}
              style={{ fontSize: '0.82rem', borderColor: '#e2e8f0', backgroundColor: '#f8fafc' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="btn btn-link p-0 position-absolute text-muted"
                style={{ top: '50%', right: '12px', transform: 'translateY(-50%)' }}
                onClick={() => setSearchQuery('')}
              >
                <X size={13} />
              </button>
            )}
          </form>
        </div>

        {/* Right: Contextual & Utility Elements (Identical to Doctor and Admin) */}
        <div className="d-flex align-items-center gap-2 gap-sm-3">
          {/* Patient Care Active Status Badge */}
          <div
            className="d-none d-md-flex align-items-center gap-1.5 px-2.5 py-1 rounded-pill bg-emerald-50 border"
            style={{
              backgroundColor: '#ecfdf5',
              borderColor: '#a7f3d0',
              fontSize: '0.72rem',
              color: '#065f46',
              fontWeight: 600
            }}
            title={t.statusCareActive || "Patient Care Status: Active Journey"}
          >
            <span
              className="rounded-circle"
              style={{
                width: '7px',
                height: '7px',
                backgroundColor: '#10b981',
                boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.25)'
              }}
            />
            <span>{t.statusCareActive || "Care Active"}</span>
          </div>

          {/* Role Indicator / Switcher */}
          <button
            type="button"
            className="btn btn-sm d-flex align-items-center gap-1.5 rounded-pill px-2.5 py-1 text-dark border bg-light hover-shadow-xs"
            style={{ fontSize: '0.75rem', borderColor: '#e2e8f0', fontWeight: 600 }}
            onClick={() => setShowRoleModal(true)}
            title={t.switchRole || "Switch Workspace Role View"}
          >
            <ShieldCheck size={14} className="text-teal" style={{ color: '#0d9488' }} />
            <span className="d-none d-sm-inline">{t.rolePatientView || "Patient Role"}</span>
            <ChevronDown size={12} className="text-muted" />
          </button>

          {/* Language Selector Dropdown */}
          <div className="position-relative" ref={langRef}>
            <button
              type="button"
              className="btn btn-sm btn-light border rounded-pill px-2.5 py-1 d-flex align-items-center gap-1.5 text-secondary hover-bg-light"
              style={{ fontSize: '0.75rem', borderColor: '#e2e8f0' }}
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-expanded={langMenuOpen}
              title={t.selectLanguage || "Change Language"}
            >
              <Globe size={14} className="text-teal" style={{ color: '#0d9488' }} />
              <span className="fw-medium">{currentLang?.name || 'English'}</span>
              <ChevronDown size={11} className="text-muted" />
            </button>

            {langMenuOpen && (
              <div
                className="dropdown-menu show shadow-lg border-0 rounded-3 p-1.5 position-absolute end-0 mt-1"
                style={{ zIndex: 1060, minWidth: '135px', border: '1px solid #e2e8f0' }}
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    className={`dropdown-item rounded-2 py-1 px-2.5 d-flex align-items-center justify-content-between small ${
                      currentLang?.code === l.code ? 'active bg-teal-subtle text-teal fw-bold' : 'text-dark'
                    }`}
                    style={currentLang?.code === l.code ? { backgroundColor: '#f0fdfa', color: '#0d9488' } : {}}
                    onClick={() => {
                      changeLanguage(l.code);
                      setLangMenuOpen(false);
                    }}
                  >
                    <span>{l.name}</span>
                    <span className="text-muted small opacity-75">{l.native}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell Icon */}
          <Link
            to="/notifications"
            className="btn btn-sm btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center position-relative hover-translate-y"
            style={{ width: '36px', height: '36px', borderColor: 'var(--k-border)' }}
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell size={17} className="text-secondary" />
            {unreadCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '0.62rem', padding: '0.22em 0.45em' }}
              >
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Theme Mode Toggle (Light / Dark) */}
          <button
            type="button"
            className="btn btn-sm btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center hover-translate-y"
            style={{ width: '36px', height: '36px', borderColor: 'var(--k-border)' }}
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={17} className="text-warning" /> : <Moon size={17} className="text-secondary" />}
          </button>

          {/* Patient Profile Shortcut */}
          <Link
            to="/my-health/profile"
            className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold text-decoration-none shadow-xs hover-translate-y"
            style={{
              width: '34px',
              height: '34px',
              fontSize: '0.8rem',
              background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)',
              border: '2px solid #ffffff'
            }}
            title="My Health Profile"
          >
            {userInitials}
          </Link>
        </div>
      </header>

      {/* Role Selection Modal */}
      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
      />
    </>
  );
};

export default PatientTopBar;
