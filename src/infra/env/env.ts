import { z } from 'zod';

export const envSchema = z.object({
  JWT_SECRET: z.coerce.string(),
  JWT_REFRESH_SECRET: z.coerce.string(),
  GOOGLE_CLIENT_ID: z.coerce.string(),
  GOOGLE_CLIENT_SECRET: z.coerce.string(),
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3000),
  CACHE_TTL: z.coerce.number().optional().default(5),
  CACHE_MAX: z.coerce.number().optional().default(10),
  // STRIPE_API_KEY: z.coerce.string(),
  // CHECKOUT_SUCCESS_URL: z.coerce.string(),
  // STRIPE_WEBHOOK_SECRET: z.coerce.string(),
});

export type Env = z.infer<typeof envSchema>;
