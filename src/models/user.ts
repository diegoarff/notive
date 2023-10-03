import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../utils/interfaces";
import jwt from "jsonwebtoken";

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.createToken = function (): string {
  return jwt.sign(
    { id: this.id, username: this.username },
    <string>process.env.JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24, // a day,
    }
  );
};

const UserModel = model("user", UserSchema);
export default UserModel;
