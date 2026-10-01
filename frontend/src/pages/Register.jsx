import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { KoshikaLogoIcon } from '../components/KoshikaLogo';
import AuthBackgroundVideo from '../components/AuthBackgroundVideo';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Check, 
  Stethoscope, 
  ShieldCheck, 
  RotateCcw,
  AlertCircle
} from 'lucide-react';

// Cute Mail Envelope with checkmark disc inside
const VerifyEmailIllustration = ({ size = 120 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto"
    aria-label="Email Verification Illustration"
  >
    <circle cx="100" cy="100" r="85" fill="#e0f2fe" opacity="0.6" />
    <circle cx="40" cy="65" r="5" fill="#38bdf8" opacity="0.7" />
    <circle cx="160" cy="55" r="6.5" fill="#818cf8" opacity="0.6" />
    <circle cx="165" cy="135" r="4.5" fill="#34d399" opacity="0.8" />
    <circle cx="35" cy="140" r="6" fill="#c084fc" opacity="0.7" />

    {/* Envelope Back Flap */}
    <polygon points="40,85 100,40 160,85" fill="#bfdbfe" />
    <rect x="52" y="55" width="96" height="75" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
    <circle cx="100" cy="85" r="18" fill="#0d9488" />
    <path d="M93 85 L98 90 L108 80" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="36" y="85" width="128" height="80" rx="10" fill="#93c5fd" />
    <polygon points="36,85 100,132 164,85" fill="#60a5fa" opacity="0.45" />
    <polygon points="36,165 100,118 164,165" fill="#3b82f6" opacity="0.2" />
  </svg>
);

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, authError } = useAuth();
  const { isDark } = useTheme();

  // Selected role: 'patient' | 'doctor' | 'admin'
  const [selectedRole, setSelectedRole] = useState('patient');

  // Steps: 'form' | 'verify'
  const [step, setStep] = useState('form');

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [resendNotice, setResendNotice] = useState(false);

  // Role metadata
  const roleData = {
    patient: {
      label: 'Patient',
      desc: 'Care & Symptoms',
      color: '#0d9488',
      bgClass: 'tile-patient',
      btnClass: 'btn-role-patient'
    },
    doctor: {
      label: 'Doctor',
      desc: 'HLA & Consults',
      color: '#2563eb',
      bgClass: 'tile-doctor',
      btnClass: 'btn-role-doctor'
    },
    admin: {
      label: 'Admin',
      desc: 'Biobank & Vaults',
      color: '#9333ea',
      bgClass: 'tile-admin',
      btnClass: 'btn-role-admin'
    }
  };

  const currentRole = roleData[selectedRole];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setLocalError('Please fill in all basic details.');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password should be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match. Please re-enter.');
      return;
    }

    const names = fullName.trim().split(' ');
    const res = await register({
      first_name: names[0] || 'User',
      last_name: names.slice(1).join(' ') || '',
      email: email.trim().toLowerCase(),
      password: password,
      role: selectedRole
    });

    if (res.ok) {
      setStep('verify');
    } else {
      setLocalError(res.error || 'Failed to create account. Please try again.');
    }
  };

  const handleResendEmail = () => {
    setResendNotice(true);
    setTimeout(() => setResendNotice(false), 3000);
  };

  return (
    <AuthBackgroundVideo>
      <div className="auth-centered-wrapper">
        <div 
          className="card auth-glass-card border-0 shadow-lg position-relative w-100 p-4 p-sm-4.5"
          style={{ maxWidth: '470px' }}
        >
          {step === 'form' ? (
            <div>
              {/* Top Brand Header */}
              <div className="text-center mb-3.5">
                <div 
                  className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2.5 border shadow-xs"
                  style={{
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.85)',
                    borderColor: `${currentRole.color}40`
                  }}
                >
                  <KoshikaLogoIcon size={18} />
                  <span className="fw-bold small text-dark" style={{ letterSpacing: '0.04em' }}>KOSHIKA</span>
                  <span 
                    className="badge rounded-pill small fw-bold px-2 py-0.5" 
                    style={{ backgroundColor: currentRole.color, fontSize: '0.66rem', color: '#ffffff' }}
                  >
                    REGISTRATION
                  </span>
                </div>

                <h3 className="fw-bold mb-1 text-dark" style={{ letterSpacing: '-0.02em', fontSize: '1.65rem' }}>
                  Create Account
                </h3>
                <p className="text-secondary small mb-0" style={{ fontSize: '0.84rem' }}>
                  Choose your role to get started
                </p>
              </div>

              {/* 3 Vibrant Role Cards (Proper Rich Colors & Text) */}
              <div className="row g-2.5 mb-3">
                {/* Patient Tile */}
                <div className="col-4">
                  <div 
                    className={`k-role-tile tile-patient ${selectedRole === 'patient' ? 'active' : ''}`}
                    onClick={() => setSelectedRole('patient')}
                    role="button"
                    tabIndex={0}
                  >
                    {selectedRole === 'patient' && (
                      <div className="tile-check-badge" style={{ backgroundColor: '#0d9488' }}>
                        <Check size={11} strokeWidth={3} />
                      </div>
                    )}
                    <div className="tile-icon-box rounded-circle d-flex align-items-center justify-content-center p-2 mb-1.5" style={{ width: '36px', height: '36px' }}>
                      <User size={18} />
                    </div>
                    <div className="tile-role-title small" style={{ fontSize: '0.85rem' }}>Patient</div>
                    <div className="tile-role-sub" style={{ fontSize: '0.68rem' }}>Recipient</div>
                  </div>
                </div>

                {/* Doctor Tile */}
                <div className="col-4">
                  <div 
                    className={`k-role-tile tile-doctor ${selectedRole === 'doctor' ? 'active' : ''}`}
                    onClick={() => setSelectedRole('doctor')}
                    role="button"
                    tabIndex={0}
                  >
                    {selectedRole === 'doctor' && (
                      <div className="tile-check-badge" style={{ backgroundColor: '#2563eb' }}>
                        <Check size={11} strokeWidth={3} />
                      </div>
                    )}
                    <div className="tile-icon-box rounded-circle d-flex align-items-center justify-content-center p-2 mb-1.5" style={{ width: '36px', height: '36px' }}>
                      <Stethoscope size={18} />
                    </div>
                    <div className="tile-role-title small" style={{ fontSize: '0.85rem' }}>Doctor</div>
                    <div className="tile-role-sub" style={{ fontSize: '0.68rem' }}>Clinical HLA</div>
                  </div>
                </div>

                {/* Admin Tile */}
                <div className="col-4">
                  <div 
                    className={`k-role-tile tile-admin ${selectedRole === 'admin' ? 'active' : ''}`}
                    onClick={() => setSelectedRole('admin')}
                    role="button"
                    tabIndex={0}
                  >
                    {selectedRole === 'admin' && (
                      <div className="tile-check-badge" style={{ backgroundColor: '#9333ea' }}>
                        <Check size={11} strokeWidth={3} />
                      </div>
                    )}
                    <div className="tile-icon-box rounded-circle d-flex align-items-center justify-content-center p-2 mb-1.5" style={{ width: '36px', height: '36px' }}>
                      <ShieldCheck size={18} />
                    </div>
                    <div className="tile-role-title small" style={{ fontSize: '0.85rem' }}>Admin</div>
                    <div className="tile-role-sub" style={{ fontSize: '0.68rem' }}>Biobank</div>
                  </div>
                </div>
              </div>

              {/* Error Alert */}
              {(localError || authError) && (
                <div className="alert alert-danger py-2 px-3 rounded-3 small d-flex align-items-center gap-2 mb-3" style={{ fontSize: '0.8rem' }}>
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{localError || authError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-2.5 mb-3">
                {/* Full Name */}
                <div>
                  <div className={`input-group auth-input-group role-${selectedRole}`}>
                    <span className="input-group-text ps-3" style={{ color: currentRole.color }}>
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      className="form-control py-2.5 small"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <div className={`input-group auth-input-group role-${selectedRole}`}>
                    <span className="input-group-text ps-3" style={{ color: currentRole.color }}>
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      className="form-control py-2.5 small"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className={`input-group auth-input-group role-${selectedRole}`}>
                    <span className="input-group-text ps-3" style={{ color: currentRole.color }}>
                      <Lock size={16} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control py-2.5 small"
                      placeholder="Password (min 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="input-group-text pe-3"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <div className={`input-group auth-input-group role-${selectedRole}`}>
                    <span className="input-group-text ps-3" style={{ color: currentRole.color }}>
                      <Lock size={16} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control py-2.5 small"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn ${currentRole.btnClass} rounded-pill py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2 mt-1 shadow-sm`}
                  style={{ fontSize: '0.94rem' }}
                >
                  <span>{loading ? 'Creating Account...' : `Register as ${currentRole.label}`}</span>
                  <ArrowRight size={17} />
                </button>
              </form>
            </div>
          ) : (
            /* Verification Step */
            <div className="text-center py-3">
              <h4 className="fw-bold text-dark mb-1">Verify Your Email</h4>
              <p className="text-secondary small mb-3">
                We sent a verification link to <strong style={{ color: currentRole.color }}>{email}</strong>
              </p>

              <div className="my-3">
                <VerifyEmailIllustration size={130} />
              </div>

              {resendNotice && (
                <div className="alert alert-success py-1.5 px-3 rounded-pill small mb-3" style={{ fontSize: '0.78rem' }}>
                  Verification email resent successfully!
                </div>
              )}

              <div className="d-flex flex-column gap-2 mb-3" style={{ maxWidth: '320px', margin: '0 auto' }}>
                <button
                  type="button"
                  className="btn btn-light border rounded-pill py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold text-dark shadow-xs hover-scale"
                  onClick={() => window.open('https://mail.google.com', '_blank')}
                >
                  <span>Open Webmail</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  className="btn btn-link text-decoration-none text-muted small py-1"
                  onClick={handleResendEmail}
                  style={{ fontSize: '0.8rem' }}
                >
                  <RotateCcw size={13} className="me-1" />
                  <span>Resend Verification Link</span>
                </button>
              </div>

              <button
                type="button"
                className={`btn ${currentRole.btnClass} rounded-pill py-2.5 px-4 fw-bold shadow-sm w-100`}
                onClick={() => {
                  if (selectedRole === 'doctor') navigate('/doctor');
                  else if (selectedRole === 'admin') navigate('/admin');
                  else navigate('/');
                }}
              >
                Enter KOSHIKA Portal →
              </button>
            </div>
          )}

          {/* Card Footer Switcher */}
          <div className="text-center pt-2.5 mt-2 border-top small text-muted" style={{ fontSize: '0.82rem' }}>
            Already have an account?{' '}
            <Link to="/login" className="fw-bold text-decoration-none" style={{ color: currentRole.color }}>
              Sign In →
            </Link>
          </div>
        </div>
      </div>
    </AuthBackgroundVideo>
  );
};

export default Register;



