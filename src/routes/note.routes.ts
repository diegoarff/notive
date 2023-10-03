import { Router } from "express";
import { getNotes, postNote } from "../controllers/note.controller";

const router = Router();

router.get("/user/:creatorId", getNotes);

router.post("/", postNote);

export default router;
