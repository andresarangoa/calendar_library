import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingCalendar from '../availabilityview/BookingCalendar';

describe('BookingCalendar Integration', () => {
  const mockHandleFormSubmit = jest.fn();
  const defaultProps = {
    handleFormSubmit: mockHandleFormSubmit
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockDate('2025-01-15');
  });

  afterEach(() => {
    restoreDate();
  });

  it('should complete full booking flow', async () => {
    const user = userEvent.setup();
    render(<BookingCalendar {...defaultProps} />);
    
    // Step 1: Select a date
    const dateButton = screen.getByText('20');
    await user.click(dateButton);
    
    // Step 2: Select a time
    const timeButton = screen.getByText('10:00 AM');
    await user.click(timeButton);
    
    // Step 3: Form should appear
    await waitFor(() => {
      expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    });
    
    // Step 4: Fill form
    await user.type(screen.getByLabelText(/your name/i), 'Test User');
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    
    // Step 5: Submit
    await user.click(screen.getByText('Confirm'));
    
    // Verify submission
    expect(mockHandleFormSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test User',
        email: 'test@example.com',
        date: expect.any(Date),
        time: '10:00 AM'
      })
    );
  });

  it('should go back from form to calendar', async () => {
    const user = userEvent.setup();
    render(<BookingCalendar {...defaultProps} />);
    
    // Select date and time to show form
    await user.click(screen.getByText('20'));
    await user.click(screen.getByText('10:00 AM'));
    
    // Wait for form
    await waitFor(() => {
      expect(screen.getByText('Back')).toBeInTheDocument();
    });
    
    // Click back
    await user.click(screen.getByText('Back'));
    
    // Should show calendar again
    expect(screen.getByText('January 2025')).toBeInTheDocument();
  });

  it('should respect date restrictions', async () => {
    const user = userEvent.setup();
    const minDate = new Date('2025-01-20');
    
    render(
      <BookingCalendar 
        {...defaultProps}
        minDate={minDate}
      />
    );
    
    // Dates before minDate should be disabled
    const disabledDate = screen.getByText('19');
    expect(disabledDate).toBeDisabled();
    
    // Can't click disabled date
    await user.click(disabledDate);
    expect(screen.queryByText('10:00 AM')).not.toBeInTheDocument();
  });
});