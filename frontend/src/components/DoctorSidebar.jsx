import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRole, ROLES } from '../context/RoleContext';
import { useLanguage } from '../context/LanguageContext';
import { KoshikaLogoIcon } from './KoshikaLogo';
import RoleSelectionModal from './RoleSelectionModal';
import {
  LayoutDashboard,
  Users,
  FileText,
  Video,
  Calendar,
  Building2,
  Bell,
  Settings,
  User,
  ShieldCheck,
  LogOut,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Stethoscope,
  Clock,
  Briefcase
} from 'lucide-react';

const DoctorSidebar = ({
  mobileOpen,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, switchRole } = useAuth();
  const { role, setRole, unreadCount } = useRole();
  const { t } = useLanguage();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const profileRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Close on route transition
  useEffect(() => {
    setShowProfileMenu(false);
    if (onCloseMobile) onCloseMobile();
  }, [location.pathname]);

  const doctorName = user?.name
    ? (user.name.startsWith('Dr.') ? user.name : `Dr. ${user.name}`)
    : 'Dr. Mitesh Sawant';

  const userInitials = (user?.name ? user.name.replace('Dr. ', '') : 'MS').slice(0, 2).toUpperCase();

  return (
    <>
      <aside
        className={`doctor-sidebar ${mobileOpen ? 'mobile-open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        aria-label="Doctor Workspace Navigation"
      >
        {/* 1. Header / Branding */}
        <div className="doctor-sidebar-header">
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
              <Link to="/doctor" className="doctor-sidebar-brand" title="KOSHIKA Clinical Workspace">
                <div className="flex-shrink-0">
                  <KoshikaLogoIcon size={34} />
                </div>
                <div className="sidebar-hide-collapsed">
                  <div className="doctor-sidebar-brand-name">KOSHIKA</div>
                  <div className="doctor-sidebar-brand-sub">{t.brandTagline || 'Knowledge. Support. Hope.'}</div>
                </div>
              </Link>

              {/* Desktop Collapse Toggle */}
              <button
                type="button"
                className="btn btn-sm btn-light border-0 rounded-circle p-1.5 text-muted d-none d-lg-flex align-items-center justify-content-center hover-translate-y"
                onClick={onToggleCollapse}
                title="Hide sidebar for full screen view"
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

        {/* 2. Structured Clinical Navigation Sections */}
        <div className="doctor-sidebar-nav flex-grow-1 overflow-y-auto">
          {/* Section: OVERVIEW */}
          <div className="doctor-sidebar-section-title">{t.sidebarOverview || 'OVERVIEW'}</div>
          <NavLink
            to="/doctor"
            end
            className={({ isActive }) => `doctor-sidebar-link ${isActive ? 'active' : ''}`}
            title={t.navDashboard || "Dashboard"}
          >
            <LayoutDashboard size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navDashboard || "Dashboard"}</span>}
          </NavLink>

          {/* Section: CLINICAL CARE */}
          <div className="doctor-sidebar-section-title">{t.sidebarClinicalCare || 'CLINICAL CARE'}</div>
          <NavLink
            to="/doctor/patients"
            className={({ isActive }) =>
              `doctor-sidebar-link ${isActive || location.pathname.startsWith('/doctor/patients') ? 'active' : ''}`
            }
            title={t.navPatients || 'Patients'}
          >
            <Users size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navPatients || 'Patients'}</span>}
          </NavLink>

          <NavLink
            to="/doctor/reports"
            className={({ isActive }) => `doctor-sidebar-link ${isActive ? 'active' : ''}`}
            title={t.navReportsSignoff || 'Reports & Clinical Sign-off'}
          >
            <FileText size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navReportsSignoff || 'Reports & Clinical Sign-off'}</span>}
          </NavLink>

          <NavLink
            to="/doctor/consultations"
            className={({ isActive }) => `doctor-sidebar-link ${isActive ? 'active' : ''}`}
            title={t.navConsultations || 'Consultations'}
          >
            <Video size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navConsultations || 'Consultations'}</span>}
          </NavLink>

          <NavLink
            to="/doctor/appointments"
            className={({ isActive }) => `doctor-sidebar-link ${isActive ? 'active' : ''}`}
            title={t.navAppointments || 'Appointments'}
          >
            <Calendar size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navAppointments || 'Appointments'}</span>}
          </NavLink>

          {/* Section: RESOURCES */}
          <div className="doctor-sidebar-section-title">{t.sidebarResources || 'RESOURCES'}</div>
          <NavLink
            to="/doctor/banks"
            className={({ isActive }) => `doctor-sidebar-link ${isActive ? 'active' : ''}`}
            title={t.navDonorSearch || 'Biobank & Donor Search'}
          >
            <Building2 size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navDonorSearch || 'Biobank & Donor Search'}</span>}
          </NavLink>

          {/* Section: ACCOUNT */}
          <div className="doctor-sidebar-section-title">{t.sidebarAccount || 'ACCOUNT'}</div>
          <NavLink
            to="/doctor/profile"
            className={({ isActive }) => `doctor-sidebar-link ${isActive ? 'active' : ''}`}
            title={t.navDoctorProfile || 'Doctor Profile'}
          >
            <User size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navDoctorProfile || 'Doctor Profile'}</span>}
          </NavLink>
        </div>

        {/* 3. Bottom Utility Area & Doctor Profile Block */}
        <div className="doctor-sidebar-footer">
          {/* Notifications Link */}
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `doctor-sidebar-link py-2 d-flex align-items-center justify-content-between ${isActive ? 'active' : ''}`
            }
            title={t.notificationsTitle || 'Notifications'}
          >
            <div className="d-flex align-items-center gap-2.5">
              <Bell size={18} className="sidebar-icon" />
              {!isCollapsed && <span className="sidebar-hide-collapsed">{t.notificationsTitle || 'Notifications'}</span>}
            </div>
            {!isCollapsed && unreadCount > 0 && (
              <span className="badge rounded-pill bg-danger px-2 py-0.5 small" style={{ fontSize: '0.65rem' }}>
                {unreadCount}
              </span>
            )}
          </NavLink>

          {/* Settings Link */}
          <NavLink
            to="/doctor/profile"
            className={({ isActive }) =>
              `doctor-sidebar-link py-2 ${location.hash === '#settings' ? 'active' : ''}`
            }
            title={t.navPlatformSettings || 'Settings'}
          >
            <Settings size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navPlatformSettings || 'Settings'}</span>}
          </NavLink>

          {/* Compact Doctor Profile Block */}
          <div className="position-relative mt-1" ref={profileRef}>
            <button
              type="button"
              className="doctor-profile-card-trigger"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              aria-expanded={showProfileMenu}
              title={t.navDoctorProfile || 'Doctor Profile'}
            >
              <div className="d-flex align-items-center gap-2 overflow-hidden">
                <div
                  className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0 shadow-xs"
                  style={{
                    width: '34px',
                    height: '34px',
                    fontSize: '0.82rem',
                    background: 'linear-gradient(135deg, #0d9488 0%, #2563eb 100%)'
                  }}
                >
                  {userInitials}
                </div>
                {!isCollapsed && (
                  <div className="sidebar-hide-collapsed text-start overflow-hidden">
                    <div className="fw-bold text-dark small text-truncate" style={{ lineHeight: 1.15 }}>
                      {doctorName}
                    </div>
                    <span className="text-secondary d-block small mt-0.5" style={{ fontSize: '0.68rem' }}>
                      {t.attendingClinician || 'Attending Clinician'}
                    </span>
                  </div>
                )}
              </div>
              {!isCollapsed && <ChevronRight size={15} className="text-muted flex-shrink-0" />}
            </button>

            {/* Profile Menu Popover */}
            {showProfileMenu && (
              <div
                className="dropdown-menu show shadow-lg border-0 rounded-4 p-2.5 position-absolute bottom-100 start-0 mb-2 w-100"
                style={{ zIndex: 1060, minWidth: '230px', border: '1px solid #e2e8f0', animation: 'fadeIn 0.15s ease-out' }}
              >
                <div className="p-2 rounded-3 bg-light mb-2">
                  <div className="fw-bold text-dark small text-truncate">{doctorName}</div>
                  <div className="text-muted small" style={{ fontSize: '0.72rem' }}>
                    {t.role || 'Role'}: {t.attendingClinician || 'Attending Clinician'}
                  </div>
                </div>

                <div className="d-flex flex-column gap-1">
                  <Link
                    to="/doctor/profile"
                    className="dropdown-item rounded-3 py-1.5 px-2 d-flex align-items-center gap-2 small fw-semibold text-teal"
                    style={{ color: '#0d9488' }}
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User size={15} />
                    <span>{t.myProfile || 'My Profile'}</span>
                  </Link>

                  <Link
                    to="/doctor/profile"
                    className="dropdown-item rounded-3 py-1.5 px-2 d-flex align-items-center gap-2 small text-secondary fw-semibold"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Briefcase size={15} />
                    <span>{t.navDoctorProfile || 'Practice Information'}</span>
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
                    <span>{t.switchRole || 'Switch Role View...'}</span>
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
                    <span>{t.signOut || 'Logout'}</span>
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

export default DoctorSidebar;
