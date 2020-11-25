import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";

import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

import isAuth from "../middlewares/isAuth";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  "/avatar",
  isAuth,
  upload.single("avatar"),
  async (request, response) => {
    const updatedUserAvatar = new UpdateUserAvatarService();

    const user = await updatedUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
);
export default usersRouter;
