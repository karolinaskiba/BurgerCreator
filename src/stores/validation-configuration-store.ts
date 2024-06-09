import { defineStore } from 'pinia';
import validationModel from 'src/models/Validation.model';

export const useValidationStore = defineStore({
  id: 'validationStore',

  state: () => ({
    validationObj: {} as validationModel,
  }),

  getters: {
    getValidationObj(): validationModel {
      console.log('get', this.validationObj);
      return this.validationObj;
    },
  },

  actions: {
    setValidationObj(element: validationModel) {
      this.validationObj = { ...element };
      console.log('set', this.validationObj);
    },
    clearValidationObj(): void {
      this.validationObj = {
        state: '',
        message: '',
        valid: false,
      };
    },
  },
});

export type FavouriteListStore = ReturnType<typeof useValidationStore>;
