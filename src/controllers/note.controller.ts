import { Request, Response } from "express";
import {
  checkNoteExists,
  getNotesByCreatorId,
  insertNote,
  updateNote,
  eraseNote,
} from "../services/note.services";

export const postNote = async (req: Request, res: Response) => {
  try {
    const note = await insertNote(req.body);
    res.status(201).json({ msg: "Note created succesfully", data: note });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  const { creatorId } = req.params;
  if (!creatorId) {
    return res.status(400).json({ msg: "CreatorId not found" });
  }

  // TODO: check if users exists

  try {
    const notes = await getNotesByCreatorId(creatorId);
    return res.status(200).json({ data: notes });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

export const putNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  if (!noteId) {
    return res.status(400).json({ msg: "NoteId must be provided" });
  }

  try {
    const noteExist = await checkNoteExists(noteId);
    if (!noteExist) {
      return res.status(404).json({ msg: "Note not found" });
    }

    const note = await updateNote(noteId, req.body);

    return res
      .status(200)
      .json({ msg: "Note updated succesfully", data: note });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  if (!noteId) {
    return res.status(400).json({ msg: "NoteId must be provided" });
  }

  try {
    const noteExist = await checkNoteExists(noteId);
    if (!noteExist) {
      return res.status(404).json({ msg: "Note not found" });
    }

    const deletedNote = await eraseNote(noteId);

    return res
      .status(200)
      .json({ msg: "Note deleted succesfully", data: deletedNote });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};
