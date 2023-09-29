import { Schema, model } from "mongoose";
import User from "../interfaces/user.interfaces";



const UserSchema = new Schema<User>(
    {
    user: {
        type: String
    },
    password: {
        type: String
    },
    fullname: {
        type: String
    }
    },
    {
        timestamps: true,
        versionKey:false,
    }
);

const UserModel = model('users', UserSchema);
export default UserModel