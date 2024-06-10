import { defineStore } from 'pinia';
import { IngredientModel } from '../models/Ingredient.model';

export const useBurgerIngredienstListStore = defineStore({
  id: 'burgerIngredienstLis',

  state: () => ({
    list: [
      {
        name: 'bottom-bun',
        imageUrl: '../../src/assets/images/bottom-bun.png',
      },
      { name: 'top-bun', imageUrl: '../../src/assets/images/top-bun.png' },
      { name: 'tomato', imageUrl: '../../src/assets/images/tomato.png' },

      {
        name: 'meat',
        imageUrl: '../../src/assets/images/ingredient-burger.png',
      },
      {
        name: 'fish',
        imageUrl: '../../src/assets/images/ingredient-fish.png',
      },
      { name: 'lettuce', imageUrl: '../../src/assets/images/lettuce.png' },
      {
        name: 'cheese',
        imageUrl: '../../src/assets/images/ingredient-cheese.png',
      },
    ] as IngredientModel[],
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
    resetStore() {
      this.list = [];
    },
  },
});

export type FavouriteListStore = ReturnType<
  typeof useBurgerIngredienstListStore
>;
