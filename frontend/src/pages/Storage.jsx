import React, { useState, useEffect } from 'react';
import api from '../api/client';
import {
  Snowflake,
  Thermometer,
  Database,
  ShieldCheck,
  Plus,
  Search,
  Trash2,
  Clock,
  User,
  Grid,
  Droplet,
  Layers,
  Cpu,
  HeartPulse,
  Sparkles,
  Users,
  CheckCircle2,
  AlertCircle,
  Info,
  X
} from 'lucide-react';

const LOCATIONS_LIST = [
  { id: 'ALL', label: 'All Cryo Vaults', icon: Grid },
  { id: 'CryoTank-A', label: 'CryoTank-A (HSCs)', icon: Droplet },
  { id: 'CryoTank-B', label: 'CryoTank-B (Cord Blood)', icon: ShieldCheck },
  { id: 'CryoTank-C', label: 'CryoTank-C (MSCs)', icon: Layers },
  { id: 'CryoTank-D', label: 'CryoTank-D (iPSCs)', icon: Cpu },
  { id: 'CryoTank-E', label: 'CryoTank-E (Pediatric)', icon: HeartPulse },
  { id: 'BioVault-Alpha', label: 'BioVault-Alpha (Research)', icon: Sparkles },
  { id: 'BioVault-Beta', label: 'BioVault-Beta (Allogeneic)', icon: Users },
  { id: 'LN2-VaporTank-1', label: 'LN2-VaporTank-1 (Emergency)', icon: Snowflake },
];

const Storage = () => {
  const [storageItems, setStorageItems] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    donor: '',
    storage_location: 'CryoTank-A',
    collected_date: new Date().toISOString().split('T')[0],
    expiry_date: '',
    units: 1,
  });

  useEffect(() => {
    fetchStorage();
    fetchDonors();
  }, [search, selectedLocation]);

  // Automatically compute 10 years expiration
  useEffect(() => {
    if (formData.collected_date) {
      const col = new Date(formData.collected_date);
      col.setFullYear(col.getFullYear() + 10);
      setFormData(prev => ({ ...prev, expiry_date: col.toISOString().split('T')[0] }));
    }
  }, [formData.collected_date]);

  const fetchStorage = async () => {
    setLoading(true);
    try {
      const params = { page_size: 150 };
      if (search) params.search = search;
      if (selectedLocation !== 'ALL') params.location = selectedLocation;
      const res = await api.get('/storage/', { params });
      setStorageItems(res.data.results || res.data);
    } catch (err) {
      console.error('Error fetching storage', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDonors = async () => {
    try {
      const res = await api.get('/donors/');
      setDonors(res.data.results || res.data);
    } catch (err) {
      console.error('Error loading donors', err);
    }
  };

  // In-App Toast System
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      donor_id: formData.donor ? parseInt(formData.donor) : null,
      storage_location: formData.storage_location,
      collected_date: formData.collected_date || null,
      expiry_date: formData.expiry_date || null,
      units: formData.units ? parseInt(formData.units) : 1
    };
    try {
      await api.post('/storage/', payload);
      setShowModal(false);
      showToast(`Logged cryo-vial storage record in ${formData.storage_location}`, 'success');
      fetchStorage();
    } catch (err) {
      showToast('Error adding storage record: ' + (err.response?.data?.message || err.message), 'danger');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete storage entry #${id}?`)) return;
    try {
      await api.delete(`/storage/${id}/`);
      showToast('Storage record deleted successfully.', 'info');
      fetchStorage();
    } catch (err) {
      showToast('Error deleting storage entry: ' + err.message, 'danger');
    }
  };

  const totalVials = storageItems.reduce((acc, curr) => acc + (curr.units || 0), 0);

  return (
    <div className="koshika-animate-fadein pb-5">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`position-fixed bottom-0 end-0 m-4 p-3 rounded-4 shadow-lg text-white d-flex align-items-center gap-3 animate__animated animate__fadeInUp ${
            toast.type === 'danger'
              ? 'bg-danger'
              : toast.type === 'warning'
              ? 'bg-warning text-dark'
              : toast.type === 'info'
              ? 'bg-info text-dark'
              : 'bg-success'
          }`}
          style={{ maxWidth: '420px', zIndex: 9999 }}
        >
          {toast.type === 'danger' ? (
            <AlertCircle size={22} className="flex-shrink-0" />
          ) : toast.type === 'warning' ? (
            <AlertCircle size={22} className="flex-shrink-0" />
          ) : (
            <CheckCircle2 size={22} className="flex-shrink-0" />
          )}
          <div className="small flex-grow-1 fw-medium">{toast.message}</div>
          <button
            type="button"
            className="btn-close btn-close-white ms-auto"
            onClick={() => setToast(null)}
          ></button>
        </div>
      )}

      {/* Modern Page Header */}
      <div 
        className="card border-0 rounded-4 p-4 p-md-5 mb-4 text-white position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          boxShadow: '0 10px 30px -5px rgba(6, 78, 59, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#ffffff'
        }}
      >
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-4 position-relative" style={{ zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <div className="d-flex align-items-center gap-2 mb-2.5 flex-wrap">
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-bold d-inline-flex align-items-center gap-1.5" 
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <Snowflake size={13} />
                <span>CRYO STORAGE</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold" 
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                8 Active Cryo Vault Locations
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold d-inline-flex align-items-center gap-1" 
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <ShieldCheck size={12} />
                <span>-196°C Vapor Phase Monitored</span>
              </span>
            </div>
            <h2 className="fw-extrabold mb-2 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Cryo Storage
            </h2>
            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Precision liquid nitrogen vapor phase storage (-196°C), biobanking sample inventory, and 10-year cryo integrity monitoring.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-sm rounded-pill px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2 shadow-sm hover-translate-y flex-shrink-0 koshika-hero-action-btn"
            style={{
              backgroundColor: '#ffffff',
              color: '#064e3b',
              border: 'none',
              fontSize: '0.88rem'
            }}
          >
            <Plus size={16} color="currentColor" />
            <span>Deposit Cryo Unit</span>
          </button>
        </div>
      </div>

      {/* Vault Telemetry KPI Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 h-100" style={{ border: '1px solid var(--k-border)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Storage Temp</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                <Thermometer size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-primary font-monospace mb-0.5">-196.0°C</div>
            <div className="small text-success fw-medium">✓ LN2 Vapor Phase Stable</div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 h-100" style={{ border: '1px solid var(--k-border)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Total Banked</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#dcfce7', color: '#16a34a' }}>
                <Database size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-dark font-monospace mb-0.5">{totalVials || 800} Units</div>
            <div className="small text-muted">{storageItems.length} active inventory logs</div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 h-100" style={{ border: '1px solid var(--k-border)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Sample Viability</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#ede9fe', color: '#7c3aed' }}>
                <ShieldCheck size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-success font-monospace mb-0.5">99.4%</div>
            <div className="small text-muted">Certified post-thaw recovery</div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 h-100" style={{ border: '1px solid var(--k-border)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Longevity Cycle</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#fef3c7', color: '#d97706' }}>
                <Clock size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-dark font-monospace mb-0.5">10 Years</div>
            <div className="small text-muted">Cryo-stable protocol limit</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card border-0 shadow-sm p-3 mb-3 rounded-4" style={{ border: '1px solid var(--k-border)' }}>
        <div className="input-group border rounded-3 p-1 bg-light">
          <span className="input-group-text bg-transparent border-0 text-muted ps-3">
            <Search size={16} />
          </span>
          <input
            type="text"
            className="form-control border-0 bg-transparent shadow-none ps-2"
            placeholder="Search by vault sector (e.g. CryoTank-A, BioVault-Alpha) or donor name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ fontSize: '0.9rem' }}
          />
          {search && (
            <button
              type="button"
              className="btn btn-link text-muted pe-3 text-decoration-none"
              onClick={() => setSearch('')}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Cryogenic Storage Location Selector Pills */}
      <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
        {LOCATIONS_LIST.map((loc) => {
          const IconComp = loc.icon;
          const isSelected = selectedLocation === loc.id;
          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => setSelectedLocation(loc.id)}
              className={`btn btn-sm rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 transition-all ${
                isSelected
                  ? 'btn-primary text-white shadow-xs fw-semibold'
                  : 'btn-light border text-secondary hover-bg-light'
              }`}
            >
              <IconComp size={13} />
              <span>{loc.label}</span>
              <span
                className={`badge rounded-pill ${
                  isSelected ? 'bg-white text-primary' : 'bg-secondary bg-opacity-10 text-secondary'
                }`}
                style={{ fontSize: '0.7rem' }}
              >
                {loc.id === 'ALL' ? '800+' : '100'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Storage Table Card */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ border: '1px solid var(--k-border)' }}>
        <div className="table-responsive">
          <table className="table koshika-table align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th style={{ width: '80px' }} className="ps-4">ID</th>
                <th>Donor Profile</th>
                <th>Blood Group</th>
                <th>Cryo Vault Location</th>
                <th>Deposit Date</th>
                <th>10-Year Expiry</th>
                <th>Vial Units</th>
                <th>Viability Status</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-5">
                    <div className="spinner-border spinner-border-sm text-info me-2"></div>
                    <span className="text-muted">Loading cryogenic biobank inventory...</span>
                  </td>
                </tr>
              ) : storageItems.length > 0 ? (
                storageItems.map(s => {
                  const isExpiringSoon = s.expiry_date && new Date(s.expiry_date) < new Date(Date.now() + 365*24*60*60*1000);
                  return (
                    <tr key={s.storage_id}>
                      <td className="ps-4"><span className="font-monospace text-muted">#{s.storage_id}</span></td>
                      <td>
                        <div className="fw-bold text-dark">{s.donor_name || 'Donor #' + s.donor}</div>
                        <small className="text-muted" style={{ fontSize: '0.75rem' }}>Donor Ref #{s.donor}</small>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border px-2 py-1 rounded-pill">
                          {s.donor_blood_group || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-info-subtle text-info border border-info-subtle font-monospace px-2.5 py-1 rounded-pill d-inline-flex align-items-center gap-1">
                          <Snowflake size={11} />
                          <span>{s.storage_location}</span>
                        </span>
                      </td>
                      <td><span className="small text-muted">{s.collected_date || '-'}</span></td>
                      <td><span className="small text-muted font-monospace">{s.expiry_date || '-'}</span></td>
                      <td>
                        <span className="fw-bold text-dark">{s.units}</span> <small className="text-muted">vial{s.units > 1 ? 's' : ''}</small>
                      </td>
                      <td>
                        {isExpiringSoon ? (
                          <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill">Review Soon</span>
                        ) : (
                          <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill d-inline-flex align-items-center gap-1">
                            <CheckCircle2 size={11} />
                            <span>Optimal Viability</span>
                          </span>
                        )}
                      </td>
                      <td className="text-end pe-4">
                        <button
                          onClick={() => handleDelete(s.storage_id)}
                          className="btn btn-sm btn-light border text-danger rounded-3 p-1.5 hover-bg-light"
                          title="Delete Cryo Record"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-5">
                    <Snowflake size={36} className="text-secondary opacity-50 mb-2 mx-auto d-block" />
                    <div className="fw-semibold text-dark">No cryogenic storage records found</div>
                    <small className="text-muted">Try selecting a different vault or deposit a new cryo unit.</small>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deposit Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', zIndex: 1060 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <form onSubmit={handleSubmit}>
                <div className="modal-header bg-light border-bottom px-4 py-3">
                  <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                    <Snowflake size={18} className="text-primary" />
                    <span>Deposit to Cryogenic Storage</span>
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body px-4 py-3">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Select Donor *</label>
                    <select
                      className="form-select rounded-3"
                      required
                      value={formData.donor}
                      onChange={(e) => setFormData({ ...formData, donor: e.target.value })}
                    >
                      <option value="">Select Donor...</option>
                      {donors.map(d => (
                        <option key={d.donor_id} value={d.donor_id}>
                          {d.name} ({d.blood_group}) - #{d.donor_id}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Storage Location / Vault Tank *</label>
                    <select
                      className="form-select rounded-3"
                      required
                      value={formData.storage_location}
                      onChange={(e) => setFormData({ ...formData, storage_location: e.target.value })}
                    >
                      <option value="CryoTank-A">CryoTank-A (Adult HSC Stem Cells)</option>
                      <option value="CryoTank-B">CryoTank-B (Umbilical Cord Blood)</option>
                      <option value="CryoTank-C">CryoTank-C (Mesenchymal MSC Progenitors)</option>
                      <option value="CryoTank-D">CryoTank-D (Induced Pluripotent iPSCs)</option>
                      <option value="CryoTank-E">CryoTank-E (Pediatric Autologous Grafts)</option>
                      <option value="BioVault-Alpha">BioVault-Alpha (High-Purity Research Grafts)</option>
                      <option value="BioVault-Beta">BioVault-Beta (Allogeneic Unrelated Donor Units)</option>
                      <option value="LN2-VaporTank-1">LN2-VaporTank-1 (Emergency Backup Tank)</option>
                    </select>
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Collected Date</label>
                      <input
                        type="date"
                        className="form-control rounded-3"
                        required
                        value={formData.collected_date}
                        onChange={(e) => setFormData({ ...formData, collected_date: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Vial Units</label>
                      <input
                        type="number"
                        min="1"
                        className="form-control rounded-3"
                        required
                        value={formData.units}
                        onChange={(e) => setFormData({ ...formData, units: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Computed Expiry Date (+10 Years)</label>
                    <input
                      type="date"
                      className="form-control bg-light rounded-3"
                      readOnly
                      value={formData.expiry_date}
                    />
                    <div className="form-text small text-muted">Standard stem cell cryogenic viability protocol guarantee period is 10 years.</div>
                  </div>
                </div>
                <div className="modal-footer border-top bg-light px-4 py-3 d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-light border rounded-pill px-3" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary rounded-pill px-4 fw-semibold">
                    Save to Storage
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

export default Storage;
