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
  SlidersHorizontal,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AdminTopBar = ({ onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { unreadCount } = useRole();
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

  // Compute breadcrumb/title based on current path
  const getPageInfo = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/') {
      return { section: t.sidebarPlatform || 'Administration', page: t.navDashboard || 'Dashboard Overview' };
    }
    if (path.startsWith('/admin/profile')) {
      return { section: t.sidebarAccount || 'Platform Governance', page: t.navAdminProfile || 'Admin Profile' };
    }
    if (path.startsWith('/admin/patients') || path.includes('tab=patients')) {
      return { section: t.sidebarClinicalCare || 'Platform Care', page: t.navPatients || 'Patients Registry' };
    }
    if (path.startsWith('/admin/doctors')) {
      return { section: t.sidebarManagement || 'Credentialing', page: t.navDoctorCredentialing || 'Doctors & Clinicians' };
    }
    if (path.startsWith('/admin/banks')) {
      return { section: t.sidebarResources || 'Cellular Repositories', page: t.navBiobankManagement || 'Stem Cell Banks' };
    }
    if (path.startsWith('/admin/records') || path.startsWith('/reports')) {
      return { section: t.sidebarCompliance || 'Quality Assurance', page: t.navReportsSignoff || 'Reports & Documents' };
    }
    if (path.startsWith('/appointments')) {
      return { section: t.crumbTelehealthCare || 'Telehealth Operations', page: t.navAppointments || 'Consultations' };
    }
    if (path.startsWith('/admin/activity')) {
      return { section: t.sidebarCompliance || 'Platform Governance', page: t.navAuditCompliance || 'Analytics & Audit Trail' };
    }
    if (path.startsWith('/learn')) {
      return { section: t.crumbEducationSupport || 'Educational Registry', page: t.navLearn || 'Content Management' };
    }
    if (path.startsWith('/admin/settings')) {
      return { section: t.sidebarSystem || 'System Infrastructure', page: t.navPlatformSettings || 'Settings & Security' };
    }
    if (path.startsWith('/admin/users')) {
      return { section: t.sidebarManagement || 'User Access', page: t.navUserManagement || 'User Directory' };
    }
    return { section: t.sidebarPlatform || 'Administration', page: t.navOverview || 'Operations' };
  };

  const { section, page } = getPageInfo();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/admin/users?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <>
      <header className="admin-top-bar" aria-label="Admin Platform Header">
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

        {/* Center: Global Search Input (Desktop) */}
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
              placeholder={t.searchPlaceholderAdmin || "Search patients, doctors, biobanks..."}
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

        {/* Right: Contextual & Utility Elements */}
        <div className="d-flex align-items-center gap-2 gap-sm-3">
          {/* Telemetry / Live Ops Status Badge */}
          <div
            className="d-none d-xl-flex align-items-center gap-1.5 px-2.5 py-1 rounded-pill bg-teal-subtle border"
            style={{
              backgroundColor: '#f0fdfa',
              borderColor: '#ccfbf1',
              fontSize: '0.72rem',
              color: '#0d9488',
              fontWeight: 600
            }}
            title="System Operational: Telemetry Live • LN2 Sensor Nominals"
          >
            <span
              className="rounded-circle"
              style={{
                width: '7px',
                height: '7px',
                backgroundColor: '#0d9488',
                boxShadow: '0 0 0 2px rgba(13, 148, 136, 0.25)'
              }}
            />
            <span>{t.platformActive || 'Platform Active'}</span>
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
            <span className="d-none d-sm-inline">{t.roleAdmin || 'Admin Role'}</span>
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
            title="System Notifications"
            aria-label="System Notifications"
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

          {/* Admin Profile Avatar Shortcut */}
          <Link
            to="/admin/profile"
            className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold text-decoration-none shadow-xs hover-translate-y"
            style={{
              width: '34px',
              height: '34px',
              fontSize: '0.8rem',
              background: 'linear-gradient(135deg, #0f766e 0%, #0369a1 100%)',
              border: '2px solid #ffffff'
            }}
            title="Admin Profile"
          >
            {(user?.name || 'AD').slice(0, 2).toUpperCase()}
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

export default AdminTopBar;
