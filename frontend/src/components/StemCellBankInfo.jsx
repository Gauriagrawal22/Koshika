import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { useLanguage } from '../context/LanguageContext';
import {
  Building2,
  Snowflake,
  ShieldCheck,
  Users,
  Lock,
  Dna,
  Activity,
  CheckCircle2,
  ArrowRight,
  Search,
  Plus,
  Trash2,
  ExternalLink,
  Clock,
  Sparkles,
  Heart,
  Award,
  Info,
  Droplet,
  Truck,
  Check,
  X
} from 'lucide-react';

export const DEFAULT_STEM_CELL_BANKS = [
  { id: 1, bank_name: 'LifeCell International Pvt. Ltd.', location: 'Chennai, Tamil Nadu; storage facility also in Gurugram, Haryana' },
  { id: 2, bank_name: 'CryoViva Biotech India Pvt. Ltd.', location: 'Gurugram, Haryana' },
  { id: 3, bank_name: 'Cordlife Sciences India Pvt. Ltd.', location: 'Kolkata / Bishnupur, West Bengal' },
  { id: 4, bank_name: 'BioCell / Regrow Biosciences Pvt. Ltd.', location: 'Maharashtra' },
  { id: 5, bank_name: 'Cryo StemCell', location: 'Bengaluru, Karnataka' },
  { id: 6, bank_name: 'Cryovault Biotech Pvt. Ltd.', location: 'Bengaluru, Karnataka' },
  { id: 7, bank_name: 'Novacord / Totipotent RX Cell Therapy Pvt. Ltd.', location: 'Gurugram, Haryana' },
  { id: 8, bank_name: 'ReeLabs Pvt. Ltd.', location: 'Mumbai' },
  { id: 9, bank_name: 'Reliance Life Sciences Pvt. Ltd.', location: 'Navi Mumbai, Maharashtra' },
  { id: 10, bank_name: 'StemPlus Cryopreservation Pvt. Ltd.', location: 'Sangli, Maharashtra' },
  { id: 11, bank_name: 'StemCyte India Therapeutics Pvt. Ltd.', location: 'Gandhinagar, Gujarat' },
  { id: 12, bank_name: 'Narayana Hrudayalaya Tissue Bank & Stem Cells Research Centre', location: 'Bengaluru, Karnataka' },
  { id: 13, bank_name: 'Cryo Save (India) Pvt. Ltd.', location: 'Bengaluru, Karnataka' },
  { id: 14, bank_name: 'International Stem Cell Services Ltd. (ISSL)', location: 'Bengaluru, Karnataka' },
  { id: 15, bank_name: 'Unistem Bio Sciences Pvt. Ltd.', location: 'Gurugram, Haryana' },
  { id: 16, bank_name: 'Best Wellcare Management Services Pvt. Ltd. (Indu Stem Cell Bank)', location: 'Vadodara, Gujarat' },
  { id: 17, bank_name: 'Path Care Labs Pvt. Ltd.', location: 'Ranga Reddy district, Andhra Pradesh in the government record' },
  { id: 18, bank_name: 'Cryobanks International India Pvt. Ltd.', location: 'Gurugram, Haryana' }
];

const StemCellBankInfo = ({ showHero = true }) => {
  const { t } = useLanguage();
  const [banks, setBanks] = useState(DEFAULT_STEM_CELL_BANKS);
  const [loading, setLoading] = useState(false);
  const [bankSearch, setBankSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [selectedStorageSample, setSelectedStorageSample] = useState('cord_blood');
  const [showModal, setShowModal] = useState(false);
  const [viewingBank, setViewingBank] = useState(null);
  const [formData, setFormData] = useState({ bank_name: '', location: '' });

  // In-App Toast
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/stem-cell-banks/');
      const data = res.data.results || res.data;
      if (Array.isArray(data) && data.length > 0) {
        setBanks(data);
      }
    } catch (e) {
      console.warn('Using default certified stem cell banks:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBank = async (e) => {
    e.preventDefault();
    if (!formData.bank_name.trim() || !formData.location.trim()) return;
    try {
      await api.post('/stem-cell-banks/', {
        bank_name: formData.bank_name.trim(),
        location: formData.location.trim()
      });
      setShowModal(false);
      showToast(`Added "${formData.bank_name.trim()}" to directory`, 'success');
      setFormData({ bank_name: '', location: '' });
      fetchBanks();
    } catch (err) {
      showToast('Error adding bank: ' + (err.response?.data?.message || err.message), 'danger');
    }
  };

  const handleDeleteBank = async (id) => {
    if (!window.confirm(`Remove stem cell bank entry #${id}?`)) return;
    try {
      await api.delete(`/stem-cell-banks/${id}/`);
      showToast('Biobank record removed.', 'info');
      fetchBanks();
    } catch (err) {
      showToast('Error deleting bank: ' + err.message, 'danger');
    }
  };

  const sampleTypes = {
    cord_blood: {
      id: 'cord_blood',
      name: 'Umbilical Cord Blood',
      shortName: 'Cord Blood',
      themeColor: '#e11d48',
      bgLight: '#ffe4e6',
      icon: Droplet,
      tag: 'Hematopoietic (HSC)',
      cells: 'Hematopoietic Stem Cells (HSCs) & Progenitors',
      collection: 'Painless collection from umbilical cord immediately post-delivery. Zero maternal/infant risk.',
      temp: '-196°C Liquid N₂ Vapor',
      viability: '25+ Years (Indefinite at cryogenic equilibrium)',
      approvedIndications: [
        'Acute & Chronic Leukemia',
        'Thalassemia Major',
        'Sickle Cell Anemia',
        'Severe Immunodeficiencies (SCID)'
      ]
    },
    cord_tissue: {
      id: 'cord_tissue',
      name: 'Wharton’s Jelly Cord Tissue',
      shortName: 'Cord Tissue',
      themeColor: '#0d9488',
      bgLight: '#ccfbf1',
      icon: Dna,
      tag: 'Mesenchymal (MSC)',
      cells: 'Mesenchymal Stem Cells (MSCs) & Pericytes',
      collection: 'Sterile segment of postpartum umbilical tissue processed for connective stromal cells.',
      temp: '-196°C Vapor Phase',
      viability: '25+ Years with DMSO cryoprotectant',
      approvedIndications: [
        'Graft-vs-Host Disease (GVHD)',
        'Cartilage & Joint Repair',
        'Autoimmune Clinical Trials',
        'Ischemic Myocardial Regeneration'
      ]
    },
    bone_marrow: {
      id: 'bone_marrow',
      name: 'Bone Marrow Aspirate',
      shortName: 'Bone Marrow',
      themeColor: '#ea580c',
      bgLight: '#ffedd5',
      icon: Activity,
      tag: 'HSC + Microenvironment',
      cells: 'HSCs, MSCs & Bone Marrow Stromal Niche',
      collection: 'Harvested from posterior iliac crest under sterile surgical theater conditions.',
      temp: '-196°C Controlled-Rate Frozen',
      viability: '20+ Years in Cryo-Vault',
      approvedIndications: [
        'Allogeneic Bone Marrow Transplants',
        'Aplastic Anemia',
        'Multiple Myeloma',
        'Metabolic Storage Disorders'
      ]
    },
    pbsc: {
      id: 'pbsc',
      name: 'Peripheral Blood Stem Cells (PBSC)',
      shortName: 'Apheresis PBSC',
      themeColor: '#2563eb',
      bgLight: '#dbeafe',
      icon: Snowflake,
      tag: 'Mobilized CD34+',
      cells: 'G-CSF Mobilized CD34+ Hematopoietic Progenitors',
      collection: 'Non-surgical outpatient apheresis procedure following 4-5 days of filgrastim mobilization.',
      temp: '-196°C Liquid Nitrogen',
      viability: '20+ Years',
      approvedIndications: [
        'Standard of Care for 90% Adult Transplants',
        'Lymphoma Rescue Protocols',
        'Matched Unrelated Donor Infusions',
        'Rapid Neutrophil Engraftment'
      ]
    }
  };

  const getStateBadgeStyle = (loc) => {
    if (!loc) return { backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1' };
    if (loc.includes('Karnataka') || loc.includes('Bengaluru')) {
      return { backgroundColor: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd' };
    }
    if (loc.includes('Maharashtra') || loc.includes('Mumbai') || loc.includes('Sangli')) {
      return { backgroundColor: '#ffe4e6', color: '#be123c', border: '1px solid #fecdd3' };
    }
    if (loc.includes('Haryana') || loc.includes('Gurugram')) {
      return { backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0' };
    }
    if (loc.includes('Gujarat') || loc.includes('Gandhinagar') || loc.includes('Vadodara')) {
      return { backgroundColor: '#fef3c7', color: '#b45309', border: '1px solid #fde68a' };
    }
    if (loc.includes('Tamil Nadu') || loc.includes('Chennai')) {
      return { backgroundColor: '#e0e7ff', color: '#3730a3', border: '1px solid #c7d2fe' };
    }
    if (loc.includes('West Bengal') || loc.includes('Kolkata')) {
      return { backgroundColor: '#f3e8ff', color: '#6b21a8', border: '1px solid #d8b4fe' };
    }
    if (loc.includes('Andhra Pradesh')) {
      return { backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1' };
    }
    return { backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1' };
  };

  const getStateBadge = (loc) => {
    if (!loc) return 'bg-secondary-subtle text-secondary border';
    if (loc.includes('Karnataka') || loc.includes('Bengaluru')) return 'bg-primary-subtle text-primary border border-primary-subtle';
    if (loc.includes('Maharashtra') || loc.includes('Mumbai') || loc.includes('Sangli')) return 'bg-danger-subtle text-danger border border-danger-subtle';
    if (loc.includes('Haryana') || loc.includes('Gurugram')) return 'bg-success-subtle text-success border border-success-subtle';
    if (loc.includes('Gujarat') || loc.includes('Gandhinagar') || loc.includes('Vadodara')) return 'bg-warning-subtle text-warning-emphasis border border-warning-subtle';
    if (loc.includes('Tamil Nadu') || loc.includes('Chennai')) return 'bg-info-subtle text-info border border-info-subtle';
    if (loc.includes('West Bengal') || loc.includes('Kolkata')) return 'bg-purple-subtle text-purple border border-purple-subtle k-badge-west-bengal';
    if (loc.includes('Andhra Pradesh')) return 'bg-secondary-subtle text-dark border';
    return 'bg-light text-secondary border';
  };

  const extractState = (loc) => {
    if (!loc) return 'India';
    if (loc.includes('Karnataka')) return 'Karnataka';
    if (loc.includes('Maharashtra')) return 'Maharashtra';
    if (loc.includes('Haryana')) return 'Haryana';
    if (loc.includes('Gujarat')) return 'Gujarat';
    if (loc.includes('Tamil Nadu')) return 'Tamil Nadu';
    if (loc.includes('West Bengal')) return 'West Bengal';
    if (loc.includes('Andhra Pradesh')) return 'Andhra Pradesh';
    return 'India';
  };

  const stateCounts = {
    ALL: banks.length,
    Karnataka: banks.filter(b => (b.location || '').includes('Karnataka') || (b.location || '').includes('Bengaluru')).length,
    Maharashtra: banks.filter(b => (b.location || '').includes('Maharashtra') || (b.location || '').includes('Mumbai') || (b.location || '').includes('Sangli')).length,
    Haryana: banks.filter(b => (b.location || '').includes('Haryana') || (b.location || '').includes('Gurugram')).length,
    Gujarat: banks.filter(b => (b.location || '').includes('Gujarat') || (b.location || '').includes('Gandhinagar') || (b.location || '').includes('Vadodara')).length,
    'Tamil Nadu': banks.filter(b => (b.location || '').includes('Tamil Nadu') || (b.location || '').includes('Chennai')).length,
    'West Bengal': banks.filter(b => (b.location || '').includes('West Bengal') || (b.location || '').includes('Kolkata')).length,
    'Andhra Pradesh': banks.filter(b => (b.location || '').includes('Andhra Pradesh')).length
  };

  const filteredBanks = banks.filter((bank) => {
    const name = bank.bank_name || bank.name || '';
    const loc = bank.location || bank.country || '';
    const matchesSearch =
      name.toLowerCase().includes(bankSearch.toLowerCase()) ||
      loc.toLowerCase().includes(bankSearch.toLowerCase());
    const matchesState = stateFilter === 'ALL' || loc.includes(stateFilter);
    return matchesSearch && matchesState;
  });

  const activeSample = sampleTypes[selectedStorageSample] || sampleTypes.cord_blood;

  return (
    <div className="stem-cell-bank-container mb-4">
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
          <CheckCircle2 size={20} />
          <div className="small flex-grow-1">{toast.message}</div>
          <button
            type="button"
            className="btn-close btn-close-white ms-auto"
            onClick={() => setToast(null)}
          ></button>
        </div>
      )}

      {/* 1. CREATIVE VISUAL HERO BANNER (Shown conditionally) */}
      {showHero && (
        <div
          className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 text-white position-relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #091e3a 0%, #103766 50%, #0d9488 100%)',
            boxShadow: '0 10px 30px rgba(13, 148, 136, 0.15)'
          }}
        >
          <div className="row align-items-center position-relative" style={{ zIndex: 2 }}>
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-2 mb-2.5 flex-wrap">
                <span className="badge rounded-pill px-3 py-1.5 fw-bold d-inline-flex align-items-center gap-1.5" style={{ background: 'rgba(20, 184, 166, 0.25)', color: '#5eead4', border: '1px solid rgba(94, 234, 212, 0.4)' }}>
                  <Snowflake size={14} />
                  <span>Cryobiology &amp; Biobanking Hub</span>
                </span>
                <span className="badge rounded-pill px-3 py-1.5 small fw-semibold" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.25)' }}>
                  <ShieldCheck size={13} className="me-1" />
                  FACT-JACIE &amp; CDSCO Certified Standards
                </span>
              </div>
              <h2 className="fw-extrabold mb-2.5 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.9rem' }}>
                Stem Cell Biobanks: Preserving the Blueprint of Life
              </h2>
              <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.98rem', lineHeight: '1.6', maxWidth: '650px' }}>
                High-security cryogenic vaults preserve pristine human hematopoietic and mesenchymal stem cells in liquid nitrogen vapor at <strong className="text-info">-196°C</strong>. Cellular aging stops completely, securing life-saving treatments for decades.
              </p>
            </div>

            <div className="col-lg-4 mt-3 mt-lg-0">
              <div className="row g-2 text-center">
                <div className="col-4 col-lg-12 mb-lg-2">
                  <div className="p-2.5 rounded-3" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <Snowflake size={20} className="text-info" />
                      <span className="fs-4 fw-bold text-white">-196°C</span>
                    </div>
                    <small className="text-white-50 d-block" style={{ fontSize: '0.74rem' }}>Liquid N₂ Vapor Temp</small>
                  </div>
                </div>
                <div className="col-4 col-lg-12 mb-lg-2">
                  <div className="p-2.5 rounded-3" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <Clock size={20} style={{ color: '#4ade80' }} />
                      <span className="fs-4 fw-bold text-white">25+ Yrs</span>
                    </div>
                    <small className="text-white-50 d-block" style={{ fontSize: '0.74rem' }}>Proven Viability Window</small>
                  </div>
                </div>
                <div className="col-4 col-lg-12">
                  <div className="p-2.5 rounded-3" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <ShieldCheck size={20} style={{ color: '#fbbf24' }} />
                      <span className="fs-4 fw-bold text-white">100%</span>
                    </div>
                    <small className="text-white-50 d-block" style={{ fontSize: '0.74rem' }}>Zero Cellular Degradation</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PUBLIC VS. PRIVATE BIOBANKING — CREATIVE COLOR CARDS */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 koshika-card">
        <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge rounded-pill px-2.5 py-1 small fw-semibold" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                <Users size={12} className="me-1" /> DECISION GUIDE
              </span>
              <span className="text-muted small">Compare in 10 seconds</span>
            </div>
            <h4 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
              <span>{t.publicVsPrivate || 'Public vs. Private Stem Cell Banking'}</span>
            </h4>
          </div>
          <span className="badge bg-light text-secondary border px-3 py-1.5 rounded-pill small">
            Understanding Altruistic Donation vs. Dedicated Family Custody
          </span>
        </div>

        <div className="row g-3">
          {/* Card 1: Public Biobanking */}
          <div className="col-12 col-md-6">
            <div
              className="p-4 rounded-4 h-100 position-relative transition-all hover-lift"
              style={{
                background: 'linear-gradient(145deg, #f0fdf4 0%, #e0f2fe 100%)',
                border: '1.5px solid #7dd3fc'
              }}
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-2.5">
                  <div
                    className="rounded-3 p-2.5 d-flex align-items-center justify-content-center shadow-xs"
                    style={{ background: '#0284c7', color: '#ffffff', width: '42px', height: '42px' }}
                  >
                    <Users size={22} />
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-0">Public Biobank</h5>
                    <small className="text-secondary">Community Lifeline (e.g. DATRI, Be The Match)</small>
                  </div>
                </div>
                <span className="badge rounded-pill px-3 py-1 fw-bold" style={{ background: '#dcfce7', color: '#166534', border: '1px solid #86efac' }}>
                  100% Free
                </span>
              </div>

              {/* Visual Dimension Badges */}
              <div className="d-flex flex-column gap-2 mb-3">
                <div className="p-2.5 bg-white rounded-3 shadow-xs border d-flex align-items-center justify-content-between">
                  <span className="small text-muted fw-semibold">Cost to Donor:</span>
                  <span className="badge bg-success text-white rounded-pill px-2.5 py-1 small fw-bold">₹0 Free (Philanthropy Funded)</span>
                </div>
                <div className="p-2.5 bg-white rounded-3 shadow-xs border d-flex align-items-center justify-content-between">
                  <span className="small text-muted fw-semibold">Who Can Use:</span>
                  <span className="small fw-bold text-dark text-end">Any Matched Patient Globally</span>
                </div>
                <div className="p-2.5 bg-white rounded-3 shadow-xs border d-flex align-items-center justify-content-between">
                  <span className="small text-muted fw-semibold">Clinical Use:</span>
                  <span className="badge rounded-pill px-2.5 py-1 small fw-bold" style={{ background: '#dbeafe', color: '#1d4ed8' }}>High (Direct Match Dispatch)</span>
                </div>
                <div className="p-2.5 bg-white rounded-3 shadow-xs border d-flex align-items-center justify-content-between">
                  <span className="small text-muted fw-semibold">Release Governance:</span>
                  <span className="small fw-semibold text-secondary">Registry &amp; Transplant Physician</span>
                </div>
              </div>

              <div className="p-2.5 rounded-3 d-flex align-items-center gap-2 small" style={{ background: 'rgba(2, 132, 199, 0.1)', color: '#0369a1' }}>
                <CheckCircle2 size={16} className="flex-shrink-0" />
                <span className="fw-semibold">Recommended by Medical Academies as the ultimate altruistic gift of life.</span>
              </div>
            </div>
          </div>

          {/* Card 2: Private Biobanking */}
          <div className="col-12 col-md-6">
            <div
              className="p-4 rounded-4 h-100 position-relative transition-all hover-lift"
              style={{
                background: 'linear-gradient(145deg, #faf5ff 0%, #ede9fe 100%)',
                border: '1.5px solid #c4b5fd'
              }}
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-2.5">
                  <div
                    className="rounded-3 p-2.5 d-flex align-items-center justify-content-center shadow-xs"
                    style={{ background: '#7c3aed', color: '#ffffff', width: '42px', height: '42px' }}
                  >
                    <Lock size={22} />
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-0">Private / Family Bank</h5>
                    <small className="text-secondary">Family Cryo-Shield (e.g. LifeCell, Cryovault)</small>
                  </div>
                </div>
                <span className="badge rounded-pill px-3 py-1 fw-bold" style={{ background: '#f3e8ff', color: '#6b21a8', border: '1px solid #d8b4fe' }}>
                  Family Exclusive
                </span>
              </div>

              {/* Visual Dimension Badges */}
              <div className="d-flex flex-column gap-2 mb-3">
                <div className="p-2.5 bg-white rounded-3 shadow-xs border d-flex align-items-center justify-content-between">
                  <span className="small text-muted fw-semibold">Cost to Donor:</span>
                  <span className="small fw-bold text-dark">Enrollment Fee + Annual Cryo Fee</span>
                </div>
                <div className="p-2.5 bg-white rounded-3 shadow-xs border d-flex align-items-center justify-content-between">
                  <span className="small text-muted fw-semibold">Who Can Use:</span>
                  <span className="badge rounded-pill px-2.5 py-1 small fw-bold" style={{ background: '#ede9fe', color: '#6d28d9' }}>Donor Child &amp; Biological Siblings</span>
                </div>
                <div className="p-2.5 bg-white rounded-3 shadow-xs border d-flex align-items-center justify-content-between">
                  <span className="small text-muted fw-semibold">Clinical Use:</span>
                  <span className="small fw-semibold text-secondary">Targeted (Autologous/Family Hereditary)</span>
                </div>
                <div className="p-2.5 bg-white rounded-3 shadow-xs border d-flex align-items-center justify-content-between">
                  <span className="small text-muted fw-semibold">Release Governance:</span>
                  <span className="small fw-semibold text-secondary">Parental Written Authorization Only</span>
                </div>
              </div>

              <div className="p-2.5 rounded-3 d-flex align-items-center gap-2 small" style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#5b21b6' }}>
                <ShieldCheck size={16} className="flex-shrink-0" />
                <span className="fw-semibold">Ideal for families with identified genetic disorders or personalized regenerative security.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. THE 5-STAGE CRYOPRESERVATION PIPELINE (CONNECTED VISUAL STEPPER) */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge rounded-pill px-2.5 py-1 small fw-semibold" style={{ background: '#ecfdf5', color: '#047857' }}>
                <Activity size={12} className="me-1" /> CELLULAR PRESERVATION PIPELINE
              </span>
              <span className="text-muted small">From Delivery Room to Deep Freeze</span>
            </div>
            <h4 className="fw-bold text-dark mb-0">The 5-Stage Biobanking Journey</h4>
          </div>
          <span className="badge bg-light text-secondary border px-3 py-1.5 rounded-pill small">
            Zero Ice Crystal Damage &bull; Programmed 1°C/min Cooling
          </span>
        </div>

        <div className="row g-2">
          {/* Stage 1 */}
          <div className="col-12 col-md-6 col-lg">
            <div className="p-3 rounded-4 h-100 border text-center transition-all hover-lift" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
              <div
                className="rounded-circle mx-auto p-2 mb-2 d-flex align-items-center justify-content-center"
                style={{ width: '44px', height: '44px', background: '#dcfce7', color: '#15803d' }}
              >
                <Heart size={20} />
              </div>
              <span className="badge bg-success rounded-pill px-2.5 py-0.5 small mb-1">Stage 1</span>
              <h6 className="fw-bold text-dark mb-1 small">Safe Collection</h6>
              <span className="badge bg-white text-success border px-2 py-0.5 rounded-pill small mb-2" style={{ fontSize: '0.72rem' }}>
                0-Hour &bull; Zero Risk
              </span>
              <p className="text-secondary small mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
                Painless umbilical collection post-delivery or sterile peripheral apheresis in anticoagulant bags.
              </p>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="col-12 col-md-6 col-lg">
            <div className="p-3 rounded-4 h-100 border text-center transition-all hover-lift" style={{ background: '#f0f9ff', borderColor: '#bae6fd' }}>
              <div
                className="rounded-circle mx-auto p-2 mb-2 d-flex align-items-center justify-content-center"
                style={{ width: '44px', height: '44px', background: '#e0f2fe', color: '#0284c7' }}
              >
                <Truck size={20} />
              </div>
              <span className="badge bg-info text-dark rounded-pill px-2.5 py-0.5 small mb-1">Stage 2</span>
              <h6 className="fw-bold text-dark mb-1 small">Cold Transit</h6>
              <span className="badge bg-white text-info border px-2 py-0.5 rounded-pill small mb-2" style={{ fontSize: '0.72rem' }}>
                24-48h Datalogger
              </span>
              <p className="text-secondary small mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
                Expedited temperature-controlled thermal dry-shippers with continuous live telemetry.
              </p>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="col-12 col-md-6 col-lg">
            <div className="p-3 rounded-4 h-100 border text-center transition-all hover-lift" style={{ background: '#fffbeb', borderColor: '#fde68a' }}>
              <div
                className="rounded-circle mx-auto p-2 mb-2 d-flex align-items-center justify-content-center"
                style={{ width: '44px', height: '44px', background: '#fef3c7', color: '#d97706' }}
              >
                <Activity size={20} />
              </div>
              <span className="badge bg-warning text-dark rounded-pill px-2.5 py-0.5 small mb-1">Stage 3</span>
              <h6 className="fw-bold text-dark mb-1 small">QC &amp; HLA Typing</h6>
              <span className="badge bg-white text-warning-emphasis border px-2 py-0.5 rounded-pill small mb-2" style={{ fontSize: '0.72rem' }}>
                CD34+ &amp; Viability
              </span>
              <p className="text-secondary small mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
                Volume reduction, flow cytometry viability testing, microbial screening &amp; NGS HLA typing.
              </p>
            </div>
          </div>

          {/* Stage 4 */}
          <div className="col-12 col-md-6 col-lg">
            <div className="p-3 rounded-4 h-100 border text-center transition-all hover-lift" style={{ background: '#faf5ff', borderColor: '#e9d5ff' }}>
              <div
                className="rounded-circle mx-auto p-2 mb-2 d-flex align-items-center justify-content-center"
                style={{ width: '44px', height: '44px', background: '#ede9fe', color: '#7c3aed' }}
              >
                <Snowflake size={20} />
              </div>
              <span className="badge rounded-pill px-2.5 py-0.5 small mb-1 text-white" style={{ background: '#8b5cf6' }}>Stage 4</span>
              <h6 className="fw-bold text-dark mb-1 small">Rate Freezing</h6>
              <span className="badge bg-white border px-2 py-0.5 rounded-pill small mb-2" style={{ color: '#7c3aed', fontSize: '0.72rem' }}>
                -1°C/min DMSO
              </span>
              <p className="text-secondary small mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
                Cryoprotectant infusion and computerized linear cooling prevents puncture from ice crystallization.
              </p>
            </div>
          </div>

          {/* Stage 5 */}
          <div className="col-12 col-md-6 col-lg">
            <div className="p-3 rounded-4 h-100 border text-center transition-all hover-lift" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
              <div
                className="rounded-circle mx-auto p-2 mb-2 d-flex align-items-center justify-content-center"
                style={{ width: '44px', height: '44px', background: '#dbeafe', color: '#2563eb' }}
              >
                <ShieldCheck size={20} />
              </div>
              <span className="badge bg-primary rounded-pill px-2.5 py-0.5 small mb-1">Stage 5</span>
              <h6 className="fw-bold text-dark mb-1 small">-196°C Vault</h6>
              <span className="badge bg-white text-primary border px-2 py-0.5 rounded-pill small mb-2" style={{ fontSize: '0.72rem' }}>
                25+ Yr Equilibrium
              </span>
              <p className="text-secondary small mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
                Suspended in liquid nitrogen vapor tanks with redundant telemetry, zero aging, and instant thaw readiness.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. WHAT CELLULAR MATERIALS ARE STORED? (INTERACTIVE COLORFUL SPEC EXPLORER) */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge rounded-pill px-2.5 py-1 small fw-semibold" style={{ background: '#fee2e2', color: '#b91c1c' }}>
                <Droplet size={12} className="me-1" /> STEM CELL COMPOSITION
              </span>
              <span className="text-muted small">Interactive Material Explorer</span>
            </div>
            <h4 className="fw-bold text-dark mb-0">What Cellular Therapies Can Be Preserved?</h4>
          </div>
          <span className="text-secondary small">Click a cell type below to view medical indications and specs:</span>
        </div>

        {/* 4 Interactive Category Cards */}
        <div className="row g-2 mb-3">
          {Object.entries(sampleTypes).map(([key, item]) => {
            const isSelected = selectedStorageSample === key;
            const IconComp = item.icon;
            return (
              <div key={key} className="col-6 col-md-3">
                <div
                  onClick={() => setSelectedStorageSample(key)}
                  className={`p-3 rounded-4 border text-center cursor-pointer transition-all hover-lift ${
                    isSelected ? 'shadow-sm' : 'bg-light border-light-subtle'
                  }`}
                  style={{
                    cursor: 'pointer',
                    background: isSelected ? item.bgLight : '#f8fafc',
                    borderColor: isSelected ? item.themeColor : '#e2e8f0',
                    borderWidth: isSelected ? '2px' : '1px'
                  }}
                >
                  <div
                    className="rounded-circle mx-auto p-2 mb-2 d-flex align-items-center justify-content-center"
                    style={{
                      width: '40px',
                      height: '40px',
                      background: isSelected ? item.themeColor : '#e2e8f0',
                      color: isSelected ? '#ffffff' : '#64748b'
                    }}
                  >
                    <IconComp size={18} />
                  </div>
                  <h6 className="fw-bold mb-1 small text-dark">{item.shortName}</h6>
                  <span
                    className="badge rounded-pill px-2 py-0.5 small"
                    style={{
                      background: isSelected ? '#ffffff' : '#f1f5f9',
                      color: isSelected ? item.themeColor : '#64748b',
                      fontSize: '0.72rem'
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Selection Details Display */}
        <div
          className="p-4 rounded-4 border"
          style={{
            background: 'var(--k-surface)',
            borderColor: activeSample.themeColor,
            borderLeftWidth: '6px'
          }}
        >
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3 pb-2 border-bottom">
            <div className="d-flex align-items-center gap-2">
              <span className="badge rounded-pill px-3 py-1.5 fw-bold" style={{ background: activeSample.bgLight, color: activeSample.themeColor }}>
                {activeSample.tag}
              </span>
              <h5 className="fw-bold text-dark mb-0">{activeSample.name}</h5>
            </div>
            <div className="d-flex gap-2">
              <span className="badge bg-light text-dark border px-2.5 py-1 rounded-pill small">
                <Snowflake size={12} className="me-1 text-info" /> {activeSample.temp}
              </span>
              <span className="badge bg-success-subtle text-success border border-success-subtle px-2.5 py-1 rounded-pill small">
                <Clock size={12} className="me-1" /> {activeSample.viability}
              </span>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <div className="mb-2">
                <small className="text-muted d-block fw-semibold">Primary Cellular Profile:</small>
                <strong className="text-dark small">{activeSample.cells}</strong>
              </div>
              <div>
                <small className="text-muted d-block fw-semibold">Harvesting &amp; Collection Protocol:</small>
                <p className="text-secondary small mb-0">{activeSample.collection}</p>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <small className="text-muted d-block fw-semibold mb-1.5">Approved &amp; Clinical Trial Indications:</small>
              <div className="d-flex flex-wrap gap-1.5">
                {activeSample.approvedIndications.map((ind, iIdx) => (
                  <span
                    key={iIdx}
                    className="badge rounded-pill px-2.5 py-1 small border d-inline-flex align-items-center gap-1"
                    style={{ background: 'var(--k-surface-alt)', color: 'var(--k-text-primary)', borderColor: 'var(--k-border)' }}
                  >
                    <CheckCircle2 size={12} style={{ color: activeSample.themeColor }} />
                    <span>{ind}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. CERTIFIED STEM CELL BANKS DIRECTORY */}
      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
              <span className="badge rounded-pill px-2.5 py-1 small fw-semibold" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                <Building2 size={12} className="me-1" /> VERIFIED FACILITY DIRECTORY
              </span>
              <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill small">
                {banks.length} Licensed Indian Facilities
              </span>
            </div>
            <h4 className="fw-bold text-dark mb-0">Certified Stem Cell Banks Directory</h4>
            <p className="text-secondary small mb-0">
              Government-registered biobanks authorized for human cord blood and cellular cryopreservation
            </p>
          </div>

          <div className="d-flex gap-2 align-items-center flex-wrap">
            <div className="input-group input-group-sm" style={{ width: '220px' }}>
              <span className="input-group-text bg-white border-end-0"><Search size={14} className="text-muted" /></span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder={t.searchBanks || 'Search facility or city...'}
                value={bankSearch}
                onChange={(e) => setBankSearch(e.target.value)}
              />
              {bankSearch && (
                <button className="btn btn-sm btn-link text-muted pe-2" onClick={() => setBankSearch('')}>
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="btn btn-sm btn-koshika-green-pill px-3 py-1.5 small d-flex align-items-center gap-1 shadow-xs"
            >
              <Plus size={14} />
              <span>Add Facility</span>
            </button>
          </div>
        </div>

        {/* State Filter Badges (Quick Filter Pills) */}
        <div className="d-flex align-items-center gap-1.5 mb-3 overflow-auto pb-1">
          <small className="text-muted fw-semibold flex-shrink-0 me-1">State / UT:</small>
          {Object.entries(stateCounts).map(([st, count]) => (
            <button
              key={st}
              type="button"
              className={`btn btn-xs rounded-pill px-2.5 py-1 small flex-shrink-0 transition-all ${
                stateFilter === st
                  ? 'btn-primary text-white fw-bold shadow-xs'
                  : 'btn-light border text-secondary'
              }`}
              style={{ fontSize: '0.76rem' }}
              onClick={() => setStateFilter(st)}
            >
              <span>{st === 'ALL' ? 'All India' : st}</span>
              <span className={`badge rounded-pill ms-1 ${stateFilter === st ? 'bg-white text-primary' : 'bg-secondary bg-opacity-25 text-dark'}`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Biobank Grid / Table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small">
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th>Biobank Facility Name</th>
                <th>Location &amp; Hub</th>
                <th>State</th>
                <th>Cryo Temp</th>
                <th>Accreditation</th>
                <th className="text-end pe-3">Explore</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                    <span className="text-muted">Loading licensed biobank directory...</span>
                  </td>
                </tr>
              ) : filteredBanks.length > 0 ? (
                filteredBanks.map((b) => (
                  <tr key={b.id}>
                    <td className="text-muted font-monospace small">#{b.id}</td>
                    <td>
                      <div className="fw-bold text-dark small d-flex align-items-center gap-1.5">
                        <Building2 size={15} className="text-primary flex-shrink-0" />
                        <span>{b.bank_name || b.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="small text-secondary">{b.location || b.country}</span>
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill px-2.5 py-1 small fw-semibold ${getStateBadge(b.location || b.country)}`}
                        style={getStateBadgeStyle(b.location || b.country)}
                      >
                        {extractState(b.location || b.country)}
                      </span>
                    </td>
                    <td>
                      <span className="badge rounded-pill px-2 py-0.5 small" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                        -196°C N₂ Vapor
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2 py-0.5 small">
                        <ShieldCheck size={11} className="me-1 d-inline" />
                        CDSCO Licensed
                      </span>
                    </td>
                    <td className="text-end pe-3">
                      <button
                        type="button"
                        onClick={() => setViewingBank(b)}
                        className="btn btn-sm btn-outline-primary rounded-pill px-3 py-0.5 me-1.5 small fw-semibold"
                        style={{ fontSize: '0.78rem' }}
                      >
                        Explore
                      </button>
                      <button
                        onClick={() => handleDeleteBank(b.id)}
                        className="btn btn-sm btn-light border text-danger rounded-circle p-1"
                        title="Delete Bank Entry"
                        style={{ width: '28px', height: '28px' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4 small">
                    No biobanks matched your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Explore Bank Details Modal */}
      {viewingBank && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header border-bottom px-4 py-3" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)' }}>
                <div className="d-flex align-items-center gap-2.5">
                  <div className="rounded-circle bg-primary text-white p-2 d-flex align-items-center justify-content-center shadow-xs" style={{ width: '38px', height: '38px' }}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h5 className="modal-title fw-bold text-dark fs-6 mb-0">{viewingBank.bank_name || viewingBank.name}</h5>
                    <span className="small text-muted">{extractState(viewingBank.location || viewingBank.country)} Hub</span>
                  </div>
                </div>
                <button type="button" className="btn-close" onClick={() => setViewingBank(null)} aria-label="Close"></button>
              </div>
              <div className="modal-body p-4">
                <div className="d-flex flex-column gap-3">
                  <div className="p-3 bg-light rounded-3 border">
                    <span className="small text-muted d-block mb-1 fw-semibold">Facility Location &amp; Laboratories</span>
                    <div className="text-dark fw-semibold small">{viewingBank.location || viewingBank.country || 'India'}</div>
                  </div>

                  <div className="row g-2">
                    <div className="col-6">
                      <div className="p-3 bg-light rounded-3 border h-100">
                        <span className="small text-muted d-block mb-1">Accreditation</span>
                        <span className="badge bg-success-subtle text-success border border-success-subtle">
                          <ShieldCheck size={13} className="me-1 d-inline" /> DCGI / CDSCO
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-3 bg-light rounded-3 border h-100">
                        <span className="small text-muted d-block mb-1">Storage Spec</span>
                        <strong className="text-dark small d-block">-196°C Liquid N₂ Vapor</strong>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-light rounded-3 border">
                    <span className="small text-muted d-block mb-1.5 fw-semibold">Preserved Cellular Therapies</span>
                    <div className="d-flex flex-wrap gap-1.5">
                      <span className="badge rounded-pill px-2.5 py-1 small fw-medium" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', border: '1px solid #cbd5e1' }}>Umbilical Cord Blood (HSCs)</span>
                      <span className="badge rounded-pill px-2.5 py-1 small fw-medium" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', border: '1px solid #cbd5e1' }}>Wharton’s Jelly (MSCs)</span>
                      <span className="badge rounded-pill px-2.5 py-1 small fw-medium" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', border: '1px solid #cbd5e1' }}>Bone Marrow Aspirate</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 p-2.5 rounded-3 small" style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0' }}>
                    <ShieldCheck size={18} className="flex-shrink-0" />
                    <span>Verified in government stem cell banking registry under CDSCO biological therapy standards.</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-light border-top px-4 py-2.5">
                <button type="button" className="btn btn-sm btn-secondary rounded-pill px-4" onClick={() => setViewingBank(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Bank Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <form onSubmit={handleAddBank}>
                <div className="modal-header bg-light px-4 py-3 border-bottom">
                  <h5 className="modal-title fw-bold text-dark fs-6 d-flex align-items-center gap-2">
                    <Building2 size={18} className="text-primary" />
                    <span>Add Stem Cell Biobank</span>
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Bank / Organization Name *</label>
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-3"
                      required
                      placeholder="e.g. LifeCell International Pvt. Ltd."
                      value={formData.bank_name}
                      onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Location / Storage Hub *</label>
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-3"
                      required
                      placeholder="e.g. Chennai, Tamil Nadu; Gurugram, Haryana"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer bg-light px-4 py-2.5 border-top">
                  <button type="button" className="btn btn-sm btn-secondary rounded-pill px-3" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-sm btn-primary rounded-pill px-4 shadow-xs">Save Biobank</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StemCellBankInfo;
