import { z } from 'zod';

export const reportUploadSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['academic', 'attendance', 'behavior', 'progress']),
  description: z.string().optional(),
  file: z.instanceof(FileList).refine((files) => files.length > 0, 'File is required'),
});

export const reportFilterSchema = z.object({
  timeframe: z.enum(['day', 'week', 'month', 'year']),
  role: z.string().optional(),
  classId: z.string().optional(),
});