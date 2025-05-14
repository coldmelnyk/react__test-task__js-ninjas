import { create } from 'zustand';
// import { str5_36 } from 'hyperdyperid/lib/str5_36';

import { Store, Hero } from '../types';

const dummyId1 = 'psadfadgasfa';
const dummyId2 = 'pftvaag';
const dummyId3 = 'pftvasfaaaaasf';
const dummyId4 = 'pfaas';
const dummyId5 = 'pftvasgdaasdgaaasg';
const dummyId6 = 'pftvaasaaaa';
const dummyId7 = 'pftvaaaaaasgdgasggsd';
const dummyId8 = 'pftvaaaaaaaagdsgddddsdgsdgsdgsdg';
const dummyId9 = 'pftvaaaaaaasdasfasf';
const dummyId10 = 'sdg';
const dummyId11 = 'pftvaaaaaaaaaaa';

const initialHeroes: Hero[] = [
  {
    id: dummyId1,
    nickname: 'Spiddy',
    real_name: 'Real name of Test Hero',
    origin_description: 'Made to see how will it looks',
    superpowers: 'To die',
    catch_phrase: 'Hello motherfucker',
    images: [
      'https://cdn.pixabay.com/photo/2023/02/24/07/40/spiderman-7810368_960_720.png'
    ]
  },
  {
    id: dummyId2,
    nickname: 'Spiddy',
    real_name: 'Real name of Test Hero',
    origin_description: 'Made to see how will it looks',
    superpowers: 'To die',
    catch_phrase: 'Hello motherfucker',
    images: [
      'https://cdn.pixabay.com/photo/2023/02/24/07/40/spiderman-7810368_960_720.png'
    ]
  },
  {
    id: dummyId3,
    nickname: 'Spiddy',
    real_name: 'Real name of Test Hero',
    origin_description: 'Made to see how will it looks',
    superpowers: 'To die',
    catch_phrase: 'Hello motherfucker',
    images: [
      'https://cdn.pixabay.com/photo/2023/02/24/07/40/spiderman-7810368_960_720.png'
    ]
  },
  {
    id: dummyId4,
    nickname: 'Spiddy',
    real_name: 'Real name of Test Hero',
    origin_description: 'Made to see how will it looks',
    superpowers: 'To die',
    catch_phrase: 'Hello motherfucker',
    images: [
      'https://cdn.pixabay.com/photo/2023/02/24/07/40/spiderman-7810368_960_720.png'
    ]
  },
  {
    id: dummyId5,
    nickname: 'Spiddy',
    real_name: 'Real name of Test Hero',
    origin_description: 'Made to see how will it looks',
    superpowers: 'To die',
    catch_phrase: 'Hello motherfucker',
    images: [
      'https://cdn.pixabay.com/photo/2023/02/24/07/40/spiderman-7810368_960_720.png'
    ]
  },
  {
    id: dummyId6,
    nickname: 'Spiddy',
    real_name: 'Real name of Test Hero',
    origin_description: 'Made to see how will it looks',
    superpowers: 'To die',
    catch_phrase: 'Hello motherfucker',
    images: [
      'https://cdn.pixabay.com/photo/2023/02/24/07/40/spiderman-7810368_960_720.png'
    ]
  },
  {
    id: dummyId7,
    nickname: 'Spiddy',
    real_name: 'Real name of Test Hero',
    origin_description: 'Made to see how will it looks',
    superpowers: 'To die',
    catch_phrase: 'Hello motherfucker',
    images: [
      'https://cdn.pixabay.com/photo/2023/02/24/07/40/spiderman-7810368_960_720.png'
    ]
  },
  {
    id: dummyId8,
    nickname: 'Spiddy',
    real_name: 'Real name of Test Hero',
    origin_description: 'Made to see how will it looks',
    superpowers: 'To die',
    catch_phrase: 'Hello motherfucker',
    images: [
      'https://cdn.pixabay.com/photo/2023/02/24/07/40/spiderman-7810368_960_720.png'
    ]
  },
  {
    id: dummyId9,
    nickname: 'Spiddy',
    real_name: 'Real name of Test Hero',
    origin_description: 'Made to see how will it looks',
    superpowers: 'To die',
    catch_phrase: 'Hello motherfucker',
    images: [
      'https://cdn.pixabay.com/photo/2023/02/24/07/40/spiderman-7810368_960_720.png'
    ]
  },
  {
    id: dummyId10,
    nickname: 'Spiddy',
    real_name: 'Real name of Test Hero',
    origin_description: 'Made to see how will it looks',
    superpowers: 'To die',
    catch_phrase: 'Hello motherfucker',
    images: [
      'https://cdn.pixabay.com/photo/2023/02/24/07/40/spiderman-7810368_960_720.png'
    ]
  },
  {
    id: dummyId11,
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
