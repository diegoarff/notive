import { z } from 'zod';

const usernameSchema = z
  .string({
    required_error: 'Username is required',
    invalid_type_error: 'Username must be a string',
  })
  .min(2, 'Username must be at least 2 characters')
  .max(25, 'Username must be at most 25 characters');

const passwordSchema = z
  .string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  })
  .min(6, 'Password must be at least 6 characters')
  .max(50, 'Password must be at most 50 characters');

export const registerSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
});

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});
