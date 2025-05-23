import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { HeroCard, Pagination } from '../../components';

import { useHeroes } from '../../store';

import { client, getSearchWith } from '../../utils';

import { Hero } from '../../types';

export const HomePage = () => {
  const superHeroesArray = useHeroes(state => state.heroesArray);
  const setHeroesArray = useHeroes(state => state.setHeroesArray);
  const [paginatedArray, setPaginatedArray] = useState<Hero[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchBarValue, setSearchBarValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const currentPage = searchParams.get('page') ? +searchParams.get('page')! : 1;
  const queryFindName = searchParams.get('query')
    ? searchParams.get('query')
    : '';

  useEffect(() => {
    if (!superHeroesArray.length) {
      setIsLoading(true);

      client
        .get<Hero[]>('/heroes')
        .then(array => setHeroesArray(array))
        .finally(() =>
          setTimeout(() => {
            setIsLoading(false);
          }, 2000)
        );
    }
  }, []);

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
    <section className="bg-[rgb(0_0_0_/_30%)] p-7 flex flex-col gap-7 rounded-3xl text-white justify-between">
      <section className="flex flex-col gap-4 sm:flex-row justify-between items-center font-medium text-lg lg:font-bold lg:text-3xl">
        <h1 className="text-nowrap">Home page</h1>

        <input
          type="text"
          className="text-black rounded-lg px-3 py-1 w-[50%] lg:w-[50%] outline-purple-800 hoveredInput"
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
          className="border rounded-lg px-3 py-1 hoveredButton text-nowrap"
        >
          Add new hero
        </button>
      </section>

      <section className="grid grid-cols-1 overflow-y-scroll sm:overflow-hidden sm:grid-cols-3 lg:grid-cols-5 gap-1">
        {isLoading ? (
          <div>Loading superheroes...</div>
        ) : (
          <>
            {paginatedArray.length > 0 ? (
              <>
                {paginatedArray.map(hero => (
                  <HeroCard key={hero.id} hero={hero} />
                ))}
              </>
            ) : (
              <h2 className="justify-self-center italic font-thin">
                No hero found!
              </h2>
            )}
          </>
        )}
      </section>

      <Pagination
        handleSearchParams={setSearchParams}
        currentPage={currentPage}
        arrayLength={filteredHeroesArray.length}
      />
    </section>
  );
};
