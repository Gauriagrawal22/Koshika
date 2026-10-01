import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { PATIENTS_DATA } from '../data/mockData';
import {
  Users,
  Search,
  Filter,
  UserCheck,
  AlertCircle,
  Clock,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Activity,
  Dna,
  Droplets,
  Calendar,
  Eye,
  Video,
  FileText,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Sparkles,
  HeartPulse
} from 'lucide-react';

const DoctorPatients = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter')?.toUpperCase() || 'ALL';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Extended patient cohort data
  const patients = [
    ...PATIENTS_DATA,
    {
      id: 'PT-9047',
      name: 'Sneha Rao',
      age: 24,
      gender: 'Female',
      bloodGroup: 'AB+',
      diagnosis: 'Severe Aplastic Anemia (SAA)',
      stage: 'Conditioning Day -2',
      status: 'Active',
      admissionDate: '2026-09-18',
      attendingPhysician: 'Dr. Sharat Damodar, MD',
      donorMatchScore: 98,
      hla: '10/10 Matched',
      yieldVal: '6.10 M/kg',
      activityTime: '1 hr ago'
    },
    {
      id: 'PT-9048',
      name: 'Aditya Sen',
      age: 38,
      gender: 'Male',
      bloodGroup: 'O-',
      diagnosis: 'Chronic Myeloid Leukemia (CML)',
      stage: 'Engrafted Remission',
      status: 'Follow-up',
      admissionDate: '2026-07-10',
      attendingPhysician: 'Dr. Sharat Damodar, MD',
      donorMatchScore: 95,
      hla: '9/10 Matched',
      yieldVal: '4.80 M/kg',
      activityTime: '4 hrs ago'
    }
  ];

  // Cohort Counts
  const totalCount = patients.length;
  const activeCount = patients.filter(p => p.status === 'Active').length;
  const awaitingCount = patients.filter(p => p.status === 'Awaiting Review').length;
  const followUpCount = patients.filter(p => p.status === 'Follow-up').length;
  const completedCount = patients.filter(p => p.status === 'Completed').length;

  const filterOptions = [
    { key: 'ALL', label: 'All Patients', count: totalCount },
    { key: 'ACTIVE', label: 'Active Therapy', count: activeCount, color: '#0d9488' },
    { key: 'AWAITING REVIEW', label: 'Pending Review', count: awaitingCount, color: '#f59e0b' },
    { key: 'FOLLOW-UP', label: 'Follow-up', count: followUpCount, color: '#2563eb' },
    { key: 'COMPLETED', label: 'Remission', count: completedCount, color: '#64748b' }
  ];

  const handleFilterChange = (key) => {
    setActiveFilter(key);
    if (key === 'ALL') {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', key.toLowerCase());
    }
    setSearchParams(searchParams);
  };

  // Filter & Search Logic
  const filteredPatients = patients.filter(p => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.diagnosis.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'COMPLETED' && p.status === 'Completed') return true;
    return p.status.toUpperCase() === activeFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return { bg: '#eaf7f4', color: '#0d9488', border: '#bfe5dd' };
      case 'Awaiting Review':
        return { bg: '#fffbeb', color: '#d97706', border: '#fde68a' };
      case 'Follow-up':
        return { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' };
      case 'Completed':
        return { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' };
      default:
        return { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };
    }
  };

  return (
    <div className="koshika-animate-fadein pb-5 mx-auto" style={{ maxWidth: '1240px' }}>
      {/* ---------------------------------------------------------------------
          1. CLEAN, SPACIOUS HERO BANNER (NO OVERLAPPING METRICS)
      ---------------------------------------------------------------------- */}
      {/* ---------------------------------------------------------------------
          1. COMPACT PATIENT REGISTRY HEADER
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
          <div style={{ maxWidth: '640px' }}>
            <div className="d-flex align-items-center gap-2 mb-2.5 flex-wrap">
              <span
                className="badge rounded-pill px-3 py-1.5 small fw-bold d-inline-flex align-items-center gap-1.5"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                CELLULAR THERAPY COHORT
              </span>
              <span className="badge rounded-pill px-3 py-1.5 small fw-semibold" style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                BMT &amp; CAR-T Registry
              </span>
            </div>
            <h1 className="fw-extrabold text-white mb-2" style={{ fontSize: '1.95rem', letterSpacing: '-0.02em' }}>
              Patient Registry
            </h1>
            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Active cohort monitoring, HLA allelic matching, and engraftment milestones
            </p>
          </div>

          {/* Quick Stat Inner Cards (Dynamic Theme Support with High Legibility) */}
          <div className="d-flex align-items-center flex-wrap flex-shrink-0" style={{ gap: '12px' }}>
            <div className="text-center shadow-sm rounded-3 top-head-subcard" style={{ padding: '10px 18px', minWidth: '112px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}>
              <div className="fw-bold lh-1" style={{ fontSize: '1.35rem', color: 'var(--k-primary)' }}>{totalCount}</div>
              <div className="fw-semibold mt-1" style={{ fontSize: '0.78rem', color: 'var(--k-text-secondary)', whiteSpace: 'nowrap' }}>Total Patients</div>
            </div>
            <div className="text-center shadow-sm rounded-3 top-head-subcard" style={{ padding: '10px 18px', minWidth: '112px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}>
              <div className="fw-bold lh-1" style={{ fontSize: '1.35rem', color: '#2dd4bf' }}>{activeCount}</div>
              <div className="fw-semibold mt-1" style={{ fontSize: '0.78rem', color: 'var(--k-text-secondary)', whiteSpace: 'nowrap' }}>Active Therapy</div>
            </div>
            <div className="text-center shadow-sm rounded-3 top-head-subcard" style={{ padding: '10px 18px', minWidth: '112px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}>
              <div className="fw-bold lh-1" style={{ fontSize: '1.35rem', color: '#fbbf24' }}>{awaitingCount}</div>
              <div className="fw-semibold mt-1" style={{ fontSize: '0.78rem', color: 'var(--k-text-secondary)', whiteSpace: 'nowrap' }}>Pending Review</div>
            </div>
            <div className="text-center shadow-sm rounded-3 top-head-subcard" style={{ padding: '10px 18px', minWidth: '112px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}>
              <div className="fw-bold lh-1" style={{ fontSize: '1.35rem', color: '#38bdf8' }}>{followUpCount}</div>
              <div className="fw-semibold mt-1" style={{ fontSize: '0.78rem', color: 'var(--k-text-secondary)', whiteSpace: 'nowrap' }}>Follow-ups</div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          2. SEARCH, FILTER & VIEW MODE TOGGLE TOOLBAR
      ---------------------------------------------------------------------- */}
      <div className="card border-0 rounded-4 shadow-sm p-3 mb-4 bg-white" style={{ border: '1px solid #e2e8f0' }}>
        <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between gap-3">
          {/* Search bar */}
          <div className="position-relative flex-grow-1" style={{ maxWidth: '380px' }}>
            <Search 
              size={16} 
              className="position-absolute text-muted" 
              style={{ top: '50%', left: '14px', transform: 'translateY(-50%)' }} 
            />
            <input
              type="text"
              className="form-control rounded-pill ps-5 pe-4 py-2 border bg-light small"
              placeholder="Search patient, diagnosis, or PT-ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ fontSize: '0.84rem' }}
            />
          </div>

          {/* Filter Pills with Live Badges */}
          <div className="d-flex align-items-center gap-1.5 flex-wrap">
            {filterOptions.map((f) => {
              const isSelected = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 py-1 fw-bold transition-all d-inline-flex align-items-center gap-1.5 ${
                    isSelected ? 'text-white shadow-xs' : 'btn-light border text-secondary'
                  }`}
                  style={isSelected ? {
                    backgroundColor: f.color || '#0d9488',
                    borderColor: f.color || '#0d9488',
                    fontSize: '0.78rem'
                  } : { fontSize: '0.78rem' }}
                  onClick={() => handleFilterChange(f.key)}
                >
                  <span>{f.label}</span>
                  <span 
                    className="badge rounded-pill px-1.5 py-0.5"
                    style={{ 
                      backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.3)' : '#e2e8f0', 
                      color: isSelected ? '#ffffff' : '#475569',
                      fontSize: '0.66rem'
                    }}
                  >
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle [Grid / Table] */}
          <div className="d-flex align-items-center gap-1 bg-light p-1 rounded-pill border ms-auto ms-lg-0">
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-2.5 py-1 d-flex align-items-center gap-1 ${viewMode === 'grid' ? 'bg-white shadow-xs text-dark fw-bold' : 'text-muted border-0'}`}
              style={{ fontSize: '0.76rem' }}
              onClick={() => setViewMode('grid')}
              title="Card Grid View"
            >
              <LayoutGrid size={14} />
              <span>Cards</span>
            </button>
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-2.5 py-1 d-flex align-items-center gap-1 ${viewMode === 'table' ? 'bg-white shadow-xs text-dark fw-bold' : 'text-muted border-0'}`}
              style={{ fontSize: '0.76rem' }}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <List size={14} />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          3A. CLEAN, WELL-FITTED PATIENT CARDS (NO NESTED BOXES)
      ---------------------------------------------------------------------- */}
      {viewMode === 'grid' && (
        <div className="row g-3">
          {filteredPatients.map((p, idx) => {
            const badgeStyle = getStatusBadge(p.status);
            const avatarColors = ['#0d9488', '#2563eb', '#8b5cf6', '#0284c7', '#10b981', '#f59e0b'];
            const avatarBg = avatarColors[idx % avatarColors.length];

            return (
              <div key={p.id} className="col-12 col-md-6 col-lg-4">
                <div 
                  className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 hover-lift transition-all d-flex flex-column justify-content-between position-relative"
                  style={{ border: '1px solid #e2e8f0', borderTop: `4px solid ${avatarBg}` }}
                  onClick={() => navigate(`/doctor/patients/${p.id}`)}
                  role="button"
                >
                  <div>
                    {/* Top Row: Avatar, Name, Status */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center gap-2.5">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0 shadow-xs"
                          style={{ width: '42px', height: '42px', backgroundColor: avatarBg, fontSize: '0.92rem' }}
                        >
                          {p.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="d-flex align-items-center gap-1.5 flex-wrap">
                            <h6 className="fw-bold text-dark mb-0 fs-6">{p.name}</h6>
                            {p.bloodGroup && (
                              <span className="badge rounded-pill bg-danger-subtle text-danger border border-danger-subtle px-1.5 py-0.5 small fw-bold" style={{ fontSize: '0.66rem' }}>
                                {p.bloodGroup}
                              </span>
                            )}
                          </div>
                          <span className="text-muted small" style={{ fontSize: '0.76rem' }}>
                            {p.id} • {p.age} yrs • {p.gender}
                          </span>
                        </div>
                      </div>

                      <span
                        className="badge rounded-pill px-2.5 py-1 small fw-semibold border"
                        style={{
                          backgroundColor: badgeStyle.bg,
                          color: badgeStyle.color,
                          borderColor: badgeStyle.border,
                          fontSize: '0.72rem'
                        }}
                      >
                        {p.status}
                      </span>
                    </div>

                    {/* Diagnosis & Stage (Clean Typography, No Heavy Grey Boxes) */}
                    <div className="mb-3">
                      <div className="fw-bold text-dark mb-0.5" style={{ fontSize: '0.92rem' }}>
                        {p.diagnosis}
                      </div>
                      <div className="text-muted small" style={{ fontSize: '0.78rem' }}>
                        {p.stage}
                      </div>
                    </div>

                    {/* Key Metric Pills Side-by-Side (Breatheable & Clean) */}
                    <div className="d-flex align-items-center gap-1.5 flex-wrap mb-3">
                      <span 
                        className="badge rounded-pill px-2.5 py-1 small fw-semibold d-inline-flex align-items-center gap-1"
                        style={{ backgroundColor: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', fontSize: '0.72rem' }}
                      >
                        <Dna size={12} />
                        <span>HLA {p.hla || '10/10 Matched'}</span>
                      </span>

                      <span 
                        className="badge rounded-pill px-2.5 py-1 small fw-semibold d-inline-flex align-items-center gap-1"
                        style={{ backgroundColor: '#eaf7f4', color: '#0d9488', border: '1px solid #bfe5dd', fontSize: '0.72rem' }}
                      >
                        <Droplets size={12} />
                        <span>CD34+ {p.yieldVal || '5.20 M/kg'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="d-flex align-items-center justify-content-between pt-2.5 border-top" onClick={(e) => e.stopPropagation()}>
                    <span className="text-muted small d-flex align-items-center gap-1" style={{ fontSize: '0.72rem' }}>
                      <Clock size={12} />
                      <span>{p.activityTime}</span>
                    </span>

                    <div className="d-flex align-items-center gap-2">
                      <Link
                        to={`/doctor/consultations?patient=${p.id}`}
                        className="btn btn-sm btn-light border rounded-pill p-1.5 text-muted hover-translate-y d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px' }}
                        title="Start Telehealth Call"
                      >
                        <Video size={15} className="text-primary" />
                      </Link>
                      <Link
                        to={`/doctor/patients/${p.id}`}
                        className="btn btn-sm rounded-pill px-3 py-1.5 fw-bold text-white d-inline-flex align-items-center gap-1 shadow-xs hover-translate-y"
                        style={{ backgroundColor: '#0d9488', fontSize: '0.78rem', border: 'none' }}
                      >
                        <span>Open Chart</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredPatients.length === 0 && (
            <div className="col-12">
              <div className="card border-0 rounded-4 shadow-sm p-5 bg-white text-center text-muted">
                <Users size={40} className="text-secondary opacity-50 mb-2 mx-auto" />
                <h6 className="fw-bold text-dark">No patients found in this cohort</h6>
                <p className="small text-secondary mb-0">Try clearing your search query or selecting a different status filter.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------------------------------------------------------------------
          3B. TABLE VIEW
      ---------------------------------------------------------------------- */}
      {viewMode === 'table' && (
        <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.84rem' }}>
              <thead className="table-light text-muted small">
                <tr>
                  <th className="ps-4">Patient</th>
                  <th>ID</th>
                  <th>Diagnosis &amp; Stage</th>
                  <th>HLA Concordance</th>
                  <th>CD34+ Yield</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((p) => {
                  const badgeStyle = getStatusBadge(p.status);
                  return (
                    <tr key={p.id} role="button" onClick={() => navigate(`/doctor/patients/${p.id}`)}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center gap-2">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold small flex-shrink-0"
                            style={{ width: '32px', height: '32px', backgroundColor: '#0d9488', fontSize: '0.78rem' }}
                          >
                            {p.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="fw-bold text-dark d-block">{p.name}</span>
                            <span className="text-muted small" style={{ fontSize: '0.72rem' }}>{p.age}y • {p.gender}</span>
                          </div>
                        </div>
                      </td>
                      <td className="font-monospace text-muted small">{p.id}</td>
                      <td>
                        <div className="fw-semibold text-dark">{p.diagnosis}</div>
                        <div className="text-muted small" style={{ fontSize: '0.72rem' }}>{p.stage}</div>
                      </td>
                      <td>
                        <span className="badge rounded-pill bg-success-subtle text-success small fw-semibold">
                          {p.hla || '10/10 Matched'}
                        </span>
                      </td>
                      <td>
                        <span className="fw-bold text-teal" style={{ color: '#0d9488' }}>
                          {p.yieldVal || '5.20 M/kg'}
                        </span>
                      </td>
                      <td>
                        <span 
                          className="badge rounded-pill px-2.5 py-1 small fw-semibold border"
                          style={{
                            backgroundColor: badgeStyle.bg,
                            color: badgeStyle.color,
                            borderColor: badgeStyle.border,
                            fontSize: '0.72rem'
                          }}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="text-end pe-4" onClick={(e) => e.stopPropagation()}>
                        <Link
                          to={`/doctor/patients/${p.id}`}
                          className="btn btn-sm btn-light border rounded-pill px-3 py-1 small fw-semibold"
                          style={{ fontSize: '0.76rem' }}
                        >
                          View Chart
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPatients;
