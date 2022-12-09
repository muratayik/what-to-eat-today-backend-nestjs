import { NotFoundException } from '@nestjs/common';

export const remapMealDetailResponse = (rawMealDetailResponse: any) => {
  const { meals } = rawMealDetailResponse;

  if (!meals?.length) {
    throw new NotFoundException('Meal not found');
  }

  const [mealToRemap, ...rest] = meals;

  const {
    idMeal,
    strMeal,
    strCategory,
    strInstructions,
    strMealThumb,
    strYoutube,
    strSource,
  } = mealToRemap;

  const ingredients = _generateIngredientList(mealToRemap);
  const instructionList = _convertInstructionStringToList(strInstructions);

  return {
    id: idMeal,
    name: strMeal,
    categoryName: strCategory,
    imageUrl: strMealThumb,
    youtubeUrl: strYoutube,
    sourceUrl: strSource,
    ingredients,
    instructions: instructionList,
  };
};

const _generateIngredientList = (mealToRemap: any): string[] => {
  const ingredients = [];
  for (let index = 1; index < 21; index++) {
    if (
      mealToRemap[`strIngredient${index}`].trim() ||
      mealToRemap[`strMeasure${index}`].trim()
    ) {
      const newCombinedIngredient = `${mealToRemap[`strMeasure${index}`]} ${
        mealToRemap[`strIngredient${index}`]
      }`.trim();
      ingredients.push(newCombinedIngredient);
    }
  }

  return ingredients;
};

const _convertInstructionStringToList = (instructionString: string): string[] =>
  instructionString.split(`\r\n`).filter((i) => !!i && i.length > 2);
