import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useHeroes } from '../../store';

import { Hero } from '../../types';

export const HeroDetailsPage = () => {
  const [hero, setHero] = useState<Hero | null>(null);
  const superHeroesArray = useHeroes(state => state.heroesArray);
  const superHeroId = useParams().superHeroId || '';

  useEffect(() => {
    const foundedHero = superHeroesArray.find(
      hero => hero.id.toLowerCase() === superHeroId.toLowerCase()
    );

    if (foundedHero) {
      setHero(foundedHero);
    }
  }, [superHeroId, superHeroesArray]);

  return (
    <>
      {hero ? (
        <article className="p-5 bg-[rgb(0_0_0_/_30%)] flex justify-center items-center gap-10 rounded-3xl">
          <section>
            <img
              className="h-[400px] w-[400px] aspect-auto"
              src={hero.images[0]}
              alt={`${hero.nickname}-image`}
            />
          </section>

          <section>
            <section>
              <h2>Nickname: {hero.nickname}</h2>
              <h3>Phrase: {hero.catch_phrase}</h3>
            </section>

            <section>
              <p>
                Ordinary name: <span>{hero.real_name}</span>
              </p>

              <div>
                <p>Description:</p>
                <p>{hero.origin_description}</p>
              </div>

              <div>
                <p>Superpowers:</p>
                <p>{hero.superpowers}</p>
              </div>
            </section>
          </section>
        </article>
      ) : (
        <article>No hero found!</article>
      )}
    </>
  );
};
