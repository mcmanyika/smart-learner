import { LoginCredentials, RegisterData, User } from './types';

// Mock users for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@smartlearner.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  },
  {
    id: '2',
    email: 'teacher@smartlearner.com',
    name: 'John Smith',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  },
  {
    id: '3',
    email: 'student@smartlearner.com',
    name: 'Sarah Johnson',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
];

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === credentials.email);
    if (!user || credentials.password !== 'password123') {
      throw new Error('Invalid credentials');
    }

    return {
      user,
      token: 'mock-jwt-token',
    };
  },

  register: async (data: RegisterData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: String(mockUsers.length + 1),
      email: data.email,
      name: data.name,
      role: data.role,
    };

    mockUsers.push(newUser);
    return {
      user: newUser,
      token: 'mock-jwt-token',
    };
  },
};