import { Request, Response } from 'express';
import {
  insertUser,
  checkUserExistByUsername,
  getUserByUsername,
} from '../services/user.services';
import { IUser } from '../utils/interfaces';

export const register = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const userExists = await checkUserExistByUsername(req.body.username);
    if (userExists) {
      return res.status(400).json({
        status: 'error',
        msg: 'Username is taken',
      });
    }

    await insertUser(req.body);

    return res
      .status(201)
      .json({ status: 'success', msg: 'User created succesfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', msg: 'Internal server error', error });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password }: IUser = req.body;

  try {
    const user = await getUserByUsername(username);

    if (user == null) {
      return res
        .status(400)
        .json({ status: 'error', msg: 'The user does not exist' });
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      return res.status(200).json({
        status: 'success',
        msg: 'User authenticated successfully',
        data: { token: user.createToken(), userId: user._id },
      });
    } else {
      return res
        .status(400)
        .json({ status: 'error', msg: 'Password is incorrect' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', msg: 'Internal server error', error });
  }
};
