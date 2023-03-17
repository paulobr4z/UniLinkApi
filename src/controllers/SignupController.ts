import { Request, Response } from "express";
import UserService from "../services/UserService";
import { IUser } from "../types";

async function signup(request: Request, response: Response) {
  const { first_name, last_name, username, email, password, avatar } = request.body as unknown as IUser;
  
  if (!first_name || !last_name || !username || !email || !password) {
    return response.status(400).json({ message: "blank field" });
  }

  const checkUsernameAlreadyExists = await UserService.findByUsername(username);

  if (checkUsernameAlreadyExists) {
    return response.status(409).json({ message: "username already exists" });    
  }

  const checkEmailAlreadyExists = await UserService.findByEmail(email);

  if (checkEmailAlreadyExists) {
    return response.status(409).json({ message: "email already exists" });    
  }

  try {
    await UserService.create({
      first_name,
      last_name,
      username,
      email,
      password,
      avatar: ""
    } as any)
    
    return response.status(201).json({ message: 'successfully registered user' });
  } catch (error) {
    response.status(500).json({ message: error });
  }
};

export default {
  signup
};