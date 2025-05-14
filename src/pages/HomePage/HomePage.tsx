import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { HeroCard, Pagination } from '../../components';

import { useHeroes } from '../../store';

import { Hero } from '../../types';

export const HomePage = () => {
  const superHeroesArray = useHeroes(state => state.heroesArray);
  const [paginatedArray, setPaginatedArray] = useState<Hero[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get('page') ? +searchParams.get('page')! : 1;

  useEffect(() => {
    const lastElement = currentPage * 5;
    const firstElement = lastElement - 5;

    const newPaginatedArray = superHeroesArray.slice(firstElement, lastElement);

    setPaginatedArray(newPaginatedArray);
  }, [currentPage, superHeroesArray]);

  return (
    <section className="bg-white p-7">
      <h1>Home page...</h1>

      <section className="grid grid-cols-5">
        {paginatedArray.map(hero => (
          <HeroCard hero={hero} />
        ))}
      </section>

      <Pagination
        handleSearchParams={setSearchParams}
        currentPage={currentPage}
        arrayLength={superHeroesArray.length}
      />
    </section>
  );
};
