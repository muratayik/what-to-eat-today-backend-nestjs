import { Controller, Get, Param } from '@nestjs/common';
import { MealService } from './meal.service';

@Controller('meal')
export class MealController {
  constructor(private mealService: MealService) {}

  @Get('/:mealId/details')
  getMealDetails(@Param('mealId') mealId: string) {
    return this.mealService.getMealDetails(mealId);
  }
}
