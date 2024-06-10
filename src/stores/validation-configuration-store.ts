import { defineStore } from 'pinia';
import ValidationModel from 'src/models/Validation.model';

export const useValidationStore = defineStore({
  id: 'validationStore',

  state: () => ({
    validationObj: {
      state: '',
      message: '',
      valid: false,
    } as ValidationModel,
  }),

  getters: {
    getValidationObj(): ValidationModel {
      console.log('get', this.validationObj);

      return this.validationObj;
    },
  },

  actions: {
    setValidationObj(element: ValidationModel) {
      this.validationObj = { ...element };
      console.log('set', this.validationObj);
    },

    clearValidationObj() {
      this.validationObj = {
        ...this.validationObj,
        state: '',
        message: '',
        valid: false,
      };
    },
  },
});

export type FavouriteListStore = ReturnType<typeof useValidationStore>;
