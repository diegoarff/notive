import { Request, Response } from 'express';
import {
  checkNoteExists,
  getNotesByCreatorId,
  insertNote,
  updateNote,
  eraseNote,
  getNotesByFolderId,
} from '../services/note.services';
import { checkUserExistsById } from '../services/user.services';

export const postNote = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const note = await insertNote(req.body);
    return res
      .status(201)
      .json({ status: 'success', msg: 'Note created succesfully', data: note });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', msg: 'Internal server error', error });
  }
};

export const getNotes = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { creatorId } = req.params;
  if (!creatorId) {
    return res
      .status(400)
      .json({ status: 'error', msg: 'CreatorId not found' });
  }

  const userExist = await checkUserExistsById(creatorId);

  if (!userExist) {
    return res.status(404).json({ status: 'error', msg: 'User not found' });
  }

  try {
    const notes = await getNotesByCreatorId(creatorId);
    return res.status(200).json({
      status: 'success',
      msg: 'Notes fetched successfully',
      data: notes,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', msg: 'Internal server error', error });
  }
};

export const putNote = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { noteId } = req.params;
  if (!noteId) {
    return res
      .status(400)
      .json({ status: 'error', msg: 'noteId must be provided' });
  }

  try {
    const noteExist = await checkNoteExists(noteId);
    if (!noteExist) {
      return res.status(404).json({ status: 'error', msg: 'Note not found' });
    }

    const note = await updateNote(noteId, req.body);

    return res
      .status(200)
      .json({ status: 'success', msg: 'Note updated succesfully', data: note });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', msg: 'Internal server error', error });
  }
};

export const deleteNote = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { noteId } = req.params;
  if (!noteId) {
    return res
      .status(400)
      .json({ status: 'error', msg: 'NoteId must be provided' });
  }

  try {
    const noteExist = await checkNoteExists(noteId);
    if (!noteExist) {
      return res.status(404).json({ status: 'error', msg: 'Note not found' });
    }

    const deletedNote = await eraseNote(noteId);

    return res.status(200).json({
      status: 'success',
      msg: 'Note deleted succesfully',
      data: deletedNote,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', msg: 'Internal server error', error });
  }
};

export const getNotesFromFolder = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { folderId } = req.params;
  if (!folderId) {
    return res
      .status(400)
      .json({ status: 'error', msg: 'FolderId must be provided' });
  }

  try {
    const notes = await getNotesByFolderId(folderId);
    return res.status(200).json({
      status: 'success',
      msg: 'Notes fetched successfully',
      data: notes,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', msg: 'Internal server error', error });
  }
};
