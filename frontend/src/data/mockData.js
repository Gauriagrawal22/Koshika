/**
 * STEMBRIDGE AI / KOSHIKA — CLINICAL & RESEARCH MOCK DATA STORE
 * Realistic, high-fidelity sample data for healthcare & biobanking SaaS UI
 */

export const INITIAL_USER = {
  id: 'USR-1082',
  name: 'Dr. Mitesh Sawant, MD, PhD',
  email: 'doctor@koshika.ai',
  role: 'doctor', // 'patient' | 'doctor' | 'admin' | 'researcher'
  title: 'Director of Cellular Therapy & BMT',
  department: 'Haemato-Oncology & Stem Cell Transplantation',
  institution: 'Koshika Advanced Cell Institute & Mazumdar Shaw Centre',
  registrationNumber: 'MCI-2018-94821',
  avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
  phone: '+91 98200 45892',
  location: 'Bengaluru, India',
  twoFactorEnabled: true,
  lastLogin: 'Today at 09:14 AM'
};

export const DEMO_ACCOUNTS = {
  doctor: {
    name: 'Dr. Mitesh Sawant, MD, PhD',
    email: 'doctor@koshika.ai',
    role: 'doctor',
    title: 'Lead Haemato-Oncologist & BMT Specialist',
    institution: 'Mazumdar Shaw Medical Centre'
  },
  patient: {
    name: 'Aarav Sharma',
    email: 'patient@koshika.ai',
    role: 'patient',
    title: 'Patient (AML in CR1)',
    institution: 'Patient Care Network'
  },
  admin: {
    name: 'Sunita Rao',
    email: 'admin@koshika.ai',
    role: 'admin',
    title: 'Director of Biobank Operations & Quality',
    institution: 'StemBridge Central Biobank'
  },
  researcher: {
    name: 'Dr. Elena Rostova, PhD',
    email: 'research@koshika.ai',
    role: 'researcher',
    title: 'Principal Investigator, Cell Therapy Trials',
    institution: 'Genomics & Regenerative Medicine Dept'
  }
};

export const METRICS_DATA = {
  totalPatients: 1482,
  patientsGrowth: '+8.4%',
  activeTrials: 14,
  trialsGrowth: '+2 this month',
  cryoSpecimens: 8940,
  cryoCapacityPct: 94.2,
  hlaMatchRate: 87.6,
  matchRateGrowth: '+4.1%',
  avgTurnaroundHours: 4.2,
  turnaroundReduction: '-18%',
  complianceScore: 99.4
};

export const PATIENTS_DATA = [
  {
    id: 'PT-9042',
    name: 'Aarav Sharma',
    age: 34,
    gender: 'Male',
    bloodGroup: 'B+',
    diagnosis: 'Acute Myeloid Leukemia (AML)',
    stage: 'First Complete Remission (CR1)',
    primaryDoctor: 'Dr. Mitesh Sawant',
    hospital: 'Mazumdar Shaw Cancer Centre',
    admissionDate: '2026-08-12',
    priority: 'Critical',
    hlaStatus: '10/10 Matched',
    cd34Count: '6.4 x 10^6/kg',
    status: 'Scheduled for BMT',
    avatar: 'AS'
  },
  {
    id: 'PT-9043',
    name: 'Priyanka Sen',
    age: 28,
    gender: 'Female',
    bloodGroup: 'O+',
    diagnosis: 'B-Cell Acute Lymphoblastic Leukemia (B-ALL)',
    stage: 'Relapsed / Refractory',
    primaryDoctor: 'Dr. Sunil Bhat',
    hospital: 'Narayana Health City',
    admissionDate: '2026-08-29',
    priority: 'High',
    hlaStatus: '9/10 Matched (1 Mismatch)',
    cd34Count: '5.1 x 10^6/kg',
    status: 'Conditioning Regimen',
    avatar: 'PS'
  },
  {
    id: 'PT-9044',
    name: 'Vikramaditya Iyer',
    age: 46,
    gender: 'Male',
    bloodGroup: 'A+',
    diagnosis: 'Multiple Myeloma (IgG Kappa)',
    stage: 'Post-Induction Consolidation',
    primaryDoctor: 'Dr. Sharat Damodar',
    hospital: 'Mazumdar Shaw Cancer Centre',
    admissionDate: '2026-09-02',
    priority: 'Stable',
    hlaStatus: 'Autologous Harvest',
    cd34Count: '8.2 x 10^6/kg',
    status: 'Stem Cell Mobilization',
    avatar: 'VI'
  },
  {
    id: 'PT-9045',
    name: 'Ananya Deshmukh',
    age: 19,
    gender: 'Female',
    bloodGroup: 'AB-',
    diagnosis: 'Severe Aplastic Anemia (SAA)',
    stage: 'Severe Cytopenia',
    primaryDoctor: 'Dr. Sunil Bhat',
    hospital: 'Tata Memorial Hospital',
    admissionDate: '2026-09-08',
    priority: 'Critical',
    hlaStatus: 'Pending Donor Search',
    cd34Count: 'N/A (Aplastic)',
    status: 'Triage & HLA Typing',
    avatar: 'AD'
  },
  {
    id: 'PT-9046',
    name: 'Karan Mehra',
    age: 52,
    gender: 'Male',
    bloodGroup: 'O-',
    diagnosis: 'Myelodysplastic Syndrome (MDS-EB2)',
    stage: 'High IPSS-R Score',
    primaryDoctor: 'Dr. Mitesh Sawant',
    hospital: 'Mazumdar Shaw Cancer Centre',
    admissionDate: '2026-09-10',
    priority: 'High',
    hlaStatus: '10/10 Matched',
    cd34Count: 'Pending Infusion',
    status: 'Pre-Transplant Workup',
    avatar: 'KM'
  },
  {
    id: 'PT-9047',
    name: 'Meera Nambiar',
    age: 41,
    gender: 'Female',
    bloodGroup: 'B-',
    diagnosis: 'Thalassemia Major (Transfusion Dependent)',
    stage: 'Iron Overload Controlled',
    primaryDoctor: 'Dr. Sunil Bhat',
    hospital: 'Narayana Health City',
    admissionDate: '2026-09-12',
    priority: 'Stable',
    hlaStatus: '10/10 Sibling Match',
    cd34Count: '7.0 x 10^6/kg',
    status: 'Donor Workup Complete',
    avatar: 'MN'
  },
  {
    id: 'PT-9048',
    name: 'Devraj Mukherjee',
    age: 63,
    gender: 'Male',
    bloodGroup: 'A-',
    diagnosis: 'Chronic Myelomonocytic Leukemia (CMML)',
    stage: 'Transformed Blast Phase',
    primaryDoctor: 'Dr. Sharat Damodar',
    hospital: 'Apollo Cancer Centre',
    admissionDate: '2026-09-14',
    priority: 'Critical',
    hlaStatus: 'Cord Blood Candidate',
    cd34Count: '4.8 x 10^6/kg',
    status: 'Urgent Registry Search',
    avatar: 'DM'
  },
  {
    id: 'PT-9049',
    name: 'Fatima Zohra',
    age: 31,
    gender: 'Female',
    bloodGroup: 'O+',
    diagnosis: 'Hodgkin Lymphoma (Classical)',
    stage: 'Relapse post-ABVD',
    primaryDoctor: 'Dr. Mitesh Sawant',
    hospital: 'Mazumdar Shaw Cancer Centre',
    admissionDate: '2026-09-15',
    priority: 'Stable',
    hlaStatus: 'Autologous Protocol',
    cd34Count: '6.9 x 10^6/kg',
    status: 'Harvest Scheduled',
    avatar: 'FZ'
  }
];

export const DONORS_DATA = [
  {
    id: 'DNR-5104',
    name: 'Rahul Kulkarni',
    age: 26,
    gender: 'Male',
    bloodGroup: 'B+',
    type: 'Unrelated Volunteer Donor',
    hlaMatchScore: '10/10 (High Res)',
    hlaProfile: 'A*02:01, A*24:02, B*40:01, B*51:01, C*03:04, DRB1*15:01',
    cmvStatus: 'CMV Negative',
    readiness: 'Cleared for Apheresis',
    registry: 'DATRI Blood Stem Cell Registry',
    contact: '+91 94481 22910',
    assignedPatient: 'Aarav Sharma (PT-9042)'
  },
  {
    id: 'DNR-5105',
    name: 'Sneha Sen (Sibling)',
    age: 24,
    gender: 'Female',
    bloodGroup: 'O+',
    type: 'Related Sibling Donor',
    hlaMatchScore: '10/10 Genotypic Identical',
    hlaProfile: 'A*01:01, A*03:01, B*07:02, B*08:01, C*07:01, DRB1*03:01',
    cmvStatus: 'CMV Positive',
    readiness: 'G-CSF Mobilization Day 3',
    registry: 'Family Donor Program',
    contact: '+91 98840 91024',
    assignedPatient: 'Priyanka Sen (PT-9043)'
  },
  {
    id: 'DNR-5106',
    name: 'Cord Unit CB-8921',
    age: 0,
    gender: 'Female',
    bloodGroup: 'O-',
    type: 'Umbilical Cord Blood Unit',
    hlaMatchScore: '6/6 Intermediate',
    hlaProfile: 'A*02, A*11, B*15, B*35, DRB1*04, DRB1*07',
    cmvStatus: 'CMV Negative (Maternal)',
    readiness: 'Cryo-Preserved in Liquid N2',
    registry: 'Koshika Public Biobank',
    contact: 'Biobank Tank Gamma-4',
    assignedPatient: 'Devraj Mukherjee (PT-9048)'
  },
  {
    id: 'DNR-5107',
    name: 'Arjun Nambiar (Sibling)',
    age: 38,
    gender: 'Male',
    bloodGroup: 'B-',
    type: 'Related Sibling Donor',
    hlaMatchScore: '10/10 Identical',
    hlaProfile: 'A*11:01, A*33:03, B*44:03, B*57:01, C*06:02, DRB1*07:01',
    cmvStatus: 'CMV Negative',
    readiness: 'Medical Clearance Complete',
    registry: 'Family Donor Program',
    contact: '+91 97410 88231',
    assignedPatient: 'Meera Nambiar (PT-9047)'
  },
  {
    id: 'DNR-5108',
    name: 'Kavita Chawla',
    age: 31,
    gender: 'Female',
    bloodGroup: 'A+',
    type: 'Unrelated Volunteer Donor',
    hlaMatchScore: '9/10 (DQB1 Permissive)',
    hlaProfile: 'A*02:01, A*02:06, B*35:01, B*40:06, C*04:01, DRB1*12:02',
    cmvStatus: 'CMV Negative',
    readiness: 'In Workup & Infectious Screen',
    registry: 'DKMS-BMST Registry',
    contact: '+91 98112 34901',
    assignedPatient: 'Karan Mehra (PT-9046)'
  },
  {
    id: 'DNR-5109',
    name: 'Cord Unit CB-9140',
    age: 0,
    gender: 'Male',
    bloodGroup: 'AB-',
    type: 'Umbilical Cord Blood Unit',
    hlaMatchScore: '5/6 Intermediate',
    hlaProfile: 'A*01, A*24, B*08, B*40, DRB1*03, DRB1*11',
    cmvStatus: 'CMV Negative (Maternal)',
    readiness: 'Cryo-Preserved in Liquid N2',
    registry: 'LifeCell Stem Bank',
    contact: 'Biobank Tank Alpha-2',
    assignedPatient: 'Ananya Deshmukh (PT-9045)'
  }
];

export const STAFF_DATA = [
  {
    id: 'STF-301',
    name: 'Dr. Mitesh Sawant, MD, PhD',
    role: 'Director & Lead BMT Specialist',
    department: 'Adult Haemato-Oncology & BMT',
    qualification: 'MD (Haematology), FRCPath, PhD (Cell Therapy)',
    email: 'm.sawant@koshika-health.org',
    status: 'On-Duty / Active',
    activeCases: 14,
    avatar: 'MS'
  },
  {
    id: 'STF-302',
    name: 'Dr. Sunil Bhat, MD',
    role: 'Senior Consultant Paediatric BMT',
    department: 'Paediatric Haematology & Cellular Therapy',
    qualification: 'MD, DNB (Pediatrics), Fellowship in BMT (UK)',
    email: 'sunil.bhat@koshika-health.org',
    status: 'In Consultation',
    activeCases: 11,
    avatar: 'SB'
  },
  {
    id: 'STF-303',
    name: 'Dr. Sharat Damodar, MD',
    role: 'Clinical Director & Head of Oncology',
    department: 'Stem Cell Transplantation & CAR-T',
    qualification: 'MD (Internal Med), DM (Clinical Haematology)',
    email: 'sharat.damodar@koshika-health.org',
    status: 'In Procedure',
    activeCases: 18,
    avatar: 'SD'
  },
  {
    id: 'STF-304',
    name: 'Dr. Elena Rostova, PhD',
    role: 'Principal Bioinformatician',
    department: 'Genomic Research & HLA Typing Lab',
    qualification: 'PhD in Computational Genomics, Stanford',
    email: 'elena.r@koshika-health.org',
    status: 'On-Duty / Active',
    activeCases: 9,
    avatar: 'ER'
  },
  {
    id: 'STF-305',
    name: 'Sunita Rao, MSc',
    role: 'Biobank Operations Manager',
    department: 'Cryo-Storage & Quality Control',
    qualification: 'MSc Biotechnology, Certified ISBER Biobanker',
    email: 'sunita.rao@koshika-health.org',
    status: 'On-Duty / Active',
    activeCases: 32,
    avatar: 'SR'
  },
  {
    id: 'STF-306',
    name: 'Rajesh Khurana',
    role: 'Lead Apheresis & Cell Processing Specialist',
    department: 'Stem Cell Processing Laboratory',
    qualification: 'BSc MLT, Certified Cell Therapy Technologist',
    email: 'r.khurana@koshika-health.org',
    status: 'Off-Shift',
    activeCases: 6,
    avatar: 'RK'
  }
];

export const INVENTORY_DATA = [
  {
    id: 'INV-401',
    name: 'Umbilical Cord Blood CD34+ Aliquots',
    category: 'Biospecimen',
    batchLot: 'UCB-2026-0819',
    location: 'CryoTank-Gamma Rack #4, Box B',
    temperature: '-196°C (Liquid N2)',
    quantity: 48,
    reorderLevel: 20,
    unit: 'vials',
    status: 'Optimal',
    expiryDate: '2036-08-19',
    unitCost: '₹145,000'
  },
  {
    id: 'INV-402',
    name: 'CD34-PE Flow Cytometry Monoclonal Antibody',
    category: 'Lab Reagent',
    batchLot: 'BD-88421-PE',
    location: 'Reagent Fridge R2 (+4°C)',
    temperature: '+4°C',
    quantity: 12,
    reorderLevel: 15,
    unit: 'kits (50 tests)',
    status: 'Low Stock',
    expiryDate: '2026-11-30',
    unitCost: '₹34,500'
  },
  {
    id: 'INV-403',
    name: 'CryoStor CS10 Cell Freeze Medium (10% DMSO)',
    category: 'Cryoprotectant',
    batchLot: 'CS10-99214',
    location: 'Sub-Zero Freezer F1 (-80°C)',
    temperature: '-80°C',
    quantity: 85,
    reorderLevel: 30,
    unit: 'bottles (100ml)',
    status: 'Optimal',
    expiryDate: '2027-04-15',
    unitCost: '₹18,200'
  },
  {
    id: 'INV-404',
    name: 'NextSeq 550 High-Throughput HLA Typing Cartridge',
    category: 'Lab Reagent',
    batchLot: 'ILM-HLA-7712',
    location: 'Sequencing Core Cabinet C3',
    temperature: '-20°C',
    quantity: 6,
    reorderLevel: 10,
    unit: 'flow cells',
    status: 'Critical',
    expiryDate: '2026-10-15',
    unitCost: '₹220,000'
  },
  {
    id: 'INV-405',
    name: 'StemPro-34 SFM Complete Cell Expansion Medium',
    category: 'Cell Culture',
    batchLot: 'GIB-34-5501',
    location: 'Cell Processing Cold Room (+4°C)',
    temperature: '+4°C',
    quantity: 34,
    reorderLevel: 25,
    unit: 'packs (500ml)',
    status: 'Optimal',
    expiryDate: '2027-01-20',
    unitCost: '₹28,900'
  },
  {
    id: 'INV-406',
    name: '2.0 mL Internal Thread Sterile Cryovials',
    category: 'Consumable',
    batchLot: 'CRN-2026-781',
    location: 'Sterile Consumables Store Bay 2',
    temperature: 'Ambient (20-25°C)',
    quantity: 1450,
    reorderLevel: 500,
    unit: 'pcs',
    status: 'Optimal',
    expiryDate: '2031-12-31',
    unitCost: '₹45'
  },
  {
    id: 'INV-407',
    name: 'Spectra Optia Apheresis Collection Kits (MNC)',
    category: 'Consumable',
    batchLot: 'TER-OPT-412',
    location: 'Apheresis Suite Storage',
    temperature: 'Ambient (20-25°C)',
    quantity: 18,
    reorderLevel: 20,
    unit: 'sets',
    status: 'Low Stock',
    expiryDate: '2027-06-30',
    unitCost: '₹42,000'
  },
  {
    id: 'INV-408',
    name: 'Filgrastim (G-CSF) 300 mcg / 0.5 mL Syringes',
    category: 'Clinical Pharmaceutical',
    batchLot: 'FIL-9812-INJ',
    location: 'Clinical Pharmacy Vault (+4°C)',
    temperature: '+4°C',
    quantity: 110,
    reorderLevel: 40,
    unit: 'pre-filled syringes',
    status: 'Optimal',
    expiryDate: '2027-08-14',
    unitCost: '₹3,200'
  }
];

export const RESEARCH_ANALYTICS_DATA = {
  kpis: [
    { title: '1-Year Overall Survival (OS)', value: '78.6%', trend: '+3.4%', status: 'positive', description: 'Across all allogeneic BMT cohorts' },
    { title: 'Acute GVHD (Grade III-IV) Incidence', value: '7.2%', trend: '-2.1%', status: 'positive', description: '180-day follow-up post-engraftment' },
    { title: 'Median Neutrophil Engraftment', value: '14.2 Days', trend: '-1.5 days', status: 'positive', description: 'Time to ANC > 500 cells/μL' },
    { title: 'Diagnostic Compliance & QA Audit', value: '99.4%', trend: '+0.6%', status: 'positive', description: 'FACT/JACIE & CAP regulatory score' }
  ],
  diseaseBreakdown: [
    { disease: 'Acute Myeloid Leukemia (AML)', count: 420, percentage: 38.2, color: '#0284c7' },
    { disease: 'B-Cell Acute Lymphoblastic (ALL)', count: 295, percentage: 26.8, color: '#0d9488' },
    { disease: 'Multiple Myeloma (MM)', count: 185, percentage: 16.8, color: '#8b5cf6' },
    { disease: 'Thalassemia Major & SAA', count: 125, percentage: 11.4, color: '#10b981' },
    { disease: 'Myelodysplastic Syndromes (MDS)', count: 75, percentage: 6.8, color: '#f59e0b' }
  ],
  trialPhases: [
    { name: 'Phase I: CD19/CD22 Dual CAR-T for Relapsed ALL', enrolled: 18, target: 24, status: 'Active Enrollment', leadPI: 'Dr. Mitesh Sawant' },
    { name: 'Phase II: Post-BMT Alpha-Beta T-Cell Depletion', enrolled: 42, target: 50, status: 'Near Completion', leadPI: 'Dr. Sharat Damodar' },
    { name: 'Phase III: G-CSF vs Plerixafor Mobilization in SAA', enrolled: 88, target: 100, status: 'Active Follow-up', leadPI: 'Dr. Sunil Bhat' },
    { name: 'Phase I/II: Cord Blood Expansion with UM171', enrolled: 12, target: 20, status: 'Protocol Initiation', leadPI: 'Dr. Elena Rostova' }
  ],
  survivalCurvePoints: [
    { month: '0m', allogeneic: 100, autologous: 100, historical: 100 },
    { month: '3m', allogeneic: 94, autologous: 98, historical: 88 },
    { month: '6m', allogeneic: 88, autologous: 93, historical: 79 },
    { month: '9m', allogeneic: 83, autologous: 89, historical: 72 },
    { month: '12m', allogeneic: 79, autologous: 85, historical: 66 },
    { month: '18m', allogeneic: 75, autologous: 81, historical: 61 },
    { month: '24m', allogeneic: 72, autologous: 78, historical: 57 }
  ],
  auditLogs: [
    { id: 'LOG-9941', event: 'CD34+ Harvest Viability Verified', user: 'Dr. Mitesh Sawant', timestamp: '2026-09-18 10:45 AM', hash: 'SHA256:7f8a9...b41', status: 'Verified' },
    { id: 'LOG-9942', event: 'HLA 10/10 Match Confirmation Logged', user: 'Dr. Elena Rostova', timestamp: '2026-09-18 09:15 AM', hash: 'SHA256:2b1c4...e92', status: 'Verified' },
    { id: 'LOG-9943', event: 'CryoTank-Gamma Liquid N2 Replenishment', user: 'Sunita Rao', timestamp: '2026-09-17 04:30 PM', hash: 'SHA256:9c4e2...a11', status: 'Verified' },
    { id: 'LOG-9944', event: 'Patient Consent Document Cryptographically Signed', user: 'Patient Aarav Sharma', timestamp: '2026-09-17 01:20 PM', hash: 'SHA256:4d7a1...c88', status: 'Verified' },
    { id: 'LOG-9945', event: 'Automated CAP/CLIA Quality Telemetry Export', user: 'System Worker v3', timestamp: '2026-09-16 11:00 PM', hash: 'SHA256:1a8f9...32d', status: 'Verified' }
  ]
};

export const MEDICAL_REPORTS_DATA = [
  {
    id: 'REP-2026-001',
    patientId: 'PT-9042',
    patientName: 'Aarav Sharma',
    reportTitle: 'Flow Cytometry CD34+ Enumeration & Stem Cell Viability Report',
    date: '2026-09-16 14:35',
    labDirector: 'Dr. V. Ramanathan, MD (Pathology)',
    status: 'Verified & Approved',
    specimenSource: 'Peripheral Blood Apheresis Product (MNC)',
    sampleBarcode: 'KSH-APH-2026-9042-01',
    biomarkers: [
      { name: 'Total CD34+ Absolute Count', value: '5.82 x 10^6 cells/kg', refRange: '≥ 4.0 x 10^6 cells/kg', status: 'Optimal', abnormal: false },
      { name: '7-AAD Cell Viability', value: '96.4%', refRange: '≥ 90.0%', status: 'Optimal', abnormal: false },
      { name: 'Total Nucleated Cells (TNC)', value: '8.4 x 10^8 /kg', refRange: '6.0 - 10.0 x 10^8 /kg', status: 'Normal', abnormal: false },
      { name: 'Platelet Yield', value: '4.8 x 10^11', refRange: '3.0 - 6.0 x 10^11', status: 'Normal', abnormal: false },
      { name: 'Residual RBC Volume', value: '< 15 mL', refRange: '< 20 mL', status: 'Safe', abnormal: false }
    ],
    hlaTyping: {
      locusA: 'A*02:01, A*24:02',
      locusB: 'B*40:01, B*51:01',
      locusC: 'C*03:04, C*07:02',
      locusDRB1: 'DRB1*15:01, DRB1*04:03',
      locusDQB1: 'DQB1*06:01, DQB1*03:02',
      matchGrade: 'Grade A (10/10 Allele Match)'
    },
    vitalsHistory: [
      { time: '08:00 AM', bp: '118/76', hr: '72 bpm', temp: '98.4°F', spo2: '99%' },
      { time: '11:30 AM', bp: '122/80', hr: '76 bpm', temp: '98.6°F', spo2: '99%' },
      { time: '02:30 PM', bp: '120/78', hr: '74 bpm', temp: '98.5°F', spo2: '100%' }
    ],
    clinicalNotes: 'Apheresis product yields adequate therapeutic CD34+ cell dose (>5.0 x 10^6/kg recipient body weight). Excellent post-collection viability (96.4%). Recommend proceeding with cryopreservation protocol KSH-CP-04 in 10% DMSO media.'
  },
  {
    id: 'REP-2026-002',
    patientId: 'PT-9043',
    patientName: 'Priyanka Sen',
    reportTitle: 'High-Resolution Next-Generation HLA Allelic Typing Panel',
    date: '2026-09-14 11:10',
    labDirector: 'Dr. Elena Rostova, PhD',
    status: 'Verified & Approved',
    specimenSource: 'Whole Blood (EDTA)',
    sampleBarcode: 'KSH-HLA-2026-9043-02',
    biomarkers: [
      { name: 'DNA Purity Ratio (A260/280)', value: '1.88', refRange: '1.80 - 2.00', status: 'Optimal', abnormal: false },
      { name: 'Sequencing Depth / Coverage', value: '450x', refRange: '≥ 200x', status: 'High Quality', abnormal: false },
      { name: 'Allelic Confidence Index', value: '99.98%', refRange: '≥ 99.5%', status: 'Definitive', abnormal: false }
    ],
    hlaTyping: {
      locusA: 'A*01:01, A*03:01',
      locusB: 'B*07:02, B*08:01',
      locusC: 'C*07:01, C*07:02',
      locusDRB1: 'DRB1*03:01, DRB1*15:01',
      locusDQB1: 'DQB1*02:01, DQB1*06:02',
      matchGrade: 'Grade B (9/10 Match with Donor DNR-5105)'
    },
    vitalsHistory: [
      { time: '09:00 AM', bp: '110/70', hr: '68 bpm', temp: '98.2°F', spo2: '99%' },
      { time: '01:00 PM', bp: '114/72', hr: '70 bpm', temp: '98.4°F', spo2: '99%' }
    ],
    clinicalNotes: 'Single HLA-B locus permissive mismatch identified against unrelated panel, but related sibling donor Sneha Sen provides 10/10 genotypically identical compatibility. Sibling allograft strongly indicated.'
  },
  {
    id: 'REP-2026-003',
    patientId: 'PT-9042',
    patientName: 'Aarav Sharma',
    reportTitle: 'Bone Marrow Aspirate & Cytogenetics / Molecular Panel',
    date: '2026-09-02 16:20',
    labDirector: 'Dr. V. Ramanathan, MD (Pathology)',
    status: 'Verified & Approved',
    specimenSource: 'Posterior Superior Iliac Spine (BM Aspirate)',
    sampleBarcode: 'KSH-BMA-2026-9042-03',
    biomarkers: [
      { name: 'Bone Marrow Blast Percentage', value: '2.4%', refRange: '< 5.0% (CR)', status: 'Morphologic CR', abnormal: false },
      { name: 'Cellularity', value: '60% (Normocellular)', refRange: '50 - 70%', status: 'Normal', abnormal: false },
      { name: 'Myeloid:Erythroid (M:E) Ratio', value: '3.2:1', refRange: '2:1 - 4:1', status: 'Normal', abnormal: false },
      { name: 'NPM1 Mutation (qPCR)', value: 'Negative (<0.01%)', refRange: 'Undetectable', status: 'MRD Negative', abnormal: false },
      { name: 'FLT3-ITD Mutation', value: 'Not Detected', refRange: 'Negative', status: 'Favorable Risk', abnormal: false }
    ],
    hlaTyping: {
      locusA: 'A*02:01, A*24:02',
      locusB: 'B*40:01, B*51:01',
      locusC: 'C*03:04, C*07:02',
      locusDRB1: 'DRB1*15:01, DRB1*04:03',
      locusDQB1: 'DQB1*06:01, DQB1*03:02',
      matchGrade: 'Favorable Genetic Profile'
    },
    vitalsHistory: [
      { time: '02:00 PM', bp: '124/82', hr: '78 bpm', temp: '98.6°F', spo2: '98%' }
    ],
    clinicalNotes: 'Bone marrow assessment confirms Complete Remission (CR1) with undetectable measurable residual disease (MRD negative). Patient is in optimal condition for allogeneic stem cell consolidation.'
  }
];

export const AI_SUGGESTED_PROMPTS = [
  'Assess CD34+ cell dose and engraftment probability for a 68kg AML recipient in CR1.',
  'Analyze HLA-DPB1 permissive vs non-permissive mismatches in 9/10 matched unrelated donor.',
  'Summarize clinical indications and toxicity management for Treosulfan vs Busulfan conditioning.',
  'Calculate hematopoietic cell transplantation comorbidity index (HCT-CI) score for Patient PT-9042.',
  'What are the consensus guidelines for post-transplant cytomegalovirus (CMV) reactivation prophylaxis?'
];

export const AI_KNOWLEDGE_BASE = {
  'cd34': {
    summary: 'CD34+ stem cell enumeration is the primary clinical metric for estimating hematopoietic graft potency.',
    confidence: '98.2%',
    evidence: 'ASH / EBMT Consensus Guidelines (2024)',
    findings: [
      'Minimum threshold: 2.0 x 10^6 CD34+ cells/kg recipient weight.',
      'Optimal therapeutic target: 5.0 - 8.0 x 10^6 CD34+ cells/kg for rapid neutrophil (day 12-14) and platelet (day 14-18) recovery.',
      'Doses > 10.0 x 10^6/kg may increase chronic GVHD risk in unmanipulated peripheral blood allografts without improving overall survival.'
    ],
    recommendation: 'For Patient PT-9042 (68kg, harvest dose 5.82 x 10^6/kg), the dose is in the optimal therapeutic window. No supplementary mobilization required.'
  },
  'hla': {
    summary: 'High-resolution allelic matching at HLA-A, -B, -C, -DRB1, and -DQB1 (10/10) maximizes disease-free survival.',
    confidence: '96.8%',
    evidence: 'NMDP / CIBMTR High-Resolution Matching Standards',
    findings: [
      'Single mismatch at HLA-DQB1 has the least impact on non-relapse mortality (NRM).',
      'HLA-DPB1 T-cell epitope (TCE) matching tool should be queried to classify mismatches into permissive vs non-permissive.',
      'Non-permissive DPB1 mismatches correlate with a 2.4x higher risk of acute GVHD Grade III-IV.'
    ],
    recommendation: 'In 9/10 donor situations, prioritize permissive DPB1 allele combinations and consider post-transplant cyclophosphamide (PTCy) GVHD prophylaxis.'
  },
  'default': {
    summary: 'KOSHIKA Clinical AI synthesized current biomedical guidelines and registry cohort evidence for this inquiry.',
    confidence: '95.4%',
    evidence: 'FACT-JACIE Standards & Blood Advances 2025',
    findings: [
      'Patient risk stratification should integrate cytogenetic risk (ELN 2022) with HCT-CI comorbidity scores.',
      'In CR1 patients undergoing allogeneic transplant, early donor identification reduces pre-transplant relapse attrition by 34%.',
      'Continuous telemetry monitoring of cryopreservation liquid nitrogen tanks ensures >95% post-thaw stem cell viability.'
    ],
    recommendation: 'Correlate with primary transplant physician evaluation and multidisciplinary tumor board consensus before clinical execution.'
  }
};

export const NOTIFICATIONS_DATA = [
  {
    id: 'NOTIF-1',
    category: 'Urgent Clinical',
    title: 'Flow Cytometry Harvest Viability Verified',
    message: 'Apheresis product for Aarav Sharma (PT-9042) confirmed CD34+ dose 5.82 x 10^6/kg with 96.4% cell viability.',
    timestamp: '12 mins ago',
    type: 'success',
    unread: true,
    actionLink: '/report-viewer/REP-2026-001',
    actionText: 'View Report'
  },
  {
    id: 'NOTIF-2',
    category: 'Specimen Alert',
    title: 'Low Reagent Stock Warning: NextSeq HLA Cartridges',
    message: 'NextSeq 550 High-Throughput HLA Typing Cartridges fell below reorder threshold (6 flow cells remaining).',
    timestamp: '45 mins ago',
    type: 'warning',
    unread: true,
    actionLink: '/inventory',
    actionText: 'Manage Inventory'
  },
  {
    id: 'NOTIF-3',
    category: 'Urgent Clinical',
    title: 'Donor DNR-5104 Cleared for G-CSF Mobilization',
    message: 'Medical workup and infectious disease screening for volunteer donor Rahul Kulkarni approved by transplant board.',
    timestamp: '2 hours ago',
    type: 'info',
    unread: true,
    actionLink: '/management?tab=donors',
    actionText: 'View Donor'
  },
  {
    id: 'NOTIF-4',
    category: 'Research & Trials',
    title: 'Phase II CAR-T Trial Protocol Amendment Approved',
    message: 'Institutional Review Board (IRB) approved updated lymphodepletion inclusion criteria for Protocol CT-02.',
    timestamp: '5 hours ago',
    type: 'info',
    unread: false,
    actionLink: '/reports',
    actionText: 'View Analytics'
  },
  {
    id: 'NOTIF-5',
    category: 'System Audit',
    title: 'Automated Biobank Cryo-Telemetry Backup Complete',
    message: 'Hourly temperature logs from CryoTanks Alpha through Delta cryptographically committed to immutable audit ledger.',
    timestamp: 'Yesterday',
    type: 'neutral',
    unread: false,
    actionLink: '/reports',
    actionText: 'Audit Log'
  },
  {
    id: 'NOTIF-6',
    category: 'Urgent Clinical',
    title: 'Urgent Registry Match Flagged: SAA Patient',
    message: 'New prospective 10/10 cord blood match candidate identified for Ananya Deshmukh (PT-9045).',
    timestamp: 'Yesterday',
    type: 'warning',
    unread: false,
    actionLink: '/management?tab=patients',
    actionText: 'Triage Patient'
  }
];
