import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';

@Module({
  imports: [HttpModule],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}
