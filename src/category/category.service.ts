import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { remapCategoryResponse, remapMealListResponse } from './category.utils';

@Injectable()
export class CategoryService {
  constructor(private httpService: HttpService) {}

  // Since categorylist is static, we can keep it in memory until server restarts
  categoryList = [];

  // Since meals of a category is static, we can keep it in memory until server restarts
  mealOfCategory = {};

  async getAllCategories(): Promise<any> {
    if (this.categoryList?.length) {
      return this.categoryList;
    }

    const categoryResponse = await firstValueFrom(
      this.httpService
        .get('https://www.themealdb.com/api/json/v1/1/categories.php')
        .pipe(map((response) => response.data)),
    );

    const remappedCategoryResponse = remapCategoryResponse(categoryResponse);

    remappedCategoryResponse.forEach((category) => {
      this.categoryList.push(category);
    });

    return this.categoryList;
  }

  async getMealsOfCategory(categoryName: string): Promise<any> {
    if (this.mealOfCategory[categoryName]) {
      return this.mealOfCategory[categoryName];
    }

    const mealOfCategoryResponse = await firstValueFrom(
      this.httpService
        .get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
        )
        .pipe(map((response) => response.data)),
    );
    const remappedMealList = remapMealListResponse(mealOfCategoryResponse);
    this.mealOfCategory[categoryName] = remappedMealList;

    return this.mealOfCategory[categoryName];
  }
}
