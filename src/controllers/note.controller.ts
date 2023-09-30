
import { Request, Response } from "express";
import { getNotesByCreatorId, insertNoteService } from "../services/note.services";
import { INote } from "../utils/interfaces";

export const insertNote = async (req: Request, res:Response) => {
    const { name,content,creatorId}: INote = req.body
    if (!name || !content || !creatorId) {
        return res.status(400).json({ msg: "Please. Send your data" });
    }
    if (
        typeof name !== "string" ||
        typeof content !== "string" ||
        typeof creatorId !== "string" 
      ) {
        return res
          .status(400)
          .json({ msg: "Please. Send the data in the correct format" });
      }
    try {
        const note = await insertNoteService(req.body);
        res.status(200).json(note)
    } catch (error) {
        console.log(error)
    }

}

export const getNotes = async (req: Request, res: Response) => {
    const {creatorId}= req.params
    if (!creatorId) {
        return res
        .status(400)
        .json({msg: "CreatorId not found"})
    }
    try {
    const notes = await getNotesByCreatorId(creatorId)
    return res.status(200).json({notes})
}catch(error) {
    return res.status(500).json({ msg: "Server error" });
}
}