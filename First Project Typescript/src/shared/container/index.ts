import { ICarsRepository } from 'src/modules/cars/repositories/ICarsRepository';
import { container } from 'tsyringe';

import { UserRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoryRepositories } from '../../modules/cars/infra/typeorm/repositories/CategoryRepositories';
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICategoryRepositories } from '../../modules/cars/repositories/ICategoryRepositories';
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository';

container.registerSingleton<ICategoryRepositories>(
  'CategoryRepositories',
  CategoryRepositories,
);
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UserRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
