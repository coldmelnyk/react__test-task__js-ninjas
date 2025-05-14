import { Hero } from './Hero';

export interface Store {
  heroesArray: Hero[];
  setHeroesArray: (array: Hero[]) => void;
  addNewHero: (newHero: Hero) => void;
  deleteHero: (heroForDeleting: Hero) => void;
  updateHero: (updatedHeroInfo: Hero) => void;
}
