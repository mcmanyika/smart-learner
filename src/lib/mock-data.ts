import { User, UserRole } from '@/features/auth/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@smartlearner.com',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'teacher@smartlearner.com',
    name: 'John Smith',
    role: 'teacher',
  },
  {
    id: '3',
    email: 'student@smartlearner.com',
    name: 'Sarah Johnson',
    role: 'student',
  },
  {
    id: '4',
    email: 'parent@smartlearner.com',
    name: 'Michael Brown',
    role: 'parent',
  },
];

// Mock authentication functions
export const mockAuth = {
  login: async (email: string, password: string) => {
    const user = mockUsers.find(u => u.email === email);
    if (!user || password !== 'password123') {
      throw new Error('Invalid credentials');
    }
    return {
      user,
      token: 'mock-jwt-token',
    };
  },
  
  register: async (data: { email: string; password: string; name: string; role: UserRole }) => {
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