import { z } from 'zod';

const titleSchema = z
  .string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string',
  })
  .nonempty('Title cannot be empty')
  .max(50, 'Title must be at most 50 characters');

const contentSchema = z
  .string({
    required_error: 'Content is required',
    invalid_type_error: 'Content must be a string',
  })
  .max(500, 'Content must be at most 500 characters');

const creatorIdSchema = z
  .string({
    required_error: 'CreatorId is required',
    invalid_type_error: 'CreatorId must be a string',
  })
  .nonempty('CreatorId cannot be empty');

const folderIdSchema = z
  .string({
    required_error: 'FolderId is required',
    invalid_type_error: 'FolderId must be a string',
  })
  .optional();

// This would validate the param in the url.
// To use this, consider implementing the params: req.params, body: req.body
// design in the validator
export const getNotesSchema = z.object({
  creatorId: creatorIdSchema,
});

export const createNoteSchema = z.object({
  title: titleSchema,
  content: contentSchema,
  creatorId: creatorIdSchema,
  folderId: folderIdSchema,
});

export const updateNoteSchema = z
  .object({
    title: titleSchema,
    content: contentSchema,
    folderId: folderIdSchema,
  })
  .partial()
  .superRefine(({ title, content, folderId }, ctx) => {
    if (!title && !content && !folderId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one field must be provided',
        path: ['title', 'content', 'folderId'],
      });
    }
  });

// This would validate the param in the url.
// To use this, consider implementing the params: req.params, body: req.body
// design in the validator
export const deleteNoteSchema = z.object({
  noteId: z
    .string({
      required_error: 'NoteId is required',
      invalid_type_error: 'NoteId must be a string',
    })
    .nonempty(
      'NoteId cannot be empty. Please. Send the id of the note to delete',
    ),
});
