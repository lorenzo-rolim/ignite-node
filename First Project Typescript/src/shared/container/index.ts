import { container } from "tsyringe";

import { UserRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoryRepositories } from "../../modules/cars/repositories/ICategoryRepositories";
import { CategoryRepositories } from "../../modules/cars/repositories/implementations/CategoryRepositories";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";


container.registerSingleton<ICategoryRepositories>("CategoryRepositories", CategoryRepositories);
container.registerSingleton<ISpecificationsRepository>("SpecificationsRepository", SpecificationsRepository);
container.registerSingleton<IUsersRepository>("UsersRepository", UserRepository);
