import express, { Router } from 'express';
import { userRouter } from './user.routes';
import { authRouter } from './auth.routes';
import { accountRouter } from './account.routes';
import { signupRouter } from './signup.routes';

const routes = Router();

routes.use('/api/user', userRouter);
routes.use('/api/login', authRouter);
routes.use('/api/signup', signupRouter);
routes.use('/api/account', accountRouter);
routes.use('/api/files', express.static('uploads'));

export { routes };