import { Router } from "express";
import AccountController from "../controllers/AccountController";
import { authMiddleware } from "../middleware/auth.middleware";

const accountRouter = Router();

accountRouter.get('/user/:params', authMiddleware, AccountController.getUserByID);
accountRouter.post('/link', authMiddleware, AccountController.addLink);
accountRouter.patch('/update/:params', authMiddleware, AccountController.update);

export { accountRouter };