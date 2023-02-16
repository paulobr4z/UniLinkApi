import { Router } from 'express';
import { userRouter } from './user.routes';
import { authRouter } from './auth.routes';

const routes = Router();

routes.use('/api/user', userRouter);
routes.use('/api/login', authRouter);

export { routes };