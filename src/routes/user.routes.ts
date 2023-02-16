import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.get('/:params', UserController.findByUsername);
userRouter.post('/', UserController.create);

export { userRouter };