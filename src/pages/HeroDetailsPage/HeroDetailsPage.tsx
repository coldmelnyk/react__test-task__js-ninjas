import { useEffect, useState } from 'react';
import { Hero } from '../../types';
import { useParams } from 'react-router';
import { useHeroes } from '../../store';

export const HeroDetailsPage = () => {
  const [hero, setHero] = useState<Hero | null>(null);
  const superHeroesArray = useHeroes(state => state.heroesArray);

  const superHeroNickname = useParams().superHeroNickname || '';

  console.log(superHeroNickname);

  useEffect(() => {
    const foundedHero = superHeroesArray.find(
      hero => hero.nickname.toLowerCase() === superHeroNickname.toLowerCase()
    );

    if (foundedHero) {
      setHero(foundedHero);
    }
  }, [superHeroNickname, superHeroesArray]);

  return (
    <>
      {hero ? (
        <article className="p-5 bg-slate-400 flex justify-center items-center">
          <section>
            <img src={hero.images[0]} alt={`${hero.nickname}-image`} />
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
        <div>No hero found!</div>
      )}
    </>
  );
};
