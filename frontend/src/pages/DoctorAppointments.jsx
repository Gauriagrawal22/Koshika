import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { useAuth } from '../context/AuthContext';
import { PATIENTS_DATA } from '../data/mockData';
import {
  Calendar,
  Clock,
  Video,
  User,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Stethoscope,
  Activity,
  CalendarCheck,
  Building2,
  RefreshCw,
  Plus
} from 'lucide-react';

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { appointments: roleAppointments, cancelAppointment } = useRole();

  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'TODAY' | 'VIDEO' | 'OPD' | 'COMPLETED'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('Today');
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Calendar dates for the week
  const weekDays = [
    { label: 'Mon', day: '28', full: 'Mon, Sep 28' },
    { label: 'Tue', day: '29', full: 'Tue, Sep 29' },
    { label: 'Wed', day: '30', full: 'Today', isToday: true },
    { label: 'Thu', day: '01', full: 'Thu, Oct 01' },
    { label: 'Fri', day: '02', full: 'Fri, Oct 02' },
    { label: 'Sat', day: '03', full: 'Sat, Oct 03' }
  ];

  // Comprehensive Clinical Schedule Data merging context + clinical patient cohort
  const doctorSchedule = useMemo(() => {
    // Base clinical appointment roster
    const baseRoster = [
      {
        id: 'APT-101',
        patientId: 'PT-9042',
        patientName: 'Aarav Sharma',
        age: 34,
        gender: 'Male',
        diagnosis: 'Acute Myeloid Leukemia (AML)',
        stage: 'CR1 • BMT Candidate',
        bloodGroup: 'B+',
        date: 'Today',
        time: '10:30 AM - 11:15 AM',
        isToday: true,
        mode: 'Tele-Consultation (Video)',
        isVideo: true,
        status: 'Confirmed',
        room: 'Virtual Room #82 (Encrypted)',
        notes: 'Pre-transplant conditioning protocol review. Evaluate CD34+ target dose and organ function clearance.',
        priority: 'High'
      },
      {
        id: 'APT-102',
        patientId: 'PT-9043',
        patientName: 'Priyanka Sen',
        age: 28,
        gender: 'Female',
        diagnosis: 'B-Cell ALL (Relapsed)',
        stage: 'Conditioning Regimen',
        bloodGroup: 'O+',
        date: 'Today',
        time: '01:45 PM - 02:30 PM',
        isToday: true,
        mode: 'In-Person Consultation',
        isVideo: false,
        status: 'Confirmed',
        room: 'OPD Suite 4B, Mazumdar Shaw Centre',
        notes: 'Review HLA 9/10 donor search panel and haploidentical backup donor options.',
        priority: 'Critical'
      },
      {
        id: 'APT-103',
        patientId: 'PT-9044',
        patientName: 'Vikramaditya Iyer',
        age: 46,
        gender: 'Male',
        diagnosis: 'Multiple Myeloma (IgG Kappa)',
        stage: 'Stem Cell Mobilization',
        bloodGroup: 'A+',
        date: 'Today',
        time: '03:15 PM - 03:45 PM',
        isToday: true,
        mode: 'Tele-Consultation (Video)',
        isVideo: true,
        status: 'Confirmed',
        room: 'Virtual Room #82 (Encrypted)',
        notes: 'Post-G-CSF mobilization yield review. Verify apheresis collection appointment with cell lab.',
        priority: 'Standard'
      },
      {
        id: 'APT-104',
        patientId: 'PT-9045',
        patientName: 'Ananya Deshmukh',
        age: 19,
        gender: 'Female',
        diagnosis: 'Severe Aplastic Anemia (SAA)',
        stage: 'Severe Cytopenia',
        bloodGroup: 'AB-',
        date: 'Tomorrow, 11:00 AM',
        time: '11:00 AM - 11:45 AM',
        isToday: false,
        mode: 'In-Person Consultation',
        isVideo: false,
        status: 'Scheduled',
        room: 'OPD Suite 4B, Mazumdar Shaw Centre',
        notes: 'Family HLA typing review (siblings) and initiation of DAT immunosuppression discussion.',
        priority: 'Critical'
      },
      {
        id: 'APT-105',
        patientId: 'PT-9046',
        patientName: 'Karan Mehra',
        age: 52,
        gender: 'Male',
        diagnosis: 'MDS-EB2',
        stage: 'Pre-Transplant Workup',
        bloodGroup: 'O-',
        date: 'Oct 02, 02:30 PM',
        time: '02:30 PM - 03:15 PM',
        isToday: false,
        mode: 'Tele-Consultation (Video)',
        isVideo: true,
        status: 'Scheduled',
        room: 'Virtual Room #82 (Encrypted)',
        notes: 'Cardiac echo and pulmonary function clearance follow-up prior to reduced-intensity conditioning.',
        priority: 'Standard'
      }
    ];

    return baseRoster;
  }, []);

  // Filter schedule
  const filteredSchedule = useMemo(() => {
    return doctorSchedule.filter(item => {
      // Tab filter
      if (activeTab === 'TODAY' && !item.isToday) return false;
      if (activeTab === 'VIDEO' && !item.isVideo) return false;
      if (activeTab === 'OPD' && item.isVideo) return false;
      if (activeTab === 'COMPLETED' && item.status !== 'Completed') return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.patientName.toLowerCase().includes(q);
        const matchesDiag = item.diagnosis.toLowerCase().includes(q);
        const matchesId = item.patientId.toLowerCase().includes(q);
        const matchesNotes = item.notes.toLowerCase().includes(q);
        return matchesName || matchesDiag || matchesId || matchesNotes;
      }

      return true;
    });
  }, [doctorSchedule, activeTab, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const todayTotal = doctorSchedule.filter(s => s.isToday).length;
    const videoCount = doctorSchedule.filter(s => s.isVideo).length;
    const opdCount = doctorSchedule.filter(s => !s.isVideo).length;
    const criticalCount = doctorSchedule.filter(s => s.priority === 'Critical').length;
    return { todayTotal, videoCount, opdCount, criticalCount };
  }, [doctorSchedule]);

  return (
    <div className="container-fluid py-4 px-3 px-md-4 koshika-animate-fadein" style={{ maxWidth: '1380px' }}>
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

      {/* Top Header Card */}
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
          <div style={{ maxWidth: '640px' }}>
            <div className="d-flex align-items-center gap-2 mb-2.5 flex-wrap">
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-bold d-inline-flex align-items-center gap-1.5"
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <Stethoscope size={13} />
                <span>CLINICAL CONSULTATIONS &amp; SCHEDULE</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold"
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                {stats.todayTotal} Appointments Today
              </span>
            </div>
            <h2 className="fw-extrabold text-white mb-2" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Doctor Appointments &amp; Schedule
            </h2>
            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Real-time outpatient calendar, telehealth rounds, and clinical consultation queue.
            </p>
          </div>

          {/* Action Controls */}
          <div className="d-flex align-items-center gap-2.5 flex-wrap flex-shrink-0">
            <Link
              to="/doctor/consultations"
              className="btn btn-sm rounded-pill px-4 py-2.5 d-flex align-items-center gap-2 fw-bold shadow-sm hover-translate-y koshika-hero-action-btn"
              style={{ backgroundColor: '#ffffff', color: '#064e3b', border: 'none', fontSize: '0.88rem' }}
            >
              <Video size={16} color="currentColor" />
              <span>Launch Active Video Room</span>
            </Link>
            <Link
              to="/doctor/patients"
              className="btn btn-sm rounded-pill px-3.5 py-2.5 d-flex align-items-center gap-1.5 fw-semibold hover-translate-y"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                fontSize: '0.86rem'
              }}
            >
              <User size={15} color="#ffffff" />
              <span className="text-white">Patient Roster</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-xs rounded-4 p-3 h-100" style={{ border: '1px solid var(--k-border)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-secondary small fw-semibold">Today's Total</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                <CalendarCheck size={18} />
              </div>
            </div>
            <div className="fs-3 fw-bold text-dark">{stats.todayTotal}</div>
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>Scheduled outpatient encounters</small>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-xs rounded-4 p-3 h-100" style={{ border: '1px solid var(--k-border)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-secondary small fw-semibold">Telehealth Rounds</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#ecfdf5', color: '#059669' }}>
                <Video size={18} />
              </div>
            </div>
            <div className="fs-3 fw-bold text-success">{stats.videoCount}</div>
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>Encrypted WebRTC virtual visits</small>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-xs rounded-4 p-3 h-100" style={{ border: '1px solid var(--k-border)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-secondary small fw-semibold">In-Person OPD</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#fef3c7', color: '#b45309' }}>
                <Building2 size={18} />
              </div>
            </div>
            <div className="fs-3 fw-bold text-warning" style={{ color: '#b45309' }}>{stats.opdCount}</div>
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>Suite 4B Hospital clinic</small>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-xs rounded-4 p-3 h-100" style={{ border: '1px solid var(--k-border)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-secondary small fw-semibold">High Priority</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#fee2e2', color: '#dc2626' }}>
                <Activity size={18} />
              </div>
            </div>
            <div className="fs-3 fw-bold text-danger">{stats.criticalCount}</div>
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>Pre-BMT workup &amp; acute cases</small>
          </div>
        </div>
      </div>

      {/* Week Calendar Strip */}
      <div className="card border-0 shadow-xs rounded-4 p-3 mb-4" style={{ border: '1px solid var(--k-border)' }}>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <div className="d-flex align-items-center gap-2">
            <Calendar size={18} className="text-teal" style={{ color: '#0d9488' }} />
            <h6 className="fw-bold text-dark mb-0">Clinic Schedule Calendar</h6>
          </div>
          <span className="text-muted small">Current Week • September - October 2026</span>
        </div>

        <div className="row g-2">
          {weekDays.map((wd) => {
            const isSelected = selectedDate === wd.full || (wd.isToday && selectedDate === 'Today');
            return (
              <div key={wd.label} className="col-4 col-sm-2">
                <button
                  type="button"
                  onClick={() => setSelectedDate(wd.isToday ? 'Today' : wd.full)}
                  className="btn w-100 p-2.5 rounded-3 text-center border transition-all"
                  style={{
                    backgroundColor: isSelected ? '#0d9488' : 'var(--k-surface-alt)',
                    borderColor: isSelected ? '#0d9488' : 'var(--k-border)',
                    color: isSelected ? '#ffffff' : 'var(--k-text-secondary)'
                  }}
                >
                  <div className="small fw-semibold opacity-75">{wd.label}</div>
                  <div className="fs-5 fw-bold my-0.5">{wd.day}</div>
                  <div className="small fw-medium" style={{ fontSize: '0.7rem' }}>
                    {wd.isToday ? 'Today' : 'Active'}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card border-0 shadow-xs rounded-4 p-3 mb-4" style={{ border: '1px solid var(--k-border)' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          {/* Tab buttons */}
          <div className="d-flex gap-1 flex-wrap">
            {[
              { id: 'ALL', label: 'All Consultations' },
              { id: 'TODAY', label: "Today's Schedule" },
              { id: 'VIDEO', label: 'Telehealth (Video)' },
              { id: 'OPD', label: 'In-Person OPD' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold ${
                  activeTab === tab.id ? 'btn-primary text-white shadow-xs' : 'btn-light text-secondary border'
                }`}
                style={activeTab === tab.id ? { backgroundColor: '#0d9488', borderColor: '#0d9488' } : {}}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="position-relative" style={{ maxWidth: '320px', width: '100%' }}>
            <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            <input
              type="text"
              className="form-control form-control-sm rounded-pill ps-5 py-2 border"
              placeholder="Search by patient name, ID, or diagnosis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Appointment Cards List */}
      <div className="d-flex flex-column gap-3 mb-5">
        {filteredSchedule.length === 0 ? (
          <div className="card border-0 shadow-xs rounded-4 p-5 text-center" style={{ border: '1px solid var(--k-border)' }}>
            <Calendar size={42} className="text-muted mx-auto mb-2 opacity-50" />
            <h5 className="fw-bold text-dark">No appointments found</h5>
            <p className="text-secondary small mb-0">No consultations match your selected filter criteria.</p>
          </div>
        ) : (
          filteredSchedule.map((apt) => (
            <div
              key={apt.id}
              className="card border-0 shadow-xs rounded-4 p-3 p-md-4 transition-all hover-lift"
              style={{ border: '1px solid var(--k-border)', borderLeft: apt.priority === 'Critical' ? '5px solid #ef4444' : '5px solid #0d9488' }}
            >
              <div className="row align-items-center g-3">
                {/* Patient Info Column */}
                <div className="col-12 col-lg-4">
                  <div className="d-flex align-items-start gap-3">
                    <div
                      className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0 shadow-xs"
                      style={{
                        width: '46px',
                        height: '46px',
                        fontSize: '1rem',
                        background: apt.isVideo
                          ? 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)'
                          : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                      }}
                    >
                      {apt.patientName.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <div className="d-flex align-items-center gap-2 flex-wrap mb-0.5">
                        <h6 className="fw-bold text-dark mb-0">{apt.patientName}</h6>
                        <span className="badge rounded-pill bg-light text-secondary border small px-2 py-0.5" style={{ fontSize: '0.7rem' }}>
                          {apt.patientId}
                        </span>
                        {apt.isToday && (
                          <span className="badge rounded-pill px-2 py-0.5 fw-bold" style={{ background: '#dcfce7', color: '#166534', fontSize: '0.68rem' }}>
                            Today
                          </span>
                        )}
                      </div>

                      <div className="text-dark small fw-medium">{apt.diagnosis}</div>
                      <div className="text-secondary small" style={{ fontSize: '0.78rem' }}>
                        {apt.age}y • {apt.gender} • Blood: <strong className="text-dark">{apt.bloodGroup}</strong> • {apt.stage}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consultation Details Column */}
                <div className="col-12 col-md-6 col-lg-5">
                  <div className="p-2.5 rounded-3 bg-light border">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <div className="d-flex align-items-center gap-1.5 text-teal fw-bold small" style={{ color: '#0d9488' }}>
                        <Clock size={15} />
                        <span>{apt.time}</span>
                      </div>

                      <span
                        className="badge rounded-pill px-2.5 py-0.5 small fw-semibold"
                        style={
                          apt.isVideo
                            ? { background: '#e0f2fe', color: '#0369a1' }
                            : { background: '#fef3c7', color: '#b45309' }
                        }
                      >
                        {apt.isVideo ? <Video size={12} className="me-1 d-inline" /> : <Building2 size={12} className="me-1 d-inline" />}
                        {apt.mode}
                      </span>
                    </div>

                    <div className="text-secondary small mb-1 d-flex align-items-center gap-1">
                      <MapPin size={13} className="text-muted flex-shrink-0" />
                      <span className="text-truncate">{apt.room}</span>
                    </div>

                    <div className="text-muted small fst-italic" style={{ fontSize: '0.75rem' }}>
                      &ldquo;{apt.notes}&rdquo;
                    </div>
                  </div>
                </div>

                {/* Actions Column */}
                <div className="col-12 col-md-6 col-lg-3 text-lg-end">
                  <div className="d-flex flex-column flex-sm-row flex-lg-column gap-2 justify-content-lg-center">
                    {apt.isVideo ? (
                      <Link
                        to={`/doctor/consultations?patient=${apt.patientId}`}
                        className="btn btn-sm btn-primary rounded-pill px-3 py-2 d-flex align-items-center justify-content-center gap-1.5 shadow-xs fw-semibold"
                        style={{ background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)', border: 'none' }}
                      >
                        <Video size={15} />
                        <span>Join Video Call</span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-sm btn-success rounded-pill px-3 py-2 d-flex align-items-center justify-content-center gap-1.5 shadow-xs fw-semibold"
                        onClick={() => showToast(`Checked-in ${apt.patientName} for OPD Suite 4B evaluation.`)}
                      >
                        <CheckCircle2 size={15} />
                        <span>Check In Patient</span>
                      </button>
                    )}

                    <Link
                      to={`/doctor/patients/${apt.patientId}`}
                      className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1.5 d-flex align-items-center justify-content-center gap-1.5 small fw-semibold"
                    >
                      <FileText size={14} />
                      <span>Open Patient EHR</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
