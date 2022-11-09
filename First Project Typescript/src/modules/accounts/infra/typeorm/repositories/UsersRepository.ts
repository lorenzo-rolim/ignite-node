import { hash } from 'bcryptjs';
import { ICreateUserDTO } from 'src/modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from 'src/modules/accounts/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';

import { User } from '../entities/User';

class UserRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('Email already exists!');
    }

    const passwordHash = await hash(password, 8);

    const user = this.repository.create({
      name,
      email,
      driver_license,
      password: passwordHash,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async updateAvatar({
    name,
    email,
    driver_license,
    password,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id,
    });

    await this.repository.save(user);
  }
}

export { UserRepository };
