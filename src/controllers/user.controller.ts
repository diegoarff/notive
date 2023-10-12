import { Request, Response } from 'express';
import { deleteUser, getUserById, updateUser } from '../services/user.services';
import { eraseAllNotesByCreatorId } from '../services/note.services';
import { eraseAllFolderByCreatorId } from '../services/folder.services';

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

    return res
      .status(200)
      .json({ status: 'success', msg: 'Password changed succesfully' });
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

    return res.status(200).json({
      status: 'success',
      msg: 'Profile updated succesfully',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error', error });
  }
};

export const deleteAccount = async (
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

    await eraseAllNotesByCreatorId(userId);
    await eraseAllFolderByCreatorId(userId);
    await deleteUser(userId);

    return res.status(200).json({
      status: 'success',
      msg: 'Account deleted succesfully',
      data: userExist,
    });
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error', error });
  }
};
