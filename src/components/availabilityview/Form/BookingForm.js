// BookingForm.jsx
import React, { useState } from 'react';
import { Clock, Copy, Calendar, ArrowLeft } from 'lucide-react';
import ProfileSectionMeeting from '../ProfileSectionMeeting';
import { bookingFormDefaults, mergeClasses, formatDate } from '../utils';

const BookingForm = ({ 
  profileInfo, 
  selectedDate, 
  selectedTime, 
  onBack, 
  onConfirm,
  initialValues = {},
  theme = {},
  customClasses = {},
  ariaLabel,
  customStyles = {},
  fields = bookingFormDefaults.fields,
  customFields = [],
  validation = {},
  renderProfileSection,
  renderField,
  renderActions,
  layout = 'default', // 'default' | 'single-column' | 'compact'
  showTerms = true,
  termsLinks = {
    terms: '#',
    privacy: '#'
  },
  submitButtonText = 'Confirm',
  backButtonText = 'Back',
  termsText = "By proceeding, you agree to our",
  onFieldChange,
  autoFocus = true,
  showValidationErrors = true
}) => {
  const [formData, setFormData] = useState({
    name: initialValues.name || '',
    email: initialValues.email || '',
    description: initialValues.description || '',
    ...initialValues
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Merge styles with defaults
  const styles = {
    ...bookingFormDefaults.styles,
    ...customStyles
  };

  const validateField = (name, value) => {
    if (validation[name]) {
      return validation[name](value);
    }
    
    // Default validation
    if (fields[name]?.required && !value) {
      return `${fields[name].label} is required`;
    }
    
    if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }
    
    return null;
  };

  const handleFieldUpdate = (name, value) => {
    setFormData({ ...formData, [name]: value });
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
    
    onFieldChange?.(name, value);
  };

  const handleBlur = (name) => {
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, formData[name]);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = () => {
    // Validate all fields
    const newErrors = {};
    const allFields = { ...fields, ...Object.fromEntries(customFields.map(f => [f.name, f])) };
    
    Object.keys(allFields).forEach(name => {
      const error = validateField(name, formData[name]);
      if (error) newErrors[name] = error;
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(allFields).reduce((acc, name) => ({ ...acc, [name]: true }), {}));
    
    if (Object.keys(newErrors).length === 0) {
      onConfirm({ ...formData, date: selectedDate, time: selectedTime });
    }
  };

  const renderDefaultField = (fieldName, fieldConfig) => {
    const error = touched[fieldName] && errors[fieldName];
    const fieldClasses = mergeClasses(
      fieldConfig.type === 'textarea' ? styles.textarea : styles.input,
      error && 'cal-border-red-500 focus:cal-ring-red-400',
      customClasses[`${fieldName}Input`]
    );

    if (fieldConfig.type === 'textarea') {
      return (
        <textarea
          value={formData[fieldName] || ''}
          onChange={(e) => handleFieldUpdate(fieldName, e.target.value)}
          onBlur={() => handleBlur(fieldName)}
          placeholder={fieldConfig.placeholder}
          rows={fieldConfig.rows || 4}
          className={fieldClasses}
          aria-label={fieldConfig.label}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldName}-error` : undefined}
        />
      );
    }

    return (
      <input
        type={fieldConfig.type || 'text'}
        value={formData[fieldName] || ''}
        onChange={(e) => handleFieldUpdate(fieldName, e.target.value)}
        onBlur={() => handleBlur(fieldName)}
        placeholder={fieldConfig.placeholder}
        className={fieldClasses}
        autoFocus={autoFocus && fieldName === 'name'}
        aria-label={fieldConfig.label}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldName}-error` : undefined}
      />
    );
  };

  const layoutClasses = {
    default: styles.container,
    'single-column': mergeClasses(styles.container, 'lg:cal-grid-cols-1'),
    compact: mergeClasses(styles.container, 'cal-min-h-[400px]')
  };

  const allFields = [
    ...Object.entries(fields).map(([name, config]) => ({ name, ...config })),
    ...customFields
  ];

  const isFormValid = Object.keys(errors).length === 0 && 
    allFields.filter(f => f.required).every(f => formData[f.name]);

  return (
    <div className={mergeClasses(layoutClasses[layout] || layoutClasses.default, customClasses.container)}>
      {/* Left Panel - Meeting Details */}
      {layout !== 'single-column' && (
        <div className={mergeClasses(styles.leftPanel, customClasses.leftPanel)}>
          {renderProfileSection ? (
            renderProfileSection({ profileInfo, selectedDate: formatDate(selectedDate), selectedTime })
          ) : (
            <ProfileSectionMeeting 
              {...profileInfo} 
              selectedDate={formatDate(selectedDate)}
              selectedTime={selectedTime}
              theme={theme}
              customClasses={customClasses.profileSection || {}}
            />
          )}
        </div>
      )}

      {/* Right Panel - Form */}
      <div className={mergeClasses(
        styles.rightPanel, 
        customClasses.rightPanel,
        layout === 'single-column' ? 'lg:cal-col-span-1' : ''
      )}>
        <div className={mergeClasses(styles.formWrapper, customClasses.formWrapper)}>
          <div className={mergeClasses(styles.formContent, customClasses.formContent)}>
            {allFields.map((field) => (
              <div key={field.name}>
                <label 
                  htmlFor={field.name}
                  className={mergeClasses(styles.fieldLabel, customClasses.fieldLabel)}
                >
                  {field.label}
                  {field.required && <span className="cal-text-red-500 cal-ml-1">*</span>}
                </label>
                
                {renderField ? (
                  renderField(field, {
                    value: formData[field.name],
                    onChange: (value) => handleFieldUpdate(field.name, value),
                    onBlur: () => handleBlur(field.name),
                    error: touched[field.name] && errors[field.name],
                    formData
                  })
                ) : (
                  renderDefaultField(field.name, field)
                )}
                
                {showValidationErrors && touched[field.name] && errors[field.name] && (
                  <p 
                    id={`${field.name}-error`}
                    className={mergeClasses('cal-text-sm cal-text-red-500 cal-mt-1', customClasses.errorMessage)}
                  >
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Terms and Actions */}
          {renderActions ? (
            renderActions({
              onBack,
              onSubmit: handleSubmit,
              isValid: isFormValid,
              formData
            })
          ) : (
            <div className={mergeClasses(styles.actionsWrapper, customClasses.actionsWrapper)}>
              {/* Terms text */}
              {showTerms && (
                <p className={mergeClasses(styles.termsText, customClasses.termsText)}>
                  {termsText}{' '}
                  <a 
                    href={termsLinks.terms} 
                    className={mergeClasses(styles.termsLink, customClasses.termsLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms
                  </a>
                  {' '}and{' '}
                  <a 
                    href={termsLinks.privacy} 
                    className={mergeClasses(styles.termsLink, customClasses.termsLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                </p>
              )}

              {/* Spacer */}
              {showTerms && <div className={styles.spacer} />}

              {/* Back button */}
              <button
                onClick={onBack}
                className={mergeClasses(styles.backButton, customClasses.backButton)}
                aria-label="Go back"
              >
                {backButtonText}
              </button>

              {/* Confirm button */}
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={mergeClasses(styles.confirmButton, customClasses.confirmButton)}
                aria-label={submitButtonText}
              >
                {submitButtonText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;