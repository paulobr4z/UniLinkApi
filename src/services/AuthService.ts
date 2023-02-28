import UserSchema from "../models/UserModel";
import jwt from "jsonwebtoken";

async function login(email: String) {
  return await UserSchema.findOne({email}).select("+password");
}

async function generateToken(id: String) {
  return jwt.sign({id}, `${process.env.SECRET_JWT}`, { expiresIn: 86400 });  
}

export default { 
  login,
  generateToken
};