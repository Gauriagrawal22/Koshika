import React, { useState } from 'react';
import {
  Dna,
  Droplet,
  Activity,
  Layers,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Sparkles,
  Lightbulb,
  Check,
  X,
  ArrowRight,
  Clock,
  Building2,
  HelpCircle,
  Award,
  Zap,
  Compass,
  Radio,
  Baby,
  RefreshCw,
  ShieldAlert,
  Search,
  CheckCheck,
  TrendingUp,
  Smile,
  Shield,
  ThumbsUp,
  Flame,
  Stethoscope,
  Info,
  Calendar,
  Syringe,
  Eye,
  ArrowDown
} from 'lucide-react';

// =========================================================================
// TOPIC 01: WHAT ARE STEM CELLS?
// Visual Breakdown: The Master Building Blocks of Life
// =========================================================================
export const WhatAreStemCellsVisual = () => {
  const [activeCellBranch, setActiveCellBranch] = useState('blood');

  const branches = {
    blood: {
      title: 'Red Blood Cells (Erythrocytes)',
      role: 'Oxygen & Immunity',
      color: '#e11d48',
      bg: '#fff1f2',
      border: '#fecdd3',
      desc: 'Carries fresh oxygen from lungs to every organ and fights off infections.',
      fact: 'Replaces millions of cells every single second!'
    },
    neuron: {
      title: 'Brain Neurons & Nerves',
      role: 'Electrical Network',
      color: '#2563eb',
      bg: '#eff6ff',
      border: '#bfdbfe',
      desc: 'Transmits electrical signals to control thoughts, movement, and reflexes.',
      fact: 'Forms complex neural highways in your brain and spine.'
    },
    muscle: {
      title: 'Heart & Muscle (Myocytes)',
      role: 'Power & Pumping',
      color: '#16a34a',
      bg: '#f0fdf4',
      border: '#bbf7d0',
      desc: 'Contracts and beats over 100,000 times a day to pump blood through your body.',
      fact: 'Repairs muscle fibers after sports or cardiac stress.'
    },
    bone: {
      title: 'Bone & Joint (Osteocytes)',
      role: 'Skeletal Framework',
      color: '#7c3aed',
      bg: '#f5f3ff',
      border: '#ddd6fe',
      desc: 'Maintains bone density, repairs microscopic fractures, and rebuilds cartilage.',
      fact: 'Continuously renews your skeleton throughout life.'
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      {/* 1. Creative Hero Banner */}
      <div 
        className="rounded-4 p-3 p-md-3.5 border d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 text-center text-sm-start"
        style={{
          background: 'linear-gradient(135deg, #f0fdfa 0%, #e6f7f5 50%, #eff6ff 100%)',
          borderColor: 'rgba(13, 148, 136, 0.25)',
          boxShadow: '0 4px 18px rgba(13, 148, 136, 0.05)'
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 shadow-xs"
            style={{ width: '44px', height: '44px', background: 'radial-gradient(circle, #0d9488 0%, #0f766e 100%)' }}
          >
            <Sparkles size={22} />
          </div>
          <div>
            <div className="d-flex align-items-center gap-2 mb-0.5 justify-content-center justify-content-sm-start flex-wrap">
              <h5 className="fw-bold text-dark mb-0 fs-6">
                Your Body's Master Building Blocks
              </h5>
              <span className="badge rounded-pill bg-teal text-white px-2 py-0.5 small fw-bold" style={{ backgroundColor: '#0d9488', fontSize: '0.68rem' }}>
                BIOLOGY 101
              </span>
            </div>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.84rem' }}>
              Unlike fixed cells, stem cells are "blank seeds" that can transform into any cell your body needs to heal.
            </p>
          </div>
        </div>

        <div className="d-flex gap-1.5 flex-wrap justify-content-center flex-shrink-0">
          <span className="badge rounded-pill bg-white text-dark border px-2.5 py-1 small fw-semibold shadow-xs">
            🌱 100% Natural
          </span>
          <span className="badge rounded-pill bg-white text-dark border px-2.5 py-1 small fw-semibold shadow-xs">
            ⚡ Self-Renewing
          </span>
        </div>
      </div>

      {/* 2. Full-Width Visual Infographic Banner (Fitted Edge-to-Edge) */}
      <div className="rounded-4 overflow-hidden shadow-xs border bg-white" style={{ borderColor: '#e2e8f0' }}>
        <img 
          src="/images/learn/topic1_branches.jpg" 
          alt="Master Stem Cell Differentiation into Blood, Neuron, Muscle, and Bone Cells" 
          className="w-100 d-block"
          style={{ height: 'auto', display: 'block' }}
          loading="lazy"
        />
      </div>

      {/* 3. Interactive Transformation Map */}
      <div className="card border-0 rounded-4 p-3.5 bg-white shadow-xs" style={{ border: '1.5px solid #e2e8f0' }}>
        <div className="d-flex align-items-center justify-content-between mb-2.5 flex-wrap gap-2">
          <div>
            <span className="badge rounded-pill bg-teal-subtle text-teal border border-teal-subtle px-2.5 py-0.5 small fw-bold text-uppercase" style={{ color: '#0f766e', fontSize: '0.68rem', backgroundColor: '#ccfbf1' }}>
              Interactive System Map
            </span>
            <h6 className="fw-bold text-dark mt-1 mb-0">Click a cell type to see its healing function:</h6>
          </div>
          <span className="text-muted small" style={{ fontSize: '0.78rem' }}>Differentiates into 200+ specialized types</span>
        </div>

        {/* 4 Interactive Cell Cards */}
        <div className="row g-2">
          {/* Blood Cell */}
          <div className="col-6 col-md-3">
            <div 
              className={`p-2.5 rounded-3 border h-100 cursor-pointer transition-all ${activeCellBranch === 'blood' ? 'shadow-sm ring-2' : ''}`}
              style={{ 
                background: activeCellBranch === 'blood' ? '#ffe4e6' : '#fff1f2', 
                borderColor: '#fecdd3',
                transform: activeCellBranch === 'blood' ? 'translateY(-2px)' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => setActiveCellBranch('blood')}
            >
              <div className="d-flex align-items-center gap-2 mb-1">
                <div className="rounded-circle text-white p-1 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '28px', height: '28px', background: '#e11d48' }}>
                  <Droplet size={14} />
                </div>
                <span className="fw-bold text-dark small" style={{ fontSize: '0.82rem' }}>Blood Cells</span>
              </div>
              <span className="text-secondary d-block" style={{ fontSize: '0.72rem' }}>Oxygen &amp; Immune Defense</span>
            </div>
          </div>

          {/* Nerve Cell */}
          <div className="col-6 col-md-3">
            <div 
              className={`p-2.5 rounded-3 border h-100 cursor-pointer transition-all ${activeCellBranch === 'neuron' ? 'shadow-sm ring-2' : ''}`}
              style={{ 
                background: activeCellBranch === 'neuron' ? '#dbeafe' : '#eff6ff', 
                borderColor: '#bfdbfe',
                transform: activeCellBranch === 'neuron' ? 'translateY(-2px)' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => setActiveCellBranch('neuron')}
            >
              <div className="d-flex align-items-center gap-2 mb-1">
                <div className="rounded-circle text-white p-1 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '28px', height: '28px', background: '#2563eb' }}>
                  <Activity size={14} />
                </div>
                <span className="fw-bold text-dark small" style={{ fontSize: '0.82rem' }}>Brain &amp; Nerves</span>
              </div>
              <span className="text-secondary d-block" style={{ fontSize: '0.72rem' }}>Signals &amp; Reflexes</span>
            </div>
          </div>

          {/* Muscle Cell */}
          <div className="col-6 col-md-3">
            <div 
              className={`p-2.5 rounded-3 border h-100 cursor-pointer transition-all ${activeCellBranch === 'muscle' ? 'shadow-sm ring-2' : ''}`}
              style={{ 
                background: activeCellBranch === 'muscle' ? '#dcfce7' : '#f0fdf4', 
                borderColor: '#bbf7d0',
                transform: activeCellBranch === 'muscle' ? 'translateY(-2px)' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => setActiveCellBranch('muscle')}
            >
              <div className="d-flex align-items-center gap-2 mb-1">
                <div className="rounded-circle text-white p-1 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '28px', height: '28px', background: '#16a34a' }}>
                  <Heart size={14} />
                </div>
                <span className="fw-bold text-dark small" style={{ fontSize: '0.82rem' }}>Heart &amp; Muscle</span>
              </div>
              <span className="text-secondary d-block" style={{ fontSize: '0.72rem' }}>Pumping &amp; Mobility</span>
            </div>
          </div>

          {/* Bone Cell */}
          <div className="col-6 col-md-3">
            <div 
              className={`p-2.5 rounded-3 border h-100 cursor-pointer transition-all ${activeCellBranch === 'bone' ? 'shadow-sm ring-2' : ''}`}
              style={{ 
                background: activeCellBranch === 'bone' ? '#ede9fe' : '#f5f3ff', 
                borderColor: '#ddd6fe',
                transform: activeCellBranch === 'bone' ? 'translateY(-2px)' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => setActiveCellBranch('bone')}
            >
              <div className="d-flex align-items-center gap-2 mb-1">
                <div className="rounded-circle text-white p-1 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '28px', height: '28px', background: '#7c3aed' }}>
                  <Layers size={14} />
                </div>
                <span className="fw-bold text-dark small" style={{ fontSize: '0.82rem' }}>Bone &amp; Joints</span>
              </div>
              <span className="text-secondary d-block" style={{ fontSize: '0.72rem' }}>Structure &amp; Cartilage</span>
            </div>
          </div>
        </div>

        {/* Selected Branch Detail Spotlight Bar */}
        <div 
          className="p-3 rounded-3 mt-2.5 border d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2"
          style={{ background: branches[activeCellBranch].bg, borderColor: branches[activeCellBranch].border }}
        >
          <div>
            <span className="fw-bold d-block small" style={{ color: branches[activeCellBranch].color }}>
              ✦ {branches[activeCellBranch].title} ({branches[activeCellBranch].role})
            </span>
            <span className="text-dark small" style={{ fontSize: '0.82rem' }}>
              {branches[activeCellBranch].desc}
            </span>
          </div>
          <span className="badge rounded-pill bg-white text-dark border px-2.5 py-1 small fw-semibold flex-shrink-0 shadow-xs">
            {branches[activeCellBranch].fact}
          </span>
        </div>
      </div>

      {/* 4. The 3 Superpowers Infographic Cards */}
      <div className="row g-2.5">
        <div className="col-12 col-md-4">
          <div className="p-3 rounded-4 border bg-white h-100 shadow-xs" style={{ borderLeft: '4px solid #0d9488' }}>
            <div className="d-flex align-items-center justify-content-between mb-1.5">
              <div className="d-flex align-items-center gap-2">
                <RefreshCw size={18} style={{ color: '#0d9488' }} />
                <span className="fw-bold text-dark small">1. Self-Renewal</span>
              </div>
              <span className="badge bg-teal-subtle text-teal rounded-pill px-2 py-0.5" style={{ fontSize: '0.68rem', color: '#0f766e', backgroundColor: '#ccfbf1' }}>
                Endless Pool
              </span>
            </div>
            <p className="text-secondary small mb-2" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
              They divide to clone themselves forever. Your body never runs out of fresh seed cells.
            </p>
            <div className="progress" style={{ height: '6px', backgroundColor: '#e2e8f0' }}>
              <div className="progress-bar rounded-pill" style={{ width: '100%', backgroundColor: '#0d9488' }}></div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-3 rounded-4 border bg-white h-100 shadow-xs" style={{ borderLeft: '4px solid #7c3aed' }}>
            <div className="d-flex align-items-center justify-content-between mb-1.5">
              <div className="d-flex align-items-center gap-2">
                <Zap size={18} style={{ color: '#7c3aed' }} />
                <span className="fw-bold text-dark small">2. Shape-Shifting</span>
              </div>
              <span className="badge rounded-pill px-2 py-0.5" style={{ fontSize: '0.68rem', backgroundColor: '#ede9fe', color: '#7c3aed' }}>
                200+ Types
              </span>
            </div>
            <p className="text-secondary small mb-2" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
              They switch identity into skin, blood, or bone cells depending on which organ is hurt.
            </p>
            <div className="progress" style={{ height: '6px', backgroundColor: '#e2e8f0' }}>
              <div className="progress-bar rounded-pill" style={{ width: '85%', backgroundColor: '#7c3aed' }}></div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-3 rounded-4 border bg-white h-100 shadow-xs" style={{ borderLeft: '4px solid #ea580c' }}>
            <div className="d-flex align-items-center justify-content-between mb-1.5">
              <div className="d-flex align-items-center gap-2">
                <ShieldCheck size={18} style={{ color: '#ea580c' }} />
                <span className="fw-bold text-dark small">3. Natural Healer</span>
              </div>
              <span className="badge bg-warning-subtle text-warning-emphasis rounded-pill px-2 py-0.5" style={{ fontSize: '0.68rem' }}>
                GPS Homing
              </span>
            </div>
            <p className="text-secondary small mb-2" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
              They travel through veins to injured spots and release proteins that reboot local healing.
            </p>
            <div className="progress" style={{ height: '6px', backgroundColor: '#e2e8f0' }}>
              <div className="progress-bar rounded-pill" style={{ width: '95%', backgroundColor: '#ea580c' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// TOPIC 02: HOW DO THEY WORK?
// Visual Breakdown: 4-step healing journey with step badges & flow diagram
// =========================================================================
export const HowDoTheyWorkVisual = () => {
  return (
    <div className="d-flex flex-column gap-3">
      {/* 1. Creative Hero Banner */}
      <div 
        className="rounded-4 p-3 p-md-3.5 border d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 text-center text-sm-start"
        style={{
          background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #eff6ff 100%)',
          borderColor: 'rgba(124, 58, 237, 0.25)',
          boxShadow: '0 4px 18px rgba(124, 58, 237, 0.05)'
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 shadow-xs"
            style={{ width: '44px', height: '44px', background: 'radial-gradient(circle, #7c3aed 0%, #6d28d9 100%)' }}
          >
            <Compass size={22} />
          </div>
          <div>
            <div className="d-flex align-items-center gap-2 mb-0.5 justify-content-center justify-content-sm-start flex-wrap">
              <h5 className="fw-bold text-dark mb-0 fs-6">
                The 4-Step Healing Pathway
              </h5>
              <span className="badge rounded-pill text-white px-2 py-0.5 small fw-bold" style={{ backgroundColor: '#7c3aed', fontSize: '0.68rem' }}>
                HOW IT WORKS
              </span>
            </div>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.84rem' }}>
              How stem cells cruise through blood vessels, locate damage, and reconstruct fresh tissue.
            </p>
          </div>
        </div>

        <span className="badge rounded-pill bg-white text-dark border px-3 py-1.5 small fw-semibold shadow-xs flex-shrink-0">
          🧭 Automatic GPS Homing
        </span>
      </div>

      {/* 2. Full-Width Visual Infographic Banner (Fitted Edge-to-Edge) */}
      <div className="rounded-4 overflow-hidden shadow-xs border bg-white" style={{ borderColor: '#e2e8f0' }}>
        <img 
          src="/images/learn/topic2_homing.jpg" 
          alt="How Stem Cells Work: 4 Steps of SOS Signal, Homing, Division, and Repair" 
          className="w-100 d-block"
          style={{ height: 'auto', display: 'block' }}
          loading="lazy"
        />
      </div>

      {/* 3. Four Visual Step Cards */}
      <div className="row g-2.5">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 rounded-4 border bg-white h-100 shadow-xs position-relative" style={{ borderTop: '4px solid #ef4444' }}>
            <span className="badge rounded-pill bg-danger-subtle text-danger border border-danger-subtle px-2 py-0.5 fw-bold mb-2 small" style={{ fontSize: '0.68rem' }}>
              STEP 1
            </span>
            <div className="d-flex align-items-center gap-2 mb-1.5">
              <Radio size={18} className="text-danger" />
              <span className="fw-bold text-dark small">SOS Signal</span>
            </div>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
              Damaged tissues release chemical alarm calls (cytokines) into the blood stream.
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 rounded-4 border bg-white h-100 shadow-xs position-relative" style={{ borderTop: '4px solid #0284c7' }}>
            <span className="badge rounded-pill bg-info-subtle text-info border border-info-subtle px-2 py-0.5 fw-bold mb-2 small" style={{ fontSize: '0.68rem' }}>
              STEP 2
            </span>
            <div className="d-flex align-items-center gap-2 mb-1.5">
              <Compass size={18} className="text-info" />
              <span className="fw-bold text-dark small">GPS Homing</span>
            </div>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
              Stem cells detect the scent and glide through blood vessels directly to the cavity.
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 rounded-4 border bg-white h-100 shadow-xs position-relative" style={{ borderTop: '4px solid #8b5cf6' }}>
            <span className="badge rounded-pill px-2 py-0.5 fw-bold mb-2 small" style={{ backgroundColor: '#f3e8ff', color: '#7c3aed', fontSize: '0.68rem' }}>
              STEP 3
            </span>
            <div className="d-flex align-items-center gap-2 mb-1.5">
              <RefreshCw size={18} style={{ color: '#7c3aed' }} />
              <span className="fw-bold text-dark small">Smart Division</span>
            </div>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
              The cell splits: 1 keeps the master seed pool alive, while 1 transforms to heal.
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 rounded-4 border bg-white h-100 shadow-xs position-relative" style={{ borderTop: '4px solid #10b981' }}>
            <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-2 py-0.5 fw-bold mb-2 small" style={{ fontSize: '0.68rem' }}>
              STEP 4
            </span>
            <div className="d-flex align-items-center gap-2 mb-1.5">
              <ShieldCheck size={18} className="text-success" />
              <span className="fw-bold text-dark small">Tissue Rebirth</span>
            </div>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
              New cells take root, replace scars, and calm inflammation with growth factors.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Illustrated Flowchart Diagram: Asymmetric Division */}
      <div className="card border-0 rounded-4 p-3 bg-white shadow-xs" style={{ border: '1.5px solid #e2e8f0' }}>
        <h6 className="fw-bold text-dark mb-2 text-center small">Division &amp; Homing at a Glance</h6>
        <div className="p-2.5 rounded-3 d-flex flex-column flex-sm-row align-items-center justify-content-around gap-2 text-center" style={{ background: '#f8fafc' }}>
          <div className="d-flex align-items-center gap-2">
            <div className="rounded-circle p-1.5 text-white shadow-xs" style={{ background: '#e11d48' }}>
              <Dna size={14} />
            </div>
            <span className="small fw-bold text-dark">1 Master Cell</span>
          </div>

          <span className="text-muted fw-bold">➔</span>

          <div className="d-flex align-items-center gap-2">
            <div className="rounded-circle p-1.5 text-white shadow-xs" style={{ background: '#0284c7' }}>
              <RefreshCw size={14} />
            </div>
            <span className="small fw-bold text-dark">Splits in Two</span>
          </div>

          <span className="text-muted fw-bold">➔</span>

          <div className="d-flex align-items-center gap-2">
            <div className="rounded-circle p-1.5 text-white shadow-xs" style={{ background: '#16a34a' }}>
              <CheckCircle2 size={14} />
            </div>
            <span className="small fw-bold text-dark">1 Healer + 1 Reserve Seed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// TOPIC 03: TYPES OF STEM CELLS
// Visual Breakdown: 3 clear categories (HSC, MSC, Cord Blood)
// =========================================================================
export const TypesOfStemCellsVisual = () => {
  return (
    <div className="d-flex flex-column gap-3">
      {/* 1. Header Ribbon */}
      <div 
        className="rounded-4 p-3 p-md-3.5 border d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 text-center text-sm-start"
        style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #f0fdfa 100%)',
          borderColor: 'rgba(37, 99, 235, 0.25)',
          boxShadow: '0 4px 18px rgba(37, 99, 235, 0.05)'
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 shadow-xs"
            style={{ width: '44px', height: '44px', background: 'radial-gradient(circle, #2563eb 0%, #1d4ed8 100%)' }}
          >
            <Layers size={22} />
          </div>
          <div>
            <div className="d-flex align-items-center gap-2 mb-0.5 justify-content-center justify-content-sm-start flex-wrap">
              <h5 className="fw-bold text-dark mb-0 fs-6">
                The 3 Types You Need to Know
              </h5>
              <span className="badge rounded-pill bg-primary text-white px-2 py-0.5 small fw-bold" style={{ fontSize: '0.68rem' }}>
                3 CATEGORIES
              </span>
            </div>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.84rem' }}>
              Doctors categorize stem cells based on where they come from and which organs they heal.
            </p>
          </div>
        </div>

        <span className="badge rounded-pill bg-white text-dark border px-3 py-1.5 small fw-semibold shadow-xs flex-shrink-0">
          🩸 Blood • 🦴 Tissue • 👶 Newborn
        </span>
      </div>

      {/* 2. Full-Width Visual Infographic Banner (Fitted Edge-to-Edge) */}
      <div className="rounded-4 overflow-hidden shadow-xs border bg-white" style={{ borderColor: '#e2e8f0' }}>
        <img 
          src="/images/learn/topic3_types.jpg" 
          alt="Comparison Chart of Hematopoietic HSC, Mesenchymal MSC, and Umbilical Cord Blood" 
          className="w-100 d-block"
          style={{ height: 'auto', display: 'block' }}
          loading="lazy"
        />
      </div>

      {/* 3. Three Type Cards Side-by-Side */}
      <div className="row g-3">
        {/* HSC */}
        <div className="col-12 col-md-4">
          <div className="card border-0 rounded-4 p-3.5 h-100 shadow-xs" style={{ background: '#fff1f2', border: '1.5px solid #fecdd3' }}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="rounded-circle p-2 text-white shadow-xs" style={{ background: '#e11d48' }}>
                <Droplet size={18} />
              </div>
              <span className="badge rounded-pill bg-danger-subtle text-danger border border-danger-subtle small fw-bold">
                BLOOD HSC
              </span>
            </div>
            <h6 className="fw-bold text-dark mb-1">Blood Stem Cells (HSC)</h6>
            <p className="text-muted small mb-2" style={{ fontSize: '0.78rem' }}>
              <strong>Where:</strong> Bone marrow &amp; blood
            </p>
            <p className="text-secondary small mb-3" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
              The blood factory. Produces 100% of red cells (oxygen), white cells (immunity), and platelets (clotting).
            </p>
            <div className="p-2 rounded-3 bg-white border mt-auto">
              <span className="fw-bold text-danger d-block small" style={{ fontSize: '0.74rem' }}>PROVEN TO CURE:</span>
              <span className="text-dark small" style={{ fontSize: '0.78rem' }}>Leukemia, Thalassemia, Aplastic Anemia</span>
            </div>
          </div>
        </div>

        {/* MSC */}
        <div className="col-12 col-md-4">
          <div className="card border-0 rounded-4 p-3.5 h-100 shadow-xs" style={{ background: '#f5f3ff', border: '1.5px solid #ddd6fe' }}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="rounded-circle p-2 text-white shadow-xs" style={{ background: '#7c3aed' }}>
                <Layers size={18} />
              </div>
              <span className="badge rounded-pill px-2.5 py-0.5 small fw-bold" style={{ background: '#ede9fe', color: '#7c3aed' }}>
                TISSUE MSC
              </span>
            </div>
            <h6 className="fw-bold text-dark mb-1">Tissue Stem Cells (MSC)</h6>
            <p className="text-muted small mb-2" style={{ fontSize: '0.78rem' }}>
              <strong>Where:</strong> Bone marrow, fat &amp; cord tissue
            </p>
            <p className="text-secondary small mb-3" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
              Forms structural tissue: bone, cartilage, and tendons. Acts as an immune peacekeeper to calm swelling.
            </p>
            <div className="p-2 rounded-3 bg-white border mt-auto">
              <span className="fw-bold d-block small" style={{ color: '#7c3aed', fontSize: '0.74rem' }}>PROVEN TO CURE:</span>
              <span className="text-dark small" style={{ fontSize: '0.78rem' }}>Joint repair, immune calming, GVHD</span>
            </div>
          </div>
        </div>

        {/* Cord Blood */}
        <div className="col-12 col-md-4">
          <div className="card border-0 rounded-4 p-3.5 h-100 shadow-xs" style={{ background: '#f0fdfa', border: '1.5px solid #ccfbf1' }}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="rounded-circle p-2 text-white shadow-xs" style={{ background: '#0d9488' }}>
                <Baby size={18} />
              </div>
              <span className="badge rounded-pill bg-teal text-white small fw-bold" style={{ background: '#0d9488' }}>
                NEWBORN CORD
              </span>
            </div>
            <h6 className="fw-bold text-dark mb-1">Cord Blood Cells</h6>
            <p className="text-muted small mb-2" style={{ fontSize: '0.78rem' }}>
              <strong>Where:</strong> Umbilical cord at birth
            </p>
            <p className="text-secondary small mb-3" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
              Collected safely with zero pain right after birth. Younger, more adaptable, and carries lower rejection risk.
            </p>
            <div className="p-2 rounded-3 bg-white border mt-auto">
              <span className="fw-bold text-teal d-block small" style={{ color: '#0d9488', fontSize: '0.74rem' }}>PROVEN TO CURE:</span>
              <span className="text-dark small" style={{ fontSize: '0.78rem' }}>Pediatric transplants, family biobanking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// TOPIC 04: USES & BENEFITS
// Visual Breakdown: 4 conditions + The 4-Phase IV Drip Infographic ("No Surgery!")
// =========================================================================
export const UsesAndBenefitsVisual = () => {
  return (
    <div className="d-flex flex-column gap-3">
      {/* 1. Header Ribbon */}
      <div 
        className="rounded-4 p-3 p-md-3.5 border d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 text-center text-sm-start"
        style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #eff6ff 100%)',
          borderColor: 'rgba(22, 163, 74, 0.25)',
          boxShadow: '0 4px 18px rgba(22, 163, 74, 0.05)'
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 shadow-xs"
            style={{ width: '44px', height: '44px', background: 'radial-gradient(circle, #16a34a 0%, #15803d 100%)' }}
          >
            <Award size={22} />
          </div>
          <div>
            <div className="d-flex align-items-center gap-2 mb-0.5 justify-content-center justify-content-sm-start flex-wrap">
              <h5 className="fw-bold text-dark mb-0 fs-6">
                Curative Treatments &amp; Transplants
              </h5>
              <span className="badge rounded-pill bg-success text-white px-2 py-0.5 small fw-bold" style={{ fontSize: '0.68rem' }}>
                PROVEN CURES
              </span>
            </div>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.84rem' }}>
              Stem cell therapy is officially approved and curative for blood cancers and genetic disorders.
            </p>
          </div>
        </div>

        <span className="badge rounded-pill bg-white text-dark border px-3 py-1.5 small fw-semibold shadow-xs flex-shrink-0">
          💧 Simple IV Drip • No Surgery
        </span>
      </div>

      {/* 2. Full-Width Visual Infographic Banner (Fitted Edge-to-Edge) */}
      <div className="rounded-4 overflow-hidden shadow-xs border bg-white" style={{ borderColor: '#e2e8f0' }}>
        <img 
          src="/images/learn/topic4_transplant.jpg" 
          alt="Stem Cell Transplant: Painless IV Drip Infusion in Hospital Bed with Approved Conditions" 
          className="w-100 d-block"
          style={{ height: 'auto', display: 'block' }}
          loading="lazy"
        />
      </div>

      {/* 3. Four Disease Cards */}
      <div className="row g-2.5">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 rounded-4 border bg-white h-100 shadow-xs d-flex align-items-start gap-2" style={{ borderLeft: '4px solid #e11d48' }}>
            <Droplet size={18} className="text-danger flex-shrink-0 mt-0.5" />
            <div>
              <span className="fw-bold text-dark d-block small">Blood Cancers</span>
              <span className="text-secondary" style={{ fontSize: '0.76rem', lineHeight: 1.35 }}>
                Leukemia &amp; Lymphoma marrow replacement.
              </span>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 rounded-4 border bg-white h-100 shadow-xs d-flex align-items-start gap-2" style={{ borderLeft: '4px solid #7c3aed' }}>
            <Dna size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#7c3aed' }} />
            <div>
              <span className="fw-bold text-dark d-block small">Thalassemia</span>
              <span className="text-secondary" style={{ fontSize: '0.76rem', lineHeight: 1.35 }}>
                Ends lifelong blood transfusions permanently.
              </span>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 rounded-4 border bg-white h-100 shadow-xs d-flex align-items-start gap-2" style={{ borderLeft: '4px solid #0284c7' }}>
            <ShieldCheck size={18} className="text-info flex-shrink-0 mt-0.5" />
            <div>
              <span className="fw-bold text-dark d-block small">Aplastic Anemia</span>
              <span className="text-secondary" style={{ fontSize: '0.76rem', lineHeight: 1.35 }}>
                Restarts blood cell production in failed marrow.
              </span>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 rounded-4 border bg-white h-100 shadow-xs d-flex align-items-start gap-2" style={{ borderLeft: '4px solid #16a34a' }}>
            <Baby size={18} className="text-success flex-shrink-0 mt-0.5" />
            <div>
              <span className="fw-bold text-dark d-block small">Immune SCID</span>
              <span className="text-secondary" style={{ fontSize: '0.76rem', lineHeight: 1.35 }}>
                Builds normal immune defense for babies.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. The 4-Phase Transplant Walkthrough: "It's Not a Surgery!" */}
      <div className="card border-0 rounded-4 p-3 bg-white shadow-xs" style={{ border: '1.5px solid #e2e8f0' }}>
        <div className="text-center mb-2">
          <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-2.5 py-0.5 small fw-bold" style={{ fontSize: '0.68rem' }}>
            RECOVERY TIMELINE
          </span>
          <h6 className="fw-bold text-dark mt-1 mb-0.5 small">The 4-Phase Transplant Timeline</h6>
          <p className="text-muted small mb-0" style={{ fontSize: '0.76rem' }}>Cells are infused through an arm vein like a blood bag; they home to bones automatically</p>
        </div>

        <div className="row g-2 text-center">
          <div className="col-6 col-md-3">
            <div className="p-2.5 rounded-3 bg-light border h-100">
              <span className="badge bg-secondary text-white rounded-pill px-2 py-0.5 small mb-1" style={{ fontSize: '0.68rem' }}>1. Prep</span>
              <span className="fw-bold text-dark d-block small">Conditioning</span>
              <span className="text-muted" style={{ fontSize: '0.72rem' }}>Clears diseased marrow space</span>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="p-2.5 rounded-3 bg-info-subtle border border-info-subtle h-100">
              <span className="badge bg-info text-white rounded-pill px-2 py-0.5 small mb-1" style={{ fontSize: '0.68rem' }}>2. Day 0</span>
              <span className="fw-bold text-dark d-block small">IV Infusion</span>
              <span className="text-muted" style={{ fontSize: '0.72rem' }}>Painless arm drip (no scalpels!)</span>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="p-2.5 rounded-3 border h-100" style={{ background: '#f5f3ff', borderColor: '#ddd6fe' }}>
              <span className="badge text-white rounded-pill px-2 py-0.5 small mb-1" style={{ background: '#7c3aed', fontSize: '0.68rem' }}>3. 14-21 Days</span>
              <span className="fw-bold text-dark d-block small">Engraftment</span>
              <span className="text-muted" style={{ fontSize: '0.72rem' }}>Cells find bone cavities &amp; grow</span>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="p-2.5 rounded-3 bg-success-subtle border border-success-subtle h-100">
              <span className="badge bg-success text-white rounded-pill px-2 py-0.5 small mb-1" style={{ fontSize: '0.68rem' }}>4. Rebirth</span>
              <span className="fw-bold text-dark d-block small">New Immunity</span>
              <span className="text-muted" style={{ fontSize: '0.72rem' }}>Patient produces 100% fresh blood!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// TOPIC 05: SAFETY & RISKS
// Visual Breakdown: Risk vs Doctor Shield + Safety Traffic Light
// =========================================================================
export const SafetyAndRisksVisual = () => {
  return (
    <div className="d-flex flex-column gap-3">
      {/* 1. Header Ribbon */}
      <div 
        className="rounded-4 p-3 p-md-3.5 border d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 text-center text-sm-start"
        style={{
          background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #f0fdfa 100%)',
          borderColor: 'rgba(234, 88, 12, 0.25)',
          boxShadow: '0 4px 18px rgba(234, 88, 12, 0.05)'
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 shadow-xs"
            style={{ width: '44px', height: '44px', background: 'radial-gradient(circle, #ea580c 0%, #c2410c 100%)' }}
          >
            <ShieldAlert size={22} />
          </div>
          <div>
            <div className="d-flex align-items-center gap-2 mb-0.5 justify-content-center justify-content-sm-start flex-wrap">
              <h5 className="fw-bold text-dark mb-0 fs-6">
                Understanding Safety &amp; Protection
              </h5>
              <span className="badge rounded-pill text-white px-2 py-0.5 small fw-bold" style={{ backgroundColor: '#ea580c', fontSize: '0.68rem' }}>
                SAFETY PROTOCOLS
              </span>
            </div>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.84rem' }}>
              How certified hospital teams protect patients and avoid unapproved commercial scams.
            </p>
          </div>
        </div>

        <span className="badge rounded-pill bg-white text-dark border px-3 py-1.5 small fw-semibold shadow-xs flex-shrink-0">
          🛡️ 10/10 DNA Match • HEPA Filters
        </span>
      </div>

      {/* 2. Full-Width Visual Infographic Banner (Fitted Edge-to-Edge) */}
      <div className="rounded-4 overflow-hidden shadow-xs border bg-white" style={{ borderColor: '#e2e8f0' }}>
        <img 
          src="/images/learn/topic5_safety.jpg" 
          alt="Safety and Risks: Certified Hospital Cleanrooms vs Warning on Unapproved Spas" 
          className="w-100 d-block"
          style={{ height: 'auto', display: 'block' }}
          loading="lazy"
        />
      </div>

      {/* 3. Side-by-Side: Risk vs Doctor Shield */}
      <div className="d-flex flex-column gap-2">
        <div className="p-3 rounded-4 border bg-white shadow-xs d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2">
          <div className="d-flex align-items-center gap-2">
            <span className="badge rounded-pill bg-danger-subtle text-danger px-2.5 py-1 small fw-bold">RISK 1</span>
            <span className="fw-bold text-dark small">Rejection (GvHD)</span>
          </div>
          <div className="d-flex align-items-center gap-2 text-success small fw-semibold">
            <ShieldCheck size={18} className="text-success flex-shrink-0" />
            <span>Prevented by precise 10/10 HLA DNA matching &amp; gentle medications</span>
          </div>
        </div>

        <div className="p-3 rounded-4 border bg-white shadow-xs d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2">
          <div className="d-flex align-items-center gap-2">
            <span className="badge rounded-pill bg-danger-subtle text-danger px-2.5 py-1 small fw-bold">RISK 2</span>
            <span className="fw-bold text-dark small">Temporary Low Immunity</span>
          </div>
          <div className="d-flex align-items-center gap-2 text-success small fw-semibold">
            <ShieldCheck size={18} className="text-success flex-shrink-0" />
            <span>Protected in HEPA-filtered clean rooms with positive air pressure</span>
          </div>
        </div>

        <div className="p-3 rounded-4 border bg-white shadow-xs d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2">
          <div className="d-flex align-items-center gap-2">
            <span className="badge rounded-pill bg-danger-subtle text-danger px-2.5 py-1 small fw-bold">RISK 3</span>
            <span className="fw-bold text-dark small">Transfusion Reaction</span>
          </div>
          <div className="d-flex align-items-center gap-2 text-success small fw-semibold">
            <ShieldCheck size={18} className="text-success flex-shrink-0" />
            <span>Prevented by pre-testing vitals and anti-allergy premedications</span>
          </div>
        </div>
      </div>

      {/* 4. Green vs Red Safety Traffic Light */}
      <div className="row g-2.5">
        <div className="col-12 col-md-6">
          <div className="p-3.5 rounded-4 border h-100 shadow-xs" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
            <div className="d-flex align-items-center gap-2 mb-2 text-success fw-bold">
              <CheckCircle2 size={18} />
              <span>SAFE &amp; APPROVED STANDARDS</span>
            </div>
            <ul className="small text-secondary ps-3 mb-0 d-flex flex-column gap-1.5" style={{ fontSize: '0.82rem' }}>
              <li>Performed in certified NABH or FACT-JACIE hospital centers.</li>
              <li>Approved for blood cancers, thalassemia, and marrow failure.</li>
              <li>Verified HLA matching and clear informed consent.</li>
            </ul>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="p-3.5 rounded-4 border h-100 shadow-xs" style={{ background: '#fef2f2', borderColor: '#fecdd3' }}>
            <div className="d-flex align-items-center gap-2 mb-2 text-danger fw-bold">
              <AlertTriangle size={18} />
              <span>UNAPPROVED SCAMS TO AVOID</span>
            </div>
            <ul className="small text-secondary ps-3 mb-0 d-flex flex-column gap-1.5" style={{ fontSize: '0.82rem' }}>
              <li>Commercial clinics promising "100% cure" for autism, anti-aging, or diabetes.</li>
              <li>Charging large sums without CDSCO clinical trial approval.</li>
              <li>Spas without cleanroom BMT isolation facilities.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// TOPIC 06: MYTHS VS FACTS
// Visual Breakdown: 4 prominent side-by-side mythbusters
// =========================================================================
export const MythsVsFactsVisual = () => {
  return (
    <div className="d-flex flex-column gap-3">
      {/* 1. Header Ribbon */}
      <div 
        className="rounded-4 p-3 p-md-3.5 border d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 text-center text-sm-start"
        style={{
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #f0fdfa 100%)',
          borderColor: 'rgba(217, 119, 6, 0.25)',
          boxShadow: '0 4px 18px rgba(217, 119, 6, 0.05)'
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 shadow-xs"
            style={{ width: '44px', height: '44px', background: 'radial-gradient(circle, #d97706 0%, #b45309 100%)' }}
          >
            <HelpCircle size={22} />
          </div>
          <div>
            <div className="d-flex align-items-center gap-2 mb-0.5 justify-content-center justify-content-sm-start flex-wrap">
              <h5 className="fw-bold text-dark mb-0 fs-6">
                Common Myths vs Scientific Reality
              </h5>
              <span className="badge rounded-pill text-white px-2 py-0.5 small fw-bold" style={{ backgroundColor: '#d97706', fontSize: '0.68rem' }}>
                MYTHBUSTERS
              </span>
            </div>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.84rem' }}>
              Clear away the biggest fears with proven medical facts.
            </p>
          </div>
        </div>

        <span className="badge rounded-pill bg-white text-dark border px-3 py-1.5 small fw-semibold shadow-xs flex-shrink-0">
          ❌ 0 Spine Surgery • ✅ 100% Regrowth
        </span>
      </div>

      {/* 2. Full-Width Visual Infographic Banner (Fitted Edge-to-Edge) */}
      <div className="rounded-4 overflow-hidden shadow-xs border bg-white" style={{ borderColor: '#e2e8f0' }}>
        <img 
          src="/images/learn/topic6_myths.jpg" 
          alt="Myths vs Facts: Spine Surgery Myth vs Arm Blood Donation Fact" 
          className="w-100 d-block"
          style={{ height: 'auto', display: 'block' }}
          loading="lazy"
        />
      </div>

      {/* 3. Four Myth vs Fact Cards */}
      <div className="d-flex flex-column gap-2.5">
        {/* Card 1: Spine Surgery Myth */}
        <div className="card border-0 rounded-4 p-3 bg-white shadow-xs" style={{ border: '1.5px solid #e2e8f0' }}>
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-6 border-end-md pe-md-3">
              <div className="d-flex align-items-start gap-2 text-danger mb-1">
                <X size={18} className="flex-shrink-0 mt-0.5" />
                <span className="fw-bold small">MYTH: "Donation drills into your spine"</span>
              </div>
              <p className="text-muted small ps-4 mb-0" style={{ fontSize: '0.8rem' }}>
                Many people fear stem cell donation involves painful surgery into the spinal cord.
              </p>
            </div>
            <div className="col-12 col-md-6 ps-md-3">
              <div className="d-flex align-items-start gap-2 text-success mb-1">
                <Check size={18} strokeWidth={3} className="flex-shrink-0 mt-0.5" />
                <span className="fw-bold small">FACT: 90% is done through your arm vein</span>
              </div>
              <p className="text-secondary small ps-4 mb-0" style={{ fontSize: '0.8rem' }}>
                Donation is done via blood filtration (apheresis). You sit comfortably, watch TV, and your spine is never touched!
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Permanent Weakness Myth */}
        <div className="card border-0 rounded-4 p-3 bg-white shadow-xs" style={{ border: '1.5px solid #e2e8f0' }}>
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-6 border-end-md pe-md-3">
              <div className="d-flex align-items-start gap-2 text-danger mb-1">
                <X size={18} className="flex-shrink-0 mt-0.5" />
                <span className="fw-bold small">MYTH: "Donating makes you permanently weak"</span>
              </div>
              <p className="text-muted small ps-4 mb-0" style={{ fontSize: '0.8rem' }}>
                People worry they will lose their life energy or damage their own immune system.
              </p>
            </div>
            <div className="col-12 col-md-6 ps-md-3">
              <div className="d-flex align-items-start gap-2 text-success mb-1">
                <Check size={18} strokeWidth={3} className="flex-shrink-0 mt-0.5" />
                <span className="fw-bold small">FACT: Body regenerates cells in 2-3 weeks</span>
              </div>
              <p className="text-secondary small ps-4 mb-0" style={{ fontSize: '0.8rem' }}>
                Your bone marrow immediately replaces 100% of donated cells. Donors return to work in 1-2 days!
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Miracle Cure Myth */}
        <div className="card border-0 rounded-4 p-3 bg-white shadow-xs" style={{ border: '1.5px solid #e2e8f0' }}>
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-6 border-end-md pe-md-3">
              <div className="d-flex align-items-start gap-2 text-danger mb-1">
                <X size={18} className="flex-shrink-0 mt-0.5" />
                <span className="fw-bold small">MYTH: "Cures aging, baldness &amp; autism"</span>
              </div>
              <p className="text-muted small ps-4 mb-0" style={{ fontSize: '0.8rem' }}>
                Online ads claim stem cells can reverse aging or cure any brain condition.
              </p>
            </div>
            <div className="col-12 col-md-6 ps-md-3">
              <div className="d-flex align-items-start gap-2 text-success mb-1">
                <Check size={18} strokeWidth={3} className="flex-shrink-0 mt-0.5" />
                <span className="fw-bold small">FACT: Only blood and marrow diseases are approved</span>
              </div>
              <p className="text-secondary small ps-4 mb-0" style={{ fontSize: '0.8rem' }}>
                ICMR and international medical councils strictly warn that beauty spa injections are unverified scams.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Open Surgery Myth */}
        <div className="card border-0 rounded-4 p-3 bg-white shadow-xs" style={{ border: '1.5px solid #e2e8f0' }}>
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-6 border-end-md pe-md-3">
              <div className="d-flex align-items-start gap-2 text-danger mb-1">
                <X size={18} className="flex-shrink-0 mt-0.5" />
                <span className="fw-bold small">MYTH: "A transplant is an open organ surgery"</span>
              </div>
              <p className="text-muted small ps-4 mb-0" style={{ fontSize: '0.8rem' }}>
                Patients imagine scalpels, incisions, and surgical operations to receive cells.
              </p>
            </div>
            <div className="col-12 col-md-6 ps-md-3">
              <div className="d-flex align-items-start gap-2 text-success mb-1">
                <Check size={18} strokeWidth={3} className="flex-shrink-0 mt-0.5" />
                <span className="fw-bold small">FACT: It is a simple IV drip in your arm</span>
              </div>
              <p className="text-secondary small ps-4 mb-0" style={{ fontSize: '0.8rem' }}>
                Stem cells know where to go on their own. They are infused like a blood bag while you sit in bed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
