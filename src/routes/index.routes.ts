import { Router } from 'express';
import passport from 'passport';
import { getter } from '../middlewares/getter';

import authRouter from './auth.routes';
import noteRouter from './note.routes';
import folderRouter from './folder.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/auth', authRouter);
router.use(
  '/notes',
  passport.authenticate('jwt', { session: false }),
  getter,
  noteRouter,
);
router.use(
  '/folders',
  passport.authenticate('jwt', { session: false }),
  getter,
  folderRouter,
);
router.use(
  '/users',
  passport.authenticate('jwt', { session: false }),
  userRouter,
);

export default router;
