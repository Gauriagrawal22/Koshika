import React, { useState, useMemo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useRole, ROLES } from '../context/RoleContext';
import { useAuth } from '../context/AuthContext';
import AnimatedTextBox from './common/AnimatedTextBox';
import {
  LayoutDashboard,
  HeartPulse,
  User,
  Clock,
  FileText,
  UploadCloud,
  Sparkles,
  Dna,
  Cpu,
  ShieldCheck,
  BookOpen,
  Hospital,
  Building2,
  Calendar,
  Bell,
  Box,
  Users,
  Microscope,
  FileSpreadsheet,
  Snowflake,
  ChevronDown,
  ChevronRight,
  Search,
  CheckCircle2,
  Flame,
  Activity,
  Layers
} from 'lucide-react';

const Sidebar = ({ mobileOpen, onCloseMobile }) => {
  const { role, unreadCount, patientProfile } = useRole();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchFilter, setSearchFilter] = useState('');

  // Collapsible sub-groups state
  const [openGroups, setOpenGroups] = useState({
    myHealth: true,
    reportsAI: true,
    stemCellCare: true,
    findCare: false,
    registry: true,
    biobank: true
  });

  const toggleGroup = (group) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const handleLinkClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleSearchSelect = (path) => {
    navigate(path);
    setSearchFilter('');
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="sidebar-backdrop d-lg-none"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`koshika-sidebar-modern ${mobileOpen ? 'mobile-open' : ''}`}>
        
        {/* Mobile Header Close */}
        {onCloseMobile && (
          <div className="d-lg-none d-flex justify-content-between align-items-center p-3 border-bottom">
            <div className="d-flex align-items-center gap-2">
              <Dna className="text-teal" size={20} />
              <span className="fw-bold text-dark small">Navigation Menu</span>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-light p-1 rounded-circle border"
              onClick={onCloseMobile}
              aria-label="Close sidebar"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        )}

        {/* Top: Modern Animated Search Text Box */}
        <div className="sidebar-search-box-container p-3 pb-2">
          <AnimatedTextBox
            name="sidebarSearch"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            icon={Search}
            placeholder="Search menu or records..."
            rotatingPlaceholders={[
              'Quick Jump: Dashboard',
              'Search Patients & Donors',
              'Search HLA Reports',
              'Find Biobank Cryo Storage',
              'Ask AI Assistant'
            ]}
            shortcut="⌘K"
            className="sidebar-animated-search"
          />
        </div>

        {/* Quick Filter Search Results Dropdown if user types */}
        {searchFilter.trim() && (
          <div className="sidebar-search-results-overlay mx-3 mb-2 p-2 rounded-3 shadow-md bg-white border">
            <div className="text-muted fw-bold px-2 py-1 text-uppercase" style={{ fontSize: '0.65rem' }}>
              Quick Navigation Matches
            </div>
            {[
              { label: 'Dashboard Overview', path: '/dashboard', icon: LayoutDashboard },
              { label: 'Patients & Staff Registry', path: '/patients', icon: Users },
              { label: 'Donor Compatibility Panel', path: '/donors', icon: HeartPulse },
              { label: 'Medical Reports & OCR', path: '/ocr-reports', icon: FileText },
              { label: 'Cryo Storage & Biobank', path: '/storage', icon: Snowflake },
              { label: 'Lab & Specimen Inventory', path: '/inventory', icon: Box },
              { label: 'Clinical AI Assistant', path: '/ai-assistant', icon: Sparkles },
              { label: 'Appointments & Consults', path: '/appointments', icon: Calendar },
              { label: 'Notifications Feed', path: '/notifications', icon: Bell },
            ]
              .filter(item => item.label.toLowerCase().includes(searchFilter.toLowerCase()))
              .map(item => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.path}
                    type="button"
                    className="sidebar-search-result-row w-100 text-start d-flex align-items-center gap-2 p-2 rounded-2 border-0 bg-transparent"
                    onClick={() => handleSearchSelect(item.path)}
                  >
                    <IconComponent size={14} className="text-teal" />
                    <span className="small text-dark fw-semibold">{item.label}</span>
                  </button>
                );
              })}
          </div>
        )}

        {/* Scrollable Navigation Menus */}
        <div className="sidebar-scrollable flex-grow-1 px-3 py-2">
          
          {/* =========================================================
              1. PATIENT PERSPECTIVE
          ========================================================== */}
          {role === ROLES.PATIENT && (
            <div className="sidebar-nav-group-wrapper">
              
              {/* Category: CORE */}
              <div className="sidebar-section-header">
                <span>CORE WORKSPACE</span>
              </div>

              {/* Dashboard Item */}
              <NavLink
                to="/"
                end
                onClick={handleLinkClick}
                className={({ isActive }) => `modern-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <div className="nav-icon-badge dashboard">
                    <LayoutDashboard size={17} />
                  </div>
                  <span className="nav-item-title">Dashboard</span>
                </div>
                <div className="nav-item-glow-line"></div>
              </NavLink>

              {/* Group 1: My Health */}
              <div className="modern-nav-accordion">
                <button
                  type="button"
                  className={`accordion-trigger ${openGroups.myHealth ? 'is-open' : ''}`}
                  onClick={() => toggleGroup('myHealth')}
                >
                  <div className="nav-item-left">
                    <div className="nav-icon-badge health">
                      <HeartPulse size={17} />
                    </div>
                    <span className="nav-item-title">My Health</span>
                  </div>
                  <ChevronDown size={15} className="accordion-chevron" />
                </button>

                {openGroups.myHealth && (
                  <div className="accordion-sub-panel">
                    <NavLink
                      to="/my-health/profile"
                      onClick={handleLinkClick}
                      className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
                    >
                      <span className="sub-nav-bullet"></span>
                      <span>Patient Profile</span>
                    </NavLink>
                    <NavLink
                      to="/my-health/history"
                      onClick={handleLinkClick}
                      className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
                    >
                      <span className="sub-nav-bullet"></span>
                      <span>Medical History</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Category: INTELLIGENCE & CARE */}
              <div className="sidebar-section-header mt-3">
                <span>REPORTS &amp; GENOMICS</span>
              </div>

              {/* Group 2: Reports & AI */}
              <div className="modern-nav-accordion">
                <button
                  type="button"
                  className={`accordion-trigger ${openGroups.reportsAI ? 'is-open' : ''}`}
                  onClick={() => toggleGroup('reportsAI')}
                >
                  <div className="nav-item-left">
                    <div className="nav-icon-badge reports">
                      <FileText size={17} />
                    </div>
                    <span className="nav-item-title">Reports &amp; AI</span>
                  </div>
                  <ChevronDown size={15} className="accordion-chevron" />
                </button>

                {openGroups.reportsAI && (
                  <div className="accordion-sub-panel">
                    <NavLink
                      to="/ocr-reports?tab=upload"
                      onClick={handleLinkClick}
                      className={({ isActive }) => `sub-nav-item ${isActive && (!location.search || location.search.includes('tab=upload')) ? 'active' : ''}`}
                    >
                      <span className="sub-nav-bullet"></span>
                      <span>Upload Report</span>
                    </NavLink>
                    <NavLink
                      to="/ocr-reports?tab=insights"
                      onClick={handleLinkClick}
                      className={({ isActive }) => `sub-nav-item ${isActive && location.search.includes('tab=insights') ? 'active' : ''}`}
                    >
                      <span className="sub-nav-bullet"></span>
                      <span>AI Report Insights</span>
                      <span className="badge-micro-ai">AI</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Group 3: Stem Cell Care */}
              <div className="modern-nav-accordion">
                <button
                  type="button"
                  className={`accordion-trigger ${openGroups.stemCellCare ? 'is-open' : ''}`}
                  onClick={() => toggleGroup('stemCellCare')}
                >
                  <div className="nav-item-left">
                    <div className="nav-icon-badge stemcell">
                      <Dna size={17} />
                    </div>
                    <span className="nav-item-title">Stem Cell Care</span>
                  </div>
                  <ChevronDown size={15} className="accordion-chevron" />
                </button>

                {openGroups.stemCellCare && (
                  <div className="accordion-sub-panel">
                    <NavLink
                      to="/ml-match"
                      onClick={handleLinkClick}
                      className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
                    >
                      <span className="sub-nav-bullet"></span>
                      <span>Stem Cell Matching</span>
                    </NavLink>
                    <NavLink
                      to="/preliminary-assessment"
                      onClick={handleLinkClick}
                      className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
                    >
                      <span className="sub-nav-bullet"></span>
                      <span>Preliminary Assessment</span>
                    </NavLink>
                    <NavLink
                      to="/awareness"
                      onClick={handleLinkClick}
                      className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
                    >
                      <span className="sub-nav-bullet"></span>
                      <span>Stem Cell Knowledge</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Group 4: Find Care */}
              <div className="modern-nav-accordion">
                <button
                  type="button"
                  className={`accordion-trigger ${openGroups.findCare ? 'is-open' : ''}`}
                  onClick={() => toggleGroup('findCare')}
                >
                  <div className="nav-item-left">
                    <div className="nav-icon-badge findcare">
                      <Hospital size={17} />
                    </div>
                    <span className="nav-item-title">Find Care</span>
                  </div>
                  <ChevronDown size={15} className="accordion-chevron" />
                </button>

                {openGroups.findCare && (
                  <div className="accordion-sub-panel">
                    <NavLink
                      to="/find-care/doctors"
                      onClick={handleLinkClick}
                      className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
                    >
                      <span className="sub-nav-bullet"></span>
                      <span>Doctors &amp; BMT Leads</span>
                    </NavLink>
                    <NavLink
                      to="/find-care/centres"
                      onClick={handleLinkClick}
                      className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
                    >
                      <span className="sub-nav-bullet"></span>
                      <span>Hospitals &amp; Centres</span>
                    </NavLink>
                    <NavLink
                      to="/bank"
                      onClick={handleLinkClick}
                      className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
                    >
                      <span className="sub-nav-bullet"></span>
                      <span>Stem Cell Banks</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Category: ENGAGEMENT */}
              <div className="sidebar-section-header mt-3">
                <span>CONNECTIVITY</span>
              </div>

              {/* Appointments */}
              <NavLink
                to="/appointments"
                onClick={handleLinkClick}
                className={({ isActive }) => `modern-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <div className="nav-icon-badge calendar">
                    <Calendar size={17} />
                  </div>
                  <span className="nav-item-title">Appointments</span>
                </div>
                <div className="nav-item-glow-line"></div>
              </NavLink>

              {/* Notifications */}
              <NavLink
                to="/notifications"
                onClick={handleLinkClick}
                className={({ isActive }) => `modern-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <div className="nav-icon-badge bell">
                    <Bell size={17} />
                  </div>
                  <span className="nav-item-title">Notifications</span>
                </div>
                {unreadCount > 0 && (
                  <span className="modern-pulse-badge">
                    <span className="pulse-dot"></span>
                    <span>{unreadCount}</span>
                  </span>
                )}
                <div className="nav-item-glow-line"></div>
              </NavLink>

            </div>
          )}

          {/* =========================================================
              2. CLINICIAN / DOCTOR PERSPECTIVE
          ========================================================== */}
          {role === ROLES.DOCTOR && (
            <div className="sidebar-nav-group-wrapper">
              <div className="sidebar-section-header">
                <span>CLINICIAN DESK</span>
              </div>

              <NavLink
                to="/doctor"
                end
                onClick={handleLinkClick}
                className={({ isActive }) => `modern-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <div className="nav-icon-badge doctor">
                    <LayoutDashboard size={17} />
                  </div>
                  <span className="nav-item-title">Doctor Dashboard</span>
                </div>
                <div className="nav-item-glow-line"></div>
              </NavLink>

              <NavLink
                to="/patients"
                onClick={handleLinkClick}
                className={({ isActive }) => `modern-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <div className="nav-icon-badge health">
                    <Users size={17} />
                  </div>
                  <span className="nav-item-title">Patients Registry</span>
                </div>
                <span className="badge-count-pill">1,482</span>
                <div className="nav-item-glow-line"></div>
              </NavLink>

              <NavLink
                to="/ocr-reports"
                onClick={handleLinkClick}
                className={({ isActive }) => `modern-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <div className="nav-icon-badge reports">
                    <FileText size={17} />
                  </div>
                  <span className="nav-item-title">Medical Reports</span>
                </div>
                <div className="nav-item-glow-line"></div>
              </NavLink>

              <NavLink
                to="/ml-match"
                onClick={handleLinkClick}
                className={({ isActive }) => `modern-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <div className="nav-icon-badge stemcell">
                    <Cpu size={17} />
                  </div>
                  <span className="nav-item-title">HLA Match Engine</span>
                </div>
                <span className="badge-micro-ai">ML</span>
                <div className="nav-item-glow-line"></div>
              </NavLink>

              <NavLink
                to="/appointments"
                onClick={handleLinkClick}
                className={({ isActive }) => `modern-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <div className="nav-icon-badge calendar">
                    <Calendar size={17} />
                  </div>
                  <span className="nav-item-title">Consultations</span>
                </div>
                <div className="nav-item-glow-line"></div>
              </NavLink>

              <NavLink
                to="/ai-assistant"
                onClick={handleLinkClick}
                className={({ isActive }) => `modern-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <div className="nav-icon-badge stemcell">
                    <Sparkles size={17} />
                  </div>
                  <span className="nav-item-title">Clinical AI Chat</span>
                </div>
                <div className="nav-item-glow-line"></div>
              </NavLink>
            </div>
          )}

          {/* =========================================================
              3. BIOBANK / ADMIN PERSPECTIVE
          ========================================================== */}
          {role === ROLES.ADMIN && (
            <div className="sidebar-nav-group-wrapper">
              <div className="sidebar-section-header">
                <span>OPERATIONS &amp; GOVERNANCE</span>
              </div>

              <NavLink
                to="/admin"
                end
                onClick={handleLinkClick}
                className={({ isActive }) => `modern-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <div className="nav-icon-badge admin">
                    <LayoutDashboard size={17} />
                  </div>
                  <span className="nav-item-title">Admin Dashboard</span>
                </div>
                <div className="nav-item-glow-line"></div>
              </NavLink>

              <NavLink
                to="/donors"
                onClick={handleLinkClick}
                className={({ isActive }) => `modern-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <div className="nav-icon-badge health">
                    <HeartPulse size={17} />
                  </div>
                  <span className="nav-item-title">Donor Registry</span>
                </div>
                <div className="nav-item-glow-line"></div>
              </NavLink>

              <NavLink
                to="/storage"
                onClick={handleLinkClick}
                className={({ isActive }) => `modern-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <div className="nav-icon-badge findcare">
                    <Snowflake size={17} />
                  </div>
                  <span className="nav-item-title">Cryo Storage</span>
                </div>
                <span className="badge-temp-pill">-196°C</span>
                <div className="nav-item-glow-line"></div>
              </NavLink>

              <NavLink
                to="/inventory"
                onClick={handleLinkClick}
                className={({ isActive }) => `modern-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <div className="nav-icon-badge reports">
                    <Box size={17} />
                  </div>
                  <span className="nav-item-title">Lab Inventory</span>
                </div>
                <div className="nav-item-glow-line"></div>
              </NavLink>

              <NavLink
                to="/staff"
                onClick={handleLinkClick}
                className={({ isActive }) => `modern-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <div className="nav-icon-badge calendar">
                    <Users size={17} />
                  </div>
                  <span className="nav-item-title">Staff &amp; Doctors</span>
                </div>
                <div className="nav-item-glow-line"></div>
              </NavLink>

              <NavLink
                to="/reports"
                onClick={handleLinkClick}
                className={({ isActive }) => `modern-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <div className="nav-icon-badge stemcell">
                    <FileSpreadsheet size={17} />
                  </div>
                  <span className="nav-item-title">Official Reports</span>
                </div>
                <div className="nav-item-glow-line"></div>
              </NavLink>
            </div>
          )}

        </div>

        {/* Bottom User Card / Telemetry Status */}
        <div className="sidebar-bottom-status-card p-3 border-top">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2.5">
              <div className="user-avatar-mini">
                {(user?.name || patientProfile.name || 'MS').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="user-name-mini text-truncate" style={{ maxWidth: '135px' }}>
                  {user?.name || patientProfile.name}
                </div>
                <div className="user-role-mini text-truncate">
                  {role.toUpperCase()} • Telemetry Active
                </div>
              </div>
            </div>
            <div className="live-pulse-indicator" title="Connected to Real-time Cryo & ML Telemetry">
              <span className="live-dot"></span>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
