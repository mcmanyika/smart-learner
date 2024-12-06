import { User } from '@/features/auth/types';
import { UserFormData } from './types';
import { mockUsers } from '@/lib/mock-data';

// Mock API functions
export const usersApi = {
  getUsers: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockUsers;
  },

  createUser: async (data: UserFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser: User = {
      id: String(mockUsers.length + 1),
      ...data,
    };
    mockUsers.push(newUser);
    return newUser;
  },

  updateUser: async (id: string, data: Partial<UserFormData>) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) throw new Error('User not found');
    
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...data,
    };
    return mockUsers[userIndex];
  },

  deleteUser: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) throw new Error('User not found');
    mockUsers.splice(userIndex, 1);
  },
};