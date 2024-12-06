import { apiClient } from '@/lib/api-client';
import type { SystemSettings, UserSettings } from '../types';

export const settingsService = {
  // System settings
  getSystemSettings: () =>
    apiClient.get<SystemSettings[]>('/api/settings/system'),

  updateSystemSetting: (id: string, value: string) =>
    apiClient.put<SystemSettings>(`/api/settings/system/${id}`, { value }),

  // User settings
  getUserSettings: () =>
    apiClient.get<UserSettings>('/api/settings/user'),

  updateUserSettings: (settings: Partial<UserSettings>) =>
    apiClient.put<UserSettings>('/api/settings/user', settings),
};