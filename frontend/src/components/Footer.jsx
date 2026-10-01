import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { KoshikaLogoIcon } from './KoshikaLogo';
import { BookOpen, Stethoscope, ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <footer className="koshika-trust-footer mt-auto">
      {/* 4 Trust Badges */}
      <div className="koshika-trust-badges-grid">
        <div className="koshika-trust-badge">
          <div className="koshika-trust-badge-icon">
            <BookOpen size={20} />
          </div>
          <div className="koshika-trust-badge-text">
            {t.footerTrustBadge1 || 'Knowledge you can trust'}
          </div>
        </div>

        <div className="koshika-trust-badge">
          <div className="koshika-trust-badge-icon">
            <Stethoscope size={20} />
          </div>
          <div className="koshika-trust-badge-text">
            {t.footerTrustBadge2 || 'Tools for better conversations'}
          </div>
        </div>

        <div className="koshika-trust-badge">
          <div className="koshika-trust-badge-icon">
            <ShieldCheck size={20} />
          </div>
          <div className="koshika-trust-badge-text">
            {t.footerTrustBadge3 || 'Support through every step'}
          </div>
        </div>

        <div className="koshika-trust-badge">
          <div className="koshika-trust-badge-icon">
            <Heart size={20} />
          </div>
          <div className="koshika-trust-badge-text">
            {t.footerTrustBadge4 || 'A healthier tomorrow'}
          </div>
        </div>
      </div>

      <hr className="my-3 text-muted opacity-25" />

      {/* Brand & Motto */}
      <div className="container-fluid px-2">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <KoshikaLogoIcon size={32} />
            <div>
              <span className={`fw-bold fs-6 ${isDark ? 'text-white' : 'text-dark'}`}>KOSHIKA</span>
              <span className="ms-2 small text-secondary">{t.footerMotto || 'Knowledge. Support. Hope.'}</span>
            </div>
          </div>

          <div className="text-center text-md-end">
            <div
              className="fw-bold mb-0"
              style={{
                fontFamily: 'var(--k-font-display)',
                fontStyle: 'italic',
                letterSpacing: '0.02em',
                color: isDark ? '#2dd4bf' : '#0d9488'
              }}
            >
              {t.footerTagline || 'Informed Choices. Stronger Tomorrows.'}
            </div>
            <small className="text-secondary" style={{ fontSize: '0.74rem' }}>
              &copy; {new Date().getFullYear()} KOSHIKA • {t.footerDisclaimer || 'Decision support & stem cell education. Not a substitute for clinical advice.'}
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
