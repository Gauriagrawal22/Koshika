import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRole } from '../context/RoleContext';
import { useLanguage } from '../context/LanguageContext';
import { KoshikaLogoIcon } from './KoshikaLogo';
import { Menu, Bell, Globe, User } from 'lucide-react';

const PatientMobileHeader = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const { unreadCount, patientProfile } = useRole();
  const { currentLang } = useLanguage();

  const userInitials = (user?.name || patientProfile?.name || 'PT').slice(0, 2).toUpperCase();

  return (
    <header className="patient-mobile-header">
      {/* Left: Hamburger & Brand */}
      <div className="d-flex align-items-center gap-2.5">
        <button
          type="button"
          className="btn btn-sm btn-light border rounded-circle p-2 d-flex align-items-center justify-content-center"
          onClick={onToggleSidebar}
          aria-label="Open Navigation Menu"
          title="Open Menu"
        >
          <Menu size={18} className="text-dark" />
        </button>

        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <KoshikaLogoIcon size={28} />
          <span className="fw-bold text-dark fs-6" style={{ letterSpacing: '0.03em' }}>
            KOSHIKA
          </span>
        </Link>
      </div>

      {/* Right: Notifications & Profile Shortcut */}
      <div className="d-flex align-items-center gap-2">
        <Link
          to="/notifications"
          className="btn btn-sm btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center position-relative"
          style={{ width: '34px', height: '34px' }}
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={16} className="text-secondary" />
          {unreadCount > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: '0.6rem', padding: '0.2em 0.4em' }}
            >
              {unreadCount}
            </span>
          )}
        </Link>

        <Link
          to="/my-health/profile"
          className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold text-decoration-none shadow-xs"
          style={{
            width: '32px',
            height: '32px',
            fontSize: '0.78rem',
            background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)'
          }}
          title="My Profile"
        >
          {userInitials}
        </Link>
      </div>
    </header>
  );
};

export default PatientMobileHeader;
