import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useRole, ROLES } from '../context/RoleContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import KoshikaLogo from './KoshikaLogo';
import RoleSelectionModal from './RoleSelectionModal';
import { 
  Home, 
  BookOpen,
  FileText,
  ClipboardCheck,
  Stethoscope,
  Building2,
  Gamepad2,
  Globe, 
  ChevronDown, 
  Bell, 
  User, 
  LogOut, 
  ShieldCheck,
  Check,
  Menu,
  X,
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  Database,
  Activity,
  Video
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, setRole, unreadCount, patientProfile } = useRole();
  const { user, logout, switchRole } = useAuth();
  const { langCode, currentLang, changeLanguage, t, languages } = useLanguage();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showRoleSelectModal, setShowRoleSelectModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);
  const roleDropdownRef = useRef(null);
  const mobileNavRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setShowProfileModal(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setShowLangDropdown(false);
      }
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target)) {
        setShowRoleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close all menus on route transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowProfileModal(false);
    setShowLangDropdown(false);
    setShowRoleDropdown(false);
  }, [location.pathname]);

  const handleSelectLang = (l) => {
    changeLanguage(l.code);
    setShowLangDropdown(false);
  };

  const handleSelectRole = (newRole) => {
    setRole(newRole);
    if (switchRole) switchRole(newRole);
    setShowRoleDropdown(false);
    const targetRoute = newRole === ROLES.DOCTOR ? '/doctor' : newRole === ROLES.ADMIN ? '/admin' : '/';
    navigate(targetRoute);
  };

  const homeTarget = role === ROLES.DOCTOR ? '/doctor' : role === ROLES.ADMIN ? '/admin' : '/';

  const isHomeActive = location.pathname === '/' || 
                       location.pathname === '/dashboard' || 
                       (role === ROLES.DOCTOR && location.pathname === '/doctor') || 
                       (role === ROLES.ADMIN && location.pathname === '/admin');

  const getNavLinks = () => {
    if (role === ROLES.DOCTOR) {
      return [
        { to: '/doctor', label: t.navDashboard || 'Dashboard', icon: Home, end: true },
        { to: '/doctor/patients', label: t.navPatients || 'Patients', icon: Users },
        { to: '/doctor/reports', label: t.navReports || 'Reports', icon: FileText },
        { to: '/doctor/consultations', label: t.navConsultations || 'Consultations', icon: Video },
        { to: '/doctor/appointments', label: t.navAppointments || 'Appointments', icon: Calendar },
        { to: '/doctor/banks', label: t.navDonorSearch || 'Donor / Bank Search', icon: Building2 },
        { to: '/my-health/profile', label: t.myProfile || 'My Profile', icon: User }
      ];
    }
    if (role === ROLES.ADMIN) {
      return [
        { to: '/admin', label: t.navDashboard || 'Dashboard', icon: LayoutDashboard, end: true }
      ];
    }
    // Patient (Default)
    return [
      { to: '/', label: t.navHome || 'Home', icon: Home, end: true },
      { to: '/learn', label: t.navLearn || 'Learn', icon: BookOpen },
      { to: '/ocr-reports', label: t.navReports || 'Reports', icon: FileText },
      { to: '/preliminary-assessment', label: t.navAssessment || 'Assessment', icon: ClipboardCheck },
      { to: '/find-care/doctors', label: t.navDoctors || 'Doctors', icon: Stethoscope },
      { to: '/bank', label: t.navBanks || 'Banks', icon: Building2 }
    ];
  };

  const navLinks = getNavLinks();

  return (
    <>
      <header className="koshika-top-header" ref={mobileNavRef}>
        <div className="koshika-header-inner">
          
          {/* LEFT: KOSHIKA logo, KOSHIKA, Tagline: "Knowledge. Support. Hope." */}
          <div className="koshika-header-left">
            <KoshikaLogo linkTo={homeTarget} />
          </div>

          {/* CENTER / MAIN NAVIGATION (Desktop >= 992px) */}
          <nav className="koshika-center-nav d-none d-lg-flex" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `koshika-nav-item ${isActive || (item.end && isHomeActive) ? 'active' : ''}`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* RIGHT: Role selector, Language selector, Notifications, Profile */}
          <div className="koshika-header-right">
            
            {/* 1. Language selector: English ▾ */}
            <div className="position-relative d-none d-sm-block" ref={langDropdownRef}>
              <button
                type="button"
                className="btn btn-sm koshika-topbar-pill d-flex align-items-center gap-1.5"
                onClick={() => {
                  setShowLangDropdown(!showLangDropdown);
                  setShowRoleDropdown(false);
                  setShowProfileModal(false);
                }}
                aria-expanded={showLangDropdown}
                aria-haspopup="true"
                title={t.selectLanguage || 'Select Language'}
              >
                <Globe size={14} style={{ color: '#0d9488' }} />
                <span>{currentLang?.name || 'English'}</span>
                <ChevronDown 
                  size={12} 
                  className="text-muted" 
                  style={{ 
                    transition: 'transform 0.18s ease', 
                    transform: showLangDropdown ? 'rotate(180deg)' : 'none' 
                  }} 
                />
              </button>

              {showLangDropdown && (
                <div 
                  className="dropdown-menu show shadow-lg border-0 rounded-4 p-2 position-absolute end-0 mt-2" 
                  style={{ zIndex: 1060, minWidth: '185px' }}
                >
                  <div className="dropdown-header small text-muted text-uppercase fw-bold pb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.04em' }}>
                    {t.selectLanguage || 'Select Language'}
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      className={`dropdown-item rounded-3 py-1.5 px-2.5 d-flex align-items-center justify-content-between small ${langCode === l.code ? 'active bg-success text-white' : ''}`}
                      onClick={() => handleSelectLang(l)}
                    >
                      <span className="fw-semibold">{l.name} ({l.native})</span>
                      {langCode === l.code && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Role selector: Role: Patient ▾ (Matching Reference Screen 7: SWITCH ROLE VIEW) */}
            <div className="position-relative d-none d-sm-block" ref={roleDropdownRef}>
              <button
                type="button"
                className="btn btn-sm rounded-pill px-2.5 py-1 d-flex align-items-center gap-1.5 border"
                style={{
                  backgroundColor: role === ROLES.DOCTOR ? '#eff6ff' : role === ROLES.ADMIN ? '#faf5ff' : '#f0fdfa',
                  borderColor: role === ROLES.DOCTOR ? '#bfdbfe' : role === ROLES.ADMIN ? '#e9d5ff' : '#ccfbf1',
                  color: role === ROLES.DOCTOR ? '#1d4ed8' : role === ROLES.ADMIN ? '#7e22ce' : '#0f766e',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}
                onClick={() => {
                  setShowRoleDropdown(!showRoleDropdown);
                  setShowLangDropdown(false);
                  setShowProfileModal(false);
                }}
                aria-expanded={showRoleDropdown}
                aria-haspopup="true"
                title="Switch Role"
              >
                <span className="koshika-role-label fw-semibold">Role:</span>
                <span className="text-capitalize">{role === ROLES.PATIENT ? 'Patient' : role === ROLES.DOCTOR ? 'Doctor' : 'Admin'}</span>
                <ChevronDown 
                  size={12} 
                  style={{ 
                    transition: 'transform 0.18s ease', 
                    transform: showRoleDropdown ? 'rotate(180deg)' : 'none' 
                  }} 
                />
              </button>

              {showRoleDropdown && (
                <div 
                  className="dropdown-menu show shadow-lg border-0 rounded-4 p-2.5 position-absolute end-0 mt-2" 
                  style={{ zIndex: 1060, minWidth: '240px' }}
                >
                  <div className="dropdown-header small text-muted text-uppercase fw-bold pb-2" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                    SWITCH ROLE VIEW
                  </div>
                  
                  {/* Patient Option */}
                  <button
                    type="button"
                    className={`dropdown-item rounded-3 py-2 px-2.5 d-flex align-items-center justify-content-between small mb-1 ${role === ROLES.PATIENT ? 'active' : ''}`}
                    style={role === ROLES.PATIENT ? { backgroundColor: '#0d9488', color: '#fff' } : {}}
                    onClick={() => handleSelectRole(ROLES.PATIENT)}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <User size={16} />
                      <span className="fw-semibold">Patient</span>
                    </div>
                    {role === ROLES.PATIENT && <Check size={15} />}
                  </button>

                  {/* Doctor Option */}
                  <button
                    type="button"
                    className={`dropdown-item rounded-3 py-2 px-2.5 d-flex align-items-center justify-content-between small mb-1 ${role === ROLES.DOCTOR ? 'active' : ''}`}
                    style={role === ROLES.DOCTOR ? { backgroundColor: '#2563eb', color: '#fff' } : {}}
                    onClick={() => handleSelectRole(ROLES.DOCTOR)}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <Stethoscope size={16} />
                      <span className="fw-semibold">Doctor (Clinician)</span>
                    </div>
                    {role === ROLES.DOCTOR && <Check size={15} />}
                  </button>

                  {/* Administrator Option */}
                  <button
                    type="button"
                    className={`dropdown-item rounded-3 py-2 px-2.5 d-flex align-items-center justify-content-between small ${role === ROLES.ADMIN ? 'active' : ''}`}
                    style={role === ROLES.ADMIN ? { backgroundColor: '#7e22ce', color: '#fff' } : {}}
                    onClick={() => handleSelectRole(ROLES.ADMIN)}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <ShieldCheck size={16} />
                      <span className="fw-semibold">Administrator</span>
                    </div>
                    {role === ROLES.ADMIN && <Check size={15} />}
                  </button>

                  <div className="dropdown-divider my-2 opacity-25"></div>

                  {/* Role Selection Guide */}
                  <button
                    type="button"
                    className="dropdown-item rounded-3 py-1.5 px-2 text-muted small d-flex align-items-center gap-2"
                    onClick={() => {
                      setShowRoleDropdown(false);
                      setShowRoleSelectModal(true);
                    }}
                  >
                    <i className="bi bi-window-stack"></i>
                    <span>Role Selection Guide...</span>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Notification bell with notification badge */}
            <Link
              to="/notifications"
              className="btn btn-sm btn-light border rounded-circle position-relative p-0 d-flex align-items-center justify-content-center koshika-nav-icon-btn"
              style={{ width: '36px', height: '36px' }}
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell size={16} className="text-secondary" />
              {unreadCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.62rem', padding: '0.22em 0.42em' }}
                >
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* 4. User profile/avatar with dropdown */}
            <div className="position-relative" ref={profileDropdownRef}>
              <button
                type="button"
                className="btn btn-sm btn-light border rounded-pill ps-1 pe-2 py-1 d-flex align-items-center gap-1.5 koshika-profile-btn"
                onClick={() => {
                  setShowProfileModal(!showProfileModal);
                  setShowLangDropdown(false);
                  setShowRoleDropdown(false);
                }}
                aria-expanded={showProfileModal}
                aria-haspopup="true"
                title="User Profile & Settings"
              >
                <div
                  className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                  style={{
                    width: '28px',
                    height: '28px',
                    fontSize: '0.75rem',
                    backgroundColor: role === ROLES.DOCTOR ? '#2563eb' : role === ROLES.ADMIN ? '#9333ea' : '#0d9488'
                  }}
                >
                  {(user?.name || patientProfile.name || 'MS').slice(0, 2).toUpperCase()}
                </div>
                <ChevronDown 
                  size={12} 
                  className="text-muted" 
                  style={{ 
                    transition: 'transform 0.18s ease', 
                    transform: showProfileModal ? 'rotate(180deg)' : 'none' 
                  }} 
                />
              </button>

              {showProfileModal && (
                <div 
                  className="dropdown-menu show shadow-lg border-0 rounded-4 p-3 position-absolute end-0 mt-2" 
                  style={{ zIndex: 1060, width: '280px', border: '1px solid #e2e8f0', animation: 'fadeIn 0.2s ease-out' }}
                >
                  <div 
                    className="p-2.5 rounded-3 mb-2.5 d-flex align-items-center gap-2.5 text-white"
                    style={{
                      background: role === ROLES.DOCTOR 
                        ? 'linear-gradient(135deg, #1e40af 0%, #0d9488 100%)' 
                        : role === ROLES.ADMIN 
                        ? 'linear-gradient(135deg, #7e22ce 0%, #3b82f6 100%)' 
                        : 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)'
                    }}
                  >
                    <div
                      className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0 shadow-xs"
                      style={{
                        width: '40px',
                        height: '40px',
                        fontSize: '0.95rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        border: '1.5px solid rgba(255, 255, 255, 0.5)'
                      }}
                    >
                      {(user?.name || patientProfile.name || 'MS').slice(0, 2).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <div className="fw-bold text-white small text-truncate">{user?.name || patientProfile.name || 'Mitesh Sharma'}</div>
                      <span className="badge rounded-pill bg-white text-dark small px-2 py-0.5 fw-semibold" style={{ fontSize: '0.65rem' }}>
                        {role === ROLES.PATIENT ? (t.registeredPatient || 'Patient') : role === ROLES.DOCTOR ? (t.attendingClinician || 'Clinician') : (t.administrator || 'Administrator')}
                      </span>
                    </div>
                  </div>

                  <div className="d-flex flex-column gap-1">
                    <Link
                      to={role === ROLES.DOCTOR ? '/doctor/profile' : '/my-health/profile'}
                      className="dropdown-item rounded-3 py-2 px-2.5 d-flex align-items-center gap-2 small fw-semibold hover-lift"
                      onClick={() => setShowProfileModal(false)}
                      style={{ backgroundColor: '#f0fdfa', color: '#0d9488' }}
                    >
                      <User size={16} />
                      <span>{role === ROLES.DOCTOR ? 'Clinician Profile & Practice' : (t.profileSettings || 'My Profile & Demographics')}</span>
                    </Link>

                    <button
                      type="button"
                      className="dropdown-item rounded-3 py-2 px-2.5 d-flex align-items-center gap-2 small text-primary fw-semibold"
                      onClick={() => {
                        setShowProfileModal(false);
                        setShowRoleSelectModal(true);
                      }}
                    >
                      <ShieldCheck size={16} />
                      <span>{t.switchRole || 'Switch Role / Credentials'}</span>
                    </button>

                    <Link
                      to="/games"
                      className="dropdown-item rounded-3 py-2 px-2.5 d-flex align-items-center gap-2 small text-secondary fw-semibold"
                      onClick={() => setShowProfileModal(false)}
                    >
                      <Gamepad2 size={16} className="text-warning" />
                      <span>{t.awarenessGames || 'Stem Cell Quiz & Games'}</span>
                    </Link>

                    <hr className="my-1.5 text-muted opacity-25" />

                    <button
                      type="button"
                      className="dropdown-item rounded-3 py-2 px-2.5 d-flex align-items-center gap-2 small text-danger fw-semibold"
                      onClick={async () => {
                        setShowProfileModal(false);
                        await logout();
                        navigate('/login');
                      }}
                    >
                      <LogOut size={16} />
                      <span>{t.signOut || 'Sign Out'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button (Visible only on < 1200px screens) */}
            <button
              type="button"
              className="btn btn-sm btn-light border rounded-circle p-0 d-xl-none d-flex align-items-center justify-content-center koshika-nav-icon-btn"
              style={{ width: '36px', height: '36px' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

          </div>
        </div>

        {/* COMPACT MOBILE NAVIGATION PANEL (< 1200px) */}
        {mobileMenuOpen && (
          <div className="koshika-mobile-drawer d-xl-none pt-3 pb-2 border-top mt-2">
            <div className="d-flex flex-column gap-1 mb-3">
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => `koshika-mobile-nav-link ${isActive || (item.end && isHomeActive) ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon size={17} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Mobile Controls for Language & Role */}
            <div className="pt-2 border-top d-flex flex-column gap-2">
              <div className="d-flex align-items-center justify-content-between">
                <span className="small text-muted fw-semibold d-flex align-items-center gap-1">
                  <Globe size={13} style={{ color: '#0d9488' }} />
                  <span>Language:</span>
                </span>
                <div className="btn-group btn-group-sm">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      className={`btn btn-sm py-1 px-2.5 ${langCode === l.code ? 'btn-teal text-white' : 'btn-light border'}`}
                      style={langCode === l.code ? { backgroundColor: '#0d9488', borderColor: '#0d9488', fontSize: '0.76rem', fontWeight: 600 } : { fontSize: '0.76rem' }}
                      onClick={() => handleSelectLang(l)}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between">
                <span className="small text-muted fw-semibold d-flex align-items-center gap-1">
                  <User size={13} />
                  <span>Role:</span>
                </span>
                <div className="btn-group btn-group-sm">
                  <button
                    type="button"
                    className={`btn btn-sm py-1 px-2 ${role === ROLES.PATIENT ? 'btn-success text-white' : 'btn-light border'}`}
                    style={{ fontSize: '0.74rem', fontWeight: 600 }}
                    onClick={() => handleSelectRole(ROLES.PATIENT)}
                  >
                    Patient
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm py-1 px-2 ${role === ROLES.DOCTOR ? 'btn-primary text-white' : 'btn-light border'}`}
                    style={{ fontSize: '0.74rem', fontWeight: 600 }}
                    onClick={() => handleSelectRole(ROLES.DOCTOR)}
                  >
                    Doctor
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm py-1 px-2 ${role === ROLES.ADMIN ? 'btn-purple text-white' : 'btn-light border'}`}
                    style={role === ROLES.ADMIN ? { backgroundColor: '#7e22ce', borderColor: '#7e22ce', fontSize: '0.74rem', fontWeight: 600, color: '#fff' } : { fontSize: '0.74rem' }}
                    onClick={() => handleSelectRole(ROLES.ADMIN)}
                  >
                    Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Role Selection Modal (Matching Reference Screen 6) */}
      <RoleSelectionModal
        isOpen={showRoleSelectModal}
        onClose={() => setShowRoleSelectModal(false)}
      />
    </>
  );
};

export default Navbar;