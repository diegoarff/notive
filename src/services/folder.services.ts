import { response } from "express";
import FolderModel from "../models/folder";
import { IFolder } from "../utils/interfaces";


export const insertFolder = async (folderData:IFolder): Promise<IFolder> => {
    const response = new FolderModel(folderData);
    await response.save()
    return response
}

export const getFoldersByCreatorId = async (creatorId:string): Promise<IFolder[] | null> => {
    const response = await FolderModel.find({creatorId:creatorId}).exec();
    return response;
}