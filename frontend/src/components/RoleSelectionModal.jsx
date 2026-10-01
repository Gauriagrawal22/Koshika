import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole, ROLES } from '../context/RoleContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { KoshikaLogoIcon } from './KoshikaLogo';
import { User, Stethoscope, ShieldCheck, X } from 'lucide-react';

const RoleSelectionModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const { switchRole } = useAuth();
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleSelectRole = (newRole, targetRoute) => {
    setRole(newRole);
    switchRole(newRole);
    if (onClose) onClose();
    navigate(targetRoute);
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(4px)', zIndex: 1060 }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '440px' }}>
        <div className="modal-content border-0 rounded-4 shadow-lg p-4 bg-white position-relative">
          
          {/* Close button */}
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3"
            onClick={onClose}
            aria-label="Close"
          ></button>

          {/* Header matching Reference Screen 1 */}
          <div className="text-center mb-4 pt-2">
            <div className="d-flex justify-content-center mb-2">
              <KoshikaLogoIcon size={52} />
            </div>
            <h3 className="fw-bold mb-1 text-dark" style={{ letterSpacing: '0.04em' }}>KOSHIKA</h3>
            <p className="small text-muted mb-2">{t.footerMotto || 'Knowledge. Support. Hope.'}</p>
            <h5 className="fw-semibold text-secondary" style={{ fontSize: '0.98rem' }}>
              {t.chooseRole || 'Choose how you want to continue'}
            </h5>
          </div>

          {/* 3 Role Selection Cards from Reference */}
          <div className="d-flex flex-column gap-3 mb-3">
            {/* 1. Patient */}
            <button
              type="button"
              className="btn text-start p-3 rounded-4 border d-flex align-items-center gap-3 transition-all"
              style={{
                backgroundColor: '#f0fdfa',
                borderColor: '#ccfbf1',
              }}
              onClick={() => handleSelectRole(ROLES.PATIENT, '/')}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white"
                style={{ width: '46px', height: '46px', backgroundColor: '#0d9488', flexShrink: 0 }}
              >
                <User size={24} />
              </div>
              <div>
                <div className="fw-bold text-dark fs-6 mb-0.5">{t.iAmPatient || 'I am a Patient'}</div>
                <div className="small text-muted">{t.iAmPatientDesc || 'Learn, understand and get support'}</div>
              </div>
            </button>

            {/* 2. Doctor */}
            <button
              type="button"
              className="btn text-start p-3 rounded-4 border d-flex align-items-center gap-3 transition-all"
              style={{
                backgroundColor: '#eff6ff',
                borderColor: '#dbeafe',
              }}
              onClick={() => handleSelectRole(ROLES.DOCTOR, '/doctor')}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white"
                style={{ width: '46px', height: '46px', backgroundColor: '#2563eb', flexShrink: 0 }}
              >
                <Stethoscope size={24} />
              </div>
              <div>
                <div className="fw-bold text-dark fs-6 mb-0.5">{t.iAmDoctor || 'I am a Doctor'}</div>
                <div className="small text-muted">{t.iAmDoctorDesc || 'Manage patients and consultations'}</div>
              </div>
            </button>

            {/* 3. Admin */}
            <button
              type="button"
              className="btn text-start p-3 rounded-4 border d-flex align-items-center gap-3 transition-all"
              style={{
                backgroundColor: '#faf5ff',
                borderColor: '#f3e8ff',
              }}
              onClick={() => handleSelectRole(ROLES.ADMIN, '/admin')}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white"
                style={{ width: '46px', height: '46px', backgroundColor: '#9333ea', flexShrink: 0 }}
              >
                <ShieldCheck size={24} />
              </div>
              <div>
                <div className="fw-bold text-dark fs-6 mb-0.5">{t.iAmAdmin || 'I am an Administrator'}</div>
                <div className="small text-muted">{t.iAmAdminDesc || 'Hospital records, biobanks and registry audit'}</div>
              </div>
            </button>
          </div>

          <div className="text-center pt-2">
            <span className="small text-muted">
              You can switch your role at any time from the top profile bar.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
