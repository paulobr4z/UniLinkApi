import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import bcrypt from "bcrypt";
import { IUser } from "../types";
import UserService from "../services/UserService";

import nodemailer from "nodemailer";

import jwt from "jsonwebtoken"

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
      }
    });
  } catch (err) {
    response.status(500).send(err);
  }
};

async function forgot_password(request: Request, response: Response) {
  const { email } = request.body;

  console.log(email)

  const emailIsRegistered = await UserService.findByEmail(email);

  if (emailIsRegistered) {
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD
      }
    });

    const token = await AuthService.generateToken(email);

    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Reset your password for UniLink",
        html: `
          <p>Click the link below to reset your password.</p>
          <a href="https://unilink.vercel.app/login/forgot_password/${token}">reset password</a>
        `
      })

      return response.status(200).json({
        message: `We just sent an email with password reset instructions to ${email}`
      });      
    } catch (error) {
      return response.status(400).json({ message: error });      
    }
  }

  return response.status(404).json({ message: "email not registered" });
};

async function validateToken(request: Request, response: Response) {
  const { token } = request.body;

  try {
    jwt.verify(token, `${process.env.SECRET_JWT}`);
    
    return response.status(202).json({ message: "valid token" });
  } catch (error) {
    
    return response.status(404).json({ message: "invalid token" });
  }
}

export default {
  login,
  forgot_password,
  validateToken
};