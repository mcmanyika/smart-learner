import { z } from 'zod';

export const classSchema = z.object({
  name: z.string().min(1, 'Class name is required'),
  description: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  schedule: z.string().optional(),
  room: z.string().optional(),
  capacity: z.number().positive('Capacity must be a positive number').optional(),
});