import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Stethoscope,
  Building2,
  Phone,
  Mail,
  Edit3,
  Save,
  X,
  Clock,
  Award,
  CheckCircle2,
  ArrowLeft,
  Activity,
  ShieldCheck,
  Users
} from 'lucide-react';

const DoctorProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const [doctorData, setDoctorData] = useState({
    name: user?.name?.startsWith('Dr.') ? user.name : 'Dr. Sharat Damodar, MD, DM',
    registrationNumber: 'KMC-88421 • MCI Certified',
    designation: 'Clinical Director & Head of Haematology & BMT',
    department: 'Haematology & Bone Marrow Transplant',
    hospital: 'Mazumdar Shaw Cancer Centre, Narayana Health City',
    location: 'Bengaluru, Karnataka',
    opdSchedule: 'Mon – Sat: 09:00 AM – 04:00 PM',
    opdSuite: 'Suite 4B',
    deskPhone: '+91 80 7122 2222',
    emergencyPager: '+91 98450 11223',
    email: 'dr.sharat.damodar@narayanahealth.org'
  });

  const [editForm, setEditForm] = useState({ ...doctorData });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setDoctorData({ ...editForm });
    setIsEditing(false);
    showToast('Doctor profile updated successfully!');
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
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <Link
            to="/doctor"
            className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 text-muted hover-translate-y"
            style={{ fontSize: '0.82rem' }}
          >
            <ArrowLeft size={14} />
            <span>Dashboard</span>
          </Link>
          <span className="text-muted small">/</span>
          <span className="text-dark small fw-semibold">Doctor Profile</span>
        </div>
        <span className="badge rounded-pill bg-success-subtle text-success px-3 py-1.5 small fw-semibold">
          ● Clinician Portal
        </span>
      </div>

      {/* BALANCED 2-COLUMN PROFILE LAYOUT (FITS PAGE, NO EMPTY SPACE) */}
      <div className="row g-4 align-items-stretch">
        {/* Left Column: Doctor Identity & Practice Card */}
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
                    SD
                  </div>
                  <span
                    className="position-absolute bottom-0 end-0 rounded-circle border border-white bg-success"
                    style={{ width: '16px', height: '16px', border: '2px solid #fff' }}
                    title="On Duty"
                  />
                </div>
              </div>

              {/* Doctor Name & Designation */}
              <h4 className="fw-bold text-dark mt-2 mb-0.5" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em' }}>
                {doctorData.name}
              </h4>
              <p className="text-secondary small mb-2" style={{ fontSize: '0.84rem' }}>
                {doctorData.designation}
              </p>

              {/* Key Badges */}
              <div className="d-flex justify-content-center align-items-center gap-1.5 flex-wrap mb-3">
                <span className="badge rounded-pill px-2.5 py-1 small fw-bold" style={{ backgroundColor: '#eaf7f4', color: '#0d9488' }}>
                  Attending Clinician
                </span>
                <span className="badge rounded-pill bg-success-subtle text-success small fw-semibold">
                  ● On Duty ({doctorData.opdSuite})
                </span>
                <span className="badge rounded-pill bg-light text-muted border small font-monospace">
                  {doctorData.registrationNumber}
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
                  setEditForm({ ...doctorData });
                  setIsEditing(!isEditing);
                }}
              >
                {isEditing ? <X size={15} /> : <Edit3 size={15} />}
                <span>{isEditing ? 'Cancel Editing' : 'Edit Practice Info'}</span>
              </button>

              {/* Specialties Pills */}
              <div className="mt-3 pt-3 border-top text-start">
                <span className="text-muted small fw-bold text-uppercase d-block mb-1.5" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                  Clinical Specialties
                </span>
                <div className="d-flex flex-wrap gap-1">
                  {['Allogeneic BMT', '10/10 MUD Match', 'Haploidentical', 'Cord Blood', 'CAR-T Cell'].map((spec) => (
                    <span
                      key={spec}
                      className="badge rounded-pill px-2 py-1 small fw-semibold"
                      style={{ backgroundColor: '#f0fdfa', color: '#0f766e', border: '1px solid #ccfbf1', fontSize: '0.72rem' }}
                    >
                      ● {spec}
                    </span>
                  ))}
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
                  {isEditing ? 'Update Practice & Contact Information' : 'Department & Consultation Timetable'}
                </h5>
                <span className="text-muted small" style={{ fontSize: '0.78rem' }}>
                  {isEditing ? 'Syncs with hospital OPD directory' : 'NABH & FACT-JACIE Accredited Facility'}
                </span>
              </div>

              {isEditing ? (
                /* Clean Edit Form */
                <form onSubmit={handleSave}>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-dark mb-1">Full Name &amp; Degree</label>
                      <input
                        type="text"
                        className="form-control rounded-3 small"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-dark mb-1">Licensure Registration</label>
                      <input
                        type="text"
                        className="form-control rounded-3 small"
                        value={editForm.registrationNumber}
                        onChange={(e) => setEditForm({ ...editForm, registrationNumber: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-dark mb-1">OPD Consultation Timing</label>
                      <input
                        type="text"
                        className="form-control rounded-3 small"
                        value={editForm.opdSchedule}
                        onChange={(e) => setEditForm({ ...editForm, opdSchedule: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-dark mb-1">Clinic Room / Suite</label>
                      <input
                        type="text"
                        className="form-control rounded-3 small"
                        value={editForm.opdSuite}
                        onChange={(e) => setEditForm({ ...editForm, opdSuite: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-dark mb-1">Desk Phone</label>
                      <input
                        type="text"
                        className="form-control rounded-3 small"
                        value={editForm.deskPhone}
                        onChange={(e) => setEditForm({ ...editForm, deskPhone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-dark mb-1">Emergency Pager</label>
                      <input
                        type="text"
                        className="form-control rounded-3 small"
                        value={editForm.emergencyPager}
                        onChange={(e) => setEditForm({ ...editForm, emergencyPager: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold text-dark mb-1">Official Email</label>
                      <input
                        type="email"
                        className="form-control rounded-3 small"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        required
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
                  {/* Tile 1: Department (Teal) */}
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
                          <Stethoscope size={18} />
                        </div>
                        <div>
                          <span className="text-uppercase fw-bold text-muted d-block" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                            Department
                          </span>
                          <strong className="text-dark fs-6 d-block lh-1 text-truncate">Haematology &amp; BMT</strong>
                        </div>
                      </div>
                      <span className="small text-secondary" style={{ fontSize: '0.78rem' }}>
                        Stem Cell &amp; Cellular Therapy Unit
                      </span>
                    </div>
                  </div>

                  {/* Tile 2: Hospital (Purple) */}
                  <div className="col-12 col-sm-6">
                    <div
                      className="p-3.5 rounded-4 transition-all hover-translate-y h-100"
                      style={{ backgroundColor: '#f5f3ff', border: '1px solid #ddd6fe' }}
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
                            Hospital Facility
                          </span>
                          <strong className="text-dark fs-6 d-block lh-1 text-truncate">Mazumdar Shaw Centre</strong>
                        </div>
                      </div>
                      <span className="small text-secondary" style={{ fontSize: '0.78rem' }}>
                        Narayana Health City, Bengaluru
                      </span>
                    </div>
                  </div>

                  {/* Tile 3: OPD Schedule (Amber) */}
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
                          <Clock size={18} />
                        </div>
                        <div>
                          <span className="text-uppercase fw-bold text-muted d-block" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                            OPD Schedule
                          </span>
                          <strong className="text-dark fs-6 d-block lh-1">{doctorData.opdSchedule}</strong>
                        </div>
                      </div>
                      <span className="small text-secondary" style={{ fontSize: '0.78rem' }}>
                        Hospital Clinic ({doctorData.opdSuite})
                      </span>
                    </div>
                  </div>

                  {/* Tile 4: Desk Telephone (Blue) */}
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
                          <Phone size={18} />
                        </div>
                        <div>
                          <span className="text-uppercase fw-bold text-muted d-block" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                            Desk Telephone
                          </span>
                          <strong className="text-dark fs-6 d-block lh-1 font-monospace">{doctorData.deskPhone}</strong>
                        </div>
                      </div>
                      <span className="small text-secondary" style={{ fontSize: '0.78rem' }}>
                        OPD Consultation Line (Ext. 4082)
                      </span>
                    </div>
                  </div>

                  {/* Tile 5: Emergency Pager (Rose) */}
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
                          <Activity size={18} />
                        </div>
                        <div>
                          <span className="text-uppercase fw-bold text-muted d-block" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                            Emergency Pager
                          </span>
                          <strong className="text-danger fs-6 d-block lh-1 font-monospace">{doctorData.emergencyPager}</strong>
                        </div>
                      </div>
                      <span className="small text-danger fw-semibold" style={{ fontSize: '0.78rem' }}>
                        24/7 BMT Critical On-Call
                      </span>
                    </div>
                  </div>

                  {/* Tile 6: Official Email (Sky) */}
                  <div className="col-12 col-sm-6">
                    <div
                      className="p-3.5 rounded-4 transition-all hover-translate-y h-100"
                      style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd' }}
                    >
                      <div className="d-flex align-items-center gap-2.5 mb-1.5">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center text-white flex-shrink-0"
                          style={{ width: '36px', height: '36px', backgroundColor: '#0284c7' }}
                        >
                          <Mail size={18} />
                        </div>
                        <div>
                          <span className="text-uppercase fw-bold text-muted d-block" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                            Official Email
                          </span>
                          <strong className="text-dark fs-6 d-block lh-1 text-truncate" title={doctorData.email}>
                            dr.damodar@narayana.org
                          </strong>
                        </div>
                      </div>
                      <span className="small text-secondary" style={{ fontSize: '0.78rem' }}>
                        Verified Institutional Directory
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Subtle Footer Bar */}
            <div className="pt-3 mt-3 border-top d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div className="d-flex align-items-center gap-2">
                <ShieldCheck size={16} className="text-success" />
                <span className="small text-muted">
                  Accreditation: <strong className="text-dark">FACT-JACIE &amp; NABH Certified Centre</strong>
                </span>
              </div>
              <Link
                to="/doctor/patients"
                className="btn btn-sm btn-light border rounded-pill px-3 py-1 small fw-semibold text-teal hover-translate-y d-inline-flex align-items-center gap-1"
                style={{ fontSize: '0.78rem', color: '#0d9488' }}
              >
                <Users size={14} />
                <span>Active Cohort (14)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
