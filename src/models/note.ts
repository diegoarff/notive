import { Schema } from "mongoose";
import Note from "../interfaces/note.interfaces";



const NoteSchema = new Schema<Note>(
{
    creator: {
        type: String
    },
    name: {
        type: String
    },
    folder: {
        type: String
    },
    content: {
        type: String
    }
}
)