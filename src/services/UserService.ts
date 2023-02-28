import UserSchema from '../models/UserModel';
import { ILinks, IUser } from '../types';

async function findByUsername(username: string) {
  return await UserSchema.findOne({username});
}

async function findById(id: string) {
  return await UserSchema.findById({_id: id});
}

async function findByEmail(email: string) {
  return await UserSchema.findOne({email});
}

async function addLink(user_id: string, new_link:ILinks) {
  try {
    return await UserSchema.findByIdAndUpdate(
      { _id: user_id },
      { $push: { links: new_link } },
    );
  } catch (error) {
    console.log(error);
  }
}

async function update(user_id:string, params:string, new_value: string) {
  console.log(user_id, params, new_value)
  return await UserSchema.findByIdAndUpdate(user_id, { [params]: new_value });
}

async function create(USerInfo: IUser) {
  return await UserSchema.create(USerInfo);  
}

export default { 
  create,
  findById,
  findByUsername,
  findByEmail,
  addLink,
  update
};