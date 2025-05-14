import { HeroCard } from '../../components';

import { useHeroes } from '../../store';

export const HomePage = () => {
  const superHeroesArray = useHeroes(state => state.heroesArray);

  return (
    <section className="bg-white p-7">
      <h1>Home page...</h1>

      <section>
        {superHeroesArray.map(hero => (
          <HeroCard hero={hero} />
        ))}
      </section>
    </section>
  );
};
