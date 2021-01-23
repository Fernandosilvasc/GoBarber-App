/* eslint-disable import/no-unresolved */
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowUserProfileService from './ShowUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showUserProfile: ShowUserProfileService;

describe('ShowUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUserProfile = new ShowUserProfileService(fakeUsersRepository);
  });

  it('Should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const userProfile = await showUserProfile.execute({
      user_id: user.id,
    });

    expect(userProfile.name).toBe('John Doe');
    expect(userProfile.email).toBe('johndoe@example.com');
  });

  it('Should not be able to show user profile from non-existing user.', async () => {
    expect(
      showUserProfile.execute({
        user_id: 'non-existing-user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
