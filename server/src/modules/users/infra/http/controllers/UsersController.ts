/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    Reflect.deleteProperty(user, 'password');

    return response.json(user);
  }

  // async update(request: Request, response: Response): Promise<Response> {
  //   const updatedUserAvatar = container.resolve(UpdateUserAvatarService);

  //   const user = await updatedUserAvatar.execute({
  //     user_id: request.user.id,
  //     avatarFilename: request.file.filename,
  //   });

  //   Reflect.deleteProperty(user, 'password');

  //   return response.json(user);
  // }
}
