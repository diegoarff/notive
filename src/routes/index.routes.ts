import { Router } from 'express'
import passport from 'passport'


import authRouter from './auth.routes'
import noteRouter from './note.routes'
import folderRouter from './folder.routes'
import userRouter from './user.routes'

const router = Router()

router.use('/auth', authRouter)
router.use("/notes", passport.authenticate("jwt", { session: false }), noteRouter);
router.use("/folders", passport.authenticate("jwt", { session: false }), folderRouter);

export default router
