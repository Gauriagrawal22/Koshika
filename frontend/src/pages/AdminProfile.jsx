import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  Edit3,
  Save,
  X,
  Clock,
  CheckCircle2,
  ArrowLeft,
  Users,
  Database,
  Lock,
  KeyRound,
  Check,
  Copy,
  Laptop,
  MapPin,
  Stethoscope,
  BarChart3,
  UserCheck
} from 'lucide-react';

const AdminProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  const [adminData, setAdminData] = useState({
    name: user?.name || 'Devraj Saxena',
    adminId: 'ADM-8801',
    designation: 'Platform Operations Director',
    department: 'KOSHIKA System Administration',
    hospital: 'Narayana Health City, Bengaluru',
    location: 'Bengaluru, Karnataka',
    email: user?.email || 'admin.ops@koshika.org',
    phone: '+91 80 4965 5500',
    emergencyContact: '+91 98450 99887',
    roleTitle: 'System Administrator',
    memberSince: 'October 2025'
  });

  const [editForm, setEditForm] = useState({ ...adminData });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCopy = (text, field) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    showToast(`Copied ${field} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setAdminData({ ...editForm });
    setIsEditing(false);
    showToast('Admin profile updated successfully!');
  };

  const adminInitials = (adminData.name.slice(0, 2) || 'AD').toUpperCase();

  return (
    <div className="koshika-animate-fadein pb-5 mx-auto" style={{ maxWidth: '1200px' }}>
      {/* Toast Alert */}
      {toastMsg && (
        <div
          className="position-fixed bottom-0 end-0 m-4 p-3 rounded-4 shadow-lg text-white d-flex align-items-center gap-2"
          style={{ backgroundColor: '#0d9488', zIndex: 9999, animation: 'fadeIn 0.2s ease-out' }}
        >
          <CheckCircle2 size={18} />
          <span className="small fw-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Top Breadcrumb Navigation */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-2">
          <Link
            to="/admin"
            className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 text-secondary hover-translate-y"
            style={{ fontSize: '0.84rem' }}
          >
            <ArrowLeft size={15} />
            <span>Dashboard</span>
          </Link>
          <span className="text-muted small">/</span>
          <span className="text-dark small fw-semibold">Admin Profile</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge rounded-pill bg-success-subtle text-success px-3 py-1.5 small fw-semibold d-inline-flex align-items-center gap-1.5">
            <span className="rounded-circle bg-success" style={{ width: '6px', height: '6px' }} />
            Active Session
          </span>
        </div>
      </div>

      {/* 1. HERO IDENTITY CARD - CLEAN, SPACIOUS, VISUAL */}
      <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden mb-4" style={{ border: '1px solid #e2e8f0' }}>
        {/* Soft Modern Header Banner */}
        <div
          style={{
            height: '120px',
            background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)'
          }}
        />

        <div className="px-4 pb-4 position-relative">
          <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3" style={{ marginTop: '-50px' }}>
            {/* Avatar & Name Info */}
            <div className="d-flex align-items-end gap-3.5">
              <div className="position-relative flex-shrink-0">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                  style={{
                    width: '96px',
                    height: '96px',
                    background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 100%)',
                    fontSize: '2rem',
                    border: '4px solid #ffffff'
                  }}
                >
                  {adminInitials}
                </div>
                <span
                  className="position-absolute bottom-0 end-0 rounded-circle bg-success border border-white"
                  style={{ width: '18px', height: '18px', border: '3px solid #fff' }}
                  title="Online & Verified"
                />
              </div>

              <div className="mb-1">
                <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                  <h3 className="fw-bold text-dark mb-0" style={{ fontSize: '1.45rem', letterSpacing: '-0.02em' }}>
                    {adminData.name}
                  </h3>
                  <span className="badge rounded-pill px-2.5 py-1 small fw-bold" style={{ backgroundColor: '#f0fdfa', color: '#0d9488', border: '1px solid #ccfbf1' }}>
                    {adminData.roleTitle}
                  </span>
                </div>
                <p className="text-secondary small mb-0" style={{ fontSize: '0.88rem' }}>
                  {adminData.designation} &bull; <span className="text-muted">{adminData.hospital}</span>
                </p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className={`btn btn-sm rounded-pill px-3.5 py-2 fw-semibold d-inline-flex align-items-center gap-2 shadow-xs transition-all ${
                  isEditing ? 'btn-danger' : 'btn-dark'
                }`}
                style={{ fontSize: '0.84rem' }}
                onClick={() => {
                  setEditForm({ ...adminData });
                  setIsEditing(!isEditing);
                }}
              >
                {isEditing ? <X size={15} /> : <Edit3 size={15} />}
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="row g-2 mt-3 pt-3 border-top">
            <div className="col-6 col-md-3">
              <div className="p-2.5 rounded-3 bg-light border text-center">
                <span className="text-muted small d-block mb-0.5" style={{ fontSize: '0.72rem' }}>ADMIN ID</span>
                <span className="fw-bold text-dark font-monospace small">{adminData.adminId}</span>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-2.5 rounded-3 bg-light border text-center">
                <span className="text-muted small d-block mb-0.5" style={{ fontSize: '0.72rem' }}>ACCESS LEVEL</span>
                <span className="fw-bold text-teal small" style={{ color: '#0d9488' }}>Full Control</span>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-2.5 rounded-3 bg-light border text-center">
                <span className="text-muted small d-block mb-0.5" style={{ fontSize: '0.72rem' }}>AUTHENTICATION</span>
                <span className="fw-bold text-success small">2FA Active</span>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-2.5 rounded-3 bg-light border text-center">
                <span className="text-muted small d-block mb-0.5" style={{ fontSize: '0.72rem' }}>MEMBER SINCE</span>
                <span className="fw-bold text-dark small">{adminData.memberSince}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN SECTION: DETAILS & PERMISSIONS */}
      <div className="row g-4 align-items-stretch">
        {/* Left Column: Details & Edit Form */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4 h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
              <div>
                <h5 className="fw-bold text-dark mb-0.5" style={{ fontSize: '1.05rem' }}>
                  {isEditing ? 'Edit Profile Information' : 'Administrator Details'}
                </h5>
                <p className="text-muted small mb-0" style={{ fontSize: '0.8rem' }}>
                  {isEditing ? 'Update your official contact and facility details' : 'Official contact & operational directory record'}
                </p>
              </div>
              <span className="badge rounded-pill bg-light text-muted border px-2.5 py-1 small" style={{ fontSize: '0.74rem' }}>
                Verified Record
              </span>
            </div>

            {isEditing ? (
              <form onSubmit={handleSave}>
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-dark mb-1">Full Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-3"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-dark mb-1">Official Designation</label>
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-3"
                      value={editForm.designation}
                      onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-dark mb-1">Work Email</label>
                    <input
                      type="email"
                      className="form-control form-control-sm rounded-3"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-dark mb-1">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control form-control-sm rounded-3"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-dark mb-1">Department</label>
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-3"
                      value={editForm.department}
                      onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-dark mb-1">Operations Facility</label>
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-3"
                      value={editForm.hospital}
                      onChange={(e) => setEditForm({ ...editForm, hospital: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold text-dark mb-1">Emergency Operations Pager</label>
                    <input
                      type="tel"
                      className="form-control form-control-sm rounded-3"
                      value={editForm.emergencyContact}
                      onChange={(e) => setEditForm({ ...editForm, emergencyContact: e.target.value })}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                  <button
                    type="button"
                    className="btn btn-sm btn-light border rounded-pill px-3.5 py-1.5 fw-semibold"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm rounded-pill px-4 py-1.5 fw-semibold text-white d-inline-flex align-items-center gap-1.5 shadow-xs"
                    style={{ backgroundColor: '#0d9488' }}
                  >
                    <Save size={14} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="d-flex flex-column gap-3">
                {/* Visual Info Tiles */}
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <div className="p-3 rounded-3 bg-light border h-100">
                      <div className="d-flex align-items-center gap-2 text-muted mb-1" style={{ fontSize: '0.74rem' }}>
                        <Mail size={13} style={{ color: '#0d9488' }} />
                        <span className="fw-semibold text-uppercase">Work Email</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <strong className="text-dark small text-truncate" title={adminData.email}>
                          {adminData.email}
                        </strong>
                        <button
                          type="button"
                          className="btn btn-sm p-1 text-muted hover-lift"
                          title="Copy Email"
                          onClick={() => handleCopy(adminData.email, 'Email')}
                        >
                          {copiedField === 'Email' ? <Check size={13} className="text-success" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="p-3 rounded-3 bg-light border h-100">
                      <div className="d-flex align-items-center gap-2 text-muted mb-1" style={{ fontSize: '0.74rem' }}>
                        <Phone size={13} style={{ color: '#0d9488' }} />
                        <span className="fw-semibold text-uppercase">Phone Number</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <strong className="text-dark small">{adminData.phone}</strong>
                        <button
                          type="button"
                          className="btn btn-sm p-1 text-muted hover-lift"
                          title="Copy Phone"
                          onClick={() => handleCopy(adminData.phone, 'Phone')}
                        >
                          {copiedField === 'Phone' ? <Check size={13} className="text-success" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="p-3 rounded-3 bg-light border h-100">
                      <div className="d-flex align-items-center gap-2 text-muted mb-1" style={{ fontSize: '0.74rem' }}>
                        <Building2 size={13} style={{ color: '#0d9488' }} />
                        <span className="fw-semibold text-uppercase">Facility / Location</span>
                      </div>
                      <strong className="text-dark small d-block">{adminData.hospital}</strong>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="p-3 rounded-3 bg-light border h-100">
                      <div className="d-flex align-items-center gap-2 text-muted mb-1" style={{ fontSize: '0.74rem' }}>
                        <UserCheck size={13} style={{ color: '#0d9488' }} />
                        <span className="fw-semibold text-uppercase">Department</span>
                      </div>
                      <strong className="text-dark small d-block">{adminData.department}</strong>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact Bar */}
                <div className="p-3 rounded-3 border d-flex align-items-center justify-content-between" style={{ backgroundColor: '#f0fdfa', borderColor: '#ccfbf1' }}>
                  <div className="d-flex align-items-center gap-2.5">
                    <div className="rounded-circle p-1.5 bg-white text-teal shadow-xs" style={{ color: '#0d9488' }}>
                      <Phone size={14} />
                    </div>
                    <div>
                      <span className="small fw-bold text-dark d-block" style={{ fontSize: '0.82rem' }}>24/7 Incident Escalation Pager</span>
                      <span className="text-muted small" style={{ fontSize: '0.74rem' }}>Direct operations helpline for critical alerts</span>
                    </div>
                  </div>
                  <strong className="text-dark font-monospace small">{adminData.emergencyContact}</strong>
                </div>

                {/* Simple Platform Clearances */}
                <div className="mt-3 pt-3 border-top">
                  <div className="d-flex align-items-center justify-content-between mb-2.5">
                    <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                      Assigned Platform Privileges
                    </span>
                    <span className="badge rounded-pill bg-light text-muted border small" style={{ fontSize: '0.68rem' }}>
                      4 Enabled Modules
                    </span>
                  </div>

                  <div className="row g-2.5">
                    <div className="col-12 col-sm-6">
                      <div className="p-2.5 rounded-3 border d-flex align-items-center justify-content-between bg-white">
                        <div className="d-flex align-items-center gap-2">
                          <Users size={16} className="text-primary" />
                          <div>
                            <span className="fw-semibold text-dark small d-block" style={{ fontSize: '0.8rem' }}>Patient Registry</span>
                            <span className="text-muted small" style={{ fontSize: '0.7rem' }}>View &amp; manage patients</span>
                          </div>
                        </div>
                        <span className="badge rounded-pill bg-success-subtle text-success small" style={{ fontSize: '0.68rem' }}>
                          Active
                        </span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="p-2.5 rounded-3 border d-flex align-items-center justify-content-between bg-white">
                        <div className="d-flex align-items-center gap-2">
                          <Stethoscope size={16} className="text-teal" style={{ color: '#0d9488' }} />
                          <div>
                            <span className="fw-semibold text-dark small d-block" style={{ fontSize: '0.8rem' }}>Doctor Verification</span>
                            <span className="text-muted small" style={{ fontSize: '0.7rem' }}>Credentials &amp; licenses</span>
                          </div>
                        </div>
                        <span className="badge rounded-pill bg-success-subtle text-success small" style={{ fontSize: '0.68rem' }}>
                          Active
                        </span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="p-2.5 rounded-3 border d-flex align-items-center justify-content-between bg-white">
                        <div className="d-flex align-items-center gap-2">
                          <Building2 size={16} style={{ color: '#7e22ce' }} />
                          <div>
                            <span className="fw-semibold text-dark small d-block" style={{ fontSize: '0.8rem' }}>Stem Cell Biobanks</span>
                            <span className="text-muted small" style={{ fontSize: '0.7rem' }}>Cryo-vaults &amp; storage</span>
                          </div>
                        </div>
                        <span className="badge rounded-pill bg-success-subtle text-success small" style={{ fontSize: '0.68rem' }}>
                          Active
                        </span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="p-2.5 rounded-3 border d-flex align-items-center justify-content-between bg-white">
                        <div className="d-flex align-items-center gap-2">
                          <BarChart3 size={16} className="text-warning" />
                          <div>
                            <span className="fw-semibold text-dark small d-block" style={{ fontSize: '0.8rem' }}>Reports &amp; Audits</span>
                            <span className="text-muted small" style={{ fontSize: '0.7rem' }}>Platform governance logs</span>
                          </div>
                        </div>
                        <span className="badge rounded-pill bg-success-subtle text-success small" style={{ fontSize: '0.68rem' }}>
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Security, Activity & Quick Shortcuts */}
        <div className="col-12 col-lg-5">
          <div className="d-flex flex-column gap-3 h-100">
            {/* Security & Authentication Card */}
            <div className="card border-0 rounded-4 shadow-sm bg-white p-3.5" style={{ border: '1px solid #e2e8f0' }}>
              <div className="d-flex align-items-center justify-content-between pb-2 mb-2.5 border-bottom">
                <span className="fw-bold text-dark small d-flex align-items-center gap-1.5">
                  <ShieldCheck size={16} style={{ color: '#0d9488' }} />
                  <span>Security &amp; Account Protection</span>
                </span>
                <span className="badge rounded-pill bg-success-subtle text-success small" style={{ fontSize: '0.68rem' }}>
                  Secure
                </span>
              </div>

              <div className="d-flex flex-column gap-2 small">
                <div className="d-flex align-items-center justify-content-between p-2.5 rounded-3 bg-light border">
                  <div className="d-flex align-items-center gap-2">
                    <Lock size={14} className="text-teal" style={{ color: '#0d9488' }} />
                    <div>
                      <span className="fw-semibold text-dark d-block" style={{ fontSize: '0.8rem' }}>Two-Factor Authentication</span>
                      <span className="text-muted" style={{ fontSize: '0.7rem' }}>Authenticator App (TOTP)</span>
                    </div>
                  </div>
                  <strong className="text-success small">Enabled</strong>
                </div>

                <div className="d-flex align-items-center justify-content-between p-2.5 rounded-3 bg-light border">
                  <div className="d-flex align-items-center gap-2">
                    <KeyRound size={14} className="text-primary" />
                    <div>
                      <span className="fw-semibold text-dark d-block" style={{ fontSize: '0.8rem' }}>Password Status</span>
                      <span className="text-muted" style={{ fontSize: '0.7rem' }}>Last changed 14 days ago</span>
                    </div>
                  </div>
                  <strong className="text-muted small">Strong</strong>
                </div>

                <div className="d-flex align-items-center justify-content-between p-2.5 rounded-3 bg-light border">
                  <div className="d-flex align-items-center gap-2">
                    <ShieldCheck size={14} className="text-success" />
                    <div>
                      <span className="fw-semibold text-dark d-block" style={{ fontSize: '0.8rem' }}>HIPAA &amp; CDSCO QA</span>
                      <span className="text-muted" style={{ fontSize: '0.7rem' }}>Compliance standard met</span>
                    </div>
                  </div>
                  <strong className="text-success small">Verified</strong>
                </div>
              </div>
            </div>

            {/* Session & Device Activity */}
            <div className="card border-0 rounded-4 shadow-sm bg-white p-3.5" style={{ border: '1px solid #e2e8f0' }}>
              <span className="fw-bold text-dark small d-flex align-items-center gap-1.5 mb-2.5 pb-2 border-bottom">
                <Laptop size={16} className="text-muted" />
                <span>Current Session Info</span>
              </span>

              <div className="d-flex flex-column gap-2 small">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-muted" style={{ fontSize: '0.78rem' }}>Logged in from:</span>
                  <span className="fw-semibold text-dark d-flex align-items-center gap-1">
                    <MapPin size={12} className="text-danger" />
                    Bengaluru, India
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-muted" style={{ fontSize: '0.78rem' }}>Browser &amp; OS:</span>
                  <span className="fw-semibold text-dark">Chrome on Windows</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-muted" style={{ fontSize: '0.78rem' }}>Session Started:</span>
                  <span className="fw-semibold text-teal" style={{ color: '#0d9488' }}>Today, 09:30 AM</span>
                </div>
              </div>
            </div>

            {/* Quick Navigation to Settings */}
            <div className="p-3 rounded-4 border bg-light d-flex align-items-center justify-content-between mt-auto">
              <div>
                <span className="fw-semibold text-dark small d-block">System Configuration</span>
                <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Configure API keys, backups &amp; logs</span>
              </div>
              <Link
                to="/admin/settings"
                className="btn btn-sm btn-white border rounded-pill px-3 py-1.5 small fw-semibold text-teal hover-lift"
                style={{ color: '#0d9488' }}
              >
                Settings &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
