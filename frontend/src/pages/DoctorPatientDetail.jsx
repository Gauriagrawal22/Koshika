import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PATIENTS_DATA, MEDICAL_REPORTS_DATA } from '../data/mockData';
import {
  ArrowLeft,
  User,
  Activity,
  FileText,
  Stethoscope,
  Calendar,
  Clock,
  Dna,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Plus,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Video,
  Hospital,
  Droplet,
  Zap,
  TrendingUp,
  HeartPulse
} from 'lucide-react';

const DoctorPatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find patient record
  const patient = PATIENTS_DATA.find(p => p.id === id) || PATIENTS_DATA[0];

  // Reports associated with this patient
  const patientReports = MEDICAL_REPORTS_DATA.filter(r => r.patientId === patient.id || r.patientId === 'PT-9042');

  // Consultation timeline
  const [consultations, setConsultations] = useState([
    {
      id: 'CON-1',
      date: '2026-09-20',
      time: '10:30 AM',
      doctor: 'Dr. Mitesh Sawant, MD',
      mode: 'In-Person Consultation (OPD Suite 4B)',
      summary: 'Initial allogeneic BMT workup evaluation. Reviewed induction chemotherapy response and validated complete hematologic remission (CR1). Discussed HLA matching protocol.',
      status: 'Completed'
    },
    {
      id: 'CON-2',
      date: '2026-09-08',
      time: '02:00 PM',
      doctor: 'Dr. Sunil Bhat, MD',
      mode: 'Tele-Consultation (WebRTC Secure)',
      summary: 'Preliminary HLA allele breakdown. Recommended high-resolution next-gen allelic confirmation and mobilization scheduling.',
      status: 'Completed'
    }
  ]);

  // Follow-up notes state
  const [followUps, setFollowUps] = useState([
    {
      id: 'FU-1',
      date: '2026-10-05',
      time: '11:00 AM',
      note: 'Pre-transplant cardiac and pulmonary function clearance (ECHO & DLCO).',
      status: 'Scheduled'
    },
    {
      id: 'FU-2',
      date: '2026-10-14',
      time: '09:00 AM',
      note: 'Admission for conditioning regimen initiation (Day -7).',
      status: 'Pending'
    }
  ]);

  // Add follow-up modal/form state
  const [showAddFollowUp, setShowAddFollowUp] = useState(false);
  const [newFollowUpDate, setNewFollowUpDate] = useState('');
  const [newFollowUpNote, setNewFollowUpNote] = useState('');
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleAddFollowUp = (e) => {
    e.preventDefault();
    if (!newFollowUpNote.trim()) return;
    const newEntry = {
      id: `FU-${Date.now()}`,
      date: newFollowUpDate || '2026-10-20',
      time: '10:00 AM',
      note: newFollowUpNote.trim(),
      status: 'Scheduled'
    };
    setFollowUps([newEntry, ...followUps]);
    setShowAddFollowUp(false);
    setNewFollowUpDate('');
    setNewFollowUpNote('');
    showToast('Follow-up scheduled and added to clinical record.');
  };

  return (
    <div className="koshika-animate-fadein pb-5 mx-auto" style={{ maxWidth: '1240px' }}>
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className="position-fixed bottom-0 end-0 m-4 p-3 rounded-4 shadow-lg text-white d-flex align-items-center gap-2"
          style={{ backgroundColor: '#0d9488', zIndex: 9999, maxWidth: '380px' }}
        >
          <CheckCircle2 size={18} />
          <span className="small fw-semibold">{toastMsg}</span>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          NAVIGATION BREADCRUMB
      ---------------------------------------------------------------------- */}
      <div className="mb-3">
        <Link
          to="/doctor/patients"
          className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 text-muted hover-translate-y shadow-xs"
          style={{ fontSize: '0.82rem' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Patient Cohort</span>
        </Link>
      </div>

      {/* ---------------------------------------------------------------------
          1. VISUAL CLINICAL HEADER CARD
      ---------------------------------------------------------------------- */}
      <div 
        className="card border-0 rounded-4 p-4 p-md-5 mb-4 text-white position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          boxShadow: '0 10px 30px -5px rgba(6, 78, 59, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#ffffff'
        }}
      >
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-4 position-relative" style={{ zIndex: 2 }}>
          <div className="d-flex align-items-center gap-3">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center fw-extrabold flex-shrink-0 shadow-sm top-head-badge-white"
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#064e3b',
                fontSize: '1.4rem',
                border: '2px solid rgba(255, 255, 255, 0.8)'
              }}
            >
              {patient.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 flex-wrap mb-1.5">
                <h2 className="fw-extrabold text-white mb-0" style={{ letterSpacing: '-0.02em', fontSize: '1.85rem' }}>
                  {patient.name}
                </h2>
                <span className="badge rounded-pill font-monospace px-3 py-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)', fontSize: '0.8rem' }}>
                  {patient.id}
                </span>
                <span 
                  className="badge rounded-pill px-3 py-1 small fw-semibold"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
                >
                  {patient.status || 'Active BMT Candidate'}
                </span>
              </div>
              <div className="text-white text-opacity-90 small d-flex align-items-center gap-2 flex-wrap" style={{ fontSize: '0.88rem' }}>
                <span>{patient.age} yrs • {patient.gender}</span>
                <span>• Blood: <strong className="text-white bg-danger px-2 py-0.5 rounded-pill small">{patient.bloodGroup || 'O+'}</strong></span>
                <span>• Attending: <strong className="text-white">{patient.primaryDoctor || 'Dr. Mitesh Sawant'}</strong></span>
                <span>• Center: <strong className="text-white">{patient.hospital || 'Mazumdar Shaw Cancer Centre'}</strong></span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex flex-wrap gap-2.5 align-items-center flex-shrink-0">
            <Link
              to={`/doctor/consultations?patient=${patient.id}`}
              className="btn btn-sm rounded-pill px-4 py-2.5 d-flex align-items-center gap-2 fw-bold shadow-sm hover-translate-y koshika-hero-action-btn"
              style={{ backgroundColor: '#ffffff', color: '#064e3b', border: 'none', fontSize: '0.86rem' }}
            >
              <Video size={16} color="currentColor" />
              <span>Video Consult</span>
            </Link>
            <Link
              to={`/doctor/reports?patient=${patient.id}`}
              className="btn btn-sm rounded-pill px-3.5 py-2.5 d-flex align-items-center gap-1.5 fw-semibold hover-translate-y"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                fontSize: '0.86rem'
              }}
            >
              <FileText size={15} color="#ffffff" />
              <span className="text-white">Review Reports</span>
            </Link>
            <button
              type="button"
              className="btn btn-sm rounded-pill px-3.5 py-2.5 d-flex align-items-center gap-1.5 fw-semibold hover-translate-y"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                fontSize: '0.86rem'
              }}
              onClick={() => setShowAddFollowUp(true)}
            >
              <Plus size={15} color="#ffffff" />
              <span className="text-white">Add Follow-up</span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          2. VISUAL TREATMENT PATHWAY STEPPER (BMT Milestones)
      ---------------------------------------------------------------------- */}
      <div className="card border-0 rounded-4 shadow-xs p-3.5 mb-4 bg-white" style={{ border: '1.5px solid #e2e8f0' }}>
        <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            <span className="badge rounded-pill bg-light text-secondary border px-2.5 py-1 small fw-bold">
              CLINICAL PATHWAY
            </span>
            <h6 className="fw-bold text-dark mb-0 small">Allogeneic Stem Cell Transplant Protocol</h6>
          </div>
          <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2.5 py-0.5 small fw-bold">
            Phase 2 Active
          </span>
        </div>

        <div className="row g-2 text-center">
          <div className="col-6 col-md-3">
            <div className="p-2.5 rounded-3 border h-100 bg-success-subtle border-success-subtle">
              <CheckCircle2 size={18} className="text-success mx-auto mb-1" />
              <div className="fw-bold text-dark small">1. Pre-BMT Workup</div>
              <span className="text-muted small" style={{ fontSize: '0.72rem' }}>10/10 HLA Confirmed</span>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="p-2.5 rounded-3 border h-100" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
              <Zap size={18} className="text-primary mx-auto mb-1" />
              <div className="fw-bold text-primary small">2. Harvest &amp; Viability</div>
              <span className="text-primary fw-semibold small" style={{ fontSize: '0.72rem' }}>5.82 x 10^6 CD34/kg</span>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="p-2.5 rounded-3 border h-100 bg-light">
              <Clock size={18} className="text-muted mx-auto mb-1" />
              <div className="fw-bold text-dark small">3. Conditioning</div>
              <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Scheduled Day -7</span>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="p-2.5 rounded-3 border h-100 bg-light">
              <TrendingUp size={18} className="text-muted mx-auto mb-1" />
              <div className="fw-bold text-dark small">4. Engraftment</div>
              <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Target Day +14-21</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          3. TWO-COLUMN CLINICAL DASHBOARD
          Left (8 cols): Vitals, Reports & AI Summary
          Right (4 cols): Consultations & Scheduled Follow-up
      ---------------------------------------------------------------------- */}
      <div className="row g-4">
        {/* Left Column (8 cols) */}
        <div className="col-12 col-lg-8">
          
          {/* VISUAL BIOMARKERS & LAB VITALS (Replaces dense text blocks) */}
          <div className="card border-0 rounded-4 shadow-xs p-4 bg-white mb-4" style={{ border: '1.5px solid #e2e8f0' }}>
            <h5 className="fw-bold text-dark mb-3 pb-2 border-bottom d-flex align-items-center gap-2">
              <HeartPulse size={18} style={{ color: '#0d9488' }} />
              <span>Graft Potency &amp; Biomarkers</span>
            </h5>

            <div className="row g-3">
              {/* CD34 Count */}
              <div className="col-12 col-sm-6">
                <div className="p-3 rounded-3 border bg-light">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="small text-muted fw-bold">CD34+ Stem Cell Harvest</span>
                    <span className="badge bg-success text-white rounded-pill px-2 py-0.5 small">Optimal</span>
                  </div>
                  <div className="fs-4 fw-bold text-dark mb-1">5.82 <span className="fs-6 text-muted">x 10^6 / kg</span></div>
                  <div className="progress mb-1" style={{ height: '6px' }}>
                    <div className="progress-bar rounded-pill bg-success" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Exceeds 2.0 M/kg threshold (Optimal range: 5.0–8.0 M/kg)</span>
                </div>
              </div>

              {/* Cell Viability */}
              <div className="col-12 col-sm-6">
                <div className="p-3 rounded-3 border bg-light">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="small text-muted fw-bold">Post-Harvest Cell Viability</span>
                    <span className="badge bg-primary text-white rounded-pill px-2 py-0.5 small">7-AAD Test</span>
                  </div>
                  <div className="fs-4 fw-bold text-dark mb-1">96.4% <span className="fs-6 text-muted">Live Cells</span></div>
                  <div className="progress mb-1" style={{ height: '6px' }}>
                    <div className="progress-bar rounded-pill bg-primary" style={{ width: '96%' }}></div>
                  </div>
                  <span className="text-muted small" style={{ fontSize: '0.72rem' }}>FACT-JACIE safety criteria compliant for cryopreservation</span>
                </div>
              </div>

              {/* HLA Allelic Concordance */}
              <div className="col-12 col-sm-6">
                <div className="p-3 rounded-3 border bg-light">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="small text-muted fw-bold">HLA High-Res Typing</span>
                    <span className="badge rounded-pill text-white px-2 py-0.5 small" style={{ backgroundColor: '#7c3aed' }}>Matched</span>
                  </div>
                  <div className="fs-4 fw-bold text-dark mb-1">10 / 10 <span className="fs-6 text-muted">Alleles</span></div>
                  <span className="text-secondary small d-block" style={{ fontSize: '0.72rem' }}>Concordant across loci A, B, C, DRB1, and DQB1</span>
                </div>
              </div>

              {/* Disease Remission */}
              <div className="col-12 col-sm-6">
                <div className="p-3 rounded-3 border bg-light">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="small text-muted fw-bold">Hematologic Status</span>
                    <span className="badge bg-info-subtle text-info border border-info-subtle rounded-pill px-2 py-0.5 small">Induction</span>
                  </div>
                  <div className="fs-4 fw-bold text-dark mb-1">CR1 <span className="fs-6 text-muted">Remission</span></div>
                  <span className="text-secondary small d-block" style={{ fontSize: '0.72rem' }}>Blast count &lt;5% in bone marrow aspirate</span>
                </div>
              </div>
            </div>
          </div>

          {/* REPORTS SECTION */}
          <div className="card border-0 rounded-4 shadow-xs p-4 bg-white mb-4" style={{ border: '1.5px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
              <h5 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                <FileText size={18} style={{ color: '#0d9488' }} />
                <span>Diagnostic Lab Reports</span>
              </h5>
              <span className="badge rounded-pill bg-light text-muted border px-2.5 py-1 small">
                {patientReports.length} Available
              </span>
            </div>

            <div className="d-flex flex-column gap-2.5">
              {patientReports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-3 rounded-3 border d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3 bg-white hover-lift transition-all shadow-xs"
                  style={{ borderLeft: '4px solid #0d9488', borderColor: '#e2e8f0' }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 text-white"
                      style={{ width: '38px', height: '38px', backgroundColor: '#0d9488' }}
                    >
                      <FileText size={18} />
                    </div>
                    <div>
                      <div className="fw-bold text-dark small mb-0.5">{rep.reportTitle}</div>
                      <div className="text-muted small d-flex align-items-center gap-2 flex-wrap" style={{ fontSize: '0.72rem' }}>
                        <span>Doc ID: {rep.id}</span>
                        <span>• Date: {rep.date}</span>
                        <span>• Lab: {rep.labDirector}</span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 align-self-end align-self-sm-center flex-shrink-0">
                    <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-2.5 py-1 small fw-bold">
                      Verified
                    </span>
                    <Link
                      to={`/doctor/reports?report=${rep.id}`}
                      className="btn btn-sm rounded-pill px-3 py-1 fw-bold text-white shadow-xs"
                      style={{ backgroundColor: '#0d9488', fontSize: '0.78rem', border: 'none' }}
                    >
                      <span>Analyze →</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI DECISION SUPPORT */}
          <div className="card border-0 rounded-4 shadow-xs p-4 mb-4" style={{ border: '1.5px solid var(--k-border)', background: 'var(--k-surface)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2.5 pb-2 border-bottom">
              <div className="d-flex align-items-center gap-2">
                <span className="badge rounded-pill bg-teal text-white px-2.5 py-1 small fw-bold" style={{ backgroundColor: '#0d9488' }}>
                  AI CLINICAL SUMMARY
                </span>
                <span className="small text-muted" style={{ fontSize: '0.74rem' }}>Confidence Score: 98.2%</span>
              </div>
            </div>

            <div className="d-flex flex-column gap-2 small text-secondary" style={{ fontSize: '0.82rem' }}>
              <div className="d-flex align-items-start gap-2">
                <CheckCircle2 size={16} className="text-success flex-shrink-0 mt-0.5" />
                <span>CD34+ dose (5.82 x 10^6/kg) is clinically optimal. Approved for cryopreservation in 10% DMSO.</span>
              </div>
              <div className="d-flex align-items-start gap-2">
                <CheckCircle2 size={16} className="text-success flex-shrink-0 mt-0.5" />
                <span>10/10 high-resolution HLA matching verified; donor graft potency is rated Grade A.</span>
              </div>
              <div className="d-flex align-items-start gap-2">
                <AlertCircle size={16} className="text-warning flex-shrink-0 mt-0.5" />
                <span>Recommend final CMV serostatus confirmation prior to Day -7 conditioning assignment.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Consultations & Scheduled Follow-up */}
        <div className="col-12 col-lg-4">
          
          {/* CONSULTATION HISTORY */}
          <div className="card border-0 rounded-4 shadow-xs p-4 bg-white mb-4" style={{ border: '1.5px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
              <h5 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                <Clock size={18} style={{ color: '#0d9488' }} />
                <span>Consultation Log</span>
              </h5>
              <span className="badge rounded-pill bg-light text-muted border px-2 py-0.5 small">
                {consultations.length} Sessions
              </span>
            </div>

            <div className="d-flex flex-column gap-2.5">
              {consultations.map((c) => (
                <div key={c.id} className="p-3 rounded-3 border bg-light">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="badge bg-white text-dark border small fw-semibold" style={{ fontSize: '0.7rem' }}>
                      {c.date} • {c.time}
                    </span>
                    <span className="badge bg-success-subtle text-success small" style={{ fontSize: '0.68rem' }}>
                      {c.status}
                    </span>
                  </div>
                  <div className="fw-bold text-dark small">{c.doctor}</div>
                  <p className="text-secondary mb-0 small mt-1" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
                    {c.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FOLLOW-UP SCHEDULE */}
          <div className="card border-0 rounded-4 shadow-xs p-4 bg-white" style={{ border: '1.5px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
              <h5 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                <Calendar size={18} style={{ color: '#0d9488' }} />
                <span>Follow-ups</span>
              </h5>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary rounded-pill px-2.5 py-0.5 small fw-bold"
                style={{ fontSize: '0.74rem' }}
                onClick={() => setShowAddFollowUp(!showAddFollowUp)}
              >
                + Add
              </button>
            </div>

            {/* Inline Add Form */}
            {showAddFollowUp && (
              <form onSubmit={handleAddFollowUp} className="p-3 rounded-3 bg-light border mb-3">
                <h6 className="fw-bold small mb-2 text-dark">Schedule Next Follow-up</h6>
                <div className="mb-2">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.74rem' }}>Target Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm rounded-3"
                    value={newFollowUpDate}
                    onChange={(e) => setNewFollowUpDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '0.74rem' }}>Instructions</label>
                  <textarea
                    className="form-control form-control-sm rounded-3"
                    rows="2"
                    placeholder="Enter clinical notes..."
                    value={newFollowUpNote}
                    onChange={(e) => setNewFollowUpNote(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-light border rounded-pill px-2.5 py-1 small"
                    onClick={() => setShowAddFollowUp(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm text-white rounded-pill px-3 py-1 small fw-bold"
                    style={{ backgroundColor: '#0d9488', border: 'none' }}
                  >
                    Save
                  </button>
                </div>
              </form>
            )}

            {/* Follow-up Notes List */}
            <div className="d-flex flex-column gap-2">
              {followUps.map((fu) => (
                <div key={fu.id} className="p-2.5 rounded-3 border bg-light">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold text-dark small d-flex align-items-center gap-1" style={{ fontSize: '0.78rem' }}>
                      <Clock size={12} style={{ color: '#0d9488' }} />
                      <span>{fu.date}</span>
                    </span>
                    <span className="badge rounded-pill bg-primary-subtle text-primary small" style={{ fontSize: '0.66rem' }}>
                      {fu.status}
                    </span>
                  </div>
                  <p className="text-secondary mb-0 small" style={{ fontSize: '0.76rem', lineHeight: '1.4' }}>
                    {fu.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorPatientDetail;
