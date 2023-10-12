import { Schema, model } from 'mongoose';
import { IFolder } from '../utils/interfaces';

const FolderSchema = new Schema<IFolder>(
  {
    creatorId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const FolderModel = model('folder', FolderSchema);
export default FolderModel;
