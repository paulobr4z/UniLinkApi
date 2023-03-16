import { Request, Response } from "express";
import UserService from "../services/UserService";

async function getUserByID(request: Request, response: Response) {
  const { params } = request.params;

  const user = await UserService.findById(params);

  response.status(200).json(user);
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
  const { user_id, field, value } = request.body;

  const fields = ['first_name', 'last_name', 'avatar', 'username']

  if (fields.includes(field)) {
    await UserService.update(user_id, field, value);    
    return response.status(200).json({ message: "successfully updated" });
  }

  return response.status(409).json({ message: 'field not found' })
};

async function updateLinkByID(request:Request, response:Response) {
  const linksFields = ['is_active', 'title', 'url'];

  try {
    const { linkID } = request.params;
    const { field, value } = request.body;

    if (linksFields.includes(field)) {
      await UserService.updateLinkByID(linkID, field, value);
      
      return response.status(200).json({
        message: `${field} updated successfully`
      });
    }

    return response.status(404).json({
      message: "field not found"
    });
  } catch (error) {
    return response.status(500).send({
      error: "Internal Server Error!",
      message: error
    })      
  }  
}

async function updateUsername(request:Request, response:Response) {
  try {
    const { user_id, value } = request.body;

    console.log(user_id, value)

    const user = await UserService.findByUsername(value);

    if (!user) {
      await UserService.updateUsername(user_id, value);

      return response.status(200).json({
        message: "username updated successfully"
      });
    }

    return response.status(404).json({
      message: "username already exists"
    });
  } catch (error) {
    return response.status(500).send({
      error: "Internal Server Error!",
      message: error
    })      
  }  
}

async function deleteLink(request:Request, response:Response) {
  try {
    const { linkID } = request.params;

    const teste = await UserService.deleteLinkByID(linkID);

    console.log('linkID', linkID)

    return response.status(204).send();
  } catch (error) {
    return response.status(500).send({
      error: "Internal Server Error!",
      message: error
    })      
  }  
}

export default {
  getUserByID,
  addLink,
  update,
  updateLinkByID,
  updateUsername,
  deleteLink
};