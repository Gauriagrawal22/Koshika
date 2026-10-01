import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Check, AlertCircle } from 'lucide-react';

/**
 * AnimatedTextBox Component
 * Premium healthcare-tech animated input field featuring:
 * - Floating animated label with smooth cubic-bezier transition
 * - Animated kinetic border glow on focus (teal / cyan / indigo gradient)
 * - Animated leading icon with micro-pulse
 * - Smooth fade-in clear button
 * - Optional validation state (success pulse or error shake)
 * - Optional animated rotating placeholder tips
 */
const AnimatedTextBox = ({
  id,
  name,
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  icon: Icon,
  error = '',
  success = false,
  required = false,
  disabled = false,
  autoComplete = 'off',
  rotatingPlaceholders = null,
  shortcut = '',
  onClear = null,
  className = '',
  style = {}
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [currentPlaceholderIdx, setCurrentPlaceholderIdx] = useState(0);
  const inputRef = useRef(null);

  // Rotating animated placeholder effect if provided
  useEffect(() => {
    if (!rotatingPlaceholders || rotatingPlaceholders.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentPlaceholderIdx(prev => (prev + 1) % rotatingPlaceholders.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [rotatingPlaceholders]);

  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const isFloated = isFocused || hasValue;
  const activePlaceholder = rotatingPlaceholders 
    ? (isFocused || !label ? rotatingPlaceholders[currentPlaceholderIdx] : '') 
    : (isFocused || !label ? placeholder : '');

  const handleClear = (e) => {
    e.stopPropagation();
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { name, value: '' } });
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className={`animated-textbox-wrapper ${isFocused ? 'is-focused' : ''} ${hasValue ? 'has-value' : ''} ${error ? 'has-error' : ''} ${success ? 'is-success' : ''} ${className}`}
      style={style}
    >
      {/* Animated Glowing Gradient Border Container */}
      <div className="animated-border-glow-frame">
        <div className="animated-border-gradient"></div>
        <div className="animated-inner-surface">
          
          {/* Leading Icon */}
          {Icon && (
            <div className={`animated-leading-icon ${isFocused ? 'icon-active' : ''}`}>
              <Icon size={18} />
            </div>
          )}

          {/* Input Control Area */}
          <div className="animated-input-content-area">
            {/* Floating Animated Label */}
            {label && (
              <label
                htmlFor={id || name}
                className={`animated-floating-label ${isFloated ? 'floated' : 'placeholder-mode'}`}
              >
                {label} {required && <span className="text-danger">*</span>}
              </label>
            )}

            {/* Native Input */}
            <input
              ref={inputRef}
              id={id || name}
              name={name}
              type={type}
              value={value}
              onChange={onChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={activePlaceholder}
              disabled={disabled}
              autoComplete={autoComplete}
              className={`animated-native-input ${Icon ? 'with-leading-icon' : ''} ${label ? 'with-label' : ''}`}
            />
          </div>

          {/* Right Action Icons: Clear Button, Status Indicators, Keyboard Shortcut */}
          <div className="animated-trailing-tools">
            {/* Clear Button */}
            {hasValue && !disabled && (
              <button
                type="button"
                className="animated-clear-btn"
                onClick={handleClear}
                tabIndex={-1}
                aria-label="Clear text"
              >
                <X size={14} />
              </button>
            )}

            {/* Success Checkmark */}
            {success && !error && (
              <div className="animated-status-icon text-success" title="Verified">
                <Check size={16} />
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="animated-status-icon text-danger" title={error}>
                <AlertCircle size={16} />
              </div>
            )}

            {/* Keyboard Shortcut Indicator (e.g. ⌘K or Ctrl+K) */}
            {shortcut && !hasValue && (
              <span className="animated-shortcut-tag">{shortcut}</span>
            )}
          </div>

        </div>
      </div>

      {/* Optional Error / Helper Message */}
      {error && (
        <div className="animated-input-error-msg">
          <AlertCircle size={12} className="me-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default AnimatedTextBox;
