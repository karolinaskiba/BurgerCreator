// utils/ingredientUtils.ts
import { IngredientNameEnum } from '../enums/IngredientName.enum';

export function getImageUrlByIngredientName(
  name: IngredientNameEnum
): string | null {
  switch (name) {
    case IngredientNameEnum.BOTTOM_BUN:
      return '/images/bottom-bun.png';
    case IngredientNameEnum.TOP_BUN:
      return '/images/top-bun.png';
    case IngredientNameEnum.TOMATO:
      return '/images/tomato.png';
    case IngredientNameEnum.MEAT:
      return '/images/ingredient-burger.png';
    case IngredientNameEnum.FISH:
      return '/images/ingredient-fish.png';
    case IngredientNameEnum.LETTUCE:
      return '/images/lettuce.png';
    case IngredientNameEnum.CHEESE:
      return '/images/ingredient-cheese.png';
    default:
      return null;
  }
}
