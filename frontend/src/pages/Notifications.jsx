import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Bell,
  CheckCheck,
  FileText,
  Dna,
  Calendar,
  Clock,
  ArrowRight,
  BellOff,
  Sparkles,
  ShieldAlert,
  AlertCircle,
  Inbox
} from 'lucide-react';

const Notifications = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useRole();
  const { t } = useLanguage();
  const [filter, setFilter] = useState('ALL');

  const unreadCount = notifications.filter(n => !n.read).length;
  const reportsCount = notifications.filter(n => n.type === 'report').length;
  const matchesCount = notifications.filter(n => n.type === 'match').length;

  const filtered = notifications.filter(n => {
    if (filter === 'UNREAD') return !n.read;
    if (filter === 'REPORTS') return n.type === 'report';
    if (filter === 'MATCHES') return n.type === 'match';
    return true;
  });

  const getNotificationIcon = (type) => {
    if (type === 'report') return <FileText size={18} />;
    if (type === 'match') return <Dna size={18} />;
    if (type === 'appointment') return <Calendar size={18} />;
    return <Bell size={18} />;
  };

  const getNotificationStyles = (type) => {
    if (type === 'report') {
      return {
        bg: '#fffbeb',
        color: '#d97706',
        border: '#fef3c7',
        accent: '#f59e0b'
      };
    }
    if (type === 'match') {
      return {
        bg: '#ecfdf5',
        color: '#059669',
        border: '#a7f3d0',
        accent: '#10b981'
      };
    }
    if (type === 'appointment') {
      return {
        bg: '#eff6ff',
        color: '#2563eb',
        border: '#bfdbfe',
        accent: '#3b82f6'
      };
    }
    return {
      bg: '#f0fdfa',
      color: '#0d9488',
      border: '#ccfbf1',
      accent: '#0d9488'
    };
  };

  return (
    <div className="koshika-animate-fadein pb-5 mx-auto" style={{ maxWidth: '1200px' }}>
      {/* 1. Header Banner */}
      <div 
        className="card border-0 rounded-4 p-4 p-md-5 mb-4 text-white position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          boxShadow: '0 10px 30px -5px rgba(6, 78, 59, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#ffffff'
        }}
      >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-4 position-relative" style={{ zIndex: 2 }}>
          <div style={{ maxWidth: '640px' }}>
            <div className="d-flex align-items-center gap-2 mb-2.5 flex-wrap">
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-bold d-inline-flex align-items-center gap-1.5"
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <Bell size={13} />
                <span>COMMUNICATIONS &amp; ALERTS</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold"
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                {notifications.length} Total Alerts
              </span>
            </div>
            <h2 className="fw-extrabold text-white mb-2" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              {t.notificationsTitle || 'Notifications & Clinical Alerts'}
            </h2>
            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              {t.notificationsSub || 'Real-time updates on medical report parsing, donor compatibility matches, and clinical consultations.'}
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              className="btn btn-sm rounded-pill px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2 shadow-sm hover-translate-y flex-shrink-0 koshika-hero-action-btn"
              style={{
                backgroundColor: '#ffffff',
                color: '#064e3b',
                border: 'none',
                fontSize: '0.85rem'
              }}
              onClick={markAllNotificationsAsRead}
            >
              <CheckCheck size={16} color="currentColor" />
              <span>{t.markAllAsRead || 'Mark All as Read'}</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Visual KPI Overview Cards (Creative & Colorful) */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 rounded-4 p-3 shadow-xs h-100" style={{ border: '1px solid var(--k-border)', borderTop: '3px solid #0d9488' }}>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>TOTAL NOTICES</span>
              <Bell size={15} style={{ color: '#0d9488' }} />
            </div>
            <div className="fs-4 fw-bold text-dark">{notifications.length}</div>
            <span className="text-muted small" style={{ fontSize: '0.72rem' }}>All active messages</span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border-0 rounded-4 p-3 shadow-xs h-100" style={{ border: '1px solid var(--k-border)', borderTop: '3px solid #f59e0b' }}>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>UNREAD</span>
              <AlertCircle size={15} className="text-warning" />
            </div>
            <div className="fs-4 fw-bold" style={{ color: '#d97706' }}>{unreadCount}</div>
            <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Pending attention</span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border-0 rounded-4 p-3 shadow-xs h-100" style={{ border: '1px solid var(--k-border)', borderTop: '3px solid #3b82f6' }}>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>LAB REPORTS</span>
              <FileText size={15} className="text-primary" />
            </div>
            <div className="fs-4 fw-bold text-dark">{reportsCount}</div>
            <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Parsed &amp; verified</span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border-0 rounded-4 p-3 shadow-xs h-100" style={{ border: '1px solid var(--k-border)', borderTop: '3px solid #10b981' }}>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>HLA MATCHES</span>
              <Dna size={15} className="text-success" />
            </div>
            <div className="fs-4 fw-bold text-dark">{matchesCount}</div>
            <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Registry compatibility</span>
          </div>
        </div>
      </div>

      {/* 3. Filter Navigation Tabs */}
      <div className="card border-0 shadow-sm rounded-4 p-2.5 mb-3" style={{ border: '1px solid var(--k-border)' }}>
        <div className="d-flex flex-wrap gap-2">
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3.5 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5 transition-all ${
              filter === 'ALL' ? 'btn-dark shadow-xs' : 'btn-light border text-secondary'
            }`}
            style={{ fontSize: '0.8rem' }}
            onClick={() => setFilter('ALL')}
          >
            <span>{t.tabAllAlerts || 'All Alerts'}</span>
            <span className="badge rounded-pill bg-light text-dark ms-1" style={{ fontSize: '0.68rem' }}>
              {notifications.length}
            </span>
          </button>

          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3.5 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5 transition-all ${
              filter === 'UNREAD' ? 'text-white shadow-xs' : 'btn-light border text-secondary'
            }`}
            style={filter === 'UNREAD' ? { backgroundColor: '#d97706', fontSize: '0.8rem' } : { fontSize: '0.8rem' }}
            onClick={() => setFilter('UNREAD')}
          >
            <span>{t.tabUnread || 'Unread'}</span>
            <span className="badge rounded-pill bg-white text-dark ms-1" style={{ fontSize: '0.68rem' }}>
              {unreadCount}
            </span>
          </button>

          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3.5 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5 transition-all ${
              filter === 'REPORTS' ? 'btn-primary shadow-xs' : 'btn-light border text-secondary'
            }`}
            style={{ fontSize: '0.8rem' }}
            onClick={() => setFilter('REPORTS')}
          >
            <FileText size={13} />
            <span>{t.tabReports || 'Reports'}</span>
            <span className="badge rounded-pill bg-white text-dark ms-1" style={{ fontSize: '0.68rem' }}>
              {reportsCount}
            </span>
          </button>

          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3.5 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5 transition-all ${
              filter === 'MATCHES' ? 'text-white shadow-xs' : 'btn-light border text-secondary'
            }`}
            style={filter === 'MATCHES' ? { backgroundColor: '#059669', fontSize: '0.8rem' } : { fontSize: '0.8rem' }}
            onClick={() => setFilter('MATCHES')}
          >
            <Dna size={13} />
            <span>{t.tabMatches || 'Matches'}</span>
            <span className="badge rounded-pill bg-white text-dark ms-1" style={{ fontSize: '0.68rem' }}>
              {matchesCount}
            </span>
          </button>
        </div>
      </div>

      {/* 4. Creative Notification Cards List with Generous Spacing */}
      <div className="d-flex flex-column" style={{ gap: '14px' }}>
        {filtered.map((n) => {
          const style = getNotificationStyles(n.type);
          return (
            <div
              key={n.id}
              className="card border-0 transition-all shadow-xs hover-shadow"
              style={{
                backgroundColor: 'var(--k-surface)',
                padding: '18px 22px',
                borderRadius: '16px',
                border: '1px solid var(--k-border)',
                borderLeft: !n.read ? `4.5px solid ${style.accent}` : '1px solid var(--k-border)',
                cursor: 'pointer'
              }}
              onClick={() => markNotificationAsRead(n.id)}
            >
              <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-3">
                <div className="d-flex align-items-start" style={{ gap: '16px' }}>
                  {/* Category Icon Capsule */}
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0 shadow-xs"
                    style={{
                      backgroundColor: style.bg,
                      color: style.color,
                      border: `1px solid ${style.border}`,
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px'
                    }}
                  >
                    {getNotificationIcon(n.type)}
                  </div>

                  {/* Message Content */}
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1.5 flex-wrap">
                      <h6 className="fw-bold text-dark mb-0" style={{ fontSize: '0.96rem', letterSpacing: '-0.01em' }}>
                        {n.title}
                      </h6>
                      {!n.read && (
                        <span 
                          className="badge rounded-pill fw-bold" 
                          style={{ backgroundColor: '#fef3c7', color: '#b45309', fontSize: '0.68rem', padding: '3px 8px' }}
                        >
                          NEW
                        </span>
                      )}
                      <span className="text-muted small d-inline-flex align-items-center gap-1 font-monospace" style={{ fontSize: '0.74rem' }}>
                        <Clock size={12} className="text-muted" />
                        {n.time}
                      </span>
                    </div>
                    <p className="text-secondary mb-0" style={{ fontSize: '0.86rem', lineHeight: '1.5', maxWidth: '720px' }}>
                      {n.message}
                    </p>
                  </div>
                </div>

                {/* Action Link Button */}
                {n.link && (
                  <Link
                    to={n.link}
                    className="btn btn-sm rounded-pill px-3.5 py-2 flex-shrink-0 d-inline-flex align-items-center gap-1.5 fw-semibold hover-translate-y ms-auto ms-sm-0 shadow-xs"
                    style={{ backgroundColor: '#f0fdfa', border: '1px solid #ccfbf1', color: '#0d9488', fontSize: '0.82rem' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>View Details</span>
                    <ArrowRight size={14} color="#0d9488" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center text-muted" style={{ backgroundColor: 'var(--k-surface)', border: '1px solid var(--k-border)' }}>
            <div className="rounded-circle p-3 bg-light mx-auto mb-3" style={{ width: '56px', height: '56px', color: '#94a3b8' }}>
              <Inbox size={32} />
            </div>
            <h6 className="fw-bold text-dark mb-1">No alerts in this category</h6>
            <p className="text-secondary small mb-3">You're completely caught up with all clinical notifications.</p>
            <button
              type="button"
              className="btn btn-sm btn-light border rounded-pill px-3.5 py-1.5 mx-auto"
              style={{ fontSize: '0.8rem' }}
              onClick={() => setFilter('ALL')}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
