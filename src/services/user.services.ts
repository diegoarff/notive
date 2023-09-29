import { IUser } from "../utils/interfaces";
import UserModel from "../models/user";

export const insertUser = async (userData: IUser): Promise<IUser> => {
  const response = new UserModel(userData);
  await response.save();
  return response;
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  const response = await UserModel.findById(id);
  return response;
};

export const getUserByUsername = async ( username: string ): Promise<IUser | null> => {

  const response = await UserModel.findOne({ username });
  return response;
};
