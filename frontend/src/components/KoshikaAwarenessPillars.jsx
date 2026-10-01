import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  HeartPulse,
  Bot,
  ShieldCheck,
  Info,
  Lightbulb,
  CheckCircle2,
  MinusCircle,
  Sparkles,
  User,
  Cpu,
  Droplet,
  Layers,
  Activity,
  Award,
  AlertTriangle,
  ClipboardCheck,
  HelpCircle,
  XCircle,
  X,
  MessageSquare,
  Check,
  ArrowRight
} from 'lucide-react';

const KoshikaAwarenessPillars = ({ showHero = true, onAskAI }) => {
  const handleTriggerAI = (query) => {
    if (onAskAI) {
      onAskAI(query);
    } else {
      window.dispatchEvent(new CustomEvent('open-koshika-ai', { detail: { query } }));
    }
  };

  return (
    <div className="koshika-awareness-wrapper mb-4">
      {/* 1. Main Hero Presentation Banner */}
      {showHero && (
        <div className="koshika-hero-card mb-4 rounded-4 shadow-sm p-4 p-md-5 text-white" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0d9488 100%)' }}>
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                <span className="badge bg-white text-primary fw-bold px-3 py-1 rounded-pill shadow-xs">
                  🧬 KOSHIKA
                </span>
                <span className="badge bg-info-subtle text-dark border border-white border-opacity-30 px-3 py-1 rounded-pill">
                  AI-Assisted Patient Support
                </span>
              </div>
              <h2 className="fw-bold text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
                AI-Assisted Stem Cell Awareness &amp; Patient Support
              </h2>
              <div className="koshika-tagline text-cyan fw-bold mb-3" style={{ color: '#7dd3fc', fontSize: '1.08rem' }}>
                Learn. Understand. Make Informed Decisions.
              </div>
              <p className="text-white text-opacity-90 mb-4" style={{ fontSize: '0.98rem', lineHeight: '1.65', maxWidth: '720px' }}>
                <strong>KOSHIKA</strong> is a patient-friendly platform that provides simple and reliable information about stem cells, stem cell transplantation, donor matching, treatment options, risks, and patient support.
              </p>

              <div className="d-flex flex-wrap gap-2">
                <Link to="/awareness" className="btn btn-light fw-bold text-primary px-4 py-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-1.5">
                  <BookOpen size={16} />
                  <span>Learn More</span>
                </Link>
                <Link to="/ml-match" className="btn btn-outline-light fw-semibold px-4 py-2 rounded-pill d-inline-flex align-items-center gap-1.5">
                  <HeartPulse size={16} />
                  <span>Check Donor Match</span>
                </Link>
                <button
                  type="button"
                  onClick={() => handleTriggerAI('What are stem cells and where are they used in simple words?')}
                  className="btn btn-primary text-white fw-bold px-4 py-2 rounded-pill shadow-sm border border-white border-opacity-25 d-inline-flex align-items-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)' }}
                >
                  <Bot size={16} />
                  <span>Ask KOSHIKA AI</span>
                </button>
              </div>
            </div>

            <div className="col-lg-4 mt-4 mt-lg-0 text-center text-lg-end">
              <div className="koshika-highlight-box p-4 rounded-4 shadow-sm text-start bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-20">
                <div className="d-flex align-items-center gap-2 mb-2 text-white fw-bold small">
                  <ShieldCheck size={20} className="text-success" />
                  <span>Patient-First Science</span>
                </div>
                <h5 className="fw-bold text-white mb-2">Evidence-Based Medicine</h5>
                <p className="text-white text-opacity-80 small mb-3">
                  Every guide on KOSHIKA is verified against scientific hematology protocols, clinical registries, and ethical medical care.
                </p>
                <div className="pt-2 border-top border-white border-opacity-20 d-flex justify-content-between text-white text-opacity-80 small">
                  <span>Transparency</span>
                  <span className="text-success fw-bold">✓ Verified Facts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SECTION: What are Stem Cells? */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white" style={{ border: '1px solid #e2e8f0' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
          <div>
            <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-1 small fw-semibold mb-2 d-inline-flex align-items-center gap-1">
              <Info size={12} />
              <span>Fundamentals of Biology</span>
            </span>
            <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
              <span>🧬 What Are Stem Cells?</span>
            </h4>
            <p className="text-secondary small mb-0">
              Understanding the body's foundational master cells and their unique regenerative capabilities
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleTriggerAI('Can you explain what stem cells are and their difference from normal cells in simple terms?')}
            className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 fw-semibold"
          >
            <MessageSquare size={13} />
            <span>Ask AI Definition</span>
          </button>
        </div>

        {/* Simple Definition Box */}
        <div className="p-3.5 rounded-3 bg-light border-start border-4 border-primary mb-3">
          <div className="fw-bold text-dark mb-1 d-flex align-items-center gap-1.5">
            <Lightbulb size={16} className="text-warning flex-shrink-0" />
            <span>Simple Definition:</span>
          </div>
          <p className="text-secondary small mb-0" style={{ fontSize: '0.92rem', lineHeight: '1.6' }}>
            <strong>Stem cells</strong> are special unspecialized cells that serve as the body's raw materials. Unlike any other cell in the human body, stem cells possess two extraordinary properties: <strong>self-renewal</strong> (the ability to divide repeatedly to produce more stem cells) and <strong>differentiation</strong> (the ability to mature into specialized cells like blood, muscle, or nerve cells).
          </p>
        </div>

        {/* Side-by-Side: Normal Cells vs Stem Cells */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <div className="p-3.5 bg-light rounded-4 border h-100">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fw-bold text-dark">Normal Specialized Cells</span>
                <span className="badge bg-secondary-subtle text-secondary small rounded-pill">Fixed Function</span>
              </div>
              <ul className="list-unstyled small text-secondary mb-0" style={{ lineHeight: '1.65' }}>
                <li className="mb-2 d-flex align-items-start gap-2">
                  <MinusCircle size={15} className="text-muted flex-shrink-0 mt-0.5" />
                  <span><strong>Dedicated Structure:</strong> Skin, muscle, or red blood cells have a fixed shape designed for one specific function.</span>
                </li>
                <li className="mb-2 d-flex align-items-start gap-2">
                  <MinusCircle size={15} className="text-muted flex-shrink-0 mt-0.5" />
                  <span><strong>Cannot Change:</strong> A mature skin cell cannot become a muscle cell or a blood cell.</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <MinusCircle size={15} className="text-muted flex-shrink-0 mt-0.5" />
                  <span><strong>Limited Division:</strong> Most differentiated cells have a finite lifespan and cannot self-renew indefinitely.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3.5 rounded-4 border h-100" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fw-bold text-success">Stem Cells (Master Cells)</span>
                <span className="badge bg-success text-white small rounded-pill">Pluripotent &amp; Multipotent</span>
              </div>
              <ul className="list-unstyled small text-secondary mb-0" style={{ lineHeight: '1.65' }}>
                <li className="mb-2 d-flex align-items-start gap-2">
                  <CheckCircle2 size={15} className="text-success flex-shrink-0 mt-0.5" />
                  <span><strong>Unspecialized:</strong> Start with no specific tissue architecture and can remain unspecialized for long periods.</span>
                </li>
                <li className="mb-2 d-flex align-items-start gap-2">
                  <CheckCircle2 size={15} className="text-success flex-shrink-0 mt-0.5" />
                  <span><strong>Ability to Specialize:</strong> Given the correct biological signals, they develop into various specific cell types.</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <CheckCircle2 size={15} className="text-success flex-shrink-0 mt-0.5" />
                  <span><strong>Self-Renewal:</strong> Capable of dividing and creating exact copies of themselves indefinitely.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ability to Develop into Different Cell Types (Potency) */}
        <div className="p-3.5 bg-white rounded-4 border">
          <div className="fw-bold text-dark small mb-2.5 d-flex align-items-center gap-2">
            <Layers size={16} className="text-primary" />
            <span>Their Ability to Develop into Different Cell Types:</span>
          </div>
          <div className="row g-2 text-center">
            <div className="col-6 col-md-3">
              <div className="p-2.5 rounded-3 bg-light border">
                <div className="fs-5 text-danger mb-1">🩸</div>
                <div className="fw-bold small text-dark">Red Blood Cells</div>
                <small className="text-muted" style={{ fontSize: '0.75rem' }}>Oxygen Delivery</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-2.5 rounded-3 bg-light border">
                <div className="fs-5 text-primary mb-1">🛡️</div>
                <div className="fw-bold small text-dark">White Blood Cells</div>
                <small className="text-muted" style={{ fontSize: '0.75rem' }}>Immune Defense</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-2.5 rounded-3 bg-light border">
                <div className="fs-5 text-warning mb-1">🩹</div>
                <div className="fw-bold small text-dark">Platelets</div>
                <small className="text-muted" style={{ fontSize: '0.75rem' }}>Blood Clotting</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-2.5 rounded-3 bg-light border">
                <div className="fs-5 text-success mb-1">⚡</div>
                <div className="fw-bold small text-dark">Muscle &amp; Nerve Cells</div>
                <small className="text-muted" style={{ fontSize: '0.75rem' }}>Tissue Regeneration</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECTION: Types of Stem Cells (4 Major Types) */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <span className="badge bg-info-subtle text-info-emphasis rounded-pill px-3 py-1 small fw-semibold mb-2 d-inline-flex align-items-center gap-1">
              <Layers size={12} />
              <span>Classification</span>
            </span>
            <h4 className="fw-bold text-dark mb-1">
              <span>🔬 Types of Stem Cells</span>
            </h4>
            <p className="text-secondary small mb-0">
              The four major categories of stem cells, their origins, and their biological capabilities
            </p>
          </div>
        </div>

        <div className="row g-3">
          {/* 1. Embryonic stem cells */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 d-flex flex-column justify-content-between" style={{ border: '1px solid #e2e8f0' }}>
              <div>
                <div className="rounded-3 p-2.5 d-inline-flex align-items-center justify-content-center mb-2.5" style={{ background: '#fef3c7', color: '#d97706' }}>
                  <Sparkles size={20} />
                </div>
                <span className="badge bg-warning text-dark mb-2 small fw-bold d-block w-fit">Pluripotent</span>
                <h5 className="fw-bold text-dark mb-2">Embryonic Stem Cells</h5>
                <p className="text-secondary small mb-3" style={{ lineHeight: '1.6' }}>
                  Derived from early-stage pre-implantation embryos (blastocysts). They possess the extraordinary ability to differentiate into virtually every cell type.
                </p>
              </div>
              <div className="pt-2 border-top">
                <small className="text-muted d-block mb-2"><strong>Primary Value:</strong> Groundwork for developmental biology &amp; regenerative research.</small>
                <button
                  type="button"
                  onClick={() => handleTriggerAI('Explain embryonic stem cells and their role in research')}
                  className="btn btn-link text-warning text-decoration-none p-0 small fw-semibold d-inline-flex align-items-center gap-1"
                >
                  <span>Learn about ESCs</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* 2. Adult stem cells */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 d-flex flex-column justify-content-between" style={{ border: '1px solid #e2e8f0' }}>
              <div>
                <div className="rounded-3 p-2.5 d-inline-flex align-items-center justify-content-center mb-2.5" style={{ background: '#dcfce7', color: '#16a34a' }}>
                  <User size={20} />
                </div>
                <span className="badge bg-success text-white mb-2 small fw-bold d-block w-fit">Multipotent</span>
                <h5 className="fw-bold text-dark mb-2">Adult Stem Cells</h5>
                <p className="text-secondary small mb-3" style={{ lineHeight: '1.6' }}>
                  Undifferentiated somatic cells residing in adult tissues like bone marrow and liver. They primarily replenish the specific tissue they occupy.
                </p>
              </div>
              <div className="pt-2 border-top">
                <small className="text-muted d-block mb-2"><strong>Primary Value:</strong> Natural tissue maintenance, healing, and routine cellular turnover.</small>
                <button
                  type="button"
                  onClick={() => handleTriggerAI('Explain adult stem cells and where they are found in the body')}
                  className="btn btn-link text-success text-decoration-none p-0 small fw-semibold d-inline-flex align-items-center gap-1"
                >
                  <span>Learn about Adult Cells</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Induced pluripotent stem cells (iPSCs) */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 d-flex flex-column justify-content-between" style={{ border: '1px solid #e2e8f0' }}>
              <div>
                <div className="rounded-3 p-2.5 d-inline-flex align-items-center justify-content-center mb-2.5" style={{ background: '#f3e8ff', color: '#9333ea' }}>
                  <Cpu size={20} />
                </div>
                <span className="badge text-white mb-2 small fw-bold d-block w-fit" style={{ backgroundColor: '#9333ea' }}>Nobel Discovery</span>
                <h5 className="fw-bold text-dark mb-2">iPSCs</h5>
                <p className="text-secondary small mb-3" style={{ lineHeight: '1.6' }}>
                  Normal adult cells genetically reprogrammed in the laboratory to regain embryonic-like pluripotency without requiring embryonic tissue.
                </p>
              </div>
              <div className="pt-2 border-top">
                <small className="text-muted d-block mb-2"><strong>Primary Value:</strong> Disease modeling, drug screening, and patient-specific cellular therapy.</small>
                <button
                  type="button"
                  onClick={() => handleTriggerAI('What are induced pluripotent stem cells (iPSCs) and how are they created?')}
                  className="btn btn-link text-decoration-none p-0 small fw-semibold d-inline-flex align-items-center gap-1"
                  style={{ color: '#9333ea' }}
                >
                  <span>Learn about iPSCs</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* 4. Hematopoietic stem cells */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 d-flex flex-column justify-content-between" style={{ border: '1px solid #e2e8f0' }}>
              <div>
                <div className="rounded-3 p-2.5 d-inline-flex align-items-center justify-content-center mb-2.5" style={{ background: '#ffe4e6', color: '#e11d48' }}>
                  <Droplet size={20} />
                </div>
                <span className="badge bg-danger text-white mb-2 small fw-bold d-block w-fit">Blood-Forming</span>
                <h5 className="fw-bold text-dark mb-2">Hematopoietic Cells (HSCs)</h5>
                <p className="text-secondary small mb-3" style={{ lineHeight: '1.6' }}>
                  Found in bone marrow, peripheral blood, and cord blood. Master builders of all blood cells and power curative transplants.
                </p>
              </div>
              <div className="pt-2 border-top">
                <small className="text-muted d-block mb-2"><strong>Primary Value:</strong> Routine established clinical transplantation for leukemia &amp; blood disorders.</small>
                <button
                  type="button"
                  onClick={() => handleTriggerAI('What are hematopoietic stem cells and how do bone marrow transplants work?')}
                  className="btn btn-link text-danger text-decoration-none p-0 small fw-semibold d-inline-flex align-items-center gap-1"
                >
                  <span>Learn about HSCs</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SECTION: Uses of Stem Cell Therapy */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <span className="badge bg-success-subtle text-success rounded-pill px-3 py-1 small fw-semibold mb-2 d-inline-flex align-items-center gap-1">
              <ShieldCheck size={12} />
              <span>Clinical Applications</span>
            </span>
            <h4 className="fw-bold text-dark mb-1">
              <span>🩺 Uses of Stem Cell Therapy</span>
            </h4>
            <p className="text-secondary small mb-0">
              Established and evidence-based clinical indications where stem cell transplantation saves lives
            </p>
          </div>
        </div>

        <div className="row g-3">
          {/* Blood disorders such as leukemia */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 border-start border-4 border-danger" style={{ border: '1px solid #e2e8f0' }}>
              <span className="badge bg-danger-subtle text-danger rounded-pill px-2.5 py-1 small mb-2 d-block w-fit">Blood Cancer</span>
              <h5 className="fw-bold text-dark mb-2">Leukemia</h5>
              <p className="text-secondary small mb-3" style={{ lineHeight: '1.6' }}>
                Stem cell transplantation replaces diseased bone marrow cells with healthy donor cells for Acute Lymphoblastic Leukemia (ALL), Acute Myeloid Leukemia (AML), and CML.
              </p>
              <div className="small text-muted border-top pt-2 d-flex align-items-center gap-1">
                <Check size={13} className="text-success" />
                <span>Established Clinical Standard</span>
              </div>
            </div>
          </div>

          {/* Lymphoma */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 border-start border-4 border-primary" style={{ border: '1px solid #e2e8f0' }}>
              <span className="badge bg-primary-subtle text-primary rounded-pill px-2.5 py-1 small mb-2 d-block w-fit">Lymphatic Cancer</span>
              <h5 className="fw-bold text-dark mb-2">Lymphoma</h5>
              <p className="text-secondary small mb-3" style={{ lineHeight: '1.6' }}>
                For patients suffering from Hodgkin and Non-Hodgkin Lymphoma, autologous or allogeneic transplantation allows curative high-dose therapy followed by immune rescue.
              </p>
              <div className="small text-muted border-top pt-2 d-flex align-items-center gap-1">
                <Check size={13} className="text-success" />
                <span>Standard Curative Regimen</span>
              </div>
            </div>
          </div>

          {/* Some immune-system disorders */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 border-start border-4 border-info" style={{ border: '1px solid #e2e8f0' }}>
              <span className="badge bg-info-subtle text-info-emphasis rounded-pill px-2.5 py-1 small mb-2 d-block w-fit">Immune Rebuilding</span>
              <h5 className="fw-bold text-dark mb-2">Immune Disorders</h5>
              <p className="text-secondary small mb-3" style={{ lineHeight: '1.6' }}>
                Corrects severe immune dysfunctions including Severe Combined Immunodeficiency (SCID), Wiskott-Aldrich syndrome, and severe Aplastic Anemia by providing a new immune system.
              </p>
              <div className="small text-muted border-top pt-2 d-flex align-items-center gap-1">
                <Check size={13} className="text-success" />
                <span>Life-Saving Restoration</span>
              </div>
            </div>
          </div>

          {/* Certain inherited blood disorders */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 border-start border-4 border-success" style={{ border: '1px solid #e2e8f0' }}>
              <span className="badge bg-success-subtle text-success rounded-pill px-2.5 py-1 small mb-2 d-block w-fit">Genetic Conditions</span>
              <h5 className="fw-bold text-dark mb-2">Inherited Disorders</h5>
              <p className="text-secondary small mb-3" style={{ lineHeight: '1.6' }}>
                Offers permanent cures for inherited hemoglobinopathies such as <strong>Sickle Cell Disease</strong> and <strong>Thalassemia Major</strong> with correct genetic instructions.
              </p>
              <div className="small text-muted border-top pt-2 d-flex align-items-center gap-1">
                <Check size={13} className="text-success" />
                <span>Permanent Resolution</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SECTION: Benefits of Stem Cells */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-1 small fw-semibold mb-2 d-inline-flex align-items-center gap-1">
              <Sparkles size={12} />
              <span>Transformative Potential</span>
            </span>
            <h4 className="fw-bold text-dark mb-1">
              <span>🌟 Benefits of Stem Cells</span>
            </h4>
            <p className="text-secondary small mb-0">
              How stem cells provide immediate patient cures and drive future regenerative medicine
            </p>
          </div>
        </div>

        <div className="row g-3">
          {/* Benefit 1 */}
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fs-5 fw-bold text-muted font-monospace">01</span>
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#dbeafe', color: '#2563eb' }}>
                  <HeartPulse size={18} />
                </div>
              </div>
              <h5 className="fw-bold text-dark mb-2">Replace Damaged Cells</h5>
              <p className="text-secondary small mb-0" style={{ lineHeight: '1.65' }}>
                Stem cells can directly regenerate healthy cells to replace those destroyed by disease, chemotherapy, or radiation therapy, rebuilding the entire blood and immune system.
              </p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fs-5 fw-bold text-muted font-monospace">02</span>
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#dcfce7', color: '#16a34a' }}>
                  <Activity size={18} />
                </div>
              </div>
              <h5 className="fw-bold text-dark mb-2">Regenerative Medicine</h5>
              <p className="text-secondary small mb-0" style={{ lineHeight: '1.65' }}>
                Scientists are actively developing methods to generate heart muscle cells, insulin-producing pancreatic cells, and neurons to repair severely injured organs.
              </p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100" style={{ border: '1px solid #e2e8f0' }}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fs-5 fw-bold text-muted font-monospace">03</span>
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                  <BookOpen size={18} />
                </div>
              </div>
              <h5 className="fw-bold text-dark mb-2">Disease Modeling &amp; Drugs</h5>
              <p className="text-secondary small mb-0" style={{ lineHeight: '1.65' }}>
                By differentiating stem cells into diseased human tissues in laboratory dishes, researchers can study disease mechanisms and screen thousands of therapeutic compounds safely.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Real-World Impact: Emily Whitehead */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4" style={{ background: 'var(--k-surface)', border: '1px solid var(--k-border)' }}>
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-danger-subtle text-danger fw-bold px-3 py-1 rounded-pill small">
                ❤️ Real-World Patient Impact
              </span>
              <span className="text-secondary small">Case Study in Cellular Innovation</span>
            </div>
            <h5 className="fw-bold text-dark mb-2">
              Emily Whitehead: Cellular Therapy Remission Story
            </h5>
            <p className="text-secondary small mb-3" style={{ lineHeight: '1.65' }}>
              <strong>Emily Whitehead</strong>, diagnosed with relapsed Acute Lymphoblastic Leukemia (ALL) at age five with no remaining treatment options, became the first pediatric patient in the world to receive experimental CAR-T cell therapy. She achieved complete remission and remains cancer-free over a decade later.
            </p>
            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                onClick={() => handleTriggerAI('Explain Emily Whitehead story and how CAR-T cellular therapy works')}
                className="btn btn-sm btn-outline-danger rounded-pill px-3.5 py-1.5 fw-semibold d-inline-flex align-items-center gap-1.5"
              >
                <MessageSquare size={13} />
                <span>Ask AI about Emily Whitehead</span>
              </button>
              <Link to="/ml-match" className="btn btn-sm btn-link text-decoration-none text-primary fw-semibold p-0 d-inline-flex align-items-center gap-1">
                <span>Check HLA Compatibility</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <div className="col-lg-4 mt-3 mt-lg-0 text-center">
            <div className="p-3.5 rounded-4 border shadow-2xs text-start" style={{ background: 'var(--k-surface-alt)', borderColor: 'var(--k-border)' }}>
              <div className="d-flex align-items-center gap-2 mb-2 text-success fw-bold small">
                <CheckCircle2 size={16} />
                <span>Proven Scientific Remission</span>
              </div>
              <div className="text-dark small mb-1">
                <strong>Diagnosis:</strong> Relapsed ALL
              </div>
              <div className="text-dark small mb-1">
                <strong>Therapy:</strong> CD19-Targeted CAR-T Cell Infusion
              </div>
              <div className="text-dark small">
                <strong>Outcome:</strong> Complete Remission (12+ Years)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Patient Protection Banner: Stay Informed. Stay Safe. */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4" style={{ border: '1px solid rgba(245, 158, 11, 0.35)', background: 'var(--k-surface)' }}>
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill small d-inline-flex align-items-center gap-1">
                <AlertTriangle size={13} />
                <span>Patient Advisory</span>
              </span>
              <span className="fw-bold text-danger">⚠️ Stay Informed. Stay Safe.</span>
            </div>
            <h5 className="fw-bold text-dark mb-2">
              Be Careful of False or Unproven Medical Claims
            </h5>
            <p className="text-secondary small mb-3" style={{ lineHeight: 1.6 }}>
              Predatory clinics often make misleading promises that risk patient health and finances. Always verify the scientific evidence and consult a qualified healthcare professional before considering treatment.
            </p>

            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-1.5 small">
                ❌ “Guaranteed cure”
              </span>
              <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-1.5 small">
                ❌ “No side effects”
              </span>
              <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-1.5 small">
                ❌ “Works for every disease”
              </span>
            </div>
          </div>

          <div className="col-lg-5 mt-3 mt-lg-0">
            <div className="p-3.5 bg-white rounded-4 border shadow-2xs">
              <div className="fw-bold text-dark small mb-2 d-flex align-items-center gap-1.5">
                <ClipboardCheck size={16} className="text-primary" />
                <span>Clinical Safety Checklist</span>
              </div>
              <ul className="list-unstyled small text-secondary mb-0" style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
                <li className="mb-1.5 d-flex align-items-start gap-1.5">
                  <CheckCircle2 size={14} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Only pursue transplants approved by official regulatory authorities (ICMR / CDSCO).</span>
                </li>
                <li className="mb-1.5 d-flex align-items-start gap-1.5">
                  <CheckCircle2 size={14} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Confirm your donor center is certified (e.g. WMDA / FACT-JACIE accredited).</span>
                </li>
                <li className="d-flex align-items-start gap-1.5">
                  <CheckCircle2 size={14} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Seek a second opinion from a licensed board-certified hematologist.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Meet KOSHIKA AI Card & Educational Topics */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white" style={{ border: '1px solid #e2e8f0' }}>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="d-flex align-items-center gap-2 mb-2">
              <div className="rounded-circle p-2 d-flex align-items-center justify-content-center text-white" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)' }}>
                <Bot size={18} />
              </div>
              <h5 className="fw-bold text-dark mb-0">Meet KOSHIKA Clinical AI</h5>
            </div>
            <p className="text-secondary small mb-3">
              KOSHIKA provides educational support to help you understand medical reports, donor matching concepts, and treatment realities. It is free, simple, and accessible 24/7.
            </p>
            <div className="p-2.5 rounded-3 bg-light border small text-muted mb-3 d-flex align-items-center gap-1.5" style={{ fontSize: '0.78rem' }}>
              <Info size={14} className="text-primary flex-shrink-0" />
              <span><strong>Medical Notice:</strong> KOSHIKA provides educational support and does not replace professional medical diagnosis.</span>
            </div>
            <div className="fw-semibold text-success small">
              🌱 Learn. Verify. Consult.
              <span className="text-muted fw-normal ms-1">Better information leads to better healthcare outcomes.</span>
            </div>
          </div>

          <div className="col-lg-6 mt-3 mt-lg-0">
            <div className="fw-semibold text-dark small mb-2">Click any topic to ask KOSHIKA AI:</div>
            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm rounded-pill px-3 py-1.5"
                onClick={() => handleTriggerAI('Tell me about stem cells and their role in the body')}
              >
                🧬 Stem cells
              </button>
              <button
                type="button"
                className="btn btn-outline-success btn-sm rounded-pill px-3 py-1.5"
                onClick={() => handleTriggerAI('How does stem cell transplantation work and who is it for?')}
              >
                🏥 Transplantation
              </button>
              <button
                type="button"
                className="btn btn-outline-info btn-sm rounded-pill px-3 py-1.5"
                onClick={() => handleTriggerAI('How does HLA matching work and why is it important for donors?')}
              >
                🤝 HLA matching
              </button>
              <button
                type="button"
                className="btn btn-outline-warning btn-sm rounded-pill px-3 py-1.5 text-dark"
                onClick={() => handleTriggerAI('What are the risks, limitations, and side effects of stem cell therapies?')}
              >
                ⚠️ Risks &amp; limitations
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1.5"
                onClick={() => handleTriggerAI('What are the biggest myths and facts about stem cell donation?')}
              >
                📚 Myths &amp; facts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoshikaAwarenessPillars;
