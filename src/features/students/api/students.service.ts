import { apiClient } from '@/lib/api-client';
import type { Student, StudentFilters, StudentStats } from '../types';

export const studentsService = {
  getStudents: (filters?: StudentFilters) =>
    apiClient.get<Student[]>('/api/students', { params: filters }),

  getStudentById: (id: string) =>
    apiClient.get<Student>(`/api/students/${id}`),

  createStudent: (data: Partial<Student>) =>
    apiClient.post<Student>('/api/students', data),

  updateStudent: (id: string, data: Partial<Student>) =>
    apiClient.put<Student>(`/api/students/${id}`, data),

  deleteStudent: (id: string) =>
    apiClient.delete<void>(`/api/students/${id}`),

  getStudentStats: () =>
    apiClient.get<StudentStats>('/api/students/stats'),
};