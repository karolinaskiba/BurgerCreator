import { IngredientModel } from 'src/models/Ingredient.model';
import ValidationModel from 'src/models/Validation.model';
import { useValidationStore } from 'src/stores/validation-configuration-store';

const validationObjStore = useValidationStore();

export function checkValidationWhenAdded(
  ingredientName: string,
  configuration: IngredientModel[]
): ValidationModel {
  const arrLength = configuration.length;

  if (configuration[0]?.name === 'top-bun') {
    return {
      state: 'success',
      message: 'burger ready',
      valid: false,
    };
  }

  validationObjStore.clearValidationObj();

  if (arrLength === 0 && ingredientName === 'bottom-bun') {
    return {
      state: 'pending',
      message: 'ok',
      valid: true,
    };
  }
  if (arrLength === 0 && ingredientName !== 'bottom-bun') {
    return {
      state: 'failed',
      message: 'incorrect-first-element',
      valid: false,
    };
  }

  if (arrLength > 0 && ingredientName === 'bottom-bun') {
    return {
      state: 'failed',
      message: 'bad ingredient',
      valid: false,
    };
  }
  if (arrLength > 0 && ingredientName === 'top-bun') {
    return {
      state: 'success',
      message: 'burger ready',
      valid: true,
    };
  }
  if (arrLength > 1 && arrLength < 8) {
    return {
      state: 'pending',
      message: 'ok',
      valid: true,
    };
  }
  if (arrLength === 8 && ingredientName !== 'bottom-bun') {
    return {
      state: 'failed',
      message: 'last item must be top bun',
      valid: false,
    };
  }

  return {
    state: 'pending',
    message: 'ok',
    valid: true,
  };
}

export function checkValidationWhenRemove(
  ingredientName: string,
  configuration: IngredientModel[]
): ValidationModel {
  validationObjStore.clearValidationObj();

  const arrLength = configuration.length;

  if (arrLength > 1 && ingredientName === 'bottom-bun') {
    return {
      state: 'failed',
      message: 'You cannot remove',
      valid: false,
    };
  }
  if (
    arrLength > 1 &&
    !configuration.some((ing: IngredientModel) => ing.name === ingredientName)
  ) {
    return {
      state: 'failed',
      message: 'element not exist',
      valid: false,
    };
  }
  return {
    state: 'pending',
    message: 'ok',
    valid: true,
  };
}
