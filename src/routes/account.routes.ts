import { Router } from "express";
import AccountController from "../controllers/AccountController";
import { authMiddleware } from "../middleware/auth.middleware";

const accountRouter = Router();

accountRouter.get(
  '/user/:params',
  authMiddleware,
  AccountController.getUserByID
);

accountRouter.post(
  '/link',
  authMiddleware,
  AccountController.addLink
);

accountRouter.patch(
  '/update',
  authMiddleware,
  AccountController.update
);

accountRouter.patch(
  '/link/:linkID',
  authMiddleware,
  AccountController.updateLinkByID
);

accountRouter.patch(
  '/update/username',
  authMiddleware,
  AccountController.updateUsername
);

accountRouter.delete(
  '/link/:linkID',
  authMiddleware,
  AccountController.deleteLink
);

export { accountRouter };