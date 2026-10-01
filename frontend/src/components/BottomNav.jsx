import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRole, ROLES } from '../context/RoleContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Home, 
  BookOpen, 
  Stethoscope, 
  Building2, 
  User, 
  Users, 
  Calendar, 
  Dna, 
  LayoutDashboard, 
  FileText 
} from 'lucide-react';

const BottomNav = () => {
  const { role } = useRole();
  const { t } = useLanguage();

  // Navigation Items per role matching the reference designs
  if (role === ROLES.DOCTOR) {
    return (
      <nav className="koshika-bottom-nav" aria-label="Doctor Navigation">
        <NavLink
          to="/doctor"
          end
          className={({ isActive }) => `koshika-bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <Home size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/doctor/patients"
          className={({ isActive }) => `koshika-bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <Users size={20} />
          <span>Patients</span>
        </NavLink>
        <NavLink
          to="/doctor/reports"
          className={({ isActive }) => `koshika-bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <FileText size={20} />
          <span>Reports</span>
        </NavLink>
        <NavLink
          to="/doctor/consultations"
          className={({ isActive }) => `koshika-bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <Stethoscope size={20} />
          <span>Consult</span>
        </NavLink>
        <NavLink
          to="/doctor/profile"
          className={({ isActive }) => `koshika-bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <User size={20} />
          <span>Profile</span>
        </NavLink>
      </nav>
    );
  }

  if (role === ROLES.ADMIN) {
    return (
      <nav className="koshika-bottom-nav" aria-label="Admin Navigation">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => `koshika-bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) => `koshika-bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <Users size={20} />
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/doctors"
          className={({ isActive }) => `koshika-bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <Stethoscope size={20} />
          <span>Doctors</span>
        </NavLink>
        <NavLink
          to="/admin/banks"
          className={({ isActive }) => `koshika-bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <Building2 size={20} />
          <span>Banks</span>
        </NavLink>
        <NavLink
          to="/admin/activity"
          className={({ isActive }) => `koshika-bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <FileText size={20} />
          <span>Activity</span>
        </NavLink>
      </nav>
    );
  }

  // Default: Patient User Flow (Matching Reference Images Screen 2, 3, 5, etc.)
  return (
    <nav className="koshika-bottom-nav" aria-label="Patient Navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `koshika-bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <Home size={20} />
        <span>{t.uiHome || 'Home'}</span>
      </NavLink>
      <NavLink
        to="/learn"
        className={({ isActive }) => `koshika-bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <BookOpen size={20} />
        <span>{t.uiLearn || 'Learn'}</span>
      </NavLink>
      <NavLink
        to="/find-care/doctors"
        className={({ isActive }) => `koshika-bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <Stethoscope size={20} />
        <span>{t.navDoctors || 'Doctors'}</span>
      </NavLink>
      <NavLink
        to="/bank"
        className={({ isActive }) => `koshika-bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <Building2 size={20} />
        <span>{t.navBanks || 'Banks'}</span>
      </NavLink>
      <NavLink
        to="/my-health/profile"
        className={({ isActive }) => `koshika-bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <User size={20} />
        <span>{t.uiProfile || 'Profile'}</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
