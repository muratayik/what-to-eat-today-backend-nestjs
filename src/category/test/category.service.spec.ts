import { HttpService } from '@nestjs/axios';
import { CategoryService } from '../category.service';
import { of } from 'rxjs';

describe('categoryService', () => {
  let categoryService: CategoryService;
  let httpService: HttpService;

  beforeEach(() => {
    httpService = new HttpService();
    categoryService = new CategoryService(httpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAllCategories()', async () => {
    const axiosResponseForCategoryList = {
      categories: [
        {
          idCategory: '1',
          strCategory: 'Beef',
          strCategoryThumb:
            'https://www.themealdb.com/images/category/beef.png',
          strCategoryDescription:
            'Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]',
        },
        {
          idCategory: '2',
          strCategory: 'Chicken',
          strCategoryThumb:
            'https://www.themealdb.com/images/category/chicken.png',
          strCategoryDescription:
            'Chicken is a type of domesticated fowl, a subspecies of the red junglefowl. It is one of the most common and widespread domestic animals, with a total population of more than 19 billion as of 2011.[1] Humans commonly keep chickens as a source of food (consuming both their meat and eggs) and, more rarely, as pets.',
        },
      ],
    };

    const expectedResponseForCategoryList = [
      {
        description:
          'Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]',
        id: '1',
        imageUrl: 'https://www.themealdb.com/images/category/beef.png',
        name: 'Beef',
      },
      {
        description:
          'Chicken is a type of domesticated fowl, a subspecies of the red junglefowl. It is one of the most common and widespread domestic animals, with a total population of more than 19 billion as of 2011.[1] Humans commonly keep chickens as a source of food (consuming both their meat and eggs) and, more rarely, as pets.',
        id: '2',
        imageUrl: 'https://www.themealdb.com/images/category/chicken.png',
        name: 'Chicken',
      },
    ];

    const response = {
      data: axiosResponseForCategoryList,
      headers: {},
      config: {},
      status: 200,
      statusText: '',
    };

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

    categoryService.getAllCategories().then((res) => {
      expect(res).toEqual(expectedResponseForCategoryList);
    });
  });

  it('getMealsOfCategory()', () => {
    const axiosResponseForMealsOfCategory = {
      meals: [
        {
          strMeal: 'Baked salmon with fennel & tomatoes',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/1548772327.jpg',
          idMeal: '52959',
        },
        {
          strMeal: 'Cajun spiced fish tacos',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg',
          idMeal: '52819',
        },
        {
          strMeal: 'Escovitch Fish',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/1520084413.jpg',
          idMeal: '52944',
        },
      ],
    };

    const expectedResponseForMealsOfCategory = [
      {
        id: '52959',
        imageUrl: 'https://www.themealdb.com/images/media/meals/1548772327.jpg',
        name: 'Baked salmon with fennel & tomatoes',
      },
      {
        id: '52819',
        imageUrl:
          'https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg',
        name: 'Cajun spiced fish tacos',
      },
      {
        id: '52944',
        imageUrl: 'https://www.themealdb.com/images/media/meals/1520084413.jpg',
        name: 'Escovitch Fish',
      },
    ];

    const response = {
      data: axiosResponseForMealsOfCategory,
      headers: {},
      config: {},
      status: 200,
      statusText: '',
    };

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

    categoryService.getMealsOfCategory('Seafood').then((res) => {
      expect(res).toEqual(expectedResponseForMealsOfCategory);
    });
  });
});
