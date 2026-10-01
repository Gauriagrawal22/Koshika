import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MEDICAL_REPORTS_DATA } from '../data/mockData';
import {
  FileText,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Printer,
  Download,
  ShieldCheck,
  Eye,
  ZoomIn,
  ZoomOut,
  HelpCircle,
  Save,
  Clock,
  User,
  Activity,
  Award,
  Zap,
  Check,
  Send,
  Sliders,
  ChevronRight
} from 'lucide-react';

const DoctorReportReview = () => {
  const [searchParams] = useSearchParams();
  const initialReportId = searchParams.get('report') || 'REP-2026-001';

  const [selectedReportId, setSelectedReportId] = useState(initialReportId);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [doctorNote, setDoctorNote] = useState(
    'CD34+ mobilization yield (5.82 x 10^6/kg) is clinically optimal. 7-AAD viability confirmed at 96.4%. Approved for cryopreservation and conditioning protocol initiation.'
  );
  const [reviewStatus, setReviewStatus] = useState('Pending Sign-off');
  const [toastMsg, setToastMsg] = useState(null);
  const [showReqModal, setShowReqModal] = useState(false);
  const [reqInfoMessage, setReqInfoMessage] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const report = MEDICAL_REPORTS_DATA.find(r => r.id === selectedReportId) || MEDICAL_REPORTS_DATA[0];

  const handleMarkReviewed = () => {
    setReviewStatus('Reviewed & Approved');
    showToast(`Report ${report.id} signed & approved by Attending Physician.`);
  };

  const handleSaveNote = () => {
    showToast('Clinical assessment saved to electronic health record.');
  };

  const handleSendRequestInfo = (e) => {
    e.preventDefault();
    setShowReqModal(false);
    showToast(`Clarification request dispatched to ${report.labDirector}.`);
    setReqInfoMessage('');
  };

  const quickPresets = [
    'Optimal CD34+ cell dose achieved',
    'High viability (>95%) confirmed',
    'Proceed to conditioning protocol',
    'Repeat sample required'
  ];

  return (
    <div className="koshika-animate-fadein pb-5" style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className="position-fixed bottom-0 end-0 m-4 p-3 rounded-4 shadow-lg text-white d-flex align-items-center gap-2"
          style={{ backgroundColor: '#0d9488', zIndex: 9999, maxWidth: '420px', animation: 'fadeIn 0.2s ease-out' }}
        >
          <CheckCircle2 size={18} />
          <span className="small fw-semibold">{toastMsg}</span>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          TOP BREADCRUMB & SELECTOR
      ---------------------------------------------------------------------- */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <Link
            to="/doctor"
            className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 text-muted hover-translate-y"
            style={{ fontSize: '0.82rem' }}
          >
            <ArrowLeft size={14} />
            <span>Dashboard</span>
          </Link>
          <span className="text-muted small">/</span>
          <span className="badge rounded-pill px-2.5 py-1 small fw-bold" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
            Diagnostic Verification
          </span>
          <span className="text-dark small fw-semibold">Report #{report.id}</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="small text-muted fw-semibold d-none d-sm-inline" style={{ fontSize: '0.78rem' }}>
            Switch Report:
          </span>
          <select
            className="form-select form-select-sm rounded-pill border bg-white small px-3 py-1.5 shadow-xs"
            style={{ minWidth: '240px', fontSize: '0.82rem', borderColor: '#cbd5e1' }}
            value={selectedReportId}
            onChange={(e) => {
              setSelectedReportId(e.target.value);
              setReviewStatus('Pending Sign-off');
            }}
          >
            {MEDICAL_REPORTS_DATA.map((r) => (
              <option key={r.id} value={r.id}>
                {r.id} • {r.patientName} ({r.reportTitle.slice(0, 22)}...)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          CREATIVE HERO BANNER
      ---------------------------------------------------------------------- */}
      <div 
        className="card border-0 rounded-4 shadow-sm p-4 mb-4 text-white overflow-hidden position-relative koshika-top-head-card"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          boxShadow: '0 10px 30px -5px rgba(6, 78, 59, 0.25), 0 0 20px rgba(13, 148, 136, 0.15)'
        }}
      >
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3 position-relative" style={{ zIndex: 2 }}>
          <div>
            <div className="d-flex align-items-center gap-2 flex-wrap mb-2">
              <span className="badge rounded-pill px-3 py-1 small fw-bold" style={{ backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
                <Activity size={13} className="me-1" />
                CLINICAL FLOW CYTOMETRY
              </span>
              <span className="badge rounded-pill bg-light text-dark font-monospace px-2.5 py-1 small fw-semibold">
                {report.id}
              </span>
              <span 
                className="badge rounded-pill px-3 py-1 small fw-bold"
                style={
                  reviewStatus.includes('Approved')
                    ? { backgroundColor: '#10b981', color: '#ffffff' }
                    : { backgroundColor: '#f59e0b', color: '#ffffff' }
                }
              >
                ● {reviewStatus}
              </span>
            </div>

            <h3 className="fw-bold text-white mb-1" style={{ letterSpacing: '-0.02em' }}>
              {report.reportTitle}
            </h3>

            <div className="d-flex align-items-center gap-3 flex-wrap small text-white-50" style={{ fontSize: '0.82rem' }}>
              <span>Patient: <strong className="text-white">{report.patientName}</strong> ({report.patientId})</span>
              <span>• Date: <span className="text-white">{report.date}</span></span>
              <span>• Specimen: <span className="text-white">{report.specimenSource || 'Peripheral Blood Apheresis'}</span></span>
              <span>• Director: <span className="text-white">{report.labDirector}</span></span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <button
              type="button"
              className="btn btn-sm btn-light rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5 shadow-sm"
              style={{ fontSize: '0.82rem' }}
              onClick={() => window.print()}
            >
              <Printer size={14} />
              <span>Print Sheet</span>
            </button>
            <button
              type="button"
              className="btn btn-sm text-white rounded-pill px-3.5 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5 shadow-sm"
              style={{ backgroundColor: reviewStatus.includes('Approved') ? '#10b981' : '#0d9488', fontSize: '0.82rem' }}
              onClick={handleMarkReviewed}
            >
              <CheckCircle2 size={15} />
              <span>{reviewStatus.includes('Approved') ? 'Signed & Approved' : 'Sign & Approve'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          VISUAL BIOMARKER GAUGES & METRICS (LESS TEXT, HIGH IMPACT)
      ---------------------------------------------------------------------- */}
      <div className="row g-3 mb-4">
        {/* Metric 1: CD34+ Dose */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 rounded-4 shadow-sm p-3 h-100" style={{ borderLeft: '4px solid #10b981' }}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="small text-muted fw-bold text-uppercase" style={{ fontSize: '0.7rem' }}>
                CD34+ Cell Dose
              </span>
              <span className="badge rounded-pill bg-success-subtle text-success small fw-bold">
                Optimal
              </span>
            </div>
            <div className="d-flex align-items-baseline gap-1 mb-2">
              <span className="fw-bold text-dark" style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
                5.82
              </span>
              <span className="text-muted small" style={{ fontSize: '0.78rem' }}>× 10⁶ / kg</span>
            </div>
            <div className="progress mb-1.5" style={{ height: '7px', borderRadius: '4px' }}>
              <div 
                className="progress-bar" 
                style={{ width: '85%', background: 'linear-gradient(90deg, #10b981, #059669)' }}
                role="progressbar" 
              />
            </div>
            <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.68rem' }}>
              <span>Target: &gt; 4.0</span>
              <span className="text-success fw-bold">145% of Target</span>
            </div>
          </div>
        </div>

        {/* Metric 2: 7-AAD Viability */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 rounded-4 shadow-sm p-3 h-100" style={{ borderLeft: '4px solid #0d9488' }}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="small text-muted fw-bold text-uppercase" style={{ fontSize: '0.7rem' }}>
                Cell Viability (7-AAD)
              </span>
              <span className="badge rounded-pill text-teal small fw-bold" style={{ backgroundColor: '#eaf7f4', color: '#0d9488' }}>
                Excellent
              </span>
            </div>
            <div className="d-flex align-items-baseline gap-1 mb-2">
              <span className="fw-bold text-dark" style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
                96.4%
              </span>
              <span className="text-muted small" style={{ fontSize: '0.78rem' }}>viable stem cells</span>
            </div>
            <div className="progress mb-1.5" style={{ height: '7px', borderRadius: '4px' }}>
              <div 
                className="progress-bar" 
                style={{ width: '96.4%', background: 'linear-gradient(90deg, #0d9488, #0f766e)' }}
                role="progressbar" 
              />
            </div>
            <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.68rem' }}>
              <span>Minimum: 85%</span>
              <span className="fw-bold" style={{ color: '#0d9488' }}>+11.4% margin</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Total Nucleated Cells */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 rounded-4 shadow-sm p-3 h-100" style={{ borderLeft: '4px solid #3b82f6' }}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="small text-muted fw-bold text-uppercase" style={{ fontSize: '0.7rem' }}>
                TNC Yield
              </span>
              <span className="badge rounded-pill bg-primary-subtle text-primary small fw-bold">
                Normal
              </span>
            </div>
            <div className="d-flex align-items-baseline gap-1 mb-2">
              <span className="fw-bold text-dark" style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
                8.40
              </span>
              <span className="text-muted small" style={{ fontSize: '0.78rem' }}>× 10⁸ / kg</span>
            </div>
            <div className="progress mb-1.5" style={{ height: '7px', borderRadius: '4px' }}>
              <div 
                className="progress-bar bg-primary" 
                style={{ width: '78%' }}
                role="progressbar" 
              />
            </div>
            <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.68rem' }}>
              <span>Target: &gt; 5.0</span>
              <span className="text-primary fw-bold">Therapeutic Ready</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Sterility & Endotoxin */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 rounded-4 shadow-sm p-3 h-100" style={{ borderLeft: '4px solid #8b5cf6' }}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="small text-muted fw-bold text-uppercase" style={{ fontSize: '0.7rem' }}>
                Sterility &amp; Bioburden
              </span>
              <span className="badge rounded-pill bg-purple-subtle text-purple small fw-bold" style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>
                Passed
              </span>
            </div>
            <div className="d-flex align-items-baseline gap-1 mb-2">
              <span className="fw-bold text-dark" style={{ fontSize: '1.45rem', letterSpacing: '-0.02em' }}>
                Negative
              </span>
              <span className="text-muted small" style={{ fontSize: '0.78rem' }}>at 14 days</span>
            </div>
            <div className="d-flex align-items-center gap-1 text-success small mb-1" style={{ fontSize: '0.76rem' }}>
              <ShieldCheck size={14} className="text-success" />
              <span className="fw-semibold">Endotoxin &lt; 0.5 EU/mL</span>
            </div>
            <div className="text-muted" style={{ fontSize: '0.68rem' }}>
              CDSCO BACTEC Continuous Blood Culture
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          SPLIT VIEW:
          LEFT: Interactive Laboratory Document Sheet
          RIGHT: Clinical Decision Workbench
      ---------------------------------------------------------------------- */}
      <div className="row g-4">
        {/* LEFT COLUMN: VISUAL DOCUMENT VIEWER */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 rounded-4 shadow-sm overflow-hidden h-100 d-flex flex-column">
            {/* Toolbar */}
            <div className="p-3 border-bottom d-flex align-items-center justify-content-between bg-light">
              <span className="small fw-bold text-dark d-flex align-items-center gap-2" style={{ fontSize: '0.84rem' }}>
                <Eye size={16} style={{ color: '#0d9488' }} />
                <span>Verified Diagnostic Lab Sheet</span>
              </span>

              <div className="d-flex align-items-center gap-1.5">
                <button
                  type="button"
                  className="btn btn-sm btn-white border rounded-circle p-1 d-flex align-items-center justify-content-center"
                  style={{ width: '28px', height: '28px' }}
                  onClick={() => setZoomLevel(Math.max(80, zoomLevel - 10))}
                  title="Zoom Out"
                >
                  <ZoomOut size={13} />
                </button>
                <span className="small text-muted font-monospace px-1" style={{ fontSize: '0.72rem' }}>
                  {zoomLevel}%
                </span>
                <button
                  type="button"
                  className="btn btn-sm btn-white border rounded-circle p-1 d-flex align-items-center justify-content-center"
                  style={{ width: '28px', height: '28px' }}
                  onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
                  title="Zoom In"
                >
                  <ZoomIn size={13} />
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div 
              className="p-4 flex-grow-1" 
              style={{ 
                overflowY: 'auto', 
                maxHeight: '680px',
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top left',
                transition: 'transform 0.15s ease'
              }}
            >
              {/* Institutional Header */}
              <div className="border-bottom pb-3 mb-3 text-center">
                <div className="badge rounded-pill mb-1 px-3 py-1 small fw-bold" style={{ backgroundColor: '#eaf7f4', color: '#0d9488', fontSize: '0.7rem' }}>
                  KOSHIKA ADVANCED CELLULAR THERAPY NETWORK
                </div>
                <h5 className="fw-bold text-dark mb-0" style={{ letterSpacing: '-0.01em' }}>
                  CLINICAL FLOW CYTOMETRY &amp; HLA LABORATORY
                </h5>
                <div className="text-muted small mt-1" style={{ fontSize: '0.72rem' }}>
                  NABL ISO 15189:2022 Certified • FACT-JACIE Quality Standards • CDSCO Form 28D
                </div>
              </div>

              {/* Lab Metadata Table */}
              <div className="p-3 rounded-3 bg-light border mb-3 small" style={{ fontSize: '0.76rem' }}>
                <div className="row g-2">
                  <div className="col-6">
                    <span className="text-muted">Patient Name:</span> <strong className="text-dark d-block">{report.patientName}</strong>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">Medical Record ID:</span> <strong className="font-monospace d-block text-dark">{report.patientId}</strong>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">Sample Barcode:</span> <span className="font-monospace text-teal fw-semibold d-block" style={{ color: '#0d9488' }}>{report.sampleBarcode}</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">Specimen Source:</span> <span className="text-dark fw-semibold d-block">{report.specimenSource || 'Apheresis MNC'}</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">Collection Date:</span> <span className="d-block">{report.date}</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">Signing Pathologist:</span> <span className="d-block text-dark">{report.labDirector}</span>
                  </div>
                </div>
              </div>

              {/* Biomarkers Table */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1.5">
                  <span className="fw-bold small text-dark" style={{ fontSize: '0.78rem' }}>
                    QUANTITATIVE PARAMETERS:
                  </span>
                  <span className="badge bg-light text-muted border small" style={{ fontSize: '0.68rem' }}>
                    Flow Cytometry 4-Color
                  </span>
                </div>
                <div className="table-responsive">
                  <table className="table table-sm table-bordered align-middle mb-0" style={{ fontSize: '0.76rem' }}>
                    <thead className="table-light">
                      <tr>
                        <th>Investigation / Biomarker</th>
                        <th>Observed</th>
                        <th>Reference</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.biomarkers?.map((b, idx) => (
                        <tr key={idx}>
                          <td className="fw-semibold text-dark">{b.name}</td>
                          <td className="fw-bold font-monospace" style={{ color: '#0d9488' }}>{b.value}</td>
                          <td className="text-muted">{b.refRange}</td>
                          <td>
                            <span className="badge bg-success-subtle text-success small" style={{ fontSize: '0.68rem' }}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* High-Resolution HLA Allele Matrix */}
              {report.hlaTyping && (
                <div className="p-3 rounded-3 bg-light border mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="fw-bold text-dark small d-flex align-items-center gap-1.5" style={{ fontSize: '0.78rem' }}>
                      <ShieldCheck size={14} style={{ color: '#0d9488' }} />
                      <span>HLA Allelic Concordance Matrix:</span>
                    </div>
                    <span className="badge rounded-pill bg-success text-white small fw-bold px-2 py-0.5">
                      {report.hlaTyping.matchGrade || '10/10 Matched'}
                    </span>
                  </div>

                  <div className="row g-2 small" style={{ fontSize: '0.74rem' }}>
                    <div className="col-4">
                      <div className="p-1.5 rounded-2 border text-center" style={{ backgroundColor: 'var(--k-surface-alt)', borderColor: 'var(--k-border)' }}>
                        <span className="text-muted d-block" style={{ fontSize: '0.66rem' }}>LOCUS A</span>
                        <strong className="text-dark font-monospace">{report.hlaTyping.locusA}</strong>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-1.5 rounded-2 border text-center" style={{ backgroundColor: 'var(--k-surface-alt)', borderColor: 'var(--k-border)' }}>
                        <span className="text-muted d-block" style={{ fontSize: '0.66rem' }}>LOCUS B</span>
                        <strong className="text-dark font-monospace">{report.hlaTyping.locusB}</strong>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-1.5 rounded-2 border text-center" style={{ backgroundColor: 'var(--k-surface-alt)', borderColor: 'var(--k-border)' }}>
                        <span className="text-muted d-block" style={{ fontSize: '0.66rem' }}>LOCUS C</span>
                        <strong className="text-dark font-monospace">{report.hlaTyping.locusC}</strong>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-1.5 rounded-2 border text-center" style={{ backgroundColor: 'var(--k-surface-alt)', borderColor: 'var(--k-border)' }}>
                        <span className="text-muted d-block" style={{ fontSize: '0.66rem' }}>DRB1</span>
                        <strong className="text-dark font-monospace">{report.hlaTyping.locusDRB1}</strong>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-1.5 rounded-2 border text-center" style={{ backgroundColor: 'var(--k-surface-alt)', borderColor: 'var(--k-border)' }}>
                        <span className="text-muted d-block" style={{ fontSize: '0.66rem' }}>DQB1</span>
                        <strong className="text-dark font-monospace">{report.hlaTyping.locusDQB1}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Digital Stamp & Pathologist Signature */}
              <div className="pt-3 border-top d-flex justify-content-between align-items-end mt-3">
                <div className="small text-muted" style={{ fontSize: '0.68rem' }}>
                  Electronic Signature Token: <strong className="font-monospace">KSH-2026-SHA256</strong><br />
                  Audit Timestamp: 2026-09-24 14:18:22 IST
                </div>
                <div className="text-end">
                  <div className="small fw-bold text-dark" style={{ fontSize: '0.78rem' }}>{report.labDirector}</div>
                  <div className="text-muted" style={{ fontSize: '0.68rem' }}>Director, Cellular Pathology</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CLINICAL DECISION WORKBENCH */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 rounded-4 shadow-sm p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              {/* Section Header */}
              <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '32px', height: '32px', backgroundColor: '#0d9488' }}>
                    <Zap size={16} />
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '1rem' }}>Clinical Decision Workbench</h5>
                    <span className="text-muted small" style={{ fontSize: '0.74rem' }}>Attending Physician Verification</span>
                  </div>
                </div>
                <span className="badge rounded-pill bg-light text-teal border px-2.5 py-1 small fw-bold" style={{ color: '#0d9488' }}>
                  AI + Flow Cytometry Validated
                </span>
              </div>

              {/* Visual Target Checklist */}
              <div className="p-3 rounded-3 mb-3" style={{ backgroundColor: 'var(--k-surface-alt)', border: '1px solid var(--k-border)' }}>
                <span className="small text-uppercase fw-bold d-block mb-2" style={{ fontSize: '0.7rem', color: 'var(--k-primary)', letterSpacing: '0.04em' }}>
                  Protocol Clearance Criteria
                </span>
                <div className="d-flex flex-column gap-2 small" style={{ fontSize: '0.8rem' }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center gap-2 text-dark">
                      <CheckCircle2 size={15} className="text-success flex-shrink-0" />
                      <span>CD34+ mobilization exceeds minimum 4.0 × 10⁶/kg</span>
                    </span>
                    <strong className="text-success">5.82 × 10⁶ (Pass)</strong>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center gap-2 text-dark">
                      <CheckCircle2 size={15} className="text-success flex-shrink-0" />
                      <span>Cell viability post-apheresis &gt; 85%</span>
                    </span>
                    <strong className="text-success">96.4% (Pass)</strong>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center gap-2 text-dark">
                      <CheckCircle2 size={15} className="text-success flex-shrink-0" />
                      <span>Donor HLA high-resolution allelic match</span>
                    </span>
                    <strong className="text-success">10/10 Matched</strong>
                  </div>
                </div>
              </div>

              {/* AI Clinical Insight Banner */}
              <div className="p-3 rounded-3 border mb-3" style={{ backgroundColor: 'var(--k-surface-alt)', borderLeft: '4px solid #0d9488', borderColor: 'var(--k-border)' }}>
                <div className="d-flex align-items-center justify-content-between mb-1.5">
                  <span 
                    className="badge rounded-pill px-2.5 py-0.5 small fw-bold text-uppercase d-flex align-items-center gap-1"
                    style={{ backgroundColor: '#eaf7f4', color: '#0d9488', fontSize: '0.68rem' }}
                  >
                    <Sparkles size={11} />
                    <span>AI-Assisted Clinical Interpretation</span>
                  </span>
                  <span className="text-muted" style={{ fontSize: '0.68rem' }}>Clinical Decision Support</span>
                </div>
                <p className="small text-secondary mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.45' }}>
                  {report.clinicalNotes || 'The apheresis product yields adequate therapeutic CD34+ cell dose (>5.0 x 10^6/kg recipient body weight). Excellent post-collection viability (96.4%). Recommend proceeding with cryopreservation protocol KSH-CP-04 in 10% DMSO media.'}
                </p>
              </div>

              {/* Quick Preset Tags for Quick Assessment */}
              <div className="mb-3">
                <label className="form-label small text-muted fw-bold text-uppercase mb-1.5" style={{ fontSize: '0.7rem' }}>
                  Quick Preset Findings:
                </label>
                <div className="d-flex flex-wrap gap-1.5">
                  {quickPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="btn btn-sm btn-light border rounded-pill px-2.5 py-1 text-secondary"
                      style={{ fontSize: '0.74rem' }}
                      onClick={() => setDoctorNote(prev => prev ? `${prev} ${preset}.` : `${preset}.`)}
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Doctor's Assessment Field */}
              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between mb-1.5">
                  <span className="small text-uppercase fw-bold text-dark" style={{ fontSize: '0.74rem' }}>
                    Physician Clinical Assessment
                  </span>
                  <span className="badge bg-primary-subtle text-primary small" style={{ fontSize: '0.68rem' }}>
                    EHR Permanent Record
                  </span>
                </div>
                <textarea
                  className="form-control rounded-3 small"
                  rows="3"
                  value={doctorNote}
                  onChange={(e) => setDoctorNote(e.target.value)}
                  placeholder="Record your clinical rationale, conditioning protocol instructions, or remarks..."
                  style={{ fontSize: '0.82rem', borderColor: '#cbd5e1' }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-top d-flex flex-wrap gap-2 justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-sm btn-outline-warning rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5 small fw-semibold"
                style={{ fontSize: '0.8rem' }}
                onClick={() => setShowReqModal(true)}
              >
                <HelpCircle size={14} />
                <span>Request Re-Assay</span>
              </button>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5 small fw-semibold"
                  style={{ fontSize: '0.8rem' }}
                  onClick={handleSaveNote}
                >
                  <Save size={14} />
                  <span>Save Note</span>
                </button>
                <button
                  type="button"
                  className="btn btn-sm text-white rounded-pill px-3.5 py-1.5 d-flex align-items-center gap-1.5 small fw-semibold shadow-xs"
                  style={{ backgroundColor: '#0d9488', fontSize: '0.82rem' }}
                  onClick={handleMarkReviewed}
                >
                  <CheckCircle2 size={14} />
                  <span>Approve &amp; Sign</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Request Re-assay / Lab Clarification Modal */}
      {showReqModal && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '460px' }}>
            <div className="modal-content border-0 rounded-4 shadow-lg p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-dark mb-0">Request Additional Lab Investigation</h6>
                <button type="button" className="btn-close" onClick={() => setShowReqModal(false)} />
              </div>

              <form onSubmit={handleSendRequestInfo}>
                <p className="small text-muted mb-2" style={{ fontSize: '0.8rem' }}>
                  Send an urgent directive to <strong>{report.labDirector}</strong> regarding Report <strong>{report.id}</strong>.
                </p>
                <textarea
                  className="form-control rounded-3 mb-3 small"
                  rows="3"
                  placeholder="e.g. Please run secondary 7-AAD assay on cryovial #2 and confirm high-resolution DQB1 allele..."
                  value={reqInfoMessage}
                  onChange={(e) => setReqInfoMessage(e.target.value)}
                  required
                />
                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-sm btn-light border rounded-pill px-3" onClick={() => setShowReqModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-sm text-white rounded-pill px-3.5" style={{ backgroundColor: '#0d9488' }}>
                    Send Lab Directive
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

export default DoctorReportReview;
