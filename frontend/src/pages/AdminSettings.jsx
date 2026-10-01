import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Settings,
  ShieldCheck,
  Lock,
  Bell,
  Database,
  Snowflake,
  Cpu,
  RefreshCw,
  CheckCircle2,
  Sliders,
  Key,
  Smartphone,
  Save,
  Activity,
  Layers,
  Sparkles,
  ArrowLeft,
  ToggleLeft,
  ToggleRight,
  ShieldAlert
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('clinical');
  const [toastMsg, setToastMsg] = useState(null);
  const [saving, setSaving] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    // Clinical & Biobank
    cdscoMode: true,
    strictHlaMatching: true,
    ln2Threshold: -180,
    dualDoctorSignoff: true,
    autoQuarantineLots: true,

    // Security & Auth
    enforce2FA: true,
    sessionTimeoutMins: 30,
    cryptographicSigning: true,
    doctorIpWhitelist: false,
    auditLogRetentionDays: 365,

    // Telemetry & Alerts
    telemetryPollingSeconds: 15,
    emailAlertsOnCritical: true,
    smsAlertsOnLN2Failure: true,
    pushNotifications: true,

    // Backup & Data
    automatedDailyBackup: true,
    cloudSyncEncrypted: true,
    backupTargetLocation: 'Koshika-Private-Cloud-Mumbai-DC2'
  });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast('✓ Platform configuration updated and broadcast across nodes.');
    }, 600);
  };

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
          1. CREATIVE COLORFUL HERO BANNER (Settings Command Ribbon)
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
                <ShieldCheck size={13} style={{ color: 'var(--k-primary)' }} />
                <span>GOVERNANCE &amp; ARCHITECTURE</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold" 
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                CDSCO Form 28D &amp; ISO 20387
              </span>
            </div>
            <h2 className="fw-extrabold mb-2 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              System Configuration &amp; Policies
            </h2>
            <p className="mb-0 text-white text-opacity-90" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Fine-tune clinical matching rules, LN2 cryogenic safeguards, security policies, and telemetry parameters.
            </p>
          </div>

          {/* 4 Colorful Mini Metric Chips with Generous Spacing */}
          <div className="d-flex align-items-center flex-wrap flex-shrink-0" style={{ gap: '12px' }}>
            {/* Metric 1 */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0d9488' }}
              >
                <Cpu size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.2rem' }}>v2026.4</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Build Version</div>
              </div>
            </div>

            {/* Metric 2 */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '135px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0284c7' }}
              >
                <Snowflake size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.15rem' }}>-196°C Auto</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>LN2 Cryo Safe</div>
              </div>
            </div>

            {/* Metric 3 */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#7c3aed' }}
              >
                <Lock size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.15rem' }}>SHA-256</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>Audit Security</div>
              </div>
            </div>

            {/* Metric 4 */}
            <div 
              className="rounded-3 shadow-sm d-flex align-items-center top-head-subcard"
              style={{ padding: '8px 14px', gap: '12px', minWidth: '130px', background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}
            >
              <div 
                className="text-white flex-shrink-0" 
                style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#059669' }}
              >
                <CheckCircle2 size={18} color="#ffffff" />
              </div>
              <div>
                <div className="fw-bold lh-1 text-dark" style={{ fontSize: '1.2rem' }}>100% Valid</div>
                <div className="fw-semibold text-secondary mt-1" style={{ fontSize: '0.76rem', whiteSpace: 'nowrap' }}>System Health</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          2. COLORFUL SEGMENT BUTTONS (Visual Category Tabs)
      ---------------------------------------------------------------------- */}
      <div className="card border-0 rounded-4 shadow-sm p-2 mb-4 bg-white">
        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3.5 py-2 fw-semibold d-inline-flex align-items-center gap-2 transition-all ${
                activeTab === 'clinical' ? 'text-white shadow-xs' : 'btn-light border text-secondary'
              }`}
              style={activeTab === 'clinical' ? { backgroundColor: '#0d9488', borderColor: '#0d9488', fontSize: '0.84rem' } : { fontSize: '0.84rem' }}
              onClick={() => setActiveTab('clinical')}
            >
              <Snowflake size={16} />
              <span>Biobank &amp; Clinical Policies</span>
            </button>

            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3.5 py-2 fw-semibold d-inline-flex align-items-center gap-2 transition-all ${
                activeTab === 'security' ? 'text-white shadow-xs' : 'btn-light border text-secondary'
              }`}
              style={activeTab === 'security' ? { backgroundColor: '#2563eb', borderColor: '#2563eb', fontSize: '0.84rem' } : { fontSize: '0.84rem' }}
              onClick={() => setActiveTab('security')}
            >
              <Lock size={16} />
              <span>Security &amp; MFA</span>
            </button>

            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3.5 py-2 fw-semibold d-inline-flex align-items-center gap-2 transition-all ${
                activeTab === 'alerts' ? 'text-white shadow-xs' : 'btn-light border text-secondary'
              }`}
              style={activeTab === 'alerts' ? { backgroundColor: '#7e22ce', borderColor: '#7e22ce', fontSize: '0.84rem' } : { fontSize: '0.84rem' }}
              onClick={() => setActiveTab('alerts')}
            >
              <Bell size={16} />
              <span>Telemetry &amp; Alerts</span>
            </button>

            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3.5 py-2 fw-semibold d-inline-flex align-items-center gap-2 transition-all ${
                activeTab === 'backup' ? 'text-white shadow-xs' : 'btn-light border text-secondary'
              }`}
              style={activeTab === 'backup' ? { backgroundColor: '#0891b2', borderColor: '#0891b2', fontSize: '0.84rem' } : { fontSize: '0.84rem' }}
              onClick={() => setActiveTab('backup')}
            >
              <Database size={16} />
              <span>Data Vault &amp; Backups</span>
            </button>
          </div>

          <button
            type="button"
            className="btn btn-sm rounded-pill px-4 py-2 text-white fw-bold d-inline-flex align-items-center gap-2 shadow-xs"
            style={{ backgroundColor: '#0d9488', fontSize: '0.84rem' }}
            onClick={handleSave}
            disabled={saving}
          >
            <Save size={16} />
            <span>{saving ? 'Saving Changes...' : 'Save Configuration'}</span>
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          3. VISUAL CONFIGURATION CARDS (Tab 1: Biobank & Clinical)
      ---------------------------------------------------------------------- */}
      {activeTab === 'clinical' && (
        <div className="row g-3">
          {/* Setting 1: CDSCO Regulatory Mode */}
          <div className="col-12 col-md-6">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-3 p-2.5 text-white" style={{ backgroundColor: '#0d9488' }}>
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0.5">CDSCO Form 28D Governance Mode</h6>
                    <div className="small text-muted" style={{ fontSize: '0.78rem' }}>Enforces central drug standard protocols on all cord blood units</div>
                  </div>
                </div>
                <div className="form-check form-switch fs-4">
                  <input
                    className="form-check-input cursor-pointer"
                    type="checkbox"
                    role="switch"
                    checked={settings.cdscoMode}
                    onChange={() => handleToggle('cdscoMode')}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 pt-2 border-top">
                <span className={`badge rounded-pill px-2.5 py-1 small ${settings.cdscoMode ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                  {settings.cdscoMode ? 'ACTIVE & ENFORCED' : 'OPTIONAL AUDIT'}
                </span>
                <span className="small text-muted" style={{ fontSize: '0.72rem' }}>All lots validate against DCGI 2026 registry</span>
              </div>
            </div>
          </div>

          {/* Setting 2: Strict High-Res HLA Matching */}
          <div className="col-12 col-md-6">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-3 p-2.5 text-white" style={{ backgroundColor: '#2563eb' }}>
                    <Sliders size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0.5">High-Res HLA Allele 10/10 Threshold</h6>
                    <div className="small text-muted" style={{ fontSize: '0.78rem' }}>Requires minimum 8/10 allele compatibility for donor matching</div>
                  </div>
                </div>
                <div className="form-check form-switch fs-4">
                  <input
                    className="form-check-input cursor-pointer"
                    type="checkbox"
                    role="switch"
                    checked={settings.strictHlaMatching}
                    onChange={() => handleToggle('strictHlaMatching')}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 pt-2 border-top">
                <span className="badge rounded-pill bg-primary-subtle text-primary px-2.5 py-1 small">
                  {settings.strictHlaMatching ? '10/10 & 9/10 STRICT' : 'PERMISSIVE 7/10'}
                </span>
                <span className="small text-muted" style={{ fontSize: '0.72rem' }}>HLA-A, B, C, DRB1, DQB1 high-throughput screening</span>
              </div>
            </div>
          </div>

          {/* Setting 3: LN2 Critical Alert Threshold */}
          <div className="col-12 col-md-6">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-3 p-2.5 text-white" style={{ backgroundColor: '#0891b2' }}>
                    <Snowflake size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0.5">LN2 Vault Temp Warning Limit</h6>
                    <div className="small text-muted" style={{ fontSize: '0.78rem' }}>Trigger automated solenoid lock if LN2 temperature rises above limit</div>
                  </div>
                </div>
                <span className="badge rounded-pill bg-info text-white px-3 py-1.5 fw-bold fs-6">
                  {settings.ln2Threshold}°C
                </span>
              </div>
              <div className="pt-2 border-top">
                <div className="d-flex justify-content-between small text-muted mb-1" style={{ fontSize: '0.72rem' }}>
                  <span>-196°C (Nominal)</span>
                  <span>Warning Threshold: {settings.ln2Threshold}°C</span>
                  <span>-150°C (Critical)</span>
                </div>
                <div className="progress rounded-pill" style={{ height: '6px' }}>
                  <div className="progress-bar bg-info" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Setting 4: Dual Doctor Sign-off */}
          <div className="col-12 col-md-6">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-3 p-2.5 text-white" style={{ backgroundColor: '#7e22ce' }}>
                    <Key size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0.5">Dual Clinician Verification for Release</h6>
                    <div className="small text-muted" style={{ fontSize: '0.78rem' }}>Requires two authorized BMT specialists to release cryopreserved unit</div>
                  </div>
                </div>
                <div className="form-check form-switch fs-4">
                  <input
                    className="form-check-input cursor-pointer"
                    type="checkbox"
                    role="switch"
                    checked={settings.dualDoctorSignoff}
                    onChange={() => handleToggle('dualDoctorSignoff')}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 pt-2 border-top">
                <span className="badge rounded-pill bg-purple text-white px-2.5 py-1 small" style={{ backgroundColor: '#7e22ce' }}>
                  2-KEY CLINICAL PROTOCOL
                </span>
                <span className="small text-muted" style={{ fontSize: '0.72rem' }}>Prevents single-operator biospecimen dispersion</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          3. VISUAL CONFIGURATION CARDS (Tab 2: Security & MFA)
      ---------------------------------------------------------------------- */}
      {activeTab === 'security' && (
        <div className="row g-3">
          {/* Setting: MFA Enforcement */}
          <div className="col-12 col-md-6">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-3 p-2.5 text-white" style={{ backgroundColor: '#2563eb' }}>
                    <Smartphone size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0.5">Enforce Multi-Factor Authentication (2FA)</h6>
                    <div className="small text-muted" style={{ fontSize: '0.78rem' }}>Mandatory OTP or Authenticator App on all doctor and admin logins</div>
                  </div>
                </div>
                <div className="form-check form-switch fs-4">
                  <input
                    className="form-check-input cursor-pointer"
                    type="checkbox"
                    role="switch"
                    checked={settings.enforce2FA}
                    onChange={() => handleToggle('enforce2FA')}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 pt-2 border-top">
                <span className="badge rounded-pill bg-success-subtle text-success px-2.5 py-1 small">
                  ENFORCED ON 100% ACCOUNTS
                </span>
                <span className="small text-muted" style={{ fontSize: '0.72rem' }}>TOTP RFC 6238 compliant</span>
              </div>
            </div>
          </div>

          {/* Setting: Cryptographic Signing */}
          <div className="col-12 col-md-6">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-3 p-2.5 text-white" style={{ backgroundColor: '#7e22ce' }}>
                    <Lock size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0.5">SHA-256 Ledger Signing for Clinical Logs</h6>
                    <div className="small text-muted" style={{ fontSize: '0.78rem' }}>Every diagnostic edit generates an immutable cryptographic signature</div>
                  </div>
                </div>
                <div className="form-check form-switch fs-4">
                  <input
                    className="form-check-input cursor-pointer"
                    type="checkbox"
                    role="switch"
                    checked={settings.cryptographicSigning}
                    onChange={() => handleToggle('cryptographicSigning')}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 pt-2 border-top">
                <span className="badge rounded-pill bg-purple text-white px-2.5 py-1 small" style={{ backgroundColor: '#7e22ce' }}>
                  TAMPER-PROOF LEDGER
                </span>
                <span className="small text-muted" style={{ fontSize: '0.72rem' }}>Meets HIPAA &amp; CDSCO digital proof standards</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          3. VISUAL CONFIGURATION CARDS (Tab 3: Telemetry & Alerts)
      ---------------------------------------------------------------------- */}
      {activeTab === 'alerts' && (
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-3 p-2.5 text-white" style={{ backgroundColor: '#e11d48' }}>
                    <Bell size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0.5">Critical Emergency SMS Broadcast</h6>
                    <div className="small text-muted" style={{ fontSize: '0.78rem' }}>Immediate priority SMS to chief lab director on cryo telemetry drop</div>
                  </div>
                </div>
                <div className="form-check form-switch fs-4">
                  <input
                    className="form-check-input cursor-pointer"
                    type="checkbox"
                    role="switch"
                    checked={settings.smsAlertsOnLN2Failure}
                    onChange={() => handleToggle('smsAlertsOnLN2Failure')}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 pt-2 border-top">
                <span className="badge rounded-pill bg-danger-subtle text-danger px-2.5 py-1 small">
                  URGENT BROADCAST ENABLED
                </span>
                <span className="small text-muted" style={{ fontSize: '0.72rem' }}>Latency &lt; 2.4 seconds</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-3 p-2.5 text-white" style={{ backgroundColor: '#0d9488' }}>
                    <Activity size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0.5">Live Sensor Telemetry Rate</h6>
                    <div className="small text-muted" style={{ fontSize: '0.78rem' }}>Vault sensor heartbeat polling interval across biobank network</div>
                  </div>
                </div>
                <span className="badge rounded-pill bg-teal text-white px-3 py-1.5 fw-bold fs-6" style={{ backgroundColor: '#0d9488' }}>
                  15 Seconds
                </span>
              </div>
              <div className="d-flex align-items-center gap-2 pt-2 border-top">
                <span className="badge rounded-pill bg-light text-secondary border px-2.5 py-1 small">
                  REAL-TIME SYNC
                </span>
                <span className="small text-muted" style={{ fontSize: '0.72rem' }}>18 connected hospitals sending telemetry</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          3. VISUAL CONFIGURATION CARDS (Tab 4: Data Vault & Backups)
      ---------------------------------------------------------------------- */}
      {activeTab === 'backup' && (
        <div className="row g-3">
          <div className="col-12">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-3 p-2.5 text-white" style={{ backgroundColor: '#0891b2' }}>
                    <Database size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0.5">Automated Encrypted Vault Backup</h6>
                    <div className="small text-muted">Daily snapshot of HLA matches, patient registries, and donor inventories</div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge rounded-pill bg-success-subtle text-success px-3 py-1.5 fw-semibold small">
                    LAST BACKUP: TODAY, 04:00 AM (SUCCESS)
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5"
                    onClick={() => showToast('Initiated manual encrypted snapshot. Target: DC2 Vault.')}
                  >
                    <RefreshCw size={13} />
                    <span>Run Snapshot Now</span>
                  </button>
                </div>
              </div>
              <div className="p-3 rounded-3 bg-light border small text-secondary d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div>
                  <span className="fw-bold text-dark">Target Vault: </span>
                  <span className="font-monospace text-primary">{settings.backupTargetLocation}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge rounded-pill bg-white border text-dark">AES-256-GCM</span>
                  <span className="badge rounded-pill bg-white border text-dark">Air-Gapped Replica</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
