import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const DoctorTopBar = ({ onToggleSidebar }) => {
  const location = useLocation();
  const { user } = useAuth();
  const { unreadCount } = useRole();
  const { currentLang, languages, changeLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
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

  // Compute breadcrumb/title based on current path
  const getPageInfo = () => {
    const path = location.pathname;
    if (path === '/doctor' || path === '/doctor/') {
      return { section: t.sidebarOverview || 'Clinical Workspace', page: t.navDashboard || 'Dashboard' };
    }
    if (path.startsWith('/doctor/patients')) {
      return { section: t.sidebarClinicalCare || 'Clinical Care', page: t.navPatients || 'Patient Registry' };
    }
    if (path.startsWith('/doctor/reports')) {
      return { section: t.sidebarClinicalCare || 'Clinical Care', page: t.navReportsSignoff || 'Diagnostic Reports' };
    }
    if (path.startsWith('/doctor/consultations')) {
      return { section: t.sidebarClinicalCare || 'Clinical Care', page: t.navConsultations || 'Telehealth Consultations' };
    }
    if (path.startsWith('/doctor/appointments')) {
      return { section: t.sidebarClinicalCare || 'Clinical Care', page: t.navAppointments || 'Appointments' };
    }
    if (path.startsWith('/doctor/banks')) {
      return { section: t.sidebarResources || 'Stem Cell Resources', page: t.navDonorSearch || 'Donor & Biobank' };
    }
    if (path.startsWith('/doctor/profile')) {
      return { section: t.attendingClinician || 'Clinician', page: t.navDoctorProfile || 'Doctor Profile & Practice' };
    }
    if (path.startsWith('/notifications')) {
      return { section: t.sidebarOverview || 'Workspace', page: t.notificationsTitle || 'Clinical Notifications' };
    }
    return { section: t.sidebarOverview || 'Clinical Workspace', page: t.navOverview || 'Overview' };
  };

  const { section, page } = getPageInfo();

  const doctorInitials = (user?.name?.replace(/^Dr\.?\s*/i, '') || 'SD').slice(0, 2).toUpperCase();

  return (
    <>
      <header className="doctor-top-bar" aria-label="Clinical Top Bar">
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

        {/* Right: Contextual & Utility Elements */}
        <div className="d-flex align-items-center gap-2 gap-sm-3">
          {/* On Duty Status Badge */}
          <div
            className="d-none d-md-flex align-items-center gap-1.5 px-2.5 py-1 rounded-pill bg-emerald-50 border"
            style={{
              backgroundColor: '#ecfdf5',
              borderColor: '#a7f3d0',
              fontSize: '0.72rem',
              color: '#065f46',
              fontWeight: 600
            }}
            title="Clinician Status: Active & On Duty"
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
            <span>{t.onDuty || 'On Duty'}</span>
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
            <span className="d-none d-sm-inline">{t.roleDoctor || 'Doctor Role'}</span>
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
              title="Change Language"
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
            title="Clinical Notifications"
            aria-label="Clinical Notifications"
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

          {/* Theme Mode Toggle */}
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

          {/* Doctor Profile Avatar Shortcut */}
          <Link
            to="/doctor/profile"
            className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold text-decoration-none shadow-xs hover-translate-y"
            style={{
              width: '34px',
              height: '34px',
              fontSize: '0.8rem',
              background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 50%, #7c3aed 100%)',
              border: '2px solid #ffffff'
            }}
            title="Doctor Profile & Practice"
          >
            {doctorInitials}
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

export default DoctorTopBar;
