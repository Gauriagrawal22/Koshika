import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { DONORS_DATA } from '../data/mockData';
import AnimatedTextBox from '../components/common/AnimatedTextBox';
import {
  Search,
  PlusCircle,
  Droplet,
  CheckCircle2,
  AlertCircle,
  Info,
  Dna,
  Cpu,
  Edit2,
  Trash2,
  UserPlus,
  UserCheck,
  ShieldCheck,
  Users,
  Activity,
  HeartPulse,
  X
} from 'lucide-react';

const Donors = () => {
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterBg, setFilterBg] = useState('');

  // Modal form state
  const [showModal, setShowModal] = useState(false);
  const [editingDonor, setEditingDonor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    blood_group: 'O+',
    contact: '',
    donation_date: new Date().toISOString().split('T')[0],
    notes: '',
    patient: '',
  });

  useEffect(() => {
    fetchDonors();
    fetchPatients();
  }, [search, filterBg]);

  const fetchDonors = async () => {
    try {
      const res = await api.get('/donors/', {
        params: { search, blood_group: filterBg }
      });
      const data = res.data.results || res.data;
      if (Array.isArray(data) && data.length > 0) {
        setDonors(data);
        return;
      }
      throw new Error('Fallback to mock');
    } catch (err) {
      let filtered = DONORS_DATA.map(d => ({
        donor_id: d.id,
        name: d.name,
        age: d.age,
        gender: d.gender,
        blood_group: d.bloodGroup,
        contact: d.contact,
        type: d.type,
        hla_score: d.hlaMatchScore,
        hla_profile: d.hlaProfile,
        cmv_status: d.cmvStatus,
        readiness: d.readiness,
        registry: d.registry,
        assigned_patient: d.assignedPatient,
        donation_date: '2026-08-20'
      }));
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(d => d.name.toLowerCase().includes(s) || (d.registry && d.registry.toLowerCase().includes(s)));
      }
      if (filterBg) {
        filtered = filtered.filter(d => d.blood_group === filterBg);
      }
      setDonors(filtered);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await api.get('/patients/');
      setPatients(res.data.results || res.data);
    } catch (err) {
      console.error('Error loading patients dropdown', err);
    }
  };

  const handleOpenAdd = () => {
    setEditingDonor(null);
    setFormData({
      name: '',
      age: '',
      blood_group: 'O+',
      contact: '',
      donation_date: new Date().toISOString().split('T')[0],
      notes: '',
      patient: '',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (d) => {
    setEditingDonor(d);
    setFormData({
      name: d.name || '',
      age: d.age || '',
      blood_group: d.blood_group || 'O+',
      contact: d.contact || '',
      donation_date: d.donation_date || new Date().toISOString().split('T')[0],
      notes: d.notes || '',
      patient: d.patient || '',
    });
    setShowModal(true);
  };

  // In-App Toast System
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDonor) {
        await api.put(`/donors/${editingDonor.donor_id}/`, formData);
        showToast(`Donor "${formData.name}" profile updated successfully`, 'success');
      } else {
        await api.post('/donors/', formData);
        showToast(`Volunteer donor "${formData.name}" registered successfully`, 'success');
      }
      setShowModal(false);
      fetchDonors();
    } catch (err) {
      showToast('Error saving donor: ' + (err.response?.data?.message || err.message), 'danger');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete donor #${id}?`)) return;
    try {
      await api.delete(`/donors/${id}/`);
      showToast('Donor record deleted successfully.', 'info');
      fetchDonors();
    } catch (err) {
      showToast('Error deleting donor: ' + err.message, 'danger');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'DN';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const getBgClass = (bg) => {
    if (!bg) return 'koshika-badge-o';
    if (bg.startsWith('AB')) return 'koshika-badge-ab';
    if (bg.startsWith('A')) return 'koshika-badge-a';
    if (bg.startsWith('B')) return 'koshika-badge-b';
    if (bg.startsWith('O')) return 'koshika-badge-o';
    return 'koshika-badge-o';
  };

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
          ) : toast.type === 'info' ? (
            <Info size={22} className="flex-shrink-0" />
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
                <Droplet size={13} />
                <span>DONOR REGISTRY</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold" 
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                {donors.length} Verified Donors
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold d-inline-flex align-items-center gap-1" 
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <ShieldCheck size={12} />
                <span>DATRI &amp; DKMS Linked</span>
              </span>
            </div>
            <h2 className="fw-extrabold mb-2 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Donor Registry
            </h2>
            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              National stem cell volunteer pool, high-resolution HLA typing status, donation logs, and matching linkages.
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="btn btn-sm rounded-pill px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2 shadow-sm hover-translate-y flex-shrink-0 koshika-hero-action-btn"
            style={{
              backgroundColor: '#ffffff',
              color: '#064e3b',
              border: 'none',
              fontSize: '0.88rem'
            }}
          >
            <UserPlus size={16} color="currentColor" />
            <span>Register Donor</span>
          </button>
        </div>
      </div>

      {/* Donor Statistics KPI Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Registered Donors</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#dcfce7', color: '#16a34a' }}>
                <Users size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-success mb-0.5">{donors.length || 386}</div>
            <div className="small text-muted">Verified volunteer pool</div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">HLA Sequencing</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                <Dna size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-primary mb-0.5">94.2%</div>
            <div className="small text-muted">High-res 10/10 sequenced</div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Immediate Ready</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#ede9fe', color: '#7c3aed' }}>
                <UserCheck size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-dark mb-0.5">310 Donors</div>
            <div className="small text-muted">Available for mobilization</div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">ABO Diversity</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#ffe4e6', color: '#e11d48' }}>
                <Droplet size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-danger mb-0.5">8 Types</div>
            <div className="small text-muted">Full population coverage</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm p-3 mb-4 rounded-4 bg-white" style={{ border: '1px solid #e2e8f0' }}>
        <div className="row g-3">
          <div className="col-md-8">
            <AnimatedTextBox
              label="Search Volunteer Donors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search donor by name, registry, notes, or contact..."
              type="text"
              icon={Search}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select rounded-3 py-2"
              value={filterBg}
              onChange={(e) => setFilterBg(e.target.value)}
            >
              <option value="">All Blood Groups ({donors.length})</option>
              <option value="A+">Blood Group A+</option>
              <option value="A-">Blood Group A-</option>
              <option value="B+">Blood Group B+</option>
              <option value="B-">Blood Group B-</option>
              <option value="O+">Blood Group O+</option>
              <option value="O-">Blood Group O-</option>
              <option value="AB+">Blood Group AB+</option>
              <option value="AB-">Blood Group AB-</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white" style={{ border: '1px solid #e2e8f0' }}>
        <div className="table-responsive">
          <table className="table koshika-table align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th style={{ width: '80px' }} className="ps-4">Donor</th>
                <th>Full Name &amp; Contact</th>
                <th>Age</th>
                <th>Blood Group</th>
                <th>Donation Date</th>
                <th>Linked Recipient</th>
                <th>Clinical Notes</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    <div className="spinner-border spinner-border-sm text-success me-2"></div>
                    <span className="text-muted">Loading donor records...</span>
                  </td>
                </tr>
              ) : donors.length > 0 ? (
                donors.map((d) => (
                  <tr key={d.donor_id}>
                    <td className="ps-4">
                      <span className="koshika-avatar-initials koshika-avatar-donor">
                        {getInitials(d.name)}
                      </span>
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{d.name}</div>
                      <small className="text-muted font-monospace" style={{ fontSize: '0.75rem' }}>{d.contact || `ID: #${d.donor_id}`}</small>
                    </td>
                    <td>
                      <span className="fw-semibold text-secondary">{d.age ? `${d.age} yrs` : '-'}</span>
                    </td>
                    <td>
                      <span className={`koshika-badge-blood ${getBgClass(d.blood_group)}`}>
                        🩸 {d.blood_group}
                      </span>
                    </td>
                    <td>
                      <span className="small text-muted">{d.donation_date || 'Pending'}</span>
                    </td>
                    <td>
                      {d.patient_name || d.assigned_patient ? (
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-1 small">
                          Patient: {d.patient_name || d.assigned_patient}
                        </span>
                      ) : (
                        <span className="badge bg-light text-muted border rounded-pill px-2.5 py-1 small">
                          Available / Unlinked
                        </span>
                      )}
                    </td>
                    <td>
                      <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: '180px' }}>
                        {d.notes || d.registry || 'Routine donation candidate'}
                      </small>
                    </td>
                    <td className="text-end pe-4">
                      <div className="d-inline-flex gap-1.5 align-items-center">
                        <button
                          onClick={() => navigate('/ml-match', { state: { donorId: d.donor_id, patientId: d.patient } })}
                          className="btn btn-sm btn-outline-success rounded-pill px-2.5 py-1 d-inline-flex align-items-center gap-1"
                          title="Run ML Compatibility"
                          style={{ fontSize: '0.78rem' }}
                        >
                          <Cpu size={12} />
                          <span>Match</span>
                        </button>
                        <button
                          onClick={() => handleOpenEdit(d)}
                          className="btn btn-sm btn-light border text-secondary rounded-3 p-1.5 hover-bg-light"
                          title="Edit Donor"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(d.donor_id)}
                          className="btn btn-sm btn-light border text-danger rounded-3 p-1.5 hover-bg-light"
                          title="Delete Donor"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-5">
                    <Users size={36} className="text-secondary opacity-50 mb-2 mx-auto d-block" />
                    <div className="fw-semibold text-dark">No donor records match the criteria</div>
                    <small className="text-muted">Try adjusting your search terms or blood group filter.</small>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
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
                    <UserPlus size={18} className="text-success" />
                    <span>{editingDonor ? 'Edit Donor Profile' : 'Register Volunteer Donor'}</span>
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body px-4 py-3">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Donor Name *</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Age</label>
                      <input
                        type="number"
                        className="form-control rounded-3"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Blood Group</label>
                      <select
                        className="form-select rounded-3"
                        value={formData.blood_group}
                        onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Contact Phone</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Donation Date</label>
                      <input
                        type="date"
                        className="form-control rounded-3"
                        value={formData.donation_date}
                        onChange={(e) => setFormData({ ...formData, donation_date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Assigned Recipient (Optional)</label>
                    <select
                      className="form-select rounded-3"
                      value={formData.patient}
                      onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                    >
                      <option value="">No linked recipient (General Volunteer Pool)</option>
                      {patients.map(p => (
                        <option key={p.patient_id} value={p.patient_id}>
                          {p.name} ({p.blood_group}) - {p.disease || 'General'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Clinical / Health Notes</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="2"
                      placeholder="e.g. Repeat donor, high-resolution HLA-A/B tested"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-top bg-light px-4 py-3 d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-light border rounded-pill px-3" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success rounded-pill px-4 fw-semibold">
                    {editingDonor ? 'Update Profile' : 'Save Donor'}
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

export default Donors;
