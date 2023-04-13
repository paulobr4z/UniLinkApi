import { Router } from "express";
import AuthController from "../controllers/AuthController";

const authRouter = Router();

authRouter.post('/', AuthController.login);
authRouter.post('/forgot_password', AuthController.forgot_password);
authRouter.post('/validate_token', AuthController.validateToken);

export { authRouter };