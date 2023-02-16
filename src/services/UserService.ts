import UserSchema from '../models/UserModel';
import { IUser } from '../types';

async function findByUsername(username: string) {
  return await UserSchema.findOne({username});
}

async function create(USerInfo: IUser) {
  return await UserSchema.create(USerInfo);  
}

export default { 
  create,
  findByUsername,
};