import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils';
import { ProfileForm } from '../ProfileForm';

const mockProfile = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'teacher',
  bio: 'Test bio',
  phone: '123-456-7890',
  location: 'Test City',
  socialLinks: {
    twitter: 'https://twitter.com/test',
    linkedin: 'https://linkedin.com/test',
    github: 'https://github.com/test',
  },
};

describe('ProfileForm', () => {
  it('renders with initial values', () => {
    const onSubmit = vi.fn();
    render(<ProfileForm profile={mockProfile} onSubmit={onSubmit} />);

    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test bio')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123-456-7890')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    const onSubmit = vi.fn();
    render(<ProfileForm profile={mockProfile} onSubmit={onSubmit} />);

    const nameInput = screen.getByLabelText(/full name/i);
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });

    const submitButton = screen.getByRole('button', { name: /save changes/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Updated Name',
      }));
    });
  });

  it('shows validation errors', async () => {
    const onSubmit = vi.fn();
    render(<ProfileForm profile={mockProfile} onSubmit={onSubmit} />);

    const nameInput = screen.getByLabelText(/full name/i);
    fireEvent.change(nameInput, { target: { value: '' } });

    const submitButton = screen.getByRole('button', { name: /save changes/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    });
  });

  it('disables submit button when loading', () => {
    const onSubmit = vi.fn();
    render(<ProfileForm profile={mockProfile} onSubmit={onSubmit} isLoading={true} />);

    const submitButton = screen.getByRole('button', { name: /saving/i });
    expect(submitButton).toBeDisabled();
  });
});