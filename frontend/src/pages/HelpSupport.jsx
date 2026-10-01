import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRole } from '../context/RoleContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Bot,
  Video,
  Calendar,
  FileText,
  ShieldCheck,
  Headphones,
  MessageSquare,
  Phone,
  Mail,
  ExternalLink,
  AlertTriangle,
  HeartPulse,
  Clock,
  CheckCircle2,
  Download,
  Printer,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Users,
  Building2,
  Send,
  LifeBuoy,
  FileCheck,
  PhoneCall,
  Check
} from 'lucide-react';

// FAQ Dataset organized by category
const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Topics', icon: Sparkles, color: '#0d9488' },
  { id: 'stem-cells', label: 'Stem Cells 101', icon: BookOpen, color: '#8b5cf6' },
  { id: 'appointments', label: 'Doctors & Visits', icon: Video, color: '#2563eb' },
  { id: 'reports', label: 'Reports & Matching', icon: FileText, color: '#0d9488' },
  { id: 'banks', label: 'Biobanks & Costs', icon: Building2, color: '#d97706' },
  { id: 'urgent', label: 'Emergency Guidance', icon: HeartPulse, color: '#e11d48' }
];

const FAQ_DATA = [
  {
    id: 1,
    categoryId: 'stem-cells',
    categoryName: 'Stem Cells 101',
    categoryColor: '#8b5cf6',
    categoryBg: '#f5f3ff',
    question: 'What are stem cells and why are they vital in cellular therapy?',
    summary: 'Stem cells are the body’s master builder cells with the unique capacity to renew and transform into specialized cells.',
    answer:
      'Stem cells are unspecialized precursor cells capable of self-renewal and differentiating into functional blood cells, platelets, and immune components. In hematology, hematopoietic stem cells (HSCs) from bone marrow, peripheral blood, or umbilical cord blood are transplanted to rebuild healthy blood and immune systems in patients with leukemia, thalassemia, or aplastic anemia.',
    actionLabel: 'Explore Interactive Learning',
    actionLink: '/learn'
  },
  {
    id: 2,
    categoryId: 'reports',
    categoryName: 'Reports & Matching',
    categoryColor: '#0d9488',
    categoryBg: '#f0fdfa',
    question: 'How does KOSHIKA AI read and interpret my uploaded diagnostic lab reports?',
    summary: 'Our OCR engine extracts clinical parameters like CD34+ cell counts and hemoglobin with doctor review oversight.',
    answer:
      'When you upload a clinical report (PDF or photo), our medical OCR pipeline scans the document to extract key biomarkers such as CD34+ cell yield, WBC count, and HLA alleles. KOSHIKA provides an educational, non-diagnostic overview to help you understand values before your specialist appointment. Your doctor will review the verified original file during consultation.',
    actionLabel: 'Go to Medical Report OCR',
    actionLink: '/ocr-reports'
  },
  {
    id: 3,
    categoryId: 'reports',
    categoryName: 'Reports & Matching',
    categoryColor: '#0d9488',
    categoryBg: '#f0fdfa',
    question: 'What is a 10/10 HLA match and why does high compatibility matter?',
    summary: 'Human Leukocyte Antigens (HLA) are proteins that help the immune system tell self from non-self.',
    answer:
      'A 10/10 match means all 5 critical HLA gene pairs (HLA-A, B, C, DRB1, DQB1) are identical between donor and recipient. High compatibility dramatically reduces the risk of Graft-versus-Host Disease (GvHD) and promotes rapid donor cell engraftment. Haploidentical (half-match) transplants from parents or children are also feasible with modern clinical protocols.',
    actionLabel: 'Check Compatibility Matcher',
    actionLink: '/ml-match'
  },
  {
    id: 4,
    categoryId: 'appointments',
    categoryName: 'Doctors & Visits',
    categoryColor: '#2563eb',
    categoryBg: '#eff6ff',
    question: 'How do I schedule or reschedule a telehealth video consultation with a specialist?',
    summary: 'Booking takes under 2 minutes through the Telehealth Consultation portal with instant video link generation.',
    answer:
      'Visit the Appointments section to view certified hematologists and transplant specialists. Select an available slot, confirm your appointment, and you will receive a secure video room link. If you need to reschedule, navigate to "My Appointments" up to 4 hours before the session to choose a new time slot without cancellation penalties.',
    actionLabel: 'View Specialist Appointments',
    actionLink: '/appointments'
  },
  {
    id: 5,
    categoryId: 'appointments',
    categoryName: 'Doctors & Visits',
    categoryColor: '#2563eb',
    categoryBg: '#eff6ff',
    question: 'What records should I prepare before speaking with a hematologist?',
    summary: 'Having recent CBC reports, bone marrow biopsy results, and past transfusion logs speeds up care decisions.',
    answer:
      'To make the most of your consultation: 1) Upload your last 3 complete blood counts (CBC); 2) Have your HLA tissue typing report on hand; 3) Note down any current medications and past transfusions; 4) Write down top questions about treatment timeline and side effects. You can also download our Consultation Preparation Checklist below.',
    actionLabel: 'Prepare Health Profile',
    actionLink: '/profile'
  },
  {
    id: 6,
    categoryId: 'stem-cells',
    categoryName: 'Stem Cells 101',
    categoryColor: '#8b5cf6',
    categoryBg: '#f5f3ff',
    question: 'What is the difference between Autologous and Allogeneic transplants?',
    summary: 'Autologous uses your own preserved cells, whereas Allogeneic uses cells donated by a matched person or family member.',
    answer:
      'In an Autologous transplant, your own stem cells are collected and safely frozen before high-dose therapy, then reinfused into your body (often for lymphoma and myeloma). In an Allogeneic transplant, stem cells come from a healthy matched donor (sibling, unrelated volunteer, or cord blood), providing a new immune system capable of fighting diseased cells (graft-versus-leukemia effect).',
    actionLabel: 'Learn in Education Hub',
    actionLink: '/learn'
  },
  {
    id: 7,
    categoryId: 'banks',
    categoryName: 'Biobanks & Costs',
    categoryColor: '#d97706',
    categoryBg: '#fffbeb',
    question: 'How are stem cells cryopreserved and how can I find accredited stem cell banks?',
    summary: 'Cells are stored in liquid nitrogen vapor phase at -196°C to preserve viability for decades.',
    answer:
      'Certified biobanks use controlled-rate freezers and vapor-phase liquid nitrogen storage (-196°C) to keep stem cells viable over long durations. KOSHIKA maintains a verified directory of accredited public and private cord blood and bone marrow banks across India. You can filter banks by location, accreditation standards, and storage options.',
    actionLabel: 'Search Stem Cell Banks',
    actionLink: '/bank'
  },
  {
    id: 8,
    categoryId: 'banks',
    categoryName: 'Biobanks & Costs',
    categoryColor: '#d97706',
    categoryBg: '#fffbeb',
    question: 'Are stem cell therapies covered under health insurance in India?',
    summary: 'Many major health insurance policies now cover approved hematopoietic stem cell transplants under daycare or hospitalization.',
    answer:
      'Approved hematological stem cell transplants for blood cancers, thalassemia, and sickle cell anemia are generally covered under inpatient hospitalization coverage by IRDAI-compliant health insurance providers in India. Pre-authorization and hospital empanelment are required. Experimental or unapproved therapies are not covered.',
    actionLabel: 'Find Empanelled Centres',
    actionLink: '/find-care/centres'
  },
  {
    id: 9,
    categoryId: 'urgent',
    categoryName: 'Emergency Guidance',
    categoryColor: '#e11d48',
    categoryBg: '#fff1f2',
    question: 'What should I do if a transplant patient experiences fever, chills, or sudden bruising?',
    summary: 'Fever above 100.4°F (38°C) in an immunocompromised patient is a medical emergency requiring urgent hospital triage.',
    answer:
      'Do not wait or administer paracetamol without doctor guidance. Patients with low absolute neutrophil counts (neutropenia) have limited immune defense against infections. Contact your primary transplant coordinator immediately or proceed to the nearest emergency department. State clearly that the patient is post-chemotherapy / post-transplant.',
    actionLabel: 'Emergency Contacts',
    actionLink: '#emergency-contacts'
  }
];

// Printable/Viewable Patient Toolkits
const PATIENT_TOOLKITS = [
  {
    id: 'consult-prep',
    title: 'Doctor Visit Prep Checklist',
    tag: 'Consultation Guide',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
    description: '10 essential questions to ask your hematologist regarding diagnosis, conditioning, donor matching, and recovery.',
    badge: '10 Questions',
    items: [
      'What specific type of stem cell transplant (autologous vs allogeneic) is recommended for my condition?',
      'What are the required HLA matching criteria, and how long does the donor search typically take?',
      'What conditioning regimen (chemotherapy or radiation) will be administered before cell infusion?',
      'What is the expected hospital stay duration and intensive monitoring window?',
      'What are the signs of Graft-versus-Host Disease (GvHD) and how will it be monitored?',
      'What dietary, sanitation, and visitor restrictions must our family observe post-discharge?',
      'What are the primary financial and insurance pre-authorization requirements for this treatment?',
      'Who is my designated 24/7 clinical emergency contact during the engraftment phase?'
    ]
  },
  {
    id: 'donor-hla',
    title: 'Patient Guide to HLA Matching',
    tag: 'Tissue Typing',
    color: '#0d9488',
    bg: '#f0fdfa',
    border: '#99f6e4',
    description: 'A friendly illustrated guide on understanding your HLA-A, B, C, DRB1, DQB1 allele test results and donor probabilities.',
    badge: 'Step-by-Step',
    items: [
      'HLA markers are inherited proteins from both parents that define cellular identity.',
      'Full siblings have a 25% chance of being an identical 10/10 match.',
      'Unrelated national registry searches (DATRI, DKMS-BMST) check millions of volunteer donors.',
      'Haploidentical (half-matched) family transplants can be performed safely with post-transplant cyclophosphamide.',
      'High-resolution DNA typing confirms compatibility down to specific molecular alleles.'
    ]
  },
  {
    id: 'recovery-home',
    title: 'Post-Transplant Home Recovery Toolkit',
    tag: 'Caregiver Protocol',
    color: '#059669',
    bg: '#ecfdf5',
    border: '#a7f3d0',
    description: 'Sanitation guidelines, low-microbial diet precautions, and daily temperature logging charts for caregivers.',
    badge: 'Caregiver Ready',
    items: [
      'Daily temperature checks twice a day: Report any reading at or above 100.4°F (38.0°C) immediately.',
      'Safe eating guidelines: Only freshly cooked, steaming hot meals; peel all fruits; avoid raw salads and street food.',
      'Strict hand hygiene: Alcohol hand rubs at every room entrance; caregivers wear surgical masks during close contact.',
      'Medication schedule: Set phone alarms for immunosuppressants (Tacrolimus/Cyclosporine) at identical hours each day.',
      'Infection avoidance: Avoid crowded indoor spaces, indoor pets, and gardening soil during the first 100 days.'
    ]
  }
];

const HelpSupport = () => {
  const { user } = useAuth();
  const { patientProfile } = useRole();
  const { t } = useLanguage();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaqId, setExpandedFaqId] = useState(1);

  // Toolkit modal preview state
  const [activeToolkitModal, setActiveToolkitModal] = useState(null);

  // Care Navigator Contact Form State
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactSubject, setContactSubject] = useState('General Question');
  const [contactUrgency, setContactUrgency] = useState('Routine');
  const [contactMessage, setContactMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Filtered FAQs based on category & search query
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory = selectedCategory === 'all' || faq.categoryId === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesQuery =
        faq.question.toLowerCase().includes(query) ||
        faq.summary.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.categoryName.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;

    const randomTicket = `KSH-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(randomTicket);
    setFormSubmitted(true);
  };

  const handleResetContactModal = () => {
    setShowContactModal(false);
    setFormSubmitted(false);
    setContactMessage('');
    setContactUrgency('Routine');
    setContactSubject('General Question');
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="koshika-animate-fadein pb-5">
      {/* ---------------------------------------------------------------------
          1. CREATIVE, WELCOMING HERO WITH REAL-TIME SEARCH & FILTER CHIPS
      ---------------------------------------------------------------------- */}
      <div
        className="card border-0 rounded-4 p-4 p-md-5 mb-4 position-relative overflow-hidden text-white"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          boxShadow: '0 10px 30px -5px rgba(6, 78, 59, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#ffffff'
        }}
      >
        <div className="position-relative z-1" style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          {/* Subtle top badge */}
          <div 
            className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff'
            }}
          >
            <Sparkles size={15} className="text-warning" />
            <span className="small fw-bold text-uppercase" style={{ color: '#ffffff', fontSize: '0.75rem', letterSpacing: '0.04em' }}>
              Patient Support &amp; Care Guidance
            </span>
          </div>

          <h1
            className="fw-extrabold text-white mb-2"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.35rem)', letterSpacing: '-0.025em', lineHeight: 1.2 }}
          >
            How can we support your care journey today?
          </h1>
          <p
            className="text-white text-opacity-90 mx-auto mb-4"
            style={{ fontSize: '0.96rem', maxWidth: '640px', lineHeight: 1.5 }}
          >
            Find clear answers to stem cell therapy questions, prepare for your specialist visits, understand your medical reports, or connect with our human care team.
          </p>

          {/* Interactive Search Bar (Crisp White Card with Dark Input Text) */}
          <div className="position-relative mx-auto" style={{ maxWidth: '580px' }}>
            <div
              className="d-flex align-items-center rounded-pill px-3.5 py-2 shadow-sm"
              style={{
                backgroundColor: 'var(--k-surface)',
                border: '1.5px solid var(--k-border)',
                boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.15)'
              }}
            >
              <Search size={20} className="me-2.5 flex-shrink-0" style={{ color: 'var(--k-primary)' }} />
              <input
                type="text"
                className="form-control border-0 p-0 shadow-none fw-medium"
                placeholder="Search questions, reports, HLA typing, booking..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: '0.92rem', background: 'transparent', color: 'var(--k-text-primary)' }}
                aria-label="Search help topics"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn btn-link p-0 text-muted border-0 me-2"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* Quick Keyword Suggestion Chips with Dark Legible Text on White */}
            <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap mt-3">
              <span className="small text-white text-opacity-90 me-1" style={{ fontSize: '0.78rem' }}>Popular topics:</span>
              {[
                { label: 'HLA Matching', cat: 'reports' },
                { label: 'Doctor Visit Prep', cat: 'appointments' },
                { label: 'Upload Reports', cat: 'reports' },
                { label: 'Stem Cell Basics', cat: 'stem-cells' },
                { label: 'Urgent Care', cat: 'urgent' }
              ].map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(chip.cat);
                    setSearchQuery(chip.label);
                  }}
                  className="btn btn-sm rounded-pill px-3 py-1 fw-bold shadow-xs hover-translate-y"
                  style={{
                    backgroundColor: 'var(--k-surface)',
                    fontSize: '0.76rem',
                    color: 'var(--k-text-primary)',
                    border: '1px solid var(--k-border)'
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          2. FOUR COLORFUL, VISUAL SUPPORT CHANNELS (SPACIOUS & MODERN)
      ---------------------------------------------------------------------- */}
      <div className="mb-5">
        <div className="d-flex align-items-center justify-content-between mb-3 px-1">
          <div>
            <h2 className="h5 fw-bold text-dark mb-0.5" style={{ fontSize: '1.15rem', letterSpacing: '-0.01em' }}>
              Core Support Channels
            </h2>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.82rem' }}>
              Choose how you would like assistance with your health journey
            </p>
          </div>
        </div>

        <div className="row g-3.5">
          {/* Pillar 1: 24/7 AI Health Companion (Violet / Purple) */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className="card h-100 rounded-4 p-3.5 transition-all"
              style={{
                backgroundColor: 'var(--k-surface)',
                border: '1px solid var(--k-border)',
                boxShadow: '0 2px 8px rgba(139, 92, 246, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: '44px',
                      height: '44px',
                      backgroundColor: 'rgba(124, 58, 237, 0.15)',
                      color: '#a78bfa',
                      border: '1px solid rgba(124, 58, 237, 0.3)'
                    }}
                  >
                    <Bot size={22} />
                  </div>
                  <span
                    className="badge rounded-pill px-2.5 py-1 fw-semibold"
                    style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)', color: '#a78bfa', border: '1px solid rgba(124, 58, 237, 0.3)', fontSize: '0.7rem' }}
                  >
                    24/7 AI Companion
                  </span>
                </div>
                <h3 className="h6 fw-bold text-dark mb-1" style={{ fontSize: '0.98rem' }}>
                  Ask KOSHIKA AI
                </h3>
                <p className="text-secondary mb-3" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
                  Get instant medical term explanations, donor matching concepts, and report questions answered immediately.
                </p>
              </div>

              <Link
                to="/ai-assistant"
                className="btn btn-sm rounded-pill fw-semibold py-2 px-3 d-inline-flex align-items-center justify-content-between text-decoration-none transition-all"
                style={{
                  backgroundColor: '#7c3aed',
                  color: '#ffffff',
                  fontSize: '0.82rem'
                }}
              >
                <span>Open AI Chatbot</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Pillar 2: Doctor & Telehealth Consultations (Blue) */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className="card h-100 rounded-4 p-3.5 transition-all"
              style={{
                backgroundColor: 'var(--k-surface)',
                border: '1px solid var(--k-border)',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: '44px',
                      height: '44px',
                      backgroundColor: 'rgba(37, 99, 235, 0.15)',
                      color: '#60a5fa',
                      border: '1px solid rgba(37, 99, 235, 0.3)'
                    }}
                  >
                    <Video size={22} />
                  </div>
                  <span
                    className="badge rounded-pill px-2.5 py-1 fw-semibold"
                    style={{ backgroundColor: 'rgba(37, 99, 235, 0.15)', color: '#60a5fa', border: '1px solid rgba(37, 99, 235, 0.3)', fontSize: '0.7rem' }}
                  >
                    Telehealth
                  </span>
                </div>
                <h3 className="h6 fw-bold text-dark mb-1" style={{ fontSize: '0.98rem' }}>
                  Specialist Consultations
                </h3>
                <p className="text-secondary mb-3" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
                  Book a 1-on-1 video appointment with accredited hematologists, oncologists, or cellular transplant specialists.
                </p>
              </div>

              <Link
                to="/appointments"
                className="btn btn-sm rounded-pill fw-semibold py-2 px-3 d-inline-flex align-items-center justify-content-between text-decoration-none transition-all"
                style={{
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  fontSize: '0.82rem'
                }}
              >
                <span>Book Appointment</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Pillar 3: Medical Reports & Diagnostics (Teal / Cyan) */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className="card h-100 rounded-4 p-3.5 transition-all"
              style={{
                backgroundColor: 'var(--k-surface)',
                border: '1px solid var(--k-border)',
                boxShadow: '0 2px 8px rgba(13, 148, 136, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: '44px',
                      height: '44px',
                      backgroundColor: 'rgba(13, 148, 136, 0.15)',
                      color: '#2dd4bf',
                      border: '1px solid rgba(13, 148, 136, 0.3)'
                    }}
                  >
                    <FileText size={22} />
                  </div>
                  <span
                    className="badge rounded-pill px-2.5 py-1 fw-semibold"
                    style={{ backgroundColor: 'rgba(13, 148, 136, 0.15)', color: '#2dd4bf', border: '1px solid rgba(13, 148, 136, 0.3)', fontSize: '0.7rem' }}
                  >
                    Smart OCR
                  </span>
                </div>
                <h3 className="h6 fw-bold text-dark mb-1" style={{ fontSize: '0.98rem' }}>
                  Reports &amp; HLA Matching
                </h3>
                <p className="text-secondary mb-3" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
                  Need help uploading flow cytometry or CBC files? Our OCR engine formats them cleanly for doctor evaluation.
                </p>
              </div>

              <Link
                to="/ocr-reports"
                className="btn btn-sm rounded-pill fw-semibold py-2 px-3 d-inline-flex align-items-center justify-content-between text-decoration-none transition-all"
                style={{
                  backgroundColor: '#0d9488',
                  color: '#ffffff',
                  fontSize: '0.82rem'
                }}
              >
                <span>Upload Reports</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Pillar 4: Patient Care Coordinator (Amber / Orange) */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className="card h-100 rounded-4 p-3.5 transition-all"
              style={{
                backgroundColor: 'var(--k-surface)',
                border: '1px solid var(--k-border)',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: '44px',
                      height: '44px',
                      backgroundColor: '#fffbeb',
                      color: '#d97706',
                      border: '1px solid #fde68a'
                    }}
                  >
                    <Headphones size={22} />
                  </div>
                  <span
                    className="badge rounded-pill px-2.5 py-1 fw-semibold"
                    style={{ backgroundColor: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', fontSize: '0.7rem' }}
                  >
                    Human Team
                  </span>
                </div>
                <h3 className="h6 fw-bold text-dark mb-1" style={{ fontSize: '0.98rem' }}>
                  Care Coordinator
                </h3>
                <p className="text-secondary mb-3" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
                  Need personalized guidance navigating hospitals, stem cell banks, or scheduling? Send a direct message.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowContactModal(true)}
                className="btn btn-sm rounded-pill fw-semibold py-2 px-3 d-inline-flex align-items-center justify-content-between text-white border-0 transition-all"
                style={{
                  backgroundColor: '#d97706',
                  fontSize: '0.82rem'
                }}
              >
                <span>Ask Care Team</span>
                <MessageSquare size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          3. EMERGENCY & CRISIS CONTACT STRIP (WARM, CLEAR, NON-ALARMIST)
      ---------------------------------------------------------------------- */}
      <div
        id="emergency-contacts"
        className="card border-0 rounded-4 p-3.5 p-md-4 mb-5"
        style={{
          background: 'linear-gradient(90deg, #fff1f2 0%, #fff7ed 50%, #ffffff 100%)',
          border: '1.5px solid #fecdd3',
          boxShadow: '0 2px 10px rgba(225, 29, 72, 0.04)'
        }}
      >
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
          <div className="d-flex align-items-start gap-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
              style={{
                width: '46px',
                height: '46px',
                backgroundColor: '#ffe4e6',
                color: '#e11d48',
                border: '1px solid #fecdd3'
              }}
            >
              <HeartPulse size={24} />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                <h2 className="h6 fw-bold text-dark mb-0" style={{ fontSize: '1rem' }}>
                  Medical Emergency &amp; Post-Procedure Helpline
                </h2>
                <span
                  className="badge rounded-pill px-2.5 py-0.5 fw-semibold"
                  style={{ backgroundColor: '#e11d48', color: '#ffffff', fontSize: '0.7rem' }}
                >
                  Immediate 24/7
                </span>
              </div>
              <p className="text-secondary small mb-0" style={{ fontSize: '0.84rem', maxWidth: '640px' }}>
                If you or a loved one is experiencing fever (&gt;100.4°F) post-transplant, sudden bleeding, or acute breathing difficulty, seek emergency clinical care immediately.
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <a
              href="tel:18007836435"
              className="btn btn-sm rounded-pill px-3.5 py-2 fw-semibold text-white d-inline-flex align-items-center gap-2 transition-all shadow-xs"
              style={{ backgroundColor: '#e11d48', border: '1px solid #e11d48', fontSize: '0.82rem' }}
            >
              <PhoneCall size={15} />
              <span>1800-STEM-HELP</span>
            </a>
            <a
              href="tel:112"
              className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1.5"
              style={{ fontSize: '0.82rem' }}
            >
              <span>National 112</span>
            </a>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          4. FREQUENTLY ASKED QUESTIONS (SEARCHABLE, SPACIOUS ACCORDION)
      ---------------------------------------------------------------------- */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-lg-8">
          <div
            className="card border-0 rounded-4 p-4 bg-white"
            style={{
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)'
            }}
          >
            {/* Header & Category Filter Tabs */}
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom flex-wrap gap-2">
              <div>
                <h2 className="h6 fw-bold text-dark mb-0.5" style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
                  Frequently Asked Questions
                </h2>
                <p className="text-secondary small mb-0" style={{ fontSize: '0.8rem' }}>
                  Clear, verified medical guidance explained in everyday language
                </p>
              </div>

              <span
                className="badge rounded-pill px-2.5 py-1 small fw-semibold"
                style={{ backgroundColor: '#f0fdfa', color: '#0d9488', border: '1px solid #ccfbf1', fontSize: '0.74rem' }}
              >
                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'Answer' : 'Answers'} Available
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="d-flex align-items-center gap-2 overflow-auto pb-2 mb-3" style={{ scrollbarWidth: 'none' }}>
              {FAQ_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className="btn btn-sm rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5 text-nowrap transition-all"
                    style={{
                      backgroundColor: isActive ? '#0d9488' : '#f8fafc',
                      color: isActive ? '#ffffff' : '#64748b',
                      border: isActive ? '1px solid #0d9488' : '1px solid #e2e8f0',
                      fontSize: '0.78rem'
                    }}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Accordion Questions List */}
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                  style={{ width: '54px', height: '54px', backgroundColor: '#f1f5f9', color: '#94a3b8' }}
                >
                  <Search size={24} />
                </div>
                <h3 className="h6 fw-bold text-dark mb-1">No matching questions found</h3>
                <p className="text-secondary small mb-3" style={{ maxWidth: '360px', margin: '0 auto' }}>
                  We couldn’t find an exact match for &quot;{searchQuery}&quot;. Try resetting your filters or submit a question directly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1.5 me-2"
                  style={{ fontSize: '0.8rem' }}
                >
                  Reset Search
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactModal(true)}
                  className="btn btn-sm rounded-pill px-3.5 py-1.5 text-white"
                  style={{ backgroundColor: '#0d9488', fontSize: '0.8rem' }}
                >
                  Ask Our Team
                </button>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {filteredFaqs.map((faq) => {
                  const isExpanded = expandedFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="rounded-3 transition-all"
                      style={{
                        backgroundColor: isExpanded ? '#ffffff' : '#f8fafc',
                        border: isExpanded ? `1.5px solid ${faq.categoryColor}` : '1px solid #e2e8f0',
                        boxShadow: isExpanded ? '0 3px 12px rgba(15, 23, 42, 0.05)' : 'none',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Accordion Header */}
                      <button
                        type="button"
                        onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                        className="w-100 text-start p-3.5 d-flex align-items-start justify-content-between gap-3 bg-transparent border-0"
                        style={{ cursor: 'pointer' }}
                        aria-expanded={isExpanded}
                      >
                        <div className="d-flex flex-column gap-1">
                          <div className="d-flex align-items-center gap-2">
                            <span
                              className="badge rounded-pill px-2 py-0.5 fw-semibold"
                              style={{
                                backgroundColor: faq.categoryBg,
                                color: faq.categoryColor,
                                fontSize: '0.68rem',
                                border: `1px solid ${faq.categoryColor}25`
                              }}
                            >
                              {faq.categoryName}
                            </span>
                          </div>
                          <span
                            className="fw-bold text-dark"
                            style={{ fontSize: '0.94rem', lineHeight: 1.35 }}
                          >
                            {faq.question}
                          </span>
                        </div>

                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0 mt-0.5 transition-all"
                          style={{
                            width: '28px',
                            height: '28px',
                            backgroundColor: isExpanded ? faq.categoryBg : '#e2e8f0',
                            color: isExpanded ? faq.categoryColor : '#64748b'
                          }}
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>

                      {/* Accordion Body */}
                      {isExpanded && (
                        <div className="px-3.5 pb-3.5 pt-1 border-top" style={{ borderColor: '#f1f5f9' }}>
                          <p
                            className="text-secondary mb-3"
                            style={{ fontSize: '0.86rem', lineHeight: 1.55 }}
                          >
                            {faq.answer}
                          </p>

                          {faq.actionLink && (
                            <div className="pt-2 d-flex align-items-center justify-content-between border-top flex-wrap gap-2" style={{ borderColor: '#f8fafc' }}>
                              <Link
                                to={faq.actionLink}
                                className="small fw-semibold text-decoration-none d-inline-flex align-items-center gap-1.5 transition-all"
                                style={{ color: faq.categoryColor, fontSize: '0.8rem' }}
                              >
                                <span>{faq.actionLabel}</span>
                                <ExternalLink size={13} />
                              </Link>

                              <button
                                type="button"
                                onClick={() => setShowContactModal(true)}
                                className="btn btn-link p-0 small text-muted text-decoration-none"
                                style={{ fontSize: '0.74rem' }}
                              >
                                Need more clarification?
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Direct Help & Guided Quick Actions */}
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-column gap-4">
            {/* Quick Contact Box */}
            <div
              className="card border-0 rounded-4 p-4 bg-white"
              style={{
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)'
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{ width: '36px', height: '36px', backgroundColor: '#f0fdfa', color: '#0d9488' }}
                >
                  <LifeBuoy size={20} />
                </div>
                <div>
                  <h3 className="h6 fw-bold text-dark mb-0" style={{ fontSize: '0.96rem' }}>
                    Need 1-on-1 Assistance?
                  </h3>
                  <span className="text-secondary small" style={{ fontSize: '0.76rem' }}>
                    Our team is here to support you
                  </span>
                </div>
              </div>

              <p className="text-secondary small mb-3.5" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
                Have questions about treatment timelines, biobanking certificates, or doctor appointments?
              </p>

              <div className="d-flex flex-column gap-2 mb-3.5">
                <a
                  href="mailto:support@koshika.org"
                  className="p-2.5 rounded-3 d-flex align-items-center gap-3 text-decoration-none transition-all"
                  style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a' }}
                >
                  <Mail size={16} className="text-primary flex-shrink-0" />
                  <div className="overflow-hidden">
                    <div className="small fw-semibold" style={{ fontSize: '0.8rem' }}>Email Support</div>
                    <div className="small text-muted text-truncate" style={{ fontSize: '0.72rem' }}>support@koshika.org</div>
                  </div>
                </a>

                <a
                  href="tel:18007836435"
                  className="p-2.5 rounded-3 d-flex align-items-center gap-3 text-decoration-none transition-all"
                  style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a' }}
                >
                  <Phone size={16} className="text-success flex-shrink-0" />
                  <div>
                    <div className="small fw-semibold" style={{ fontSize: '0.8rem' }}>Toll-Free Helpline</div>
                    <div className="small text-muted" style={{ fontSize: '0.72rem' }}>1800-783-6435 (Mon-Sat 8AM-8PM)</div>
                  </div>
                </a>

                <Link
                  to="/ai-assistant"
                  className="p-2.5 rounded-3 d-flex align-items-center gap-3 text-decoration-none transition-all"
                  style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a' }}
                >
                  <Sparkles size={16} style={{ color: '#7c3aed' }} className="flex-shrink-0" />
                  <div>
                    <div className="small fw-semibold" style={{ fontSize: '0.8rem' }}>KOSHIKA AI Assistant</div>
                    <div className="small text-muted" style={{ fontSize: '0.72rem' }}>Immediate automated answers</div>
                  </div>
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setShowContactModal(true)}
                className="btn btn-sm rounded-pill w-100 py-2 fw-semibold text-white border-0 transition-all shadow-xs"
                style={{ backgroundColor: '#0d9488', fontSize: '0.82rem' }}
              >
                Send Message to Care Navigator
              </button>
            </div>

            {/* Feedback / Quality Assurance Card */}
            <div
              className="card border-0 rounded-4 p-3.5"
              style={{
                backgroundColor: '#f8fafc',
                border: '1px dashed #cbd5e1'
              }}
            >
              <div className="d-flex align-items-start gap-2.5">
                <ShieldCheck size={20} className="text-teal flex-shrink-0 mt-0.5" style={{ color: '#0d9488' }} />
                <div>
                  <h4 className="fw-bold text-dark mb-1" style={{ fontSize: '0.88rem' }}>
                    Patient Data Privacy
                  </h4>
                  <p className="text-secondary small mb-0" style={{ fontSize: '0.78rem', lineHeight: 1.4 }}>
                    All patient queries and uploaded health reports are protected by HIPAA-aligned encryption standards and are never sold or shared.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          5. DOWNLOADABLE PATIENT TOOLKITS & CHECKLISTS (CLEAN & VISUAL)
      ---------------------------------------------------------------------- */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3 px-1">
          <div>
            <h2 className="h5 fw-bold text-dark mb-0.5" style={{ fontSize: '1.15rem', letterSpacing: '-0.01em' }}>
              Downloadable Patient Toolkits
            </h2>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.82rem' }}>
              Printable checklists, appointment questions, and recovery guides for you and your family
            </p>
          </div>
        </div>

        <div className="row g-3.5">
          {PATIENT_TOOLKITS.map((toolkit) => (
            <div key={toolkit.id} className="col-12 col-md-4">
              <div
                className="card h-100 rounded-4 p-3.5 border-0 bg-white transition-all"
                style={{
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2.5">
                    <span
                      className="badge rounded-pill px-2.5 py-0.5 fw-semibold"
                      style={{
                        backgroundColor: toolkit.bg,
                        color: toolkit.color,
                        border: `1px solid ${toolkit.border}`,
                        fontSize: '0.7rem'
                      }}
                    >
                      {toolkit.tag}
                    </span>
                    <span className="small text-muted" style={{ fontSize: '0.72rem' }}>
                      {toolkit.badge}
                    </span>
                  </div>

                  <h3 className="h6 fw-bold text-dark mb-1.5" style={{ fontSize: '0.96rem' }}>
                    {toolkit.title}
                  </h3>

                  <p className="text-secondary small mb-3" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
                    {toolkit.description}
                  </p>
                </div>

                <div className="pt-2 border-top d-flex align-items-center justify-content-between" style={{ borderColor: '#f1f5f9' }}>
                  <button
                    type="button"
                    onClick={() => setActiveToolkitModal(toolkit)}
                    className="btn btn-sm btn-link p-0 text-decoration-none fw-semibold d-inline-flex align-items-center gap-1.5"
                    style={{ color: toolkit.color, fontSize: '0.8rem' }}
                  >
                    <FileCheck size={15} />
                    <span>Preview &amp; Checklist</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveToolkitModal(toolkit)}
                    className="btn btn-sm rounded-pill p-1.5"
                    style={{ backgroundColor: toolkit.bg, color: toolkit.color }}
                    title="View details"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          MODAL 1: TOOLKIT CHECKLIST PREVIEW & PRINT MODAL
      ---------------------------------------------------------------------- */}
      {activeToolkitModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
              {/* Modal Header */}
              <div
                className="modal-header px-4 py-3 border-bottom"
                style={{
                  backgroundColor: activeToolkitModal.bg,
                  borderBottomColor: activeToolkitModal.border
                }}
              >
                <div className="d-flex align-items-center gap-2.5">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: '#ffffff',
                      color: activeToolkitModal.color,
                      border: `1px solid ${activeToolkitModal.border}`
                    }}
                  >
                    <FileText size={18} />
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-0" style={{ color: activeToolkitModal.color, fontSize: '1rem' }}>
                      {activeToolkitModal.title}
                    </h3>
                    <span className="small text-muted" style={{ fontSize: '0.74rem' }}>
                      {activeToolkitModal.tag} • KOSHIKA Patient Guide
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setActiveToolkitModal(null)}
                  aria-label="Close"
                />
              </div>

              {/* Modal Body */}
              <div className="modal-body p-4" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
                <p className="text-secondary small mb-3.5" style={{ fontSize: '0.86rem', lineHeight: 1.5 }}>
                  {activeToolkitModal.description} Check off items as you prepare with your care team or family:
                </p>

                <div className="d-flex flex-column gap-2.5 mb-4">
                  {activeToolkitModal.items.map((item, idx) => (
                    <label
                      key={idx}
                      className="p-3 rounded-3 d-flex align-items-start gap-3 transition-all"
                      style={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input mt-1 flex-shrink-0"
                        style={{ width: '18px', height: '18px', accentColor: activeToolkitModal.color }}
                      />
                      <span className="text-dark small" style={{ fontSize: '0.85rem', lineHeight: 1.45 }}>
                        {item}
                      </span>
                    </label>
                  ))}
                </div>

                <div
                  className="p-3 rounded-3 d-flex align-items-center gap-3"
                  style={{ backgroundColor: '#f0fdfa', border: '1px solid #99f6e4' }}
                >
                  <ShieldCheck size={20} style={{ color: '#0d9488' }} className="flex-shrink-0" />
                  <span className="small text-dark" style={{ fontSize: '0.78rem' }}>
                    Tip: Bring this printed checklist to your clinical video consultation or hospital visit.
                  </span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer px-4 py-3 bg-light border-top">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5"
                  style={{ fontSize: '0.82rem' }}
                >
                  <Printer size={15} />
                  <span>Print Checklist</span>
                </button>
                <button
                  type="button"
                  className="btn btn-sm rounded-pill px-4 py-1.5 text-white"
                  style={{ backgroundColor: activeToolkitModal.color, fontSize: '0.82rem' }}
                  onClick={() => setActiveToolkitModal(null)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 2: "ASK A CARE NAVIGATOR" SIMPLE MESSAGE MODAL
      ---------------------------------------------------------------------- */}
      {showContactModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(3px)', zIndex: 1060 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
              {/* Header */}
              <div
                className="modal-header px-4 py-3 border-bottom"
                style={{ backgroundColor: '#f0fdfa', borderBottomColor: '#ccfbf1' }}
              >
                <div className="d-flex align-items-center gap-2.5">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{ width: '36px', height: '36px', backgroundColor: '#0d9488', color: '#ffffff' }}
                  >
                    <Headphones size={18} />
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-0 text-dark" style={{ fontSize: '0.98rem' }}>
                      Message a Care Navigator
                    </h3>
                    <span className="small text-muted" style={{ fontSize: '0.74rem' }}>
                      Response typically within 4 business hours
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={handleResetContactModal}
                  aria-label="Close"
                />
              </div>

              {/* Form Content */}
              <div className="modal-body p-4">
                {formSubmitted ? (
                  <div className="text-center py-4">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                      style={{ width: '56px', height: '56px', backgroundColor: '#ecfdf5', color: '#059669' }}
                    >
                      <Check size={28} />
                    </div>
                    <h3 className="h5 fw-bold text-dark mb-1">Message Sent Successfully!</h3>
                    <p className="text-secondary small mb-3" style={{ maxWidth: '340px', margin: '0 auto', fontSize: '0.84rem' }}>
                      Your ticket reference is <strong className="text-dark">{ticketId}</strong>. A dedicated patient coordinator will respond via email or phone shortly.
                    </p>
                    <div
                      className="p-3 rounded-3 mb-4 text-start small text-secondary"
                      style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '0.78rem' }}
                    >
                      <div>• Topic: <strong>{contactSubject}</strong></div>
                      <div>• Urgency: <strong>{contactUrgency}</strong></div>
                      <div>• Patient Contact: <strong>{user?.email || 'Registered Email'}</strong></div>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetContactModal}
                      className="btn btn-sm rounded-pill px-4 py-2 text-white"
                      style={{ backgroundColor: '#0d9488', fontSize: '0.84rem' }}
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit}>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-dark mb-1" style={{ fontSize: '0.8rem' }}>
                        What do you need assistance with?
                      </label>
                      <select
                        className="form-select form-select-sm rounded-3 text-dark"
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        style={{ fontSize: '0.84rem' }}
                      >
                        <option value="General Question">General Stem Cell Questions</option>
                        <option value="Consultation & Appointments">Doctor Appointment Help</option>
                        <option value="Report OCR & Diagnostics">Understanding My Lab Reports</option>
                        <option value="HLA Matching & Donors">HLA Matching &amp; Donor Search</option>
                        <option value="Biobank & Storage">Biobanking &amp; Preserved Samples</option>
                        <option value="Other">Other Care Support</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-dark mb-1" style={{ fontSize: '0.8rem' }}>
                        Urgency Level
                      </label>
                      <div className="d-flex align-items-center gap-2">
                        {['Routine', 'Important', 'Urgent'].map((level) => {
                          const isSelected = contactUrgency === level;
                          return (
                            <button
                              key={level}
                              type="button"
                              onClick={() => setContactUrgency(level)}
                              className="btn btn-sm flex-grow-1 rounded-3 py-1.5 fw-semibold transition-all"
                              style={{
                                backgroundColor: isSelected ? (level === 'Urgent' ? '#e11d48' : '#0d9488') : '#f8fafc',
                                color: isSelected ? '#ffffff' : '#475569',
                                border: isSelected ? '1px solid transparent' : '1px solid #e2e8f0',
                                fontSize: '0.78rem'
                              }}
                            >
                              {level}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-dark mb-1" style={{ fontSize: '0.8rem' }}>
                        How can we help? (Please describe your query)
                      </label>
                      <textarea
                        rows={4}
                        required
                        className="form-control rounded-3 text-dark"
                        placeholder="Please share details such as your diagnosis, doctor question, or report file issue..."
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        style={{ fontSize: '0.84rem' }}
                      />
                    </div>

                    <div className="d-flex align-items-center justify-content-end gap-2 pt-2 border-top">
                      <button
                        type="button"
                        className="btn btn-sm btn-light rounded-pill px-3 py-1.5"
                        onClick={handleResetContactModal}
                        style={{ fontSize: '0.82rem' }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-sm rounded-pill px-4 py-1.5 text-white d-inline-flex align-items-center gap-1.5"
                        style={{ backgroundColor: '#0d9488', fontSize: '0.82rem' }}
                      >
                        <Send size={14} />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupport;
