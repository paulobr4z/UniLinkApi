import { Request, Response } from "express";
import UserService from "../services/UserService";

async function getUserByID(request: Request, response: Response) {
  const { params } = request.params;

  const user = await UserService.findById(params);

  response.status(200).json({user});
};

async function addLink(request: Request, response: Response) {
  const { title, url, user_id } = request.body;

  const newLink = {
    is_active: true,
    title,
    url
  }

  await UserService.addLink(user_id, newLink);

  response.status(201).json({ message: "successfully created" });
};

async function update(request: Request, response: Response) {
  const { new_value, user_id } = request.body;
  const { params } = request.params;

  await UserService.update(user_id, params, new_value);

  response.status(200).json({ message: "successfully updated" });
};

export default {
  getUserByID,
  addLink,
  update
};