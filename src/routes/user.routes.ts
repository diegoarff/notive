import { Router } from 'express';
import {
  changePassword,
  deleteAccount,
  getProfile,
  updateProfile,
} from '../controllers/user.controller';
import {
  changePasswordSchema,
  updateProfileSchema,
} from '../middlewares/schemas/user.schemas';
import { validate } from '../middlewares/validator';

const router = Router();

router.put(
  '/password-change/:userId',
  validate(changePasswordSchema),
  changePassword,
);

router.get('/profile/:userId', getProfile);

router.put('/profile/:userId', validate(updateProfileSchema), updateProfile);

router.delete('/:userId', deleteAccount);

export default router;
