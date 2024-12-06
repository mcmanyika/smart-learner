import { UserRole } from '../auth/types';

export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  grade: string;
  parentName?: string;
  parentEmail?: string;
  phone?: string;
  address?: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated';
}

export interface StudentFilters {
  search?: string;
  grade?: string;
  status?: string;
  gender?: string;
}

export interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  averageGrade: number;
  attendanceRate: number;
}