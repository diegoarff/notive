import { Request, Response } from "express";
import {
  insertUser,
  checkUserExistByUsername,
  getUserByUsername,
} from "../services/user.services";
import { IUser } from "../utils/interfaces";

export const register = async (req: Request, res: Response) => {
  try {
    const userExists = await checkUserExistByUsername(req.body.username);
    if (userExists) {
      return res
        .status(400)
        .json({ path: "username", msg: "Username is taken" });
    }

    await insertUser(req.body);

    return res.status(201).json({ msg: "User created succesfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password }: IUser = req.body;

  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return res
        .status(400)
        .json({ path: "username", msg: "The user does not exist" });
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      return res.status(200).json({ token: user.createToken() });
    } else {
      return res
        .status(400)
        .json({ path: "password", msg: "Password is incorrect" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};
