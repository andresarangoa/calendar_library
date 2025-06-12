import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from '../availabilityview/Form/BookingForm';

describe('BookingForm', () => {
  const mockOnBack = jest.fn();
  const mockOnConfirm = jest.fn();
  const defaultProps = {
    profileInfo: {
      name: 'John Doe',
      service: 'Consultation',
      image: 'test.jpg'
    },
    selectedDate: new Date('2025-01-15'),
    selectedTime: '10:00 AM',
    onBack: mockOnBack,
    onConfirm: mockOnConfirm
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form fields', () => {
    render(<BookingForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('should show validation errors for required fields', async () => {
    const user = userEvent.setup();
    render(<BookingForm {...defaultProps} />);
    
    const confirmButton = screen.getByText('Confirm');
    await user.click(confirmButton);
    
    expect(confirmButton).toBeDisabled();
  });

  it('should enable submit when required fields are filled', async () => {
    const user = userEvent.setup();
    render(<BookingForm {...defaultProps} />);
    
    await user.type(screen.getByLabelText(/your name/i), 'Test User');
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    
    const confirmButton = screen.getByText('Confirm');
    expect(confirmButton).not.toBeDisabled();
  });

  it('should call onConfirm with form data', async () => {
    const user = userEvent.setup();
    render(<BookingForm {...defaultProps} />);
    
    await user.type(screen.getByLabelText(/your name/i), 'Test User');
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.type(screen.getByLabelText(/description/i), 'Test description');
    
    await user.click(screen.getByText('Confirm'));
    
    expect(mockOnConfirm).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      description: 'Test description'
    });
  });

  it('should validate email format', async () => {
    const user = userEvent.setup();
    render(<BookingForm {...defaultProps} />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'invalid-email');
    await user.tab(); // Trigger blur
    
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  it('should call onBack when back button is clicked', async () => {
    const user = userEvent.setup();
    render(<BookingForm {...defaultProps} />);
    
    await user.click(screen.getByText('Back'));
    expect(mockOnBack).toHaveBeenCalled();
  });

  it('should render custom fields', () => {
    const customFields = [
      {
        name: 'phone',
        label: 'Phone Number',
        placeholder: '+1 (555) 000-0000',
        type: 'tel',
        required: true
      }
    ];
    
    render(<BookingForm {...defaultProps} customFields={customFields} />);
    
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  });

  it('should apply custom validation rules', async () => {
    const user = userEvent.setup();
    const validation = {
      name: (value) => value.length < 3 ? 'Name too short' : null
    };
    
    render(<BookingForm {...defaultProps} validation={validation} />);
    
    await user.type(screen.getByLabelText(/your name/i), 'AB');
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Name too short')).toBeInTheDocument();
    });
  });
});