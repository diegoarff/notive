import { z } from 'zod';

const nameSchema = z
  .string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  })
  .nonempty('Name cannot be empty')
  .max(50, 'Name must be at most 50 characters');

const colorSchema = z
  .string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  })
  .regex(
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    'Color must be a valid hex color',
  )
  .optional();

export const createFolderSchema = z.object({
  name: nameSchema,
  color: colorSchema,
});

export const updateFolderSchema = z
  .object({
    name: nameSchema.optional(),
    color: colorSchema,
  })
  .superRefine(({ name, color }, ctx) => {
    if (!name && !color) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one field must be provided',
        path: ['name', 'color'],
      });
    }
  });

// This would validate the param in the url.
// To use this, consider implementing the params: req.params, body: req.body
// design in the validator
export const deleteFolderSchema = z.object({
  folderId: z
    .string({
      required_error: 'FolderId is required',
      invalid_type_error: 'FolderId must be a string',
    })
    .nonempty('FolderId cannot be empty'),
});
