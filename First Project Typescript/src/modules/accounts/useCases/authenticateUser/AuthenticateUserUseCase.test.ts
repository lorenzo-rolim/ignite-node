import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: 'A',
      email: 'user@test.com',
      password: '123456789a',
      name: 'User Test',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: 'user@test.com',
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not to be able to authenticate an non-existent user', async () => {
    let err = false;

    const user: ICreateUserDTO = {
      driver_license: 'A',
      email: 'user@test.com',
      password: '123456789a',
      name: 'User Test',
    };

    await createUserUseCase.execute(user);

    try {
      await authenticateUserUseCase.execute({
        email: 'emailerrado@gmail.com',
        password: '123456789a',
      });
    } catch (error) {
      if (error.message === 'Email or password incorrect!') {
        err = true;
      }
    }

    expect(err).toBeTruthy();
  });

  it('Should not to be able to authenticate a user with incorrect password', async () => {
    let err = false;

    const user: ICreateUserDTO = {
      driver_license: 'A',
      email: 'user@test.com',
      password: '123456789a',
      name: 'User Test',
    };

    await createUserUseCase.execute(user);

    try {
      await authenticateUserUseCase.execute({
        email: 'user@test.com',
        password: 'senhaerrada',
      });
    } catch (error) {
      if (error.message === 'Email or password incorrect!') {
        err = true;
      }
    }

    expect(err).toBeTruthy();
  });
});
