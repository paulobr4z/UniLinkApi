import { Request, Response } from "express";
import UserService from "../services/UserService";

interface IParams {
  params: String;
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

async function create(request:Request, response:Response) {
  try {
    const userInfo = request.body;
    await UserService.create(userInfo);
    return response.status(201).json({
      message: "User created successfully!"
    });
  } catch (error) {
    return response.status(500).send({
      error: "Internal Server Error!",
      message: error
    })      
  }  
}

export default { create, findByUsername };