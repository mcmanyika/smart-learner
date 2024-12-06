import { LoginCredentials, RegisterData, AuthResponse } from '../types';
import { apiClient } from '@/lib/api-client';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // For development, use mock data
    if (credentials.email === 'teacher@smartlearner.com' && credentials.password === 'password123') {
      return {
        user: {
          id: '2',
          email: 'teacher@smartlearner.com',
          name: 'John Smith',
          role: 'teacher',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        },
        token: 'mock-jwt-token',
      };
    }

    throw new Error('Invalid credentials');
  },

  register: (data: RegisterData) =>
    apiClient.post<AuthResponse>('/api/auth/register', data),
    
  me: () => apiClient.get<AuthResponse>('/api/auth/me'),
};