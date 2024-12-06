import { UserRole } from '../auth/types';

export interface SystemSettings {
  id: string;
  name: string;
  value: string;
  category: 'general' | 'security' | 'notifications' | 'appearance';
  description?: string;
  updatedAt: string;
}

export interface UserSettings {
  userId: string;
  notifications: {
    email: boolean;
    browser: boolean;
    mobile: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
}

export interface SettingsPermission {
  role: UserRole;
  categories: string[];
}