import { z } from 'zod';

export const userProfileSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  content: z.string(),
  imagePath: z.string(),
  provider: z.unknown(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
export type UserProfileResponse = z.infer<typeof userProfileSchema>;
