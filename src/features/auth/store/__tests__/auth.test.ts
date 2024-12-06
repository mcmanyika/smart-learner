import { describe, it, expect, beforeEach } from 'vitest';
import { useAuth } from '../store';

describe('Auth Store', () => {
  beforeEach(() => {
    const { logout } = useAuth.getState();
    logout(); // Reset store before each test
  });

  it('initializes with null user and token', () => {
    const state = useAuth.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it('sets auth state correctly', () => {
    const { setAuth } = useAuth.getState();
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'student',
    };
    const mockToken = 'mock-token';

    setAuth(mockUser, mockToken);

    const state = useAuth.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe(mockToken);
  });

  it('clears auth state on logout', () => {
    const { setAuth, logout } = useAuth.getState();
    
    setAuth(
      {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'student',
      },
      'mock-token'
    );

    logout();

    const state = useAuth.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it('updates user information', () => {
    const { setAuth, updateUser } = useAuth.getState();
    const initialUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'student',
    };

    setAuth(initialUser, 'mock-token');
    updateUser({ name: 'Updated Name' });

    const state = useAuth.getState();
    expect(state.user?.name).toBe('Updated Name');
    expect(state.user?.email).toBe(initialUser.email);
  });
});