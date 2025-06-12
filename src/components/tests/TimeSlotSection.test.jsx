import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TimeSlotSection from '../availabilityview/TimeSlotSection';

describe('TimeSlotSection', () => {
  const mockOnTimeSelect = jest.fn();
  const defaultProps = {
    selectedDate: new Date('2025-01-15'),
    onTimeSelect: mockOnTimeSelect,
    selectedTime: null,
    timeSlots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM']
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all time slots', () => {
    render(<TimeSlotSection {...defaultProps} />);
    
    expect(screen.getByText('9:00 AM')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('11:00 AM')).toBeInTheDocument();
    expect(screen.getByText('2:00 PM')).toBeInTheDocument();
  });

  it('should highlight selected time', () => {
    render(<TimeSlotSection {...defaultProps} selectedTime="10:00 AM" />);
    
    const selectedButton = screen.getByText('10:00 AM').closest('button');
    expect(selectedButton).toHaveClass('cal-bg-purple-600');
  });

  it('should call onTimeSelect when slot is clicked', async () => {
    const user = userEvent.setup();
    render(<TimeSlotSection {...defaultProps} />);
    
    await user.click(screen.getByText('10:00 AM'));
    expect(mockOnTimeSelect).toHaveBeenCalledWith('10:00 AM');
  });

  it('should group time slots when enabled', () => {
    const props = {
      ...defaultProps,
      groupTimeSlots: true,
      timeSlotGroups: {
        morning: { label: 'Morning', range: [0, 12] },
        afternoon: { label: 'Afternoon', range: [12, 24] }
      }
    };
    
    render(<TimeSlotSection {...props} />);
    
    expect(screen.getByText('Morning')).toBeInTheDocument();
    expect(screen.getByText('Afternoon')).toBeInTheDocument();
  });

  it('should show empty state when no slots available', () => {
    render(<TimeSlotSection {...defaultProps} timeSlots={[]} />);
    
    expect(screen.getByText('No time slots available')).toBeInTheDocument();
  });

  it('should render custom empty state', () => {
    const renderEmptyState = () => <div>Custom empty message</div>;
    
    render(
      <TimeSlotSection 
        {...defaultProps} 
        timeSlots={[]} 
        renderEmptyState={renderEmptyState}
      />
    );
    
    expect(screen.getByText('Custom empty message')).toBeInTheDocument();
  });

  it('should disable slots based on shouldDisableTime', () => {
    const shouldDisableTime = (time) => time === '10:00 AM';
    
    render(
      <TimeSlotSection 
        {...defaultProps} 
        shouldDisableTime={shouldDisableTime}
      />
    );
    
    expect(screen.getByText('10:00 AM').closest('button')).toBeDisabled();
    expect(screen.getByText('9:00 AM').closest('button')).not.toBeDisabled();
  });
});