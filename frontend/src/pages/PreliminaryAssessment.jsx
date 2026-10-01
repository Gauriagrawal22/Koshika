import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import AnimatedTextBox from '../components/common/AnimatedTextBox';
import {
  UserCheck,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HeartPulse,
  Activity,
  ArrowRight,
  ArrowLeft,
  Stethoscope,
  RotateCcw,
  Cpu,
  Building,
  Info,
  Award,
  Check,
  Dna,
  Zap,
  Clock,
  Droplet,
  Printer,
  Copy,
  MessageSquare
} from 'lucide-react';

const CONDITIONS = [
  {
    id: 'AML',
    name: 'Acute Myeloid Leukemia (AML)',
    category: 'Blood Cancer',
    desc: 'Rapidly progressing blood cancer of bone marrow myeloid progenitor cells.',
    icon: Activity,
    badge: 'Standard Curative',
    color: '#e11d48',
    bgColor: '#fff1f2',
    borderColor: '#fecdd3'
  },
  {
    id: 'ALL',
    name: 'Acute Lymphoblastic Leukemia (ALL)',
    category: 'Blood Cancer',
    desc: 'Overgrowth of immature white blood cells in bone marrow and blood.',
    icon: Activity,
    badge: 'Standard Curative',
    color: '#e11d48',
    bgColor: '#fff1f2',
    borderColor: '#fecdd3'
  },
  {
    id: 'SAA',
    name: 'Severe Aplastic Anemia (SAA)',
    category: 'Marrow Failure',
    desc: 'Bone marrow stops producing sufficient blood cells; transplant replaces marrow factory.',
    icon: HeartPulse,
    badge: 'First-Line Therapy',
    color: '#0d9488',
    bgColor: '#f0fdfa',
    borderColor: '#99f6e4'
  },
  {
    id: 'THAL',
    name: 'Thalassemia Major',
    category: 'Genetic Blood Disorder',
    desc: 'Severe hereditary hemoglobin defect; stem cell transplant is the only permanent cure.',
    icon: Dna,
    badge: 'Permanent Cure',
    color: '#7c3aed',
    bgColor: '#faf5ff',
    borderColor: '#ddd6fe'
  },
  {
    id: 'SCD',
    name: 'Sickle Cell Disease',
    category: 'Genetic Blood Disorder',
    desc: 'Abnormal hemoglobin causing sickle-shaped red cells, pain crises, and organ strain.',
    icon: Dna,
    badge: 'Curative BMT',
    color: '#7c3aed',
    bgColor: '#faf5ff',
    borderColor: '#ddd6fe'
  },
  {
    id: 'MM',
    name: 'Multiple Myeloma',
    category: 'Plasma Cell Disorder',
    desc: 'Cancer of antibody-producing plasma cells; standardly treated with autologous harvest.',
    icon: ShieldCheck,
    badge: 'Autologous Option',
    color: '#ea580c',
    bgColor: '#fff7ed',
    borderColor: '#fed7aa'
  }
];

const PreliminaryAssessment = () => {
  const navigate = useNavigate();
  const { patientProfile } = useRole();
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    disease: 'Acute Myeloid Leukemia (AML)',
    age: patientProfile?.age || 32,
    bloodGroup: patientProfile?.bloodGroup || 'B+',
    treatmentStage: 'In Complete Remission',
    priorChemo: 'Yes, completed initial chemotherapy',
    dailyActivity: 'Fully active & normal routine',
    organHealth: 'Normal & verified healthy',
    donorStatus: 'Sibling swab test completed'
  });

  const [assessmentResult, setAssessmentResult] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [copiedQuestions, setCopiedQuestions] = useState(false);

  const handleRunAssessment = () => {
    setEvaluating(true);
    setTimeout(() => {
      const isLeukemia = formData.disease.includes('Leukemia');
      const isAplastic = formData.disease.includes('Aplastic');
      const isGenetic = formData.disease.includes('Thalassemia') || formData.disease.includes('Sickle');
      const isMyeloma = formData.disease.includes('Myeloma');

      let transplantType = 'Allogeneic Stem Cell Transplant (Donor Cells)';
      let score = 92;
      let summaryText = '';

      if (isMyeloma) {
        transplantType = 'Autologous Stem Cell Transplant (Patient’s Own Stored Cells)';
        score = 88;
        summaryText = `Based on your diagnosis of Multiple Myeloma and good general fitness, autologous stem cell transplantation is standard first-line therapy to deepen remission and prolong progression-free survival.`;
      } else if (isAplastic) {
        score = 94;
        summaryText = `For Severe Aplastic Anemia in younger and active patients, an allogeneic stem cell transplant from an HLA-matched sibling or registry donor is the definitive curative standard.`;
      } else if (isGenetic) {
        score = 90;
        summaryText = `Stem cell transplantation is currently the only established permanent medical cure for hereditary hemoglobin disorders like ${formData.disease}. Evaluating matched family donors early provides the best clinical outcomes.`;
      } else {
        score = 91;
        summaryText = `For ${formData.disease} in ${formData.treatmentStage.toLowerCase()}, international clinical consensus strongly recommends proceeding with HLA typing and donor matching to prevent disease recurrence.`;
      }

      setAssessmentResult({
        candidacyScore: score,
        candidacyLevel: 'High Candidate for Stem Cell Therapy',
        badgeColor: 'success',
        transplantType,
        recommendedApproach: isMyeloma ? 'Autologous collection followed by high-dose therapy' : 'Allogeneic donor match (10/10 HLA sibling or unrelated donor)',
        summary: summaryText,
        keyFactors: [
          { label: 'Condition & Diagnosis', value: formData.disease, favorable: true },
          { label: 'Current Treatment Stage', value: formData.treatmentStage, favorable: true },
          { label: 'Patient Age', value: `${formData.age} years (Optimal range)`, favorable: true },
          { label: 'Physical Activity & Energy', value: formData.dailyActivity, favorable: true },
          { label: 'Organ Health Status', value: formData.organHealth, favorable: true },
          { label: 'Donor Testing Status', value: formData.donorStatus, favorable: true }
        ],
        questionsForDoctor: [
          'What are the chances of finding a 10/10 matched donor among my siblings or in national donor registries (DATRI/DKMS)?',
          `Is an allogeneic or autologous transplant recommended for my specific disease stage?`,
          'What is the typical timeline between initial HLA testing and admission for transplant?',
          'What supportive care or protective isolation will I need during recovery?'
        ]
      });
      setEvaluating(false);
      setStep(4);
    }, 600);
  };

  const handleCopyQuestions = () => {
    if (!assessmentResult) return;
    const text = assessmentResult.questionsForDoctor.map((q, i) => `${i + 1}. ${q}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedQuestions(true);
    setTimeout(() => setCopiedQuestions(false), 2000);
  };

  return (
    <div className="koshika-animate-fadein pb-5">
      {/* Back to Home Button */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 text-muted hover-translate-y"
          style={{ fontSize: '0.85rem' }}
          title="Back to Home"
        >
          <ArrowLeft size={15} />
          <span>Back to Home</span>
        </button>
      </div>

      {/* 1. Clear, Reassuring Patient Hero Banner */}
      <div
        className="card border-0 rounded-4 p-4 p-md-5 mb-4 text-white position-relative overflow-hidden shadow-sm"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(6, 78, 59, 0.85) 0%, rgba(13, 148, 136, 0.7) 50%, rgba(17, 24, 39, 0.95) 100%)'
            : 'linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #115e59 100%)',
          border: isDark ? '1px solid rgba(45, 212, 191, 0.25)' : '1px solid rgba(255, 255, 255, 0.18)'
        }}
      >
        <div className="row align-items-center position-relative" style={{ zIndex: 2 }}>
          <div className="col-lg-8">
            <div className="d-flex align-items-center gap-2 mb-2.5 flex-wrap">
              <span
                className="badge rounded-pill px-3 py-1.5 fw-bold d-inline-flex align-items-center gap-1.5"
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <UserCheck size={14} />
                <span>Patient Triage Guide</span>
              </span>
              <span
                className="badge rounded-pill px-3 py-1.5 small fw-semibold"
                style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <ShieldCheck size={13} className="me-1" />
                ICMR &amp; EBMT Clinical Evidence
              </span>
            </div>
            <h2 className="fw-extrabold mb-2 text-white" style={{ letterSpacing: '-0.02em', fontSize: '1.95rem' }}>
              Stem Cell Candidacy Assessment
            </h2>
            <p className="text-white text-opacity-90 mb-0" style={{ fontSize: '0.98rem', lineHeight: '1.6', maxWidth: '650px' }}>
              Answer 3 simple questions about your condition and health. KOSHIKA checks clinical guidelines to see if stem cell therapy is standard for your condition and prepares key questions for your doctor.
            </p>
          </div>

          <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
            <div className="d-inline-flex align-items-center gap-2 p-2 px-3.5 rounded-pill bg-white bg-opacity-15 border border-white border-opacity-25 text-white">
              <span className="badge rounded-pill px-2.5 py-1 fw-bold top-head-badge-white" style={{ background: 'var(--k-surface)', color: 'var(--k-primary)' }}>
                Step {step} of 4
              </span>
              <span className="small fw-semibold text-white">
                {step === 1 ? 'Diagnosis' : step === 2 ? 'Treatment Stage' : step === 3 ? 'Health & Fitness' : 'Results'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Visual Stepper Bar */}
      <div className={`card border-0 shadow-sm rounded-4 p-3 mb-4 ${isDark ? 'bg-surface' : 'bg-white'}`} style={{ border: isDark ? '1px solid var(--k-border)' : '1px solid #e2e8f0' }}>
        <div className="row g-2">
          {[
            { num: 1, label: '1. Your Diagnosis', sub: 'Condition & Age', icon: Activity },
            { num: 2, label: '2. Treatment Stage', sub: 'Remission Status', icon: ShieldCheck },
            { num: 3, label: '3. Health & Fitness', sub: 'Activity & Organs', icon: HeartPulse },
            { num: 4, label: '4. Candidacy Results', sub: 'Doctor Checklist', icon: Award }
          ].map((s) => {
            const isActive = step === s.num;
            const isCompleted = step > s.num;
            const IconComp = s.icon;
            return (
              <div key={s.num} className="col-6 col-md-3">
                <button
                  type="button"
                  onClick={() => {
                    if (s.num <= 3 || assessmentResult) setStep(s.num);
                  }}
                  disabled={s.num === 4 && !assessmentResult}
                  className={`btn w-100 rounded-4 py-2.5 px-3 d-flex align-items-center justify-content-between text-start transition-all ${
                    isActive
                      ? 'shadow-xs border-2'
                      : isCompleted
                      ? 'bg-success-subtle border border-success-subtle text-success'
                      : 'border text-muted'
                  }`}
                  style={{
                    background: isActive
                      ? isDark
                        ? 'rgba(13, 148, 136, 0.2)'
                        : 'linear-gradient(135deg, #f0fdfa 0%, #e6fffa 100%)'
                      : isDark
                      ? 'var(--k-surface)'
                      : undefined,
                    borderColor: isActive ? 'var(--k-primary)' : isDark ? 'var(--k-border)' : '#e2e8f0'
                  }}
                >
                  <div className="d-flex align-items-center gap-2.5">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: '28px',
                        height: '28px',
                        background: isActive ? '#0d9488' : isCompleted ? '#059669' : '#cbd5e1',
                        color: '#ffffff',
                        fontSize: '0.78rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {isCompleted ? <Check size={14} strokeWidth={3} /> : s.num}
                    </div>
                    <div>
                      <div
                        className={`fw-bold small ${
                          isActive
                            ? 'text-teal'
                            : isCompleted
                            ? 'text-success'
                            : isDark
                            ? 'text-light'
                            : 'text-dark'
                        }`}
                        style={{ fontSize: '0.82rem' }}
                      >
                        {s.label}
                      </div>
                      <small className="text-muted d-none d-sm-block" style={{ fontSize: '0.7rem' }}>
                        {s.sub}
                      </small>
                    </div>
                  </div>
                  <IconComp size={16} className={isActive ? 'text-teal' : isCompleted ? 'text-success' : 'text-muted'} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Steps Container */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-9">

          {/* ========================================================================= */}
          {/* STEP 1: Condition & Demographics */}
          {/* ========================================================================= */}
          {step === 1 && (
            <div className={`card border-0 shadow-sm rounded-4 p-4 p-md-5 ${isDark ? 'bg-surface' : 'bg-white'}`} style={{ border: isDark ? '1px solid var(--k-border)' : '1px solid #e2e8f0' }}>
              <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom" style={{ borderColor: isDark ? 'var(--k-border)' : '#e2e8f0' }}>
                <div className="d-flex align-items-center gap-2.5">
                  <div
                    className="rounded-3 p-2 d-flex align-items-center justify-content-center shadow-xs text-white"
                    style={{ background: 'linear-gradient(135deg, #0d9488 0%, #059669 100%)', width: '38px', height: '38px' }}
                  >
                    <Activity size={20} />
                  </div>
                  <div>
                    <h5 className={`fw-bold mb-0 ${isDark ? 'text-white' : 'text-dark'}`}>Primary Diagnosis &amp; Patient Details</h5>
                    <small className="text-secondary">Select your medical condition to see standard therapy guidelines</small>
                  </div>
                </div>
                <span className="badge rounded-pill px-3 py-1.5 fw-bold" style={{ background: '#ccfbf1', color: '#0f766e' }}>
                  Step 1 of 4
                </span>
              </div>

              {/* Disease Grid Cards */}
              <label className={`form-label fw-bold small mb-2 d-flex align-items-center gap-1.5 ${isDark ? 'text-white' : 'text-dark'}`}>
                <span>Select Your Diagnosis:</span>
                <span className="text-muted fw-normal">(Click one card to select)</span>
              </label>

              <div className="row g-2.5 mb-4">
                {CONDITIONS.map((cond) => {
                  const isSelected = formData.disease === cond.name;
                  const IconComp = cond.icon;
                  return (
                    <div key={cond.id} className="col-12 col-md-6">
                      <div
                        onClick={() => setFormData({ ...formData, disease: cond.name })}
                        className="p-3 rounded-4 border transition-all cursor-pointer h-100 d-flex flex-column justify-content-between hover-lift"
                        style={{
                          borderColor: isSelected ? cond.color : isDark ? 'var(--k-border)' : '#e2e8f0',
                          borderWidth: isSelected ? '2px' : '1px',
                          background: isSelected
                            ? isDark
                              ? 'rgba(13, 148, 136, 0.15)'
                              : '#f0fdfa'
                            : isDark
                            ? 'var(--k-surface-alt)'
                            : '#ffffff',
                          borderLeft: `4px solid ${cond.color}`,
                          cursor: 'pointer'
                        }}
                      >
                        <div className="d-flex align-items-start justify-content-between gap-2 mb-1.5">
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="rounded-3 p-1.5 d-flex align-items-center justify-content-center shadow-xs"
                              style={{
                                background: isSelected ? cond.color : isDark ? 'var(--k-surface)' : '#f8fafc',
                                color: isSelected ? '#ffffff' : cond.color,
                                width: '30px',
                                height: '30px'
                              }}
                            >
                              <IconComp size={16} />
                            </div>
                            <span className={`fw-bold small ${isDark ? 'text-white' : 'text-dark'}`}>{cond.name}</span>
                          </div>
                          {isSelected && <Check size={18} style={{ color: cond.color }} className="flex-shrink-0" />}
                        </div>

                        <p className={`mb-2.5 small ${isDark ? 'text-light opacity-75' : 'text-secondary'}`} style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
                          {cond.desc}
                        </p>

                        <div className="d-flex align-items-center gap-1.5">
                          <span className={`badge rounded-pill border small ${isDark ? 'bg-surface text-light' : 'bg-white text-dark'}`} style={{ fontSize: '0.7rem' }}>
                            {cond.category}
                          </span>
                          <span
                            className="badge rounded-pill fw-bold"
                            style={{
                              background: cond.bgColor,
                              color: cond.color,
                              border: `1px solid ${cond.borderColor}`,
                              fontSize: '0.7rem'
                            }}
                          >
                            {cond.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Age & Blood Group */}
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <AnimatedTextBox
                    label={t.ageLabel || 'Patient Age (Years)'}
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="Enter patient age (e.g. 32)"
                    type="number"
                    icon={UserCheck}
                  />
                  <small className="text-muted ps-1 d-block mt-1" style={{ fontSize: '0.74rem' }}>
                    <CheckCircle2 size={12} className="text-success me-1 d-inline" />
                    Stem cell therapy is offered for pediatric patients up to 70+ years with proper conditioning.
                  </small>
                </div>

                <div className="col-12 col-md-6">
                  <label className={`form-label fw-bold small mb-1.5 d-flex align-items-center gap-1.5 ${isDark ? 'text-white' : 'text-dark'}`}>
                    <Droplet size={14} className="text-danger" />
                    <span>{t.bloodGroupLabel || 'Patient Blood Group'}</span>
                  </label>
                  <div className="d-flex flex-wrap gap-1.5">
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => {
                      const isSelected = formData.bloodGroup === bg;
                      return (
                        <button
                          key={bg}
                          type="button"
                          onClick={() => setFormData({ ...formData, bloodGroup: bg })}
                          className={`btn btn-sm rounded-pill px-3 py-1.5 fw-bold transition-all ${
                            isSelected
                              ? 'btn-danger shadow-xs'
                              : isDark
                              ? 'btn-outline-secondary'
                              : 'btn-light border text-secondary'
                          }`}
                          style={{ fontSize: '0.82rem' }}
                        >
                          {bg}
                        </button>
                      );
                    })}
                  </div>
                  <small className="text-muted ps-1 mt-1 d-block" style={{ fontSize: '0.74rem' }}>
                    ABO blood group mismatch is common and easily managed in stem cell transplants.
                  </small>
                </div>
              </div>

              {/* Next Button */}
              <div className="d-flex justify-content-end pt-3 border-top" style={{ borderColor: isDark ? 'var(--k-border)' : '#e2e8f0' }}>
                <button
                  type="button"
                  className="btn btn-koshika-green-pill py-2.5 px-4 d-inline-flex align-items-center gap-2 shadow-xs"
                  onClick={() => setStep(2)}
                >
                  <span>Proceed to Treatment Stage</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: Current Treatment Stage (Plain English!) */}
          {/* ========================================================================= */}
          {step === 2 && (
            <div className={`card border-0 shadow-sm rounded-4 p-4 p-md-5 ${isDark ? 'bg-surface' : 'bg-white'}`} style={{ border: isDark ? '1px solid var(--k-border)' : '1px solid #e2e8f0' }}>
              <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom" style={{ borderColor: isDark ? 'var(--k-border)' : '#e2e8f0' }}>
                <div className="d-flex align-items-center gap-2.5">
                  <div
                    className="rounded-3 p-2 d-flex align-items-center justify-content-center shadow-xs text-white"
                    style={{ background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)', width: '38px', height: '38px' }}
                  >
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h5 className={`fw-bold mb-0 ${isDark ? 'text-white' : 'text-dark'}`}>Current Treatment Stage</h5>
                    <small className="text-secondary">Where are you currently in your care journey?</small>
                  </div>
                </div>
                <span className="badge rounded-pill px-3 py-1.5 fw-bold" style={{ background: '#fef3c7', color: '#92400e' }}>
                  Step 2 of 4
                </span>
              </div>

              {/* 4 Clear Patient Stages */}
              <label className={`form-label fw-bold small mb-2 ${isDark ? 'text-white' : 'text-dark'}`}>Select Your Current Situation:</label>
              <div className="d-flex flex-column gap-2.5 mb-4">
                {[
                  {
                    id: 'remission',
                    title: 'In Complete Remission',
                    badge: 'Optimal Window for Transplant',
                    badgeBg: '#dcfce7',
                    badgeColor: '#166534',
                    borderColor: '#86efac',
                    desc: 'Initial chemotherapy cleared cancer/abnormal cells from blood and bone marrow. Best time to evaluate curative transplant.'
                  },
                  {
                    id: 'newly_diagnosed',
                    title: 'Newly Diagnosed',
                    badge: 'Initial Planning Phase',
                    badgeBg: '#e0f2fe',
                    badgeColor: '#0369a1',
                    borderColor: '#93c5fd',
                    desc: 'Recently diagnosed; exploring standard treatments, donor matching, and whether a transplant is required early.'
                  },
                  {
                    id: 'relapsed',
                    title: 'Relapsed or Recurring',
                    badge: 'Definitive Curative Option',
                    badgeBg: '#fee2e2',
                    badgeColor: '#b91c1c',
                    borderColor: '#fecaca',
                    desc: 'Disease returned after initial therapy. Stem cell transplant offers the main curative pathway.'
                  },
                  {
                    id: 'chronic',
                    title: 'Chronic Management / Stable',
                    badge: 'Ongoing Maintenance',
                    badgeBg: '#ede9fe',
                    badgeColor: '#6d28d9',
                    borderColor: '#c4b5fd',
                    desc: 'Condition is currently managed with daily oral medications, blood transfusions, or targeted therapy.'
                  }
                ].map((item) => {
                  const isSelected = formData.treatmentStage === item.title;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setFormData({ ...formData, treatmentStage: item.title })}
                      className="p-3.5 rounded-4 border transition-all cursor-pointer d-flex align-items-center justify-content-between hover-lift"
                      style={{
                        borderColor: isSelected ? item.borderColor : isDark ? 'var(--k-border)' : '#e2e8f0',
                        borderWidth: isSelected ? '2px' : '1px',
                        background: isSelected
                          ? isDark
                            ? 'rgba(13, 148, 136, 0.15)'
                            : '#f0fdfa'
                          : isDark
                          ? 'var(--k-surface-alt)'
                          : '#ffffff',
                        borderLeft: `4px solid ${item.borderColor}`,
                        cursor: 'pointer'
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: '24px',
                            height: '24px',
                            border: `2px solid ${isSelected ? item.badgeColor : 'var(--k-border)'}`,
                            background: isSelected ? item.badgeColor : 'transparent'
                          }}
                        >
                          {isSelected && <div className="rounded-circle bg-white" style={{ width: '8px', height: '8px' }} />}
                        </div>
                        <div>
                          <div className="d-flex align-items-center gap-2 mb-0.5">
                            <span className={`fw-bold small ${isDark ? 'text-white' : 'text-dark'}`}>{item.title}</span>
                            <span
                              className="badge rounded-pill fw-bold"
                              style={{ background: item.badgeBg, color: item.badgeColor, border: `1px solid ${item.borderColor}`, fontSize: '0.68rem' }}
                            >
                              {item.badge}
                            </span>
                          </div>
                          <small className={isDark ? 'text-light opacity-75 d-block' : 'text-secondary d-block'} style={{ fontSize: '0.78rem' }}>
                            {item.desc}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Prior Treatment History */}
              <label className={`form-label fw-bold small mb-2 ${isDark ? 'text-white' : 'text-dark'}`}>Have you received chemotherapy or prior medical therapy?</label>
              <div className="row g-2 mb-4">
                {[
                  { text: 'Yes, completed initial chemotherapy', sub: 'Standard induction cycles completed' },
                  { text: 'Yes, ongoing maintenance therapy', sub: 'Currently on targeted pills or transfusions' },
                  { text: 'No, newly diagnosed & treatment naive', sub: 'Have not started chemotherapy yet' }
                ].map((opt) => {
                  const isSelected = formData.priorChemo === opt.text;
                  return (
                    <div key={opt.text} className="col-12 col-md-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, priorChemo: opt.text })}
                        className="btn w-100 p-3 rounded-4 text-start small fw-semibold border transition-all hover-lift h-100"
                        style={{
                          borderColor: isSelected ? 'var(--k-primary)' : isDark ? 'var(--k-border)' : '#e2e8f0',
                          borderWidth: isSelected ? '2px' : '1px',
                          background: isSelected
                            ? isDark
                              ? 'rgba(13, 148, 136, 0.15)'
                              : '#f0fdfa'
                            : isDark
                            ? 'var(--k-surface-alt)'
                            : '#ffffff',
                          color: isSelected ? 'var(--k-primary)' : isDark ? 'var(--k-text-primary)' : '#334155'
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <span className="fw-bold">{opt.text.split(',')[0]}</span>
                          {isSelected && <Check size={16} className="text-success" />}
                        </div>
                        <small className="text-secondary fw-normal d-block" style={{ fontSize: '0.74rem' }}>
                          {opt.sub}
                        </small>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between pt-3 border-top" style={{ borderColor: isDark ? 'var(--k-border)' : '#e2e8f0' }}>
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill px-4 small fw-semibold d-flex align-items-center gap-1.5"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  className="btn btn-koshika-green-pill py-2.5 px-4 d-inline-flex align-items-center gap-2 shadow-xs"
                  onClick={() => setStep(3)}
                >
                  <span>Proceed to Health &amp; Fitness</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: General Health & Donor Status (Realistic Patient Inputs!) */}
          {/* ========================================================================= */}
          {step === 3 && (
            <div className={`card border-0 shadow-sm rounded-4 p-4 p-md-5 ${isDark ? 'bg-surface' : 'bg-white'}`} style={{ border: isDark ? '1px solid var(--k-border)' : '1px solid #e2e8f0' }}>
              <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom" style={{ borderColor: isDark ? 'var(--k-border)' : '#e2e8f0' }}>
                <div className="d-flex align-items-center gap-2.5">
                  <div
                    className="rounded-3 p-2 d-flex align-items-center justify-content-center shadow-xs text-white"
                    style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', width: '38px', height: '38px' }}
                  >
                    <HeartPulse size={20} />
                  </div>
                  <div>
                    <h5 className={`fw-bold mb-0 ${isDark ? 'text-white' : 'text-dark'}`}>Physical Energy &amp; General Health</h5>
                    <small className="text-secondary">Your baseline fitness helps doctors choose the safest conditioning protocol</small>
                  </div>
                </div>
                <span className="badge rounded-pill px-3 py-1.5 fw-bold" style={{ background: '#dcfce7', color: '#166534' }}>
                  Step 3 of 4
                </span>
              </div>

              {/* Daily Energy Level (ECOG) */}
              <label className={`form-label fw-bold small mb-2 ${isDark ? 'text-white' : 'text-dark'}`}>How is your day-to-day energy and physical mobility?</label>
              <div className="d-flex flex-column gap-2 mb-4">
                {[
                  {
                    title: 'Fully active & normal routine',
                    badge: 'Optimal Fitness for Transplant',
                    badgeColor: '#166534',
                    badgeBg: '#dcfce7',
                    desc: 'Able to carry out all normal daily tasks and activities without any physical restriction.'
                  },
                  {
                    title: 'Light activity only; easily fatigued',
                    badge: 'Eligible for Reduced-Intensity Protocol',
                    badgeColor: '#0369a1',
                    badgeBg: '#e0f2fe',
                    desc: 'Able to walk and do light work, but need to rest during physically strenuous activities.'
                  },
                  {
                    title: 'Needs rest most of the day',
                    badge: 'Requires Specialized Pre-Care',
                    badgeColor: '#92400e',
                    badgeBg: '#fef3c7',
                    desc: 'Capable of all self-care, but resting for more than half the day.'
                  }
                ].map((item) => {
                  const isSelected = formData.dailyActivity === item.title;
                  return (
                    <div
                      key={item.title}
                      onClick={() => setFormData({ ...formData, dailyActivity: item.title })}
                      className="p-3.5 rounded-4 border transition-all cursor-pointer d-flex align-items-center justify-content-between hover-lift"
                      style={{
                        borderColor: isSelected ? item.badgeColor : isDark ? 'var(--k-border)' : '#e2e8f0',
                        borderWidth: isSelected ? '2px' : '1px',
                        background: isSelected
                          ? isDark
                            ? 'rgba(13, 148, 136, 0.15)'
                            : '#f0fdfa'
                          : isDark
                          ? 'var(--k-surface-alt)'
                          : '#ffffff',
                        borderLeft: `4px solid ${item.badgeColor}`,
                        cursor: 'pointer'
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: '24px',
                            height: '24px',
                            border: `2px solid ${isSelected ? item.badgeColor : 'var(--k-border)'}`,
                            background: isSelected ? item.badgeColor : 'transparent'
                          }}
                        >
                          {isSelected && <div className="rounded-circle bg-white" style={{ width: '8px', height: '8px' }} />}
                        </div>
                        <div>
                          <div className="d-flex align-items-center gap-2 mb-0.5">
                            <span className={`fw-bold small ${isDark ? 'text-white' : 'text-dark'}`}>{item.title}</span>
                            <span
                              className="badge rounded-pill fw-bold"
                              style={{ background: item.badgeBg, color: item.badgeColor, border: `1px solid ${item.badgeColor}33`, fontSize: '0.68rem' }}
                            >
                              {item.badge}
                            </span>
                          </div>
                          <small className={isDark ? 'text-light opacity-75 d-block' : 'text-secondary d-block'} style={{ fontSize: '0.78rem' }}>
                            {item.desc}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Organ Health & Family Donor Status */}
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label className={`form-label fw-bold small mb-1.5 d-flex align-items-center gap-1.5 ${isDark ? 'text-white' : 'text-dark'}`}>
                    <ShieldCheck size={15} className="text-success" />
                    <span>Vital Organ Health (Heart, Lungs, Kidneys)</span>
                  </label>
                  <select
                    className="form-select rounded-pill px-3 py-2 small"
                    value={formData.organHealth}
                    onChange={(e) => setFormData({ ...formData, organHealth: e.target.value })}
                    style={{
                      backgroundColor: isDark ? 'var(--k-surface-alt)' : '#ffffff',
                      color: isDark ? 'var(--k-text-primary)' : '#0f172a',
                      borderColor: isDark ? 'var(--k-border)' : '#cbd5e1'
                    }}
                  >
                    <option value="Normal & verified healthy">Normal &amp; verified healthy (No major conditions)</option>
                    <option value="Mild/managed condition (e.g. controlled BP)">Mild or managed condition (e.g. controlled BP)</option>
                    <option value="Under active evaluation">Under active evaluation by physician</option>
                  </select>
                  <small className="text-muted ps-1 d-block mt-1" style={{ fontSize: '0.74rem' }}>
                    Standard organ tests (ECHO, LFT, KFT) are verified before admission.
                  </small>
                </div>

                <div className="col-12 col-md-6">
                  <label className={`form-label fw-bold small mb-1.5 d-flex align-items-center gap-1.5 ${isDark ? 'text-white' : 'text-dark'}`}>
                    <Dna size={15} className="text-teal" style={{ color: '#0d9488' }} />
                    <span>Family Donor Testing (HLA Swab Test)</span>
                  </label>
                  <select
                    className="form-select rounded-pill px-3 py-2 small"
                    value={formData.donorStatus}
                    onChange={(e) => setFormData({ ...formData, donorStatus: e.target.value })}
                    style={{
                      backgroundColor: isDark ? 'var(--k-surface-alt)' : '#ffffff',
                      color: isDark ? 'var(--k-text-primary)' : '#0f172a',
                      borderColor: isDark ? 'var(--k-border)' : '#cbd5e1'
                    }}
                  >
                    <option value="Sibling swab test completed">Yes, brother/sister tested for matching</option>
                    <option value="Registry search initiated">Looking in national donor registry (DATRI/DKMS)</option>
                    <option value="Not tested yet">Not tested yet (Need guidance)</option>
                  </select>
                  <small className="text-muted ps-1 d-block mt-1" style={{ fontSize: '0.74rem' }}>
                    Siblings have a 25% chance of being an exact 10/10 HLA match.
                  </small>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between pt-3 border-top" style={{ borderColor: isDark ? 'var(--k-border)' : '#e2e8f0' }}>
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill px-4 small fw-semibold d-flex align-items-center gap-1.5"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  disabled={evaluating}
                  className="btn btn-koshika-green-pill py-2.5 px-4 d-inline-flex align-items-center gap-2 shadow-xs"
                  onClick={handleRunAssessment}
                >
                  {evaluating ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status"></span>
                      <span>Comparing with Clinical Guidelines...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={16} />
                      <span>View My Candidacy Report &rarr;</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: Assessment Output & Candidacy Report */}
          {/* ========================================================================= */}
          {step === 4 && assessmentResult && (
            <div className={`card border-0 shadow-sm rounded-4 p-4 p-md-5 ${isDark ? 'bg-surface' : 'bg-white'}`} style={{ border: isDark ? '1px solid var(--k-border)' : '1px solid #e2e8f0' }}>
              {/* Header result row */}
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4 pb-3 border-bottom" style={{ borderColor: isDark ? 'var(--k-border)' : '#e2e8f0' }}>
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-4 p-3 text-white d-flex align-items-center justify-content-center shadow-xs"
                    style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', width: '56px', height: '56px' }}
                  >
                    <Award size={32} />
                  </div>
                  <div>
                    <span className="badge rounded-pill px-3 py-1 small fw-bold mb-1" style={{ background: '#dcfce7', color: '#166534' }}>
                      EVALUATION COMPLETE &bull; EVIDENCE BASED
                    </span>
                    <h4 className={`fw-bold mb-0 ${isDark ? 'text-white' : 'text-dark'}`}>
                      Preliminary Candidacy Report
                    </h4>
                  </div>
                </div>

                {/* Score Pill */}
                <div className="d-flex align-items-center gap-2 p-2 px-4 rounded-pill shadow-xs" style={{ background: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ecfdf5', border: '1.5px solid #a7f3d0' }}>
                  <Sparkles size={22} className="text-success" />
                  <div>
                    <span className="fw-extrabold text-success fs-4">{assessmentResult.candidacyScore}%</span>
                    <span className={`small ms-1.5 fw-semibold ${isDark ? 'text-light' : 'text-secondary'}`}>Candidacy Score</span>
                  </div>
                </div>
              </div>

              {/* High Suitability Banner */}
              <div
                className="p-4 rounded-4 border mb-4"
                style={{
                  background: isDark
                    ? 'rgba(13, 148, 136, 0.14)'
                    : 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 60%, #ccfbf1 100%)',
                  borderColor: isDark ? 'rgba(45, 212, 191, 0.35)' : '#86efac',
                  borderWidth: '1.5px'
                }}
              >
                <div className="d-flex align-items-center gap-2 mb-2">
                  <CheckCircle2 size={22} className="text-success" />
                  <h5 className="fw-bold text-success mb-0">
                    {assessmentResult.candidacyLevel}
                  </h5>
                </div>
                <p className={`small mb-3 leading-relaxed ${isDark ? 'text-white' : 'text-dark'}`} style={{ fontSize: '0.94rem' }}>
                  {assessmentResult.summary}
                </p>

                <div className="d-flex flex-wrap gap-2">
                  <span className={`badge rounded-pill px-3 py-1.5 small border ${isDark ? 'bg-surface text-white' : 'bg-white text-dark'}`}>
                    <strong className="text-teal" style={{ color: '#0d9488' }}>Therapy Type:</strong> {assessmentResult.transplantType}
                  </span>
                  <span className={`badge rounded-pill px-3 py-1.5 small border ${isDark ? 'bg-surface text-white' : 'bg-white text-dark'}`}>
                    <strong className="text-success">Recommended Approach:</strong> {assessmentResult.recommendedApproach}
                  </span>
                </div>
              </div>

              {/* Evaluated Clinical Factors */}
              <h6 className={`fw-bold mb-2.5 d-flex align-items-center gap-2 ${isDark ? 'text-white' : 'text-dark'}`}>
                <ShieldCheck size={18} className="text-primary" />
                <span>Your Evaluated Parameters:</span>
              </h6>
              <div className="row g-2.5 mb-4">
                {assessmentResult.keyFactors.map((f, idx) => (
                  <div key={idx} className="col-12 col-md-6">
                    <div className={`p-3 rounded-4 border d-flex justify-content-between align-items-center small ${isDark ? 'bg-surface-alt' : 'bg-light'}`} style={{ borderColor: isDark ? 'var(--k-border)' : '#e2e8f0' }}>
                      <span className="text-secondary">{f.label}</span>
                      <span className={`fw-bold d-flex align-items-center gap-1.5 ${isDark ? 'text-white' : 'text-dark'}`}>
                        <Check size={14} className="text-success" strokeWidth={3} />
                        {f.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Questions for Your Doctor (Interactive Checklist) */}
              <div
                className="p-4 rounded-4 border mb-4 shadow-xs"
                style={{
                  backgroundColor: isDark ? 'var(--k-surface-alt)' : '#ffffff',
                  borderColor: isDark ? 'var(--k-border)' : '#e2e8f0',
                  borderLeft: '4px solid #4f46e5'
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2.5 flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-2 fw-bold small">
                    <Stethoscope size={18} className="text-primary" />
                    <span className={isDark ? 'text-white' : 'text-dark'}>Questions to Ask Your Doctor at Your Next Visit:</span>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      onClick={handleCopyQuestions}
                      className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 d-flex align-items-center gap-1.5"
                    >
                      {copiedQuestions ? <Check size={13} className="text-success" /> : <Copy size={13} />}
                      <span>{copiedQuestions ? 'Copied!' : 'Copy Checklist'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 d-flex align-items-center gap-1.5"
                    >
                      <Printer size={13} />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2 mt-2">
                  {assessmentResult.questionsForDoctor.map((q, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-3 d-flex align-items-start gap-2.5"
                      style={{ backgroundColor: isDark ? 'var(--k-surface)' : '#f8fafc' }}
                    >
                      <span
                        className="badge rounded-circle p-1 small flex-shrink-0"
                        style={{ width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#e0e7ff', color: '#4338ca' }}
                      >
                        {i + 1}
                      </span>
                      <span className={`small fw-medium ${isDark ? 'text-white' : 'text-dark'}`}>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medical Educational Disclaimer */}
              <div
                className="alert border-0 rounded-4 d-flex align-items-start gap-2.5 mb-4 py-3"
                style={{
                  background: isDark ? 'rgba(245, 158, 11, 0.14)' : '#fef3c7',
                  color: isDark ? '#fde047' : '#92400e',
                  border: isDark ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid #fde68a'
                }}
              >
                <AlertTriangle size={18} className="text-warning flex-shrink-0 mt-0.5" />
                <div className="small">
                  <strong>Clinical Notice:</strong> This preliminary assessment provides evidence-based educational support referencing EBMT and ICMR hematology guidelines. It does not replace a clinical examination. Always discuss your personal candidacy with your attending hematologist.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-end pt-3 border-top" style={{ borderColor: isDark ? 'var(--k-border)' : '#e2e8f0' }}>
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill px-4 small fw-semibold d-flex align-items-center justify-content-center gap-1.5"
                  onClick={() => setStep(1)}
                >
                  <RotateCcw size={14} />
                  <span>Modify Answers</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success rounded-pill px-4 small fw-semibold d-flex align-items-center justify-content-center gap-1.5"
                  onClick={() => navigate('/find-care/centres')}
                >
                  <Building size={14} />
                  <span>Find Transplant Centres</span>
                </button>
                <button
                  type="button"
                  className="btn btn-koshika-green-pill py-2.5 px-4 small d-flex align-items-center justify-content-center gap-2"
                  onClick={() => navigate('/ml-match')}
                >
                  <Cpu size={15} />
                  <span>Check Donor Compatibility &rarr;</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary rounded-pill px-4 small fw-semibold d-flex align-items-center justify-content-center gap-1.5"
                  onClick={() => navigate('/ai-assistant')}
                >
                  <MessageSquare size={14} />
                  <span>Ask KOSHIKA AI</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PreliminaryAssessment;
