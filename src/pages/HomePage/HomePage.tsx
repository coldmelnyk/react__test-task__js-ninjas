import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { HeroCard, Pagination } from '../../components';

import { useHeroes } from '../../store';

import { getSearchWith } from '../../utils';

import { Hero } from '../../types';

export const HomePage = () => {
  const superHeroesArray = useHeroes(state => state.heroesArray);
  const [paginatedArray, setPaginatedArray] = useState<Hero[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchBarValue, setSearchBarValue] = useState('');
  const navigate = useNavigate();

  const currentPage = searchParams.get('page') ? +searchParams.get('page')! : 1;
  const queryFindName = searchParams.get('query')
    ? searchParams.get('query')
    : '';

  useEffect(() => {
    const lastElement = currentPage * 5;
    const firstElement = lastElement - 5;

    const newPaginatedArray =
      searchBarValue !== ''
        ? filteredHeroesArray.slice(firstElement, lastElement)
        : superHeroesArray.slice(firstElement, lastElement);

    setPaginatedArray(newPaginatedArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchBarValue, superHeroesArray]);

  useEffect(() => {
    if (queryFindName) {
      setSearchBarValue(queryFindName);
    } else {
      setSearchParams(getSearchWith(searchParams, { query: null }));
      setSearchBarValue('');
    }
  }, [queryFindName, searchParams, setSearchParams]);

  const filteredHeroesArray = superHeroesArray.filter(hero =>
    hero.nickname.toLowerCase().includes(queryFindName!.toLowerCase())
  );

  return (
    <section className="bg-[rgb(0_0_0_/_30%)] p-7 flex flex-col gap-7 rounded-3xl text-white">
      <section className="flex justify-between items-center font-bold text-3xl">
        <h1 className="">Home page</h1>

        <input
          type="text"
          className="text-black rounded-lg px-3 py-1"
          value={searchBarValue}
          onChange={event => {
            setSearchParams(
              getSearchWith(searchParams, {
                query: event.target.value
              })
            );
          }}
        />

        <button
          type="button"
          onClick={() => {
            navigate('/add-hero');
          }}
          className="border rounded-lg px-3 py-1"
        >
          Add new hero
        </button>
      </section>

      <section className="grid grid-cols-5 gap-3">
        {paginatedArray.map(hero => (
          <HeroCard key={hero.id} hero={hero} />
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
