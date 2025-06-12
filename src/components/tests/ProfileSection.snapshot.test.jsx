import React from 'react';
import { render } from '@testing-library/react';
import ProfileSection from '../availabilityview/ProfileSection';

describe('ProfileSection Snapshots', () => {
  const defaultProps = {
    image: 'test.jpg',
    name: 'John Doe',
    service: 'Consultation',
    subtitle: 'Professional',
    meetingLink: 'https://example.com',
    meetingLongTime: '30 minutes',
    shortText: 'Test description'
  };

  it('should match snapshot with default props', () => {
    const { container } = render(<ProfileSection {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot with additional info', () => {
    const props = {
      ...defaultProps,
      additionalInfo: [
        { icon: '📍', text: 'Online' },
        { icon: '💰', text: '$50' }
      ]
    };
    
    const { container } = render(<ProfileSection {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot with custom buttons', () => {
    const props = {
      ...defaultProps,
      customButtons: [{
        label: 'View Profile',
        onClick: jest.fn()
      }]
    };
    
    const { container } = render(<ProfileSection {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});