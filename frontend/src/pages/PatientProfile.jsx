import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRole, ROLES } from '../context/RoleContext';
import { useAuth } from '../context/AuthContext';
import DoctorProfile from './DoctorProfile';
import AdminProfile from './AdminProfile';
import {
  User,
  Heart,
  Activity,
  Edit3,
  Save,
  X,
  Dna,
  Building2,
  Phone,
  CheckCircle2,
  Droplet,
  ArrowLeft,
  Sparkles,
  Calendar,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const PatientProfile = () => {
  const { role, patientProfile, setPatientProfile } = useRole();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...patientProfile });
  const [toastMsg, setToastMsg] = useState(null);

  // If active user is an Admin, strictly render the Admin Profile
  if (role === ROLES.ADMIN) {
    return <AdminProfile />;
  }

  // If active user is a Doctor, strictly render the Doctor Profile
  if (role === ROLES.DOCTOR) {
    return <DoctorProfile />;
  }

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setPatientProfile(formData);
    setIsEditing(false);
    showToast('Health profile updated successfully!');
  };

  return (
    <div className="koshika-animate-fadein pb-4 mx-auto" style={{ maxWidth: '1200px' }}>
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

      {/* Top Back Navigation Bar */}
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-2">
          <Link
            to="/"
            className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 text-muted hover-translate-y"
            style={{ fontSize: '0.82rem' }}
          >
            <ArrowLeft size={14} />
            <span>Dashboard</span>
          </Link>
          <span className="text-muted small">/</span>
          <span className="text-dark small fw-semibold">Patient Profile</span>
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <Link
            to="/my-health/history"
            className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 small fw-semibold shadow-xs"
            style={{ fontSize: '0.82rem' }}
          >
            <Activity size={14} />
            <span>Medical History Timeline</span>
          </Link>
          <span className="badge rounded-pill bg-success-subtle text-success px-3 py-1.5 small fw-semibold">
            ● Verified Active Patient Record
          </span>
        </div>
      </div>

      {/* BALANCED 2-COLUMN PROFILE LAYOUT (FITS PAGE, NO EMPTY SPACE) */}
      <div className="row g-4 align-items-stretch">
        {/* Left Column: Identity & Bio Card */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden h-100" style={{ border: '1px solid #e2e8f0' }}>
            {/* Gradient Accent Cover */}
            <div
              style={{
                height: '110px',
                background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)'
              }}
            />

            <div className="px-4 pb-4 position-relative text-center">
              {/* Avatar with Glow Ring */}
              <div className="d-flex justify-content-center" style={{ marginTop: '-48px' }}>
                <div className="position-relative">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow"
                    style={{
                      width: '92px',
                      height: '92px',
                      background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 100%)',
                      fontSize: '1.9rem',
                      border: '4px solid #ffffff'
                    }}
                  >
                    {formData.name?.slice(0, 2).toUpperCase() || 'MS'}
                  </div>
                  <span
                    className="position-absolute bottom-0 end-0 rounded-circle border border-white bg-success"
                    style={{ width: '16px', height: '16px', border: '2px solid #fff' }}
                    title="Active Verified"
                  />
                </div>
              </div>

              {/* Name & Primary Role */}
              <h4 className="fw-bold text-dark mt-2 mb-0.5" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em' }}>
                {formData.name}
              </h4>
              <p className="text-secondary small mb-2" style={{ fontSize: '0.84rem' }}>
                {formData.age} Years • ID: <strong className="text-dark">{formData.patientId || 'PT-9042'}</strong>
              </p>

              {/* Key Badges */}
              <div className="d-flex justify-content-center align-items-center gap-1.5 flex-wrap mb-3">
                <span className="badge rounded-pill px-2.5 py-1 small fw-bold" style={{ backgroundColor: '#fff1f2', color: '#e11d48' }}>
                  Blood: {formData.bloodGroup}
                </span>
                <span className="badge rounded-pill px-2.5 py-1 small fw-bold" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                  10/10 HLA
                </span>
                <span className="badge rounded-pill px-2.5 py-1 small fw-semibold" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                  CR1 Remission
                </span>
              </div>

              {/* Edit Toggle Button */}
              <button
                type="button"
                className={`btn btn-sm rounded-pill w-100 py-2 fw-semibold d-inline-flex align-items-center justify-content-center gap-1.5 shadow-xs transition-all ${
                  isEditing ? 'btn-danger' : 'btn-light border'
                }`}
                style={{ fontSize: '0.82rem' }}
                onClick={() => {
                  setFormData({ ...patientProfile });
                  setIsEditing(!isEditing);
                }}
              >
                {isEditing ? <X size={15} /> : <Edit3 size={15} />}
                <span>{isEditing ? 'Cancel Editing' : 'Edit Demographics'}</span>
              </button>

              {/* Quick Facility Tag */}
              <div className="mt-3 pt-3 border-top text-start">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <Building2 size={16} style={{ color: '#0d9488' }} />
                  <span className="small fw-bold text-dark">{formData.hospital}</span>
                </div>
                <span className="text-muted d-block small mb-3" style={{ fontSize: '0.76rem' }}>
                  Primary Oncologist: <strong className="text-dark">{formData.primaryDoctor}</strong>
                </span>

                {/* My Health: Medical History Timeline */}
                <div className="p-2.5 rounded-3 border" style={{ backgroundColor: '#f0fdfa', borderColor: '#ccfbf1' }}>
                  <div className="text-uppercase fw-bold text-muted mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.04em' }}>
                    My Health Journey
                  </div>
                  <Link
                    to="/my-health/history"
                    className="d-flex align-items-center justify-content-between text-decoration-none fw-semibold small text-teal hover-translate-y"
                    style={{ color: '#0d9488' }}
                  >
                    <div className="d-flex align-items-center gap-1.5">
                      <Activity size={14} />
                      <span>Medical History &amp; Timeline</span>
                    </div>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 6 Creative Colorful Info Tiles OR Edit Form */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4 h-100 d-flex flex-column justify-content-between" style={{ border: '1px solid #e2e8f0' }}>
            <div>
              <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                <h5 className="fw-bold text-dark mb-0 fs-6">
                  {isEditing ? 'Update Patient Demographics' : 'Clinical Health & Genetic Overview'}
                </h5>
                <span className="text-muted small" style={{ fontSize: '0.78rem' }}>
                  {isEditing ? 'Make sure all details match hospital ID' : 'Synchronized with hospital EHR'}
                </span>
              </div>

              {isEditing ? (
                /* Clean Edit Form */
                <form onSubmit={handleSave}>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-dark mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        className="form-control rounded-3 small"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-dark mb-1">Age (Years)</label>
                      <input
                        type="number"
                        className="form-control rounded-3 small"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-dark mb-1">Blood Group</label>
                      <select
                        className="form-select rounded-3 small"
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      >
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-dark mb-1">Primary Condition / Diagnosis</label>
                      <input
                        type="text"
                        className="form-control rounded-3 small"
                        value={formData.condition}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-dark mb-1">Remission Status</label>
                      <input
                        type="text"
                        className="form-control rounded-3 small"
                        value={formData.remissionStatus}
                        onChange={(e) => setFormData({ ...formData, remissionStatus: e.target.value })}
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-dark mb-1">Emergency Contact Phone</label>
                      <input
                        type="text"
                        className="form-control rounded-3 small"
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-2 pt-3 border-top mt-3">
                    <button
                      type="button"
                      className="btn btn-sm btn-light border rounded-pill px-3.5 py-1.5"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-sm text-white rounded-pill px-4 py-1.5 fw-bold shadow-xs"
                      style={{ backgroundColor: '#0d9488' }}
                    >
                      <Save size={14} className="me-1 inline" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* 6 CREATIVE COLORFUL TILES (FIT, LESS TEXT, VISUALLY RICH) */
                <div className="row g-3">
                  {/* Tile 1: Blood Group (Rose) */}
                  <div className="col-12 col-sm-6">
                    <div
                      className="p-3.5 rounded-4 transition-all hover-translate-y h-100"
                      style={{ backgroundColor: '#fff1f2', border: '1px solid #fecdd3' }}
                    >
                      <div className="d-flex align-items-center gap-2.5 mb-1.5">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center text-white flex-shrink-0"
                          style={{ width: '36px', height: '36px', backgroundColor: '#e11d48' }}
                        >
                          <Droplet size={18} />
                        </div>
                        <div>
                          <span className="text-uppercase fw-bold text-muted d-block" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                            Blood Group
                          </span>
                          <strong className="text-danger fs-6 d-block lh-1">{formData.bloodGroup} Rh(D) Positive</strong>
                        </div>
                      </div>
                      <span className="small text-secondary" style={{ fontSize: '0.78rem' }}>
                        Universal Recipient Plasma
                      </span>
                    </div>
                  </div>

                  {/* Tile 2: HLA Concordance (Emerald) */}
                  <div className="col-12 col-sm-6">
                    <div
                      className="p-3.5 rounded-4 transition-all hover-translate-y h-100"
                      style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0' }}
                    >
                      <div className="d-flex align-items-center gap-2.5 mb-1.5">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center text-white flex-shrink-0"
                          style={{ width: '36px', height: '36px', backgroundColor: '#059669' }}
                        >
                          <Dna size={18} />
                        </div>
                        <div>
                          <span className="text-uppercase fw-bold text-muted d-block" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                            HLA Concordance
                          </span>
                          <strong className="text-success fs-6 d-block lh-1">10 / 10 Alleles Match</strong>
                        </div>
                      </div>
                      <span className="small text-secondary" style={{ fontSize: '0.78rem' }}>
                        High-Resolution Concordant
                      </span>
                    </div>
                  </div>

                  {/* Tile 3: Condition (Teal) */}
                  <div className="col-12 col-sm-6">
                    <div
                      className="p-3.5 rounded-4 transition-all hover-translate-y h-100"
                      style={{ backgroundColor: '#f0fdfa', border: '1px solid #ccfbf1' }}
                    >
                      <div className="d-flex align-items-center gap-2.5 mb-1.5">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center text-white flex-shrink-0"
                          style={{ width: '36px', height: '36px', backgroundColor: '#0d9488' }}
                        >
                          <Heart size={18} />
                        </div>
                        <div>
                          <span className="text-uppercase fw-bold text-muted d-block" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                            Primary Condition
                          </span>
                          <strong className="text-dark fs-6 d-block lh-1 text-truncate">{formData.condition}</strong>
                        </div>
                      </div>
                      <span className="small text-secondary" style={{ fontSize: '0.78rem' }}>
                        Allogeneic Stem Cell Protocol
                      </span>
                    </div>
                  </div>

                  {/* Tile 4: Remission (Blue) */}
                  <div className="col-12 col-sm-6">
                    <div
                      className="p-3.5 rounded-4 transition-all hover-translate-y h-100"
                      style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}
                    >
                      <div className="d-flex align-items-center gap-2.5 mb-1.5">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center text-white flex-shrink-0"
                          style={{ width: '36px', height: '36px', backgroundColor: '#2563eb' }}
                        >
                          <Activity size={18} />
                        </div>
                        <div>
                          <span className="text-uppercase fw-bold text-muted d-block" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                            Remission Stage
                          </span>
                          <strong className="text-primary fs-6 d-block lh-1 text-truncate">{formData.remissionStatus}</strong>
                        </div>
                      </div>
                      <span className="small text-secondary" style={{ fontSize: '0.78rem' }}>
                        Blast Count &lt; 5% (Controlled)
                      </span>
                    </div>
                  </div>

                  {/* Tile 5: Hospital (Purple) */}
                  <div className="col-12 col-sm-6">
                    <div
                      className="p-3.5 rounded-4 transition-all hover-translate-y h-100"
                      style={{ backgroundColor: '#faf5ff', border: '1px solid #ddd6fe' }}
                    >
                      <div className="d-flex align-items-center gap-2.5 mb-1.5">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center text-white flex-shrink-0"
                          style={{ width: '36px', height: '36px', backgroundColor: '#7c3aed' }}
                        >
                          <Building2 size={18} />
                        </div>
                        <div>
                          <span className="text-uppercase fw-bold text-muted d-block" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                            Attending Centre
                          </span>
                          <strong className="text-dark fs-6 d-block lh-1 text-truncate">Mazumdar Shaw BMT</strong>
                        </div>
                      </div>
                      <span className="small text-secondary" style={{ fontSize: '0.78rem' }}>
                        Lead: {formData.primaryDoctor}
                      </span>
                    </div>
                  </div>

                  {/* Tile 6: Emergency Contact (Amber) */}
                  <div className="col-12 col-sm-6">
                    <div
                      className="p-3.5 rounded-4 transition-all hover-translate-y h-100"
                      style={{ backgroundColor: '#fffbeb', border: '1px solid #fef3c7' }}
                    >
                      <div className="d-flex align-items-center gap-2.5 mb-1.5">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center text-white flex-shrink-0"
                          style={{ width: '36px', height: '36px', backgroundColor: '#d97706' }}
                        >
                          <Phone size={18} />
                        </div>
                        <div>
                          <span className="text-uppercase fw-bold text-muted d-block" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                            Emergency Contact
                          </span>
                          <strong className="text-dark fs-6 d-block lh-1 font-monospace">{formData.emergencyContact}</strong>
                        </div>
                      </div>
                      <span className="small text-secondary" style={{ fontSize: '0.78rem' }}>
                        Next-of-Kin (SMS Notifications Active)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Subtle Footer Bar */}
            <div className="pt-3 mt-3 border-top d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div className="d-flex align-items-center gap-2">
                <Sparkles size={16} style={{ color: '#0d9488' }} />
                <span className="small text-muted">
                  AI Stem Cell Assessment: <strong className="text-teal" style={{ color: '#0d9488' }}>Verified &amp; Active</strong>
                </span>
              </div>
              <Link
                to="/preliminary-assessment"
                className="btn btn-sm btn-light border rounded-pill px-3 py-1 small fw-semibold text-teal hover-translate-y"
                style={{ fontSize: '0.78rem', color: '#0d9488' }}
              >
                Review Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
