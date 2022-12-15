import { HttpService } from '@nestjs/axios';
import { MealService } from '../meal.service';
import { of } from 'rxjs';

describe('MealService', () => {
  let mealService: MealService;
  let httpService: HttpService;

  beforeEach(() => {
    httpService = new HttpService();
    mealService = new MealService(httpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getMealDetails()', () => {
    const axiosResponseForMealDetail = {
      meals: [
        {
          idMeal: '52772',
          strMeal: 'Teriyaki Chicken Casserole',
          strDrinkAlternate: null,
          strCategory: 'Chicken',
          strArea: 'Japanese',
          strInstructions:
            'Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.\r\nCombine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling.\r\nMeanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat.\r\nPlace the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks.\r\n*Meanwhile, steam or cook the vegetables according to package directions.\r\nAdd the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
          strTags: 'Meat,Casserole',
          strYoutube: 'https://www.youtube.com/watch?v=4aZr5hZXP_s',
          strIngredient1: 'soy sauce',
          strIngredient2: 'water',
          strIngredient3: 'brown sugar',
          strIngredient4: 'ground ginger',
          strIngredient5: 'minced garlic',
          strIngredient6: 'cornstarch',
          strIngredient7: 'chicken breasts',
          strIngredient8: 'stir-fry vegetables',
          strIngredient9: 'brown rice',
          strIngredient10: '',
          strIngredient11: '',
          strIngredient12: '',
          strIngredient13: '',
          strIngredient14: '',
          strIngredient15: '',
          strIngredient16: null,
          strIngredient17: null,
          strIngredient18: null,
          strIngredient19: null,
          strIngredient20: null,
          strMeasure1: '3/4 cup',
          strMeasure2: '1/2 cup',
          strMeasure3: '1/4 cup',
          strMeasure4: '1/2 teaspoon',
          strMeasure5: '1/2 teaspoon',
          strMeasure6: '4 Tablespoons',
          strMeasure7: '2',
          strMeasure8: '1 (12 oz.)',
          strMeasure9: '3 cups',
          strMeasure10: '',
          strMeasure11: '',
          strMeasure12: '',
          strMeasure13: '',
          strMeasure14: '',
          strMeasure15: '',
          strMeasure16: null,
          strMeasure17: null,
          strMeasure18: null,
          strMeasure19: null,
          strMeasure20: null,
          strSource: null,
          strImageSource: null,
          strCreativeCommonsConfirmed: null,
          dateModified: null,
        },
      ],
    };

    const expectedResponseForGetMealDetail = {
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

    const response = {
      data: axiosResponseForMealDetail,
      headers: {},
      config: {},
      status: 200,
      statusText: '',
    };

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

    mealService.getMealDetails('52874').then((res) => {
      expect(res).toEqual(expectedResponseForGetMealDetail);
    });
  });
});
