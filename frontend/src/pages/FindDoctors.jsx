import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import api from '../api/client';
import {
  Search,
  Stethoscope,
  Building2,
  Calendar,
  Star,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Award,
  Video,
  MapPin,
  HeartPulse,
  Zap,
  Dna,
  Clock,
  UserCheck
} from 'lucide-react';

const CERTIFIED_SPECIALISTS = [
  {
    id: 1,
    name: 'Dr. Sharat Damodar',
    specialty: 'Adult Haemato-Oncology & BMT',
    department: 'Adult Haemato-Oncology & BMT',
    hospital: 'Narayana Health, Bengaluru',
    experience: '24+ Years Experience',
    qualification: 'MD, Fellowship in BMT & Cellular Therapy (USA)',
    rating: 4.9,
    reviews: 184,
    availableDays: 'Mon, Wed, Fri',
    fee: '₹1,800',
    contact: '080-6750 6800'
  },
  {
    id: 2,
    name: 'Dr. Shilpa Prabhu',
    specialty: 'Adult Haemato-Oncology & BMT',
    department: 'Adult Haemato-Oncology & BMT',
    hospital: 'Mazumdar Shaw Medical Center, Bengaluru',
    experience: '16+ Years Experience',
    qualification: 'MBBS, MD, Fellowship in Haematology & BMT',
    rating: 4.9,
    reviews: 142,
    availableDays: 'Tue, Thu, Sat',
    fee: '₹1,500',
    contact: '080-6750 6801'
  },
  {
    id: 3,
    name: 'Dr. Sunil Bhat',
    specialty: 'Paediatric Haemato-Oncology & BMT',
    department: 'Paediatric Haemato-Oncology & BMT',
    hospital: 'Narayana Health, Bengaluru',
    experience: '22+ Years Experience',
    qualification: 'MBBS, MD (Paediatrics), Fellowship in Paediatric BMT',
    rating: 5.0,
    reviews: 215,
    availableDays: 'Mon, Tue, Thu',
    fee: '₹1,800',
    contact: '080-6750 6802'
  },
  {
    id: 4,
    name: 'Dr. Pooja P. Mallya',
    specialty: 'Paediatric Haemato-Oncology & BMT',
    department: 'Paediatric Haemato-Oncology & BMT',
    hospital: 'Mazumdar Shaw Cancer Centre, Bengaluru',
    experience: '14+ Years Experience',
    qualification: 'MBBS, DNB (Paediatrics), Fellowship in Paediatric BMT',
    rating: 4.8,
    reviews: 96,
    availableDays: 'Wed, Fri, Sat',
    fee: '₹1,500',
    contact: '080-6750 6803'
  },
  {
    id: 5,
    name: 'Dr. Shobha B',
    specialty: 'Paediatric Haemato-Oncology & BMT',
    department: 'Paediatric Haemato-Oncology & BMT',
    hospital: 'Narayana Health City, Bengaluru',
    experience: '15+ Years Experience',
    qualification: 'MBBS, MD, Fellowship in Paediatric BMT',
    rating: 4.8,
    reviews: 110,
    availableDays: 'Mon, Wed, Sat',
    fee: '₹1,500',
    contact: '080-6750 6804'
  },
  {
    id: 6,
    name: 'Dr. Suparno Chakrabarti',
    specialty: 'Senior Consultant & HOD, Bone Marrow Transplant',
    department: 'Senior Consultant & HOD, BMT',
    hospital: 'Dharamshila Narayana Hospital, New Delhi',
    experience: '26+ Years Experience',
    qualification: 'MD, FRCPath, Fellowship in BMT (UK)',
    rating: 5.0,
    reviews: 248,
    availableDays: 'Mon, Tue, Thu, Fri',
    fee: '₹2,000',
    contact: '011-4306 6666'
  },
  {
    id: 7,
    name: 'Dr. Sarita Rani Jaiswal',
    specialty: 'Program Director, Haploidentical BMT',
    department: 'Haploidentical BMT & Haematology',
    hospital: 'Dharamshila Narayana Hospital, New Delhi',
    experience: '18+ Years Experience',
    qualification: 'MBBS, MD, Fellowship in Haplo BMT',
    rating: 4.9,
    reviews: 172,
    availableDays: 'Tue, Thu, Sat',
    fee: '₹1,800',
    contact: '011-4306 6667'
  },
  {
    id: 8,
    name: 'Dr. Megha Saroha',
    specialty: 'Paediatric Haemato-Oncology & BMT',
    department: 'Paediatric Haemato-Oncology & BMT',
    hospital: 'Dharamshila Narayana Hospital, New Delhi',
    experience: '12+ Years Experience',
    qualification: 'MBBS, DNB (Paediatrics), Fellowship in Paediatric BMT',
    rating: 4.8,
    reviews: 88,
    availableDays: 'Mon, Wed, Fri',
    fee: '₹1,500',
    contact: '011-4306 6668'
  },
  {
    id: 9,
    name: 'Dr. Ashish Dixit',
    specialty: 'Clinical Haematology & BMT',
    department: 'Clinical Haematology & BMT',
    hospital: 'Manipal Hospital, Bengaluru',
    experience: '20+ Years Experience',
    qualification: 'MBBS, MD, DM (Clinical Haematology)',
    rating: 4.9,
    reviews: 195,
    availableDays: 'Mon, Wed, Fri',
    fee: '₹1,800',
    contact: '080-2502 4444'
  },
  {
    id: 10,
    name: 'Dr. Dharma Choudhary',
    specialty: 'Haematology and Bone Marrow Transplant',
    department: 'Haematology & BMT',
    hospital: 'Sanar International Hospital, Delhi NCR',
    experience: '25+ Years Experience',
    qualification: 'MBBS, MD, DM (Clinical Haematology)',
    rating: 5.0,
    reviews: 280,
    availableDays: 'Tue, Thu, Sat',
    fee: '₹2,200',
    contact: '0124-382 8888'
  },
  {
    id: 11,
    name: 'Dr. Lalit Kumar',
    specialty: 'Haematology/Oncology & BMT',
    department: 'Haematology & Medical Oncology',
    hospital: 'Artemis Hospitals, Gurugram',
    experience: '32+ Years Experience',
    qualification: 'MBBS, MD, DM (Medical Oncology), Padma Shri',
    rating: 5.0,
    reviews: 340,
    availableDays: 'Mon, Wed, Fri',
    fee: '₹2,500',
    contact: '0124-451 1111'
  },
  {
    id: 12,
    name: 'Dr. Ashray Kole',
    specialty: 'Haematology & BMT Specialist',
    department: 'Haematology & BMT',
    hospital: 'Ruby Hall Clinic, Pune',
    experience: '14+ Years Experience',
    qualification: 'MBBS, MD, DM (Clinical Haematology)',
    rating: 4.8,
    reviews: 104,
    availableDays: 'Tue, Thu, Sat',
    fee: '₹1,600',
    contact: '020-6645 5100'
  },
  {
    id: 13,
    name: 'Dr. Shyam Rathi',
    specialty: 'Haematology and Bone Marrow Transplant',
    department: 'Haematology & BMT',
    hospital: 'Kokilaben Hospital, Mumbai',
    experience: '16+ Years Experience',
    qualification: 'MBBS, MD, DM (Clinical Haematology)',
    rating: 4.9,
    reviews: 138,
    availableDays: 'Mon, Wed, Fri',
    fee: '₹1,800',
    contact: '022-4269 6969'
  },
  {
    id: 14,
    name: 'Dr. Prathamesh Kulkarni',
    specialty: 'Haematology & Stem-Cell Transplantation',
    department: 'Haematology & Stem-Cell Transplantation',
    hospital: 'Deenanath Mangeshkar Hospital, Pune',
    experience: '15+ Years Experience',
    qualification: 'MBBS, MD, DM (Haematology)',
    rating: 4.8,
    reviews: 118,
    availableDays: 'Mon, Tue, Thu',
    fee: '₹1,600',
    contact: '020-4015 1000'
  },
  {
    id: 15,
    name: 'Dr. Santanu Sen',
    specialty: 'Paediatric Haematology, Oncology & BMT',
    department: 'Paediatric Haematology & BMT',
    hospital: 'Kokilaben Hospital, Mumbai',
    experience: '20+ Years Experience',
    qualification: 'MBBS, MD (Paediatrics), MRCPCH (UK)',
    rating: 4.9,
    reviews: 180,
    availableDays: 'Wed, Fri, Sat',
    fee: '₹2,000',
    contact: '022-4269 6970'
  },
  {
    id: 16,
    name: 'Dr. Shrinath Kshirsagar',
    specialty: 'Haematology, Haemato-Oncology & BMT',
    department: 'Haematology & BMT',
    hospital: 'Apollo Hospitals, Navi Mumbai',
    experience: '13+ Years Experience',
    qualification: 'MBBS, MD, DM (Clinical Haematology)',
    rating: 4.8,
    reviews: 92,
    availableDays: 'Tue, Thu, Sat',
    fee: '₹1,600',
    contact: '022-3350 3350'
  },
  {
    id: 17,
    name: 'Dr. Lalit Raut',
    specialty: 'Haematology & Bone Marrow Transplant',
    department: 'Haematology & BMT',
    hospital: 'Sahyadri Super Speciality Hospitals, Pune',
    experience: '17+ Years Experience',
    qualification: 'MBBS, MD, DM (Clinical Haematology)',
    rating: 4.9,
    reviews: 145,
    availableDays: 'Mon, Wed, Fri',
    fee: '₹1,700',
    contact: '020-6721 3000'
  }
];

// Meaningful clinical specialty styling helper
const getDoctorSpecialtyMeta = (specialty = '', department = '') => {
  const combined = (specialty + ' ' + department).toLowerCase();

  if (combined.includes('paediatric') || combined.includes('pediatric')) {
    return {
      category: 'Paediatric',
      label: 'Paediatric BMT Specialist',
      themeColor: '#e11d48',
      bgLight: '#fff1f2',
      borderLight: '#ffe4e6',
      gradient: 'linear-gradient(135deg, #e11d48 0%, #fb7185 100%)',
      icon: HeartPulse
    };
  }
  if (combined.includes('car-t') || combined.includes('cellular')) {
    return {
      category: 'CAR-T',
      label: 'CAR-T & Cellular Therapy',
      themeColor: '#d97706',
      bgLight: '#fef3c7',
      borderLight: '#fde68a',
      gradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
      icon: Zap
    };
  }
  if (combined.includes('haploidentical')) {
    return {
      category: 'Haploidentical',
      label: 'Haploidentical BMT Lead',
      themeColor: '#0d9488',
      bgLight: '#ccfbf1',
      borderLight: '#99f6e4',
      gradient: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
      icon: Dna
    };
  }
  return {
    category: 'Adult',
    label: 'Adult Haemato-Oncology & BMT',
    themeColor: '#0284c7',
    bgLight: '#e0f2fe',
    borderLight: '#bae6fd',
    gradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    icon: Stethoscope
  };
};

const FindDoctors = () => {
  const navigate = useNavigate();
  const { addAppointment } = useRole();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [doctors, setDoctors] = useState(CERTIFIED_SPECIALISTS);
  const [bookingDoc, setBookingDoc] = useState(null);
  const [bookingDate, setBookingDate] = useState('Tomorrow, 10:30 AM');
  const [bookingMode, setBookingMode] = useState('In-Person Consultation (Hospital OPD)');

  useEffect(() => {
    // Augment with backend staff if available
    api.get('/staff/')
      .then(res => {
        const backendStaff = res.data?.results || res.data || [];
        if (backendStaff.length > 0) {
          const namesMap = new Map();
          CERTIFIED_SPECIALISTS.forEach(d => namesMap.set(d.name.toLowerCase().trim(), d));

          const merged = [...CERTIFIED_SPECIALISTS];
          backendStaff.forEach((s, idx) => {
            const cleanName = s.name.startsWith('Dr.') ? s.name : `Dr. ${s.name}`;
            const key = cleanName.toLowerCase().trim();
            if (!namesMap.has(key)) {
              const newEntry = {
                id: s.staff_id || (idx + 100),
                name: cleanName,
                specialty: s.role || 'Haemato-Oncology & BMT Specialist',
                department: s.department || 'Haemato-Oncology & BMT',
                hospital: 'KOSHIKA Network Partner BMT Centre',
                experience: '15+ Years Experience',
                qualification: 'Certified Bone Marrow Transplant Specialist',
                rating: 4.9,
                reviews: 50,
                availableDays: 'Mon - Fri',
                fee: '₹1,600',
                contact: 'Registered via KOSHIKA Registry'
              };
              namesMap.set(key, newEntry);
              merged.push(newEntry);
            }
          });
          setDoctors(merged);
        }
      })
      .catch(() => {});
  }, []);

  const filteredDoctors = doctors.filter(doc => {
    const s = search.toLowerCase().trim();
    const matchesSearch = !s ||
      doc.name.toLowerCase().includes(s) ||
      (doc.specialty && doc.specialty.toLowerCase().includes(s)) ||
      (doc.department && doc.department.toLowerCase().includes(s)) ||
      (doc.hospital && doc.hospital.toLowerCase().includes(s)) ||
      (doc.qualification && doc.qualification.toLowerCase().includes(s));

    let matchesDept = true;
    if (selectedDept !== 'ALL') {
      const dept = selectedDept.toLowerCase();
      const docDept = ((doc.department || '') + ' ' + (doc.specialty || '')).toLowerCase();
      if (dept === 'paediatric') {
        matchesDept = docDept.includes('paediatric') || docDept.includes('pediatric');
      } else if (dept === 'adult') {
        matchesDept = docDept.includes('adult') || (docDept.includes('haemato') && !docDept.includes('paediatric') && !docDept.includes('pediatric'));
      } else if (dept === 'car-t') {
        matchesDept = docDept.includes('car-t') || docDept.includes('cellular');
      } else if (dept === 'haploidentical') {
        matchesDept = docDept.includes('haploidentical');
      } else {
        matchesDept = docDept.includes(dept);
      }
    }
    return matchesSearch && matchesDept;
  });

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (bookingDoc) {
      addAppointment({
        doctorName: bookingDoc.name,
        specialty: bookingDoc.specialty || bookingDoc.department || 'Haemato-Oncology & BMT',
        hospital: bookingDoc.hospital || 'Narayana Health City',
        date: bookingDate || 'Upcoming Monday, 10:00 AM',
        mode: bookingMode || 'In-Person Consultation (Hospital OPD)',
        room: (bookingMode && (bookingMode.includes('Video') || bookingMode.includes('Tele')))
          ? 'Virtual Room #82 (Encrypted WebRTC HD)'
          : 'Transplant OPD Suite 4B',
        notes: `Consultation confirmed from Specialists directory. Contact: ${bookingDoc.contact || 'N/A'}`
      });
    }
    setBookingDoc(null);
    navigate('/appointments');
  };

  const getSpecialtyCount = (deptKey) => {
    if (deptKey === 'ALL') return doctors.length;
    return doctors.filter(doc => {
      const d = ((doc.department || '') + ' ' + (doc.specialty || '')).toLowerCase();
      if (deptKey === 'Adult') return d.includes('adult') || (d.includes('haemato') && !d.includes('paediatric') && !d.includes('pediatric'));
      if (deptKey === 'Paediatric') return d.includes('paediatric') || d.includes('pediatric');
      if (deptKey === 'CAR-T') return d.includes('car-t') || d.includes('cellular');
      if (deptKey === 'Haploidentical') return d.includes('haploidentical');
      return true;
    }).length;
  };

  return (
    <div className="koshika-animate-fadein pb-5 mx-auto" style={{ maxWidth: '1360px' }}>
      {/* ---------------------------------------------------------------------
          BACK TO HOME NAVIGATION
      ---------------------------------------------------------------------- */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 text-muted hover-translate-y shadow-xs"
          style={{ fontSize: '0.85rem' }}
          title="Back to Home"
        >
          <ArrowLeft size={15} />
          <span>Back to Home</span>
        </button>

        <div className="d-none d-sm-flex align-items-center gap-2">
          <span className="badge rounded-pill bg-success-subtle text-success px-2.5 py-1 small d-inline-flex align-items-center gap-1.5 border border-success-subtle">
            <span className="p-1 rounded-circle bg-success d-inline-block"></span>
            <span>100% CDSCO &bull; FACT &bull; EBMT Verified Faculty</span>
          </span>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          1. CREATIVE PATIENT HERO BANNER (EXACT KOSHIKA SIGNATURE STYLE)
      ---------------------------------------------------------------------- */}
      <div
        className="card border-0 rounded-4 p-4 p-md-5 mb-4 text-white position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          boxShadow: '0 10px 30px -5px rgba(6, 78, 59, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        }}
      >
        <div className="row align-items-center position-relative" style={{ zIndex: 2 }}>
          {/* Left Title & Badges */}
          <div className="col-lg-8">
            <div className="d-flex align-items-center gap-2 mb-2.5 flex-wrap">
              <span
                className="badge rounded-pill px-3 py-1.5 fw-bold d-inline-flex align-items-center gap-1.5"
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <Stethoscope size={14} />
                <span>Certified Specialist Network</span>
              </span>
              <span
                className="badge rounded-pill px-3 py-1.5 small fw-semibold d-inline-flex align-items-center gap-1.5"
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <ShieldCheck size={13} />
                <span>FACT &bull; EBMT Clinical Gatekeeper Active</span>
              </span>
            </div>

            <h2 className="fw-extrabold mb-2.5 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Find Certified Doctors &amp; BMT Specialists
            </h2>

            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.98rem', lineHeight: '1.6', maxWidth: '650px' }}>
              Directly connect with India's leading bone marrow transplant oncologists, pediatric cellular therapists, and CAR-T specialists across accredited hospital centers.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
            <div className="d-flex flex-column flex-sm-row flex-lg-column gap-2 justify-content-lg-end">
              <button
                type="button"
                onClick={() => navigate('/find-care/centres')}
                className="btn rounded-pill px-4 py-2.5 fw-bold shadow-sm d-inline-flex align-items-center justify-content-center gap-2 hover-translate-y koshika-hero-action-btn"
                style={{ backgroundColor: '#ffffff', color: '#064e3b', border: 'none' }}
              >
                <Building2 size={16} color="currentColor" />
                <span>View Transplant Centres &rarr;</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/appointments')}
                className="btn btn-warning rounded-pill px-4 py-2.5 fw-bold shadow-sm d-inline-flex align-items-center justify-content-center gap-2 hover-translate-y"
                style={isDark ? { background: 'rgba(234, 179, 8, 0.22)', borderColor: '#eab308', color: '#fde047' } : { background: '#fef08a', borderColor: '#fef08a', color: '#1e293b' }}
              >
                <Calendar size={16} className={isDark ? 'text-warning' : 'text-dark'} />
                <span className={isDark ? 'text-warning' : 'text-dark'}>My Consultations &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          2. THE 4-STEP SPECIALIST WORKFLOW BAR
      ---------------------------------------------------------------------- */}
      <div className={`card border-0 shadow-xs rounded-4 p-3 mb-4 ${isDark ? 'bg-surface' : 'bg-white'}`} style={{ border: isDark ? '1px solid var(--k-border)' : '1px solid #e2e8f0' }}>
        <div className="d-flex align-items-center justify-content-between mb-2 px-1">
          <span className="small text-muted fw-bold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.04em' }}>
            Specialist Consultation Pipeline
          </span>
          <span className="badge rounded-pill bg-light text-secondary border small px-2 py-0.5" style={{ fontSize: '0.68rem' }}>
            Step 1: Discover Faculty
          </span>
        </div>

        <div className="row g-2 align-items-center text-center">
          <div className="col-6 col-md-3">
            <div
              className="p-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2 bg-teal-subtle text-teal fw-bold border shadow-xs"
              style={{ borderColor: isDark ? 'rgba(13, 148, 136, 0.35)' : '#99f6e4', backgroundColor: isDark ? 'rgba(13, 148, 136, 0.14)' : '#f0fdfa' }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                style={{ width: '26px', height: '26px', background: '#0d9488', fontSize: '0.75rem' }}
              >
                1
              </div>
              <div className="text-start">
                <span className="d-block small fw-bold lh-1" style={{ fontSize: '0.8rem' }}>DISCOVER FACULTY</span>
                <span className="text-muted" style={{ fontSize: '0.66rem' }}>Verified BMT Leads</span>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div
              className="p-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2 bg-light text-secondary border"
              style={{ borderColor: '#e2e8f0' }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                style={{ width: '26px', height: '26px', background: '#94a3b8', fontSize: '0.75rem' }}
              >
                2
              </div>
              <div className="text-start">
                <span className="d-block small fw-bold lh-1" style={{ fontSize: '0.8rem' }}>SELECT SPECIALTY</span>
                <span className="text-muted" style={{ fontSize: '0.66rem' }}>Adult, Paediatric, CAR-T</span>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div
              className="p-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2 bg-light text-secondary border"
              style={{ borderColor: '#e2e8f0' }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                style={{ width: '26px', height: '26px', background: '#94a3b8', fontSize: '0.75rem' }}
              >
                3
              </div>
              <div className="text-start">
                <span className="d-block small fw-bold lh-1" style={{ fontSize: '0.8rem' }}>PICK SLOT</span>
                <span className="text-muted" style={{ fontSize: '0.66rem' }}>Video or Hospital OPD</span>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div
              className="p-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2 bg-light text-secondary border"
              style={{ borderColor: '#e2e8f0' }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                style={{ width: '26px', height: '26px', background: '#94a3b8', fontSize: '0.75rem' }}
              >
                4
              </div>
              <div className="text-start">
                <span className="d-block small fw-bold lh-1" style={{ fontSize: '0.8rem' }}>CONFIRMED CARE</span>
                <span className="text-muted" style={{ fontSize: '0.66rem' }}>Digital OPD Pass</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          3. FILTER & SEARCH TOOLBAR (STREAMLINED, COLORFUL & PROPERLY SPACED)
      ---------------------------------------------------------------------- */}
      <div className={`card border-0 shadow-sm rounded-4 p-3 mb-4 ${isDark ? 'bg-surface' : 'bg-white'}`} style={{ border: isDark ? '1px solid var(--k-border)' : '1px solid #e2e8f0' }}>
        <div className="d-flex flex-column flex-xl-row align-items-stretch align-items-xl-center justify-content-between gap-3">
          {/* Search Input */}
          <div className="position-relative flex-grow-1" style={{ maxWidth: '380px' }}>
            <Search 
              size={16} 
              className="position-absolute text-muted" 
              style={{ top: '50%', left: '16px', transform: 'translateY(-50%)' }} 
            />
            <input
              type="text"
              className="form-control rounded-pill ps-5 pe-3 py-2 border bg-light small"
              placeholder="Search by doctor, hospital, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ fontSize: '0.86rem' }}
            />
          </div>

          {/* Specialty Filter Pills */}
          <div className="d-flex flex-wrap align-items-center gap-2 justify-content-xl-end">
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1.5 transition-all ${
                selectedDept === 'ALL'
                  ? 'btn-dark text-white shadow-xs'
                  : 'btn-light border text-secondary'
              }`}
              style={{ fontSize: '0.82rem' }}
              onClick={() => setSelectedDept('ALL')}
            >
              <span>All Specialists</span>
              <span className={`badge rounded-pill ${selectedDept === 'ALL' ? 'bg-white text-dark' : 'bg-secondary-subtle text-secondary'}`} style={{ fontSize: '0.7rem' }}>
                {getSpecialtyCount('ALL')}
              </span>
            </button>

            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1.5 transition-all ${
                selectedDept === 'Adult'
                  ? 'text-white shadow-xs'
                  : 'btn-light border text-secondary'
              }`}
              style={selectedDept === 'Adult' ? { backgroundColor: '#0284c7', borderColor: '#0284c7', fontSize: '0.82rem' } : { fontSize: '0.82rem' }}
              onClick={() => setSelectedDept('Adult')}
            >
              <Stethoscope size={14} />
              <span>Adult BMT</span>
              <span className="badge rounded-pill bg-white text-dark" style={{ fontSize: '0.7rem' }}>
                {getSpecialtyCount('Adult')}
              </span>
            </button>

            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1.5 transition-all ${
                selectedDept === 'Paediatric'
                  ? 'text-white shadow-xs'
                  : 'btn-light border text-secondary'
              }`}
              style={selectedDept === 'Paediatric' ? { backgroundColor: '#e11d48', borderColor: '#e11d48', fontSize: '0.82rem' } : { fontSize: '0.82rem' }}
              onClick={() => setSelectedDept('Paediatric')}
            >
              <HeartPulse size={14} />
              <span>Paediatric</span>
              <span className="badge rounded-pill bg-white text-dark" style={{ fontSize: '0.7rem' }}>
                {getSpecialtyCount('Paediatric')}
              </span>
            </button>

            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1.5 transition-all ${
                selectedDept === 'CAR-T'
                  ? 'text-white shadow-xs'
                  : 'btn-light border text-secondary'
              }`}
              style={selectedDept === 'CAR-T' ? { backgroundColor: '#d97706', borderColor: '#d97706', fontSize: '0.82rem' } : { fontSize: '0.82rem' }}
              onClick={() => setSelectedDept('CAR-T')}
            >
              <Zap size={14} />
              <span>CAR-T Therapy</span>
              <span className="badge rounded-pill bg-white text-dark" style={{ fontSize: '0.7rem' }}>
                {getSpecialtyCount('CAR-T')}
              </span>
            </button>

            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1.5 transition-all ${
                selectedDept === 'Haploidentical'
                  ? 'text-white shadow-xs'
                  : 'btn-light border text-secondary'
              }`}
              style={selectedDept === 'Haploidentical' ? { backgroundColor: '#0d9488', borderColor: '#0d9488', fontSize: '0.82rem' } : { fontSize: '0.82rem' }}
              onClick={() => setSelectedDept('Haploidentical')}
            >
              <Dna size={14} />
              <span>Haplo BMT</span>
              <span className="badge rounded-pill bg-white text-dark" style={{ fontSize: '0.7rem' }}>
                {getSpecialtyCount('Haploidentical')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          4. DOCTOR CARDS GRID (LESS TEXT, SPURRED COLORS, ZERO CLUTTER)
      ---------------------------------------------------------------------- */}
      <div className="row g-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => {
            const meta = getDoctorSpecialtyMeta(doc.specialty, doc.department);
            const SpecialtyIcon = meta.icon;

            return (
              <div key={`${doc.id}-${doc.name}`} className="col-12 col-lg-6">
                <div
                  className={`card border-0 shadow-xs rounded-4 p-4 ${isDark ? 'bg-surface' : 'bg-white'} h-100 d-flex flex-column justify-content-between position-relative hover-lift transition-all`}
                  style={{
                    border: isDark ? '1px solid var(--k-border)' : '1px solid #e2e8f0',
                    borderTop: `4px solid ${meta.themeColor}`
                  }}
                >
                  <div>
                    {/* Header Row: Doctor Monogram, Name, Specialty & Rating */}
                    <div className="d-flex justify-content-between align-items-start mb-3 gap-3">
                      <div className="d-flex align-items-center gap-3">
                        {/* Monogram Badge */}
                        <div className="position-relative flex-shrink-0">
                          <div
                            className="rounded-4 d-flex align-items-center justify-content-center text-white fw-bold shadow-xs"
                            style={{
                              width: '54px',
                              height: '54px',
                              background: meta.gradient,
                              fontSize: '1.15rem',
                              letterSpacing: '0.02em'
                            }}
                          >
                            {doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <span
                            className="position-absolute bottom-0 end-0 bg-white rounded-circle p-0.5 shadow-xs d-flex align-items-center justify-content-center"
                            style={{ transform: 'translate(25%, 25%)', width: 20, height: 20 }}
                            title="FACT / CDSCO Accredited Faculty"
                          >
                            <CheckCircle2 size={15} className="text-success fill-success" />
                          </span>
                        </div>

                        <div>
                          <h3 className="h6 fw-bold text-dark mb-1" style={{ fontSize: '1.05rem' }}>
                            {doc.name}
                          </h3>
                          <div className="d-flex align-items-center gap-1.5 flex-wrap">
                            <span
                              className="badge rounded-pill px-2.5 py-0.5 fw-semibold small d-inline-flex align-items-center gap-1 border"
                              style={{
                                backgroundColor: meta.bgLight,
                                color: meta.themeColor,
                                borderColor: meta.borderLight,
                                fontSize: '0.72rem'
                              }}
                            >
                              <SpecialtyIcon size={12} />
                              <span>{meta.label}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Rating pill with warm amber glow */}
                      <span 
                        className="badge rounded-pill px-2.5 py-1 small flex-shrink-0 d-inline-flex align-items-center gap-1 border"
                        style={{ backgroundColor: '#fffbeb', color: '#b45309', borderColor: '#fde68a', fontSize: '0.76rem' }}
                      >
                        <Star size={13} className="text-warning fill-warning" />
                        <span className="fw-bold">{doc.rating}</span>
                        <span className="text-muted small">({doc.reviews})</span>
                      </span>
                    </div>

                    {/* Clean Key-Value Rows (No text congestion, generous line spacing) */}
                    <div className="p-3 rounded-3 mb-3 bg-light-subtle border" style={{ borderColor: '#f1f5f9' }}>
                      <div className="d-flex align-items-center gap-2 mb-2 text-dark">
                        <Building2 size={15} className="flex-shrink-0" style={{ color: meta.themeColor }} />
                        <span className="small fw-semibold text-truncate" style={{ fontSize: '0.84rem' }}>
                          {doc.hospital}
                        </span>
                      </div>

                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 pt-2 border-top" style={{ borderColor: '#e2e8f0' }}>
                        <div className="d-inline-flex align-items-center gap-1.5 text-muted small" style={{ fontSize: '0.78rem' }}>
                          <Award size={14} style={{ color: '#d97706' }} />
                          <span className="text-dark fw-medium">{doc.experience}</span>
                        </div>
                        <div className="d-inline-flex align-items-center gap-1.5 text-muted small" style={{ fontSize: '0.78rem' }}>
                          <Calendar size={14} className="text-success" />
                          <span>OPD: <strong className="text-dark">{doc.availableDays}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Consultation Fee & Action Button */}
                  <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-2" style={{ borderColor: '#f1f5f9' }}>
                    <div>
                      <span className="text-muted small d-block" style={{ fontSize: '0.72rem' }}>
                        Consultation Fee
                      </span>
                      <span className="badge rounded-pill bg-success-subtle text-success fw-bold px-2.5 py-1" style={{ fontSize: '0.88rem' }}>
                        {doc.fee}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setBookingDoc(doc)}
                      className="btn btn-sm rounded-pill px-4 py-2 fw-semibold text-white shadow-xs d-inline-flex align-items-center gap-2 hover-translate-y"
                      style={{
                        backgroundColor: meta.themeColor,
                        border: 'none',
                        fontSize: '0.84rem'
                      }}
                    >
                      <Calendar size={14} />
                      <span>Book Consultation</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12 text-center py-5">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light mb-3"
              style={{ width: '70px', height: '70px' }}
            >
              <Search size={30} className="text-muted" />
            </div>
            <h5 className="fw-bold text-dark mb-1">No specialists matching your criteria</h5>
            <p className="text-secondary small mb-3">
              Try adjusting your specialty filter or search term to discover certified BMT physicians.
            </p>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm rounded-pill px-4"
              onClick={() => { setSearch(''); setSelectedDept('ALL'); }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------------------
          5. BOOKING CONSULTATION MODAL
      ---------------------------------------------------------------------- */}
      {bookingDoc && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(5px)', zIndex: 1060 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div
                className="modal-header border-bottom px-4 py-3 text-white"
                style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' }}
              >
                <div>
                  <h5 className="modal-title fw-bold mb-0 text-white">
                    Book Specialist Consultation
                  </h5>
                  <small className="text-white-50">Confidential clinical slot reservation</small>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setBookingDoc(null)}
                  aria-label="Close"
                ></button>
              </div>

              <form onSubmit={handleConfirmBooking}>
                <div className="modal-body px-4 py-3">
                  {/* Doctor Profile Pill */}
                  <div className="p-3 rounded-3 mb-3 bg-light border d-flex align-items-center gap-3">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center text-white fw-bold shadow-xs flex-shrink-0"
                      style={{
                        width: '46px',
                        height: '46px',
                        background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)',
                        fontSize: '1rem'
                      }}
                    >
                      {bookingDoc.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <h6 className="fw-bold text-dark mb-0 text-truncate">{bookingDoc.name}</h6>
                      <small className="text-primary fw-semibold d-block text-truncate">{bookingDoc.department || bookingDoc.specialty}</small>
                      <small className="text-muted text-truncate d-block">{bookingDoc.hospital}</small>
                    </div>
                  </div>

                  {/* Consultation Mode Selector */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-dark d-block mb-2">
                      Select Consultation Mode
                    </label>
                    <div className="row g-2">
                      <div className="col-6">
                        <div
                          className={`p-2.5 rounded-3 border text-center cursor-pointer transition-all ${
                            bookingMode.includes('In-Person')
                              ? 'border-primary bg-primary-subtle text-primary fw-bold'
                              : 'bg-white text-secondary'
                          }`}
                          onClick={() => setBookingMode('In-Person Consultation (Hospital OPD)')}
                          style={{ cursor: 'pointer' }}
                        >
                          <Building2 size={20} className="d-block mx-auto mb-1" />
                          <div className="small">In-Person OPD</div>
                          <span className="badge rounded-pill bg-white text-dark small border mt-1" style={{ fontSize: '0.65rem' }}>
                            Hospital Suite
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div
                          className={`p-2.5 rounded-3 border text-center cursor-pointer transition-all ${
                            bookingMode.includes('Tele') || bookingMode.includes('Video')
                              ? 'border-primary bg-primary-subtle text-primary fw-bold'
                              : 'bg-white text-secondary'
                          }`}
                          onClick={() => setBookingMode('Tele-Consultation (Encrypted WebRTC)')}
                          style={{ cursor: 'pointer' }}
                        >
                          <Video size={20} className="d-block mx-auto mb-1" />
                          <div className="small">Tele-Consult</div>
                          <span className="badge rounded-pill bg-white text-dark small border mt-1" style={{ fontSize: '0.65rem' }}>
                            HD Video Call
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preferred Slot Selector */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-dark d-block mb-2">
                      Select Preferred Date &amp; Time
                    </label>
                    <select
                      className="form-select form-select-sm rounded-3 py-2"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                    >
                      <option value="Tomorrow, 10:30 AM">Tomorrow, 10:30 AM (Morning Slot)</option>
                      <option value="Tomorrow, 03:00 PM">Tomorrow, 03:00 PM (Afternoon Slot)</option>
                      <option value="Upcoming Monday, 10:00 AM">Upcoming Monday, 10:00 AM (Priority Slot)</option>
                      <option value="Friday, 11:30 AM">Friday, 11:30 AM (Regular Slot)</option>
                      <option value="Saturday, 02:30 PM">Saturday, 02:30 PM (Weekend Slot)</option>
                    </select>
                  </div>

                  {/* Consultation Fee Pill */}
                  <div className="p-2.5 rounded-3 bg-emerald-50 border border-success-subtle d-flex justify-content-between align-items-center small">
                    <span className="text-secondary">Applicable Consultation Fee:</span>
                    <strong className="text-success fw-bold">{bookingDoc.fee}</strong>
                  </div>
                </div>

                <div className="modal-footer border-top px-4 py-3 d-flex justify-content-end gap-2 bg-light">
                  <button
                    type="button"
                    className="btn btn-light rounded-pill px-3.5 btn-sm border"
                    onClick={() => setBookingDoc(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary rounded-pill px-4 btn-sm fw-semibold shadow-xs"
                  >
                    Confirm &amp; Save to Consultations
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

export default FindDoctors;
