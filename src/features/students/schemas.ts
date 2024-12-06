import { z } from 'zod';

export const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  studentId: z.string().min(1, 'Student ID is required'),
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string(),
  grade: z.string().min(1, 'Grade is required'),
  parentName: z.string().optional(),
  parentEmail: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  status: z.enum(['active', 'inactive', 'graduated']).default('active'),
});