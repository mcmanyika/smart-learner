import { UserRole } from '@/features/auth/types';

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: string;
  timezone?: string;
  language?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface UpdateProfileData extends Partial<Omit<ProfileData, 'id' | 'email' | 'role'>> {}