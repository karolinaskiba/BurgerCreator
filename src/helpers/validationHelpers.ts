// import { IngredientModel } from 'src/models/Ingredient.model';
// import { ValidationModel } from 'src/models/Validation.model';

// export function checkValidationWhenAdded(
//   ingredientName: string,
//   configuration: IngredientModel[]
// ): ValidationModel {
//   const arrLength = configuration.length;

//   if (configuration[0]?.name === 'top-bun') {
//     if (ingredientName === 'top-bun') {
//       return {
//         state: 'ready to save',
//         message: 'burger ready to save',
//         proceed: false,
//       };
//     } else {
//       return {
//         state: 'failed',
//         message: 'bad ingredient',
//         proceed: false,
//       };
//     }
//   }

//   // if (configuration[0]?.name === 'top-bun' && ingredientName === 'top-bun') {
//   //   return {
//   //     state: 'ready to save',
//   //     message: '',
//   //     proceed: false,
//   //   };
//   // }

//   // if (configuration[0]?.name === 'top-bun') {
//   //   return {
//   //     state: 'ready to save',
//   //     message: '',
//   //     proceed: false,
//   //   };
//   // }

//   if (arrLength === 0 && ingredientName === 'bottom-bun') {
//     return {
//       state: 'pending',
//       message: 'ok',
//       proceed: true,
//     };
//   }
//   if (arrLength === 0 && ingredientName !== 'bottom-bun') {
//     return {
//       state: 'failed',
//       message: 'incorrect-first-element',
//       proceed: false,
//     };
//   }

//   if (arrLength > 0 && ingredientName === 'bottom-bun') {
//     return {
//       state: 'failed',
//       message: 'bad ingredient',
//       proceed: false,
//     };
//   }
//   if (arrLength > 0 && ingredientName === 'top-bun') {
//     return {
//       state: 'ready to save',
//       message: 'burger ready to save',
//       proceed: true,
//     };
//   }
//   if (arrLength > 1 && arrLength < 8) {
//     return {
//       state: 'pending',
//       message: 'ok',
//       proceed: true,
//     };
//   }
//   if (arrLength === 8 && ingredientName !== 'bottom-bun') {
//     return {
//       state: 'failed',
//       message: 'last item must be top bun',
//       proceed: false,
//     };
//   }

//   return {
//     state: 'pending',
//     message: 'ok',
//     proceed: true,
//   };
// }

// export function checkValidationWhenRemove(
//   ingredientName: string,
//   configuration: IngredientModel[]
// ): ValidationModel {
//   const arrLength = configuration.length;

//   if (configuration[0]?.name === 'top-bun') {
//     if (ingredientName === 'top-bun') {
//       return {
//         state: 'pending',
//         message: 'ok',
//         proceed: true,
//       };
//     } else {
//       return {
//         state: 'ready to save',
//         message: '',
//         proceed: false,
//       };
//     }
//   }

//   // if (configuration[0]?.name === 'top-bun' && ingredientName !== 'top-bun') {
//   //   return {
//   //     state: 'ready to save',
//   //     message: '',
//   //     proceed: false,
//   //   };
//   // }

//   if (arrLength > 1 && ingredientName === 'bottom-bun') {
//     return {
//       state: 'failed',
//       message: 'You cannot remove',
//       proceed: false,
//     };
//   }
//   if (
//     arrLength > 1 &&
//     !configuration.some((ing: IngredientModel) => ing.name === ingredientName)
//   ) {
//     return {
//       state: 'failed',
//       message: 'element not exist',
//       proceed: false,
//     };
//   }
//   return {
//     state: 'pending',
//     message: 'ok',
//     proceed: true,
//   };
// }

import { IngredientModel } from 'src/models/Ingredient.model';
import { ValidationModel } from 'src/models/Validation.model';

export function checkValidationWhenAdded(
  ingredientName: string,
  configuration: IngredientModel[]
): ValidationModel {
  const arrLength = configuration.length;

  if (configuration[0]?.name === 'top-bun') {
    if (ingredientName == 'bottom-bun') {
      return {
        state: 'ready to save',
        message: 'you can not add more top bun',
        proceed: false,
      };
    } else {
      return {
        state: 'ready to save',
        message: 'you can not add more ingredients',
        proceed: false,
      };
    }
  }

  if (arrLength === 0 && ingredientName === 'bottom-bun') {
    return {
      state: 'pending',
      message: 'ok',
      proceed: true,
    };
  }
  if (arrLength === 0 && ingredientName !== 'bottom-bun') {
    return {
      state: 'failed',
      message: 'incorrect-first-element',
      proceed: false,
    };
  }

  if (arrLength > 0 && ingredientName === 'bottom-bun') {
    return {
      state: 'failed',
      message: 'bad ingredient',
      proceed: false,
    };
  }
  if (arrLength > 0 && ingredientName === 'top-bun') {
    return {
      state: 'ready to save',
      message: 'burger ready to save',
      proceed: true,
    };
  }
  if (arrLength > 1 && arrLength < 8) {
    return {
      state: 'pending',
      message: 'ok',
      proceed: true,
    };
  }
  if (arrLength === 8 && ingredientName !== 'top-bun') {
    return {
      state: 'failed',
      message: 'last item must be top bun',
      proceed: false,
    };
  }

  return {
    state: 'pending',
    message: 'ok',
    proceed: true,
  };
}

export function checkValidationWhenRemove(
  ingredientName: string,
  configuration: IngredientModel[]
): ValidationModel {
  const arrLength = configuration.length;

  if (configuration[0]?.name === 'top-bun') {
    if (ingredientName === 'top-bun') {
      return {
        state: 'pending',
        message: 'ok',
        proceed: true,
      };
    } else {
      return {
        state: 'ready to save',
        message: 'you can not remove something from inside',
        proceed: false,
      };
    }
  }

  if (arrLength > 1 && ingredientName === 'bottom-bun') {
    return {
      state: 'failed',
      message: 'You cannot remove',
      proceed: false,
    };
  }
  if (arrLength == 0) {
    return {
      state: 'failed',
      message: 'your burger is empty',
      proceed: false,
    };
  }

  if (
    arrLength > 1 &&
    !configuration.some((ing: IngredientModel) => ing.name === ingredientName)
  ) {
    return {
      state: 'failed',
      message: 'element not exist',
      proceed: false,
    };
  }
  return {
    state: 'pending',
    message: 'ok',
    proceed: true,
  };
}
