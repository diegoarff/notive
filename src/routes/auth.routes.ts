import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validate } from '../middlewares/validator';
import {
  registerSchema,
  loginSchema,
} from '../middlewares/schemas/auth.schemas';

const router = Router();

router.post('/register', validate(registerSchema), register);

router.post('/login', validate(loginSchema), login);

export default router;
