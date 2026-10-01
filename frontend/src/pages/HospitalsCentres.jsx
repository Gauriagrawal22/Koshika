import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Search,
  Building,
  CheckCircle2,
  Navigation,
  Phone,
  Globe,
  ExternalLink,
  ShieldCheck,
  Award,
  Filter,
  Map as MapIcon,
  X,
  Stethoscope
} from 'lucide-react';
import AnimatedTextBox from '../components/common/AnimatedTextBox';
import HospitalInteractiveMap from '../components/HospitalInteractiveMap';

export const ACCREDITED_CENTRES = [
  {
    id: 1,
    name: 'AIIMS Delhi — Stem Cell Research Centre',
    city: 'New Delhi, Delhi NCR',
    lat: 28.5672,
    lng: 77.2100,
    distance: '12 km',
    type: 'Apex Government / Autonomous Tertiary Hospital',
    accreditation: 'FACT-JACIE Accredited, ICMR Approved, NABH Digital',
    bmtBeds: '32 HEPA-Filtered Positive Pressure BMT Suites',
    services: 'Allogeneic MUD Transplants, Cord Blood Banking, Thalassemia BMT',
    contact: '+91 11 2658 8500',
    website: 'https://aiims.edu',
    rating: 4.9,
    reviews: 320,
    tag: 'Govt. Apex Institute',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Tata Memorial Hospital & ACTREC Cell Therapy',
    city: 'Mumbai, Maharashtra',
    lat: 19.0178,
    lng: 72.8428,
    distance: '28 km',
    type: 'Comprehensive Cancer Care & Cellular Therapy Centre',
    accreditation: 'FACT Accredited, ISO 9001, WMDA Qualified',
    bmtBeds: '34 Cryo-Protected Isolation Units',
    services: 'Pediatric & Adult Leukemia BMT, CAR-T Cell Clinical Trials',
    contact: '+91 22 2740 5000',
    website: 'https://tmc.gov.in',
    rating: 5.0,
    reviews: 412,
    tag: 'Apex Oncology Centre',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'KEM Hospital & Research Centre',
    city: 'Pune, Maharashtra',
    lat: 18.5204,
    lng: 73.8567,
    distance: '35 km',
    type: 'Academic Teaching Hospital & Tertiary BMT Unit',
    accreditation: 'NABH Certified, CDSCO Authorized, ISO 15189',
    bmtBeds: '18 Positive Pressure Clean Rooms',
    services: 'Autologous Rescue, Sibling Allografts, Apheresis Collection',
    contact: '+91 20 6603 7300',
    website: 'https://kemhospitalpune.org',
    rating: 4.8,
    reviews: 190,
    tag: 'Teaching Hospital',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    name: 'Narayana Health & Mazumdar Shaw Cancer Centre',
    city: 'Bengaluru, Karnataka',
    lat: 12.8392,
    lng: 77.6834,
    distance: '8 km',
    type: 'Quaternary Super-Specialty Healthcare City',
    accreditation: 'FACT-JACIE Accredited, JCI, NABH',
    bmtBeds: '26 HEPA-Filtered Specialized Suites',
    services: 'Haploidentical BMT, High-Resolution HLA Matching, CAR-T',
    contact: '+91 80 7122 2222',
    website: 'https://narayanahealth.org',
    rating: 4.9,
    reviews: 285,
    tag: 'FACT-JACIE Centre',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    name: 'Christian Medical College (CMC) BMT Centre',
    city: 'Vellore, Tamil Nadu',
    lat: 12.9246,
    lng: 79.1348,
    distance: '42 km',
    type: 'Charitable Quaternary Research Foundation',
    accreditation: 'NABH, CDSCO, WMDA Participating Member',
    bmtBeds: '24 Dedicated Bone Marrow Transplant Units',
    services: 'Aplastic Anemia Allografts, Cord Blood, Microchimerism Tracking',
    contact: '+91 416 228 1000',
    website: 'https://cmch-vellore.edu',
    rating: 5.0,
    reviews: 520,
    tag: 'Historic BMT Pioneer',
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    name: 'Apollo Speciality Cancer & Stem Cell Centre',
    city: 'Chennai, Tamil Nadu',
    lat: 13.0604,
    lng: 80.2496,
    distance: '18 km',
    type: 'Private Multi-Specialty Quaternary Centre',
    accreditation: 'JCI Accredited, AABB Certified, NABH',
    bmtBeds: '20 Clean Room Positive-Pressure Rooms',
    services: 'Unrelated Donor Stem Cell Matching, Gene Therapy Protocols',
    contact: '+91 44 2829 0200',
    website: 'https://apollohospitals.com',
    rating: 4.8,
    reviews: 210,
    tag: 'JCI Accredited',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300&auto=format&fit=crop&q=80'
  }
];

const HospitalsCentres = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedCentreForModal, setSelectedCentreForModal] = useState(null);

  const cities = ['All', 'Delhi NCR', 'Mumbai', 'Pune', 'Bengaluru', 'Vellore', 'Chennai'];

  const filteredCentres = ACCREDITED_CENTRES.filter(c => {
    const s = search.toLowerCase().trim();
    const matchesText = !s || 
      c.name.toLowerCase().includes(s) ||
      c.city.toLowerCase().includes(s) ||
      c.services.toLowerCase().includes(s);
    
    const matchesCity = selectedCity === 'All' || c.city.toLowerCase().includes(selectedCity.toLowerCase());
    return matchesText && matchesCity;
  });

  return (
    <div className="hospitals-view koshika-animate-fadein pb-5">
      
      {/* Vibrant Creative Healthcare Hero Header Banner */}
      <div 
        className="card border-0 rounded-4 mb-4 position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          boxShadow: '0 10px 30px -5px rgba(6, 78, 59, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#ffffff',
          padding: '2rem 2.25rem',
          minHeight: '190px'
        }}
      >
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-4 position-relative z-1">
          <div style={{ maxWidth: '680px' }}>
            <div className="d-inline-flex align-items-center gap-2 mb-2.5">
              <span 
                className="badge rounded-pill px-3 py-1 fw-bold text-uppercase d-inline-flex align-items-center gap-1.5"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.35)', color: '#ffffff', fontSize: '0.72rem', letterSpacing: '0.04em' }}
              >
                <MapPin size={12} className="text-warning" />
                FIND TRUSTED CARE
              </span>
              <span 
                className="badge rounded-pill px-2.5 py-1 small fw-semibold"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#e0f2fe', fontSize: '0.72rem' }}
              >
                FACT-JACIE &amp; ICMR Approved
              </span>
            </div>

            <h2 className="fw-bold mb-2 text-white" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)', letterSpacing: '-0.02em' }}>
              {t.findCareTitle || 'Accredited Stem Cell Transplant Centres'}
            </h2>
            <p className="text-white mb-3" style={{ fontSize: '0.92rem', lineHeight: 1.55, opacity: 0.95 }}>
              {t.findCareSub || 'Discover verified tertiary transplant institutions with HEPA-filtered cleanrooms, CDSCO authorization, and pediatric & adult BMT expertise across India.'}
            </p>

            {/* Quick Stat Chips */}
            <div className="d-flex flex-wrap gap-2.5">
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-bold d-inline-flex align-items-center gap-1.5 shadow-xs top-head-badge-white"
                style={{ backgroundColor: 'var(--k-surface)', color: 'var(--k-primary)', border: '1px solid var(--k-border)', fontSize: '0.78rem' }}
              >
                <Building size={13} className="text-emerald" style={{ color: '#059669' }} />
                <span>6 Apex BMT Institutes</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-bold d-inline-flex align-items-center gap-1.5 shadow-xs top-head-badge-white"
                style={{ backgroundColor: 'var(--k-surface)', color: 'var(--k-primary)', border: '1px solid var(--k-border)', fontSize: '0.78rem' }}
              >
                <Award size={13} className="text-primary" style={{ color: '#0284c7' }} />
                <span>168+ Cleanroom Suites</span>
              </span>
              <span 
                className="badge rounded-pill px-3 py-1.5 small fw-bold d-inline-flex align-items-center gap-1.5 shadow-xs top-head-badge-white"
                style={{ backgroundColor: 'var(--k-surface)', color: 'var(--k-primary)', border: '1px solid var(--k-border)', fontSize: '0.78rem' }}
              >
                <ShieldCheck size={13} className="text-success" style={{ color: '#10b981' }} />
                <span>100% Verified Quality</span>
              </span>
            </div>
          </div>

          <div className="d-flex flex-sm-row flex-column gap-2.5 flex-shrink-0">
            <Link 
              to="/find-care/doctors" 
              className="btn btn-sm rounded-pill px-4 py-2.5 fw-semibold d-inline-flex align-items-center justify-content-center gap-2 shadow-xs transition-all koshika-hero-action-btn"
              style={{ backgroundColor: '#ffffff', color: '#0f766e', border: 'none' }}
            >
              <Stethoscope size={16} />
              <span>{t.findSpecialists || 'Find Specialists'}</span>
            </Link>
            <button
              type="button"
              className="btn btn-sm rounded-pill px-4 py-2.5 fw-semibold d-inline-flex align-items-center justify-content-center gap-2 shadow-xs text-white transition-all"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', border: '1px solid rgba(255, 255, 255, 0.35)' }}
              onClick={() => setShowMapModal(true)}
            >
              <MapIcon size={16} />
              <span>{t.viewOnMap || 'View Interactive Map'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar matching Screen 5 from Mockup */}
      <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white" style={{ border: '1px solid #e2e8f0' }}>
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-8">
            <AnimatedTextBox
              label="Search City, Hospital, or Treatment"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter your city or area (e.g. Delhi, Mumbai, Bengaluru...)"
              type="text"
              icon={MapPin}
            />
          </div>
          <div className="col-12 col-md-4 d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn w-100 rounded-pill py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-xs text-white"
              style={{ background: 'linear-gradient(135deg, #0d9488 0%, #065f46 100%)', border: 'none' }}
              onClick={() => {}}
            >
              <Search size={16} />
              <span>{t.searchCentres || 'Search Centres'}</span>
            </button>
            {search && (
              <button
                type="button"
                className="btn btn-light border rounded-circle p-2 text-muted"
                onClick={() => setSearch('')}
                title="Clear Search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="d-flex align-items-center gap-2 mt-3 overflow-x-auto pb-1">
          <span className="small text-muted fw-bold me-1">Filter by Area:</span>
          {cities.map((c) => (
            <button
              key={c}
              type="button"
              className={`btn btn-sm rounded-pill px-3 py-1 text-nowrap fw-semibold transition-all ${
                selectedCity === c
                  ? 'text-white shadow-xs'
                  : 'btn-light border text-secondary'
              }`}
              style={{
                backgroundColor: selectedCity === c ? '#0d9488' : undefined,
                borderColor: selectedCity === c ? '#0d9488' : undefined
              }}
              onClick={() => setSelectedCity(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital Distance Cards Grid (Matching Screen 5) */}
      <div className="row g-4 mb-4">
        {filteredCentres.map((centre) => (
          <div key={centre.id} className="col-12 col-md-6 col-lg-4">
            <div 
              className="card border-0 rounded-4 shadow-sm h-100 overflow-hidden bg-white hover-shadow transition-all"
              style={{ border: '1px solid #e2e8f0', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
            >
              
              {/* Photo & Distance Badge Header */}
              <div 
                className="position-relative p-3.5 d-flex flex-column justify-content-between"
                style={{
                  height: '150px',
                  backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.25), rgba(15, 23, 42, 0.85)), url(${centre.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span 
                    className="badge rounded-pill fw-bold px-2.5 py-1 small shadow-xs"
                    style={{ backgroundColor: 'var(--k-surface)', color: 'var(--k-primary)', border: '1px solid var(--k-border)', fontSize: '0.74rem' }}
                  >
                    {centre.tag}
                  </span>
                  {/* Distance Pill */}
                  <span 
                    className="badge rounded-pill px-2.5 py-1 small fw-bold d-flex align-items-center gap-1 shadow-xs"
                    style={{ backgroundColor: '#10b981', color: '#ffffff', fontSize: '0.74rem' }}
                  >
                    <Navigation size={11} />
                    {centre.distance}
                  </span>
                </div>

                <div className="text-white">
                  <h5 className="fw-bold mb-0 text-truncate text-white" title={centre.name} style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}>
                    {centre.name}
                  </h5>
                  <small className="text-white-50 d-flex align-items-center gap-1 mt-0.5" style={{ fontSize: '0.76rem' }}>
                    <MapPin size={12} className="text-warning" />
                    <span>{centre.city}</span>
                  </small>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3.5 d-flex flex-column justify-content-between flex-grow-1">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-2.5 flex-wrap">
                    <span 
                      className="badge rounded-pill px-2.5 py-1 small fw-semibold"
                      style={{ backgroundColor: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', fontSize: '0.74rem' }}
                    >
                      ⭐ {centre.rating} ({centre.reviews} reviews)
                    </span>
                    <span 
                      className="badge rounded-pill px-2.5 py-1 small fw-medium"
                      style={{ backgroundColor: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd', fontSize: '0.72rem' }}
                    >
                      {centre.bmtBeds}
                    </span>
                  </div>

                  <p className="small text-secondary mb-2.5 line-clamp-2" style={{ minHeight: '38px', fontSize: '0.82rem', lineHeight: 1.45 }}>
                    {centre.services}
                  </p>

                  <div 
                    className="p-2.5 rounded-3 mb-3 small" 
                    style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '0.74rem' }}
                  >
                    <div className="d-flex align-items-start gap-1.5 text-secondary">
                      <ShieldCheck size={14} className="text-teal flex-shrink-0 mt-0.5" style={{ color: '#0d9488' }} />
                      <div>
                        <strong className="text-dark">Accreditation: </strong> 
                        <span>{centre.accreditation}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="d-flex align-items-center justify-content-between pt-2.5 border-top gap-2" style={{ borderColor: '#f1f5f9' }}>
                  <a
                    href={`tel:${centre.contact}`}
                    className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1.5 small d-flex align-items-center gap-1.5 fw-medium"
                    style={{ fontSize: '0.78rem' }}
                  >
                    <Phone size={13} />
                    <span>Call</span>
                  </a>
                  <button
                    type="button"
                    className="btn btn-sm rounded-pill px-3.5 py-1.5 small fw-semibold d-flex align-items-center gap-1.5 text-white shadow-xs"
                    style={{ background: 'linear-gradient(135deg, #0d9488 0%, #065f46 100%)', border: 'none', fontSize: '0.78rem' }}
                    onClick={() => {
                      setSelectedCentreForModal(centre);
                      setShowMapModal(true);
                    }}
                  >
                    <MapPin size={13} />
                    <span>View on Map</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Big Green "View on Map" Full Banner (From Mockup Screen 5) */}
      <div className="card border-0 rounded-4 shadow-sm p-4 bg-white text-center">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div className="text-start">
            <h5 className="fw-bold text-dark mb-1">Need help choosing a nearby hospital?</h5>
            <p className="text-secondary small mb-0">
              Speak with a verified patient navigator or explore interactive geographic route planning.
            </p>
          </div>
          <button
            type="button"
            className="btn-koshika-green-pill text-nowrap px-4 py-2.5"
            onClick={() => setShowMapModal(true)}
          >
            <MapIcon size={18} />
            <span>Interactive Hospital Map</span>
          </button>
        </div>
      </div>

      {/* Interactive Map Modal */}
      {showMapModal && (
        <div 
          className="modal show d-block" 
          tabIndex="-1" 
          style={{ background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header border-0 bg-dark text-white px-4 py-3">
                <h5 className="modal-title fw-bold fs-6 d-flex align-items-center gap-2">
                  <MapIcon size={18} className="text-success" />
                  <span>Interactive Stem Cell Care Geographic Locator</span>
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowMapModal(false)}
                ></button>
              </div>

              <div className="modal-body p-0">
                <div className="row g-0">
                  {/* Left: Real Interactive Leaflet OpenStreetMap Map */}
                  <div className="col-12 col-lg-8 position-relative" style={{ minHeight: '460px' }}>
                    <HospitalInteractiveMap
                      centres={ACCREDITED_CENTRES}
                      selectedCentre={selectedCentreForModal}
                      onSelectCentre={(c) => setSelectedCentreForModal(c)}
                    />
                  </div>

                  {/* Right Detail Pane */}
                  <div className="col-12 col-lg-4 p-4 bg-white border-start d-flex flex-column justify-content-between">
                    <div>
                      <span className="badge bg-success-subtle text-success small px-2.5 py-1 rounded-pill mb-2 fw-bold">
                        SELECTED CENTRE DETAILS
                      </span>
                      <h5 className="fw-bold text-dark mb-1">
                        {selectedCentreForModal ? selectedCentreForModal.name : 'AIIMS Delhi — Stem Cell Research'}
                      </h5>
                      <p className="text-muted small mb-3">
                        {selectedCentreForModal ? selectedCentreForModal.city : 'New Delhi, Delhi NCR'}
                      </p>

                      <div className="p-3 bg-light rounded-3 mb-3 small text-secondary">
                        <div className="mb-1.5"><strong>Distance:</strong> {selectedCentreForModal?.distance || '12 km'}</div>
                        <div className="mb-1.5"><strong>BMT Suites:</strong> {selectedCentreForModal?.bmtBeds || '32 HEPA Suites'}</div>
                        <div className="mb-1.5"><strong>Contact:</strong> {selectedCentreForModal?.contact || '+91 11 2658 8500'}</div>
                        <div><strong>Accreditation:</strong> {selectedCentreForModal?.accreditation || 'FACT-JACIE, NABH'}</div>
                      </div>
                    </div>

                    <div className="d-flex flex-column gap-2">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedCentreForModal?.lat || 28.5672},${selectedCentreForModal?.lng || 77.2100}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm rounded-pill w-100 py-2.5 fw-semibold text-white d-flex align-items-center justify-content-center gap-1.5 shadow-xs"
                        style={{ background: 'linear-gradient(135deg, #0d9488 0%, #065f46 100%)' }}
                      >
                        <Navigation size={15} />
                        <span>Turn-by-Turn Route Navigation</span>
                      </a>

                      <a
                        href={selectedCentreForModal?.website || 'https://aiims.edu'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-secondary btn-sm rounded-pill w-100 py-2 fw-semibold"
                      >
                        <ExternalLink size={14} className="me-1" />
                        <span>Visit Hospital Website</span>
                      </a>

                      <button
                        type="button"
                        className="btn btn-light border btn-sm rounded-pill w-100 py-2"
                        onClick={() => setShowMapModal(false)}
                      >
                        Close Map
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HospitalsCentres;
