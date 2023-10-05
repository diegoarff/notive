import { Router } from 'express';
import { changePassword } from '../controllers/user.controller';
import { changePasswordSchema } from '../middlewares/schemas/user.schemas';
import { validate } from '../middlewares/validator';

const router = Router();

router.put(
  '/password-change/:userId',
  validate(changePasswordSchema),
  changePassword,
);

export default router;
