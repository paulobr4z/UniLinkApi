import { Request, Response } from "express";
import UserService from "../services/UserService";
import { ICreateUser } from "../types";

interface IParams {
  params: String;
}

interface ISignupError {
  keyPattern: {[key:string]: any};
}

async function findByUsername(request:Request, response:Response) {
  const { params } = request.params as unknown as IParams;

  try {
    const user = await UserService.findByUsername(`${params}`);

    if (!user) {
      return response.status(400).json({
        message: 'User not found!'
      })
    }

    return response.json(user);
  } catch (error) {
    return response.status(500).send({
      error: "Internal Server Error!",
      message: error
    })      
  }  
}

async function checkUsernameAlreadyExists(request:Request, response:Response) {
  const { params } = request.params as unknown as IParams;

  try {
    const user = await UserService.findByUsername(`${params}`);

    if (!user) {
      return response.json({
        available: true
      })
    }

    return response.json({
      available: false
    });
  } catch (error) {
    return response.status(500).send({
      error: "Internal Server Error!",
      message: error
    })      
  }  
}

async function create(request:Request, response:Response) {
  try {
    const userInfo = request.body as ICreateUser;

    await UserService.create(userInfo);

    return response.status(201).json({
      message: "user created successfully"
    });
  } catch (error) {
    const signupError = error as ISignupError;

    if (Object.keys(signupError.keyPattern).includes('username')) {
      return response.status(409).send({
        message: "username already exists"
      })
    }

    if (Object.keys(signupError.keyPattern).includes('email')) {
      return response.status(409).send({
        message: "email already exists"
      })
    }

    return response.status(500).send({
      error: "Internal Server Error!",
      message: error
    })      
  }  
}

export default {
  create,
  findByUsername,
  checkUsernameAlreadyExists
};