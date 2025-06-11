// ProfileSection.jsx
import React, { useState } from 'react';
import { Clock, Copy, Check } from 'lucide-react';
import { profileDefaults, mergeClasses } from './utils';

const ProfileSection = ({
  image,
  name,
  service,
  subtitle,
  meetingLink,
  meetingLongTime,
  shortText,
  theme = {},
  customClasses = {},
  animations = {},
  customStyles = {},
  icons = profileDefaults.icons,
  showCopyButton = true,
  onCopyLink,
  renderLogo,
  renderTitle,
  renderDescription,
  renderActions,
  additionalInfo = [],
  customButtons = [],
  layout = 'vertical' // 'vertical' | 'horizontal' | 'compact'
}) => {
  const [copied, setCopied] = useState(false);
  
  // Merge styles with defaults
  const styles = {
    ...profileDefaults.styles,
    ...customStyles
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(meetingLink);
      setCopied(true);
      onCopyLink?.(meetingLink);
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const layoutClasses = {
    vertical: styles.container,
    horizontal: mergeClasses(styles.container, 'cal-flex-row cal-items-center cal-justify-between'),
    compact: mergeClasses(styles.container, 'cal-p-4')
  };

  return (
    <div className={mergeClasses(layoutClasses[layout] || layoutClasses.vertical, customClasses.container)}>
      {/* Logo Section */}
      {renderLogo ? (
        renderLogo({ image, name, service })
      ) : (
        <div className={mergeClasses(styles.logoWrapper, customClasses.logoWrapper)}>
          <div className={mergeClasses(styles.logoContainer, customClasses.logoContainer)}>
            <div className={mergeClasses(styles.logoInner, customClasses.logoInner)}>
              <img
                src={image}
                alt={name}
                className={mergeClasses(styles.image, customClasses.image)}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
                }}
              />
            </div>
          </div>
          <h2 className={mergeClasses(styles.serviceTitle, customClasses.serviceTitle)}>
            {service}
          </h2>
          {subtitle && (
            <p className={mergeClasses('cal-text-sm cal-text-gray-600', customClasses.subtitle)}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Duration */}
      {meetingLongTime && (
        <div className={mergeClasses(styles.duration, customClasses.duration)}>
          <Clock size={icons.size} strokeWidth={icons.strokeWidth} />
          <span>{meetingLongTime}</span>
        </div>
      )}

      {/* Title Section */}
      {renderTitle ? (
        renderTitle({ name, service })
      ) : (
        <div className={mergeClasses(styles.titleSection, customClasses.titleSection)}>
          <h1 className={mergeClasses(styles.mainTitle, customClasses.mainTitle)}>
            {`Schedule a Meeting with ${name}`}
          </h1>
          {renderDescription ? (
            renderDescription(shortText)
          ) : (
            <p className={mergeClasses(styles.description, customClasses.description)}>
              {shortText}
            </p>
          )}
        </div>
      )}

      {/* Additional Info */}
      {additionalInfo.length > 0 && (
        <div className={mergeClasses('cal-space-y-2 cal-mb-4', customClasses.additionalInfo)}>
          {additionalInfo.map((info, index) => (
            <div key={index} className="cal-flex cal-items-center cal-gap-2 cal-text-sm cal-text-gray-600">
              {info.icon && <span>{info.icon}</span>}
              <span>{info.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Actions Section */}
      {renderActions ? (
        renderActions({ meetingLink, handleCopyLink, copied })
      ) : (
        <div className={mergeClasses(styles.copyButtonWrapper, customClasses.copyButtonWrapper)}>
          {showCopyButton && (
            <button 
              onClick={handleCopyLink}
              className={mergeClasses(
                styles.copyButton,
                customClasses.copyButton,
                copied && 'cal-bg-green-500 cal-text-white hover:cal-bg-green-600'
              )}
              aria-label={copied ? 'Link copied' : 'Copy meeting link'}
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy Link
                </>
              )}
            </button>
          )}
          
          {/* Custom Buttons */}
          {customButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={mergeClasses(
                styles.copyButton,
                'cal-mt-2',
                button.className,
                customClasses.customButton
              )}
              disabled={button.disabled}
            >
              {button.icon && <span>{button.icon}</span>}
              {button.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileSection;