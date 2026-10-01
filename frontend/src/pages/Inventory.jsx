import React, { useState, useEffect } from 'react';
import api from '../api/client';
import {
  Package,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Info,
  Plus,
  Minus,
  Search,
  Trash2,
  Box,
  Layers,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  X
} from 'lucide-react';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ item_name: '', quantity: 100, unit: 'pcs' });

  // In-App Toast
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    fetchInventory();
  }, [search]);

  const fetchInventory = async () => {
    try {
      const res = await api.get('/inventory/', { params: { search } });
      setItems(res.data.results || res.data);
    } catch (err) {
      console.error('Error fetching inventory', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQty = async (item, delta) => {
    const newQty = Math.max(0, item.quantity + delta);
    try {
      await api.patch(`/inventory/${item.item_id}/`, { quantity: newQty });
      showToast(`Updated "${item.item_name}" stock to ${newQty} ${item.unit}`, 'success');
      fetchInventory();
    } catch (err) {
      showToast('Error updating stock: ' + err.message, 'danger');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/inventory/', formData);
      setShowModal(false);
      setFormData({ item_name: '', quantity: 100, unit: 'pcs' });
      showToast(`Added "${formData.item_name}" to lab inventory`, 'success');
      fetchInventory();
    } catch (err) {
      showToast('Error adding inventory: ' + err.message, 'danger');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete item #${id}?`)) return;
    try {
      await api.delete(`/inventory/${id}/`);
      showToast('Item deleted successfully.', 'info');
      fetchInventory();
    } catch (err) {
      showToast('Error deleting item: ' + err.message, 'danger');
    }
  };

  const lowStockCount = items.filter(i => i.quantity < 50).length;
  const optimalCount = items.length - lowStockCount;

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
                <Box size={13} />
                <span>LAB INVENTORY</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold" 
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                {items.length} Tracked Consumables
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold d-inline-flex align-items-center gap-1" 
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <ShieldCheck size={12} />
                <span>GMP/GLP Compliant</span>
              </span>
            </div>
            <h2 className="fw-extrabold mb-2 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Lab Inventory
            </h2>
            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Live cryogenic vials, LN2 canisters, sterile pipette tips, cell culture reagents, and safety gear.
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
            <span>Add Supply Item</span>
          </button>
        </div>
      </div>

      {/* Stock Telemetry KPI Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Total Catalog</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                <Package size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-dark mb-0.5">{items.length} SKUs</div>
            <div className="small text-muted">Active clinical materials</div>
          </div>
        </div>

        <div className="col-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Optimal Stock</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#dcfce7', color: '#16a34a' }}>
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-success mb-0.5">{optimalCount} Items</div>
            <div className="small text-muted">Ready for cell harvesting</div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-3.5 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small text-muted fw-semibold">Low Stock Warnings</span>
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#fef3c7', color: '#d97706' }}>
                <AlertTriangle size={16} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-warning-emphasis mb-0.5">{lowStockCount} Items</div>
            <div className="small text-muted">Under 50 units threshold</div>
          </div>
        </div>
      </div>

      {/* Search Filter */}
      <div className="card border-0 shadow-sm p-3 mb-4 rounded-4 bg-white" style={{ border: '1px solid #e2e8f0' }}>
        <div className="input-group border rounded-3 p-1 bg-light">
          <span className="input-group-text bg-transparent border-0 text-muted ps-3">
            <Search size={16} />
          </span>
          <input
            type="text"
            className="form-control border-0 bg-transparent shadow-none ps-2"
            placeholder="Search laboratory supplies by name (e.g. Cryo vials, Filter tips, DMSO)..."
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

      {/* Inventory Table Card */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white" style={{ border: '1px solid #e2e8f0' }}>
        <div className="table-responsive">
          <table className="table koshika-table align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th style={{ width: '80px' }} className="ps-4">SKU</th>
                <th>Supply Name</th>
                <th>In Stock Qty</th>
                <th>Unit Type</th>
                <th>Inventory Status</th>
                <th>Last Stock Audit</th>
                <th className="text-center">Quick Adjust</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    <div className="spinner-border spinner-border-sm text-warning me-2"></div>
                    <span className="text-muted">Loading laboratory supplies inventory...</span>
                  </td>
                </tr>
              ) : items.length > 0 ? (
                items.map(item => {
                  const isLow = item.quantity < 50;
                  return (
                    <tr key={item.item_id}>
                      <td className="ps-4"><span className="font-monospace text-muted">#{item.item_id}</span></td>
                      <td>
                        <div className="fw-bold text-dark">{item.item_name}</div>
                      </td>
                      <td>
                        <span className="fs-6 fw-bold font-monospace text-dark">{item.quantity}</span>
                      </td>
                      <td>
                        <span className="badge bg-light text-muted border rounded-pill">{item.unit}</span>
                      </td>
                      <td>
                        {isLow ? (
                          <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill d-inline-flex align-items-center gap-1">
                            <AlertTriangle size={11} />
                            <span>Restock Needed</span>
                          </span>
                        ) : (
                          <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill d-inline-flex align-items-center gap-1">
                            <CheckCircle2 size={11} />
                            <span>Adequate Stock</span>
                          </span>
                        )}
                      </td>
                      <td>
                        <small className="text-muted font-monospace">{item.last_updated ? new Date(item.last_updated).toLocaleDateString() : 'Today'}</small>
                      </td>
                      <td className="text-center">
                        <div className="btn-group btn-group-sm rounded-pill shadow-2xs border">
                          <button onClick={() => handleUpdateQty(item, -10)} className="btn btn-light border-0 py-1 px-2.5 text-secondary fw-semibold">-10</button>
                          <button onClick={() => handleUpdateQty(item, -1)} className="btn btn-light border-0 py-1 px-2 text-secondary fw-semibold">-1</button>
                          <button onClick={() => handleUpdateQty(item, 1)} className="btn btn-light border-0 py-1 px-2 text-secondary fw-semibold">+1</button>
                          <button onClick={() => handleUpdateQty(item, 10)} className="btn btn-light border-0 py-1 px-2.5 text-secondary fw-semibold">+10</button>
                        </div>
                      </td>
                      <td className="text-end pe-4">
                        <button
                          onClick={() => handleDelete(item.item_id)}
                          className="btn btn-sm btn-light border text-danger rounded-3 p-1.5 hover-bg-light"
                          title="Delete Item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-5">
                    <Package size={36} className="text-secondary opacity-50 mb-2 mx-auto d-block" />
                    <div className="fw-semibold text-dark">No supplies match your search</div>
                    <small className="text-muted">Try clearing the search query or add a new supply item.</small>
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
                    <Box size={18} className="text-warning-emphasis" />
                    <span>Add New Supply Item</span>
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body px-4 py-3">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Supply / Item Name *</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      required
                      placeholder="e.g. 1.8mL Cryovials (Internal Thread)"
                      value={formData.item_name}
                      onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
                    />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Initial Quantity *</label>
                      <input
                        type="number"
                        className="form-control rounded-3"
                        required
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Unit of Measure</label>
                      <select
                        className="form-select rounded-3"
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      >
                        <option value="pcs">Pieces (pcs)</option>
                        <option value="boxes">Boxes</option>
                        <option value="vials">Vials</option>
                        <option value="bottles">Bottles</option>
                        <option value="litres">Litres (L)</option>
                        <option value="mL">Millilitres (mL)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-top bg-light px-4 py-3 d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-light border rounded-pill px-3" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-warning text-dark rounded-pill px-4 fw-semibold">
                    Add Item
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

export default Inventory;
