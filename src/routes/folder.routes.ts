import { Router } from 'express';
import { validate } from '../middlewares/validator';
import {
  createFolderSchema,
  updateFolderSchema,
} from '../middlewares/schemas/folder.schemas';
import {
  deleteFolder,
  getFolders,
  postFolder,
  putFolder,
} from '../controllers/folder.controller';

const router = Router();

router.get('/user/:creatorId', getFolders);

router.post('/', validate(createFolderSchema), postFolder);

router.put('/:folderId', validate(updateFolderSchema), putFolder);

router.delete('/:folderId', deleteFolder);

export default router;
