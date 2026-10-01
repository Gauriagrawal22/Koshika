import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRole, ROLES } from '../context/RoleContext';
import { useLanguage } from '../context/LanguageContext';
import { KoshikaLogoIcon } from './KoshikaLogo';
import RoleSelectionModal from './RoleSelectionModal';
import {
  Home,
  BookOpen,
  Gamepad2,
  ClipboardCheck,
  FileText,
  Search,
  Stethoscope,
  Building2,
  Building,
  Calendar,
  User,
  Activity,
  HelpCircle,
  Globe,
  ChevronRight,
  ChevronDown,
  LogOut,
  ShieldCheck,
  Check,
  PanelLeftClose,
  PanelLeftOpen,
  X
} from 'lucide-react';

const PatientSidebar = ({
  mobileOpen,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, switchRole } = useAuth();
  const { role, setRole, patientProfile } = useRole();
  const { langCode, currentLang, changeLanguage, languages, t } = useLanguage();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const profileRef = useRef(null);
  const langRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Close menus & mobile drawer on route change
  useEffect(() => {
    setShowProfileMenu(false);
    setShowLangMenu(false);
    if (onCloseMobile) onCloseMobile();
  }, [location.pathname]);

  const handleSelectLang = (code) => {
    changeLanguage(code);
    setShowLangMenu(false);
  };

  const handleSelectRole = (newRole) => {
    setRole(newRole);
    if (switchRole) switchRole(newRole);
    setShowProfileMenu(false);
    if (newRole === ROLES.DOCTOR) navigate('/doctor');
    else if (newRole === ROLES.ADMIN) navigate('/admin');
    else navigate('/');
  };

  // Dynamic user display name - never hardcoded!
  const displayName = user?.name?.split(' ')[0] || patientProfile?.name?.split(' ')[0] || 'Patient';
  const fullDisplayName = user?.name || patientProfile?.name || 'Registered Patient';
  const userInitials = (user?.name || patientProfile?.name || 'PT').slice(0, 2).toUpperCase();

  return (
    <>
      <aside
        className={`patient-sidebar ${mobileOpen ? 'mobile-open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        aria-label="Patient Main Navigation"
      >
        {/* Top Header / Branding */}
        <div className="patient-sidebar-header">
          {isCollapsed ? (
            <button
              type="button"
              className="btn btn-sm btn-light border rounded-circle p-2 text-teal d-flex align-items-center justify-content-center hover-translate-y mx-auto shadow-xs"
              style={{ color: '#0d9488', width: '38px', height: '38px' }}
              onClick={onToggleCollapse}
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <PanelLeftOpen size={18} />
            </button>
          ) : (
            <>
              <Link to="/" className="patient-sidebar-brand" title="KOSHIKA Home">
                <div className="flex-shrink-0">
                  <KoshikaLogoIcon size={34} />
                </div>
                <div className="sidebar-hide-collapsed">
                  <div className="patient-sidebar-brand-name">KOSHIKA</div>
                  <div className="patient-sidebar-brand-sub">{t.brandTagline || 'Knowledge. Support. Hope.'}</div>
                </div>
              </Link>

              {/* Desktop Collapse Toggle (visible on desktop) */}
              <button
                type="button"
                className="btn btn-sm btn-light border-0 rounded-circle p-1.5 text-muted d-none d-lg-flex align-items-center justify-content-center hover-translate-y"
                onClick={onToggleCollapse}
                title="Hide sidebar to see whole screen"
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose size={16} />
              </button>
            </>
          )}

          {/* Mobile Close Button */}
          <button
            type="button"
            className="btn btn-sm btn-light rounded-circle p-1 text-muted d-lg-none"
            onClick={onCloseMobile}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Sections: Clean 3-Group Healthcare Architecture */}
        <div className="patient-sidebar-nav flex-grow-1 overflow-y-auto">
          {/* Group 1: OVERVIEW & KNOWLEDGE */}
          <div className="sidebar-section-title">{t.sidebarHome || 'OVERVIEW & KNOWLEDGE'}</div>
          
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `patient-sidebar-link ${isActive || location.pathname === '/dashboard' ? 'active' : ''}`
            }
            title={t.navHome || 'Care Journey'}
          >
            <Home size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navHome || 'Care Journey'}</span>}
          </NavLink>

          <NavLink
            to="/learn"
            className={({ isActive }) => `patient-sidebar-link ${isActive ? 'active' : ''}`}
            title={t.cardLearnUnderstand || 'Learn & Guides'}
          >
            <BookOpen size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.cardLearnUnderstand || 'Learn & Guides'}</span>}
          </NavLink>

          <NavLink
            to="/games"
            className={({ isActive }) => `patient-sidebar-link ${isActive ? 'active' : ''}`}
            title={t.navLearnPlay || 'Interactive Studio'}
          >
            <Gamepad2 size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navLearnPlay || 'Interactive Studio'}</span>}
          </NavLink>

          {/* Group 2: HEALTH & DIAGNOSTICS */}
          <div className="sidebar-section-title mt-3">{t.sidebarMyCare || 'HEALTH & DIAGNOSTICS'}</div>

          <NavLink
            to="/preliminary-assessment"
            className={({ isActive }) => `patient-sidebar-link ${isActive ? 'active' : ''}`}
            title={t.navAssessment || 'Health Assessment'}
          >
            <ClipboardCheck size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navAssessment || 'Health Assessment'}</span>}
          </NavLink>

          <NavLink
            to="/ocr-reports"
            className={({ isActive }) => `patient-sidebar-link ${isActive ? 'active' : ''}`}
            title={t.navReports || 'Medical Reports & OCR'}
          >
            <FileText size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navReports || 'Medical Reports & OCR'}</span>}
          </NavLink>

          <NavLink
            to="/appointments"
            className={({ isActive }) => `patient-sidebar-link ${isActive ? 'active' : ''}`}
            title={t.navConsultations || 'Appointments & Telehealth'}
          >
            <Calendar size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navConsultations || 'Appointments'}</span>}
          </NavLink>

          {/* Group 3: CARE DIRECTORY */}
          <div className="sidebar-section-title mt-3">{t.sidebarCare || 'CARE DIRECTORY'}</div>

          <NavLink
            to="/find-care/doctors"
            className={({ isActive }) => `patient-sidebar-link ${isActive ? 'active' : ''}`}
            title={t.navDoctors || 'Find Doctors'}
          >
            <Stethoscope size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navDoctors || 'Specialist Doctors'}</span>}
          </NavLink>

          <NavLink
            to="/find-care/centres"
            className={({ isActive }) => `patient-sidebar-link ${isActive ? 'active' : ''}`}
            title={t.navCentres || 'Transplant Centres'}
          >
            <Building2 size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navCentres || 'Transplant Centres'}</span>}
          </NavLink>

          <NavLink
            to="/bank"
            className={({ isActive }) => `patient-sidebar-link ${isActive ? 'active' : ''}`}
            title={t.navBanks || 'Stem Cell Banks'}
          >
            <Building size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navBanks || 'Stem Cell Banks'}</span>}
          </NavLink>
        </div>

        {/* Bottom Utility Controls & Profile Area */}
        <div className="patient-sidebar-footer">
          {/* Secondary Utility: Help & Support */}
          <NavLink
            to="/help"
            className={({ isActive }) => `patient-sidebar-link py-2 ${isActive ? 'active' : ''}`}
            title={t.navHelpSupport || 'Help & Support'}
          >
            <HelpCircle size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navHelpSupport || 'Help & Support'}</span>}
          </NavLink>

          {/* Language Selector Dropdown */}
          <div className="position-relative" ref={langRef}>
            <button
              type="button"
              className="patient-sidebar-link w-100 border-0 bg-transparent py-2 text-start d-flex align-items-center justify-content-between"
              onClick={() => {
                setShowLangMenu(!showLangMenu);
                setShowProfileMenu(false);
              }}
              aria-expanded={showLangMenu}
              title={t.selectLanguage || 'Select Language'}
            >
              <div className="d-flex align-items-center gap-2">
                <Globe size={18} className="sidebar-icon" style={{ color: '#0d9488' }} />
                {!isCollapsed && (
                  <span className="sidebar-hide-collapsed">{currentLang?.name || 'English'}</span>
                )}
              </div>
              {!isCollapsed && (
                <ChevronDown
                  size={14}
                  className="text-muted"
                  style={{
                    transform: showLangMenu ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.15s ease'
                  }}
                />
              )}
            </button>

            {/* Language Popover */}
            {showLangMenu && (
              <div
                className="dropdown-menu show shadow-lg border-0 rounded-4 p-2 position-absolute bottom-100 start-0 mb-2 w-100"
                style={{ zIndex: 1060, border: '1px solid #e2e8f0', minWidth: '180px' }}
              >
                <div className="dropdown-header small text-muted text-uppercase fw-bold pb-1" style={{ fontSize: '0.65rem' }}>
                  {t.selectLanguage || 'Language'}
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    className={`dropdown-item rounded-3 py-1.5 px-2.5 d-flex align-items-center justify-content-between small ${
                      langCode === l.code ? 'active bg-success text-white' : ''
                    }`}
                    onClick={() => handleSelectLang(l.code)}
                  >
                    <span className="fw-semibold">{l.name} ({l.native})</span>
                    {langCode === l.code && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Patient Account & Role Trigger Area */}
          <div className="position-relative mt-1" ref={profileRef}>
            <button
              type="button"
              className="patient-profile-card-trigger"
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowLangMenu(false);
              }}
              aria-expanded={showProfileMenu}
              title={t.switchRole || 'Account & Role Switcher'}
            >
              <div className="d-flex align-items-center gap-2 overflow-hidden">
                <div
                  className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0 shadow-xs"
                  style={{
                    width: '32px',
                    height: '32px',
                    fontSize: '0.8rem',
                    background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)'
                  }}
                >
                  {userInitials}
                </div>
                {!isCollapsed && (
                  <div className="sidebar-hide-collapsed text-start overflow-hidden">
                    <div className="fw-bold text-dark small text-truncate" style={{ lineHeight: 1.15 }}>
                      {displayName}
                    </div>
                    <span className="badge rounded-pill bg-light text-muted border small px-1.5 py-0 mt-0.5" style={{ fontSize: '0.65rem' }}>
                      {t.rolePatient || 'Patient'}
                    </span>
                  </div>
                )}
              </div>
              {!isCollapsed && <ChevronRight size={15} className="text-muted flex-shrink-0" />}
            </button>

            {/* Profile Popover / Role Switcher Menu */}
            {showProfileMenu && (
              <div
                className="dropdown-menu show shadow-lg border-0 rounded-4 p-2.5 position-absolute bottom-100 start-0 mb-2 w-100"
                style={{ zIndex: 1060, minWidth: '220px', border: '1px solid #e2e8f0', animation: 'fadeIn 0.15s ease-out' }}
              >
                <div className="p-2 rounded-3 bg-light mb-2">
                  <div className="fw-bold text-dark small text-truncate">{fullDisplayName}</div>
                  <div className="text-muted small" style={{ fontSize: '0.72rem' }}>
                    {t.role || 'Role'}: {t.rolePatient || 'Patient'}
                  </div>
                </div>

                <div className="d-flex flex-column gap-1">
                  <Link
                    to="/my-health/profile"
                    className="dropdown-item rounded-3 py-1.5 px-2 d-flex align-items-center gap-2 small fw-semibold text-teal"
                    style={{ color: '#0d9488' }}
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User size={15} />
                    <span>{t.myProfile || 'My Profile'}</span>
                  </Link>

                  <Link
                    to="/my-health/history"
                    className="dropdown-item rounded-3 py-1.5 px-2 d-flex align-items-center gap-2 small fw-semibold text-secondary"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Activity size={15} />
                    <span>{t.medicalHistory || 'Medical History'}</span>
                  </Link>

                  <button
                    type="button"
                    className="dropdown-item rounded-3 py-1.5 px-2 d-flex align-items-center gap-2 small text-primary fw-semibold"
                    onClick={() => {
                      setShowProfileMenu(false);
                      setShowRoleModal(true);
                    }}
                  >
                    <ShieldCheck size={15} />
                    <span>{t.switchRole || 'Switch Role...'}</span>
                  </button>

                  <div className="dropdown-divider my-1 opacity-25" />

                  <button
                    type="button"
                    className="dropdown-item rounded-3 py-1.5 px-2 d-flex align-items-center gap-2 small text-danger fw-semibold"
                    onClick={async () => {
                      setShowProfileMenu(false);
                      await logout();
                      navigate('/login');
                    }}
                  >
                    <LogOut size={15} />
                    <span>{t.signOut || 'Sign Out'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Role Selection Modal */}
      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
      />
    </>
  );
};

export default PatientSidebar;
