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
    <section className="bg-[rgb(0_0_0_/_30%)] p-7 flex flex-col gap-7 rounded-3xl text-white">
      <h1 className="font-bold text-3xl">Home page</h1>

      <section className="grid grid-cols-5 gap-3">
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
