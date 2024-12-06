import { ProfileData, UpdateProfileData } from '../types';
import { useAuth } from '@/features/auth/store';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const profileService = {
  getProfile: async (): Promise<ProfileData> => {
    await delay(500);
    const { user } = useAuth.getState();
    
    return {
      id: user!.id,
      name: user!.name,
      email: user!.email,
      role: user!.role,
      avatar: user!.avatar,
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      phone: '+1 234 567 890',
      location: 'New York, USA',
      timezone: 'America/New_York',
      language: 'English',
      socialLinks: {
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
    };
  },

  updateProfile: async (data: UpdateProfileData): Promise<ProfileData> => {
    await delay(500);
    const currentProfile = await profileService.getProfile();
    return { ...currentProfile, ...data };
  },
};