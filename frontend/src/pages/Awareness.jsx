import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StemCellAwarenessSection from '../components/StemCellAwarenessSection';
import StemCellBankInfo from '../components/StemCellBankInfo';
import {
  HeartPulse,
  Sparkles,
  BookOpen,
  Building2,
  ShieldCheck,
  Activity,
  ArrowLeft,
  Dna,
  Snowflake
} from 'lucide-react';

const Awareness = () => {
  const [activeTab, setActiveTab] = useState('awareness');

  return (
    <div className="koshika-animate-fadein pb-5">
      {/* Top Header Card */}
      <div 
        className="card border-0 rounded-4 p-4 p-md-5 mb-4 text-white position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          boxShadow: '0 10px 30px -5px rgba(6, 78, 59, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#ffffff'
        }}
      >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-4 position-relative" style={{ zIndex: 2 }}>
          <div style={{ maxWidth: '780px' }}>
            <div className="d-flex align-items-center gap-2 mb-2.5 flex-wrap">
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-bold d-inline-flex align-items-center gap-1.5"
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <HeartPulse size={13} />
                <span>CLINICAL KNOWLEDGE BASE</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold d-inline-flex align-items-center gap-1.5"
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <Dna size={13} />
                <span>Cell Biology &amp; Regenerative Medicine</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold d-inline-flex align-items-center gap-1.5"
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <ShieldCheck size={13} />
                <span>ICMR &amp; CDSCO Certified</span>
              </span>
            </div>

            <h2 className="fw-extrabold text-white mb-2" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Stem Cell Awareness &amp; Biobank Center
            </h2>
            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Evidence-based clinical education on hematopoietic &amp; mesenchymal stem cell biology, donor safety, therapeutic indications, and -196°C cryogenic biobanking standards.
            </p>
          </div>

          <div className="d-flex gap-2 align-items-center flex-wrap flex-shrink-0">
            <Link
              to="/learn-and-play"
              className="btn btn-sm rounded-pill px-4 py-2.5 d-inline-flex align-items-center gap-2 fw-bold shadow-sm hover-translate-y koshika-hero-action-btn"
              style={{
                backgroundColor: '#ffffff',
                color: '#064e3b',
                border: 'none',
                fontSize: '0.88rem'
              }}
            >
              <Sparkles size={15} color="currentColor" />
              <span>Interactive Quests</span>
            </Link>
          </div>
        </div>

        {/* Tab Switcher Pills */}
        <div className="d-flex gap-2.5 mt-4 pt-3 border-top flex-wrap" style={{ borderColor: 'rgba(255, 255, 255, 0.2) !important' }}>
          <button
            type="button"
            className="btn btn-sm rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 transition-all"
            style={
              activeTab === 'awareness'
                ? { backgroundColor: 'var(--k-surface)', color: 'var(--k-primary)', border: '1px solid var(--k-border)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }
                : { backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }
            }
            onClick={() => setActiveTab('awareness')}
          >
            <BookOpen size={15} />
            <span>Cell Biology &amp; Therapies</span>
            <span 
              className="badge rounded-pill px-2 py-0.5" 
              style={{ 
                fontSize: '0.72rem', 
                backgroundColor: activeTab === 'awareness' ? 'var(--k-primary)' : 'rgba(255, 255, 255, 0.25)', 
                color: '#ffffff' 
              }}
            >
              Guide
            </span>
          </button>

          <button
            type="button"
            className="btn btn-sm rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 transition-all"
            style={
              activeTab === 'bank'
                ? { backgroundColor: 'var(--k-surface)', color: 'var(--k-primary)', border: '1px solid var(--k-border)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }
                : { backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }
            }
            onClick={() => setActiveTab('bank')}
          >
            <Snowflake size={15} />
            <span>Stem Cell Bank &amp; Cryo Preservation</span>
            <span 
              className="badge rounded-pill px-2 py-0.5" 
              style={{ 
                fontSize: '0.72rem', 
                backgroundColor: activeTab === 'bank' ? 'var(--k-primary)' : 'rgba(255, 255, 255, 0.25)', 
                color: '#ffffff' 
              }}
            >
              Biobank
            </span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'awareness' && <StemCellAwarenessSection />}
      {activeTab === 'bank' && <StemCellBankInfo showHero={false} />}
    </div>
  );
};

export default Awareness;
