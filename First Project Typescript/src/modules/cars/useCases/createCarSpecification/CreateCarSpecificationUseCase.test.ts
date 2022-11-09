import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
    );
  });

  it("shouldn't be able to add a new specifiation to the car that doesn't exists", async () => {
    let error = false;

    const car_id = '1234';
    const specifications_id = ['54321'];

    try {
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    } catch (err) {
      error = true;
    }

    expect(error).toBe(true);
  });

  it('should be able to add a new specifiation to the car', async () => {
    const car_id = '1234';
    const specifications_id = ['54321'];

    const car = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: '123457',
      daily_rate: 60,
      description: 'Description',
      fine_amount: 100,
      license_plate: 'ABC-1234',
      name: 'Audi A1',
    });

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });
});
