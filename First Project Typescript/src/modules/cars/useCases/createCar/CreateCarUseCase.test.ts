import { Car } from '../../infra/typeorm/entities/Car';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      description: 'Description',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Name car',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a new car when already exists one with the same license_plate', async () => {
    let error = false;
    await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      description: 'Description',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Name car',
    });

    try {
      await createCarUseCase.execute({
        brand: 'Brand',
        category_id: 'category',
        daily_rate: 100,
        description: 'Description',
        fine_amount: 60,
        license_plate: 'ABC-1234',
        name: 'Name car',
      });
    } catch (err) {
      error = true;
    }

    expect(error).toBeTruthy();
  });

  it('Should create a car with available = true', async () => {
    const car: Car = await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      description: 'Description',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Name car',
    });

    expect(car.available).toBeTruthy();
  });
});
