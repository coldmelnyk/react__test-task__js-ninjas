import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useHeroes } from '../../store';

import { Hero } from '../../types';

export const HeroDetailsPage = () => {
  const [hero, setHero] = useState<Hero | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { register, handleSubmit, reset } = useForm<Hero>();
  const superHeroesArray = useHeroes(state => state.heroesArray);
  const updateHeroFunc = useHeroes(state => state.updateHero);
  const deleteHeroFunc = useHeroes(state => state.deleteHero);
  const superHeroId = useParams().superHeroId || '';
  const navigate = useNavigate();

  const submitSavingNewHero: SubmitHandler<Hero> = (data: Hero) => {
    updateHeroFunc(data);

    setIsEditMode(false);
  };

  useEffect(() => {
    const foundedHero = superHeroesArray.find(
      hero => hero.id.toLowerCase() === superHeroId.toLowerCase()
    );

    if (foundedHero) {
      setHero(foundedHero);
    }
  }, [superHeroId, superHeroesArray]);

  useEffect(() => {
    if (hero) {
      reset(hero);
    }
  }, [hero, reset]);

  return (
    <>
      {hero ? (
        <article className="p-5 text-lg text-white bg-[rgb(0_0_0_/_30%)] grid md:grid-cols-2 justify-center gap-4 items-center md:gap-10 rounded-3xl">
          {isEditMode ? (
            <>
              <section className="flex justify-center items-center">
                <img
                  className="md:h-[400px] md:w-[400px] max-w-[240px] md:max-w-[400px] aspect-auto"
                  src={hero.images[0]}
                  alt={`${hero.nickname}-image`}
                />
              </section>

              <form
                className="flex flex-col justify-center md:justify-between h-full gap-4 md:gap-0 md:max-w-[400px]"
                onSubmit={handleSubmit(submitSavingNewHero)}
              >
                <section className="md:self-end justify-between md:justify-normal flex md:gap-2">
                  <button
                    onClick={() => {
                      navigate(-1);
                    }}
                    className={
                      'font-light bg-[rgb(0_0_0_/_30%)] text-white  rounded-xl p-1'
                    }
                  >{`<-- Back`}</button>

                  <button
                    type="button"
                    onClick={() => setIsEditMode(state => !state)}
                    className="bg-[rgb(0_0_0_/_30%)] text-white  rounded-xl px-3 py-1"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      deleteHeroFunc(hero);
                      navigate('/');
                    }}
                    className="bg-[rgb(0_0_0_/_30%)] text-white  rounded-xl px-3 py-1"
                  >
                    Delete
                  </button>
                </section>

                <section className="flex flex-col gap-2">
                  <h2>
                    Nickname:{' '}
                    <input
                      className="text-black"
                      type="text"
                      {...register('nickname')}
                    />{' '}
                  </h2>

                  <h3>
                    Phrase:{' '}
                    <input
                      className="text-black"
                      type="text"
                      {...register('catch_phrase')}
                    />{' '}
                  </h3>

                  <div>
                    <p>Superpowers:</p>
                    <p>
                      <input
                        className="text-black"
                        type="text"
                        {...register('superpowers')}
                      />{' '}
                    </p>
                  </div>
                </section>

                <section className="flex flex-col gap-2">
                  <p>
                    Ordinary name:{' '}
                    <input
                      className="text-black"
                      type="text"
                      {...register('real_name')}
                    />{' '}
                  </p>

                  <div>
                    <p>Description:</p>

                    <p>
                      <input
                        className="text-black"
                        type="text"
                        {...register('origin_description')}
                      />{' '}
                    </p>
                  </div>
                </section>

                <button className="border px-3 py-1" type="submit">
                  Save
                </button>
              </form>
            </>
          ) : (
            <>
              <section className="flex justify-center items-center">
                <img
                  className="md:h-[400px] md:w-[400px] max-w-[240px] md:max-w-[400px] aspect-auto"
                  src={hero.images[0]}
                  alt={`${hero.nickname}-image`}
                />
              </section>

              <section className="flex flex-col justify-center md:justify-between gap-4 md:gap-0 h-full md:max-w-[400px]">
                <section className="md:self-end justify-between md:justify-normal flex md:gap-2">
                  <button
                    onClick={() => {
                      navigate(-1);
                    }}
                    className={
                      'font-light bg-[rgb(0_0_0_/_30%)] text-white  rounded-xl p-1'
                    }
                  >{`<-- Back`}</button>

                  <button
                    onClick={() => setIsEditMode(state => !state)}
                    className="bg-[rgb(0_0_0_/_30%)] text-white  rounded-xl px-3 py-1"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      deleteHeroFunc(hero);
                      navigate('/');
                    }}
                    className="bg-[rgb(0_0_0_/_30%)] text-white  rounded-xl px-3 py-1"
                  >
                    Delete
                  </button>
                </section>

                <section className="flex flex-col gap-2">
                  <h2>Nickname: {hero.nickname}</h2>
                  <h3>Phrase: {hero.catch_phrase}</h3>

                  <div>
                    <p>Superpowers:</p>
                    <p>{hero.superpowers}</p>
                  </div>
                </section>

                <section className="flex flex-col gap-2">
                  <p>
                    Ordinary name: <span>{hero.real_name}</span>
                  </p>

                  <div>
                    <p>Description:</p>
                    <p>{hero.origin_description}</p>
                  </div>
                </section>
              </section>
            </>
          )}
        </article>
      ) : (
        <article>No hero found!</article>
      )}
    </>
  );
};
