import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import bcrypt from "bcrypt";

async function login(request: Request, response: Response) {
  const { email, password } = request.body;

  try {
    const user = await AuthService.login(email);

    if (!user) {
      return response.status(404).json({ message: "User or Password not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return response.status(404).json({ message: "User or Password not found" });
    }

    const token = AuthService.generateToken(user.id)

    response.send({token});
  } catch (err) {
    response.status(500).send(err);
  }
};

export default { login };