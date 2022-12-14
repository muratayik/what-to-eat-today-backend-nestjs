import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CategoryController],
      providers: [CategoryService],
    }).compile();

    categoryService = moduleRef.get<CategoryService>(CategoryService);
    categoryController = moduleRef.get<CategoryController>(CategoryController);
  });

  const categoryList = [
    {
      id: '1',
      name: 'Beef',
      imageUrl: 'https://www.themealdb.com/images/category/beef.png',
      description:
        'Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]',
    },
    {
      id: '2',
      name: 'Chicken',
      imageUrl: 'https://www.themealdb.com/images/category/chicken.png',
      description:
        'Chicken is a type of domesticated fowl, a subspecies of the red junglefowl. It is one of the most common and widespread domestic animals, with a total population of more than 19 billion as of 2011.[1] Humans commonly keep chickens as a source of food (consuming both their meat and eggs) and, more rarely, as pets.',
    },
  ];

  const mealsOfBeefCategory = [
    {
      id: '52874',
      name: 'Beef and Mustard Pie',
      imageUrl:
        'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
    },
    {
      id: '52878',
      name: 'Beef and Oyster pie',
      imageUrl:
        'https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg',
    },
    {
      id: '52997',
      name: 'Beef Banh Mi Bowls with Sriracha Mayo, Carrot & Pickled Cucumber',
      imageUrl:
        'https://www.themealdb.com/images/media/meals/z0ageb1583189517.jpg',
    },
    {
      id: '52904',
      name: 'Beef Bourguignon',
      imageUrl:
        'https://www.themealdb.com/images/media/meals/vtqxtu1511784197.jpg',
    },
  ];

  it('getAllCategories()', async () => {
    jest
      .spyOn(categoryService, 'getAllCategories')
      .mockImplementation(async () => categoryList);

    expect(await categoryController.getAllCategories()).toEqual(categoryList);
  });

  it('getMealsOfCategory()', async () => {
    jest
      .spyOn(categoryService, 'getMealsOfCategory')
      .mockImplementation(async () => mealsOfBeefCategory);

    expect(await categoryController.getMealsOfCategory('Beef')).toEqual(
      mealsOfBeefCategory,
    );
  });
});
