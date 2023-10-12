import FolderModel from '../models/folder';
import { IFolder } from '../utils/interfaces';

export const insertFolder = async (folderData: IFolder): Promise<IFolder> => {
  const response = new FolderModel(folderData);
  await response.save();
  return response;
};

export const getFoldersByCreatorId = async (
  creatorId: string,
): Promise<IFolder[] | null> => {
  const response = await FolderModel.find({ creatorId }).exec();
  return response;
};

export const updateFolder = async (
  id: string,
  folderData: IFolder,
): Promise<IFolder | null> => {
  const response = await FolderModel.findByIdAndUpdate(id, folderData, {
    new: true,
  }).exec();
  return response;
};

export const eraseFolder = async (id: string): Promise<IFolder | null> => {
  const response = await FolderModel.findByIdAndDelete(id).exec();
  return response;
};

export const checkFolderExists = async (folderId: string): Promise<boolean> => {
  const response = await FolderModel.exists({ _id: folderId });
  return response != null;
};

export const eraseAllFolderByCreatorId = async (
  creatorId: string,
): Promise<void> => {
  await FolderModel.deleteMany({ creatorId }).exec();
};
