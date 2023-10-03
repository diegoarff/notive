import { Request, Response } from "express";
import { checkFolderExists, eraseFolder, getFoldersByCreatorId, insertFolder, updateFolder } from "../services/folder.services";
import { checkUserExistsById } from "../services/user.services";

export const postFolder = async (req: Request, res: Response) => {
  try {
    const folder = await insertFolder(req.body);
    res.status(201).json({ msg: "Folder created succesfully", data: folder });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

export const getFolders = async (req: Request, res: Response) => {
  const { creatorId } = req.params;
  if (!creatorId) {
    return res.status(400).json({ msg: "CreatorId not found" });
  }

  const userExist = await checkUserExistsById(creatorId);

  if (!userExist) {
    return res.status(404).json({ msg: "User not found" });
  }

  try {
    const folders = await getFoldersByCreatorId(creatorId);
    return res.status(200).json({ data: folders });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

export const putFolder = async (req: Request, res: Response) => {
  const { folderId } = req.params;
  if (!folderId) {
    return res.status(400).json({ msg: "folderId must be provided" });
  }

  try {
    const folderExists = await checkFolderExists(folderId);
    if (!folderExists) {
      return res.status(404).json({ msg: "Folder not found" });
    }

    const folder = await updateFolder(folderId, req.body);

    return res
      .status(200)
      .json({ msg: "Folder updated succesfully", data: folder });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

export const deleteFolder = async (req: Request, res: Response) => {
  const { folderId } = req.params;
  if (!folderId) {
    return res.status(400).json({ msg: "folderId must be provided" });
  }

  try {
    const folderExists = await checkFolderExists(folderId);
    if (!folderExists) {
      return res.status(404).json({ msg: "Folder not found" });
    }

    const deletedFolder = await eraseFolder(folderId);

    return res
      .status(200)
      .json({ msg: "Folder deleted succesfully", data: deletedFolder });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};
