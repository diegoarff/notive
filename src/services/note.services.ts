import NoteModel from "../models/note";
import { INote } from "../utils/interfaces";

export const insertNote = async (noteData: INote): Promise<INote> => {
  const response = new NoteModel(noteData);
  await response.save();
  return response;
};

export const getNotesByCreatorId = async (
  creatorId: string
): Promise<INote[] | null> => {
  const response = await NoteModel.find({ creatorId }).exec();
  return response;
};
