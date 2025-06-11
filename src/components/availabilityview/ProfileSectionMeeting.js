// ProfileSectionMeeting.jsx
import React, { useState } from 'react';
import { Clock, Copy, Calendar, Check, MapPin, User, Mail } from 'lucide-react';
import { profileMeetingDefaults, mergeClasses } from './utils';

const ProfileSectionMeeting = ({
  image,
  name,
  service,
  subtitle,
  meetingLink,
  meetingLongTime,
  shortText,
  selectedDate,
  selectedTime,
  location,
  theme = {},
  customClasses = {},
  animations = {},
  customStyles = {},
  icons = profileMeetingDefaults.styles,
  showCopyButton = true,
  showDivider = true,
  onCopyLink,
  renderLogo,
  renderTitle,
  renderDescription,
  renderActions,
  renderInfoSection,
  additionalInfo = [],
  customButtons = [],
  layout = 'vertical'
}) => {
  const [copied, setCopied] = useState(false);
  console.log(icons)
  // Merge styles with defaults
  const styles = {
    ...profileMeetingDefaults.styles,
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

  const defaultInfoItems = [
    {
      icon: <Clock size={icons.size} strokeWidth={icons.strokeWidth} />,
      text: meetingLongTime,
      show: !!meetingLongTime
    },
    {
      icon: <Calendar size={icons.size} strokeWidth={icons.strokeWidth} />,
      text: selectedDate,
      show: !!selectedDate
    },
    {
      icon: <Clock size={icons.size} strokeWidth={icons.strokeWidth} />,
      text: selectedTime,
      show: !!selectedTime
    },
    {
      icon: <MapPin size={icons.size} strokeWidth={icons.strokeWidth} />,
      text: location,
      show: !!location
    }
  ].filter(item => item.show);

  const layoutClasses = {
    vertical: styles.container,
    horizontal: mergeClasses(styles.container, 'cal-flex-row cal-items-center cal-justify-between'),
    compact: mergeClasses(styles.container, 'cal-p-4')
  };

  return (
    <div className={mergeClasses(layoutClasses[layout] || layoutClasses.vertical, customClasses.container)}>
      {/* Logo Section */}
      {renderLogo ? (
        renderLogo({ image, name, service, subtitle })
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

      {/* Divider */}
      {showDivider && (
        <div className={mergeClasses(styles.divider, customClasses.divider)} />
      )}

      {/* Info Section */}
      {renderInfoSection ? (
        renderInfoSection({ 
          meetingLongTime, 
          selectedDate, 
          selectedTime, 
          location,
          additionalInfo: [...defaultInfoItems, ...additionalInfo] 
        })
      ) : (
        <div className={mergeClasses(styles.infoSection, customClasses.infoSection)}>
          {defaultInfoItems.map((item, index) => (
            <div key={index} className={mergeClasses(styles.infoItem, customClasses.infoItem)}>
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
          
          {/* Additional Info */}
          {additionalInfo.map((info, index) => (
            <div key={`additional-${index}`} className={mergeClasses(styles.infoItem, customClasses.infoItem)}>
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
              aria-label={button.ariaLabel || button.label}
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

export default ProfileSectionMeeting;