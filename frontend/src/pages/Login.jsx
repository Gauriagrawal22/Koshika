import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { KoshikaLogoIcon } from '../components/KoshikaLogo';
import AuthBackgroundVideo from '../components/AuthBackgroundVideo';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Check, 
  User, 
  Stethoscope, 
  ShieldCheck, 
  AlertCircle,
  Compass,
  Zap
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, login, demoLogin, loading, authError } = useAuth();
  const { isDark } = useTheme();

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'doctor') navigate('/doctor', { replace: true });
      else if (user.role === 'admin') navigate('/admin', { replace: true });
      else navigate('/', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Selected quick-role: 'patient' | 'doctor' | 'admin'
  const [activeRole, setActiveRole] = useState('patient');

  // Input fields
  const [email, setEmail] = useState('mitesh@koshika.ai');
  const [password, setPassword] = useState('Patient@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [localError, setLocalError] = useState('');

  // Role metadata and presets
  const roleData = {
    patient: {
      label: 'Patient',
      desc: 'Care & Symptoms',
      email: 'mitesh@koshika.ai',
      password: 'Patient@123',
      color: '#0d9488',
      bgClass: 'tile-patient',
      btnClass: 'btn-role-patient'
    },
    doctor: {
      label: 'Doctor',
      desc: 'HLA & Consults',
      email: 'dr.sharma@koshika.ai',
      password: 'Doctor@123',
      color: '#2563eb',
      bgClass: 'tile-doctor',
      btnClass: 'btn-role-doctor'
    },
    admin: {
      label: 'Admin',
      desc: 'Biobank & Vaults',
      email: 'admin@koshika.ai',
      password: 'Admin@123',
      color: '#9333ea',
      bgClass: 'tile-admin',
      btnClass: 'btn-role-admin'
    }
  };

  const handleRoleSelect = (roleKey) => {
    setActiveRole(roleKey);
    const preset = roleData[roleKey];
    if (preset) {
      setEmail(preset.email);
      setPassword(preset.password);
    }
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!email.trim() || !password.trim()) {
      setLocalError('Please enter your email and password.');
      return;
    }

    const res = await login(email, password);
    if (res.ok) {
      if (res.user?.role === 'doctor') navigate('/doctor');
      else if (res.user?.role === 'admin') navigate('/admin');
      else navigate('/');
    } else {
      setLocalError(res.error || 'Invalid credentials. Please verify your login details.');
    }
  };

  const handle1ClickDemo = async () => {
    setLocalError('');
    const res = await demoLogin(activeRole);
    if (res.ok) {
      if (activeRole === 'doctor') navigate('/doctor');
      else if (activeRole === 'admin') navigate('/admin');
      else navigate('/');
    }
  };

  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSent(false);
      setForgotEmail('');
    }, 2000);
  };

  const currentRole = roleData[activeRole];

  return (
    <AuthBackgroundVideo>
      <div className="auth-centered-wrapper">
        <div 
          className="card auth-glass-card border-0 shadow-lg position-relative w-100 p-4 p-sm-4.5"
          style={{ maxWidth: '470px' }}
        >
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
                AI PORTAL
              </span>
            </div>
            
            <h3 className="fw-bold mb-1 text-dark" style={{ letterSpacing: '-0.02em', fontSize: '1.65rem' }}>
              Sign In
            </h3>
            <p className="text-secondary small mb-0" style={{ fontSize: '0.84rem' }}>
              Select your role to access your portal
            </p>
          </div>

          {/* 3 Vibrant Role Cards (Proper Rich Colors & Text) */}
          <div className="row g-2.5 mb-3">
            {/* Patient Tile */}
            <div className="col-4">
              <div 
                className={`k-role-tile tile-patient ${activeRole === 'patient' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('patient')}
                role="button"
                tabIndex={0}
              >
                {activeRole === 'patient' && (
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
                className={`k-role-tile tile-doctor ${activeRole === 'doctor' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('doctor')}
                role="button"
                tabIndex={0}
              >
                {activeRole === 'doctor' && (
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
                className={`k-role-tile tile-admin ${activeRole === 'admin' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('admin')}
                role="button"
                tabIndex={0}
              >
                {activeRole === 'admin' && (
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

          {/* Quick 1-Click Demo Shortcut */}
          <div 
            className="p-2 rounded-3 border d-flex align-items-center justify-content-between mb-3"
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : '#f8fafc',
              borderColor: `${currentRole.color}35`
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <Zap size={15} style={{ color: currentRole.color }} />
              <span className="small text-secondary" style={{ fontSize: '0.78rem' }}>
                Test account for <strong className="text-dark">{currentRole.label}</strong>
              </span>
            </div>
            <button
              type="button"
              className="btn btn-xs rounded-pill px-2.5 py-1 fw-bold text-white shadow-xs hover-scale"
              style={{ backgroundColor: currentRole.color, fontSize: '0.72rem' }}
              onClick={handle1ClickDemo}
            >
              1-Click Demo ⚡
            </button>
          </div>

          {/* Error Banner */}
          {(localError || authError) && (
            <div className="alert alert-danger py-2 px-3 rounded-3 small d-flex align-items-center gap-2 mb-3" style={{ fontSize: '0.8rem' }}>
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{localError || authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-2.5 mb-3">
            <div>
              <div className={`input-group auth-input-group role-${activeRole}`}>
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

            <div>
              <div className={`input-group auth-input-group role-${activeRole}`}>
                <span className="input-group-text ps-3" style={{ color: currentRole.color }}>
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control py-2.5 small"
                  placeholder="Password"
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

            {/* Remember Me & Forgot Password */}
            <div className="d-flex align-items-center justify-content-between small pt-0.5" style={{ fontSize: '0.78rem' }}>
              <label className="d-flex align-items-center gap-1.5 text-secondary mb-0 user-select-none cursor-pointer">
                <input
                  type="checkbox"
                  className="form-check-input mt-0 rounded-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none small fw-semibold"
                style={{ color: currentRole.color, fontSize: '0.78rem' }}
                onClick={() => setShowForgotModal(true)}
              >
                Forgot password?
              </button>
            </div>

            {/* Dynamic Role-Coloured Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`btn ${currentRole.btnClass} rounded-pill py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2 mt-1 shadow-sm`}
              style={{ fontSize: '0.94rem' }}
            >
              <span>{loading ? 'Authenticating...' : `Sign In as ${currentRole.label}`}</span>
              <ArrowRight size={17} />
            </button>
          </form>

          {/* Social Sign-In Options */}
          <div className="row g-2 mb-3">
            <div className="col-6">
              <button
                type="button"
                className="btn btn-light border w-100 rounded-pill py-2 d-flex align-items-center justify-content-center gap-2 small fw-semibold text-dark shadow-xs hover-scale"
                style={{ fontSize: '0.8rem' }}
                onClick={() => handle1ClickDemo()}
              >
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Google</span>
              </button>
            </div>

            <div className="col-6">
              <button
                type="button"
                className="btn btn-light border w-100 rounded-pill py-2 d-flex align-items-center justify-content-center gap-1.5 small fw-semibold text-dark shadow-xs hover-scale"
                style={{ fontSize: '0.8rem' }}
                onClick={async () => {
                  await demoLogin('patient');
                  navigate('/');
                }}
              >
                <Compass size={15} style={{ color: currentRole.color }} />
                <span>Guest Tour</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-2 border-top small text-muted" style={{ fontSize: '0.82rem' }}>
            Don't have an account?{' '}
            <Link to="/register" className="fw-bold text-decoration-none" style={{ color: currentRole.color }}>
              Create Account →
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(5px)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '380px' }}>
            <div className="modal-content border-0 rounded-4 shadow-lg p-3.5 bg-surface" style={{ backgroundColor: isDark ? '#0b1326' : '#ffffff', color: isDark ? '#f8fafc' : '#0f172a' }}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="fw-bold mb-0">Reset Password</h6>
                <button 
                  type="button" 
                  className="btn-close" 
                  aria-label="Close"
                  onClick={() => setShowForgotModal(false)}
                />
              </div>

              <p className="text-secondary small mb-3" style={{ fontSize: '0.8rem' }}>
                Enter your email address to receive password reset link.
              </p>

              {forgotSent ? (
                <div className="alert alert-success py-2 px-3 rounded-3 small d-flex align-items-center gap-2 mb-0">
                  <Check size={16} />
                  <span>Reset link sent to your email!</span>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit}>
                  <div className="mb-2.5">
                    <div className="input-group auth-input-group">
                      <span className="input-group-text ps-3">
                        <Mail size={15} />
                      </span>
                      <input
                        type="email"
                        className="form-control py-2 small"
                        placeholder="Registered email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-light border rounded-pill px-3"
                      onClick={() => setShowForgotModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`btn btn-sm ${currentRole.btnClass} text-white rounded-pill px-3`}
                    >
                      Send
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </AuthBackgroundVideo>
  );
};

export default Login;



