import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PATIENTS_DATA, MEDICAL_REPORTS_DATA } from '../data/mockData';
import TelehealthRoom from '../components/TelehealthRoom';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Share2,
  FileText,
  Calendar,
  Clock,
  User,
  Heart,
  Activity,
  CheckCircle2,
  AlertCircle,
  Save,
  ArrowLeft,
  MessageSquare,
  ShieldCheck,
  Maximize2,
  Zap,
  Sparkles,
  Thermometer,
  Layers,
  Send,
  Pill,
  ChevronRight
} from 'lucide-react';

const DoctorConsultation = () => {
  const [searchParams] = useSearchParams();
  const patientParam = searchParams.get('patient') || 'PT-9042';

  const patient = PATIENTS_DATA.find(p => p.id === patientParam) || PATIENTS_DATA[0];
  const patientReports = MEDICAL_REPORTS_DATA.filter(r => r.patientId === patient.id || r.patientId === 'PT-9042');

  // Video session state
  const [isConnected, setIsConnected] = useState(true);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showVitalsOverlay, setShowVitalsOverlay] = useState(true);

  // Post-consultation state
  const [consultSummary, setConsultSummary] = useState(
    'Patient evaluated for allogeneic stem cell transplantation. Harvested CD34+ cell dose reviewed and deemed optimal. Patient tolerated mobilization well. Conditioning protocol scheduled.'
  );
  const [followUpDate, setFollowUpDate] = useState('2026-10-12');
  const [selectedMeds, setSelectedMeds] = useState(['Tacrolimus 1mg BID', 'Filgrastim 300mcg']);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSaveConsultation = (e) => {
    e.preventDefault();
    showToast('Consultation summary, supportive meds, and follow-up committed to EHR.');
  };

  const quickTags = [
    'Tolerating conditioning well',
    'No signs of acute GvHD',
    'Neutrophil engraftment steady',
    'Discharge planning initiated',
    'Hydration protocol continued'
  ];

  const toggleMed = (med) => {
    if (selectedMeds.includes(med)) {
      setSelectedMeds(selectedMeds.filter(m => m !== med));
    } else {
      setSelectedMeds([...selectedMeds, med]);
    }
  };

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
          TOP BREADCRUMB & SESSION STATUS
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
            Telehealth Suite
          </span>
          <span className="text-dark small fw-semibold">Consultation #{patient.id}</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span 
            className="badge rounded-pill px-3 py-1.5 small fw-bold d-flex align-items-center gap-2 shadow-xs"
            style={isConnected ? { backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0' } : { backgroundColor: '#fee2e2', color: '#b91c1c' }}
          >
            <span 
              className="rounded-circle" 
              style={{ 
                width: '9px', 
                height: '9px', 
                backgroundColor: isConnected ? '#16a34a' : '#dc2626',
                boxShadow: isConnected ? '0 0 8px #16a34a' : 'none'
              }}
            />
            <span>{isConnected ? 'HD Video Tele-Session Active' : 'Session Disconnected'}</span>
          </span>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          PATIENT IDENTITY STRIP
      ---------------------------------------------------------------------- */}
      <div 
        className="card border-0 rounded-4 p-3.5 p-md-4 mb-4 text-white position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          boxShadow: '0 10px 30px -5px rgba(6, 78, 59, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#ffffff'
        }}
      >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 position-relative" style={{ zIndex: 2 }}>
          <div className="d-flex align-items-center gap-3">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0 top-head-badge-white"
              style={{ width: '48px', height: '48px', backgroundColor: 'var(--k-surface)', color: 'var(--k-primary)', fontSize: '1.15rem' }}
            >
              {patient.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                <h5 className="fw-bold text-white mb-0" style={{ fontSize: '1.25rem' }}>{patient.name}</h5>
                <span className="badge rounded-pill font-monospace px-2.5 py-0.5 small" style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                  {patient.id}
                </span>
                <span className="badge rounded-pill bg-danger text-white fw-bold small px-2 py-0.5">
                  {patient.bloodGroup}
                </span>
                <span className="badge rounded-pill px-2.5 py-0.5 small fw-semibold" style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                  HLA {patient.hlaStatus || '10/10 Matched'}
                </span>
              </div>
              <div className="text-white text-opacity-90 small" style={{ fontSize: '0.84rem' }}>
                Diagnosis: <strong className="text-white">{patient.diagnosis}</strong> ({patient.stage || 'CR1 Remission'}) • Mode: <span className="text-white fw-bold">Virtual Telehealth Room #82</span>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            <Link
              to={`/doctor/patients/${patient.id}`}
              className="btn btn-sm rounded-pill px-3.5 py-2 small fw-semibold hover-translate-y"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                fontSize: '0.82rem'
              }}
            >
              <span className="text-white">View Full Chart</span>
            </Link>
            <Link
              to={`/doctor/reports?patient=${patient.id}`}
              className="btn btn-sm rounded-pill px-4 py-2 small fw-bold shadow-sm hover-translate-y koshika-hero-action-btn"
              style={{
                backgroundColor: '#ffffff',
                color: '#064e3b',
                border: 'none',
                fontSize: '0.82rem'
              }}
            >
              <span>Review Lab Assays</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          TWO-COLUMN WORKSPACE:
          Left (8 cols): Interactive Telehealth Video Console + Post-Consultation Doc
          Right (4 cols): Live Patient Chart & Lab Quick View
      ---------------------------------------------------------------------- */}
      <div className="row g-4">
        {/* LEFT COLUMN */}
        <div className="col-12 col-lg-8">
          
          {/* Interactive Full Telehealth Video Console */}
          {isConnected ? (
            <div className="mb-4">
              <TelehealthRoom
                role="doctor"
                peerName={patient.name}
                peerSpecialty={`${patient.diagnosis} • ${patient.stage || 'CR1 Remission'}`}
                peerAvatar={patient.name.slice(0, 2).toUpperCase()}
                patient={patient}
                roomCode={`PT-${patient.id}`}
                onEndCall={() => {
                  setIsConnected(false);
                  showToast('Consultation tele-session ended. Please complete clinical notes below.');
                }}
              />
            </div>
          ) : (
            <div className="card border-0 rounded-4 p-5 mb-4 text-center bg-dark text-white shadow-sm">
              <PhoneOff size={46} className="text-danger mx-auto mb-3" />
              <h4 className="fw-bold mb-1">Telehealth Session Disconnected</h4>
              <p className="text-white-50 small mb-4">
                WebRTC stream for Consultation #{patient.id} was terminated. You can review charts and finalize prescription below.
              </p>
              <div>
                <button
                  type="button"
                  className="btn btn-teal rounded-pill px-4 py-2 fw-semibold text-white d-inline-flex align-items-center gap-2"
                  style={{ backgroundColor: '#0d9488' }}
                  onClick={() => setIsConnected(true)}
                >
                  <Video size={16} />
                  <span>Re-enter Video Call</span>
                </button>
              </div>
            </div>
          )}

          {/* POST CONSULTATION DOCUMENTATION WORKBENCH */}
          <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
              <div>
                <h5 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                  <CheckCircle2 size={18} style={{ color: '#0d9488' }} />
                  <span>Post-Consultation Documentation</span>
                </h5>
                <span className="text-secondary small" style={{ fontSize: '0.78rem' }}>
                  Rapid clinical notes, supportive medication plan, and scheduled follow-up
                </span>
              </div>
              <span className="badge rounded-pill bg-light text-muted border px-2.5 py-1 small">
                Attending Review
              </span>
            </div>

            <form onSubmit={handleSaveConsultation}>
              {/* Quick Preset Finding Chips */}
              <div className="mb-3">
                <label className="form-label small text-muted fw-bold text-uppercase mb-1.5" style={{ fontSize: '0.7rem' }}>
                  Quick Clinical Observations:
                </label>
                <div className="d-flex flex-wrap gap-1.5">
                  {quickTags.map((tag, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="btn btn-sm btn-light border rounded-pill px-2.5 py-1 text-secondary"
                      style={{ fontSize: '0.74rem' }}
                      onClick={() => setConsultSummary(prev => prev ? `${prev} ${tag}.` : `${tag}.`)}
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consultation Notes Textarea */}
              <div className="mb-3">
                <label className="form-label small fw-bold text-dark mb-1" style={{ fontSize: '0.82rem' }}>
                  Clinical Assessment &amp; Protocol Directives
                </label>
                <textarea
                  className="form-control rounded-3 small"
                  rows="3"
                  value={consultSummary}
                  onChange={(e) => setConsultSummary(e.target.value)}
                  placeholder="Record patient tolerance, GvHD staging, stem cell dose clearance, or home care instructions..."
                  style={{ fontSize: '0.84rem', borderColor: '#cbd5e1' }}
                  required
                />
              </div>

              {/* Supportive Medications Checklist */}
              <div className="mb-3 p-3 rounded-3 bg-light border">
                <label className="form-label small fw-bold text-dark mb-2 d-flex align-items-center gap-1.5" style={{ fontSize: '0.8rem' }}>
                  <Pill size={15} style={{ color: '#0d9488' }} />
                  <span>Supportive Medications &amp; Immunosuppressive Protocol</span>
                </label>
                <div className="d-flex flex-wrap gap-2">
                  {['Tacrolimus 1mg BID', 'Filgrastim 300mcg', 'Acyclovir 400mg', 'Fluconazole 200mg', 'Ondansetron 8mg'].map((med) => {
                    const isSelected = selectedMeds.includes(med);
                    return (
                      <button
                        key={med}
                        type="button"
                        className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold transition-all ${
                          isSelected ? 'text-white' : 'btn-white border text-secondary'
                        }`}
                        style={isSelected ? { backgroundColor: '#0d9488', fontSize: '0.76rem' } : { fontSize: '0.76rem' }}
                        onClick={() => toggleMed(med)}
                      >
                        {isSelected ? '✓ ' : '+ '} {med}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Follow-up Date */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-sm-6">
                  <label className="form-label small fw-bold text-dark mb-1" style={{ fontSize: '0.8rem' }}>
                    Scheduled Follow-up Date
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-sm rounded-3"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 col-sm-6 d-flex align-items-end">
                  <span className="small text-muted" style={{ fontSize: '0.76rem' }}>
                    Auto-sends SMS reminder &amp; creates calendar event.
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-sm text-white rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-semibold shadow-xs"
                  style={{ backgroundColor: '#0d9488', fontSize: '0.86rem' }}
                >
                  <Save size={16} />
                  <span>Save Consultation &amp; Update Record</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* RIGHT COLUMN: CLINICAL SNAPSHOT */}
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-column gap-3">
            
            {/* 1. Patient Quick Biomarkers Card */}
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white" style={{ border: '1px solid #e2e8f0' }}>
              <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                <h6 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2" style={{ fontSize: '0.9rem' }}>
                  <Activity size={16} style={{ color: '#0d9488' }} />
                  <span>Patient Profile</span>
                </h6>
                <span className="badge rounded-pill bg-danger-subtle text-danger fw-bold px-2 py-0.5 small">
                  {patient.bloodGroup}
                </span>
              </div>

              <div className="mb-3">
                <span className="text-muted small fw-bold text-uppercase d-block mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                  Primary Diagnosis
                </span>
                <div className="fw-bold text-dark fs-6 mb-0.5">
                  {patient.diagnosis}
                </div>
                <div className="text-secondary small" style={{ fontSize: '0.8rem' }}>
                  {patient.stage || 'First Complete Remission (CR1)'}
                </div>
              </div>

              <div className="d-flex align-items-center gap-2 flex-wrap pt-2.5 border-top">
                <span 
                  className="badge rounded-pill px-2.5 py-1 small fw-semibold"
                  style={{ backgroundColor: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', fontSize: '0.74rem' }}
                >
                  HLA {patient.hlaStatus || '10/10 Matched'}
                </span>
                <span 
                  className="badge rounded-pill px-2.5 py-1 small fw-semibold"
                  style={{ backgroundColor: '#eaf7f4', color: '#0d9488', border: '1px solid #bfe5dd', fontSize: '0.74rem' }}
                >
                  CD34+: {patient.cd34Count || '5.82 M/kg'}
                </span>
              </div>
            </div>

            {/* 2. Relevant Laboratory Reports */}
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white" style={{ border: '1px solid #e2e8f0' }}>
              <h6 className="fw-bold text-dark mb-3 pb-2 border-bottom d-flex align-items-center gap-2" style={{ fontSize: '0.9rem' }}>
                <FileText size={16} style={{ color: '#0d9488' }} />
                <span>Verified Diagnostic Assays ({patientReports.length})</span>
              </h6>

              <div className="d-flex flex-column gap-2.5">
                {patientReports.map((r) => (
                  <div
                    key={r.id}
                    className="p-3 rounded-3 border bg-light d-flex justify-content-between align-items-center gap-2"
                  >
                    <div className="overflow-hidden">
                      <div className="fw-bold text-dark small text-truncate mb-0.5" style={{ fontSize: '0.82rem' }}>
                        {r.reportTitle}
                      </div>
                      <div className="text-muted small" style={{ fontSize: '0.72rem' }}>
                        {r.date} • <span className="text-success fw-semibold">{r.status}</span>
                      </div>
                    </div>
                    <Link
                      to={`/doctor/reports?report=${r.id}`}
                      className="btn btn-sm btn-white border rounded-pill px-3 py-1 small fw-bold flex-shrink-0"
                      style={{ color: '#0d9488', fontSize: '0.74rem' }}
                    >
                      Review
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Previous Consultation Notes */}
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white" style={{ border: '1px solid #e2e8f0' }}>
              <h6 className="fw-bold text-dark mb-2.5 pb-2 border-bottom d-flex align-items-center gap-2" style={{ fontSize: '0.9rem' }}>
                <Clock size={16} style={{ color: '#0d9488' }} />
                <span>Historical Session Log</span>
              </h6>

              <div className="p-3 rounded-3 bg-light border small text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                <div className="fw-bold text-dark mb-1">Previous Review (2026-09-20):</div>
                "Allogeneic workup completed. Evaluated marrow aspirate and confirmed complete remission (CR1). Discussed conditioning regimen with patient and family."
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorConsultation;
