import { response } from "express";
import FolderModel from "../models/folder";
import { IFolder } from "../utils/interfaces";


export const insertFolder = async (folderData:IFolder): Promise<IFolder> => {
    const response = new FolderModel(folderData);
    await response.save()
    return response
}

export const getFolders = async (): Promise<IFolder[] | null> => {
    const response = await FolderModel.find();
    return response;
}