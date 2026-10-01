import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  UserCheck,
  UserX,
  Edit2,
  Eye,
  ShieldCheck,
  Stethoscope,
  User,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Key,
  X
} from 'lucide-react';

const AdminUserManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'patients';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toastMsg, setToastMsg] = useState(null);

  // Modals state
  const [confirmModal, setConfirmModal] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // User dataset
  const [userList, setUserList] = useState([
    // Patients
    { id: 'USR-P1', name: 'Aarav Sharma', email: 'aarav.sharma@koshika.ai', role: 'patients', status: 'Active', createdDate: '2026-08-12', lastActivity: '2 hours ago', details: 'Acute Myeloid Leukemia (AML) • PT-9042', tagColor: '#0d9488' },
    { id: 'USR-P2', name: 'Priyanka Sen', email: 'priyanka.sen@koshika.ai', role: 'patients', status: 'Active', createdDate: '2026-08-29', lastActivity: '4 hours ago', details: 'B-Cell ALL • PT-9043', tagColor: '#0d9488' },
    { id: 'USR-P3', name: 'Vikramaditya Iyer', email: 'v.iyer@koshika.ai', role: 'patients', status: 'Active', createdDate: '2026-09-02', lastActivity: 'Yesterday', details: 'Multiple Myeloma • PT-9044', tagColor: '#0d9488' },
    { id: 'USR-P4', name: 'Ananya Deshmukh', email: 'ananya.d@koshika.ai', role: 'patients', status: 'Active', createdDate: '2026-09-08', lastActivity: '1 day ago', details: 'Severe Aplastic Anemia • PT-9045', tagColor: '#0d9488' },
    { id: 'USR-P5', name: 'Karan Mehra', email: 'karan.m@koshika.ai', role: 'patients', status: 'Deactivated', createdDate: '2026-09-10', lastActivity: '5 days ago', details: 'MDS-EB2 • PT-9046', tagColor: '#64748b' },

    // Doctors
    { id: 'USR-D1', name: 'Dr. Mitesh Sawant, MD, PhD', email: 'm.sawant@koshika-health.org', role: 'doctors', status: 'Active', createdDate: '2026-01-15', lastActivity: 'Just now', details: 'Director of Cellular Therapy & BMT', tagColor: '#2563eb' },
    { id: 'USR-D2', name: 'Dr. Sunil Bhat, MD', email: 'sunil.bhat@koshika-health.org', role: 'doctors', status: 'Active', createdDate: '2026-02-01', lastActivity: '1 hour ago', details: 'Paediatric Haemato-Oncology & BMT', tagColor: '#2563eb' },
    { id: 'USR-D3', name: 'Dr. Sharat Damodar, MD', email: 'sharat.damodar@koshika-health.org', role: 'doctors', status: 'Active', createdDate: '2026-02-18', lastActivity: '2 hours ago', details: 'Clinical Director & Head of Oncology', tagColor: '#2563eb' },
    { id: 'USR-D4', name: 'Dr. Shilpa Prabhu, MD', email: 'shilpa.prabhu@koshika-health.org', role: 'doctors', status: 'Active', createdDate: '2026-04-10', lastActivity: 'Yesterday', details: 'Adult Haemato-Oncology & Cellular Therapy', tagColor: '#2563eb' },

    // Administrators
    { id: 'USR-A1', name: 'Sunita Rao, MSc', email: 'sunita.rao@koshika-health.org', role: 'administrators', status: 'Active', createdDate: '2025-11-20', lastActivity: '10 mins ago', details: 'Director of Biobank Operations & Quality', tagColor: '#7e22ce' },
    { id: 'USR-A2', name: 'Koshika System Admin', email: 'admin@koshika.ai', role: 'administrators', status: 'Active', createdDate: '2025-10-01', lastActivity: 'Just now', details: 'Lead Platform Infrastructure & Security', tagColor: '#7e22ce' }
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    searchParams.set('tab', tab);
    setSearchParams(searchParams);
  };

  // Toggle Activate / Deactivate with confirmation
  const handleToggleStatus = (u) => {
    const isActivating = u.status === 'Deactivated';
    setConfirmModal({
      user: u,
      action: isActivating ? 'activate' : 'deactivate',
      title: isActivating ? `Activate ${u.name}?` : `Deactivate ${u.name}?`,
      message: isActivating
        ? `This will restore platform login and access for ${u.name}.`
        : `Deactivating this user will suspend their access to clinical workspaces and records.`
    });
  };

  const confirmStatusChange = () => {
    if (!confirmModal) return;
    const targetUser = confirmModal.user;
    const newStatus = confirmModal.action === 'activate' ? 'Active' : 'Deactivated';
    setUserList(prev => prev.map(u => u.id === targetUser.id ? { ...u, status: newStatus } : u));
    showToast(`User ${targetUser.name} has been ${newStatus.toLowerCase()}.`);
    setConfirmModal(null);
  };

  // Filtered dataset
  const filteredUsers = userList.filter(u => {
    if (u.role !== activeTab) return false;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.details.toLowerCase().includes(q);
    if (!matchSearch) return false;
    if (statusFilter === 'ALL') return true;
    return u.status.toUpperCase() === statusFilter;
  });

  const totalPatientsCount = userList.filter(u => u.role === 'patients').length;
  const totalDoctorsCount = userList.filter(u => u.role === 'doctors').length;
  const totalAdminsCount = userList.filter(u => u.role === 'administrators').length;
  const activeCount = userList.filter(u => u.status === 'Active').length;

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
          1. CREATIVE COLORFUL HERO BANNER (User Access Command Ribbon)
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
                <Key size={13} style={{ color: 'var(--k-primary)' }} />
                <span>ROLE-BASED ACCESS CONTROL (RBAC)</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold" 
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                HIPAA &amp; ISO 27001
              </span>
            </div>
            <h2 className="fw-extrabold mb-2 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Identity &amp; Users Hub
            </h2>
            <p className="mb-0 text-white text-opacity-90" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Manage credentials, account activations, and permissions across patients, attending clinicians, and biobank staff.
            </p>
          </div>

          {/* 4 Colorful Mini Metric Chips with Generous Spacing */}
          <div className="d-flex align-items-center flex-wrap flex-shrink-0" style={{ gap: '12px' }}>
            {/* Metric 1: Patients */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0d9488' }}
              >
                <User size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>{totalPatientsCount}</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Patients</div>
              </div>
            </div>

            {/* Metric 2: Clinicians */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0284c7' }}
              >
                <Stethoscope size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>{totalDoctorsCount}</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Doctors</div>
              </div>
            </div>

            {/* Metric 3: Admins */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#7c3aed' }}
              >
                <ShieldCheck size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>{totalAdminsCount}</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Admins</div>
              </div>
            </div>

            {/* Metric 4: Active Rate */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#059669' }}
              >
                <CheckCircle2 size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>{activeCount}</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Active Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          2. VISUAL ROLE SEGMENTED TABS & SEARCH BAR
      ---------------------------------------------------------------------- */}
      <div className="card border-0 rounded-4 shadow-sm p-3 mb-4 bg-white">
        <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between gap-3">
          
          {/* 3 Colorful Role Tabs */}
          <div className="d-flex align-items-center gap-2 p-1 rounded-pill bg-light border flex-wrap">
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3.5 py-1.5 fw-bold d-inline-flex align-items-center gap-1.5 transition-all ${
                activeTab === 'patients' ? 'text-white shadow-xs' : 'text-secondary'
              }`}
              style={activeTab === 'patients' ? { backgroundColor: '#0d9488', fontSize: '0.82rem' } : { fontSize: '0.82rem' }}
              onClick={() => handleTabChange('patients')}
            >
              <User size={14} />
              <span>Patients</span>
              <span className="badge rounded-pill ms-1" style={{ backgroundColor: activeTab === 'patients' ? 'rgba(255, 255, 255, 0.25)' : '#e2e8f0', color: activeTab === 'patients' ? '#fff' : '#475569' }}>
                {totalPatientsCount}
              </span>
            </button>

            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3.5 py-1.5 fw-bold d-inline-flex align-items-center gap-1.5 transition-all ${
                activeTab === 'doctors' ? 'text-white shadow-xs' : 'text-secondary'
              }`}
              style={activeTab === 'doctors' ? { backgroundColor: '#2563eb', fontSize: '0.82rem' } : { fontSize: '0.82rem' }}
              onClick={() => handleTabChange('doctors')}
            >
              <Stethoscope size={14} />
              <span>Doctors</span>
              <span className="badge rounded-pill ms-1" style={{ backgroundColor: activeTab === 'doctors' ? 'rgba(255, 255, 255, 0.25)' : '#e2e8f0', color: activeTab === 'doctors' ? '#fff' : '#475569' }}>
                {totalDoctorsCount}
              </span>
            </button>

            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3.5 py-1.5 fw-bold d-inline-flex align-items-center gap-1.5 transition-all ${
                activeTab === 'administrators' ? 'text-white shadow-xs' : 'text-secondary'
              }`}
              style={activeTab === 'administrators' ? { backgroundColor: '#7e22ce', fontSize: '0.82rem' } : { fontSize: '0.82rem' }}
              onClick={() => handleTabChange('administrators')}
            >
              <ShieldCheck size={14} />
              <span>Administrators</span>
              <span className="badge rounded-pill ms-1" style={{ backgroundColor: activeTab === 'administrators' ? 'rgba(255, 255, 255, 0.25)' : '#e2e8f0', color: activeTab === 'administrators' ? '#fff' : '#475569' }}>
                {totalAdminsCount}
              </span>
            </button>
          </div>

          {/* Search bar & status filter */}
          <div className="d-flex align-items-center gap-2 flex-grow-1 justify-content-end" style={{ maxWidth: '480px' }}>
            <div className="position-relative flex-grow-1">
              <Search 
                size={15} 
                className="position-absolute text-muted" 
                style={{ top: '50%', left: '14px', transform: 'translateY(-50%)' }} 
              />
              <input
                type="text"
                className="form-control form-control-sm rounded-pill ps-5 pe-3 py-1.5 border bg-light small"
                placeholder={`Search ${activeTab}...`}
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

            <div className="btn-group btn-group-sm" role="group">
              {[
                { key: 'ALL', label: 'All' },
                { key: 'ACTIVE', label: 'Active' },
                { key: 'DEACTIVATED', label: 'Off' }
              ].map(st => (
                <button
                  key={st.key}
                  type="button"
                  className={`btn btn-sm ${statusFilter === st.key ? 'btn-dark text-white fw-bold' : 'btn-light border text-secondary'}`}
                  style={{ fontSize: '0.76rem' }}
                  onClick={() => setStatusFilter(st.key)}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ---------------------------------------------------------------------
          3. CREATIVE USER TABLE (Desktop & Tablet)
      ---------------------------------------------------------------------- */}
      <div className="d-none d-md-block">
        <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ minWidth: '880px', width: '100%' }}>
              <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <tr>
                  <th className="py-3 px-3.5 small text-uppercase fw-bold text-secondary" style={{ width: '28%', minWidth: '220px', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    User &amp; Profile
                  </th>
                  <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '24%', minWidth: '180px', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    Role &amp; Diagnosis / Scope
                  </th>
                  <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '12%', minWidth: '110px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    Account Status
                  </th>
                  <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '12%', minWidth: '110px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    Registered Date
                  </th>
                  <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '12%', minWidth: '115px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    Last Active
                  </th>
                  <th className="py-3 px-3.5 text-end small text-uppercase fw-bold text-secondary" style={{ width: '12%', minWidth: '160px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const isActive = u.status === 'Active';
                  return (
                    <tr key={u.id}>
                      {/* 1. Name */}
                      <td className="py-3 px-3.5" style={{ minWidth: '220px' }}>
                        <div className="d-flex align-items-center gap-2.5">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0 shadow-xs"
                            style={{ 
                              width: '38px', 
                              height: '38px', 
                              backgroundColor: u.tagColor || (u.role === 'doctors' ? '#2563eb' : u.role === 'administrators' ? '#7e22ce' : '#0d9488'), 
                              fontSize: '0.82rem' 
                            }}
                          >
                            {u.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div className="fw-bold text-dark small mb-0.5 text-truncate" style={{ maxWidth: '240px' }}>{u.name}</div>
                            <div className="text-muted small text-truncate" style={{ fontSize: '0.72rem', maxWidth: '240px' }}>{u.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Role */}
                      <td className="py-3 px-3" style={{ minWidth: '180px' }}>
                        <span 
                          className="badge rounded-pill px-2.5 py-0.5 fw-semibold small mb-1"
                          style={{
                            backgroundColor: u.role === 'doctors' ? '#eff6ff' : u.role === 'administrators' ? '#faf5ff' : '#f0fdfa',
                            color: u.role === 'doctors' ? '#1d4ed8' : u.role === 'administrators' ? '#7e22ce' : '#0f766e',
                            fontSize: '0.72rem'
                          }}
                        >
                          {u.role === 'doctors' ? 'Clinician' : u.role === 'administrators' ? 'Administrator' : 'Patient'}
                        </span>
                        <div className="text-muted text-truncate" style={{ fontSize: '0.72rem', maxWidth: '220px' }}>{u.details}</div>
                      </td>

                      {/* 3. Status */}
                      <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                        {isActive ? (
                          <span className="badge rounded-pill px-2.5 py-1 fw-bold bg-success-subtle text-success border border-success-subtle d-inline-flex align-items-center gap-1 shadow-xs" style={{ fontSize: '0.72rem' }}>
                            <span className="pulse-dot rounded-circle bg-success" style={{ width: '5px', height: '5px' }}></span>
                            <span>ACTIVE</span>
                          </span>
                        ) : (
                          <span className="badge rounded-pill px-2.5 py-1 fw-bold bg-secondary-subtle text-secondary border border-secondary-subtle" style={{ fontSize: '0.72rem' }}>
                            DEACTIVATED
                          </span>
                        )}
                      </td>

                      {/* 4. Created Date */}
                      <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                        <span className="small text-muted font-monospace">{u.createdDate}</span>
                      </td>

                      {/* 5. Last Activity */}
                      <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                        <div className="small text-dark d-flex align-items-center gap-1">
                          <Clock size={11} className="text-teal" style={{ color: '#0d9488' }} />
                          <span className="fw-semibold">{u.lastActivity}</span>
                        </div>
                      </td>

                      {/* 6. Action */}
                      <td className="py-3 px-3.5 text-end" style={{ whiteSpace: 'nowrap' }}>
                        <div className="d-inline-flex align-items-center gap-1.5 flex-nowrap" style={{ whiteSpace: 'nowrap' }}>
                          <button
                            type="button"
                            className="btn btn-sm btn-light border rounded-pill px-2.5 py-1 text-secondary small hover-lift text-nowrap"
                            style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}
                            onClick={() => setViewingUser(u)}
                            title="View User Details"
                          >
                            <Eye size={13} />
                            <span className="ms-1">Details</span>
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-light border rounded-pill px-2.5 py-1 text-secondary small hover-lift text-nowrap"
                            style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}
                            onClick={() => setEditingUser(u)}
                            title="Edit User"
                          >
                            <Edit2 size={13} />
                            <span className="ms-1">Edit</span>
                          </button>

                          <button
                            type="button"
                            className={`btn btn-sm rounded-pill px-2.5 py-1 small fw-semibold shadow-xs text-nowrap ${
                              isActive ? 'btn-outline-danger' : 'btn-outline-success'
                            }`}
                            style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}
                            onClick={() => handleToggleStatus(u)}
                          >
                            {isActive ? 'Suspend' : 'Activate'}
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
          {filteredUsers.map((u) => {
            const isActive = u.status === 'Active';
            return (
              <div key={u.id} className="card border-0 rounded-4 shadow-sm p-3.5 bg-white">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="d-flex align-items-center gap-2.5">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                      style={{ 
                        width: '38px', 
                        height: '38px', 
                        backgroundColor: u.tagColor || '#2563eb', 
                        fontSize: '0.82rem' 
                      }}
                    >
                      {u.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h6 className="fw-bold text-dark mb-0.5">{u.name}</h6>
                      <div className="text-muted small" style={{ fontSize: '0.72rem' }}>{u.email}</div>
                    </div>
                  </div>

                  <span className={`badge rounded-pill ${isActive ? 'bg-success text-white' : 'bg-secondary text-white'}`}>
                    {u.status}
                  </span>
                </div>

                <div className="p-2.5 rounded-3 bg-light border mb-2.5 small" style={{ fontSize: '0.76rem' }}>
                  <div className="fw-bold text-dark text-capitalize">{u.role}</div>
                  <div className="text-muted">{u.details}</div>
                  <div className="text-secondary mt-1">Active: {u.lastActivity}</div>
                </div>

                <div className="d-flex justify-content-end gap-1.5 flex-wrap">
                  <button
                    type="button"
                    className="btn btn-sm btn-light border rounded-pill px-3 py-1 small"
                    onClick={() => setViewingUser(u)}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-light border rounded-pill px-3 py-1 small"
                    onClick={() => setEditingUser(u)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-1 small ${isActive ? 'btn-outline-danger' : 'btn-outline-success'}`}
                    onClick={() => handleToggleStatus(u)}
                  >
                    {isActive ? 'Suspend' : 'Activate'}
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
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ 
                  width: '54px', 
                  height: '54px', 
                  backgroundColor: confirmModal.action === 'deactivate' ? '#fee2e2' : '#dcfce7',
                  color: confirmModal.action === 'deactivate' ? '#dc2626' : '#16a34a'
                }}
              >
                <AlertTriangle size={26} />
              </div>

              <h5 className="fw-bold text-dark mb-1">{confirmModal.title}</h5>
              <p className="text-secondary small mb-3" style={{ fontSize: '0.84rem' }}>
                {confirmModal.message}
              </p>

              <div className="d-flex justify-content-center gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light border rounded-pill px-3.5 py-1.5 fw-semibold"
                  style={{ fontSize: '0.82rem' }}
                  onClick={() => setConfirmModal(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`btn btn-sm rounded-pill px-4 py-1.5 fw-semibold text-white shadow-xs ${
                    confirmModal.action === 'deactivate' ? 'btn-danger' : 'btn-success'
                  }`}
                  style={{ fontSize: '0.82rem' }}
                  onClick={confirmStatusChange}
                >
                  Confirm {confirmModal.action === 'deactivate' ? 'Deactivation' : 'Activation'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {viewingUser && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '460px' }}>
            <div className="modal-content border-0 rounded-4 shadow-lg p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle p-2 text-white" style={{ backgroundColor: viewingUser.tagColor || '#4338ca' }}>
                    <User size={18} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0">{viewingUser.name}</h6>
                    <small className="text-muted">{viewingUser.email}</small>
                  </div>
                </div>
                <button type="button" className="btn-close" onClick={() => setViewingUser(null)} />
              </div>

              <div className="d-flex flex-column gap-2 small text-secondary mb-3">
                <div className="p-2.5 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                  <span className="text-muted">Account Role:</span>
                  <span className="badge rounded-pill bg-primary text-white text-capitalize">{viewingUser.role}</span>
                </div>
                <div className="p-2.5 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                  <span className="text-muted">
                    {viewingUser.role === 'administrators' ? 'Administrative Scope:' : viewingUser.role === 'doctors' ? 'Specialization:' : 'Condition / Cohort:'}
                  </span>
                  <span className="fw-bold text-dark">{viewingUser.details}</span>
                </div>
                <div className="p-2.5 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                  <span className="text-muted">Account Status:</span>
                  <span className={`badge rounded-pill ${viewingUser.status === 'Active' ? 'bg-success text-white' : 'bg-secondary text-white'}`}>
                    {viewingUser.status}
                  </span>
                </div>
                <div className="p-2.5 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                  <span className="text-muted">Registered On:</span>
                  <span className="font-monospace text-dark">{viewingUser.createdDate}</span>
                </div>
                <div className="p-2.5 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                  <span className="text-muted">Last Activity Session:</span>
                  <span className="fw-bold text-teal">{viewingUser.lastActivity}</span>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-sm btn-light border rounded-pill px-4 fw-semibold"
                  onClick={() => setViewingUser(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '460px' }}>
            <div className="modal-content border-0 rounded-4 shadow-lg p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-dark mb-0">Edit User Profile</h6>
                <button type="button" className="btn-close" onClick={() => setEditingUser(null)} />
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                setUserList(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
                showToast(`User ${editingUser.name} profile updated.`);
                setEditingUser(null);
              }}>
                <div className="mb-2">
                  <label className="form-label small text-muted mb-1">Full Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-3"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label small text-muted mb-1">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-sm rounded-3"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small text-muted mb-1">Designation / Role Details</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-3"
                    value={editingUser.details}
                    onChange={(e) => setEditingUser({ ...editingUser, details: e.target.value })}
                    required
                  />
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-sm btn-light border rounded-pill px-3" onClick={() => setEditingUser(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-sm text-white rounded-pill px-3.5" style={{ backgroundColor: '#0d9488' }}>
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

export default AdminUserManagement;
