import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../utils/interfaces';
import jwt from 'jsonwebtoken';

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
  },
);

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.updatePassword = async function (newPassword: string) {
  this.password = newPassword;
  await this.save();
};

UserSchema.methods.createToken = function (): string {
  return jwt.sign(
    { id: this.id, username: this.username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: 60 * 60 * 24, // a day,
    },
  );
};

const UserModel = model('user', UserSchema);
export default UserModel;
