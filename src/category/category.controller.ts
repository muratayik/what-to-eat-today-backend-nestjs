import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get('/:categoryName/meals')
  getMealsOfCategory(@Param('categoryName') categoryName: string) {
    return this.categoryService.getMealsOfCategory(categoryName);
  }
}
