import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to create a category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category Description Test',
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a category when category name already exists', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category Description Test',
    };
    let errorTest = false;

    try {
      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    } catch (error) {
      if (error.message) {
        errorTest = true;
      }
    }

    expect(errorTest).toBe(true);
  });
});
