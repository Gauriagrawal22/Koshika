import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import {
  FileText,
  Search,
  Filter,
  ShieldCheck,
  Clock,
  Printer,
  Download,
  ArrowLeft,
  User,
  CheckCircle2,
  Activity,
  Layers,
  Sparkles,
  Lock,
  X
} from 'lucide-react';

const AdminActivityAudit = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [moduleFilter, setModuleFilter] = useState('ALL');

  // Realistic audited events structure matching Section 15
  const auditEntries = [
    {
      id: 'AUD-8801',
      time: '10:42 AM',
      date: 'Today',
      user: 'Dr. Mitesh Sawant',
      role: 'Doctor',
      action: 'Report reviewed',
      module: 'Patient Records',
      target: 'Aarav Sharma (PT-9042) • Flow Cytometry CD34+',
      status: 'Verified',
      hash: 'SHA256:7f8a91b...41',
      badgeColor: '#2563eb'
    },
    {
      id: 'AUD-8802',
      time: '10:15 AM',
      date: 'Today',
      user: 'Dr. Sharat Damodar',
      role: 'Doctor',
      action: 'Consultation completed',
      module: 'Telehealth Consultations',
      target: 'Aarav Sharma • OPD Tele-Suite 4B',
      status: 'Verified',
      hash: 'SHA256:3a41b2c...92',
      badgeColor: '#2563eb'
    },
    {
      id: 'AUD-8803',
      time: '09:40 AM',
      date: 'Today',
      user: 'Sunita Rao',
      role: 'Administrator',
      action: 'Bank record updated',
      module: 'Biobank Storage',
      target: 'CryoTank-Gamma LN2 Liquid Level Replenished',
      status: 'Compliant',
      hash: 'SHA256:9c4e23a...11',
      badgeColor: '#7e22ce'
    },
    {
      id: 'AUD-8804',
      time: '09:15 AM',
      date: 'Today',
      user: 'Dr. Elena Rostova',
      role: 'Doctor',
      action: 'HLA 10/10 Match confirmed',
      module: 'Genomics Registry',
      target: 'Donor DNR-5104 assigned to PT-9042',
      status: 'Verified',
      hash: 'SHA256:2b1c47e...92',
      badgeColor: '#2563eb'
    },
    {
      id: 'AUD-8805',
      time: '08:50 AM',
      date: 'Today',
      user: 'Priyanka Sen',
      role: 'Patient',
      action: 'Consent document signed',
      module: 'Patient Records',
      target: 'Allogeneic Stem Cell Protocol KSH-CP-04',
      status: 'Verified',
      hash: 'SHA256:4d7a18c...88',
      badgeColor: '#0d9488'
    },
    {
      id: 'AUD-8806',
      time: '08:10 AM',
      date: 'Today',
      user: 'System Worker v3',
      role: 'Administrator',
      action: 'Automated telemetry audit',
      module: 'System Security',
      target: 'CDSCO & HIPAA Regulatory Check Completed',
      status: 'Compliant',
      hash: 'SHA256:1a8f943...2d',
      badgeColor: '#7e22ce'
    },
    {
      id: 'AUD-8807',
      time: '07:30 PM',
      date: 'Yesterday',
      user: 'Dr. Sunil Bhat',
      role: 'Doctor',
      action: 'Follow-up scheduled',
      module: 'Appointments',
      target: 'Ananya Deshmukh (PT-9045) • Pre-transplant ECHO',
      status: 'Logged',
      hash: 'SHA256:5e6c71a...99',
      badgeColor: '#2563eb'
    }
  ];

  const filteredEntries = auditEntries.filter(entry => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q ||
      entry.user.toLowerCase().includes(q) ||
      entry.action.toLowerCase().includes(q) ||
      entry.target.toLowerCase().includes(q) ||
      entry.module.toLowerCase().includes(q);
    if (!matchSearch) return false;

    if (roleFilter !== 'ALL' && entry.role.toUpperCase() !== roleFilter) return false;
    if (moduleFilter !== 'ALL' && entry.module !== moduleFilter) return false;
    return true;
  });

  return (
    <div className="koshika-animate-fadein pb-5">
      {/* ---------------------------------------------------------------------
          1. CREATIVE COLORFUL HERO BANNER (Security Audit Command Ribbon)
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
                <Lock size={13} style={{ color: 'var(--k-primary)' }} />
                <span>CRYPTOGRAPHIC AUDIT TRAIL</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold" 
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                21 CFR Part 11 &amp; HIPAA Verified
              </span>
            </div>
            <h2 className="fw-extrabold mb-2 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Activity Logs &amp; Audit Trail
            </h2>
            <p className="mb-0 text-white text-opacity-90" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Immutable record of clinician reviews, biobank modifications, HLA matches, and clinical consent transactions.
            </p>
          </div>

          {/* 4 Colorful Mini Metric Chips with Generous Spacing */}
          <div className="d-flex align-items-center flex-wrap flex-shrink-0" style={{ gap: '12px' }}>
            {/* Metric 1: Logged Events */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2563eb' }}
              >
                <Activity size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>1,840</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>24h Events</div>
              </div>
            </div>

            {/* Metric 2: Clinician Actions */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '135px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0d9488' }}
              >
                <ShieldCheck size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>1,120</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Clinical Reviews</div>
              </div>
            </div>

            {/* Metric 3: Admin Changes */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#7c3aed' }}
              >
                <Layers size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>64</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Signed Edits</div>
              </div>
            </div>

            {/* Metric 4: Hash Proof */}
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
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>100%</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>SHA-256 Valid</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          2. VISUAL FILTER BAR & SEARCH TOOLBAR
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
              className="form-control form-control-sm rounded-pill ps-5 pe-3 py-1.5 border bg-light small"
              placeholder="Search audit trail by user, action, target or module..."
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

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className="small text-muted fw-semibold" style={{ fontSize: '0.78rem' }}>Role:</span>
            <div className="btn-group btn-group-sm" role="group">
              {[
                { key: 'ALL', label: 'All' },
                { key: 'DOCTOR', label: 'Doctors' },
                { key: 'ADMINISTRATOR', label: 'Admins' },
                { key: 'PATIENT', label: 'Patients' }
              ].map(rf => (
                <button
                  key={rf.key}
                  type="button"
                  className={`btn btn-sm ${roleFilter === rf.key ? 'btn-teal text-white fw-bold' : 'btn-light border text-secondary'}`}
                  style={roleFilter === rf.key ? { backgroundColor: '#0d9488', borderColor: '#0d9488', fontSize: '0.76rem' } : { fontSize: '0.76rem' }}
                  onClick={() => setRoleFilter(rf.key)}
                >
                  {rf.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5 text-secondary shadow-xs hover-lift ms-auto"
              style={{ fontSize: '0.78rem' }}
              onClick={() => window.print()}
            >
              <Printer size={13} />
              <span>Print Audit</span>
            </button>
          </div>
        </div>

        {/* Module Filter Chips */}
        <div className="d-flex align-items-center gap-1.5 mt-2.5 pt-2.5 border-top flex-wrap">
          <span className="small text-muted me-1" style={{ fontSize: '0.72rem' }}>Module:</span>
          {[
            { key: 'ALL', label: 'All Modules' },
            { key: 'Patient Records', label: 'Patient Records' },
            { key: 'Telehealth Consultations', label: 'Telehealth' },
            { key: 'Biobank Storage', label: 'Biobank LN2' },
            { key: 'Genomics Registry', label: 'Genomics Registry' },
            { key: 'System Security', label: 'System Security' }
          ].map((m) => {
            const isSelected = moduleFilter === m.key;
            return (
              <button
                key={m.key}
                type="button"
                className={`btn btn-xs rounded-pill px-2.5 py-0.5 border ${
                  isSelected ? 'bg-primary text-white border-primary' : 'bg-white text-secondary'
                }`}
                style={isSelected ? {
                  backgroundColor: '#4338ca',
                  borderColor: '#4338ca',
                  fontSize: '0.74rem',
                  fontWeight: 600
                } : { fontSize: '0.74rem' }}
                onClick={() => setModuleFilter(m.key)}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          3. CREATIVE AUDIT LOG TABLE (Compact & Readable)
      ---------------------------------------------------------------------- */}
      <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ minWidth: '880px', width: '100%' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th className="py-3 px-3.5 small text-uppercase fw-bold text-secondary" style={{ width: '15%', minWidth: '120px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  Timestamp
                </th>
                <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '22%', minWidth: '170px', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  User Account
                </th>
                <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '12%', minWidth: '110px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  System Role
                </th>
                <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '25%', minWidth: '180px', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  Action Performed
                </th>
                <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '16%', minWidth: '130px', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  Module Scope
                </th>
                <th className="py-3 px-3.5 text-end small text-uppercase fw-bold text-secondary" style={{ width: '10%', minWidth: '110px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  Verification
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((item) => (
                <tr key={item.id}>
                  {/* 1. Timestamp */}
                  <td className="py-3 px-3.5" style={{ whiteSpace: 'nowrap' }}>
                    <div className="small fw-bold text-dark">{item.time}</div>
                    <div className="text-muted small" style={{ fontSize: '0.7rem' }}>{item.date}</div>
                  </td>

                  {/* 2. User */}
                  <td className="py-3 px-3" style={{ minWidth: '170px' }}>
                    <div className="fw-semibold text-dark small text-truncate" style={{ maxWidth: '220px' }}>{item.user}</div>
                    <div className="font-monospace text-muted" style={{ fontSize: '0.68rem' }}>{item.hash}</div>
                  </td>

                  {/* 3. Role */}
                  <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                    <span 
                      className="badge rounded-pill px-2.5 py-0.5 small fw-semibold"
                      style={
                        item.role === 'Doctor'
                          ? { backgroundColor: '#eff6ff', color: '#2563eb' }
                          : item.role === 'Administrator'
                          ? { backgroundColor: '#faf5ff', color: '#7e22ce' }
                          : { backgroundColor: '#eaf7f4', color: '#0d9488' }
                      }
                    >
                      {item.role}
                    </span>
                  </td>

                  {/* 4. Action */}
                  <td className="py-3 px-3" style={{ minWidth: '180px' }}>
                    <div className="fw-bold text-dark small mb-0.5 text-truncate" style={{ maxWidth: '240px' }}>{item.action}</div>
                    <div className="text-secondary small text-truncate" style={{ fontSize: '0.72rem', maxWidth: '240px' }}>{item.target}</div>
                  </td>

                  {/* 5. Module */}
                  <td className="py-3 px-3" style={{ minWidth: '130px' }}>
                    <span className="badge bg-light text-secondary border small text-truncate d-inline-block" style={{ maxWidth: '160px' }}>
                      {item.module}
                    </span>
                  </td>

                  {/* 6. Status */}
                  <td className="py-3 px-3.5 text-end" style={{ whiteSpace: 'nowrap' }}>
                    <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-2.5 py-1 small fw-bold shadow-xs">
                      <ShieldCheck size={12} className="me-1" />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminActivityAudit;
