import { z } from 'zod';

const passwordSchema = z
  .string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  })
  .min(6, 'Password must be at least 6 characters')
  .max(50, 'Password must be at most 50 characters');

const usernameSchema = z
  .string({
    required_error: 'Username is required',
    invalid_type_error: 'Username must be a string',
  })
  .min(2, 'Username must be at least 2 characters')
  .max(25, 'Username must be at most 25 characters');

export const changePasswordSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must match new password',
        path: ['confirmNewPassword'],
      });
    }
  });

export const updateProfileSchema = z
  .object({
    username: usernameSchema,
    firstName: z.string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    }),
    lastName: z.string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    }),
  })
  .partial()
  .superRefine(({ username, firstName, lastName }, ctx) => {
    if (!username && !firstName && !lastName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one field must be provided',
        path: ['username', 'firstName', 'lastName'],
      });
    }
  });
