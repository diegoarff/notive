import { z } from 'zod';

const passwordSchema = z
  .string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  })
  .min(6, 'Password must be at least 6 characters')
  .max(50, 'Password must be at most 50 characters');

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
