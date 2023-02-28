import { Router } from "express";
import SignupController from "../controllers/SignupController";

const signupRouter = Router();

signupRouter.post('/', SignupController.signup);

export { signupRouter };