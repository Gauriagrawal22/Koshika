import React, { useState, useEffect } from 'react';
import api from '../api/client';
import {
  Users,
  UserPlus,
  Stethoscope,
  Award,
  ShieldCheck,
  Plus,
  Search,
  Trash2,
  HeartPulse,
  Activity,
  CheckCircle2,
  AlertCircle,
  Info,
  Building2,
  X
} from 'lucide-react';

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: 'Doctor', department: '' });

  useEffect(() => {
    fetchStaff();
  }, [search]);

  const fetchStaff = async () => {
    try {
      const res = await api.get('/staff/', { params: { search } });
      setStaff(res.data.results || res.data);
    } catch (err) {
      console.error('Error fetching staff', err);
    } finally {
      setLoading(false);
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
    try {
      await api.post('/staff/', {
        name: formData.name.trim(),
        role: formData.role.trim() || 'Doctor',
        department: formData.department.trim() || 'Haemato-Oncology & BMT'
      });
      setShowModal(false);
      showToast(`Added specialist "${formData.name.trim()}" to staff directory`, 'success');
      setFormData({ name: '', role: 'Doctor', department: '' });
      fetchStaff();
    } catch (err) {
      showToast('Error adding staff: ' + (err.response?.data?.message || err.message), 'danger');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete staff member #${id}?`)) return;
    try {
      await api.delete(`/staff/${id}/`);
      showToast('Staff member record deleted successfully.', 'info');
      fetchStaff();
    } catch (err) {
      showToast('Error deleting staff: ' + err.message, 'danger');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'DR';
    const clean = name.replace(/^Dr\.\s*/i, '').trim();
    const parts = clean.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return clean.slice(0, 2).toUpperCase() || 'DR';
  };

  const getDeptBadge = (dept) => {
    if (!dept) return 'bg-light text-dark border';
    if (dept.includes('Paediatric')) return 'bg-warning-subtle text-warning-emphasis border border-warning-subtle';
    if (dept.includes('Adult') || dept.includes('Haemato') || dept.includes('Hematolog')) return 'bg-danger-subtle text-danger border border-danger-subtle';
    if (dept.includes('CAR-T') || dept.includes('cellular') || dept.includes('Cellular')) return 'bg-primary-subtle text-primary border border-primary-subtle';
    if (dept.includes('Haploidentical') || dept.includes('Director') || dept.includes('HOD')) return 'bg-info-subtle text-info border border-info-subtle';
    if (dept.includes('Cryo') || dept.includes('Storage')) return 'bg-info-subtle text-info border border-info-subtle';
    return 'bg-secondary-subtle text-secondary border';
  };

  const bmtCount = staff.filter(s => (s.department || '').toLowerCase().includes('bmt') || (s.department || '').toLowerCase().includes('transplant')).length;
  const cartCount = staff.filter(s => (s.department || '').toLowerCase().includes('car-t') || (s.department || '').toLowerCase().includes('cellular')).length;

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
                <Stethoscope size={13} />
                <span>CLINICAL FACULTY</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold" 
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                {staff.length} Specialists Registered
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold d-inline-flex align-items-center gap-1" 
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <ShieldCheck size={12} />
                <span>MCI &amp; NMC Certified</span>
              </span>
            </div>
            <h2 className="fw-extrabold mb-2 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Doctors &amp; Specialists Directory
            </h2>
            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Directory of Haemato-Oncologists, Bone Marrow Transplant (BMT) specialists, and cellular therapy consultants.
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
            <UserPlus size={16} color="currentColor" />
            <span>Add Specialist</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Total Faculty</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#dbeafe', color: '#2563eb' }}>
                <Users size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-dark mb-0.5">{staff.length} Specialists</div>
            <div className="small text-muted">Licensed clinicians</div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">BMT &amp; Transplant PIs</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#ffe4e6', color: '#e11d48' }}>
                <Stethoscope size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-danger mb-0.5">{bmtCount || staff.length} Specialists</div>
            <div className="small text-muted">Allogeneic &amp; Autologous</div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Cellular Therapy &amp; CAR-T</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#ede9fe', color: '#7c3aed' }}>
                <Activity size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-primary mb-0.5">{cartCount || 3} Faculty</div>
            <div className="small text-muted">Novel adoptive immunotherapies</div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Accreditation</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#dcfce7', color: '#16a34a' }}>
                <Award size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-success mb-0.5">100% Verified</div>
            <div className="small text-muted">Active medical council credentials</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card border-0 shadow-sm p-3 mb-4 rounded-4 bg-white" style={{ border: '1px solid #e2e8f0' }}>
        <div className="input-group border rounded-3 p-1 bg-light">
          <span className="input-group-text bg-transparent border-0 text-muted ps-3">
            <Search size={16} />
          </span>
          <input
            type="text"
            className="form-control border-0 bg-transparent shadow-none ps-2"
            placeholder="Search specialists by name, role (e.g. Doctor), department (e.g. BMT, CAR-T, Paediatric)..."
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

      {/* Table Card */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white" style={{ border: '1px solid #e2e8f0' }}>
        <div className="table-responsive">
          <table className="table koshika-table align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th style={{ width: '80px' }} className="ps-4">Staff</th>
                <th>Specialist Name</th>
                <th>Role</th>
                <th>Department &amp; Clinical Focus</th>
                <th>Joined</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <div className="spinner-border spinner-border-sm text-secondary me-2"></div>
                    <span className="text-muted">Loading specialists directory...</span>
                  </td>
                </tr>
              ) : staff.length > 0 ? (
                staff.map(s => (
                  <tr key={s.staff_id}>
                    <td className="ps-4">
                      <span className="koshika-avatar-initials koshika-avatar-staff">
                        {getInitials(s.name)}
                      </span>
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{s.name}</div>
                      <small className="text-muted font-monospace" style={{ fontSize: '0.75rem' }}>ID: #{s.staff_id}</small>
                    </td>
                    <td>
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2.5 py-1 rounded-pill small">
                        {s.role || 'Doctor'}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill text-wrap px-2.5 py-1 lh-base ${getDeptBadge(s.department)}`}
                        style={{ maxWidth: '420px', textAlign: 'left', fontWeight: 500, display: 'inline-block' }}
                      >
                        {s.department || 'Haemato-Oncology & BMT'}
                      </span>
                    </td>
                    <td>
                      <span className="small text-muted font-monospace">
                        {s.created_at ? new Date(s.created_at).toLocaleDateString() : 'Active'}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <button
                        onClick={() => handleDelete(s.staff_id)}
                        className="btn btn-sm btn-light border text-danger rounded-3 p-1.5 hover-bg-light"
                        title="Delete Specialist"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-5">
                    <Users size={36} className="text-secondary opacity-50 mb-2 mx-auto d-block" />
                    <div className="fw-semibold text-dark">No specialist records found</div>
                    <small className="text-muted">Try adjusting your search criteria or register a new specialist.</small>
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
                    <UserPlus size={18} className="text-primary" />
                    <span>Add Doctor / Specialist</span>
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
                      placeholder="e.g. Dr. Jane Doe, MD"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Clinical Role</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder="e.g. Doctor, Senior Consultant"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Department / Specialization</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="3"
                      placeholder="e.g. Adult Haemato-Oncology & BMT; cellular therapy; CAR-T"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer border-top bg-light px-4 py-3 d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-light border rounded-pill px-3" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary rounded-pill px-4 fw-semibold">
                    Save Specialist
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

export default Staff;
