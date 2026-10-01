import React, { useState, useEffect } from 'react';
import api from '../api/client';
import {
  FileText,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Trash2,
  Award,
  Activity,
  PlayCircle,
  Hourglass,
  ShieldCheck,
  AlertCircle,
  Info,
  Sparkles,
  FlaskConical,
  X
} from 'lucide-react';

const Research = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    project_name: '',
    lead_scientist: '',
    start_date: new Date().toISOString().split('T')[0],
    status: 'Ongoing',
    summary: '',
  });

  useEffect(() => {
    fetchResearch();
  }, [search]);

  const fetchResearch = async () => {
    try {
      const res = await api.get('/research/', { params: { search } });
      setProjects(res.data.results || res.data);
    } catch (err) {
      console.error('Error fetching research', err);
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
      await api.post('/research/', formData);
      setShowModal(false);
      showToast(`Initiated research trial "${formData.project_name}"`, 'success');
      setFormData({
        project_name: '',
        lead_scientist: '',
        start_date: new Date().toISOString().split('T')[0],
        status: 'Ongoing',
        summary: '',
      });
      fetchResearch();
    } catch (err) {
      showToast('Error adding project: ' + (err.response?.data?.message || err.message), 'danger');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete research trial #${id}?`)) return;
    try {
      await api.delete(`/research/${id}/`);
      showToast('Research project removed successfully.', 'info');
      fetchResearch();
    } catch (err) {
      showToast('Error deleting project: ' + err.message, 'danger');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'DR';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const getStatusBadge = (status) => {
    if (status === 'Completed') return 'bg-success-subtle text-success border border-success-subtle';
    if (status === 'Active' || status === 'Ongoing') return 'bg-primary-subtle text-primary border border-primary-subtle';
    if (status === 'In Review') return 'bg-warning-subtle text-warning-emphasis border border-warning-subtle';
    return 'bg-secondary-subtle text-secondary border';
  };

  const ongoingCount = projects.filter(p => p.status === 'Ongoing' || p.status === 'Active').length;
  const inReviewCount = projects.filter(p => p.status === 'In Review').length;
  const completedCount = projects.filter(p => p.status === 'Completed').length;

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
                <FlaskConical size={13} />
                <span>SCIENTIFIC EVIDENCE</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold" 
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                {projects.length} Clinical Protocols
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold d-inline-flex align-items-center gap-1" 
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <ShieldCheck size={12} />
                <span>CDSCO &amp; CTRI Registered</span>
              </span>
            </div>
            <h2 className="fw-extrabold mb-2 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Clinical Trials &amp; Research
            </h2>
            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Translational cellular medicine, bone marrow engraftment protocols, and advanced gene therapy trials.
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
            <span>New Research Trial</span>
          </button>
        </div>
      </div>

      {/* Trial Status KPI Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 h-100" style={{ border: '1px solid var(--k-border)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Total Protocols</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                <FileText size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-dark mb-0.5">{projects.length} Trials</div>
            <div className="small text-muted">Registered studies</div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 h-100" style={{ border: '1px solid var(--k-border)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Ongoing Trials</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#dcfce7', color: '#16a34a' }}>
                <PlayCircle size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-success mb-0.5">{ongoingCount} Active</div>
            <div className="small text-muted">Enrolling patient cohorts</div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 h-100" style={{ border: '1px solid var(--k-border)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Ethics Review</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#fef3c7', color: '#d97706' }}>
                <Hourglass size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-warning-emphasis mb-0.5">{inReviewCount} In Review</div>
            <div className="small text-muted">Institutional review board</div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 h-100" style={{ border: '1px solid var(--k-border)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Completed Trials</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#ede9fe', color: '#7c3aed' }}>
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-primary mb-0.5">{completedCount} Studies</div>
            <div className="small text-muted">Published findings</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card border-0 shadow-sm p-3 mb-4 rounded-4" style={{ border: '1px solid var(--k-border)' }}>
        <div className="input-group border rounded-3 p-1 bg-light">
          <span className="input-group-text bg-transparent border-0 text-muted ps-3">
            <Search size={16} />
          </span>
          <input
            type="text"
            className="form-control border-0 bg-transparent shadow-none ps-2"
            placeholder="Search trials by project title, lead scientist, or disease keyword..."
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
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ border: '1px solid var(--k-border)' }}>
        <div className="table-responsive">
          <table className="table koshika-table align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th style={{ width: '80px' }} className="ps-4">ID</th>
                <th>Project Title</th>
                <th>Lead Scientist</th>
                <th>Protocol Start</th>
                <th>Trial Status</th>
                <th>Clinical Abstract</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <div className="spinner-border spinner-border-sm text-danger me-2"></div>
                    <span className="text-muted">Loading research trials...</span>
                  </td>
                </tr>
              ) : projects.length > 0 ? (
                projects.map(r => (
                  <tr key={r.research_id}>
                    <td className="ps-4"><span className="font-monospace text-muted">#{r.research_id}</span></td>
                    <td>
                      <div className="fw-bold text-dark">{r.project_name}</div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="koshika-avatar-initials koshika-avatar-staff" style={{ width: '28px', height: '28px', fontSize: '0.72rem' }}>
                          {getInitials(r.lead_scientist)}
                        </span>
                        <span className="fw-semibold text-secondary small">{r.lead_scientist || 'Staff Scientist'}</span>
                      </div>
                    </td>
                    <td><span className="small text-muted font-monospace">{r.start_date || '-'}</span></td>
                    <td>
                      <span className={`badge rounded-pill px-2.5 py-1 ${getStatusBadge(r.status)}`}>
                        {r.status || 'Active'}
                      </span>
                    </td>
                    <td>
                      <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: '320px' }}>
                        {r.summary || 'Phase II investigational cellular trial'}
                      </small>
                    </td>
                    <td className="text-end pe-4">
                      <button
                        onClick={() => handleDelete(r.research_id)}
                        className="btn btn-sm btn-light border text-danger rounded-3 p-1.5 hover-bg-light"
                        title="Delete Trial"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-5">
                    <FlaskConical size={36} className="text-secondary opacity-50 mb-2 mx-auto d-block" />
                    <div className="fw-semibold text-dark">No research projects found</div>
                    <small className="text-muted">Try adjusting your search query or create a new research trial.</small>
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
                    <FlaskConical size={18} className="text-danger" />
                    <span>Create Research Trial</span>
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body px-4 py-3">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Project Title *</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      required
                      placeholder="e.g. CD34+ Expansion in Cord Blood Grafts"
                      value={formData.project_name}
                      onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                    />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Lead Scientist / PI</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="e.g. Dr. Suparno Chakrabarti"
                        value={formData.lead_scientist}
                        onChange={(e) => setFormData({ ...formData, lead_scientist: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Trial Status</label>
                      <select
                        className="form-select rounded-3"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="Ongoing">Ongoing / Active</option>
                        <option value="In Review">In Review (IEC)</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Start Date</label>
                    <input
                      type="date"
                      className="form-control rounded-3"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Clinical Abstract &amp; Objective</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="3"
                      placeholder="Summary of trial hypotheses, inclusion criteria, and target cell dosages..."
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-top bg-light px-4 py-3 d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-light border rounded-pill px-3" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary rounded-pill px-4 fw-semibold">
                    Initiate Trial
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

export default Research;
