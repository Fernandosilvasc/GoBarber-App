/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const updatedUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updatedUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    Reflect.deleteProperty(user, 'password');

    return response.json(user);
  }
}
