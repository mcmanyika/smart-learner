import { z } from 'zod';

const socialLinksSchema = z.object({
  twitter: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
});

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
  socialLinks: socialLinksSchema.optional(),
});