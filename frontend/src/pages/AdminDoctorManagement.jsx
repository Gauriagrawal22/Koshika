import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Search,
  Filter,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UserX,
  Edit2,
  Eye,
  Building2,
  CheckCircle2,
  ArrowLeft,
  Users,
  AlertTriangle,
  Award,
  Sparkles,
  Activity,
  Check,
  X
} from 'lucide-react';

const AdminDoctorManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVerify, setFilterVerify] = useState('ALL');
  const [specialtyFilter, setSpecialtyFilter] = useState('ALL');
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Doctors list with verification status
  const [doctorsList, setDoctorsList] = useState([
    {
      id: 'DOC-1',
      name: 'Dr. Sharat Damodar',
      specialization: 'Adult Haemato-Oncology & BMT',
      subspecialty: 'CAR-T & Cellular Immunotherapy',
      department: 'Haemato-Oncology & BMT',
      hospital: 'Narayana Health & Mazumdar Shaw Cancer Centre, Bengaluru',
      verified: true,
      verificationId: 'NMC-KAR-1998-0482',
      patientsCount: 18,
      maxCapacity: 30,
      status: 'Active',
      qualification: 'MD, Fellowship in BMT (USA)',
      tagColor: '#2563eb'
    },
    {
      id: 'DOC-2',
      name: 'Dr. Shilpa Prabhu',
      specialization: 'Adult Haemato-Oncology & BMT',
      subspecialty: 'Cellular Therapy & Myeloma',
      department: 'Adult Haemato-Oncology & BMT',
      hospital: 'Mazumdar Shaw Medical Center, Bengaluru',
      verified: true,
      verificationId: 'NMC-KAR-2008-1129',
      patientsCount: 14,
      maxCapacity: 25,
      status: 'Active',
      qualification: 'MBBS, MD, Fellowship in BMT',
      tagColor: '#7e22ce'
    },
    {
      id: 'DOC-3',
      name: 'Dr. Sunil Bhat',
      specialization: 'Paediatric Haemato-Oncology & BMT',
      subspecialty: 'Rare Genetic Anaemias & Haplo-BMT',
      department: 'Paediatric Haematology & BMT',
      hospital: 'Narayana Health & Mazumdar Shaw Cancer Centre, Bengaluru',
      verified: true,
      verificationId: 'NMC-KAR-2002-8819',
      patientsCount: 22,
      maxCapacity: 25,
      status: 'Active',
      qualification: 'MBBS, MD (Paediatrics), Fellowship in Paediatric BMT',
      tagColor: '#0d9488'
    },
    {
      id: 'DOC-4',
      name: 'Dr. K. Radhakrishnan',
      specialization: 'Stem Cell Apheresis & Processing',
      subspecialty: 'Cryobiology & Cryo-Preservation',
      department: 'Regenerative Medicine Dept',
      hospital: 'Apollo Cancer Speciality Hospital, Chennai',
      verified: false,
      verificationId: 'MCI-PENDING-2026',
      patientsCount: 6,
      maxCapacity: 20,
      status: 'Pending Verification',
      qualification: 'MD (Pathology / Transfusion Medicine)',
      tagColor: '#d97706'
    },
    {
      id: 'DOC-5',
      name: 'Dr. Elena Rostova',
      specialization: 'Immunogenetics & HLA Typing',
      subspecialty: 'NGS High-Throughput Matching',
      department: 'Genomic Research Core',
      hospital: 'Koshika Advanced Cell Institute, Bengaluru',
      verified: true,
      verificationId: 'FAC-GEN-2021-9921',
      patientsCount: 9,
      maxCapacity: 20,
      status: 'Active',
      qualification: 'PhD in Computational Genomics, Stanford',
      tagColor: '#0284c7'
    }
  ]);

  // Modals state
  const [viewingDoctor, setViewingDoctor] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);

  const handleToggleVerification = (doc) => {
    const newStatus = !doc.verified;
    setDoctorsList(prev => prev.map(d =>
      d.id === doc.id ? { ...d, verified: newStatus, status: newStatus ? 'Active' : 'Pending Verification' } : d
    ));
    showToast(`Verification for ${doc.name} updated: ${newStatus ? 'VERIFIED (CDSCO/NMC Approved)' : 'PENDING VERIFICATION'}.`);
  };

  const handleDeactivate = (doc) => {
    const isDeactivating = doc.status !== 'Deactivated';
    setConfirmModal({
      doctor: doc,
      action: isDeactivating ? 'deactivate' : 'activate',
      title: isDeactivating ? `Deactivate ${doc.name}?` : `Re-activate ${doc.name}?`,
      message: isDeactivating
        ? `This will remove ${doc.name} from the public specialist registry and suspend consultations.`
        : `This will restore clinical practice access for ${doc.name}.`
    });
  };

  const confirmDeactivation = () => {
    if (!confirmModal) return;
    const targetDoc = confirmModal.doctor;
    const newStatus = confirmModal.action === 'deactivate' ? 'Deactivated' : 'Active';
    setDoctorsList(prev => prev.map(d => d.id === targetDoc.id ? { ...d, status: newStatus } : d));
    showToast(`Doctor ${targetDoc.name} marked as ${newStatus}.`);
    setConfirmModal(null);
  };

  const filteredDoctors = doctorsList.filter(d => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || d.name.toLowerCase().includes(q) || d.hospital.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q) || d.subspecialty.toLowerCase().includes(q);
    if (!matchSearch) return false;

    if (filterVerify === 'VERIFIED' && !d.verified) return false;
    if (filterVerify === 'PENDING' && d.verified) return false;

    if (specialtyFilter !== 'ALL' && !d.specialization.toLowerCase().includes(specialtyFilter.toLowerCase())) return false;

    return true;
  });

  const verifiedCount = doctorsList.filter(d => d.verified).length;
  const pendingCount = doctorsList.filter(d => !d.verified).length;
  const totalPatients = doctorsList.reduce((acc, d) => acc + d.patientsCount, 0);

  return (
    <div className="koshika-animate-fadein pb-5">
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className="position-fixed bottom-0 end-0 m-4 p-3 rounded-4 shadow-lg text-white d-flex align-items-center gap-2"
          style={{ backgroundColor: '#0d9488', zIndex: 9999, maxWidth: '420px', boxShadow: '0 8px 24px rgba(13, 148, 136, 0.35)' }}
        >
          <CheckCircle2 size={18} />
          <span className="small fw-semibold">{toastMsg}</span>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          1. CREATIVE COLORFUL HERO BANNER (Visual Metrics Strip)
      ---------------------------------------------------------------------- */}
      <div 
        className="rounded-4 p-4 p-md-5 mb-4 text-white position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          boxShadow: '0 10px 30px -5px rgba(6, 78, 59, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        }}
      >
        <div className="d-flex flex-column flex-xl-row justify-content-between align-items-start align-items-xl-center gap-4 position-relative" style={{ zIndex: 2 }}>
          <div style={{ maxWidth: '600px' }}>
            <div className="d-flex align-items-center gap-2 mb-2.5 flex-wrap">
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-bold shadow-xs d-flex align-items-center gap-1.5 top-head-badge-white" 
                style={{ backgroundColor: 'var(--k-surface)', color: 'var(--k-primary)' }}
              >
                <ShieldCheck size={13} style={{ color: 'var(--k-primary)' }} />
                <span>CDSCO &amp; NMC GOVERNED</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold" 
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                Privileging &amp; Verification
              </span>
            </div>
            <h2 className="fw-extrabold mb-2 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Specialist Governance
            </h2>
            <p className="mb-0 text-white text-opacity-90" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Verify clinician credentials, track active BMT &amp; CAR-T patient load, and manage institutional privileges.
            </p>
          </div>

          {/* 4 Colorful Mini Metric Chips with Generous Spacing and Theme Adaptability */}
          <div className="d-flex align-items-center flex-wrap flex-shrink-0" style={{ gap: '12px' }}>
            {/* Metric 1: Total */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2563eb' }}
              >
                <Stethoscope size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>{doctorsList.length}</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Specialists</div>
              </div>
            </div>

            {/* Metric 2: Verified */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#059669' }}
              >
                <ShieldCheck size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>{verifiedCount}</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Verified (96%)</div>
              </div>
            </div>

            {/* Metric 3: Pending Review */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d97706' }}
              >
                <ShieldAlert size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark d-flex align-items-center gap-1.5" style={{ fontSize: '1.25rem' }}>
                  <span>{pendingCount}</span>
                  {pendingCount > 0 && <span className="pulse-dot rounded-circle bg-warning" style={{ width: '7px', height: '7px', display: 'inline-block' }}></span>}
                </div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Pending Review</div>
              </div>
            </div>

            {/* Metric 4: Active Patient Load */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#7c3aed' }}
              >
                <Users size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>{totalPatients || 69}</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Patients in Care</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          2. VISUAL FILTER & SEARCH COMMAND TOOLBAR
      ---------------------------------------------------------------------- */}
      <div className="card border-0 rounded-4 shadow-sm p-3 mb-4 bg-white">
        <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between gap-3">
          {/* Search bar */}
          <div className="position-relative flex-grow-1" style={{ maxWidth: '420px' }}>
            <Search 
              size={15} 
              className="position-absolute text-muted" 
              style={{ top: '50%', left: '14px', transform: 'translateY(-50%)' }} 
            />
            <input
              type="text"
              className="form-control form-control-sm rounded-pill ps-5 pe-3 py-2 border bg-light small"
              placeholder="Search by specialist name, hospital, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ fontSize: '0.84rem' }}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="btn btn-sm position-absolute text-muted p-0" 
                style={{ top: '50%', right: '14px', transform: 'translateY(-50%)' }}
                onClick={() => setSearchQuery('')}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Verification Status Filter Tabs */}
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className="small text-muted fw-semibold me-1 d-none d-sm-inline" style={{ fontSize: '0.78rem' }}>
              Status:
            </span>
            {[
              { key: 'ALL', label: 'All', count: doctorsList.length, color: '#334155' },
              { key: 'VERIFIED', label: 'Verified', count: verifiedCount, color: '#0d9488' },
              { key: 'PENDING', label: 'Pending', count: pendingCount, color: '#d97706' }
            ].map((f) => {
              const isSelected = filterVerify === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5 transition-all ${
                    isSelected ? 'text-white shadow-xs' : 'btn-light border text-secondary'
                  }`}
                  style={isSelected ? {
                    backgroundColor: f.color,
                    borderColor: f.color,
                    fontSize: '0.8rem'
                  } : { fontSize: '0.8rem' }}
                  onClick={() => setFilterVerify(f.key)}
                >
                  <span>{f.label}</span>
                  <span 
                    className="badge rounded-pill small" 
                    style={{ 
                      backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.25)' : '#e2e8f0',
                      color: isSelected ? '#ffffff' : '#475569',
                      fontSize: '0.68rem'
                    }}
                  >
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Specialty Chips Row */}
        <div className="d-flex align-items-center gap-1.5 mt-2.5 pt-2.5 border-top flex-wrap">
          <span className="small text-muted me-1" style={{ fontSize: '0.72rem' }}>Focus Area:</span>
          {[
            { key: 'ALL', label: 'All Fields' },
            { key: 'Haemato-Oncology', label: 'CAR-T & Haemato-Oncology' },
            { key: 'Paediatric', label: 'Paediatric BMT' },
            { key: 'Apheresis', label: 'Apheresis & Stem Cells' },
            { key: 'Immunogenetics', label: 'HLA Genomics' }
          ].map((sp) => {
            const active = specialtyFilter === sp.key;
            return (
              <button
                key={sp.key}
                type="button"
                className={`btn btn-xs rounded-pill px-2.5 py-0.5 border ${active ? 'bg-teal text-white border-teal' : 'bg-white text-secondary'}`}
                style={active ? { backgroundColor: '#0d9488', borderColor: '#0d9488', fontSize: '0.72rem', fontWeight: 600 } : { fontSize: '0.72rem' }}
                onClick={() => setSpecialtyFilter(sp.key)}
              >
                {sp.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          3. CREATIVE SPECIALIST DATA TABLE (Desktop >= 768px)
      ---------------------------------------------------------------------- */}
      <div className="d-none d-md-block">
        <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ minWidth: '920px', width: '100%' }}>
              <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <tr>
                  <th className="py-3 px-3.5 small text-uppercase fw-bold text-secondary" style={{ width: '28%', minWidth: '220px', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    Specialist &amp; Credentials
                  </th>
                  <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '24%', minWidth: '180px', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    Clinical Focus
                  </th>
                  <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '20%', minWidth: '170px', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    Medical Center
                  </th>
                  <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '14%', minWidth: '140px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    Caseload Load
                  </th>
                  <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '14%', minWidth: '150px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    CDSCO License
                  </th>
                  <th className="py-3 px-3.5 text-end small text-uppercase fw-bold text-secondary" style={{ width: '10%', minWidth: '180px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doc) => {
                  const isVerified = doc.verified;
                  const isDeactivated = doc.status === 'Deactivated';
                  const capacityPercent = Math.min(100, Math.round((doc.patientsCount / doc.maxCapacity) * 100));

                  return (
                    <tr key={doc.id}>
                      {/* 1. Specialist & Credentials */}
                      <td className="py-3 px-3.5" style={{ minWidth: '220px' }}>
                        <div className="d-flex align-items-center gap-2.5">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0 shadow-xs"
                            style={{ 
                              width: '40px', 
                              height: '40px', 
                              backgroundColor: doc.tagColor || '#2563eb', 
                              fontSize: '0.85rem' 
                            }}
                          >
                            {doc.name.replace('Dr. ', '').slice(0, 2).toUpperCase()}
                          </div>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div className="fw-bold text-dark small mb-0.5 text-truncate d-flex align-items-center gap-1.5" style={{ maxWidth: '240px' }}>
                              <span>{doc.name}</span>
                              {isVerified && <ShieldCheck size={14} className="text-success flex-shrink-0" title="NMC Verified" />}
                            </div>
                            <div className="text-muted small text-truncate" style={{ fontSize: '0.72rem', maxWidth: '240px' }}>
                              {doc.qualification}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Clinical Focus (Sleek Visual Badges) */}
                      <td className="py-3 px-3" style={{ minWidth: '180px' }}>
                        <div className="small fw-semibold text-dark text-truncate" style={{ maxWidth: '210px' }}>
                          {doc.specialization}
                        </div>
                        <div className="mt-1 d-flex align-items-center gap-1">
                          <span 
                            className="badge rounded-pill small px-2 py-0.5 fw-semibold text-truncate"
                            style={{ 
                              backgroundColor: '#f1f5f9', 
                              color: '#334155', 
                              fontSize: '0.68rem',
                              maxWidth: '190px'
                            }}
                          >
                            {doc.subspecialty}
                          </span>
                        </div>
                      </td>

                      {/* 3. Medical Center */}
                      <td className="py-3 px-3" style={{ minWidth: '170px' }}>
                        <div className="small text-secondary text-truncate d-flex align-items-center gap-1.5" style={{ maxWidth: '210px' }}>
                          <Building2 size={13} className="text-teal flex-shrink-0" style={{ color: '#0d9488' }} />
                          <span className="text-truncate">{doc.hospital}</span>
                        </div>
                        <div className="text-muted small mt-0.5 font-monospace" style={{ fontSize: '0.68rem' }}>
                          {doc.department}
                        </div>
                      </td>

                      {/* 4. Caseload Meter (Progress Bar) */}
                      <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                        <div className="d-flex align-items-center justify-content-between small mb-1" style={{ fontSize: '0.72rem', maxWidth: '120px' }}>
                          <span className="fw-bold text-dark">{doc.patientsCount} active</span>
                          <span className="text-muted">{capacityPercent}%</span>
                        </div>
                        <div className="progress" style={{ height: '5px', maxWidth: '120px' }}>
                          <div 
                            className="progress-bar rounded-pill" 
                            style={{ 
                              width: `${capacityPercent}%`, 
                              backgroundColor: capacityPercent > 80 ? '#f59e0b' : '#0d9488' 
                            }} 
                          />
                        </div>
                      </td>

                      {/* 5. CDSCO License (Glowing Badge) */}
                      <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                        {isVerified ? (
                          <span 
                            className="badge rounded-pill px-3 py-1.5 fw-bold d-inline-flex align-items-center gap-1.5 shadow-xs"
                            style={{ 
                              backgroundColor: '#dcfce7', 
                              color: '#15803d', 
                              border: '1.5px solid #86efac',
                              fontSize: '0.74rem' 
                            }}
                          >
                            <ShieldCheck size={14} />
                            <span>VERIFIED</span>
                          </span>
                        ) : (
                          <span 
                            className="badge rounded-pill px-3 py-1.5 fw-bold d-inline-flex align-items-center gap-1.5 shadow-xs"
                            style={{ 
                              backgroundColor: '#fffbeb', 
                              color: '#b45309', 
                              border: '1.5px solid #fde68a',
                              fontSize: '0.74rem' 
                            }}
                          >
                            <ShieldAlert size={14} />
                            <span>PENDING</span>
                          </span>
                        )}
                        <div className="text-muted font-monospace mt-0.5" style={{ fontSize: '0.68rem' }}>
                          {doc.verificationId}
                        </div>
                      </td>

                      {/* 6. Actions */}
                      <td className="py-3 px-3.5 text-end" style={{ whiteSpace: 'nowrap' }}>
                        <div className="d-inline-flex align-items-center gap-1 flex-nowrap" style={{ whiteSpace: 'nowrap' }}>
                          <button
                            type="button"
                            className="btn btn-sm btn-light border rounded-pill px-2.5 py-1 text-secondary small hover-lift text-nowrap"
                            style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}
                            onClick={() => setViewingDoctor(doc)}
                            title="View Specialist Details"
                          >
                            <Eye size={13} />
                            <span className="ms-1">Profile</span>
                          </button>

                          <button
                            type="button"
                            className={`btn btn-sm rounded-pill px-2.5 py-1 small fw-semibold shadow-xs text-nowrap ${
                              isVerified ? 'btn-outline-warning' : 'btn-teal text-white'
                            }`}
                            style={!isVerified ? { backgroundColor: '#0d9488', fontSize: '0.76rem', whiteSpace: 'nowrap' } : { fontSize: '0.76rem', whiteSpace: 'nowrap' }}
                            onClick={() => handleToggleVerification(doc)}
                            title={isVerified ? 'Revoke Verification' : 'Verify Credentials'}
                          >
                            <ShieldCheck size={13} className="me-1" />
                            <span>{isVerified ? 'Revoke' : 'Verify'}</span>
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-light border rounded-pill px-2.5 py-1 text-muted small hover-lift text-nowrap"
                            style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}
                            onClick={() => setEditingDoctor(doc)}
                            title="Edit Doctor Profile"
                          >
                            <Edit2 size={13} />
                            <span className="ms-1">Edit</span>
                          </button>

                          <button
                            type="button"
                            className={`btn btn-sm rounded-pill px-2.5 py-1 small fw-semibold text-nowrap ${
                              isDeactivated ? 'btn-outline-success' : 'btn-outline-danger'
                            }`}
                            style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}
                            onClick={() => handleDeactivate(doc)}
                          >
                            {isDeactivated ? 'Activate' : 'Deactivate'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          4. MOBILE CARDS (< 768px)
      ---------------------------------------------------------------------- */}
      <div className="d-block d-md-none">
        <div className="d-flex flex-column gap-3">
          {filteredDoctors.map((doc) => {
            const isVerified = doc.verified;
            return (
              <div key={doc.id} className="card border-0 rounded-4 shadow-sm p-3.5 bg-white">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="d-flex align-items-center gap-2.5">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                      style={{ width: '38px', height: '38px', backgroundColor: doc.tagColor || '#2563eb', fontSize: '0.82rem' }}
                    >
                      {doc.name.replace('Dr. ', '').slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h6 className="fw-bold text-dark mb-0.5">{doc.name}</h6>
                      <div className="text-muted small" style={{ fontSize: '0.72rem' }}>{doc.qualification}</div>
                    </div>
                  </div>

                  {isVerified ? (
                    <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-2 py-0.5 small fw-bold">
                      VERIFIED
                    </span>
                  ) : (
                    <span className="badge rounded-pill bg-warning-subtle text-warning border border-warning-subtle px-2 py-0.5 small fw-bold">
                      PENDING
                    </span>
                  )}
                </div>

                <div className="p-2.5 rounded-3 bg-light border mb-2.5 small" style={{ fontSize: '0.76rem' }}>
                  <div className="fw-semibold text-dark">{doc.specialization}</div>
                  <div className="text-muted">{doc.hospital}</div>
                  <div className="text-secondary mt-1">Patients: <strong>{doc.patientsCount} Active</strong></div>
                </div>

                <div className="d-flex justify-content-end gap-1.5 flex-wrap">
                  <button
                    type="button"
                    className="btn btn-sm btn-light border rounded-pill px-3 py-1 small"
                    onClick={() => setViewingDoctor(doc)}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 small fw-semibold"
                    onClick={() => handleToggleVerification(doc)}
                  >
                    {isVerified ? 'Revoke' : 'Verify'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 small fw-semibold"
                    onClick={() => handleDeactivate(doc)}
                  >
                    Deactivate
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {confirmModal && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '420px' }}>
            <div className="modal-content border-0 rounded-4 shadow-lg p-4 bg-white text-center">
              <AlertTriangle size={28} className="text-danger mb-2 mx-auto" />
              <h5 className="fw-bold text-dark mb-1">{confirmModal.title}</h5>
              <p className="text-secondary small mb-3">{confirmModal.message}</p>
              <div className="d-flex justify-content-center gap-2">
                <button type="button" className="btn btn-sm btn-light border rounded-pill px-3" onClick={() => setConfirmModal(null)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-sm btn-danger rounded-pill px-4 text-white" onClick={confirmDeactivation}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Doctor View Modal */}
      {viewingDoctor && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '480px' }}>
            <div className="modal-content border-0 rounded-4 shadow-lg p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle p-2 text-white" style={{ backgroundColor: viewingDoctor.tagColor || '#2563eb' }}>
                    <Stethoscope size={18} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0">{viewingDoctor.name}</h6>
                    <small className="text-muted">{viewingDoctor.qualification}</small>
                  </div>
                </div>
                <button type="button" className="btn-close" onClick={() => setViewingDoctor(null)} />
              </div>

              <div className="d-flex flex-column gap-2 small text-secondary mb-3">
                <div className="p-2.5 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                  <span className="text-muted">Specialization:</span>
                  <span className="fw-bold text-dark">{viewingDoctor.specialization}</span>
                </div>
                <div className="p-2.5 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                  <span className="text-muted">Sub-Specialty:</span>
                  <span className="badge rounded-pill bg-white text-primary border">{viewingDoctor.subspecialty}</span>
                </div>
                <div className="p-2.5 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                  <span className="text-muted">Affiliated Hospital:</span>
                  <span className="fw-semibold text-dark text-truncate" style={{ maxWidth: '240px' }}>{viewingDoctor.hospital}</span>
                </div>
                <div className="p-2.5 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                  <span className="text-muted">Medical Council ID:</span>
                  <span className="font-monospace fw-bold text-dark">{viewingDoctor.verificationId}</span>
                </div>
                <div className="p-2.5 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                  <span className="text-muted">Current Caseload:</span>
                  <span className="fw-bold text-teal">{viewingDoctor.patientsCount} Active Patients</span>
                </div>
                <div className="p-2.5 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                  <span className="text-muted">CDSCO Governance:</span>
                  <span className={`badge rounded-pill ${viewingDoctor.verified ? 'bg-success text-white' : 'bg-warning text-dark'}`}>
                    {viewingDoctor.verified ? 'VERIFIED & CERTIFIED' : 'PENDING APPROVAL'}
                  </span>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-sm btn-light border rounded-pill px-4 fw-semibold" onClick={() => setViewingDoctor(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Doctor Modal */}
      {editingDoctor && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '460px' }}>
            <div className="modal-content border-0 rounded-4 shadow-lg p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-dark mb-0">Edit Doctor Profile</h6>
                <button type="button" className="btn-close" onClick={() => setEditingDoctor(null)} />
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                setDoctorsList(prev => prev.map(d => d.id === editingDoctor.id ? editingDoctor : d));
                showToast(`Doctor ${editingDoctor.name} credentials updated.`);
                setEditingDoctor(null);
              }}>
                <div className="mb-2">
                  <label className="form-label small text-muted mb-1">Doctor Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-3"
                    value={editingDoctor.name}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label small text-muted mb-1">Specialization</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-3"
                    value={editingDoctor.specialization}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, specialization: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small text-muted mb-1">Hospital / Medical Center</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-3"
                    value={editingDoctor.hospital}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, hospital: e.target.value })}
                    required
                  />
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-sm btn-light border rounded-pill px-3" onClick={() => setEditingDoctor(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-sm text-white rounded-pill px-3.5" style={{ backgroundColor: '#2563eb' }}>
                    Save Changes
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

export default AdminDoctorManagement;
