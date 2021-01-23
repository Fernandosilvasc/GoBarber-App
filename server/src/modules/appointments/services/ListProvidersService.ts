/* eslint-disable import/no-unresolved */
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const usersProvider = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    usersProvider.map(user => {
      return Reflect.deleteProperty(user, 'password');
    });

    return usersProvider;
  }
}

export default ListProvidersService;
