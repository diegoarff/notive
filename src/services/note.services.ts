import NoteModel from '../models/note';
import { INote } from '../utils/interfaces';

export const checkNoteExists = async (noteId: string): Promise<boolean> => {
  const response = await NoteModel.exists({ _id: noteId });
  return response != null;
};

export const insertNote = async (noteData: INote): Promise<INote> => {
  const response = new NoteModel(noteData);
  await response.save();
  return response;
};

export const getNotesByCreatorId = async (
  creatorId: string,
): Promise<INote[] | null> => {
  const response = await NoteModel.find({ creatorId }).exec();
  return response;
};

export const updateNote = async (
  id: string,
  noteData: INote,
): Promise<INote | null> => {
  const response = await NoteModel.findByIdAndUpdate(id, noteData, {
    new: true,
  }).exec();
  return response;
};

export const eraseNote = async (id: string): Promise<INote | null> => {
  const response = await NoteModel.findByIdAndDelete(id).exec();
  return response;
};
