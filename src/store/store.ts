import { create } from 'zustand';

import { Store, Hero } from '../types';

export const useHeroes = create<Store>(set => ({
  heroesArray: [],
  setHeroesArray: (array: Hero[]) => set(() => ({ heroesArray: array })),
  addNewHero: (newHero: Hero) =>
    set(state => ({ heroesArray: [...state.heroesArray, newHero] })),
  deleteHero: (heroForDeleting: Hero) =>
    set(state => {
      const newHeroesArray = state.heroesArray.filter(
        hero => heroForDeleting.nickname !== hero.nickname
      );

      return {
        heroesArray: newHeroesArray
      };
    }),
  updateHero: (updatedHeroInfo: Hero) =>
    set(state => {
      const newHeroesArray = state.heroesArray.map(hero => {
        if (hero.id === updatedHeroInfo.id) {
          return updatedHeroInfo;
        }

        return hero;
      });

      return {
        heroesArray: newHeroesArray
      };
    })
}));
