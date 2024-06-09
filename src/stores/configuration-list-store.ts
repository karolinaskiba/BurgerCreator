import { defineStore } from 'pinia';
import { IngredientModel } from '../models/Ingredient.model';

export const useConfigurationListStore = defineStore({
  id: 'configurationList',

  state: () => ({
    list: [] as IngredientModel[],
  }),

  getters: {
    allElements(): IngredientModel[] {
      return this.list;
    },
  },

  actions: {
    addElement(item: IngredientModel) {
      this.list.push(item);
    },
    removeElement(item: IngredientModel) {
      const index = this.list.findIndex(
        (ingredient) => ingredient.name === item.name
      );
      if (index !== -1) {
        this.list.splice(index, 1);
      }
    },

    setElements(elements: IngredientModel[]) {
      this.list = elements;
    },
  },
});

export type FavouriteListStore = ReturnType<typeof useConfigurationListStore>;
