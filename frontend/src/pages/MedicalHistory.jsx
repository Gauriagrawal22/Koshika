import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  ShieldCheck,
  Dna,
  FileText,
  HeartPulse,
  Building2,
  UserCheck,
  Plus,
  Trash2,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  Activity,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';

const DEFAULT_TIMELINE = [
  {
    id: 1,
    date: 'Aug 24, 2026',
    title: 'ML-Assisted Preliminary Assessment Completed',
    category: 'Assessment',
    doctor: 'Dr. Sharat Damodar, MD',
    description: 'Candidate scored 89% for allogeneic stem cell transplantation. Recommended initiation of matched unrelated donor (MUD) registry search.'
  },
  {
    id: 2,
    date: 'Aug 18, 2026',
    title: 'High-Resolution HLA Tissue Typing Panel',
    category: 'Lab Diagnostics',
    doctor: 'Dr. Sunil Bhat, MD',
    description: 'High-resolution NGS sequencing performed for HLA-A, B, C, DRB1, DQB1 loci. Ready for automated ML donor matching.'
  },
  {
    id: 3,
    date: 'Jul 29, 2026',
    title: 'Flow Cytometry & CD34+ Cell Viability Test',
    category: 'OCR Report',
    doctor: 'Metro Diagnostic Bio-Center',
    description: 'Report uploaded & parsed via Tesseract OCR. CD34 count: 5.82 × 10⁶ cells/kg, cell viability: 96.4%.'
  },
  {
    id: 4,
    date: 'Jun 12, 2026',
    title: 'Post-Induction Bone Marrow Biopsy',
    category: 'Clinical Biopsy',
    doctor: 'National Stem Cell Institute',
    description: 'Biopsy confirmed First Complete Remission (CR1) with blast clearance < 5%. Cytogenetics normal diploid karyotype.'
  },
  {
    id: 5,
    date: 'Apr 04, 2026',
    title: 'Initial Diagnosis & Induction Chemotherapy',
    category: 'Hospital Intake',
    doctor: 'Hematology Inpatient Service',
    description: 'Admitted for standard 7+3 cytarabine and daunorubicin induction chemotherapy with optimal tolerance.'
  }
];

const MedicalHistory = () => {
  const [timeline, setTimeline] = useState(() => {
    try {
      const saved = localStorage.getItem('koshika_medical_timeline');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_TIMELINE;
  });

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Lab Diagnostics',
    date: 'Sep 24, 2026',
    doctor: 'Dr. Sharat Damodar, MD',
    description: ''
  });

  // In-App Toast
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    try {
      localStorage.setItem('koshika_medical_timeline', JSON.stringify(timeline));
    } catch {}
  }, [timeline]);

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newItem = {
      id: Date.now(),
      date: formData.date || 'Sep 24, 2026',
      title: formData.title.trim(),
      category: formData.category,
      doctor: formData.doctor.trim() || 'Attending Physician',
      description: formData.description.trim() || 'Clinical findings documented in electronic health record.'
    };

    setTimeline([newItem, ...timeline]);
    setShowModal(false);
    setFormData({
      title: '',
      category: 'Lab Diagnostics',
      date: 'Sep 24, 2026',
      doctor: 'Dr. Sharat Damodar, MD',
      description: ''
    });
    showToast(`Added milestone "${newItem.title}" to medical history!`, 'success');
  };

  const handleDelete = (id) => {
    setTimeline(timeline.filter(t => t.id !== id));
    showToast('Milestone removed from timeline.', 'info');
  };

  const getCategoryStyles = (category) => {
    switch (category) {
      case 'Assessment':
        return {
          icon: <ShieldCheck size={16} />,
          bg: '#ecfdf5',
          color: '#059669',
          border: '#a7f3d0'
        };
      case 'Lab Diagnostics':
        return {
          icon: <Dna size={16} />,
          bg: '#eff6ff',
          color: '#2563eb',
          border: '#bfdbfe'
        };
      case 'OCR Report':
        return {
          icon: <FileText size={16} />,
          bg: '#fffbeb',
          color: '#d97706',
          border: '#fde68a'
        };
      case 'Clinical Biopsy':
        return {
          icon: <Activity size={16} />,
          bg: '#faf5ff',
          color: '#7c3aed',
          border: '#ddd6fe'
        };
      default:
        return {
          icon: <HeartPulse size={16} />,
          bg: '#ffe4e6',
          color: '#e11d48',
          border: '#fecdd3'
        };
    }
  };

  return (
    <div className="koshika-animate-fadein pb-5 mx-auto" style={{ maxWidth: '1200px' }}>
      {/* Toast Alert */}
      {toast && (
        <div
          className="position-fixed bottom-0 end-0 m-4 p-3 rounded-4 shadow-lg text-white d-flex align-items-center gap-2"
          style={{ backgroundColor: toast.type === 'danger' ? '#ef4444' : '#0d9488', zIndex: 9999, animation: 'fadeIn 0.2s ease-out' }}
        >
          <CheckCircle2 size={18} />
          <span className="small fw-semibold">{toast.message}</span>
        </div>
      )}

      {/* 1. Header Card */}
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
                <Clock size={13} />
                <span>MY HEALTH RECORD</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold"
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                {timeline.length} Clinical Milestones
              </span>
            </div>
            <h2 className="fw-extrabold text-white mb-2" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Medical History &amp; Timeline
            </h2>
            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Chronological trajectory from diagnosis through remission, HLA testing, and transplant preparation.
            </p>
          </div>

          <div className="d-flex gap-2.5 flex-wrap flex-shrink-0">
            <Link
              to="/my-health/profile"
              className="btn btn-sm rounded-pill px-3.5 py-2.5 fw-semibold d-inline-flex align-items-center gap-1.5 hover-translate-y"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                fontSize: '0.85rem'
              }}
            >
              <span className="text-white">Patient Profile</span>
            </Link>

            <button
              type="button"
              className="btn btn-sm rounded-pill px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2 shadow-sm hover-translate-y koshika-hero-action-btn"
              style={{
                backgroundColor: '#ffffff',
                color: '#064e3b',
                border: 'none',
                fontSize: '0.85rem'
              }}
              onClick={() => setShowModal(true)}
            >
              <Plus size={15} color="currentColor" />
              <span>Log Milestone</span>
            </button>

            <Link
              to="/ocr-reports"
              className="btn btn-sm rounded-pill px-3.5 py-2.5 fw-semibold d-inline-flex align-items-center gap-1.5 hover-translate-y"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                fontSize: '0.85rem'
              }}
            >
              <FileText size={15} color="#ffffff" />
              <span className="text-white">OCR Reports</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Visual KPI Metrics (Creative & Colorful) */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 rounded-4 p-3 shadow-xs h-100" style={{ border: '1px solid var(--k-border)', borderTop: '3px solid #0d9488' }}>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>TOTAL EVENTS</span>
              <Clock size={15} style={{ color: '#0d9488' }} />
            </div>
            <div className="fs-4 fw-bold text-dark">{timeline.length}</div>
            <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Complete journey</span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border-0 rounded-4 p-3 shadow-xs h-100" style={{ border: '1px solid var(--k-border)', borderTop: '3px solid #10b981' }}>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>REMISSION</span>
              <CheckCircle2 size={15} className="text-success" />
            </div>
            <div className="fs-4 fw-bold text-success">CR1 Remission</div>
            <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Blast clearance &lt; 5%</span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border-0 rounded-4 p-3 shadow-xs h-100" style={{ border: '1px solid var(--k-border)', borderTop: '3px solid #3b82f6' }}>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>HLA PROFILE</span>
              <Dna size={15} className="text-primary" />
            </div>
            <div className="fs-4 fw-bold text-primary">NGS Confirmed</div>
            <span className="text-muted small" style={{ fontSize: '0.72rem' }}>10/10 matched target</span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border-0 rounded-4 p-3 shadow-xs h-100" style={{ border: '1px solid var(--k-border)', borderTop: '3px solid #7c3aed' }}>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>CD34+ YIELD</span>
              <Activity size={15} style={{ color: '#7c3aed' }} />
            </div>
            <div className="fs-4 fw-bold" style={{ color: '#7c3aed' }}>5.82 M/kg</div>
            <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Viability 96.4%</span>
          </div>
        </div>
      </div>

      {/* 3. Creative Vertical Timeline */}
      <div className="card border-0 shadow-sm rounded-4 p-4" style={{ border: '1px solid var(--k-border)' }}>
        <div className="position-relative ps-4" style={{ borderLeft: '2px solid var(--k-border)', marginLeft: '1rem' }}>
          {timeline.map((item) => {
            const style = getCategoryStyles(item.category);
            return (
              <div key={item.id} className="position-relative mb-4 pb-1">
                {/* Node Pill on Timeline */}
                <div
                  className="position-absolute rounded-circle d-flex align-items-center justify-content-center shadow-xs"
                  style={{
                    width: '36px',
                    height: '36px',
                    left: '-35px',
                    top: '0px',
                    backgroundColor: style.bg,
                    color: style.color,
                    border: `2px solid ${style.border}`
                  }}
                >
                  {style.icon}
                </div>

                {/* Event Card */}
                <div className="card border p-3.5 rounded-4 shadow-xs ms-2 hover-shadow transition-all" style={{ borderColor: 'var(--k-border)' }}>
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2 gap-1.5">
                    <span
                      className="badge rounded-pill px-2.5 py-1 small fw-semibold"
                      style={{ backgroundColor: style.bg, color: style.color, border: `1px solid ${style.border}` }}
                    >
                      {item.category}
                    </span>
                    <span className="text-muted small d-inline-flex align-items-center gap-1 font-monospace" style={{ fontSize: '0.75rem' }}>
                      <Calendar size={12} className="text-muted" />
                      {item.date}
                    </span>
                  </div>

                  <h5 className="fw-bold text-dark mb-1" style={{ fontSize: '1rem' }}>
                    {item.title}
                  </h5>

                  <p className="text-secondary small mb-2.5" style={{ fontSize: '0.84rem', lineHeight: '1.45' }}>
                    {item.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                    <div className="small text-muted d-inline-flex align-items-center gap-1.5" style={{ fontSize: '0.76rem' }}>
                      <UserCheck size={13} className="text-success" />
                      <span>Attending: <strong>{item.doctor}</strong></span>
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm btn-link text-danger p-0 text-decoration-none small d-inline-flex align-items-center gap-1 hover-lift"
                      style={{ fontSize: '0.74rem' }}
                      onClick={() => handleDelete(item.id)}
                      title="Remove milestone"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {timeline.length === 0 && (
            <div className="text-center py-5 text-muted">
              <Clock size={36} className="text-secondary mb-2 d-block mx-auto opacity-50" />
              <h6 className="fw-bold text-dark mb-1">No Clinical Milestones Recorded</h6>
              <p className="small text-secondary mb-3">
                Click "Log Milestone" to document your diagnosis, remission, and transplant progress.
              </p>
              <button
                type="button"
                className="btn btn-sm rounded-pill px-4 py-2 text-white"
                style={{ backgroundColor: '#0d9488' }}
                onClick={() => setShowModal(true)}
              >
                Log First Milestone
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Log Milestone Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(4px)', zIndex: 1060 }}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '520px' }}>
            <div className="modal-content border-0 shadow-lg rounded-4 p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center pb-2 mb-3 border-bottom">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle p-2" style={{ backgroundColor: '#f0fdfa', color: '#0d9488' }}>
                    <Plus size={18} />
                  </div>
                  <h6 className="fw-bold text-dark mb-0">Log Clinical Milestone</h6>
                </div>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>

              <form onSubmit={handleAddMilestone}>
                <div className="d-flex flex-column gap-3">
                  <div>
                    <label className="form-label small fw-bold text-dark mb-1">Milestone / Event Title</label>
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-3"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Bone Marrow Harvest or Day 0 Stem Cell Infusion"
                      required
                    />
                  </div>

                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label small fw-bold text-dark mb-1">Category</label>
                      <select
                        className="form-select form-select-sm rounded-3"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="Lab Diagnostics">Lab Diagnostics</option>
                        <option value="Assessment">Assessment</option>
                        <option value="OCR Report">OCR Report</option>
                        <option value="Clinical Biopsy">Clinical Biopsy</option>
                        <option value="Hospital Intake">Hospital Intake</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-bold text-dark mb-1">Date</label>
                      <input
                        type="text"
                        className="form-control form-control-sm rounded-3"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        placeholder="e.g. Sep 24, 2026"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label small fw-bold text-dark mb-1">Attending Clinician / Laboratory</label>
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-3"
                      value={formData.doctor}
                      onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                      placeholder="e.g. Dr. Sharat Damodar, MD"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label small fw-bold text-dark mb-1">Clinical Outcome / Notes</label>
                    <textarea
                      rows="3"
                      className="form-control form-control-sm rounded-3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Key laboratory findings, dosage, engraftment markers, or physician comments..."
                      required
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                  <button
                    type="button"
                    className="btn btn-sm btn-light border rounded-pill px-3.5 py-1.5 fw-semibold"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm rounded-pill px-4 py-1.5 fw-semibold text-white shadow-xs"
                    style={{ backgroundColor: '#0d9488' }}
                  >
                    Save Milestone
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;
