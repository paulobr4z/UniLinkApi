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
  return await UserSchema.findByIdAndUpdate(user_id, { [params]: new_value });
}

async function create(UserInfo: IUser) {
  return await UserSchema.create(UserInfo);  
}

async function updateLinkByID(linkID: string, field: string, value: string) {
  return await UserSchema.updateOne(
    {
      'links': {
        '$elemMatch': {
          '_id': linkID,
        }
      }
    },
    {
      $set: {
        [`links.$.${field}`]: `${value}`
      }
    }
  );
}

async function updateUsername(userID:string, username:string) {
  return await UserSchema.findByIdAndUpdate(
    userID, { username }
  );
}

async function deleteLinkByID(linkID: string) {
  return await UserSchema.updateMany(
    { $pull: { links: { _id: linkID } } }
  );
}

export default { 
  create,
  findById,
  findByUsername,
  findByEmail,
  addLink,
  update,
  updateLinkByID,
  updateUsername,
  deleteLinkByID
};