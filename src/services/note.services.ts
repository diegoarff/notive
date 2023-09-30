import NoteModel from "../models/note";
import { INote } from "../utils/interfaces";


export const insertUser =async (noteData:INote): Promise<INote> => {
   const response = new NoteModel(noteData);
    await response.save();
   return response;

}