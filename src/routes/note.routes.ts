import { Router } from "express";
import passport from "passport";
import { getNotes, insertNote } from "../controllers/note.controller";

const NoteRouter = Router()

NoteRouter.get('/:creatorId', passport.authenticate("jwt", {session:false}), 
getNotes)

NoteRouter.post('/', passport.authenticate("jwt",{session:false}),
insertNote)
export default NoteRouter