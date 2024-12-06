import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import { DashboardHeader } from '../DashboardHeader';
import { useAuth } from '@/features/auth/store';

vi.mock('@/features/auth/store', () => ({
  useAuth: vi.fn(() => ({
    user: {
      name: 'Test User',
      email: 'test@example.com',
      role: 'teacher',
    },
  })),
}));

describe('DashboardHeader', () => {
  it('renders correctly with user information', () => {
    render(<DashboardHeader />);
    
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('renders notification button', () => {
    render(<DashboardHeader />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    expect(notificationButton).toBeInTheDocument();
  });

  it('does not render when user is not authenticated', () => {
    useAuth.mockImplementation(() => ({ user: null }));
    render(<DashboardHeader />);
    
    expect(screen.queryByText('Test User')).not.toBeInTheDocument();
  });
});