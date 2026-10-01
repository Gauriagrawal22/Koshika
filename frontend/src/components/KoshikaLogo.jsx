import React from 'react';
import { Link } from 'react-router-dom';

export const KoshikaLogoIcon = ({ size = 38 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="koshika-logo-svg"
      aria-label="KOSHIKA Logo"
    >
      {/* Central Sprout Leaf */}
      <path
        d="M50 78C50 78 50 56 64 42C74 32 82 32 82 32C82 32 82 40 72 50C58 64 50 78 50 78Z"
        fill="#0d9488"
      />
      <path
        d="M50 78C50 78 50 52 36 38C26 28 18 28 18 28C18 28 18 36 28 46C42 60 50 78 50 78Z"
        fill="#14b8a6"
      />
      <path
        d="M50 82V48"
        stroke="#0f766e"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Surrounding Cellular Nodes (Blue, Cyan, Teal) */}
      <circle cx="50" cy="18" r="9" fill="#0284c7" />
      <circle cx="78" cy="30" r="7.5" fill="#06b6d4" />
      <circle cx="86" cy="56" r="6.5" fill="#0d9488" />
      <circle cx="74" cy="80" r="6" fill="#0284c7" />
      <circle cx="26" cy="80" r="6" fill="#06b6d4" />
      <circle cx="14" cy="56" r="6.5" fill="#0d9488" />
      <circle cx="22" cy="30" r="7.5" fill="#0284c7" />

      {/* Floating Micro-Particles */}
      <circle cx="36" cy="18" r="3.5" fill="#38bdf8" />
      <circle cx="64" cy="18" r="3.5" fill="#2dd4bf" />
      <circle cx="88" cy="42" r="3" fill="#38bdf8" />
      <circle cx="12" cy="42" r="3" fill="#2dd4bf" />
    </svg>
  );
};

const KoshikaLogo = ({ showSubtitle = true, linkTo = '/', size = 38 }) => {
  return (
    <Link to={linkTo} className="koshika-brand">
      <div className="koshika-brand-logo-img">
        <KoshikaLogoIcon size={size} />
      </div>
      <div className="koshika-brand-titles">
        <div className="koshika-brand-name">KOSHIKA</div>
        {showSubtitle && (
          <div className="koshika-brand-sub">Knowledge. Support. Hope.</div>
        )}
      </div>
    </Link>
  );
};

export default KoshikaLogo;
