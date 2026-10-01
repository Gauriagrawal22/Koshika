/**
 * STEMBRIDGE AI / KOSHIKA — ENTERPRISE GOVERNANCE & OPERATIONS DATA
 * ------------------------------------------------------------------
 * Industry-oriented seed data for the governance, compliance, access-control,
 * AI-oversight and observability modules.
 *
 * Corresponds to APP_INFORMATION.md section 18 (Complete Industry Feature
 * Blueprint): 18.1 Identity/access, 18.11 AI governance, 18.13 Quality and
 * regulatory operations, 18.14 Interoperability, 18.15 Platform engineering.
 *
 * The dataset is deterministic so the platform behaves identically in every
 * demonstration and review environment. All records are synthetic.
 */

export const DATA_PROVENANCE = {
  mode: 'demonstration',
  label: 'Demonstration dataset',
  detail:
    'Synthetic clinical, biobank and governance records. Not for diagnostic, treatment, transplant-eligibility or donor-selection use.',
  datasetVersion: '2026.09-r4',
  generatedAt: '2026-09-18T06:00:00+05:30',
  retentionPolicy: 'Regulated records retained per facility policy; audit events retained 7 years (immutable).',
};

/* --------------------------------------------------------------------------
   Compliance frameworks & accreditation posture (18.13)
   -------------------------------------------------------------------------- */
export const STANDARDS = [
  { code: 'DISHA', name: 'Digital Information Security in Healthcare Act (alignment)', scope: 'India · Health data privacy', status: 'aligned', coverage: 82, owner: 'Data Protection Officer' },
  { code: 'ICMR', name: 'ICMR National Ethical Guidelines for Biomedical Research', scope: 'India · Research ethics', status: 'in-progress', coverage: 74, owner: 'Ethics Committee' },
  { code: 'NABH', name: 'NABH standards for blood centres & transplant services', scope: 'India · Clinical accreditation', status: 'in-progress', coverage: 68, owner: 'Quality Head' },
  { code: 'HIPAA', name: 'HIPAA Security & Privacy Rule (alignment)', scope: 'United States · PHI safeguards', status: 'aligned', coverage: 79, owner: 'Security Officer' },
  { code: 'GDPR', name: 'GDPR data-subject rights & lawful basis', scope: 'European Union · Personal data', status: 'gap', coverage: 51, owner: 'Data Protection Officer' },
  { code: 'ISO 13485', name: 'ISO 13485 medical device QMS (software as component)', scope: 'International · Quality system', status: 'gap', coverage: 44, owner: 'Regulatory Affairs' },
  { code: 'FACT', name: 'FACT cellular therapy standards', scope: 'International · Cell therapy', status: 'in-progress', coverage: 63, owner: 'Biobank Medical Director' },
  { code: 'AABB', name: 'AABB cellular therapy accreditation', scope: 'International · Transfusion/cellular', status: 'gap', coverage: 39, owner: 'Biobank Medical Director' },
];

/* --------------------------------------------------------------------------
   Organizations, facilities & memberships (18.1)
   -------------------------------------------------------------------------- */
export const ORGANIZATIONS = [
  { id: 'ORG-001', name: 'Narayana Health & Mazumdar Shaw Cancer Centre', type: 'Hospital + Transplant Centre', licenses: 'KTK-BMT-2019-0142', facilities: 3, members: 412, status: 'active' },
  { id: 'ORG-002', name: 'Koshika Cryogenic Biobank, Bengaluru', type: 'Stem Cell Bank', licenses: 'KTK-BIO-2021-0087', facilities: 2, members: 96, status: 'active' },
  { id: 'ORG-003', name: 'Sahyadri Research Institute', type: 'Research Organization', licenses: 'DSIR-TU-2022-3311', facilities: 1, members: 58, status: 'active' },
  { id: 'ORG-004', name: 'Precision Diagnostics Laboratory, Pune', type: 'Reference Laboratory', licenses: 'NABL-MC-2020-7719', facilities: 1, members: 34, status: 'under-review' },
  { id: 'ORG-005', name: 'CryoLogistics India Pvt. Ltd.', type: 'Vendor · Cold chain transport', licenses: 'VND-2023-0455', facilities: 4, members: 21, status: 'active' },
];

export const FACILITIES = [
  { id: 'FAC-001', orgId: 'ORG-001', name: 'BMT Unit — 4th Floor, Tower B', city: 'Bengaluru', kind: 'Transplant unit', departments: 6, capacity: '24 beds', status: 'operational' },
  { id: 'FAC-002', orgId: 'ORG-002', name: 'Cryogenic Vault A (LN2)', city: 'Bengaluru', kind: 'Storage vault', departments: 2, capacity: '8 tanks', status: 'operational' },
  { id: 'FAC-003', orgId: 'ORG-002', name: 'Cryogenic Vault B (LN2, expansion)', city: 'Gurugram', kind: 'Storage vault', departments: 2, capacity: '6 tanks', status: 'commissioning' },
  { id: 'FAC-004', orgId: 'ORG-004', name: 'HLA & Flow Cytometry Laboratory', city: 'Pune', kind: 'Laboratory', departments: 3, capacity: '12 benches', status: 'operational' },
];

export const FACILITY_TANKS = [
  { id: 'TNK-A-01', vault: 'FAC-002', tempC: -196.4, level: 78, samples: 4820, lastCalibration: '2026-08-30', status: 'nominal' },
  { id: 'TNK-A-02', vault: 'FAC-002', tempC: -195.8, level: 64, samples: 3910, lastCalibration: '2026-08-30', status: 'nominal' },
  { id: 'TNK-A-03', vault: 'FAC-002', tempC: -181.2, level: 71, samples: 4405, lastCalibration: '2026-07-14', status: 'deviated' },
  { id: 'TNK-A-04', vault: 'FAC-002', tempC: -196.1, level: 88, samples: 5230, lastCalibration: '2026-09-01', status: 'nominal' },
];

/* --------------------------------------------------------------------------
   Role-based access control matrix (18.1)
   Server-enforced permission model that the console documents and audits.
   Matrix values: full | scoped | read | approval | none
   -------------------------------------------------------------------------- */
export const RBAC_ROLES = [
  { id: 'patient',    label: 'Patient / Caregiver',               scope: 'Self only',               mfa: 'optional', seats: null },
  { id: 'donor',      label: 'Volunteer Donor',                   scope: 'Self only',               mfa: 'optional', seats: null },
  { id: 'nurse',      label: 'Transplant Coordinator / Nurse',    scope: 'Assigned facility',       mfa: 'required', seats: 38 },
  { id: 'doctor',     label: 'Clinician / Transplant Physician',  scope: 'Assigned facility',       mfa: 'required', seats: 74 },
  { id: 'lab',        label: 'Laboratory Scientist (HLA / Flow)', scope: 'Assigned laboratory',     mfa: 'required', seats: 29 },
  { id: 'biobank',    label: 'Biobank Operator',                  scope: 'Assigned vault',          mfa: 'required', seats: 22 },
  { id: 'qa',         label: 'Quality & Compliance Officer',      scope: 'Organization (read-all)', mfa: 'step-up',  seats: 9 },
  { id: 'admin',      label: 'Platform Administrator',            scope: 'Tenant-wide',             mfa: 'step-up',  seats: 5 },
  { id: 'researcher', label: 'Research Investigator',             scope: 'De-identified study data',mfa: 'required', seats: 41 },
  { id: 'auditor',    label: 'External Auditor (time-boxed)',     scope: 'Evidence room only',      mfa: 'step-up',  seats: null },
];

export const RBAC_ACTIONS = ['read', 'create', 'update', 'delete', 'export', 'approve'];

export const RBAC_RESOURCES = [
  'Patient records',
  'Donor registry & HLA data',
  'Biobank inventory & custody',
  'Medical reports & OCR output',
  'AI-generated interpretation',
  'ML compatibility assessment',
  'Appointments & scheduling',
  'Research study data',
  'Billing & service catalogue',
  'Quality records (SOP/CAPA)',
  'Immutable audit trail',
  'Platform configuration & flags',
];

export const RBAC_MATRIX = {
  patient:    ['scoped', 'none',   'none',   'scoped', 'none',   'none',   'scoped', 'none',   'read',   'none',     'none',   'none'],
  donor:      ['none',   'scoped', 'none',   'none',   'none',   'none',   'scoped', 'none',   'none',   'none',     'none',   'none'],
  nurse:      ['scoped', 'scoped', 'read',   'scoped', 'read',   'read',   'full',   'none',   'read',   'create',   'none',   'none'],
  doctor:     ['scoped', 'scoped', 'read',   'full',   'full',   'full',   'full',   'scoped', 'read',   'create',   'read',   'none'],
  lab:        ['read',   'full',   'scoped', 'full',   'read',   'read',   'read',   'scoped', 'none',   'create',   'none',   'none'],
  biobank:    ['none',   'scoped', 'full',   'read',   'none',   'none',   'read',   'none',   'none',   'create',   'none',   'none'],
  qa:         ['read',   'read',   'read',   'read',   'read',   'read',   'read',   'read',   'read',   'approval', 'read',   'none'],
  admin:      ['full',   'full',   'full',   'full',   'full',   'full',   'full',   'full',   'full',   'approval', 'read',   'full'],
  researcher: ['none',   'none',   'none',   'none',   'none',   'read',   'none',   'scoped', 'none',   'none',     'none',   'none'],
  auditor:    ['read',   'read',   'read',   'read',   'read',   'read',   'read',   'read',   'read',   'read',     'read',   'none'],
};

export const IDENTITY_POLICY = [
  { control: 'Password policy',        required: '12+ characters, breach-list checked, rotate on compromise', status: 'enforced',    detail: 'NIST SP 800-63B aligned' },
  { control: 'Multi-factor auth',      required: 'TOTP or passkey for all clinical roles',                   status: 'enforced',    detail: '147 of 152 clinical accounts enrolled' },
  { control: 'Enterprise SSO',         required: 'OIDC / SAML per hospital or laboratory',                  status: 'partial',     detail: '2 of 5 organizations federated' },
  { control: 'Separation of duties',   required: 'Approver must differ from author on quality records',     status: 'enforced',    detail: 'Validated on 100% of CAPA approvals' },
  { control: 'Break-glass access',     required: 'Time-boxed emergency access with justification',          status: 'enforced',    detail: '9 events in trailing 90 days, all reviewed' },
  { control: 'Session policy',         required: 'Idle timeout 15 min, absolute session 8 h',               status: 'enforced',    detail: 'Applies to all authenticated roles' },
  { control: 'Account lockout',        required: 'Progressive delay and lockout after 8 failed attempts',   status: 'enforced',    detail: 'Alert routed to Security Officer' },
  { control: 'Quarterly access review',required: 'Attestation by facility owner each quarter',              status: 'due',         detail: 'Q3 open — 42 of 96 memberships attested' },
  { control: 'SCIM provisioning',      required: 'Automated join / move / leave from hospital IdPs',        status: 'not-started', detail: 'Memberships currently managed manually' },
];

export const SESSIONS = [
  { user: 'Dr. Mitesh Sawant',   role: 'doctor',  facility: 'FAC-001', device: 'Chrome 141 · Windows 11',   ip: '10.24.8.41',   mfa: 'TOTP',    started: '2026-09-18 08:12', lastSeen: '2 min ago',  risk: 'low' },
  { user: 'Dr. Sharat Damodar',  role: 'doctor',  facility: 'FAC-001', device: 'Safari 18 · iPadOS',        ip: '10.24.8.77',   mfa: 'Passkey', started: '2026-09-18 07:40', lastSeen: '18 min ago', risk: 'low' },
  { user: 'Aparna R. (QA)',      role: 'qa',      facility: 'ORG-002', device: 'Edge 140 · Windows 11',     ip: '10.24.9.12',   mfa: 'TOTP',    started: '2026-09-18 09:05', lastSeen: '41 min ago', risk: 'medium' },
  { user: 'Cryo Engineer L2',    role: 'biobank', facility: 'FAC-002', device: 'Chrome 141 · Ubuntu 24.04', ip: '10.24.9.88',   mfa: 'TOTP',    started: '2026-09-17 22:14', lastSeen: '9 h ago',    risk: 'medium' },
  { user: 'External Auditor',    role: 'auditor', facility: '—',       device: 'Firefox 142 · macOS',       ip: '203.0.113.58', mfa: 'TOTP',    started: '2026-09-16 10:00', lastSeen: '2 d ago',    risk: 'elevated' },
];

/* --------------------------------------------------------------------------
   Immutable audit trail (18.13)
   Append-only, hash-chained events with actor identity and request correlation.
   -------------------------------------------------------------------------- */
export const AUDIT_EVENTS = [
  { id: 'EVT-000481', at: '2026-09-18 09:42:11', actor: 'Dr. Mitesh Sawant',    actorRole: 'doctor',    action: 'UPDATE',      entity: 'Patient',             entityId: 'PT-9042',            summary: 'Updated conditioning regimen field',                                 ip: '10.24.8.41',    requestId: 'req_8f21c4a9',   outcome: 'success', hash: 'a41f9c2e7b3d5a86', prevHash: '5d2b71fe90c4a3b8', phi: true },
  { id: 'EVT-000480', at: '2026-09-18 09:38:02', actor: 'Koshika AI Assistant', actorRole: 'system',    action: 'AI_INFER',    entity: 'AIInterpretation',    entityId: 'AI-2291',            summary: 'Generated MARROW interpretation — awaiting clinician verification',  ip: 'internal',      requestId: 'req_2b77e0d1',   outcome: 'success', hash: '7c33d0a418f2e95b', prevHash: 'c9e1a7b2340ff6d1', phi: true },
  { id: 'EVT-000479', at: '2026-09-18 09:31:47', actor: 'Aparna R. (QA)',       actorRole: 'qa',        action: 'APPROVE',     entity: 'CAPA',                entityId: 'CAPA-2026-014',      summary: 'Effectiveness check approved (separation of duties verified)',       ip: '10.24.9.12',    requestId: 'req_91c0aab3',   outcome: 'success', hash: '2f88b1d7c904a5e2', prevHash: '7c33d0a418f2e95b', phi: false },
  { id: 'EVT-000478', at: '2026-09-18 09:20:19', actor: 'Cryo Engineer L2',     actorRole: 'biobank',   action: 'READ',        entity: 'Storage',             entityId: 'STG-7712',           summary: 'Chain-of-custody record opened',                                     ip: '10.24.9.88',    requestId: 'req_5a12bb47',   outcome: 'success', hash: 'e11c7f042ab6d938', prevHash: '2f88b1d7c904a5e2', phi: false },
  { id: 'EVT-000477', at: '2026-09-18 09:14:55', actor: 'Dr. Sharat Damodar',   actorRole: 'doctor',    action: 'EXPORT',      entity: 'ImmutableAuditTrail', entityId: 'EXPORT-20260918-01', summary: 'Audit export (CSV, 481 events) prepared for NABH evidence',          ip: '10.24.8.77',    requestId: 'req_0d3fa912',   outcome: 'success', hash: '44ab9e1c07d3f582', prevHash: 'e11c7f042ab6d938', phi: false },
  { id: 'EVT-000476', at: '2026-09-18 08:57:31', actor: 'External Auditor',     actorRole: 'auditor',   action: 'READ',        entity: 'SOP',                 entityId: 'SOP-BB-004',         summary: 'Evidence room document viewed (time-boxed access)',                 ip: '203.0.113.58',  requestId: 'req_c71e4488',   outcome: 'success', hash: 'b90d2a6f15e8c304', prevHash: '44ab9e1c07d3f582', phi: false },
  { id: 'EVT-000475', at: '2026-09-18 08:44:12', actor: 'System (Scheduler)',   actorRole: 'system',    action: 'CRYO_ALERT',  entity: 'Storage',             entityId: 'TNK-A-03',           summary: 'Temperature deviation -181.2 C breached -190 C threshold',          ip: 'internal',      requestId: 'req_sched_4471', outcome: 'alert',   hash: '1d84f3b7ae0925c6', prevHash: 'b90d2a6f15e8c304', phi: false },
  { id: 'EVT-000474', at: '2026-09-18 08:31:09', actor: 'Unauthenticated',      actorRole: 'anonymous', action: 'LOGIN_FAIL',  entity: 'Session',             entityId: 'AUTH-77120',         summary: 'Failed sign-in (attempt 3 of 8) — progressive delay applied',      ip: '198.51.100.24', requestId: 'req_ff09ac21',   outcome: 'denied',  hash: '6e4b0d91a37cf825', prevHash: '1d84f3b7ae0925c6', phi: false },
  { id: 'EVT-000473', at: '2026-09-18 08:12:40', actor: 'Dr. Mitesh Sawant',    actorRole: 'doctor',    action: 'LOGIN',       entity: 'Session',             entityId: 'AUTH-77118',         summary: 'Signed in with TOTP MFA from managed device',                      ip: '10.24.8.41',    requestId: 'req_1c9bb507',   outcome: 'success', hash: '93f27e6a0db1458c', prevHash: '6e4b0d91a37cf825', phi: false },
  { id: 'EVT-000472', at: '2026-09-18 07:58:03', actor: 'Platform Administrator',actorRole: 'admin',    action: 'FLAG_TOGGLE', entity: 'FeatureFlag',         entityId: 'ff_ai_autosuggest',  summary: 'Feature flag enabled for 25% tenant rollout',                      ip: '10.24.8.05',    requestId: 'req_7aa2e6d4',   outcome: 'success', hash: 'c05b18d4e7f2a96b', prevHash: '93f27e6a0db1458c', phi: false },
  { id: 'EVT-000471', at: '2026-09-17 22:14:38', actor: 'Cryo Engineer L2',     actorRole: 'biobank',   action: 'UPDATE',      entity: 'Inventory',           entityId: 'INV-401',            summary: 'Lot status changed Released to Quarantined pending retest',         ip: '10.24.9.88',    requestId: 'req_3319cd0a',   outcome: 'success', hash: '0a7e5c9321bd4f68', prevHash: 'c05b18d4e7f2a96b', phi: false },
  { id: 'EVT-000470', at: '2026-09-17 19:02:51', actor: 'Sahyadri Investigator',actorRole: 'researcher',action: 'EXPORT',      entity: 'Research',            entityId: 'RSH-2026-11',        summary: 'De-identified study extract approved and released',                 ip: '10.31.4.19',    requestId: 'req_bb6210f7',   outcome: 'success', hash: '57d9410cf8be2a33', prevHash: '0a7e5c9321bd4f68', phi: false },
];

export const AUDIT_RETENTION = [
  { cls: 'Clinical & biobank records', retention: '7 years after last activity', basis: 'Facility policy / NABH', state: 'enforced', holds: 0 },
  { cls: 'Immutable audit events',      retention: '7 years, write-once',         basis: 'Regulatory evidence',    state: 'enforced', holds: 0 },
  { cls: 'Authentication events',       retention: '3 years',                     basis: 'Security policy',        state: 'enforced', holds: 0 },
  { cls: 'AI inputs & outputs',         retention: '5 years with reviewer trail', basis: 'AI governance policy',   state: 'enforced', holds: 0 },
  { cls: 'Research source data',        retention: 'Study close-out + 5 years',   basis: 'ICMR ethics',            state: 'enforced', holds: 1 },
  { cls: 'Export artifacts',            retention: '2 years',                     basis: 'Operational policy',     state: 'enforced', holds: 0 },
];

export const LEGAL_HOLDS = [
  { id: 'LH-2026-003', matter: 'Study close-out reconciliation (RSH-2026-11)', scope: 'Research source data · 3 studies', owner: 'Ethics Committee', opened: '2026-08-22', status: 'active' },
  { id: 'LH-2026-002', matter: 'Vendor dispute — cold chain transport claim',  scope: 'Vendor records · ORG-005',         owner: 'Legal Counsel',    opened: '2026-06-04', status: 'released' },
];

/* --------------------------------------------------------------------------
   Quality & regulatory operations (18.13)
   SOP · CAPA · incident · risk · change control · training · audits
   -------------------------------------------------------------------------- */
export const SOP_DOCUMENTS = [
  { id: 'SOP-BB-004', title: 'Cryogenic storage temperature monitoring & deviation handling', version: '4.2', owner: 'Biobank Medical Director', effective: '2026-07-01', review: '2027-07-01', status: 'effective', acknowledgements: '94/96', linkedTraining: 'TRN-BB-004' },
  { id: 'SOP-HLA-002', title: 'HLA high-resolution typing and result release', version: '3.0', owner: 'Laboratory Director', effective: '2026-05-18', review: '2027-05-18', status: 'effective', acknowledgements: '29/29', linkedTraining: 'TRN-HLA-002' },
  { id: 'SOP-CLN-011', title: 'Informed consent for cellular therapy (adult & paediatric)', version: '2.6', owner: 'Ethics Committee', effective: '2026-08-05', review: '2027-02-05', status: 'effective', acknowledgements: '112/118', linkedTraining: 'TRN-CLN-011' },
  { id: 'SOP-QA-001', title: 'Deviation, incident and CAPA management', version: '5.1', owner: 'Quality Head', effective: '2026-06-12', review: '2027-06-12', status: 'effective', acknowledgements: '88/96', linkedTraining: 'TRN-QA-001' },
  { id: 'SOP-AI-003', title: 'AI-assisted interpretation: review, verification and limits of use', version: '1.3', owner: 'Chief Clinical Information Officer', effective: '2026-09-01', review: '2027-03-01', status: 'under-review', acknowledgements: '61/96', linkedTraining: 'TRN-AI-003' },
  { id: 'SOP-DP-007', title: 'Data protection, retention and subject rights handling', version: '2.2', owner: 'Data Protection Officer', effective: '2026-04-20', review: '2027-04-20', status: 'effective', acknowledgements: '90/96', linkedTraining: 'TRN-DP-007' },
];

export const CAPA_RECORDS = [
  { id: 'CAPA-2026-014', type: 'Corrective', title: 'LN2 tank A-03 temperature excursion (root cause: sensor drift)', source: 'INC-2026-021', owner: 'Aparna R. (QA)', opened: '2026-09-04', due: '2026-09-25', stage: 'Effectiveness check', effectiveness: 'pending', linkedEvidence: 4 },
  { id: 'CAPA-2026-013', type: 'Preventive', title: 'Add secondary independent temperature probe to all vault A tanks', source: 'Risk register RSK-012', owner: 'Cryo Engineering', opened: '2026-08-29', due: '2026-10-30', stage: 'Implementation', effectiveness: 'n/a', linkedEvidence: 6 },
  { id: 'CAPA-2026-012', type: 'Corrective', title: 'Incomplete donor consent field on 3 registry records', source: 'INC-2026-018', owner: 'Registry Coordinator', opened: '2026-08-15', due: '2026-09-10', stage: 'Closed — effective', effectiveness: 'verified', linkedEvidence: 5 },
  { id: 'CAPA-2026-011', type: 'Corrective', title: 'OCR confidence not displayed before clinician verification', source: 'Internal audit INT-2026-06', owner: 'AI Governance Lead', opened: '2026-07-22', due: '2026-09-01', stage: 'Closed — effective', effectiveness: 'verified', linkedEvidence: 7 },
  { id: 'CAPA-2026-010', type: 'Preventive', title: 'Quarterly access review automation for facility memberships', source: 'Identity control review', owner: 'Security Officer', opened: '2026-07-05', due: '2026-11-15', stage: 'Planning', effectiveness: 'n/a', linkedEvidence: 2 },
  { id: 'CAPA-2026-009', type: 'Corrective', title: 'Shipping manifest mismatch on cross-city specimen transfer', source: 'Vendor deviation VD-2026-04', owner: 'Cold Chain Logistics', opened: '2026-06-28', due: '2026-07-30', stage: 'Closed — effective', effectiveness: 'verified', linkedEvidence: 5 },
];

export const INCIDENTS = [
  { id: 'INC-2026-021', at: '2026-09-04 03:12', category: 'Equipment / storage', severity: 'major', title: 'LN2 tank A-03 exceeded -190 C for 41 minutes', facility: 'FAC-002', reportedBy: 'Automated telemetry', status: 'CAPA open', patientImpact: 'none — affected lots intact' },
  { id: 'INC-2026-020', at: '2026-08-27 14:48', category: 'Information privacy', severity: 'moderate', title: 'Report attachment sent to incorrect recipient domain', facility: 'FAC-001', reportedBy: 'Recipient notification', status: 'Closed', patientImpact: '1 patient contacted; no misuse identified' },
  { id: 'INC-2026-018', at: '2026-08-11 11:20', category: 'Documentation / consent', severity: 'moderate', title: 'Consent field missing on 3 new donor registrations', facility: 'ORG-002', reportedBy: 'Registry review', status: 'Closed', patientImpact: 'none — records corrected and re-consented' },
  { id: 'INC-2026-017', at: '2026-07-30 09:05', category: 'Clinical safety', severity: 'minor', title: 'Transcription mismatch in reported CD34+ count (no clinical action taken)', facility: 'FAC-004', reportedBy: 'Verifying clinician', status: 'Closed', patientImpact: 'none — corrected before release' },
  { id: 'INC-2026-015', at: '2026-07-14 16:33', category: 'Availability', severity: 'moderate', title: 'HLA result interface unavailable for 38 minutes', facility: 'FAC-004', reportedBy: 'Service monitor', status: 'Closed', patientImpact: 'none — results queued and delivered' },
];

export const RISK_REGISTER = [
  { id: 'RSK-012', risk: 'Loss of cryopreserved specimen due to undetected temperature excursion', category: 'Biobank integrity',    likelihood: 3, impact: 5, score: 15, band: 'high',   control: 'Redundant probes, 24x7 telemetry, automated alert escalation to on-call engineer', owner: 'Cryo Engineering',                  review: '2026-10-15' },
  { id: 'RSK-011', risk: 'Clinician acting on unverified AI interpretation',                        category: 'Clinical safety',     likelihood: 2, impact: 5, score: 10, band: 'high',   control: 'Mandatory verification gate, confidence display, immutable AI audit events',       owner: 'Chief Clinical Information Officer', review: '2026-09-30' },
  { id: 'RSK-010', risk: 'Unauthorised cross-tenant data access',                                   category: 'Information security',likelihood: 2, impact: 5, score: 10, band: 'high',   control: 'Row-level tenancy scoping, permission tests in CI, quarterly access review',       owner: 'Security Officer',                  review: '2026-09-28' },
  { id: 'RSK-009', risk: 'Donor registry incompleteness delaying matched-unrelated search',          category: 'Service delivery',    likelihood: 4, impact: 3, score: 12, band: 'medium', control: 'Completeness dashboards, gap queue, registry outreach campaigns',                  owner: 'Registry Coordinator',              review: '2026-11-01' },
  { id: 'RSK-008', risk: 'Cold chain breach during vendor transport',                               category: 'Supply chain',        likelihood: 3, impact: 4, score: 12, band: 'medium', control: 'Validated shippers, data-logger verification, vendor SLA and audits',              owner: 'Cold Chain Logistics',              review: '2026-10-20' },
  { id: 'RSK-007', risk: 'Model drift reducing HLA compatibility accuracy',                          category: 'AI governance',       likelihood: 3, impact: 3, score: 9,  band: 'medium', control: 'Versioned model registry, periodic revalidation, performance monitoring',          owner: 'AI Governance Lead',                review: '2026-12-01' },
  { id: 'RSK-006', risk: 'Incomplete data-subject rights handling under GDPR',                      category: 'Regulatory',          likelihood: 4, impact: 3, score: 12, band: 'medium', control: 'DSAR workflow in build, lawful-basis register, DPIA refresh',                      owner: 'Data Protection Officer',           review: '2026-10-05' },
  { id: 'RSK-005', risk: 'Single-region database outage affecting clinical access',                 category: 'Availability',        likelihood: 2, impact: 4, score: 8,  band: 'low',    control: 'Managed Postgres backups, tested restore, documented RPO/RTO',                     owner: 'Platform Administrator',            review: '2026-11-12' },
];

export const CHANGE_REQUESTS = [
  { id: 'CHG-2026-041', title: 'Enable AI auto-suggest in report interpretation queue', type: 'Feature',        risk: 'high',   requester: 'Chief Clinical Information Officer', approver: 'Change Advisory Board', state: 'Awaiting CAB approval',    window: '2026-09-27 22:00-23:30', rollback: 'Feature flag disable (< 2 min)',       tests: '12 unit / 4 integration / 2 safety' },
  { id: 'CHG-2026-040', title: 'Add secondary temperature probe mapping for vault A',  type: 'Infrastructure', risk: 'medium', requester: 'Cryo Engineering',                  approver: 'Quality Head',          state: 'Approved — scheduled',     window: '2026-09-22 01:00-03:00', rollback: 'Revert device map, restore config',    tests: '6 integration / 3 alarm drills' },
  { id: 'CHG-2026-039', title: 'Upgrade DRF throttling and publish API schema',        type: 'Platform',       risk: 'medium', requester: 'Platform Administrator',            approver: 'Security Officer',      state: 'In implementation',        window: '2026-09-19 20:00-21:00', rollback: 'Redeploy previous release',            tests: '18 unit / 5 contract' },
  { id: 'CHG-2026-038', title: 'Extend audit event retention from 5 to 7 years',       type: 'Regulatory',     risk: 'low',    requester: 'Quality Head',                      approver: 'Change Advisory Board', state: 'Implemented',              window: '2026-08-30 00:00-00:20', rollback: 'Not applicable (additive)',            tests: '4 unit / retention dry-run' },
  { id: 'CHG-2026-037', title: 'Replace legacy donor search index with registry sync',  type: 'Data',           risk: 'high',   requester: 'Registry Coordinator',              approver: 'Change Advisory Board', state: 'Rolled back',              window: '2026-08-12 22:00-00:00', rollback: 'Executed — index restored in 11 min',  tests: '9 unit / 3 regression' },
];

export const TRAINING_RECORDS = [
  { course: 'Cryogenic storage SOP & deviation handling', role: 'biobank',      completed: 22,  total: 22,  expiry: '2027-07-01', assessment: 'Pass 96%', evidence: 'Certificates on file' },
  { course: 'HLA typing & result release competency',     role: 'lab',          completed: 29,  total: 29,  expiry: '2027-05-18', assessment: 'Pass 93%', evidence: 'Competency sign-off' },
  { course: 'Informed consent & patient communication',   role: 'doctor, nurse',completed: 104, total: 112, expiry: '2027-02-05', assessment: 'Pass 91%', evidence: 'Attendance register' },
  { course: 'AI-assisted interpretation limits of use',   role: 'doctor',       completed: 61,  total: 74,  expiry: '2027-03-01', assessment: 'Pass 88%', evidence: 'Module completion log' },
  { course: 'Data protection & subject rights handling',  role: 'all staff',    completed: 90,  total: 96,  expiry: '2027-04-20', assessment: 'Pass 94%', evidence: 'Acknowledgement log' },
  { course: 'Incident, deviation & CAPA workflow',        role: 'all clinical', completed: 88,  total: 96,  expiry: '2027-06-12', assessment: 'Pass 90%', evidence: 'Assessment transcript' },
];

export const AUDIT_PLANS = [
  { id: 'INT-2026-06', kind: 'Internal', scope: 'Regulatory audit trail completeness & retention', lead: 'Quality Head',          planned: '2026-09-29', findings: null, state: 'Planned',                            linkedCAPA: '—' },
  { id: 'INT-2026-05', kind: 'Internal', scope: 'Biobank chain of custody & temperature records',   lead: 'Quality Head',          planned: '2026-08-08', findings: 3,    state: 'Closed',                             linkedCAPA: 'CAPA-2026-014' },
  { id: 'INT-2026-04', kind: 'Internal', scope: 'Identity, MFA enrolment & access review evidence', lead: 'Security Officer',      planned: '2026-07-03', findings: 5,    state: 'Closed',                             linkedCAPA: 'CAPA-2026-010' },
  { id: 'EXT-2026-01', kind: 'External', scope: 'NABH blood centre & transplant service assessment',lead: 'NABH Assessor Panel',   planned: '2026-10-12', findings: null, state: 'Scheduled — evidence room prepared', linkedCAPA: '—' },
  { id: 'EXT-2026-00', kind: 'External', scope: 'Vendor cold chain capability audit (ORG-005)',     lead: 'Quality Head',          planned: '2026-06-20', findings: 2,    state: 'Closed',                             linkedCAPA: 'CAPA-2026-009' },
];

export const ACCREDITATION_EVIDENCE = [
  { standard: 'NABH',      clause: 'Blood centre — storage & temperature control',  evidence: 'Telemetry exports, calibration certificates, deviation records',   artifacts: 18, lastVerified: '2026-08-30', state: 'complete' },
  { standard: 'NABH',      clause: 'Transplant services — informed consent process', evidence: 'Versioned consent templates, acknowledgements, training log',      artifacts: 11, lastVerified: '2026-09-02', state: 'complete' },
  { standard: 'AABB',      clause: 'Cellular therapy — chain of custody',            evidence: 'Custody events, shipping manifests, data-logger records',          artifacts: 24, lastVerified: '2026-08-18', state: 'partial' },
  { standard: 'ICMR',      clause: 'Research ethics — study close-out reconciliation',evidence: 'Ethics approvals, de-identified extracts, legal hold record',     artifacts: 9,  lastVerified: '2026-08-22', state: 'in-progress' },
  { standard: 'ISO 13485', clause: 'QMS — software change control',                  evidence: 'Change requests, test records, release approvals',                 artifacts: 31, lastVerified: '2026-09-15', state: 'in-progress' },
  { standard: 'DISHA',     clause: 'Health data security safeguards',                evidence: 'Encryption config, access logs, DPIA, breach procedures',          artifacts: 14, lastVerified: '2026-09-10', state: 'complete' },
];

export const POLICY_ACCEPTANCE = [
  { policy: 'Acceptable use of clinical data',        version: '3.1', accepted: 148, total: 152, reAckRequired: false, due: '2026-06-30' },
  { policy: 'AI use & verification policy',            version: '1.3', accepted: 61,  total: 152, reAckRequired: true,  due: '2026-09-30' },
  { policy: 'Information security & incident reporting',version: '4.0', accepted: 143, total: 152, reAckRequired: false, due: '2026-05-15' },
  { policy: 'Research data de-identification standard',version: '2.2', accepted: 38,  total: 41,  reAckRequired: false, due: '2026-08-01' },
  { policy: 'Data retention & legal hold procedure',   version: '1.7', accepted: 139, total: 152, reAckRequired: false, due: '2026-07-20' },
];

/* --------------------------------------------------------------------------
   AI governance, human review & data quality (18.11)
   -------------------------------------------------------------------------- */
export const AI_MODELS = [
  { id: 'MDL-HLA-002',    name: 'HLA compatibility scorer',            version: '2.4.1', task: 'Donor-recipient compatibility ranking',   algorithm: 'Gradient boosting (XGBoost)',       trainedOn: '18,442 validated transplant pairs',      metrics: 'AUC 0.912 / Brier 0.083',              approval: 'Clinically approved',   approvedBy: 'Transplant Board',              review: '2026-08-14', nextReview: '2027-02-14', drift: 'stable', features: 46, owner: 'AI Governance Lead' },
  { id: 'MDL-OCR-004',    name: 'Medical report OCR extractor',        version: '4.0.3', task: 'Field extraction from uploaded reports', algorithm: 'Document layout model + rules',     trainedOn: '6,910 annotated report pages',           metrics: 'Field F1 0.947 / char acc 0.991',       approval: 'Clinically approved',   approvedBy: 'Laboratory Director',           review: '2026-09-01', nextReview: '2027-01-15', drift: 'stable', features: 0,  owner: 'AI Governance Lead' },
  { id: 'MDL-ASSESS-001', name: 'Preliminary assessment triage',       version: '1.8.0', task: 'Triage summary for clinician review',    algorithm: 'Logistic regression + rules',       trainedOn: '4,120 de-identified assessments',        metrics: 'Sensitivity 0.89 / Specificity 0.84',   approval: 'Approved with limits', approvedBy: 'Ethics Committee',              review: '2026-07-20', nextReview: '2027-01-20', drift: 'watch',  features: 31, owner: 'AI Governance Lead' },
  { id: 'MDL-ENGRAFT-001',name: 'Engraftment timeline estimator',      version: '0.9.6', task: 'Estimate neutrophil engraftment window', algorithm: 'Survival model (Cox)',              trainedOn: '2,240 transplant outcomes',              metrics: 'C-index 0.71 (not validated)',          approval: 'Research use only',    approvedBy: '—',                             review: '2026-06-30', nextReview: '2026-12-30', drift: 'watch',  features: 24, owner: 'Research Investigator' },
  { id: 'MDL-DOC-002',    name: 'AI assistant response generator',     version: '3.2.0', task: 'Grounded Q&A over clinical knowledge',   algorithm: 'LLM with retrieval grounding',      trainedOn: 'Curated corpus (versioned prompts)',     metrics: 'Groundedness 0.93 / refusal 0.97',      approval: 'Approved with limits', approvedBy: 'Chief Clinical Information Officer', review: '2026-09-10', nextReview: '2026-12-10', drift: 'stable', features: 0,  owner: 'AI Governance Lead' },
];

export const AI_REVIEW_QUEUE = [
  { id: 'RV-3391', at: '2026-09-18 09:38', model: 'MDL-OCR-004',    subject: 'Report REP-2026-018 (PBSC apheresis)',            confidence: 0.82, band: 'medium', state: 'Awaiting review',              reviewer: '—',                      age: '4 min' },
  { id: 'RV-3390', at: '2026-09-18 09:12', model: 'MDL-DOC-002',    subject: 'Assistant answer — HLA-DPB1 permissive mismatch', confidence: 0.91, band: 'high',   state: 'Verified',                      reviewer: 'Dr. Sharat Damodar',      age: '30 min' },
  { id: 'RV-3389', at: '2026-09-18 08:47', model: 'MDL-ASSESS-001', subject: 'Assessment ASSESS-2026-441',                     confidence: 0.68, band: 'low',    state: 'Amended by clinician',           reviewer: 'Dr. Mitesh Sawant',       age: '55 min' },
  { id: 'RV-3388', at: '2026-09-18 08:15', model: 'MDL-HLA-002',    subject: 'Donor ranking for PT-9042 (14 candidates)',       confidence: 0.94, band: 'high',   state: 'Verified',                      reviewer: 'Dr. Sharat Damodar',      age: '1 h' },
  { id: 'RV-3387', at: '2026-09-18 07:52', model: 'MDL-OCR-004',    subject: 'Report REP-2026-017 (HLA high-res typing)',       confidence: 0.74, band: 'low',    state: 'Rejected — re-scan required',    reviewer: 'Lab Scientist',           age: '1 h' },
  { id: 'RV-3386', at: '2026-09-17 22:31', model: 'MDL-ENGRAFT-001',subject: 'Engraftment estimate for PT-8811',               confidence: 0.61, band: 'low',    state: 'Escalated to research review',   reviewer: 'Research Investigator',   age: '11 h' },
  { id: 'RV-3385', at: '2026-09-17 19:04', model: 'MDL-DOC-002',    subject: 'Assistant answer — consent requirements',         confidence: 0.88, band: 'medium', state: 'Verified',                      reviewer: 'Nurse Coordinator',       age: '14 h' },
];

export const AI_EVALUATIONS = [
  { suite: 'Groundedness & hallucination',      cadence: 'Weekly',        lastRun: '2026-09-15', cases: 420,  result: '98.1% grounded',                    threshold: '>= 95%',            state: 'pass' },
  { suite: 'PHI leakage & redaction',           cadence: 'Every release', lastRun: '2026-09-10', cases: 260,  result: '0 leaks detected',                  threshold: '0 leaks',           state: 'pass' },
  { suite: 'Prompt-injection safety',           cadence: 'Weekly',        lastRun: '2026-09-15', cases: 180,  result: '97.2% refusal',                     threshold: '>= 95%',            state: 'pass' },
  { suite: 'HLA scorer bias review',            cadence: 'Quarterly',     lastRun: '2026-08-14', cases: 1200, result: 'Parity within 2.1% across cohorts',  threshold: '<= 5% delta',       state: 'pass' },
  { suite: 'OCR field accuracy (golden set)',   cadence: 'Monthly',       lastRun: '2026-09-01', cases: 500,  result: 'F1 0.947',                          threshold: '>= 0.95',           state: 'watch' },
  { suite: 'Clinical validation (prospective)', cadence: 'Per study',     lastRun: '2026-05-30', cases: 240,  result: 'Protocol in draft',                 threshold: 'Protocol approved', state: 'pending' },
];

export const DATA_QUALITY_CHECKS = [
  { check: 'Patient record completeness', scope: '1,482 records',   open: 37, detail: 'Mandatory fields missing (referring clinician, consent date)', severity: 'medium', owner: 'Registry Coordinator' },
  { check: 'Donor registry duplicates',   scope: '2,096 records',   open: 12, detail: 'Probable duplicate identities awaiting merge decision',         severity: 'high',   owner: 'Registry Coordinator' },
  { check: 'HLA allele validity',         scope: '1,940 typings',   open: 4,  detail: 'Allele strings rejected by nomenclature check',               severity: 'high',   owner: 'Laboratory Director' },
  { check: 'CD34+ count plausibility',    scope: '862 harvests',    open: 6,  detail: 'Values outside physiological range flagged for review',       severity: 'medium', owner: 'Laboratory Director' },
  { check: 'Custody chain continuity',    scope: '1,204 movements', open: 0,  detail: 'Every movement has preceding and following custody events',   severity: 'high',   owner: 'Biobank Operator' },
  { check: 'Consent coverage',            scope: '1,482 patients',  open: 9,  detail: 'Missing or expired consent versions',                         severity: 'high',   owner: 'Ethics Committee' },
  { check: 'Orphaned report attachments', scope: '918 uploads',     open: 3,  detail: 'Attachment without a linked report record',                   severity: 'low',    owner: 'Platform Administrator' },
];

/* --------------------------------------------------------------------------
   Platform engineering, observability & integrations (18.14, 18.15)
   -------------------------------------------------------------------------- */
export const SERVICE_HEALTH = [
  { service: 'Django REST API',         kind: 'Application', status: 'operational', uptime: '99.97%', p95: '182 ms', errorRate: '0.04%', dependency: 'PostgreSQL' },
  { service: 'PostgreSQL (Supabase)',   kind: 'Database',    status: 'operational', uptime: '99.99%', p95: '12 ms',  errorRate: '0.00%', dependency: '—' },
  { service: 'Object storage (reports)',kind: 'Storage',     status: 'operational', uptime: '99.99%', p95: '96 ms',  errorRate: '0.01%', dependency: '—' },
  { service: 'OCR engine (Tesseract)',  kind: 'Worker',      status: 'degraded',    uptime: '99.12%', p95: '4.2 s',  errorRate: '1.80%', dependency: 'Local binary' },
  { service: 'ML inference (compat.)',  kind: 'Worker',      status: 'operational', uptime: '99.94%', p95: '640 ms', errorRate: '0.06%', dependency: 'Model registry' },
  { service: 'AI assistant (Gemini)',   kind: 'External',    status: 'operational', uptime: '99.81%', p95: '1.9 s',  errorRate: '0.31%', dependency: 'Vendor API' },
  { service: 'Notification dispatch',   kind: 'Worker',      status: 'operational', uptime: '99.95%', p95: '310 ms', errorRate: '0.02%', dependency: 'SMTP provider' },
  { service: 'Scheduled telemetry poll',kind: 'Scheduler',   status: 'operational', uptime: '100%',   p95: '—',      errorRate: '0.00%', dependency: 'Sensor gateway' },
];

export const SLOS = [
  { slo: 'API availability',              target: '99.9% monthly',   actual: '99.97%',          budget: '82% remaining', state: 'meeting' },
  { slo: 'Report upload to extraction',   target: '<= 30 s (p95)',   actual: '18.4 s',          budget: '—',             state: 'meeting' },
  { slo: 'Compatibility ranking latency', target: '<= 1 s (p95)',    actual: '640 ms',          budget: '—',             state: 'meeting' },
  { slo: 'Alert delivery to on-call',     target: '<= 60 s',         actual: '22 s',            budget: '—',             state: 'meeting' },
  { slo: 'Backup restore verification',   target: 'Monthly proof',   actual: '2026-09-01 pass', budget: '—',             state: 'meeting' },
  { slo: 'Audit export job',              target: '<= 5 min',        actual: '7.5 min',         budget: '—',             state: 'at-risk' },
];

export const FEATURE_FLAGS = [
  { key: 'ff_ai_autosuggest',       description: 'AI auto-suggest in the interpretation queue', state: 'enabled',  rollout: '25% of clinical tenants', owner: 'Chief Clinical Information Officer', updated: '2026-09-18 07:58' },
  { key: 'ff_patient_portal_v2',    description: 'Refreshed patient portal experience',         state: 'enabled',  rollout: '100%',                    owner: 'Product Owner',                      updated: '2026-09-12 11:20' },
  { key: 'ff_fhir_export',          description: 'FHIR R4 bundle export for referrals',         state: 'disabled', rollout: 'internal testers only',   owner: 'Interoperability Lead',              updated: '2026-09-05 15:40' },
  { key: 'ff_hla_dpb1_ranking',     description: 'DPB1 permissive mismatch in donor ranking',   state: 'enabled',  rollout: '50%',                     owner: 'Transplant Board',                   updated: '2026-09-02 09:10' },
  { key: 'ff_mfa_enforce_clinical', description: 'Hard-enforce MFA for all clinical roles',     state: 'enabled',  rollout: '100%',                    owner: 'Security Officer',                   updated: '2026-08-20 18:05' },
  { key: 'ff_readonly_mode',        description: 'Emergency read-only mode for the platform',   state: 'disabled', rollout: 'kill switch',             owner: 'Platform Administrator',             updated: '2026-07-30 21:00' },
];

export const INTEGRATIONS = [
  { name: 'PostgreSQL / Supabase',            category: 'Database',          status: 'live',    standard: '—',             notes: 'Row-level security, managed backups, versioned migrations' },
  { name: 'REST API (versioned)',             category: 'Application',       status: 'live',    standard: 'OpenAPI 3',     notes: 'Pagination, filtering, throttling and published schema' },
  { name: 'FHIR R4',                          category: 'Interoperability',  status: 'planned', standard: 'HL7 FHIR R4',   notes: 'Patient, Observation, DiagnosticReport, DocumentReference' },
  { name: 'HL7 v2 (ADT / ORU)',               category: 'Interoperability',  status: 'planned', standard: 'HL7 v2.5.1',    notes: 'Admission and result feeds from partner HIS / LIS' },
  { name: 'Laboratory information system',    category: 'Interoperability',  status: 'planned', standard: 'HL7 / ASTM',    notes: 'Order and result reconciliation with accession matching' },
  { name: 'Identity provider (OIDC / SAML)',  category: 'Identity',          status: 'partial', standard: 'OIDC / SAML2',  notes: '2 of 5 organizations federated; SCIM provisioning pending' },
  { name: 'Email & SMS provider',             category: 'Messaging',         status: 'live',    standard: '—',             notes: 'Templated notifications with delivery status and opt-out' },
  { name: 'Object storage',                   category: 'Storage',           status: 'live',    standard: '—',             notes: 'Private buckets, signed URLs, lifecycle and retention rules' },
  { name: 'Barcode / RFID scanners',          category: 'Devices',           status: 'partial', standard: 'GS1',           notes: 'Specimen scan capture for chain of custody' },
  { name: 'IoT cryogenic sensors',            category: 'Devices',           status: 'live',    standard: 'MQTT over TLS', notes: 'Signed telemetry, threshold alerting, calibration records' },
  { name: 'Payment provider',                 category: 'Finance',           status: 'planned', standard: 'PCI-DSS aware', notes: 'Tokenized payments for storage and service packages' },
  { name: 'Data warehouse',                   category: 'Analytics',         status: 'planned', standard: '—',             notes: 'Governed, de-identified analytics replica' },
];

export const KPI_LIBRARY = [
  { kpi: '1-year overall survival (allogeneic)',        formula: 'Surviving at 12 months / cohort at risk',       source: 'Transplant outcome registry', owner: 'Transplant Board',         refresh: 'Monthly', quality: 'verified',  value: '78.6%' },
  { kpi: 'Median time to matched donor identification', formula: 'Median days from search to identified donor',   source: 'Donor search log',            owner: 'Registry Coordinator',     refresh: 'Weekly',  quality: 'verified',  value: '34 days' },
  { kpi: 'Biobank integrity incidents per 1,000 samples',formula: 'Incidents / (stored samples / 1000)',          source: 'Incident register',           owner: 'Biobank Medical Director', refresh: 'Monthly', quality: 'verified',  value: '0.42' },
  { kpi: 'AI outputs verified before clinical use',     formula: 'Verified AI outputs / total AI outputs',         source: 'AI audit events',             owner: 'AI Governance Lead',       refresh: 'Daily',   quality: 'verified',  value: '96.8%' },
  { kpi: 'CAPA closure within due date',                formula: 'Closed on time / total closed',                 source: 'CAPA register',               owner: 'Quality Head',             refresh: 'Monthly', quality: 'verified',  value: '88%' },
  { kpi: 'Specimen chain-of-custody completeness',      formula: 'Movements with full custody chain / total',      source: 'Inventory custody events',    owner: 'Biobank Operator',         refresh: 'Daily',   quality: 'verified',  value: '100%' },
  { kpi: 'Data completeness (patient core fields)',     formula: 'Populated mandatory fields / expected',          source: 'Data quality engine',         owner: 'Registry Coordinator',     refresh: 'Daily',   quality: 'in-review', value: '97.5%' },
];
