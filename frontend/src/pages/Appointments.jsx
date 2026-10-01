import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { useTheme } from '../context/ThemeContext';
import TelehealthRoom from '../components/TelehealthRoom';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  User,
  Stethoscope,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  Sparkles,
  PhoneCall,
  Mic,
  MicOff,
  VideoOff,
  Trash2,
  Plus,
  RefreshCw,
  ShieldCheck,
  CalendarPlus,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Building2,
  Info,
  QrCode,
  Printer,
  Check,
  Star,
  Cpu,
  HeartPulse
} from 'lucide-react';

// Verified Specialist Directory for Fast Booking
const SPECIALISTS_DIRECTORY = [
  {
    name: 'Dr. Sharat Damodar, MD',
    cleanSpecialty: 'Hematology & BMT Specialist',
    hospital: 'Narayana Health, Bengaluru',
    experience: '22+ yrs',
    rating: 4.9,
    avatarColor: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
    room: 'OPD Suite 4B',
    nextSlot: 'Tomorrow, 10:30 AM',
    tags: ['Adult BMT', 'CAR-T Therapy']
  },
  {
    name: 'Dr. Sunil Bhat, MD',
    cleanSpecialty: 'Paediatric BMT Specialist',
    hospital: 'Mazumdar Shaw Cancer Centre, Bengaluru',
    experience: '18+ yrs',
    rating: 4.9,
    avatarColor: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
    room: 'Virtual Room #82',
    nextSlot: 'Next Tuesday, 2:00 PM',
    tags: ['Paediatric BMT', 'Thalassemia']
  },
  {
    name: 'Dr. Suparno Chakrabarti, MD',
    cleanSpecialty: 'Haploidentical BMT Specialist',
    hospital: 'Dharamshila Narayana, New Delhi',
    experience: '25+ yrs',
    rating: 4.8,
    avatarColor: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    room: 'OPD Suite 2A',
    nextSlot: 'Thursday, 4:00 PM',
    tags: ['Haplo BMT', 'Cellular Therapy']
  },
  {
    name: 'Dr. Ashish Dixit, MD',
    cleanSpecialty: 'Clinical Hematology & BMT',
    hospital: 'Manipal Hospital, Bengaluru',
    experience: '20+ yrs',
    rating: 4.9,
    avatarColor: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    room: 'OPD Wing C-12',
    nextSlot: 'Friday, 11:30 AM',
    tags: ['Adult Leukemia', 'Harvest']
  }
];

// Helper functions to simplify long medical strings into human-friendly phrases
const getCleanSpecialty = (spec) => {
  if (!spec) return 'Hematology Specialist';
  const s = spec.toLowerCase();
  if (s.includes('paediatric') || s.includes('pediatric')) return 'Paediatric BMT Specialist';
  if (s.includes('haploidentical')) return 'Haploidentical BMT Specialist';
  if (s.includes('car-t')) return 'Cellular Therapy & CAR-T';
  if (s.includes('bmt') || s.includes('marrow') || s.includes('haemato')) return 'Hematology & BMT Specialist';
  return spec.split(';')[0].trim();
};

const getCleanHospital = (hosp) => {
  if (!hosp) return 'Specialist Hospital';
  if (hosp.includes('Narayana Health')) return 'Narayana Health, Bengaluru';
  if (hosp.includes('Mazumdar Shaw')) return 'Mazumdar Shaw Centre, Bengaluru';
  if (hosp.includes('Dharamshila')) return 'Dharamshila Narayana, New Delhi';
  if (hosp.includes('Manipal')) return 'Manipal Hospital, Bengaluru';
  if (hosp.includes('Sanar')) return 'Sanar Hospital, Delhi NCR';
  return hosp.split('&')[0].trim();
};

const getCleanPurpose = (notes) => {
  if (!notes) return 'Consultation & care plan review';
  const n = notes.toLowerCase();
  if (n.includes('hla') || n.includes('donor')) return 'Donor match & conditioning review';
  if (n.includes('conditioning') || n.includes('chemo')) return 'Conditioning chemo protocol';
  if (n.includes('preliminary') || n.includes('panel')) return 'Preliminary donor evaluation';
  if (n.includes('follow-up') || n.includes('follow up')) return 'Post-procedure recovery check';
  if (notes.length <= 42) return notes;
  return notes.split('.')[0].slice(0, 42) + '...';
};

const PRESET_TOPICS = [
  'Donor Match Review',
  'Conditioning Chemo',
  'Second Opinion',
  'Post-Transplant Follow-up',
  'Lab Report Review'
];

const TIME_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM'
];

const Appointments = () => {
  const navigate = useNavigate();
  const { appointments, addAppointment, rescheduleAppointment, cancelAppointment, deleteAppointment } = useRole();
  const { isDark } = useTheme();

  // Primary Segmented Tab: 'scheduled', 'doctors', 'checklist'
  const [activeMainTab, setActiveMainTab] = useState('scheduled');

  // Filter Sub-State for Scheduled Consultations
  const [filterMode, setFilterMode] = useState('ALL'); // ALL, CONFIRMED, VIDEO, OPD, CANCELLED

  // Modals
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const [detailsTarget, setDetailsTarget] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [showOpdPassModal, setShowOpdPassModal] = useState(null);

  // Video call session state
  const [inVideoSession, setInVideoSession] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Booking Form State
  const [selectedDoctor, setSelectedDoctor] = useState(SPECIALISTS_DIRECTORY[0]);
  const [consultationMode, setConsultationMode] = useState('Tele-Consultation (Video)');
  const [selectedDateDay, setSelectedDateDay] = useState('Upcoming Friday');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:30 AM');
  const [selectedTopic, setSelectedTopic] = useState(PRESET_TOPICS[0]);
  const [customNote, setCustomNote] = useState('');

  // Find nearest upcoming confirmed consultation for hero CTA
  const upcomingSpotlight = useMemo(() => {
    return appointments.find(
      (a) => a.status?.toLowerCase() === 'confirmed' || a.status?.toLowerCase() === 'rescheduled'
    );
  }, [appointments]);

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      const modeLower = (appt.mode || '').toLowerCase();
      const statusLower = (appt.status || '').toLowerCase();

      if (filterMode === 'ALL') return true;
      if (filterMode === 'CONFIRMED') return statusLower === 'confirmed';
      if (filterMode === 'VIDEO') return modeLower.includes('tele') || modeLower.includes('video') || modeLower.includes('virtual');
      if (filterMode === 'OPD') return modeLower.includes('person') || modeLower.includes('opd');
      if (filterMode === 'CANCELLED') return statusLower === 'cancelled';
      return true;
    });
  }, [appointments, filterMode]);

  // Counts for pills
  const counts = useMemo(() => {
    return {
      all: appointments.length,
      confirmed: appointments.filter(a => a.status?.toLowerCase() === 'confirmed').length,
      video: appointments.filter(a => (a.mode || '').toLowerCase().includes('tele') || (a.mode || '').toLowerCase().includes('video')).length,
      opd: appointments.filter(a => (a.mode || '').toLowerCase().includes('person') || (a.mode || '').toLowerCase().includes('opd')).length,
      cancelled: appointments.filter(a => a.status?.toLowerCase() === 'cancelled').length
    };
  }, [appointments]);

  // Submit Booking
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const formattedDate = `${selectedDateDay}, ${selectedTimeSlot}`;
    const isVideo = consultationMode.includes('Video') || consultationMode.includes('Tele');

    addAppointment({
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.cleanSpecialty,
      hospital: selectedDoctor.hospital,
      date: formattedDate,
      mode: consultationMode,
      room: isVideo ? `Virtual Room #${Math.floor(10 + Math.random() * 90)}` : selectedDoctor.room,
      notes: `${selectedTopic}${customNote ? ` - ${customNote}` : ''}`
    });

    setShowBookingModal(false);
    setActiveMainTab('scheduled');
    showToast(`Consultation confirmed with ${selectedDoctor.name}!`, 'success');
  };

  // Open booking modal with pre-selected doctor
  const handleBookWithDoctor = (doc) => {
    setSelectedDoctor(doc);
    setShowBookingModal(true);
  };

  // Confirm Reschedule
  const handleConfirmReschedule = (e) => {
    e.preventDefault();
    if (!rescheduleTarget) return;
    rescheduleAppointment(rescheduleTarget.id, newDate, newNotes);
    showToast(`Rescheduled to "${newDate}"`, 'info');
    setRescheduleTarget(null);
  };

  // Confirm Cancel
  const handleConfirmCancel = () => {
    if (!cancelTarget) return;
    cancelAppointment(cancelTarget.id);
    showToast(`Consultation with ${cancelTarget.doctorName} cancelled.`, 'warning');
    setCancelTarget(null);
  };

  // Delete Record
  const handleDelete = (id) => {
    deleteAppointment(id);
    showToast(`Record removed.`, 'info');
  };

  // Print Pass
  const handlePrintPass = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <div className="koshika-animate-fadein pb-5">
      {/* ---------------------------------------------------------------------
          FLOATING TOAST NOTIFICATION
      ---------------------------------------------------------------------- */}
      {toast && (
        <div
          className={`position-fixed bottom-0 end-0 m-4 p-3 rounded-4 shadow-lg text-white d-flex align-items-center gap-2.5 animate__animated animate__fadeInUp ${
            toast.type === 'danger'
              ? 'bg-danger'
              : toast.type === 'warning'
              ? 'bg-warning text-dark'
              : toast.type === 'info'
              ? 'bg-info text-dark'
              : 'bg-success'
          }`}
          style={{ maxWidth: '400px', zIndex: 9999 }}
        >
          {toast.type === 'danger' || toast.type === 'warning' ? (
            <AlertCircle size={18} className="flex-shrink-0" />
          ) : toast.type === 'info' ? (
            <Info size={18} className="flex-shrink-0" />
          ) : (
            <CheckCircle2 size={18} className="flex-shrink-0" />
          )}
          <div className="small flex-grow-1 fw-semibold">{toast.message}</div>
          <button
            type="button"
            className="btn-close btn-close-white ms-auto"
            onClick={() => setToast(null)}
          />
        </div>
      )}

      {/* ---------------------------------------------------------------------
          BACK TO HOME NAVIGATION
      ---------------------------------------------------------------------- */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 text-muted hover-translate-y shadow-xs"
          style={{ fontSize: '0.85rem' }}
          title="Back to Home"
        >
          <ArrowLeft size={15} />
          <span>Back to Home</span>
        </button>
      </div>

      {/* ---------------------------------------------------------------------
          1. CREATIVE PATIENT JOURNEY HEADER BANNER (EXACT KOSHIKA STYLE)
      ---------------------------------------------------------------------- */}
      <div
        className="card border-0 rounded-4 p-4 p-md-5 mb-4 text-white position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          boxShadow: '0 10px 30px -5px rgba(6, 78, 59, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        }}
      >
        <div className="row align-items-center position-relative" style={{ zIndex: 2 }}>
          {/* Left Title & Badges */}
          <div className="col-lg-8">
            <div className="d-flex align-items-center gap-2 mb-2.5 flex-wrap">
              <span
                className="badge rounded-pill px-3 py-1.5 fw-bold d-inline-flex align-items-center gap-1.5"
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <Stethoscope size={14} />
                <span>Specialist Consultations &amp; Telehealth</span>
              </span>
              <span
                className="badge rounded-pill px-3 py-1.5 small fw-semibold d-inline-flex align-items-center gap-1.5"
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <ShieldCheck size={13} />
                <span>Certified Specialist Network (NMC &bull; FACT &bull; EBMT)</span>
              </span>
            </div>

            <h2 className="fw-extrabold mb-2.5 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Consult Specialist Hematologists &amp; BMT Experts
            </h2>

            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.98rem', lineHeight: '1.6', maxWidth: '650px' }}>
              Schedule 1-on-1 encrypted video consultations or hospital visits with verified cellular therapy oncologists. Discuss HLA match reports, conditioning regimens, and recovery protocols.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
            <div className="d-flex flex-column flex-sm-row flex-lg-column gap-2 justify-content-lg-end">
              <button
                type="button"
                onClick={() => setShowBookingModal(true)}
                className="btn rounded-pill px-4 py-2.5 fw-bold shadow-sm d-inline-flex align-items-center justify-content-center gap-2 hover-translate-y koshika-hero-action-btn"
                style={{ backgroundColor: '#ffffff', color: '#064e3b', border: 'none' }}
              >
                <CalendarPlus size={16} color="currentColor" />
                <span>Book New Consultation</span>
              </button>

              {upcomingSpotlight ? (
                <button
                  type="button"
                  onClick={() => {
                    if ((upcomingSpotlight.mode || '').toLowerCase().includes('video')) {
                      setDetailsTarget(upcomingSpotlight);
                      setInVideoSession(true);
                    } else {
                      setShowOpdPassModal(upcomingSpotlight);
                    }
                  }}
                  className="btn btn-warning rounded-pill px-4 py-2.5 fw-bold shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
                  style={isDark ? { background: 'rgba(234, 179, 8, 0.22)', borderColor: '#eab308', color: '#fde047' } : { background: '#fef08a', borderColor: '#fef08a', color: '#1e293b' }}
                >
                  <Video size={16} className={isDark ? 'text-warning' : 'text-dark'} />
                  <span className={isDark ? 'text-warning' : 'text-dark'}>
                    {(upcomingSpotlight.mode || '').toLowerCase().includes('video') ? 'Join Video Room →' : 'View Hospital Pass →'}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveMainTab('doctors')}
                  className="btn btn-warning rounded-pill px-4 py-2.5 fw-bold shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
                  style={isDark ? { background: 'rgba(234, 179, 8, 0.22)', borderColor: '#eab308', color: '#fde047' } : { background: '#fef08a', borderColor: '#fef08a', color: '#1e293b' }}
                >
                  <User size={16} className={isDark ? 'text-warning' : 'text-dark'} />
                  <span className={isDark ? 'text-warning' : 'text-dark'}>Find a Specialist &rarr;</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          2. THE 4-STEP WORKFLOW BAR (CONSULTATION LIFECYCLE PIPELINE)
      ---------------------------------------------------------------------- */}
      <div className={`card border-0 shadow-xs rounded-4 p-3 mb-4 ${isDark ? 'bg-surface' : 'bg-white'}`} style={{ border: isDark ? '1px solid var(--k-border)' : '1px solid #e2e8f0' }}>
        <div className="d-flex align-items-center justify-content-between mb-2 px-1">
          <span className="small text-muted fw-bold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.04em' }}>
            Consultation Workflow Pipeline
          </span>
          <span className="badge rounded-pill bg-light text-secondary border small px-2 py-0.5" style={{ fontSize: '0.68rem' }}>
            {activeMainTab === 'doctors' && 'Step 1: Specialist Selection'}
            {activeMainTab === 'scheduled' && appointments.length > 0 && 'Step 4: Live Session Ready'}
            {activeMainTab === 'checklist' && 'Step 3: Document Prep'}
          </span>
        </div>

        <div className="row g-2 align-items-center text-center">
          {/* Step 1: SELECT SPECIALIST */}
          <div className="col-6 col-md-3">
            <div
              onClick={() => setActiveMainTab('doctors')}
              className={`p-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2 cursor-pointer transition-all ${
                activeMainTab === 'doctors'
                  ? 'bg-teal-subtle text-teal fw-bold border shadow-xs'
                  : appointments.length > 0
                  ? 'bg-success-subtle text-success fw-semibold border'
                  : 'bg-light text-secondary'
              }`}
              style={{
                cursor: 'pointer',
                borderColor: activeMainTab === 'doctors' ? '#99f6e4' : appointments.length > 0 ? '#bbf7d0' : '#e2e8f0',
                backgroundColor: activeMainTab === 'doctors' ? '#f0fdfa' : appointments.length > 0 ? '#f0fdf4' : '#f8fafc'
              }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                style={{
                  width: '26px',
                  height: '26px',
                  background: activeMainTab === 'doctors' ? '#0d9488' : appointments.length > 0 ? '#10b981' : '#94a3b8',
                  fontSize: '0.75rem'
                }}
              >
                {appointments.length > 0 ? '✓' : '1'}
              </div>
              <div className="text-start">
                <span className="d-block small fw-bold lh-1" style={{ fontSize: '0.8rem' }}>SELECT SPECIALIST</span>
                <span className="text-muted" style={{ fontSize: '0.66rem' }}>Doctor &amp; Center</span>
              </div>
            </div>
          </div>

          {/* Step 2: SCHEDULE & MODE */}
          <div className="col-6 col-md-3">
            <div
              onClick={() => setShowBookingModal(true)}
              className={`p-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2 cursor-pointer transition-all ${
                appointments.length > 0
                  ? 'bg-success-subtle text-success fw-semibold border'
                  : 'bg-light text-secondary'
              }`}
              style={{
                cursor: 'pointer',
                borderColor: appointments.length > 0 ? '#bbf7d0' : '#e2e8f0',
                backgroundColor: appointments.length > 0 ? '#f0fdf4' : '#f8fafc'
              }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                style={{
                  width: '26px',
                  height: '26px',
                  background: appointments.length > 0 ? '#10b981' : '#94a3b8',
                  fontSize: '0.75rem'
                }}
              >
                {appointments.length > 0 ? '✓' : '2'}
              </div>
              <div className="text-start">
                <span className="d-block small fw-bold lh-1" style={{ fontSize: '0.8rem' }}>SCHEDULE &amp; MODE</span>
                <span className="text-muted" style={{ fontSize: '0.66rem' }}>Video or Hospital OPD</span>
              </div>
            </div>
          </div>

          {/* Step 3: ATTACH REPORTS */}
          <div className="col-6 col-md-3">
            <div
              onClick={() => setActiveMainTab('checklist')}
              className={`p-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2 cursor-pointer transition-all ${
                activeMainTab === 'checklist'
                  ? 'bg-teal-subtle text-teal fw-bold border shadow-xs'
                  : 'bg-success-subtle text-success fw-semibold border'
              }`}
              style={{
                cursor: 'pointer',
                borderColor: activeMainTab === 'checklist' ? '#99f6e4' : '#bbf7d0',
                backgroundColor: activeMainTab === 'checklist' ? '#f0fdfa' : '#f0fdf4'
              }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                style={{
                  width: '26px',
                  height: '26px',
                  background: activeMainTab === 'checklist' ? '#0d9488' : '#10b981',
                  fontSize: '0.75rem'
                }}
              >
                ✓
              </div>
              <div className="text-start">
                <span className="d-block small fw-bold lh-1" style={{ fontSize: '0.8rem' }}>ATTACH REPORTS</span>
                <span className="text-muted" style={{ fontSize: '0.66rem' }}>CBC &amp; HLA Auto-linked</span>
              </div>
            </div>
          </div>

          {/* Step 4: ATTEND VISIT */}
          <div className="col-6 col-md-3">
            <div
              onClick={() => setActiveMainTab('scheduled')}
              className={`p-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2 cursor-pointer transition-all ${
                activeMainTab === 'scheduled'
                  ? 'bg-teal-subtle text-teal fw-bold border shadow-xs'
                  : 'bg-light text-secondary'
              }`}
              style={{
                cursor: 'pointer',
                borderColor: activeMainTab === 'scheduled' ? '#99f6e4' : '#e2e8f0',
                backgroundColor: activeMainTab === 'scheduled' ? '#f0fdfa' : '#f8fafc'
              }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                style={{
                  width: '26px',
                  height: '26px',
                  background: activeMainTab === 'scheduled' ? '#0d9488' : '#94a3b8',
                  fontSize: '0.75rem'
                }}
              >
                4
              </div>
              <div className="text-start">
                <span className="d-block small fw-bold lh-1" style={{ fontSize: '0.8rem' }}>ATTEND VISIT</span>
                <span className="text-muted" style={{ fontSize: '0.66rem' }}>Live WebRTC / OPD Pass</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          3. SEGMENTED NAVIGATION TABS (MATCHING MEDICAL REPORT OCR DESIGN)
      ---------------------------------------------------------------------- */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white p-2">
        <div className="d-flex flex-column flex-sm-row gap-2">
          {/* Tab 1: Scheduled Consultations */}
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-4 py-2.5 fw-semibold transition-all d-flex align-items-center justify-content-center gap-2 flex-grow-1 ${
              activeMainTab === 'scheduled'
                ? 'text-white shadow-xs'
                : 'btn-light text-secondary border-0'
            }`}
            style={activeMainTab === 'scheduled' ? { backgroundColor: '#0d9488' } : {}}
            onClick={() => setActiveMainTab('scheduled')}
          >
            <Calendar size={16} />
            <span>My Scheduled Consultations</span>
            <span
              className={`badge rounded-pill ms-1 small fw-bold ${
                activeMainTab === 'scheduled' ? 'bg-white text-dark' : 'bg-secondary bg-opacity-10 text-secondary'
              }`}
            >
              {appointments.length} Booked
            </span>
          </button>

          {/* Tab 2: Certified Specialists Directory */}
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-4 py-2.5 fw-semibold transition-all d-flex align-items-center justify-content-center gap-2 flex-grow-1 ${
              activeMainTab === 'doctors'
                ? 'text-white shadow-xs'
                : 'btn-light text-secondary border-0'
            }`}
            style={activeMainTab === 'doctors' ? { backgroundColor: '#0d9488' } : {}}
            onClick={() => setActiveMainTab('doctors')}
          >
            <User size={16} />
            <span>Certified Specialists Directory</span>
            <span
              className={`badge rounded-pill ms-1 small fw-bold ${
                activeMainTab === 'doctors' ? 'bg-white text-dark' : 'bg-secondary bg-opacity-10 text-secondary'
              }`}
            >
              4 Specialists
            </span>
          </button>

          {/* Tab 3: Pre-Consultation Checklist & Prep */}
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-4 py-2.5 fw-semibold transition-all d-flex align-items-center justify-content-center gap-2 flex-grow-1 ${
              activeMainTab === 'checklist'
                ? 'text-white shadow-xs'
                : 'btn-light text-secondary border-0'
            }`}
            style={activeMainTab === 'checklist' ? { backgroundColor: '#0d9488' } : {}}
            onClick={() => setActiveMainTab('checklist')}
          >
            <FileText size={16} />
            <span>Visit Checklist &amp; Prep</span>
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          4. MAIN CONTENT CONTAINER (PERFECTLY PROPORTIONED, NO TEXT OVERFLOW)
      ---------------------------------------------------------------------- */}

      {/* =====================================================================
          TAB 1: MY SCHEDULED CONSULTATIONS
      ====================================================================== */}
      {activeMainTab === 'scheduled' && (
        <div>
          {/* Sub-Filter Pills */}
          <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2 overflow-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {[
                { id: 'ALL', label: 'All Consultations', count: counts.all, color: '#0f172a' },
                { id: 'CONFIRMED', label: 'Confirmed', count: counts.confirmed, color: '#0d9488' },
                { id: 'VIDEO', label: 'Video Calls', count: counts.video, color: '#2563eb' },
                { id: 'OPD', label: 'Hospital OPD', count: counts.opd, color: '#d97706' },
                { id: 'CANCELLED', label: 'Cancelled', count: counts.cancelled, color: '#e11d48' }
              ].map((tab) => {
                const isActive = filterMode === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFilterMode(tab.id)}
                    className="btn btn-sm rounded-pill px-3 py-1 fw-semibold d-inline-flex align-items-center gap-1.5 transition-all text-nowrap"
                    style={{
                      backgroundColor: isActive ? tab.color : '#ffffff',
                      color: isActive ? '#ffffff' : '#64748b',
                      border: isActive ? `1px solid ${tab.color}` : '1px solid #e2e8f0',
                      fontSize: '0.78rem'
                    }}
                  >
                    <span>{tab.label}</span>
                    <span
                      className="badge rounded-pill px-1.5 py-0.5"
                      style={{
                        backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                        color: isActive ? '#ffffff' : tab.color,
                        fontSize: '0.68rem'
                      }}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setShowBookingModal(true)}
              className="btn btn-sm rounded-pill px-3 py-1 fw-semibold text-white d-inline-flex align-items-center gap-1"
              style={{ backgroundColor: '#0d9488', fontSize: '0.78rem' }}
            >
              <Plus size={14} />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Cards List */}
          {filteredAppointments.length === 0 ? (
            <div
              className="card border-0 rounded-4 p-5 text-center bg-white"
              style={{ border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }}
            >
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2 mx-auto"
                style={{ width: '48px', height: '48px', backgroundColor: '#f1f5f9', color: '#94a3b8' }}
              >
                <Calendar size={22} />
              </div>
              <h3 className="h6 fw-bold text-dark mb-1">No Consultations Found</h3>
              <p className="text-secondary small mb-3" style={{ fontSize: '0.8rem' }}>
                There are no appointments currently under this filter.
              </p>
              <button
                type="button"
                className="btn btn-sm rounded-pill px-3.5 py-1.5 text-white fw-semibold mx-auto"
                style={{ backgroundColor: '#0d9488', fontSize: '0.8rem' }}
                onClick={() => setShowBookingModal(true)}
              >
                Book Consultation
              </button>
            </div>
          ) : (
            <div className="row g-3">
              {filteredAppointments.map((appt) => {
                const isCancelled = appt.status?.toLowerCase() === 'cancelled';
                const isRescheduled = appt.status?.toLowerCase() === 'rescheduled';
                const isTele = (appt.mode?.toLowerCase() || '').includes('tele') || (appt.mode?.toLowerCase() || '').includes('video');
                const cleanSpec = getCleanSpecialty(appt.specialty);
                const cleanHosp = getCleanHospital(appt.hospital);
                const cleanTopic = getCleanPurpose(appt.notes);

                return (
                  <div key={appt.id} className="col-12 col-lg-6">
                    <div
                      className={`card h-100 rounded-4 p-4 border-0 bg-white transition-all shadow-sm ${
                        isCancelled ? 'opacity-75' : ''
                      }`}
                      style={{
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        {/* Header: Doctor Avatar, Name, Specialty & Status Badge */}
                        <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-xs flex-shrink-0"
                              style={{
                                width: '46px',
                                height: '46px',
                                background: isCancelled
                                  ? '#94a3b8'
                                  : isTele
                                  ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)'
                                  : 'linear-gradient(135deg, #0d9488 0%, #059669 100%)',
                                fontSize: '1rem',
                                letterSpacing: '0.02em'
                              }}
                            >
                              {appt.doctorName.replace('Dr. ', '').slice(0, 2).toUpperCase()}
                            </div>

                            <div>
                              <h3
                                className={`fw-bold mb-1 ${isCancelled ? 'text-muted text-decoration-line-through' : 'text-dark'}`}
                                style={{ fontSize: '1rem', lineHeight: 1.3 }}
                              >
                                {appt.doctorName}
                              </h3>
                              <span
                                className="badge rounded-pill px-2.5 py-1 small fw-medium"
                                style={{
                                  backgroundColor: isTele ? '#eff6ff' : '#ecfdf5',
                                  color: isTele ? '#1d4ed8' : '#047857',
                                  border: `1px solid ${isTele ? '#bfdbfe' : '#a7f3d0'}`,
                                  fontSize: '0.72rem'
                                }}
                              >
                                {cleanSpec}
                              </span>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <span
                            className="badge rounded-pill px-3 py-1.5 fw-semibold flex-shrink-0"
                            style={{
                              backgroundColor: isCancelled ? '#fff1f2' : isRescheduled ? '#eff6ff' : '#ecfdf5',
                              color: isCancelled ? '#e11d48' : isRescheduled ? '#2563eb' : '#059669',
                              border: `1px solid ${isCancelled ? '#fecdd3' : isRescheduled ? '#bfdbfe' : '#a7f3d0'}`,
                              fontSize: '0.72rem'
                            }}
                          >
                            {isCancelled ? '● Cancelled' : isRescheduled ? '● Rescheduled' : '● Confirmed'}
                          </span>
                        </div>

                        {/* Timing & Mode Banner Box */}
                        <div
                          className="p-3 rounded-3 mb-3 d-flex align-items-center justify-content-between flex-wrap gap-2"
                          style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <Clock size={16} className="text-teal flex-shrink-0" style={{ color: '#0d9488' }} />
                            <div>
                              <span className="d-block text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                                Date &amp; Time
                              </span>
                              <span className="fw-bold text-dark" style={{ fontSize: '0.84rem' }}>
                                {appt.date}
                              </span>
                            </div>
                          </div>

                          <span
                            className="badge rounded-pill px-2.5 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5"
                            style={{
                              backgroundColor: isTele ? '#eff6ff' : '#fffbeb',
                              color: isTele ? '#1d4ed8' : '#b45309',
                              border: `1px solid ${isTele ? '#bfdbfe' : '#fde68a'}`,
                              fontSize: '0.74rem'
                            }}
                          >
                            {isTele ? <Video size={13} /> : <Building2 size={13} />}
                            <span>{isTele ? 'Online Video Call' : `Hospital OPD (${appt.room || 'Suite 4B'})`}</span>
                          </span>
                        </div>

                        {/* Location & Consultation Focus Details */}
                        <div className="px-1 mb-3.5 d-flex flex-column gap-2">
                          <div className="d-flex align-items-center gap-2 text-secondary">
                            <MapPin size={14} className="text-danger flex-shrink-0" />
                            <span className="small text-dark fw-medium" style={{ fontSize: '0.82rem' }}>
                              {cleanHosp}
                            </span>
                          </div>

                          <div className="d-flex align-items-start gap-2 text-secondary">
                            <FileText size={14} className="text-teal flex-shrink-0 mt-0.5" style={{ color: '#0d9488' }} />
                            <span className="small text-muted" style={{ fontSize: '0.82rem' }}>
                              <strong className="text-secondary">Topic: </strong>
                              {cleanTopic}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Actions: Clear Spacing, Proper Alignment & No Truncation */}
                      <div className="pt-3 border-top d-flex align-items-center justify-content-between flex-wrap gap-2.5" style={{ borderColor: '#f1f5f9' }}>
                        {!isCancelled ? (
                          <>
                            <div className="d-flex align-items-center gap-2">
                              {isTele ? (
                                <button
                                  type="button"
                                  className="btn btn-sm rounded-pill px-3.5 py-1.5 fw-semibold text-white d-inline-flex align-items-center gap-1.5 shadow-xs transition-all"
                                  style={{ backgroundColor: '#2563eb', fontSize: '0.78rem' }}
                                  onClick={() => {
                                    setDetailsTarget(appt);
                                    setInVideoSession(true);
                                  }}
                                >
                                  <Video size={14} />
                                  <span>Join Video</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="btn btn-sm rounded-pill px-3.5 py-1.5 fw-semibold text-white d-inline-flex align-items-center gap-1.5 shadow-xs transition-all"
                                  style={{ backgroundColor: '#0d9488', fontSize: '0.78rem' }}
                                  onClick={() => setShowOpdPassModal(appt)}
                                >
                                  <QrCode size={14} />
                                  <span>View Pass</span>
                                </button>
                              )}

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1.5 fw-medium transition-all"
                                style={{ fontSize: '0.78rem' }}
                                onClick={() => {
                                  setRescheduleTarget(appt);
                                  setNewDate(appt.date);
                                  setNewNotes(appt.notes || '');
                                }}
                              >
                                Reschedule
                              </button>
                            </div>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1.5 fw-medium ms-auto transition-all"
                              style={{ fontSize: '0.78rem' }}
                              onClick={() => setCancelTarget(appt)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="small text-muted" style={{ fontSize: '0.76rem' }}>
                              Appointment slot released
                            </span>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 ms-auto"
                              style={{ fontSize: '0.76rem' }}
                              onClick={() => handleDelete(appt.id)}
                            >
                              <Trash2 size={13} />
                              <span>Remove</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          TAB 2: CERTIFIED SPECIALISTS DIRECTORY
      ====================================================================== */}
      {activeMainTab === 'doctors' && (
        <div>
          <div className="d-flex align-items-center justify-content-between mb-3 px-1">
            <div>
              <h3 className="h6 fw-bold text-dark mb-0.5" style={{ fontSize: '0.98rem' }}>
                Accredited Hematology &amp; BMT Specialists
              </h3>
              <p className="text-secondary small mb-0" style={{ fontSize: '0.78rem' }}>
                Select a certified oncologist to book an instant telehealth video call or hospital OPD visit
              </p>
            </div>
          </div>

          <div className="row g-3">
            {SPECIALISTS_DIRECTORY.map((doc) => (
              <div key={doc.name} className="col-12 col-md-6">
                <div
                  className="card border-0 rounded-4 p-3.5 bg-white shadow-xs h-100 d-flex flex-column justify-content-between"
                  style={{ border: '1px solid #e2e8f0' }}
                >
                  <div>
                    <div className="d-flex align-items-center gap-3 mb-2.5">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-xs flex-shrink-0"
                        style={{ width: '48px', height: '48px', background: doc.avatarColor, fontSize: '1.05rem' }}
                      >
                        {doc.name.replace('Dr. ', '').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="d-flex align-items-center gap-2">
                          <h4 className="fw-bold text-dark mb-0" style={{ fontSize: '0.96rem' }}>
                            {doc.name}
                          </h4>
                          <span className="badge rounded-pill bg-success-subtle text-success small" style={{ fontSize: '0.66rem' }}>
                            ✓ Verified
                          </span>
                        </div>
                        <div className="text-secondary small fw-medium" style={{ fontSize: '0.78rem' }}>
                          {doc.cleanSpecialty}
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-3 bg-light border mb-3 small d-flex flex-column gap-1" style={{ backgroundColor: '#f8fafc' }}>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="text-muted" style={{ fontSize: '0.74rem' }}>Hospital:</span>
                        <span className="fw-medium text-dark" style={{ fontSize: '0.76rem' }}>{doc.hospital}</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="text-muted" style={{ fontSize: '0.74rem' }}>Next Available:</span>
                        <span className="fw-bold text-teal" style={{ color: '#0d9488', fontSize: '0.76rem' }}>{doc.nextSlot}</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="text-muted" style={{ fontSize: '0.74rem' }}>Rating &amp; Experience:</span>
                        <span className="text-dark d-flex align-items-center gap-1" style={{ fontSize: '0.76rem' }}>
                          <Star size={12} className="text-warning fill-warning" />
                          <span>{doc.rating} ({doc.experience})</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                    <span className="small text-muted" style={{ fontSize: '0.72rem' }}>
                      WebRTC HD &bull; OPD Pass
                    </span>
                    <button
                      type="button"
                      onClick={() => handleBookWithDoctor(doc)}
                      className="btn btn-sm rounded-pill px-3.5 py-1.5 fw-semibold text-white d-inline-flex align-items-center gap-1.5"
                      style={{ backgroundColor: '#0d9488', fontSize: '0.78rem' }}
                    >
                      <CalendarPlus size={14} />
                      <span>Book Slot</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: PRE-CONSULTATION CHECKLIST & PREP
      ====================================================================== */}
      {activeMainTab === 'checklist' && (
        <div className="card border-0 rounded-4 p-4 bg-white shadow-xs" style={{ border: '1px solid #e2e8f0' }}>
          <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
            <div>
              <h3 className="h6 fw-bold text-dark mb-0.5" style={{ fontSize: '1rem' }}>
                Pre-Consultation Clinical Checklist
              </h3>
              <p className="text-secondary small mb-0" style={{ fontSize: '0.8rem' }}>
                Essential documents and questions to prepare before speaking with your hematologist
              </p>
            </div>
            <button
              type="button"
              onClick={() => handlePrintPass()}
              className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5"
              style={{ fontSize: '0.78rem' }}
            >
              <Printer size={13} />
              <span>Print Checklist</span>
            </button>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <div className="p-3.5 rounded-3 bg-light border h-100" style={{ backgroundColor: '#f8fafc' }}>
                <h4 className="fw-bold text-dark mb-2.5 small d-flex align-items-center gap-2" style={{ fontSize: '0.86rem' }}>
                  <FileText size={16} className="text-teal" style={{ color: '#0d9488' }} />
                  <span>Required Diagnostic Lab Tests</span>
                </h4>
                <ul className="small text-secondary mb-0 ps-3 d-flex flex-column gap-1.5" style={{ fontSize: '0.8rem' }}>
                  <li>Complete Blood Count (CBC) with differential &amp; Platelet count from within the last 14 days.</li>
                  <li>High-resolution HLA tissue typing report (HLA-A, B, C, DRB1, DQB1).</li>
                  <li>Recent bone marrow biopsy or flow cytometry summary (if available).</li>
                  <li>Viral serology markers: HIV, Hepatitis B (HBsAg), Hepatitis C (HCV), and CMV IgG status.</li>
                </ul>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="p-3.5 rounded-3 bg-light border h-100" style={{ backgroundColor: '#f8fafc' }}>
                <h4 className="fw-bold text-dark mb-2.5 small d-flex align-items-center gap-2" style={{ fontSize: '0.86rem' }}>
                  <Stethoscope size={16} className="text-primary" />
                  <span>Key Questions for Your Hematologist</span>
                </h4>
                <ul className="small text-secondary mb-0 ps-3 d-flex flex-column gap-1.5" style={{ fontSize: '0.8rem' }}>
                  <li>What specific type of transplant (autologous vs allogeneic) is clinically recommended?</li>
                  <li>What is our current donor matching probability across national registries (DATRI, DKMS)?</li>
                  <li>What conditioning chemotherapy regimen will be administered prior to cell infusion?</li>
                  <li>What are the primary precautions for infection control post-transplant?</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-3 d-flex align-items-center justify-content-between flex-wrap gap-2" style={{ backgroundColor: '#f0fdfa', border: '1px solid #ccfbf1' }}>
            <div className="d-flex align-items-center gap-2">
              <ShieldCheck size={18} style={{ color: '#0d9488' }} />
              <span className="small text-dark fw-medium" style={{ fontSize: '0.8rem' }}>
                All uploaded reports in KOSHIKA OCR are automatically synchronized with your attending doctor.
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/ocr-reports')}
              className="btn btn-sm rounded-pill px-3 py-1 text-white fw-semibold"
              style={{ backgroundColor: '#0d9488', fontSize: '0.78rem' }}
            >
              Upload Lab Reports →
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 1: BOOK NEW CONSULTATION (CLEAN & FAST)
      ---------------------------------------------------------------------- */}
      {showBookingModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
              <div
                className="modal-header px-4 py-3 border-bottom"
                style={{ backgroundColor: '#f0fdfa', borderBottomColor: '#ccfbf1' }}
              >
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{ width: '34px', height: '34px', backgroundColor: '#0d9488', color: '#ffffff' }}
                  >
                    <CalendarPlus size={16} />
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-0 text-dark" style={{ fontSize: '0.96rem' }}>
                      Schedule Specialist Consultation
                    </h3>
                    <span className="small text-muted" style={{ fontSize: '0.72rem' }}>
                      Instant slot confirmation &bull; Video WebRTC or Hospital OPD
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowBookingModal(false)}
                  aria-label="Close"
                />
              </div>

              <form onSubmit={handleBookingSubmit}>
                <div className="modal-body p-4" style={{ maxHeight: '68vh', overflowY: 'auto' }}>
                  {/* Choose Specialist */}
                  <div className="mb-3.5">
                    <label className="form-label small fw-bold text-dark mb-1.5" style={{ fontSize: '0.8rem' }}>
                      1. Choose Specialist Doctor
                    </label>
                    <div className="row g-2">
                      {SPECIALISTS_DIRECTORY.map((doc) => {
                        const isSelected = selectedDoctor.name === doc.name;
                        return (
                          <div key={doc.name} className="col-12 col-md-6">
                            <div
                              onClick={() => setSelectedDoctor(doc)}
                              className="p-2.5 rounded-3 d-flex align-items-center gap-2.5 transition-all"
                              style={{
                                cursor: 'pointer',
                                backgroundColor: isSelected ? '#f0fdfa' : '#ffffff',
                                border: isSelected ? '1.5px solid #0d9488' : '1px solid #e2e8f0'
                              }}
                            >
                              <div
                                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                                style={{ width: '34px', height: '34px', background: doc.avatarColor, fontSize: '0.82rem' }}
                              >
                                {doc.name.replace('Dr. ', '').slice(0, 2).toUpperCase()}
                              </div>
                              <div className="flex-grow-1 overflow-hidden">
                                <div className="d-flex align-items-center justify-content-between">
                                  <span className="fw-bold text-dark small text-truncate" style={{ fontSize: '0.82rem' }}>
                                    {doc.name}
                                  </span>
                                  {isSelected && <Check size={14} style={{ color: '#0d9488' }} />}
                                </div>
                                <div className="text-secondary small text-truncate" style={{ fontSize: '0.72rem' }}>
                                  {doc.cleanSpecialty}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Consultation Mode */}
                  <div className="mb-3.5">
                    <label className="form-label small fw-bold text-dark mb-1.5" style={{ fontSize: '0.8rem' }}>
                      2. Choose Consultation Mode
                    </label>
                    <div className="row g-2">
                      <div className="col-6">
                        <div
                          onClick={() => setConsultationMode('Tele-Consultation (Video)')}
                          className="p-2.5 rounded-3 text-center transition-all"
                          style={{
                            cursor: 'pointer',
                            backgroundColor: consultationMode.includes('Video') ? '#eff6ff' : '#ffffff',
                            border: consultationMode.includes('Video') ? '1.5px solid #2563eb' : '1px solid #e2e8f0'
                          }}
                        >
                          <Video size={18} className="text-primary mb-1" />
                          <div className="fw-bold small text-dark" style={{ fontSize: '0.8rem' }}>Video Call</div>
                          <div className="text-muted small" style={{ fontSize: '0.68rem' }}>Encrypted WebRTC</div>
                        </div>
                      </div>

                      <div className="col-6">
                        <div
                          onClick={() => setConsultationMode('In-Person Consultation')}
                          className="p-2.5 rounded-3 text-center transition-all"
                          style={{
                            cursor: 'pointer',
                            backgroundColor: !consultationMode.includes('Video') ? '#fffbeb' : '#ffffff',
                            border: !consultationMode.includes('Video') ? '1.5px solid #d97706' : '1px solid #e2e8f0'
                          }}
                        >
                          <Building2 size={18} className="text-warning mb-1" />
                          <div className="fw-bold small text-dark" style={{ fontSize: '0.8rem' }}>Hospital OPD</div>
                          <div className="text-muted small" style={{ fontSize: '0.68rem' }}>In-Person Suite</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="mb-3.5">
                    <label className="form-label small fw-bold text-dark mb-1.5" style={{ fontSize: '0.8rem' }}>
                      3. Date &amp; Time
                    </label>
                    <div className="row g-1.5 mb-2">
                      {['Today (Urgent)', 'Tomorrow', 'Upcoming Friday', 'Next Monday'].map((day) => (
                        <div key={day} className="col-6 col-sm-3">
                          <button
                            type="button"
                            onClick={() => setSelectedDateDay(day)}
                            className="btn btn-sm w-100 rounded-pill py-1 fw-semibold transition-all"
                            style={{
                              backgroundColor: selectedDateDay === day ? '#0d9488' : '#f8fafc',
                              color: selectedDateDay === day ? '#ffffff' : '#475569',
                              border: selectedDateDay === day ? '1px solid #0d9488' : '1px solid #e2e8f0',
                              fontSize: '0.74rem'
                            }}
                          >
                            {day}
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="d-flex align-items-center gap-1.5 flex-wrap">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className="btn btn-sm rounded-pill px-2.5 py-0.5 fw-semibold transition-all"
                          style={{
                            backgroundColor: selectedTimeSlot === slot ? '#2563eb' : '#ffffff',
                            color: selectedTimeSlot === slot ? '#ffffff' : '#64748b',
                            border: selectedTimeSlot === slot ? '1px solid #2563eb' : '1px solid #e2e8f0',
                            fontSize: '0.74rem'
                          }}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Topic */}
                  <div className="mb-2">
                    <label className="form-label small fw-bold text-dark mb-1" style={{ fontSize: '0.8rem' }}>
                      4. What would you like to discuss?
                    </label>
                    <div className="d-flex align-items-center gap-1.5 flex-wrap mb-2">
                      {PRESET_TOPICS.map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setSelectedTopic(topic)}
                          className="btn btn-sm rounded-pill px-2.5 py-0.5"
                          style={{
                            backgroundColor: selectedTopic === topic ? '#f0fdfa' : '#ffffff',
                            color: selectedTopic === topic ? '#0d9488' : '#475569',
                            border: selectedTopic === topic ? '1.5px solid #0d9488' : '1px solid #e2e8f0',
                            fontSize: '0.72rem'
                          }}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>

                    <input
                      type="text"
                      className="form-control form-control-sm rounded-3 text-dark"
                      placeholder="Optional additional notes..."
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                </div>

                <div className="modal-footer px-4 py-2.5 bg-light border-top d-flex justify-content-between align-items-center">
                  <div className="small text-muted" style={{ fontSize: '0.72rem' }}>
                    {selectedDoctor.name} &bull; {selectedDateDay}, {selectedTimeSlot}
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-light rounded-pill px-3"
                      onClick={() => setShowBookingModal(false)}
                      style={{ fontSize: '0.78rem' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-sm rounded-pill px-3.5 py-1 text-white fw-semibold"
                      style={{ backgroundColor: '#0d9488', fontSize: '0.78rem' }}
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 2: FULL REAL TELEHEALTH VIDEO CALLING SUITE
      ---------------------------------------------------------------------- */}
      {detailsTarget && inVideoSession && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(8px)', zIndex: 1060 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content rounded-4 border-0 shadow-2xl bg-dark text-white overflow-hidden p-0">
              <TelehealthRoom
                role="patient"
                peerName={detailsTarget.doctorName}
                peerSpecialty={getCleanSpecialty(detailsTarget.specialty)}
                peerAvatar={detailsTarget.doctorName.replace('Dr. ', '').slice(0, 2).toUpperCase()}
                roomCode={`OPD-${detailsTarget.id || '4B'}`}
                onEndCall={() => {
                  setInVideoSession(false);
                  setDetailsTarget(null);
                  showToast('Video call ended safely. Clinical summary saved to record.', 'info');
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 3: HOSPITAL OPD DIGITAL PASS
      ---------------------------------------------------------------------- */}
      {showOpdPassModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
              <div
                className="modal-header px-4 py-3 border-bottom text-white"
                style={{ backgroundColor: '#0d9488' }}
              >
                <div className="d-flex align-items-center gap-2">
                  <QrCode size={18} />
                  <div>
                    <h3 className="h6 fw-bold mb-0" style={{ fontSize: '0.96rem' }}>
                      Hospital Clinic Pass
                    </h3>
                    <span className="small opacity-75" style={{ fontSize: '0.7rem' }}>
                      Show at Hospital Reception
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowOpdPassModal(null)}
                  aria-label="Close"
                />
              </div>

              <div className="modal-body p-4 text-center">
                <div className="p-3 bg-light rounded-3 mb-3 border">
                  <div className="fw-bold text-dark fs-6 mb-0.5">{showOpdPassModal.doctorName}</div>
                  <div className="text-secondary small mb-1.5">{getCleanSpecialty(showOpdPassModal.specialty)}</div>
                  <div className="badge bg-white border text-dark px-3 py-1 fw-semibold rounded-pill mb-2">
                    <Clock size={12} className="text-primary me-1" />
                    <span>{showOpdPassModal.date}</span>
                  </div>
                  <div className="small text-muted">
                    {getCleanHospital(showOpdPassModal.hospital)} &bull; <strong className="text-dark">{showOpdPassModal.room || 'Suite 4B'}</strong>
                  </div>
                </div>

                <div
                  className="p-3 bg-white border rounded-3 d-inline-flex flex-column align-items-center justify-content-center shadow-xs mb-3"
                  style={{ width: '130px', height: '130px' }}
                >
                  <QrCode size={95} style={{ color: '#0f172a' }} />
                  <span className="small text-muted font-monospace mt-1" style={{ fontSize: '0.64rem' }}>
                    KSH-{showOpdPassModal.id}-OPD
                  </span>
                </div>

                <div className="p-2 rounded-3 bg-success-subtle text-success small" style={{ fontSize: '0.74rem' }}>
                  ✓ Please arrive 15 minutes prior to appointment time with photo ID.
                </div>
              </div>

              <div className="modal-footer px-4 py-2.5 bg-light border-top d-flex justify-content-between">
                <button
                  type="button"
                  onClick={handlePrintPass}
                  className="btn btn-sm btn-outline-secondary rounded-pill px-3 d-inline-flex align-items-center gap-1.5"
                  style={{ fontSize: '0.78rem' }}
                >
                  <Printer size={13} />
                  <span>Print Slip</span>
                </button>
                <button
                  type="button"
                  className="btn btn-sm rounded-pill px-4 text-white"
                  style={{ backgroundColor: '#0d9488', fontSize: '0.78rem' }}
                  onClick={() => setShowOpdPassModal(null)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 4: RESCHEDULE MODAL
      ---------------------------------------------------------------------- */}
      {rescheduleTarget && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
              <div className="modal-header px-4 py-2.5 border-bottom bg-light">
                <div className="d-flex align-items-center gap-2">
                  <RefreshCw size={16} style={{ color: '#0284c7' }} />
                  <h3 className="h6 fw-bold mb-0 text-dark" style={{ fontSize: '0.94rem' }}>
                    Reschedule Consultation
                  </h3>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setRescheduleTarget(null)}
                  aria-label="Close"
                />
              </div>

              <form onSubmit={handleConfirmReschedule}>
                <div className="modal-body p-4">
                  <div className="p-2.5 bg-light rounded-3 mb-3 border">
                    <div className="fw-bold text-dark small">{rescheduleTarget.doctorName}</div>
                    <div className="text-secondary small" style={{ fontSize: '0.72rem' }}>{getCleanHospital(rescheduleTarget.hospital)}</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark mb-1" style={{ fontSize: '0.78rem' }}>
                      Choose New Day &amp; Time
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-3 text-dark"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="e.g. Next Wednesday, 03:00 PM"
                      required
                      style={{ fontSize: '0.82rem' }}
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label small fw-semibold text-dark mb-1" style={{ fontSize: '0.78rem' }}>
                      Reason for Rescheduling
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-3 text-dark"
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      placeholder="Brief note..."
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                </div>

                <div className="modal-footer px-4 py-2.5 bg-light border-top d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-light rounded-pill px-3"
                    onClick={() => setRescheduleTarget(null)}
                    style={{ fontSize: '0.78rem' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm rounded-pill px-3.5 text-white"
                    style={{ backgroundColor: '#0284c7', fontSize: '0.78rem' }}
                  >
                    Confirm Reschedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 5: CANCEL CONFIRMATION MODAL
      ---------------------------------------------------------------------- */}
      {cancelTarget && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
              <div className="modal-header px-4 py-2.5 border-bottom bg-light">
                <div className="d-flex align-items-center gap-2">
                  <AlertCircle size={16} className="text-danger" />
                  <h3 className="h6 fw-bold mb-0 text-dark" style={{ fontSize: '0.94rem' }}>
                    Cancel Consultation?
                  </h3>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setCancelTarget(null)}
                  aria-label="Close"
                />
              </div>

              <div className="modal-body p-4">
                <p className="text-secondary small mb-2" style={{ fontSize: '0.82rem' }}>
                  Are you sure you want to cancel your consultation with <strong className="text-dark">{cancelTarget.doctorName}</strong> on <strong className="text-dark">{cancelTarget.date}</strong>?
                </p>
                <div className="p-2.5 bg-light rounded-3 border small text-muted" style={{ fontSize: '0.74rem' }}>
                  Your slot will be released back to the clinic registry. You can easily rebook at any time.
                </div>
              </div>

              <div className="modal-footer px-4 py-2.5 bg-light border-top d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light rounded-pill px-3"
                  onClick={() => setCancelTarget(null)}
                  style={{ fontSize: '0.78rem' }}
                >
                  Keep Slot
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger rounded-pill px-3.5 fw-semibold"
                  onClick={handleConfirmCancel}
                  style={{ fontSize: '0.78rem' }}
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
