import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { MealController } from '../meal.controller';
import { MealService } from '../meal.service';

describe('MealController', () => {
  let mealController: MealController;
  let mealService: MealService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [MealController],
      providers: [MealService],
    }).compile();

    mealService = moduleRef.get<MealService>(MealService);
    mealController = moduleRef.get<MealController>(MealController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getMealDetails()', async () => {
    const mealDetail = {
      id: '52772',
      name: 'Teriyaki Chicken Casserole',
      categoryName: 'Chicken',
      imageUrl:
        'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=4aZr5hZXP_s',
      sourceUrl: null,
      ingredients: [
        '3/4 cup soy sauce',
        '1/2 cup water',
        '1/4 cup brown sugar',
        '1/2 teaspoon ground ginger',
        '1/2 teaspoon minced garlic',
        '4 Tablespoons cornstarch',
        '2 chicken breasts',
        '1 (12 oz.) stir-fry vegetables',
        '3 cups brown rice',
      ],
      instructions: [
        'Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.',
        'Combine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling.',
        'Meanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat.',
        'Place the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks.',
        '*Meanwhile, steam or cook the vegetables according to package directions.',
        'Add the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!',
      ],
    };

    jest
      .spyOn(mealService, 'getMealDetails')
      .mockImplementation(async () => mealDetail);

    expect(await mealController.getMealDetails('52772')).toEqual(mealDetail);
  });
});
