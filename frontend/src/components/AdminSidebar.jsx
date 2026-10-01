import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRole } from '../context/RoleContext';
import { useLanguage } from '../context/LanguageContext';
import { KoshikaLogoIcon } from './KoshikaLogo';
import RoleSelectionModal from './RoleSelectionModal';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Building2,
  FileText,
  Calendar,
  BarChart3,
  BookOpen,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  User,
  Sliders,
  Sparkles
} from 'lucide-react';

const AdminSidebar = ({
  mobileOpen,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { unreadCount } = useRole();
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

  const adminName = user?.name || 'System Administrator';
  const adminInitials = (adminName.slice(0, 2) || 'AD').toUpperCase();

  return (
    <>
      <aside
        className={`admin-sidebar ${mobileOpen ? 'mobile-open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        aria-label="Admin Platform Navigation"
      >
        {/* 1. Header / Branding */}
        <div className="admin-sidebar-header">
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
              <Link to="/admin" className="admin-sidebar-brand" title="KOSHIKA Platform Administration">
                <div className="flex-shrink-0">
                  <KoshikaLogoIcon size={34} />
                </div>
                <div className="sidebar-hide-collapsed">
                  <div className="admin-sidebar-brand-name">KOSHIKA</div>
                  <div className="admin-sidebar-brand-sub">{t.brandTagline || 'Knowledge. Support. Hope.'}</div>
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

        {/* 2. Structured Admin Navigation Sections */}
        <div className="admin-sidebar-nav flex-grow-1 overflow-y-auto">
          {/* Section: PLATFORM */}
          <div className="admin-sidebar-section-title">{t.sidebarPlatform || 'PLATFORM'}</div>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}
            title={t.navDashboard || 'Dashboard'}
          >
            <LayoutDashboard size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navDashboard || 'Dashboard'}</span>}
          </NavLink>

          {/* Section: MANAGEMENT */}
          <div className="admin-sidebar-section-title">{t.sidebarManagement || 'MANAGEMENT'}</div>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `admin-sidebar-link ${isActive || location.pathname.startsWith('/admin/users') ? 'active' : ''}`
            }
            title={t.navUserManagement || 'User Management'}
          >
            <Users size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navUserManagement || 'User Management'}</span>}
          </NavLink>

          <NavLink
            to="/admin/doctors"
            className={({ isActive }) =>
              `admin-sidebar-link ${isActive || location.pathname.startsWith('/admin/doctors') ? 'active' : ''}`
            }
            title={t.navDoctorCredentialing || 'Doctor Credentialing'}
          >
            <Stethoscope size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navDoctorCredentialing || 'Doctor Credentialing'}</span>}
          </NavLink>

          <NavLink
            to="/admin/banks"
            className={({ isActive }) =>
              `admin-sidebar-link ${isActive || location.pathname.startsWith('/admin/banks') ? 'active' : ''}`
            }
            title={t.navBiobankManagement || 'Biobank Management'}
          >
            <Building2 size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navBiobankManagement || 'Biobank Management'}</span>}
          </NavLink>

          {/* Section: COMPLIANCE */}
          <div className="admin-sidebar-section-title">{t.sidebarCompliance || 'COMPLIANCE'}</div>
          <NavLink
            to="/admin/activity"
            className={({ isActive }) =>
              `admin-sidebar-link ${isActive || location.pathname.startsWith('/admin/activity') ? 'active' : ''}`
            }
            title={t.navAuditCompliance || 'Audit & Compliance'}
          >
            <ShieldCheck size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navAuditCompliance || 'Audit & Compliance'}</span>}
          </NavLink>

          {/* Section: SYSTEM */}
          <div className="admin-sidebar-section-title">{t.sidebarSystem || 'SYSTEM'}</div>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `admin-sidebar-link ${isActive || location.pathname.startsWith('/admin/settings') ? 'active' : ''}`
            }
            title={t.navPlatformSettings || 'Platform Settings'}
          >
            <Settings size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navPlatformSettings || 'Platform Settings'}</span>}
          </NavLink>

          {/* Section: ACCOUNT */}
          <div className="admin-sidebar-section-title">{t.sidebarAccount || 'ACCOUNT'}</div>
          <NavLink
            to="/admin/profile"
            className={({ isActive }) =>
              `admin-sidebar-link ${isActive || location.pathname.startsWith('/admin/profile') ? 'active' : ''}`
            }
            title={t.navAdminProfile || 'Admin Profile'}
          >
            <User size={18} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-hide-collapsed">{t.navAdminProfile || 'Admin Profile'}</span>}
          </NavLink>
        </div>

        {/* 3. Bottom Utility Area & Admin Profile Block */}
        <div className="admin-sidebar-footer">
          {/* Admin Profile Block Trigger */}
          <div className="position-relative mt-1" ref={profileRef}>
            <button
              type="button"
              className="admin-profile-card-trigger"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              aria-expanded={showProfileMenu}
              title="Admin Profile & Access"
            >
              <div className="d-flex align-items-center gap-2 overflow-hidden">
                <div
                  className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0 shadow-xs"
                  style={{
                    width: '34px',
                    height: '34px',
                    fontSize: '0.82rem',
                    background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)'
                  }}
                >
                  {adminInitials}
                </div>
                {!isCollapsed && (
                  <div className="sidebar-hide-collapsed text-start overflow-hidden">
                    <div className="fw-bold text-dark small text-truncate" style={{ lineHeight: 1.15 }}>
                      {adminName}
                    </div>
                    <span className="text-secondary d-block small mt-0.5" style={{ fontSize: '0.68rem' }}>
                      {t.administrator || 'Administrator'}
                    </span>
                  </div>
                )}
              </div>
              {!isCollapsed && <ChevronRight size={15} className="text-muted flex-shrink-0" />}
            </button>

            {/* Profile Popover Menu */}
            {showProfileMenu && (
              <div
                className="dropdown-menu show shadow-lg border-0 rounded-4 p-2.5 position-absolute bottom-100 start-0 mb-2 w-100"
                style={{ zIndex: 1060, minWidth: '230px', border: '1px solid #e2e8f0', animation: 'fadeIn 0.15s ease-out' }}
              >
                <div className="p-2 rounded-3 bg-light mb-2">
                  <div className="fw-bold text-dark small text-truncate">{adminName}</div>
                  <div className="text-muted small" style={{ fontSize: '0.72rem' }}>
                    {t.role || 'Role'}: {t.administrator || 'Administrator'}
                  </div>
                </div>

                <div className="d-flex flex-column gap-1">
                  <Link
                    to="/admin/profile"
                    className="dropdown-item rounded-3 py-1.5 px-2 d-flex align-items-center gap-2 small fw-semibold text-teal"
                    style={{ color: '#0d9488' }}
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User size={15} />
                    <span>{t.navAdminProfile || 'Admin Profile'}</span>
                  </Link>

                  <Link
                    to="/admin/settings"
                    className="dropdown-item rounded-3 py-1.5 px-2 d-flex align-items-center gap-2 small text-secondary fw-semibold"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Sliders size={15} />
                    <span>{t.navPlatformSettings || 'System Settings'}</span>
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

export default AdminSidebar;
