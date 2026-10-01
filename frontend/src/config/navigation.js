/**
 * STEMBRIDGE AI / KOSHIKA — ENTERPRISE NAVIGATION MODEL
 * -----------------------------------------------------
 * Single source of truth for the workspace console. The sidebar, the command
 * palette and the breadcrumb trail all derive from this model so navigation
 * stays consistent as the product grows.
 *
 * `roles` lists RBAC role identifiers (see data/governanceData.js) allowed to
 * see the entry. `null` means every authenticated role.
 */
import {
  LayoutDashboard, ClipboardCheck, Dna, FileText, CalendarClock, Activity,
  HeartPulse, Stethoscope, Building2, FlaskConical, Users, Droplet, Snowflake,
  Package, BadgeCheck, MessageSquareHeart, BrainCircuit, Microscope, BarChart3,
  ShieldCheck, ScrollText, KeyRound, ServerCog, Settings2, GraduationCap,
  Gamepad2, Bell,
} from 'lucide-react';

export const NAV_SECTIONS = [
  {
    id: 'clinical',
    label: 'Clinical Care',
    items: [
      { to: '/', label: 'Dashboard', icon: LayoutDashboard, roles: null, keywords: 'home overview workspace' },
      { to: '/preliminary-assessment', label: 'Preliminary Assessment', icon: ClipboardCheck, roles: null, keywords: 'triage eligibility' },
      { to: '/ml-match', label: 'Compatibility Assessment', icon: Dna, roles: null, keywords: 'hla donor matching ml' },
      { to: '/ocr-reports', label: 'Report Interpretation', icon: FileText, roles: null, keywords: 'ocr scan upload report' },
      { to: '/appointments', label: 'Appointments', icon: CalendarClock, roles: null, keywords: 'schedule consultation' },
      { to: '/my-health/history', label: 'Medical History', icon: Activity, roles: null, keywords: 'timeline records' },
      { to: '/my-health/profile', label: 'Patient Profile', icon: HeartPulse, roles: null, keywords: 'demographics settings' },
    ],
  },
  {
    id: 'network',
    label: 'Care Network',
    items: [
      { to: '/find-care/doctors', label: 'Find Specialists', icon: Stethoscope, roles: null, keywords: 'doctors clinicians' },
      { to: '/find-care/centres', label: 'Centres & Facilities', icon: Building2, roles: null, keywords: 'hospitals transplant centres' },
      { to: '/bank', label: 'Stem Cell Bank Hub', icon: FlaskConical, roles: null, keywords: 'biobank' },
      { to: '/patients', label: 'Patient Registry', icon: Users, roles: ['nurse', 'doctor', 'lab', 'qa', 'admin'], keywords: 'registry cases' },
      { to: '/donors', label: 'Donor Registry', icon: Droplet, roles: ['nurse', 'doctor', 'lab', 'biobank', 'qa', 'admin'], keywords: 'hla volunteer donors' },
    ],
  },
  {
    id: 'biobank',
    label: 'Biobank Operations',
    items: [
      { to: '/storage', label: 'Cryogenic Storage', icon: Snowflake, roles: ['biobank', 'lab', 'qa', 'admin'], keywords: 'vault tank chain of custody' },
      { to: '/inventory', label: 'Inventory & Lots', icon: Package, roles: ['biobank', 'lab', 'qa', 'admin'], keywords: 'reagents consumables stock' },
      { to: '/staff', label: 'Staff & Credentials', icon: BadgeCheck, roles: ['qa', 'admin'], keywords: 'competency roster' },
    ],
  },
];
