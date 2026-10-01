import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import KoshikaAwarenessPillars from './KoshikaAwarenessPillars';
import {
  Layers,
  Droplet,
  Grid,
  Cpu,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Users,
  HeartPulse,
  ClipboardCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  XCircle,
  X,
  MapPin,
  Activity,
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';

const StemCellAwarenessSection = () => {
  const [selectedCellType, setSelectedCellType] = useState('hsc');

  // Eligibility quiz state
  const [quizAge, setQuizAge] = useState(true);
  const [quizWeight, setQuizWeight] = useState(true);
  const [quizHealth, setQuizHealth] = useState(true);
  const [quizInfection, setQuizInfection] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const cellTypes = {
    hsc: {
      name: 'Hematopoietic Stem Cells (HSCs)',
      badge: 'Blood & Immune System',
      color: '#0284c7',
      origin: 'Bone marrow, mobilized peripheral blood, and umbilical cord blood',
      capabilities: 'Generate all human red blood cells, white blood cells, and platelets. Used in curative bone marrow transplants.',
      approvedUses: 'Acute & Chronic Leukemia, Lymphoma, Aplastic Anemia, Sickle Cell Disease, Severe Immunodeficiencies (SCID).',
      IconComp: Droplet
    },
    msc: {
      name: 'Mesenchymal Stem Cells (MSCs)',
      badge: 'Structural & Regenerative',
      color: '#0d9488',
      origin: 'Umbilical cord tissue (Wharton\'s jelly), bone marrow stroma, and adipose tissue',
      capabilities: 'Differentiate into osteoblasts (bone), chondrocytes (cartilage), myocytes (muscle), and adipocytes. Potent anti-inflammatory immunomodulation.',
      approvedUses: 'Graft-versus-Host Disease (GVHD) suppression, osteoarthritis cartilage repair, Crohn\'s fistulas, and ischemic wound healing.',
      IconComp: Grid
    },
    ipsc: {
      name: 'Induced Pluripotent Stem Cells (iPSCs)',
      badge: 'Nobel Prize Technology',
      color: '#7c3aed',
      origin: 'Reprogrammed adult somatic cells (e.g. skin fibroblasts) via Yamanaka factors (Oct4, Sox2, Klf4, c-Myc)',
      capabilities: 'Pluripotent cells capable of forming any cell type in the human body without using embryonic material.',
      approvedUses: 'Patient-specific disease modeling, drug toxicity screening, macular degeneration retinal repair, Parkinson\'s dopaminergic neuron replacement.',
      IconComp: Cpu
    },
    esc: {
      name: 'Embryonic Stem Cells (ESCs)',
      badge: 'Pluripotent Benchmark',
      color: '#d97706',
      origin: 'Inner cell mass of 5-day pre-implantation blastocysts in IVF facilities',
      capabilities: 'Total pluripotency; highest proliferative capacity; foundational for understanding human organogenesis.',
      approvedUses: 'Translational biology, developmental toxicology, spinal cord injury regeneration trials, and beta-islet cell replacement for Type 1 Diabetes.',
      IconComp: Sparkles
    }
  };

  const mythsFacts = [
    {
      myth: 'Donating stem cells requires painful surgery and drilling into the spine.',
      fact: '90% of donations are done via PBSC (Peripheral Blood Stem Cell donation) using apheresis. It is an outpatient procedure similar to platelet donation. There is no surgery or spine contact.'
    },
    {
      myth: 'Donating will deplete my body’s stem cell reserves permanently.',
      fact: 'Your body completely regenerates its stem cells back to normal levels within 4 to 6 weeks. There is no permanent reduction in your immune system or health.'
    },
    {
      myth: 'Only immediate family members can be matching donors.',
      fact: '70% of patients do not have a fully compatible match in their family. They rely entirely on unrelated volunteer registries like KOSHIKA, DATRI, and DKMS to survive.'
    },
    {
      myth: 'Stem cell therapy is only for elderly people.',
      fact: 'Stem cell transplants cure infants with severe immunodeficiency, young children with thalassemia, and adolescents with leukemia. Biobanking protects all generations.'
    }
  ];

  const isEligible = quizAge && quizWeight && quizHealth && !quizInfection;

  return (
    <div className="stem-cell-awareness-container mb-4">
      {/* KOSHIKA Core Awareness & Patient Guidance */}
      <KoshikaAwarenessPillars showHero={false} />

      {/* Interactive Cell Type Explorer */}
      <div id="cell-explorer" className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white" style={{ border: '1px solid #e2e8f0' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
          <div>
            <h4 className="fw-bold mb-1 d-flex align-items-center gap-2 text-dark">
              <Layers size={20} className="text-primary" />
              <span>Interactive Stem Cell Biology Explorer</span>
            </h4>
            <p className="text-secondary small mb-0">Select a cellular category to explore origins, differentiation potency, and therapeutic applications</p>
          </div>
          <div className="btn-group btn-group-sm p-1 bg-light rounded-pill border" role="group">
            {Object.entries(cellTypes).map(([key]) => (
              <button
                key={key}
                type="button"
                className={`btn rounded-pill px-3 py-1 fw-semibold transition-all ${
                  selectedCellType === key
                    ? 'btn-primary text-white shadow-xs'
                    : 'btn-light text-secondary border-0 hover-bg-light'
                }`}
                onClick={() => setSelectedCellType(key)}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Cell Detail Card */}
        {(() => {
          const current = cellTypes[selectedCellType];
          const IconComponent = current.IconComp;
          return (
            <div className="p-3.5 p-md-4 rounded-4 border" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div className="d-flex align-items-center gap-3 mb-3.5">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center shadow-xs"
                  style={{ width: '48px', height: '48px', background: `${current.color}18`, color: current.color }}
                >
                  <IconComponent size={24} />
                </div>
                <div>
                  <h5 className="fw-bold mb-0.5 text-dark">{current.name}</h5>
                  <span className="badge rounded-pill px-2.5 py-1 small fw-semibold" style={{ backgroundColor: `${current.color}22`, color: current.color }}>
                    {current.badge}
                  </span>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-4">
                  <div className="p-3.5 bg-white rounded-3 border h-100 shadow-2xs">
                    <span className="text-muted small fw-semibold text-uppercase d-flex align-items-center gap-1.5 mb-1.5">
                      <MapPin size={13} className="text-primary" />
                      <span>Biological Origin</span>
                    </span>
                    <p className="mb-0 text-dark small lh-base">{current.origin}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3.5 bg-white rounded-3 border h-100 shadow-2xs">
                    <span className="text-muted small fw-semibold text-uppercase d-flex align-items-center gap-1.5 mb-1.5">
                      <Sparkles size={13} className="text-success" />
                      <span>Differentiation Power</span>
                    </span>
                    <p className="mb-0 text-dark small lh-base">{current.capabilities}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3.5 bg-white rounded-3 border h-100 shadow-2xs">
                    <span className="text-muted small fw-semibold text-uppercase d-flex align-items-center gap-1.5 mb-1.5">
                      <CheckCircle2 size={13} className="text-info" />
                      <span>Clinical Cures &amp; Therapies</span>
                    </span>
                    <p className="mb-0 text-dark small lh-base">{current.approvedUses}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* The 4-Step Donor Journey */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white" style={{ border: '1px solid #e2e8f0' }}>
        <h4 className="fw-bold mb-1 d-flex align-items-center gap-2 text-dark">
          <HeartPulse size={20} className="text-primary" />
          <span>The Life-Saving Stem Cell Donor Journey</span>
        </h4>
        <p className="text-secondary small mb-4">From painless cheek swab to saving a cancer patient's life: how easy it is to become a hero</p>

        <div className="row g-3">
          <div className="col-md-3">
            <div className="p-3.5 rounded-4 border bg-white h-100 position-relative shadow-2xs">
              <span className="badge bg-primary text-white rounded-circle p-2 mb-2 fs-6" style={{ width: '28px', height: '28px' }}>1</span>
              <h6 className="fw-bold mb-1 text-dark">Free Cheek Swab</h6>
              <p className="text-secondary small mb-0 lh-base">
                Register online. Receive a sterile cotton swab kit at your doorstep. Swab inside cheeks and mail back in prepaid envelope.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3.5 rounded-4 border bg-white h-100 position-relative shadow-2xs">
              <span className="badge bg-info text-white rounded-circle p-2 mb-2 fs-6" style={{ width: '28px', height: '28px' }}>2</span>
              <h6 className="fw-bold mb-1 text-dark">HLA Database Match</h6>
              <p className="text-secondary small mb-0 lh-base">
                Your high-resolution HLA markers (A, B, C, DRB1) are entered into the secure national &amp; global registry database.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3.5 rounded-4 border bg-white h-100 position-relative shadow-2xs">
              <span className="badge bg-warning text-dark rounded-circle p-2 mb-2 fs-6" style={{ width: '28px', height: '28px' }}>3</span>
              <h6 className="fw-bold mb-1 text-dark">Confirmation &amp; Prep</h6>
              <p className="text-secondary small mb-0 lh-base">
                If a patient matches, undergo a routine health checkup. Receive a brief filgrastim boost to mobilize stem cells into bloodstream.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3.5 rounded-4 border bg-white h-100 position-relative shadow-2xs">
              <span className="badge bg-success text-white rounded-circle p-2 mb-2 fs-6" style={{ width: '28px', height: '28px' }}>4</span>
              <h6 className="fw-bold mb-1 text-dark">Painless PBSC Donation</h6>
              <p className="text-secondary small mb-0 lh-base">
                Relax in a comfortable recliner watching Netflix while an apheresis machine gently collects stem cells and returns your blood.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Columns: Interactive Eligibility Quiz & Myths vs Facts */}
      <div className="row g-4 mb-4">
        {/* Donor Eligibility Screener */}
        <div className="col-lg-6" id="donor-eligibility">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white" style={{ border: '1px solid #e2e8f0' }}>
            <h5 className="fw-bold mb-2 d-flex align-items-center gap-2 text-dark">
              <ClipboardCheck size={18} className="text-success" />
              <span>Interactive Donor Eligibility Screener</span>
            </h5>
            <p className="text-secondary small mb-3">
              Take this quick 30-second assessment to see if you qualify to join the life-saving registry pool.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setQuizSubmitted(true); }}>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">1. Are you between 18 and 50 years of age?</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="ageQuiz"
                      id="ageYes"
                      checked={quizAge === true}
                      onChange={() => setQuizAge(true)}
                    />
                    <label className="form-check-label small" htmlFor="ageYes">Yes (18-50)</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="ageQuiz"
                      id="ageNo"
                      checked={quizAge === false}
                      onChange={() => setQuizAge(false)}
                    />
                    <label className="form-check-label small" htmlFor="ageNo">No (&lt;18 or &gt;50)</label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">2. Do you weigh at least 50 kg (110 lbs)?</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="weightQuiz"
                      id="wtYes"
                      checked={quizWeight === true}
                      onChange={() => setQuizWeight(true)}
                    />
                    <label className="form-check-label small" htmlFor="wtYes">Yes (≥ 50 kg)</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="weightQuiz"
                      id="wtNo"
                      checked={quizWeight === false}
                      onChange={() => setQuizWeight(false)}
                    />
                    <label className="form-check-label small" htmlFor="wtNo">No (&lt; 50 kg)</label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">3. Are you free from chronic heart, kidney, or lung diseases?</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="healthQuiz"
                      id="hlthYes"
                      checked={quizHealth === true}
                      onChange={() => setQuizHealth(true)}
                    />
                    <label className="form-check-label small" htmlFor="hlthYes">Yes (Healthy)</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="healthQuiz"
                      id="hlthNo"
                      checked={quizHealth === false}
                      onChange={() => setQuizHealth(false)}
                    />
                    <label className="form-check-label small" htmlFor="hlthNo">No (Chronic disease)</label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">4. Any history of Hepatitis B/C, HIV, or Blood Cancers?</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="infQuiz"
                      id="infNo"
                      checked={quizInfection === false}
                      onChange={() => setQuizInfection(false)}
                    />
                    <label className="form-check-label small" htmlFor="infNo">No (Negative)</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="infQuiz"
                      id="infYes"
                      checked={quizInfection === true}
                      onChange={() => setQuizInfection(true)}
                    />
                    <label className="form-check-label small" htmlFor="infYes">Yes (Positive)</label>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-sm px-4 rounded-pill fw-semibold">
                Check My Result
              </button>
            </form>

            {quizSubmitted && (
              <div className={`mt-3 p-3 rounded-4 ${isEligible ? 'bg-success-subtle border border-success' : 'bg-warning-subtle border border-warning'}`}>
                {isEligible ? (
                  <div>
                    <div className="d-flex align-items-center gap-2 text-success fw-bold">
                      <CheckCircle2 size={18} />
                      <span>Congratulations! You are Prime Eligible to Donate!</span>
                    </div>
                    <p className="small text-secondary mb-2 mt-1">
                      You meet all primary criteria to register as a stem cell donor and give someone with leukemia a second chance at life.
                    </p>
                    <Link to="/donors" className="btn btn-sm btn-success rounded-pill px-3.5 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5">
                      <CheckCircle2 size={14} />
                      <span>Register as Volunteer Donor</span>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <div className="d-flex align-items-center gap-2 text-warning-emphasis fw-bold">
                      <AlertCircle size={18} />
                      <span>Clinical Review Required</span>
                    </div>
                    <p className="small text-secondary mb-0 mt-1">
                      Based on criteria guidelines, standard donor registration may have restrictions. However, you can still support biobanking awareness, family cord blood storage, or patient advocacy!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Myths vs Facts Cards */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white" style={{ border: '1px solid #e2e8f0' }}>
            <h5 className="fw-bold mb-2 d-flex align-items-center gap-2 text-dark">
              <HelpCircle size={18} className="text-warning" />
              <span>Busting Common Stem Cell Myths</span>
            </h5>
            <p className="text-secondary small mb-3">Evidence-based facts addressing fears and common misconceptions about stem cell donation</p>

            <div className="d-flex flex-column gap-2.5">
              {mythsFacts.map((item, idx) => (
                <div key={idx} className="p-3 bg-light rounded-3 border">
                  <div className="d-flex align-items-center gap-2 text-danger fw-semibold small mb-1">
                    <XCircle size={14} className="flex-shrink-0" />
                    <span>MYTH: "{item.myth}"</span>
                  </div>
                  <div className="d-flex align-items-start gap-2 text-dark small">
                    <CheckCircle2 size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span><strong>FACT:</strong> {item.fact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StemCellAwarenessSection;
