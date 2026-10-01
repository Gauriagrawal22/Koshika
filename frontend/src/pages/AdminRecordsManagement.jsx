import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { INVENTORY_DATA } from '../data/mockData';
import {
  Database,
  Search,
  Filter,
  Snowflake,
  ShieldCheck,
  AlertCircle,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Box,
  Layers,
  Thermometer,
  RefreshCw,
  Sparkles,
  X
} from 'lucide-react';

const AdminRecordsManagement = () => {
  const [items, setItems] = useState(INVENTORY_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const categories = [
    { key: 'ALL', label: 'All Items' },
    { key: 'Biospecimen', label: 'Biospecimens' },
    { key: 'Lab Reagent', label: 'Lab Reagents' },
    { key: 'Cryoprotectant', label: 'Cryoprotectants' },
    { key: 'Consumable', label: 'Consumables' },
    { key: 'Cell Culture', label: 'Cell Culture' }
  ];

  const filteredItems = items.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || item.name.toLowerCase().includes(q) || item.batchLot.toLowerCase().includes(q) || item.location.toLowerCase().includes(q);
    if (!matchSearch) return false;
    if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;
    return true;
  });

  const handleRestock = (id, name) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 20, status: 'Optimal' } : i));
    showToast(`Replenished +20 units for "${name}". Audit log updated.`);
  };

  const lowStockCount = items.filter(i => i.status !== 'Optimal').length;

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
          1. CREATIVE COLORFUL HERO BANNER (Cryo Inventory Command Ribbon)
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
                <Snowflake size={13} style={{ color: 'var(--k-primary)' }} />
                <span>COLD-CHAIN BIOBANK REGISTRY</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold" 
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                ISO 20387 Certified
              </span>
            </div>
            <h2 className="fw-extrabold mb-2 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Cryo Records &amp; Bio-Inventory
            </h2>
            <p className="mb-0 text-white text-opacity-90" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Real-time monitoring of cryopreserved stem cell lots, HLA typing reagents, LN2 vaults (-196°C), and stock replenishment.
            </p>
          </div>

          {/* 4 Colorful Mini Metric Chips with Generous Spacing */}
          <div className="d-flex align-items-center flex-wrap flex-shrink-0" style={{ gap: '12px' }}>
            {/* Metric 1: Total Lots */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0284c7' }}
              >
                <Database size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>{items.length}</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Tracked Lots</div>
              </div>
            </div>

            {/* Metric 2: LN2 Storage */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '135px', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0891b2' }}
              >
                <Snowflake size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>-196°C</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>8 Vaults Active</div>
              </div>
            </div>

            {/* Metric 3: Optimal Ratio */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#059669' }}
              >
                <ShieldCheck size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>96%</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Optimal Stock</div>
              </div>
            </div>

            {/* Metric 4: Low Stock Attention */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d97706' }}
              >
                <AlertCircle size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.25rem' }}>{lowStockCount}</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Reorder Alerts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          2. VISUAL CATEGORY FILTER & SEARCH COMMAND TOOLBAR
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
              placeholder="Search records by lot, item name, or vault..."
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

          <Link
            to="/storage"
            className="btn btn-sm rounded-pill px-3.5 py-1.5 text-white fw-bold d-inline-flex align-items-center gap-1.5 shadow-xs"
            style={{ backgroundColor: '#0284c7', borderColor: '#0284c7', fontSize: '0.82rem' }}
          >
            <Snowflake size={14} />
            <span>Open LN2 Vault Monitor</span>
          </Link>
        </div>

        {/* Category Pills */}
        <div className="d-flex align-items-center gap-1.5 mt-2.5 pt-2.5 border-top flex-wrap">
          <span className="small text-muted me-1" style={{ fontSize: '0.72rem' }}>Category:</span>
          {categories.map((cat) => {
            const isSelected = categoryFilter === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                className={`btn btn-xs rounded-pill px-2.5 py-0.5 border ${
                  isSelected ? 'bg-info text-white border-info' : 'bg-white text-secondary'
                }`}
                style={isSelected ? {
                  backgroundColor: '#0284c7',
                  borderColor: '#0284c7',
                  fontSize: '0.74rem',
                  fontWeight: 600
                } : { fontSize: '0.74rem' }}
                onClick={() => setCategoryFilter(cat.key)}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          3. CREATIVE RECORDS TABLE (Desktop & Tablet)
      ---------------------------------------------------------------------- */}
      <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ minWidth: '880px', width: '100%' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th className="py-3 px-3.5 small text-uppercase fw-bold text-secondary" style={{ width: '28%', minWidth: '220px', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  Item &amp; Lot ID
                </th>
                <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '16%', minWidth: '130px', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  Category
                </th>
                <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '16%', minWidth: '130px', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  Storage Vault
                </th>
                <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '12%', minWidth: '100px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  Temperature
                </th>
                <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '12%', minWidth: '110px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  Inventory Level
                </th>
                <th className="py-3 px-3 small text-uppercase fw-bold text-secondary" style={{ width: '8%', minWidth: '85px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  Status
                </th>
                <th className="py-3 px-3.5 text-end small text-uppercase fw-bold text-secondary" style={{ width: '8%', minWidth: '120px', whiteSpace: 'nowrap', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  {/* 1. Item Name */}
                  <td className="py-3 px-3.5" style={{ minWidth: '220px' }}>
                    <div className="d-flex align-items-center gap-2.5">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center text-teal flex-shrink-0 shadow-xs"
                        style={{ width: '36px', height: '36px', backgroundColor: '#e0f2fe', color: '#0369a1' }}
                      >
                        <Box size={16} />
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div className="fw-bold text-dark small mb-0.5 text-truncate" style={{ maxWidth: '240px' }}>{item.name}</div>
                        <div className="font-monospace text-muted small" style={{ fontSize: '0.68rem' }}>
                          Lot: {item.batchLot}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 2. Category */}
                  <td className="py-3 px-3" style={{ minWidth: '130px' }}>
                    <span 
                      className="badge rounded-pill small px-2.5 py-1 fw-semibold"
                      style={{ backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #e2e8f0', fontSize: '0.72rem' }}
                    >
                      {item.category}
                    </span>
                  </td>

                  {/* 3. Storage Location */}
                  <td className="py-3 px-3" style={{ minWidth: '130px' }}>
                    <div className="small text-secondary text-truncate d-flex align-items-center gap-1" style={{ maxWidth: '170px' }}>
                      <Layers size={13} className="text-muted flex-shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </td>

                  {/* 4. Temperature Gauge */}
                  <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                    <span 
                      className="badge rounded-pill px-2.5 py-1 small fw-bold d-inline-flex align-items-center gap-1 shadow-xs"
                      style={
                        item.temperature.includes('-196') 
                          ? { backgroundColor: '#ecfeff', color: '#0891b2', border: '1px solid #a5f3fc' }
                          : item.temperature.includes('-80')
                          ? { backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }
                          : { backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }
                      }
                    >
                      <Thermometer size={12} />
                      <span>{item.temperature}</span>
                    </span>
                  </td>

                  {/* 5. Quantity */}
                  <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                    <div className="fw-bold text-dark small mb-1">{item.quantity} {item.unit}</div>
                    <div className="progress" style={{ height: '4px', maxWidth: '90px' }}>
                      <div 
                        className="progress-bar rounded-pill" 
                        style={{ 
                          width: `${Math.min(100, item.quantity * 2)}%`, 
                          backgroundColor: item.status === 'Optimal' ? '#0d9488' : '#f59e0b' 
                        }} 
                      />
                    </div>
                  </td>

                  {/* 6. Status */}
                  <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                    <span
                      className={`badge rounded-pill px-2.5 py-1 fw-bold small ${
                        item.status === 'Optimal'
                          ? 'bg-success-subtle text-success border border-success-subtle'
                          : 'bg-warning-subtle text-warning border border-warning-subtle'
                      }`}
                      style={{ fontSize: '0.72rem' }}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </td>

                  {/* 7. Action */}
                  <td className="py-3 px-3.5 text-end" style={{ whiteSpace: 'nowrap' }}>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 small fw-semibold text-nowrap d-inline-flex align-items-center gap-1 shadow-xs"
                      style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}
                      onClick={() => handleRestock(item.id, item.name)}
                    >
                      <RefreshCw size={12} />
                      <span>Restock</span>
                    </button>
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

export default AdminRecordsManagement;
