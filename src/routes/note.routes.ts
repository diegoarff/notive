import { Router } from 'express';
import {
  getNotes,
  postNote,
  putNote,
  deleteNote,
  getNotesFromFolder,
} from '../controllers/note.controller';
import { validate } from '../middlewares/validator';
import {
  createNoteSchema,
  updateNoteSchema,
} from '../middlewares/schemas/note.schemas';

const router = Router();

router.get('/user/:creatorId', getNotes);

router.get('/folder/:folderId', getNotesFromFolder);

router.post('/', validate(createNoteSchema), postNote);

router.put('/:noteId', validate(updateNoteSchema), putNote);

router.delete('/:noteId', deleteNote);

export default router;
