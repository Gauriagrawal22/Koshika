import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { DEFAULT_STEM_CELL_BANKS } from '../components/StemCellBankInfo';
import {
  Building2,
  Search,
  ArrowLeft,
  Snowflake,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Info,
  Database,
  Zap,
  Check,
  X,
  Phone,
  Droplet,
  Dna,
  SlidersHorizontal,
  Sparkles,
  Award
} from 'lucide-react';

const DoctorBankSearch = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedBank, setSelectedBank] = useState(null);
  const [reserveModalBank, setReserveModalBank] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  useEffect(() => {
    fetchBanks();
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const fetchBanks = async () => {
    try {
      const res = await api.get('/stem-cell-banks/').catch(() => ({ data: [] }));
      const data = res.data.results || res.data || [];
      if (Array.isArray(data) && data.length > 0) {
        setBanks(data);
        return;
      }
      throw new Error('Use defaults');
    } catch {
      setBanks(DEFAULT_STEM_CELL_BANKS);
    } finally {
      setLoading(false);
    }
  };

  const states = ['ALL', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Haryana', 'West Bengal', 'Gujarat'];

  // Card vibrant color themes
  const colorThemes = [
    { primary: '#0d9488', bg: '#eaf7f4', border: '#bfe5dd', light: '#f0fdfa' },
    { primary: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', light: '#f8fafc' },
    { primary: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', light: '#faf5ff' },
    { primary: '#0284c7', bg: '#e0f2fe', border: '#bae6fd', light: '#f0f9ff' },
    { primary: '#059669', bg: '#ecfdf5', border: '#a7f3d0', light: '#f0fdf4' },
    { primary: '#d97706', bg: '#fffbeb', border: '#fde68a', light: '#fffdf5' }
  ];

  const filteredBanks = banks.filter(b => {
    const q = searchQuery.toLowerCase().trim();
    const nameMatch = !q || b.bank_name?.toLowerCase().includes(q) || b.location?.toLowerCase().includes(q);
    if (!nameMatch) return false;

    if (selectedState === 'ALL') return true;
    return b.location?.toLowerCase().includes(selectedState.toLowerCase());
  });

  const handleReserve = (bankName) => {
    setReserveModalBank(null);
    showToast(`Unit reservation request dispatched to ${bankName} cryogenic registry.`);
  };

  return (
    <div className="koshika-animate-fadein pb-5 mx-auto" style={{ maxWidth: '1240px' }}>
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className="position-fixed bottom-0 end-0 m-4 p-3 rounded-4 shadow-lg text-white d-flex align-items-center gap-2"
          style={{ backgroundColor: '#0d9488', zIndex: 9999, maxWidth: '420px', animation: 'fadeIn 0.2s ease-out' }}
        >
          <CheckCircle2 size={18} />
          <span className="small fw-semibold">{toastMsg}</span>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          TOP BREADCRUMB
      ---------------------------------------------------------------------- */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <Link
          to="/doctor"
          className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 text-muted hover-translate-y"
          style={{ fontSize: '0.82rem' }}
        >
          <ArrowLeft size={14} />
          <span>Dashboard</span>
        </Link>
        <span className="text-muted small">/</span>
        <span className="badge rounded-pill px-2.5 py-1 small fw-bold" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
          Stem Cell Resources
        </span>
        <span className="text-dark small fw-semibold">Donor &amp; Biobank</span>
      </div>

      {/* ---------------------------------------------------------------------
          CREATIVE COLORFUL HERO BANNER
      ---------------------------------------------------------------------- */}
      <div 
        className="rounded-4 p-4 p-md-5 mb-4 text-white position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          boxShadow: '0 10px 30px -5px rgba(6, 78, 59, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        }}
      >
        <div className="position-relative" style={{ zIndex: 2 }}>
          <div className="d-flex align-items-center gap-2 flex-wrap mb-2.5">
            <span 
              className="badge rounded-pill px-3 py-1.5 small fw-bold shadow-xs d-inline-flex align-items-center gap-1.5 top-head-badge-white"
              style={{ backgroundColor: 'var(--k-surface)', color: 'var(--k-primary)' }}
            >
              <Database size={13} style={{ color: 'var(--k-primary)' }} />
              <span>NATIONAL BIOBANK REGISTRY</span>
            </span>
            <span 
              className="badge rounded-pill px-3 py-1.5 small fw-semibold" 
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
            >
              ● 100% CDSCO Form 28D Licensed
            </span>
          </div>

          <h2 className="fw-extrabold mb-2 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
            Find Stem Cell &amp; Cord Blood Repositories
          </h2>
          <p className="mb-0 text-white text-opacity-90" style={{ maxWidth: '650px', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Search verified cryogenic biobanks across India for matching cord blood units, bone marrow registries, and cellular therapy products.
          </p>

          {/* Simple, Breathable Metric Strip */}
          <div className="row g-3 pt-3 border-top border-white border-opacity-15 mt-3">
            <div className="col-6 col-sm-3">
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-circle p-2 text-white" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <Building2 size={16} />
                </div>
                <div>
                  <div className="fs-5 fw-bold text-white lh-1">18 Banks</div>
                  <div className="small text-white-50 mt-0.5" style={{ fontSize: '0.72rem' }}>Verified Repositories</div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-3">
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-circle p-2 text-white" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <Droplet size={16} />
                </div>
                <div>
                  <div className="fs-5 fw-bold text-white lh-1">45,000+</div>
                  <div className="small text-white-50 mt-0.5" style={{ fontSize: '0.72rem' }}>Cord Blood Units</div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-3">
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-circle p-2 text-white" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <Snowflake size={16} />
                </div>
                <div>
                  <div className="fs-5 fw-bold text-white lh-1">-196°C</div>
                  <div className="small text-white-50 mt-0.5" style={{ fontSize: '0.72rem' }}>Liquid N₂ Cryo Vaults</div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-3">
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-circle p-2 text-white" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <div className="fs-5 fw-bold text-white lh-1">&gt; 92%</div>
                  <div className="small text-white-50 mt-0.5" style={{ fontSize: '0.72rem' }}>Release Viability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          SEARCH & STATE FILTER BAR (SIMPLE & EASY)
      ---------------------------------------------------------------------- */}
      <div className="card border-0 rounded-4 shadow-sm p-3 mb-4 bg-white" style={{ border: '1px solid #e2e8f0' }}>
        <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between gap-3">
          {/* Big, Friendly Search Input */}
          <div className="position-relative flex-grow-1" style={{ maxWidth: '420px' }}>
            <Search 
              size={17} 
              className="position-absolute text-muted" 
              style={{ top: '50%', left: '16px', transform: 'translateY(-50%)' }} 
            />
            <input
              type="text"
              className="form-control rounded-pill ps-5 pe-4 py-2 border bg-light small"
              placeholder="Search by bank name or city (e.g. Bengaluru, Gurugram)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ fontSize: '0.86rem', borderColor: '#cbd5e1' }}
            />
          </div>

          {/* Region Pills with Live Counts */}
          <div className="d-flex align-items-center gap-1.5 flex-wrap">
            <span className="small text-muted fw-bold me-1 d-none d-sm-inline" style={{ fontSize: '0.74rem' }}>
              REGION:
            </span>
            {states.map((st) => {
              const isSelected = selectedState === st;
              const count = st === 'ALL' 
                ? banks.length 
                : banks.filter(b => b.location?.toLowerCase().includes(st.toLowerCase())).length;

              return (
                <button
                  key={st}
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 py-1 fw-bold transition-all d-inline-flex align-items-center gap-1.5 ${
                    isSelected ? 'text-white shadow-xs' : 'btn-light border text-secondary'
                  }`}
                  style={isSelected ? {
                    backgroundColor: '#0d9488',
                    borderColor: '#0d9488',
                    fontSize: '0.78rem'
                  } : { fontSize: '0.78rem' }}
                  onClick={() => setSelectedState(st)}
                >
                  <span>{st === 'ALL' ? 'All India' : st}</span>
                  <span 
                    className="badge rounded-pill px-1.5 py-0.5"
                    style={{ 
                      backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.3)' : '#e2e8f0', 
                      color: isSelected ? '#ffffff' : '#475569',
                      fontSize: '0.66rem'
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          CREATIVE, COLORFUL BIOBANK CARDS
      ---------------------------------------------------------------------- */}
      <div className="row g-3.5">
        {filteredBanks.map((b, idx) => {
          const theme = colorThemes[idx % colorThemes.length];

          return (
            <div key={b.id} className="col-12 col-md-6 col-lg-4">
              <div 
                className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 hover-lift d-flex flex-column justify-content-between transition-all"
                style={{ 
                  border: '1px solid #e2e8f0',
                  borderTop: `4px solid ${theme.primary}`
                }}
              >
                <div>
                  {/* Card Header: Icon + License Pill */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center shadow-xs flex-shrink-0"
                      style={{ 
                        width: '44px', 
                        height: '44px', 
                        backgroundColor: theme.bg, 
                        color: theme.primary 
                      }}
                    >
                      <Building2 size={22} />
                    </div>

                    <span 
                      className="badge rounded-pill px-2.5 py-1 small fw-bold"
                      style={{ backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0', fontSize: '0.7rem' }}
                    >
                      <CheckCircle2 size={11} className="me-1 inline" />
                      CDSCO Licensed
                    </span>
                  </div>

                  {/* Bank Name */}
                  <h6 className="fw-bold text-dark mb-1 fs-6" style={{ lineHeight: '1.35' }}>
                    {b.bank_name}
                  </h6>

                  {/* Location with MapPin */}
                  <div className="d-flex align-items-start gap-1.5 text-muted small mb-3.5" style={{ fontSize: '0.78rem' }}>
                    <MapPin size={14} className="text-secondary flex-shrink-0 mt-0.5" />
                    <span>{b.location}</span>
                  </div>

                  {/* Visual Feature Tags (Clean, Modern & Colorful) */}
                  <div className="d-flex align-items-center gap-1.5 flex-wrap mb-4">
                    <span 
                      className="badge rounded-pill px-2.5 py-1 small fw-semibold d-inline-flex align-items-center gap-1"
                      style={{ backgroundColor: '#e0f2fe', color: '#0284c7', border: '1px solid #bae6fd', fontSize: '0.72rem' }}
                    >
                      <Snowflake size={11} />
                      <span>-196°C LN₂ Vault</span>
                    </span>

                    <span 
                      className="badge rounded-pill px-2.5 py-1 small fw-semibold d-inline-flex align-items-center gap-1"
                      style={{ backgroundColor: '#f3e8ff', color: '#7e22ce', border: '1px solid #e9d5ff', fontSize: '0.72rem' }}
                    >
                      <Dna size={11} />
                      <span>Cord Blood &amp; MNC</span>
                    </span>

                    <span 
                      className="badge rounded-pill px-2.5 py-1 small fw-semibold d-inline-flex align-items-center gap-1"
                      style={{ backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', fontSize: '0.72rem' }}
                    >
                      <Check size={11} />
                      <span>Active Registry</span>
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="d-flex gap-2 pt-3 border-top">
                  <button
                    type="button"
                    className="btn btn-sm btn-light border rounded-pill flex-grow-1 py-1.5 fw-semibold d-flex align-items-center justify-content-center gap-1.5 text-secondary"
                    style={{ fontSize: '0.8rem' }}
                    onClick={() => setSelectedBank(b)}
                  >
                    <Info size={14} />
                    <span>Details</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm text-white rounded-pill px-3.5 py-1.5 fw-bold d-flex align-items-center gap-1.5 shadow-xs hover-translate-y"
                    style={{ backgroundColor: '#0d9488', fontSize: '0.8rem', border: 'none' }}
                    onClick={() => setReserveModalBank(b)}
                  >
                    <Zap size={13} />
                    <span>Reserve Unit</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredBanks.length === 0 && (
          <div className="col-12">
            <div className="card border-0 rounded-4 shadow-sm p-5 text-center text-muted bg-white">
              <Building2 size={42} className="text-secondary opacity-50 mb-2 mx-auto" />
              <h6 className="fw-bold text-dark">No stem cell biobanks match your search</h6>
              <p className="small text-secondary mb-0">Try selecting "All India" or clearing your search term.</p>
            </div>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------------------
          MODAL 1: SPECIFICATIONS & ACCREDITATIONS
      ---------------------------------------------------------------------- */}
      {selectedBank && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '520px' }}>
            <div className="modal-content border-0 rounded-4 shadow-lg p-4 bg-white">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-2.5">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center text-teal shadow-xs"
                    style={{ width: '42px', height: '42px', backgroundColor: '#eaf7f4', color: '#0d9488' }}
                  >
                    <Building2 size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0">{selectedBank.bank_name}</h6>
                    <span className="small text-muted" style={{ fontSize: '0.76rem' }}>{selectedBank.location}</span>
                  </div>
                </div>
                <button type="button" className="btn-close" onClick={() => setSelectedBank(null)} />
              </div>

              <div className="d-flex flex-column gap-2.5 mb-3 small" style={{ fontSize: '0.8rem' }}>
                <div className="p-3 rounded-3 bg-light border">
                  <div className="fw-bold text-dark mb-1 d-flex align-items-center gap-1.5">
                    <ShieldCheck size={15} style={{ color: '#0d9488' }} />
                    <span>Accreditations &amp; Quality Governance</span>
                  </div>
                  <div className="text-secondary" style={{ lineHeight: '1.45' }}>
                    CDSCO Form 28D Licensed • National Blood Transfusion Council Compliant • ISO 9001:2015 &amp; NABL Accredited Flow Cytometry.
                  </div>
                </div>

                <div className="p-3 rounded-3 bg-light border">
                  <div className="fw-bold text-dark mb-1 d-flex align-items-center gap-1.5">
                    <Snowflake size={15} style={{ color: '#0d9488' }} />
                    <span>Cryogenic Processing Protocols</span>
                  </div>
                  <div className="text-secondary" style={{ lineHeight: '1.45' }}>
                    SEPAX automated closed volume reduction, controlled-rate vapor phase nitrogen freezing, continuous 24/7 telemetry monitoring with redundant dual tanks.
                  </div>
                </div>

                <div className="p-3 rounded-3 bg-light border">
                  <div className="fw-bold text-dark mb-1 d-flex align-items-center gap-1.5">
                    <Dna size={15} style={{ color: '#0d9488' }} />
                    <span>Pre-Release Testing Suite</span>
                  </div>
                  <div className="text-secondary" style={{ lineHeight: '1.45' }}>
                    Flow cytometric CD34+ enumeration (ISHAGE protocol), 7-AAD viability assay (&gt;90% release spec), 14-day BACTEC microbial sterility.
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light border rounded-pill px-3.5 py-1.5 fw-semibold"
                  onClick={() => setSelectedBank(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-sm text-white rounded-pill px-4 py-1.5 fw-bold shadow-xs"
                  style={{ backgroundColor: '#0d9488' }}
                  onClick={() => {
                    const b = selectedBank;
                    setSelectedBank(null);
                    setReserveModalBank(b);
                  }}
                >
                  Reserve Unit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 2: RAPID BIOBANK UNIT RESERVATION
      ---------------------------------------------------------------------- */}
      {reserveModalBank && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '480px' }}>
            <div className="modal-content border-0 rounded-4 shadow-lg p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '36px', height: '36px', backgroundColor: '#0d9488' }}>
                    <Zap size={18} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0">Reserve Cryovial Unit</h6>
                    <span className="small text-muted" style={{ fontSize: '0.74rem' }}>{reserveModalBank.bank_name}</span>
                  </div>
                </div>
                <button type="button" className="btn-close" onClick={() => setReserveModalBank(null)} />
              </div>

              <div className="p-3 rounded-3 mb-3" style={{ backgroundColor: '#f0fdfa', border: '1px solid #ccfbf1' }}>
                <span className="small text-uppercase fw-bold text-teal d-block mb-1" style={{ color: '#0f766e', fontSize: '0.7rem' }}>
                  Target Recipient
                </span>
                <div className="fw-bold text-dark small">Priya Sharma (PT-9042)</div>
                <div className="small text-secondary" style={{ fontSize: '0.76rem' }}>
                  HLA Concordance: <strong>10/10 Matched</strong> • Blood Group: <strong>B+</strong>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-dark mb-1" style={{ fontSize: '0.8rem' }}>
                  Courier &amp; Dry Shipper Requirements
                </label>
                <select className="form-select form-select-sm rounded-3 small">
                  <option>Validated Vapor Shipper (&lt; -150°C, 10-day hold)</option>
                  <option>Standard Liquid N2 Transport Container</option>
                </select>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light border rounded-pill px-3 py-1.5"
                  onClick={() => setReserveModalBank(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-sm text-white rounded-pill px-4 py-1.5 fw-bold shadow-xs"
                  style={{ backgroundColor: '#0d9488' }}
                  onClick={() => handleReserve(reserveModalBank.bank_name)}
                >
                  Confirm Reservation Direct
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorBankSearch;
