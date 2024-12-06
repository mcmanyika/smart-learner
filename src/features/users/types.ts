import { UserRole } from '@/features/auth/types';

export interface UserFilters {
  role?: UserRole;
  search?: string;
}

export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  password?: string;
}