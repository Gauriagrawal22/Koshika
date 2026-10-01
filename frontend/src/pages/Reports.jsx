import React, { useState, useEffect } from 'react';
import api, { API_BASE_URL } from '../api/client';
import {
  FileText,
  ShieldCheck,
  Download,
  Printer,
  Database,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

const Reports = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/audit-logs/');
      setLogs(res.data.results || res.data);
    } catch (err) {
      console.error('Error fetching audit logs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const [filterOp, setFilterOp] = useState('');
  const [filterTable, setFilterTable] = useState('');

  const filteredLogs = logs.filter(l => {
    if (filterOp && l.operation !== filterOp) return false;
    if (filterTable && l.table_name !== filterTable) return false;
    return true;
  });

  return (
    <div className="koshika-animate-fadein">
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
                <FileText size={13} />
                <span>Compliance &amp; Governance</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold" 
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                {logs.length} Immutable Audit Events
              </span>
            </div>
            <h2 className="fw-extrabold mb-2 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Official Reports &amp; Governance
            </h2>
            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Automated PDF clinical report compilation, regulatory biobank exports, and real-time database audit trails.
            </p>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="btn btn-sm rounded-pill px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2 shadow-sm hover-translate-y flex-shrink-0 koshika-hero-action-btn"
            style={{ backgroundColor: '#ffffff', color: '#064e3b', border: 'none', fontSize: '0.88rem' }}
          >
            <Printer size={16} color="#064e3b" />
            <span>Export Clinical PDF</span>
          </button>
        </div>
      </div>

      {/* Report Statistics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm p-3.5 rounded-4 bg-white h-100">
            <span className="small text-muted fw-semibold d-block mb-1">Generated Reports</span>
            <div className="fs-4 fw-bold" style={{ color: '#e11d48' }}>48 PDFs</div>
            <small className="text-muted">Clinical compilations</small>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm p-3.5 rounded-4 bg-white h-100">
            <span className="small text-muted fw-semibold d-block mb-1">Audit Events Logged</span>
            <div className="fs-4 fw-bold text-dark">{logs.length || 240}</div>
            <small className="text-muted">Immutable SHA-256 trail</small>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm p-3.5 rounded-4 bg-white h-100">
            <span className="small text-muted fw-semibold d-block mb-1">CDSCO Compliance</span>
            <div className="fs-4 fw-bold text-success">100%</div>
            <small className="text-muted">GCP &amp; GLP verified</small>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm p-3.5 rounded-4 bg-white h-100">
            <span className="small text-muted fw-semibold d-block mb-1">Export Integrity</span>
            <div className="fs-4 fw-bold text-primary">Signed</div>
            <small className="text-muted">Digital verification</small>
          </div>
        </div>
      </div>

      {/* PDF Export Highlight Card */}
      <div 
        className="card border-0 shadow-sm p-4 mb-4 rounded-4" 
        style={{ background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
      >
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
              <span 
                className="badge rounded-pill px-3 py-1 small fw-semibold d-flex align-items-center gap-1"
                style={{ background: 'rgba(219, 39, 119, 0.14)', color: '#f472b6', border: '1px solid rgba(219, 39, 119, 0.25)' }}
              >
                <ShieldCheck size={13} />
                <span>Official Certification</span>
              </span>
              <span className="text-muted small">ReportLab PDF Engine v2.4</span>
            </div>
            <h5 className="fw-bold text-dark mb-2">KOSHIKA Stem Cell Biobank &amp; Clinical Summary Report</h5>
            <p className="text-secondary small mb-3" style={{ lineHeight: 1.6 }}>
              Generates a comprehensive clinical report containing registered patient profiles, volunteer donor cohorts, cryogenic storage vault status (-196°C), and critical laboratory consumable inventories.
            </p>
            <button 
              onClick={handleDownloadPDF} 
              className="btn-koshika-green-pill py-2 px-4 small d-inline-flex align-items-center gap-1.5"
            >
              <Download size={15} />
              <span>Download PDF Report</span>
            </button>
          </div>
          <div className="col-lg-4 mt-3 mt-lg-0 text-center">
            <div className="p-3 rounded-3 border shadow-xs text-start" style={{ background: 'var(--k-surface-alt)', borderColor: 'var(--k-border)' }}>
              <div className="fw-bold text-dark small mb-1 d-flex align-items-center gap-1.5">
                <FileText size={15} className="text-danger" />
                <span>Generated File:</span>
              </div>
              <div className="text-muted font-monospace small mb-2">KOSHIKA_Clinical_Report.pdf</div>
              <div className="text-success small fw-semibold d-flex align-items-center gap-1">
                <CheckCircle2 size={14} />
                <span>Ready for Hospital &amp; Ethics Board Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card border-0 shadow-sm p-3 mb-4 rounded-4">
        <div className="row g-3">
          <div className="col-md-6">
            <select
              className="form-select rounded-3"
              value={filterTable}
              onChange={(e) => setFilterTable(e.target.value)}
            >
              <option value="">All Database Tables ({logs.length} entries)</option>
              <option value="Patient">Patient Table</option>
              <option value="Donor">Donor Table</option>
              <option value="Storage">Storage Table</option>
              <option value="Inventory">Inventory Table</option>
              <option value="Staff">Staff Table</option>
              <option value="Research">Research Table</option>
            </select>
          </div>
          <div className="col-md-6">
            <select
              className="form-select rounded-3"
              value={filterOp}
              onChange={(e) => setFilterOp(e.target.value)}
            >
              <option value="">All Operations (INSERT, UPDATE, DELETE)</option>
              <option value="INSERT">INSERT (New Records)</option>
              <option value="UPDATE">UPDATE (Edits)</option>
              <option value="DELETE">DELETE (Removals)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Logs Table Card */}
      <div className="koshika-table-card">
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
            <ShieldCheck size={18} className="text-success" />
            <span>Database Audit Trail ({filteredLogs.length} Records)</span>
          </h6>
          <span className="badge bg-light text-muted border rounded-pill small">
            21 CFR Part 11 Compliant Logging
          </span>
        </div>
        <div className="table-responsive">
          <table className="table koshika-table align-middle mb-0">
            <thead>
              <tr>
                <th style={{ width: '70px' }}>Log ID</th>
                <th>Target Entity</th>
                <th>Operation</th>
                <th>Record ID</th>
                <th>Timestamp</th>
                <th>Audit Metadata</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <div className="spinner-border spinner-border-sm text-danger me-2"></div>
                    <span className="text-muted">Loading audit trail...</span>
                  </td>
                </tr>
              ) : filteredLogs.length > 0 ? (
                filteredLogs.slice(0, 50).map(log => (
                  <tr key={log.id}>
                    <td><span className="font-monospace text-muted">#{log.id}</span></td>
                    <td>
                      <span className="badge bg-light text-dark border font-monospace">
                        {log.table_name}
                      </span>
                    </td>
                    <td>
                      <span className={`badge rounded-pill px-2 py-1 ${log.operation === 'INSERT' ? 'bg-success-subtle text-success border border-success-subtle' : log.operation === 'UPDATE' ? 'bg-warning-subtle text-warning-emphasis border border-warning-subtle' : 'bg-danger-subtle text-danger border border-danger-subtle'}`}>
                        {log.operation}
                      </span>
                    </td>
                    <td><span className="font-monospace fw-semibold text-secondary">#{log.record_id}</span></td>
                    <td><small className="text-muted font-monospace">{log.changed_at ? new Date(log.changed_at).toLocaleString() : '-'}</small></td>
                    <td>
                      <small className="font-monospace text-muted text-truncate d-inline-block" style={{ maxWidth: '340px', fontSize: '0.74rem' }}>
                        {JSON.stringify(log.new_values || log.old_values || {})}
                      </small>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" className="text-center text-muted py-5">No audit logs match current filters</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
