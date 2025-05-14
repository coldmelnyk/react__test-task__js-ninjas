import { create } from 'zustand';

import { Store, Hero } from '../types';

const initialHeroes: Hero[] = [
  {
    nickname: 'Spiddy',
    real_name: 'Real name of Test Hero',
    origin_description: 'Made to see how will it looks',
    superpowers: 'To die',
    catch_phrase: 'Hello motherfucker',
    images: [
      'https://cdn.pixabay.com/photo/2023/02/24/07/40/spiderman-7810368_960_720.png'
    ]
  }
];

export const useHeroes = create<Store>(set => ({
  heroesArray: initialHeroes,
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
    })
}));
