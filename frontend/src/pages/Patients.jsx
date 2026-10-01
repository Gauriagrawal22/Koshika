import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { PATIENTS_DATA } from '../data/mockData';
import AnimatedTextBox from '../components/common/AnimatedTextBox';
import {
  Search,
  PlusCircle,
  UserPlus,
  Heart,
  Activity,
  HeartPulse,
  Dna,
  Cpu,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Info,
  Droplet,
  Users,
  ShieldCheck,
  X
} from 'lucide-react';

const Patients = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterBg, setFilterBg] = useState('');

  // Modal form state
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    blood_group: 'A+',
    contact: '',
    disease: '',
  });

  useEffect(() => {
    fetchPatients();
  }, [search, filterBg]);

  const fetchPatients = async () => {
    try {
      const res = await api.get('/patients/', {
        params: { search, blood_group: filterBg }
      });
      const data = res.data.results || res.data;
      if (Array.isArray(data) && data.length > 0) {
        setPatients(data);
        return;
      }
      throw new Error('Fallback to mock');
    } catch (err) {
      let filtered = PATIENTS_DATA.map(p => ({
        patient_id: p.id,
        name: p.name,
        age: p.age,
        gender: p.gender,
        blood_group: p.bloodGroup,
        contact: '+91 98200 45892',
        disease: p.diagnosis,
        stage: p.stage,
        doctor: p.primaryDoctor,
        hospital: p.hospital,
        status: p.status,
        hla_status: p.hlaStatus,
        cd34_count: p.cd34Count,
        donor_count: p.donorMatchScore > 90 ? 2 : 1
      }));
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(s) || p.disease.toLowerCase().includes(s));
      }
      if (filterBg) {
        filtered = filtered.filter(p => p.blood_group === filterBg);
      }
      setPatients(filtered);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingPatient(null);
    setFormData({ name: '', age: '', blood_group: 'A+', contact: '', disease: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (p) => {
    setEditingPatient(p);
    setFormData({
      name: p.name || '',
      age: p.age || '',
      blood_group: p.blood_group || 'A+',
      contact: p.contact || '',
      disease: p.disease || '',
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
      if (editingPatient) {
        await api.put(`/patients/${editingPatient.patient_id}/`, formData);
        showToast(`Patient "${formData.name}" profile updated successfully`, 'success');
      } else {
        await api.post('/patients/', formData);
        showToast(`Patient "${formData.name}" registered successfully`, 'success');
      }
      setShowModal(false);
      fetchPatients();
    } catch (err) {
      showToast('Error saving patient: ' + (err.response?.data?.message || err.message), 'danger');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete patient #${id}?`)) return;
    try {
      await api.delete(`/patients/${id}/`);
      showToast('Patient record deleted successfully.', 'info');
      fetchPatients();
    } catch (err) {
      showToast('Error deleting patient: ' + err.message, 'danger');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'PT';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const getBgClass = (bg) => {
    if (!bg) return 'koshika-badge-a';
    if (bg.startsWith('AB')) return 'koshika-badge-ab';
    if (bg.startsWith('A')) return 'koshika-badge-a';
    if (bg.startsWith('B')) return 'koshika-badge-b';
    if (bg.startsWith('O')) return 'koshika-badge-o';
    return 'koshika-badge-a';
  };

  // KPI counts
  const totalCount = patients.length;
  const activeMalignancyCount = patients.filter(p => {
    const d = (p.disease || '').toLowerCase();
    return d.includes('leukemia') || d.includes('aml') || d.includes('all') || d.includes('myeloma') || d.includes('anemia');
  }).length;
  const totalLinkedDonors = patients.reduce((acc, p) => acc + (p.donor_count || 1), 0);
  const distinctBloodGroups = new Set(patients.map(p => p.blood_group).filter(Boolean)).size;

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
                <HeartPulse size={13} />
                <span>RECIPIENT REGISTRY</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold" 
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                {patients.length} Active Clinical Records
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold d-inline-flex align-items-center gap-1" 
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <ShieldCheck size={12} />
                <span>NMC Verified Linkages</span>
              </span>
            </div>
            <h2 className="fw-extrabold mb-2 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Patients Registry
            </h2>
            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Clinical recipient records, diagnostic profiles, HLA compatibility status, and matched donor linkages.
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
            <span>Register Patient</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Total Recipients</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                <Users size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-dark mb-0.5">{totalCount}</div>
            <div className="small text-muted">Enrolled candidates</div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Active Indications</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#ffe4e6', color: '#e11d48' }}>
                <Activity size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-danger mb-0.5">{activeMalignancyCount}</div>
            <div className="small text-muted">Leukemia / SAA / Myeloma</div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Linked Donors</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#dcfce7', color: '#16a34a' }}>
                <Dna size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-success mb-0.5">{totalLinkedDonors}</div>
            <div className="small text-muted">HLA matched prospects</div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">ABO Blood Profiles</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#ede9fe', color: '#7c3aed' }}>
                <Droplet size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-primary mb-0.5">{distinctBloodGroups || 8} Types</div>
            <div className="small text-muted">Serologically typed</div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="card border-0 shadow-sm p-3 mb-4 rounded-4 bg-white" style={{ border: '1px solid #e2e8f0' }}>
        <div className="row g-3">
          <div className="col-md-8">
            <AnimatedTextBox
              label="Search Recipients"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipient by name, disease, contact, or ID..."
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
              <option value="">All Blood Groups ({patients.length})</option>
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

      {/* Patients Table Card */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white" style={{ border: '1px solid #e2e8f0' }}>
        <div className="table-responsive">
          <table className="table koshika-table align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th style={{ width: '80px' }} className="ps-4">Patient</th>
                <th>Full Name &amp; Details</th>
                <th>Age</th>
                <th>Blood Group</th>
                <th>Contact</th>
                <th>Clinical Diagnosis</th>
                <th>Matched Donors</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                    <span className="text-muted">Loading clinical patient records...</span>
                  </td>
                </tr>
              ) : patients.length > 0 ? (
                patients.map((p) => (
                  <tr key={p.patient_id}>
                    <td className="ps-4">
                      <span className="koshika-avatar-initials">
                        {getInitials(p.name)}
                      </span>
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{p.name}</div>
                      <small className="text-muted" style={{ fontSize: '0.75rem' }}>ID: #{p.patient_id}</small>
                    </td>
                    <td>
                      <span className="fw-semibold text-secondary">{p.age ? `${p.age} yrs` : '-'}</span>
                    </td>
                    <td>
                      <span className={`koshika-badge-blood ${getBgClass(p.blood_group)}`}>
                        🩸 {p.blood_group}
                      </span>
                    </td>
                    <td>
                      <span className="small text-muted font-monospace">{p.contact || 'Not provided'}</span>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border px-2.5 py-1 small rounded-pill">
                        {p.disease || 'General Evaluation'}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-info-subtle text-info border border-info-subtle rounded-pill px-2.5 py-1 small d-inline-flex align-items-center gap-1">
                        <Dna size={11} />
                        <span>{p.donor_count || 1} Linked Donors</span>
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <div className="d-inline-flex gap-1.5 align-items-center">
                        <button
                          onClick={() => navigate('/ml-match', { state: { patientId: p.patient_id } })}
                          className="btn btn-sm btn-outline-primary rounded-pill px-2.5 py-1 d-inline-flex align-items-center gap-1"
                          title="Run AI HLA Compatibility Match"
                          style={{ fontSize: '0.78rem' }}
                        >
                          <Cpu size={12} />
                          <span>Match</span>
                        </button>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="btn btn-sm btn-light border text-secondary rounded-3 p-1.5 hover-bg-light"
                          title="Edit Patient"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.patient_id)}
                          className="btn btn-sm btn-light border text-danger rounded-3 p-1.5 hover-bg-light"
                          title="Delete Patient"
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
                    <div className="fw-semibold text-dark">No patient records match the criteria</div>
                    <small className="text-muted">Try adjusting your search terms or blood group filter.</small>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Patient Modal */}
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
                    <UserPlus size={18} className="text-primary" />
                    <span>{editingPatient ? 'Edit Patient Record' : 'Register New Recipient'}</span>
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body px-4 py-3">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Full Name *</label>
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
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Contact / Phone</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Clinical Disease / Diagnosis</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder="e.g. Acute Myeloid Leukemia (AML)"
                      value={formData.disease}
                      onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer border-top bg-light px-4 py-3 d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-light border rounded-pill px-3" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary rounded-pill px-4 fw-semibold">
                    {editingPatient ? 'Save Changes' : 'Create Record'}
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

export default Patients;
