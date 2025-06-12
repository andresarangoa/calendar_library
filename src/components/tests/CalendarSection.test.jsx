import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CalendarSection from '../availabilityview/CalendarSection';

describe('CalendarSection', () => {
  const mockOnDateSelect = jest.fn();
  const defaultProps = {
    onDateSelect: mockOnDateSelect,
    selectedDate: new Date('2025-01-15')
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockDate('2025-01-15');
  });

  afterEach(() => {
    restoreDate();
  });

  it('should render calendar with current month', () => {
    render(<CalendarSection {...defaultProps} />);
    
    expect(screen.getByText('January 2025')).toBeInTheDocument();
    expect(screen.getByText('SUN')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('should highlight today', () => {
    render(<CalendarSection {...defaultProps} />);
    
    const todayButton = screen.getByText('15').closest('button');
    expect(todayButton).toHaveClass('cal-bg-gray-900');
  });

  it('should navigate to previous month', async () => {
    const user = userEvent.setup();
    render(<CalendarSection {...defaultProps} />);
    
    const prevButton = screen.getByLabelText('Previous month');
    await user.click(prevButton);
    
    expect(screen.getByText('December 2024')).toBeInTheDocument();
  });

  it('should navigate to next month', async () => {
    const user = userEvent.setup();
    render(<CalendarSection {...defaultProps} />);
    
    const nextButton = screen.getByLabelText('Next month');
    await user.click(nextButton);
    
    expect(screen.getByText('February 2025')).toBeInTheDocument();
  });

  it('should call onDateSelect when date is clicked', async () => {
    const user = userEvent.setup();
    render(<CalendarSection {...defaultProps} />);
    
    const dateButton = screen.getByText('20');
    await user.click(dateButton);
    
    expect(mockOnDateSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        getDate: expect.any(Function)
      })
    );
  });

  it('should disable past dates when disablePastDays is true', () => {
    render(<CalendarSection {...defaultProps} disablePastDays={true} />);
    
    const pastDate = screen.getByText('10');
    expect(pastDate).toBeDisabled();
  });

  it('should not disable past dates when disablePastDays is false', () => {
    render(<CalendarSection {...defaultProps} disablePastDays={false} />);
    
    const pastDate = screen.getByText('10');
    expect(pastDate).not.toBeDisabled();
  });

  it('should respect minDate prop', () => {
    const minDate = new Date('2025-01-20');
    render(<CalendarSection {...defaultProps} minDate={minDate} />);
    
    const beforeMinDate = screen.getByText('19');
    expect(beforeMinDate).toBeDisabled();
    
    const afterMinDate = screen.getByText('21');
    expect(afterMinDate).not.toBeDisabled();
  });

  it('should apply custom classes', () => {
    const customClasses = {
      container: 'custom-container',
      monthTitle: 'custom-title'
    };
    
    render(<CalendarSection {...defaultProps} customClasses={customClasses} />);
    
    expect(screen.getByText('January 2025')).toHaveClass('custom-title');
  });

  it('should render custom day content when provided', () => {
    const renderDayContent = (day, { isToday }) => (
      <div>
        {day}
        {isToday && <span data-testid="today-marker">Today</span>}
      </div>
    );
    
    render(
      <CalendarSection 
        {...defaultProps} 
        renderDayContent={renderDayContent}
      />
    );
    
    expect(screen.getByTestId('today-marker')).toBeInTheDocument();
  });
});