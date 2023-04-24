import { Request, Response, Router } from "express";

const startRouter = Router();

startRouter.get("/", (request: Request, response: Response) => {
  response.status(200).json("server started successfully");
});

export { startRouter };