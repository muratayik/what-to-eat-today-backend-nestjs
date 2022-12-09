import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { remapMealDetailResponse } from './meal.utils';

@Injectable()
export class MealService {
  constructor(private httpService: HttpService) {}

  // Since meals of a category is static, we can keep it in memory until server restarts
  mealDetails = {};

  async getMealDetails(mealId: string): Promise<any> {
    if (this.mealDetails[mealId]) {
      return this.mealDetails[mealId];
    }

    const mealOfCategoryResponse = await firstValueFrom(
      this.httpService
        .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .pipe(map((response) => response.data)),
    );

    const remappedMealDetail = remapMealDetailResponse(mealOfCategoryResponse);
    this.mealDetails[mealId] = remappedMealDetail;

    return this.mealDetails[mealId];
  }
}
