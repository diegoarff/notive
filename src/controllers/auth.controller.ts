import { Request, Response } from "express";
import { insertUser, getUserByUsername } from "../services/user.services";
import { IUser } from "../utils/interfaces";
import createToken from "../utils/jwtToken";

// TODO: Handle validations in another file, follow backend of podcast project
// TODO: Provide better error messages

export const register = async (req: Request, res: Response) => {
  const { username, password, firstName, lastName }: IUser = req.body;

  if (!username || !password || !firstName || !lastName) {
    return res.status(400).json({ msg: "Please. Send your data" });
  }

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string"
  ) {
    return res
      .status(400)
      .json({ msg: "Please. Send the data in the correct format" });
  }
  
  try {
    const checkUser = await getUserByUsername(username)
  if (checkUser) {
    return res.status(400)
    .json({msg: "The user already exist"})
  }
  
    const user = await insertUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password }: IUser = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Please. Send your data" });
  }

  if (typeof username !== "string" || typeof password !== "string") {
    return res
      .status(400)
      .json({ msg: "Please. Send the data in the correct format" });
  }

  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(400).json({ msg: "The user does not exists" });
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      return res.status(201).json({ user, token: createToken(user) });
    } else {
      return res
        .status(400)
        .json({ msg: "The username or password are incorrect" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};
