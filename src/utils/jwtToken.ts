import "dotenv/config";
import { IUser } from "./interfaces";
import jwt from "jsonwebtoken";

const createToken = (user: IUser) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    <string>process.env.JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24, // a day,
    }
  );
};

export default createToken;
