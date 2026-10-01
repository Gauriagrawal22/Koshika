import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER, DEMO_ACCOUNTS } from '../data/mockData';

const AuthContext = createContext();

export const ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
  RESEARCHER: 'researcher',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('koshika_auth_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clear old auto-seeded mock user if it matches the hardcoded initial mock user
        if (parsed?.id === 'USR-1082' || parsed?.id === 'USR-PAT-001') {
          localStorage.removeItem('koshika_auth_user');
          return null;
        }
        return parsed?.id ? parsed : null;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [role, setRole] = useState(() => {
    return user?.role || localStorage.getItem('koshika_user_role') || 'patient';
  });

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (role) {
      localStorage.setItem('koshika_user_role', role);
    }
  }, [role]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('koshika_auth_user', JSON.stringify(user));
      setRole(user.role);
    } else {
      localStorage.removeItem('koshika_auth_user');
    }
  }, [user]);

  const login = async (usernameOrEmail, password) => {
    setLoading(true);
    setAuthError(null);
    
    // Quick delay for realistic UX micro-animation
    await new Promise(r => setTimeout(r, 450));

    // Check against demo accounts or credentials
    const cleanEmail = (usernameOrEmail || '').trim().toLowerCase();
    let foundAccount = null;

    if (cleanEmail.includes('patient')) {
      foundAccount = DEMO_ACCOUNTS.patient;
    } else if (cleanEmail.includes('admin')) {
      foundAccount = DEMO_ACCOUNTS.admin;
    } else if (cleanEmail.includes('research')) {
      foundAccount = DEMO_ACCOUNTS.researcher;
    } else if (cleanEmail.includes('doctor') || cleanEmail.includes('sawant')) {
      foundAccount = DEMO_ACCOUNTS.doctor;
    } else {
      // Default verified user
      foundAccount = {
        id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
        name: cleanEmail.split('@')[0].replace('.', ' ').toUpperCase(),
        email: cleanEmail,
        role: 'doctor',
        title: 'Clinical Oncology Specialist',
        institution: 'Koshika Health Network'
      };
    }

    setUser(foundAccount);
    setRole(foundAccount.role);
    setLoading(false);
    return { ok: true, user: foundAccount };
  };

  const demoLogin = async (targetRole) => {
    setLoading(true);
    setAuthError(null);
    await new Promise(r => setTimeout(r, 350));
    
    const account = DEMO_ACCOUNTS[targetRole] || DEMO_ACCOUNTS.doctor;
    setUser(account);
    setRole(account.role);
    setLoading(false);
    return { ok: true, user: account };
  };

  const register = async (formData) => {
    setLoading(true);
    setAuthError(null);
    await new Promise(r => setTimeout(r, 550));

    const newUser = {
      id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
      name: `${formData.first_name || ''} ${formData.last_name || ''}`.trim() || 'Clinical User',
      email: formData.email,
      role: formData.role || 'patient',
      title: formData.role === 'doctor' ? (formData.specialization || 'Clinical Specialist') : formData.role === 'bank_staff' ? 'Biobank Specialist' : 'Registered Patient',
      institution: formData.organization || 'Koshika Health Network',
      registrationNumber: formData.registration_number || 'REG-PENDING',
      is_verified: true
    };

    setUser(newUser);
    setRole(newUser.role);
    setLoading(false);
    return { ok: true, user: newUser };
  };

  const logout = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 200));
    setUser(null);
    localStorage.removeItem('koshika_auth_user');
    localStorage.removeItem('koshika_user_role');
    setLoading(false);
  };

  const switchRole = (newRole) => {
    setRole(newRole);
    if (DEMO_ACCOUNTS[newRole]) {
      setUser(DEMO_ACCOUNTS[newRole]);
    } else if (user) {
      setUser(prev => ({ ...prev, role: newRole }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        loading,
        authError,
        login,
        register,
        logout,
        demoLogin,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
