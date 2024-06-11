// utils/getValidationMessageLabel.ts
import { ValidationMessageEnum } from 'src/enums/ValidationMessag.enum';

export function getValidationMessageLabel(
  message: ValidationMessageEnum
): string {
  switch (message) {
    case ValidationMessageEnum.BURGER_READY_TO_SAVE:
      return 'Burger ready to save';
    case ValidationMessageEnum.BAD_INGREDIENT:
      return 'Bad ingredient';
    case ValidationMessageEnum.OK:
      return 'OK';
    case ValidationMessageEnum.INCORRECT_FIRST_ELEMENT:
      return 'Incorrect first element';
    case ValidationMessageEnum.LAST_ITEM_MUST_BE_TOP_BUN:
      return 'Last item must be top bun';
    case ValidationMessageEnum.YOU_CANNOT_REMOVE:
      return 'You cannot remove';
    case ValidationMessageEnum.ELEMENT_NOT_EXIST:
      return 'Element not exist';
    case ValidationMessageEnum.YOU_CAN_NOT_ADD_MORE_TOP_BUN:
      return 'You cannot add more top buns';
    case ValidationMessageEnum.YOU_CAN_NOT_ADD_MORE_INGREDIENTS:
      return 'You cannot add more ingredients';
    case ValidationMessageEnum.YOUR_BURGER_IS_EMPTY:
      return 'Your burger is empty';
    case ValidationMessageEnum.YOU_CAN_NOT_REMOVE_FROM_INSIDE:
      return 'You cannot remove something from inside';
    default:
      return 'Unknown error';
  }
}
