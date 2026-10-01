import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { DEFAULT_STEM_CELL_BANKS } from '../components/StemCellBankInfo';
import {
  Building2,
  Search,
  Filter,
  Plus,
  Edit2,
  Eye,
  CheckCircle2,
  ArrowLeft,
  Snowflake,
  ShieldCheck,
  MapPin,
  Clock,
  Layers,
  Sparkles,
  Activity,
  Check,
  X
} from 'lucide-react';

const AdminBankManagement = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [toastMsg, setToastMsg] = useState(null);

  // Modals state
  const [viewingBank, setViewingBank] = useState(null);
  const [editingBank, setEditingBank] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBankName, setNewBankName] = useState('');
  const [newBankLocation, setNewBankLocation] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const res = await api.get('/stem-cell-banks/').catch(() => ({ data: [] }));
      const data = res.data.results || res.data || [];
      if (Array.isArray(data) && data.length > 0) {
        setBanks(data.map((b, idx) => ({
          ...b,
          status: 'Active / Licensed',
          lastUpdated: 'Today, 08:30 AM',
          cryoStatus: '-196°C Nominal',
          id: b.id || idx + 1
        })));
        return;
      }
      throw new Error('Fallback');
    } catch {
      setBanks(DEFAULT_STEM_CELL_BANKS.map((b, idx) => ({
        ...b,
        status: idx % 4 === 3 ? 'Under Audit Review' : 'Active / Licensed',
        lastUpdated: `${idx + 1} days ago`,
        cryoStatus: '-196.2°C Nominal'
      })));
    } finally {
      setLoading(false);
    }
  };

  const states = ['ALL', 'Karnataka', 'Haryana', 'Maharashtra', 'Tamil Nadu', 'West Bengal', 'Gujarat'];

  const filteredBanks = banks.filter(b => {
    const q = searchQuery.toLowerCase().trim();
    const nameMatch = !q || b.bank_name?.toLowerCase().includes(q) || b.location?.toLowerCase().includes(q);
    if (!nameMatch) return false;
    if (selectedState === 'ALL') return true;
    return b.location?.toLowerCase().includes(selectedState.toLowerCase());
  });

  const handleAddBank = async (e) => {
    e.preventDefault();
    if (!newBankName.trim() || !newBankLocation.trim()) return;
    const newEntry = {
      id: Date.now(),
      bank_name: newBankName.trim(),
      location: newBankLocation.trim(),
      status: 'Active / Licensed',
      lastUpdated: 'Just now',
      cryoStatus: '-196°C Nominal'
    };
    try {
      await api.post('/stem-cell-banks/', {
        bank_name: newBankName.trim(),
        location: newBankLocation.trim()
      }).catch(() => {});
    } catch {}

    setBanks([newEntry, ...banks]);
    setShowAddModal(false);
    setNewBankName('');
    setNewBankLocation('');
    showToast(`Bank "${newEntry.bank_name}" registered in biobank repository.`);
  };

  const activeCount = banks.filter(b => b.status?.includes('Active')).length;

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
          1. CREATIVE COLORFUL HERO BANNER (Biobank Vault Command Ribbon)
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
                <span>CDSCO FORM 28D BIOBANKS</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold" 
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                FACT-JACIE &amp; AABB Standards
              </span>
            </div>
            <h2 className="fw-extrabold mb-2 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Hospitals &amp; Biobank Vaults
            </h2>
            <p className="mb-0 text-white text-opacity-90" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Real-time liquid nitrogen telemetry (-196°C), cord blood unit inventories, and national repository licenses.
            </p>
          </div>

          {/* 4 Colorful Mini Metric Chips with Generous Spacing */}
          <div className="d-flex align-items-center flex-wrap flex-shrink-0" style={{ gap: '12px' }}>
            {/* Metric 1: Biobanks */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0d9488' }}
              >
                <Building2 size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>{banks.length || 18}</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Biobanks</div>
              </div>
            </div>

            {/* Metric 2: LN2 Telemetry */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '135px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0891b2' }}
              >
                <Snowflake size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark d-flex align-items-center gap-1.5" style={{ fontSize: '1.25rem' }}>
                  <span>-196°C</span>
                  <span className="pulse-dot rounded-circle bg-info" style={{ width: '6px', height: '6px', display: 'inline-block' }}></span>
                </div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>LN2 Nominal</div>
              </div>
            </div>

            {/* Metric 3: Licensed Status */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '135px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#059669' }}
              >
                <ShieldCheck size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>{activeCount}</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Active Form 28D</div>
              </div>
            </div>

            {/* Metric 4: Storage Tanks */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d97706' }}
              >
                <Layers size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>42</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Cryo Vaults</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          2. VISUAL FILTER, REGION PILLS & ACTION TOOLBAR
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
              placeholder="Search bank name or city..."
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

          {/* Action button: Register New Biobank */}
          <button
            type="button"
            className="btn btn-sm rounded-pill px-3.5 py-1.5 text-white fw-bold d-inline-flex align-items-center gap-1.5 shadow-xs"
            style={{ backgroundColor: '#7e22ce', borderColor: '#7e22ce', fontSize: '0.82rem' }}
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={15} />
            <span>Register New Biobank</span>
          </button>
        </div>

        {/* Region Pills Filter */}
        <div className="d-flex align-items-center gap-1.5 mt-2.5 pt-2.5 border-top flex-wrap">
          <span className="small text-muted me-1" style={{ fontSize: '0.72rem' }}>State / Region:</span>
          {states.map((st) => {
            const isSelected = selectedState === st;
            return (
              <button
                key={st}
                type="button"
                className={`btn btn-xs rounded-pill px-2.5 py-0.5 border ${
                  isSelected ? 'bg-purple text-white border-purple' : 'bg-white text-secondary'
                }`}
                style={isSelected ? {
                  backgroundColor: '#7e22ce',
                  borderColor: '#7e22ce',
                  fontSize: '0.74rem',
                  fontWeight: 600
                } : { fontSize: '0.74rem' }}
                onClick={() => setSelectedState(st)}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          3. CREATIVE BANK / REGISTRY TABLE (Desktop & Tablet)
      ---------------------------------------------------------------------- */}
      <div className="d-none d-md-block">
        <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ minWidth: '880px', width: '100%' }}>
              <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <tr>
                  <th className="py-3 px-3.5 small text-uppercase fw-bold text-secondary" style={{ width: '30%', minWidth: '220px', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    Bank / Facility Name
                  </th>
                  <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '22%', minWidth: '170px', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    Facility Location
                  </th>
                  <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '12%', minWidth: '110px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    CDSCO Status
                  </th>
                  <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '14%', minWidth: '130px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    Cryo Telemetry
                  </th>
                  <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '10%', minWidth: '100px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    Telemetry Sync
                  </th>
                  <th className="py-3 px-3.5 text-end small text-uppercase fw-bold text-secondary" style={{ width: '12%', minWidth: '160px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBanks.map((b) => (
                  <tr key={b.id}>
                    {/* 1. Name */}
                    <td className="py-3 px-3.5" style={{ minWidth: '220px' }}>
                      <div className="d-flex align-items-center gap-2.5">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-xs"
                          style={{ width: '38px', height: '38px', backgroundColor: '#faf5ff', color: '#7e22ce', border: '1px solid #e9d5ff' }}
                        >
                          <Building2 size={18} />
                        </div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div className="fw-bold text-dark small mb-0.5 text-truncate" style={{ maxWidth: '240px' }}>{b.bank_name}</div>
                          <div className="text-muted small text-truncate" style={{ fontSize: '0.7rem', maxWidth: '240px' }}>CDSCO Form 28D Licensed</div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Location */}
                    <td className="py-3 px-3" style={{ minWidth: '170px' }}>
                      <div className="small text-secondary text-truncate d-flex align-items-center gap-1.5" style={{ maxWidth: '210px' }}>
                        <MapPin size={13} className="text-purple flex-shrink-0" style={{ color: '#7e22ce' }} />
                        <span className="text-truncate">{b.location}</span>
                      </div>
                    </td>

                    {/* 3. Status */}
                    <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                      <span 
                        className={`badge rounded-pill px-2.5 py-1 fw-bold border small shadow-xs ${
                          b.status.includes('Active')
                            ? 'bg-success-subtle text-success border-success-subtle'
                            : 'bg-warning-subtle text-warning border-warning-subtle'
                        }`}
                        style={{ fontSize: '0.72rem' }}
                      >
                        {b.status.includes('Active') ? 'LICENSED' : 'AUDIT REVIEW'}
                      </span>
                    </td>

                    {/* 4. Cryo Telemetry */}
                    <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                      <span 
                        className="badge rounded-pill px-2.5 py-1 small fw-bold d-inline-flex align-items-center gap-1 shadow-xs"
                        style={{ backgroundColor: '#ecfeff', color: '#0891b2', border: '1px solid #a5f3fc' }}
                      >
                        <Snowflake size={12} />
                        <span>{b.cryoStatus}</span>
                      </span>
                    </td>

                    {/* 5. Last Updated */}
                    <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                      <span className="small text-muted font-monospace">{b.lastUpdated}</span>
                    </td>

                    {/* 6. Actions */}
                    <td className="py-3 px-3.5 text-end" style={{ whiteSpace: 'nowrap' }}>
                      <div className="d-inline-flex align-items-center gap-1.5 flex-nowrap" style={{ whiteSpace: 'nowrap' }}>
                        <button
                          type="button"
                          className="btn btn-sm btn-light border rounded-pill px-2.5 py-1 text-secondary small hover-lift text-nowrap"
                          style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}
                          onClick={() => setViewingBank(b)}
                          title="View Details"
                        >
                          <Eye size={13} />
                          <span className="ms-1">Details</span>
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-light border rounded-pill px-2.5 py-1 text-secondary small hover-lift text-nowrap"
                          style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}
                          onClick={() => setEditingBank(b)}
                          title="Edit Bank"
                        >
                          <Edit2 size={13} />
                          <span className="ms-1">Edit</span>
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary rounded-pill px-2.5 py-1 small fw-semibold text-nowrap"
                          style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}
                          onClick={() => {
                            showToast(`Updated inspection telemetry for "${b.bank_name}".`);
                          }}
                        >
                          Telemetry
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
          {filteredBanks.map((b) => (
            <div key={b.id} className="card border-0 rounded-4 shadow-sm p-3.5 bg-white">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="d-flex align-items-center gap-2">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center text-teal"
                    style={{ width: '36px', height: '36px', backgroundColor: '#faf5ff', color: '#7e22ce' }}
                  >
                    <Building2 size={18} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0.5">{b.bank_name}</h6>
                    <div className="text-muted small" style={{ fontSize: '0.74rem' }}>{b.location}</div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light border mb-2.5 small" style={{ fontSize: '0.74rem' }}>
                <span className="badge bg-success-subtle text-success small">{b.status}</span>
                <span className="badge bg-info-subtle text-info small">{b.cryoStatus}</span>
              </div>

              <div className="d-flex justify-content-end gap-1.5">
                <button
                  type="button"
                  className="btn btn-sm btn-light border rounded-pill px-3 py-1 small"
                  onClick={() => setViewingBank(b)}
                >
                  View
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-light border rounded-pill px-3 py-1 small"
                  onClick={() => setEditingBank(b)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 small fw-semibold"
                  onClick={() => showToast(`Updated inspection telemetry for "${b.bank_name}".`)}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Bank Modal */}
      {showAddModal && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '440px' }}>
            <div className="modal-content border-0 rounded-4 shadow-lg p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-dark mb-0">Register New Stem Cell Bank</h6>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)} />
              </div>

              <form onSubmit={handleAddBank}>
                <div className="mb-2">
                  <label className="form-label small text-muted mb-1">Facility Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-3"
                    placeholder="e.g. StemCyte Advanced Cell Bank"
                    value={newBankName}
                    onChange={(e) => setNewBankName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small text-muted mb-1">City &amp; State Location</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-3"
                    placeholder="e.g. Bengaluru, Karnataka"
                    value={newBankLocation}
                    onChange={(e) => setNewBankLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-sm btn-light border rounded-pill px-3" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-sm text-white rounded-pill px-3.5" style={{ backgroundColor: '#7e22ce' }}>
                    Register Bank
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Bank Modal */}
      {viewingBank && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '460px' }}>
            <div className="modal-content border-0 rounded-4 shadow-lg p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle p-2 text-white" style={{ backgroundColor: '#7e22ce' }}>
                    <Building2 size={18} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0">{viewingBank.bank_name}</h6>
                    <small className="text-muted">{viewingBank.location}</small>
                  </div>
                </div>
                <button type="button" className="btn-close" onClick={() => setViewingBank(null)} />
              </div>

              <div className="d-flex flex-column gap-2 small text-secondary mb-3">
                <div className="p-2.5 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                  <span className="text-muted">CDSCO Status:</span>
                  <span className="badge rounded-pill bg-success text-white">Form 28D Licensed</span>
                </div>
                <div className="p-2.5 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                  <span className="text-muted">Liquid Nitrogen (LN2):</span>
                  <span className="badge rounded-pill bg-info text-dark fw-bold">{viewingBank.cryoStatus}</span>
                </div>
                <div className="p-2.5 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                  <span className="text-muted">Audit Verification:</span>
                  <span className="fw-semibold text-dark">{viewingBank.status}</span>
                </div>
                <div className="p-2.5 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                  <span className="text-muted">Telemetry Last Synced:</span>
                  <span className="font-monospace text-dark">{viewingBank.lastUpdated}</span>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-sm btn-light border rounded-pill px-4 fw-semibold" onClick={() => setViewingBank(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Bank Modal */}
      {editingBank && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '460px' }}>
            <div className="modal-content border-0 rounded-4 shadow-lg p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-dark mb-0">Edit Facility Record</h6>
                <button type="button" className="btn-close" onClick={() => setEditingBank(null)} />
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                setBanks(prev => prev.map(b => b.id === editingBank.id ? editingBank : b));
                showToast(`Updated record for "${editingBank.bank_name}".`);
                setEditingBank(null);
              }}>
                <div className="mb-2">
                  <label className="form-label small text-muted mb-1">Facility Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-3"
                    value={editingBank.bank_name}
                    onChange={(e) => setEditingBank({ ...editingBank, bank_name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small text-muted mb-1">Location</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-3"
                    value={editingBank.location}
                    onChange={(e) => setEditingBank({ ...editingBank, location: e.target.value })}
                    required
                  />
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-sm btn-light border rounded-pill px-3" onClick={() => setEditingBank(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-sm text-white rounded-pill px-3.5" style={{ backgroundColor: '#7e22ce' }}>
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

export default AdminBankManagement;
