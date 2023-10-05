import { Request, Response } from 'express';
import { getUserById, updateUser } from '../services/user.services';

export const changePassword = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { userId } = req.params;
  const { oldPassword, newPassword } = req.body;

  if (!userId) {
    return res.status(400).json({ msg: 'userId must be provided' });
  }

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password for user' });
    }

    await user.updatePassword(newPassword);

    return res.status(200).json({ msg: 'Password changed succesfully' });
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error', error });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ msg: 'userId must be provided' });
  }

  try {
    const userExist = await getUserById(userId);
    if (!userExist) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const user = await updateUser(userId, req.body);

    return res
      .status(200)
      .json({ msg: 'Profile updated succesfully', data: user });
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error', error });
  }
};
