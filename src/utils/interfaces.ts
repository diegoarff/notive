import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  comparePassword: (password: string) => Promise<boolean>;
  updatePassword: (password: string) => Promise<void>;
  createToken: () => string;
}

export interface INote extends Document {
  title: string;
  content: string;
  creatorId: string;
  folderId?: string;
}

export interface IFolder extends Document {
  name: string;
  color?: string;
  creatorId: string;
}
