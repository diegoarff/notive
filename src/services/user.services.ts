import User from "../interfaces/user.interfaces"
import UserModel from "../models/user"

const insertUser = async (item: User) =>{
const responseInsert = await UserModel.create(item);
return responseInsert
}

export {insertUser}