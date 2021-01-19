import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";

import isAuth from "@modules/users/infra/http/middlewares/isAuth";
import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post("/", usersController.create);

usersRouter.patch(
  "/avatar",
  isAuth,
  upload.single("avatar"),
  userAvatarController.update
);
export default usersRouter;
