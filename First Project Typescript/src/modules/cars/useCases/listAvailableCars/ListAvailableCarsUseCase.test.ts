import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: '314e7874-cd96-4583-93c1-b468addb35d9',
      daily_rate: 60,
      description: 'Description',
      fine_amount: 100,
      license_plate: '123-ABCDE',
      name: 'fiat toro',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car_brand_test',
      category_id: '314e7874-cd96-4583-93c1-b468addb35d9',
      daily_rate: 60,
      description: 'Description',
      fine_amount: 100,
      license_plate: '123-ABCDE',
      name: 'fiat toro',
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: car.brand });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car_brand_test',
      category_id: '314e7874-cd96-4583-93c1-b468addb35d9',
      daily_rate: 60,
      description: 'Description',
      fine_amount: 100,
      license_plate: '123-ABCDE',
      name: 'fiat toro',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: car.name });

    expect(cars).toEqual([car]);
  });
  it('Should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car_brand_test',
      category_id: '314e7874-cd96-4583-93c1-b468addb35d9',
      daily_rate: 60,
      description: 'Description',
      fine_amount: 100,
      license_plate: '123-ABCDE',
      name: 'fiat toro',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars).toEqual([car]);
  });
});
