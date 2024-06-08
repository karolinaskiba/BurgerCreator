import { defineStore } from 'pinia';
import { CompleteBurgerModel } from '../models/CompleteBurger.model';

export const useFavouriteListStore = defineStore({
  id: 'favouriteList',

  state: () => ({
    list: [] as CompleteBurgerModel[],
  }),

  getters: {
    allElements(): CompleteBurgerModel[] {
      return this.list;
    },
  },

  actions: {
    addElement(item: CompleteBurgerModel) {
      this.list.push(item);
    },
    removeElement(item: CompleteBurgerModel) {
      const index = this.list.findIndex((burger) => burger.name === item.name);
      if (index !== -1) {
        this.list.splice(index, 1);
      }
    },

    setElements(elements: CompleteBurgerModel[]) {
      this.list = elements;
    },
  },
});

export type FavouriteListStore = ReturnType<typeof useFavouriteListStore>;
