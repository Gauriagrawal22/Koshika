import React from 'react';
import StemCellBankInfo from '../components/StemCellBankInfo';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Snowflake, Building2, ShieldCheck, Clock } from 'lucide-react';

const BankHub = () => {
  const { t } = useLanguage();
  return (
    <div className="koshika-animate-fadein pb-5">
      {/* Unified Master Hero Card — Exactly 1 Card, Clean & Uncongested */}
      <div 
        className="card border-0 rounded-4 p-4 p-md-5 mb-4 text-white position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #06392c 0%, #094b40 35%, #0d766e 70%, #0369a1 100%)',
          boxShadow: '0 12px 35px -5px rgba(6, 78, 59, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#ffffff'
        }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div 
          className="position-absolute rounded-circle"
          style={{
            top: '-50px',
            right: '-50px',
            width: '320px',
            height: '320px',
            background: 'radial-gradient(circle, rgba(94, 234, 212, 0.18) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="row align-items-center g-4 position-relative" style={{ zIndex: 2 }}>
          {/* Left Column: Navigation, Badges, Title, Patient-Friendly Explanation */}
          <div className="col-12 col-xl-7 col-lg-7">
            <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
              <Link
                to="/"
                className="btn btn-sm rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 hover-translate-y shadow-xs"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  color: '#ffffff',
                  fontSize: '0.84rem',
                  fontWeight: 600
                }}
                title="Back to Home"
              >
                <ArrowLeft size={15} color="#ffffff" />
                <span className="text-white">Back to Home</span>
              </Link>

              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-bold d-inline-flex align-items-center gap-1.5"
                style={{
                  background: 'rgba(94, 234, 212, 0.2)',
                  color: '#ccfbf1',
                  border: '1px solid rgba(94, 234, 212, 0.38)'
                }}
              >
                <Snowflake size={13} />
                <span>Cryobiology &amp; Biobanks</span>
              </span>

              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-semibold d-inline-flex align-items-center gap-1.5"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.28)'
                }}
              >
                <ShieldCheck size={13} />
                <span>FACT-JACIE &amp; CDSCO Certified</span>
              </span>
            </div>

            <h1 className="fw-extrabold text-white mb-2.5" style={{ letterSpacing: '-0.02em', fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', lineHeight: 1.25 }}>
              Stem Cell Biobanks: Preserving the Blueprint of Life
            </h1>
            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.98rem', lineHeight: '1.65', maxWidth: '640px' }}>
              High-security cryogenic vaults preserve pristine human hematopoietic and mesenchymal stem cells in liquid nitrogen vapor at <strong style={{ color: '#67e8f9' }}>-196°C</strong>. Cellular aging stops completely, securing life-saving treatments for decades.
            </p>
          </div>

          {/* Right Column: 3 Clean, Spacious Telemetry Chips */}
          <div className="col-12 col-xl-5 col-lg-5">
            <div className="row g-2.5">
              <div className="col-12 col-sm-4 col-lg-12">
                <div 
                  className="p-3 rounded-3 d-flex align-items-center gap-3"
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div 
                    className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '42px', height: '42px', background: 'rgba(103, 232, 249, 0.2)', color: '#67e8f9' }}
                  >
                    <Snowflake size={22} />
                  </div>
                  <div>
                    <div className="fs-5 fw-bold text-white lh-1 mb-1">-196°C</div>
                    <small className="text-white-50 d-block" style={{ fontSize: '0.78rem' }}>Liquid N₂ Vapor Temp</small>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-4 col-lg-12">
                <div 
                  className="p-3 rounded-3 d-flex align-items-center gap-3"
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div 
                    className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '42px', height: '42px', background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80' }}
                  >
                    <Clock size={22} />
                  </div>
                  <div>
                    <div className="fs-5 fw-bold text-white lh-1 mb-1">25+ Yrs</div>
                    <small className="text-white-50 d-block" style={{ fontSize: '0.78rem' }}>Proven Viability Window</small>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-4 col-lg-12">
                <div 
                  className="p-3 rounded-3 d-flex align-items-center gap-3"
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div 
                    className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '42px', height: '42px', background: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' }}
                  >
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <div className="fs-5 fw-bold text-white lh-1 mb-1">100%</div>
                    <small className="text-white-50 d-block" style={{ fontSize: '0.78rem' }}>Zero Cellular Degradation</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Stem Cell Bank Component (Inner duplicate hero suppressed) */}
      <StemCellBankInfo showHero={false} />
    </div>
  );
};

export default BankHub;
