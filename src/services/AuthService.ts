import UserSchema from "../models/UserModel";
import jwt from "jsonwebtoken";

async function login(email: String) {
  return await UserSchema.findOne({email}).select("+password");
}

async function generateToken(value: String) {
  return jwt.sign({value}, `${process.env.SECRET_JWT}`, { expiresIn: 86400 });
}

export default { 
  login,
  generateToken
};