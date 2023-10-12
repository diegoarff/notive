import { Request, Response } from 'express';
import {
  checkFolderExists,
  eraseFolder,
  getFoldersByCreatorId,
  insertFolder,
  updateFolder,
} from '../services/folder.services';
import { checkUserExistsById } from '../services/user.services';
import { eraseNote, getNotesByFolderId } from '../services/note.services';

export const postFolder = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const folder = await insertFolder(req.body);
    return res.status(201).json({
      status: 'success',
      msg: 'Folder created succesfully',
      data: folder,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', msg: 'Internal server error', error });
  }
};

export const getFolders = async (
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
    const folders = await getFoldersByCreatorId(creatorId);
    return res.status(200).json({
      status: 'success',
      msg: 'Folders fetched successfully',
      data: folders,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', msg: 'Internal server error', error });
  }
};

export const putFolder = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { folderId } = req.params;
  if (!folderId) {
    return res
      .status(400)
      .json({ status: 'error', msg: 'folderId must be provided' });
  }

  try {
    const folderExists = await checkFolderExists(folderId);
    if (!folderExists) {
      return res.status(404).json({ status: 'error', msg: 'Folder not found' });
    }

    const folder = await updateFolder(folderId, req.body);

    return res.status(200).json({
      status: 'success',
      msg: 'Folder updated succesfully',
      data: folder,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', msg: 'Internal server error', error });
  }
};

export const deleteFolder = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { folderId } = req.params;
  if (!folderId) {
    return res
      .status(400)
      .json({ status: 'error', msg: 'folderId must be provided' });
  }

  try {
    const folderExists = await checkFolderExists(folderId);
    if (!folderExists) {
      return res.status(404).json({ status: 'error', msg: 'Folder not found' });
    }

    const notes = await getNotesByFolderId(folderId);
    if (notes) {
      notes.forEach(async (note) => {
        await eraseNote(note._id);
      });
    }

    const deletedFolder = await eraseFolder(folderId);

    return res.status(200).json({
      status: 'success',
      msg: 'Folder deleted succesfully',
      data: deletedFolder,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', msg: 'Internal server error', error });
  }
};
