import { NotFoundException } from '@nestjs/common';

export const remapCategoryResponse = (rawCategoryListResponse: any) => {
  const { categories } = rawCategoryListResponse;
  return categories.map((category) => {
    const {
      idCategory,
      strCategory,
      strCategoryThumb,
      strCategoryDescription,
    } = category;

    return {
      id: idCategory,
      name: strCategory,
      imageUrl: strCategoryThumb,
      description: strCategoryDescription,
    };
  });
};

export const remapMealListResponse = (rawMealListResponse: any) => {
  const { meals } = rawMealListResponse;

  if (!meals?.length) {
    throw new NotFoundException('Category not found');
  }

  return meals.map((meal) => {
    const { strMeal, strMealThumb, idMeal } = meal;

    return {
      id: idMeal,
      name: strMeal,
      imageUrl: strMealThumb,
    };
  });
};
