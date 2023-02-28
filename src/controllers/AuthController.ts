import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import bcrypt from "bcrypt";
import { IUser } from "../types";

async function login(request: Request, response: Response) {
  const { email, password } = request.body;

  if (email === "" || password === "") {
    return response.status(404).json({ message: "Email or Password invalid. Try again." });    
  }

  try {
    const user = await AuthService.login(email) as unknown as IUser;

    if (!user) {
      return response.status(404).json({ message: "Incorrect username or password. Try again." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return response.status(404).json({ message: "Incorrect username or password. Try again." });
    }

    const token = await AuthService.generateToken(`${user._id}`);

    response.send({
      token,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (err) {
    response.status(500).send(err);
  }
};

export default { login };