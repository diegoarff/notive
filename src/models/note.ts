import { Schema, model } from 'mongoose';
import { INote } from '../utils/interfaces';

const NoteSchema = new Schema<INote>(
  {
    creatorId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    folderId: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const NoteModel = model('note', NoteSchema);
export default NoteModel;
