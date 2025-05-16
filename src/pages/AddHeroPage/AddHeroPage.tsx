import { useNavigate } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { str10_36 } from 'hyperdyperid/lib/str10_36';
import { motion } from 'motion/react';

import { useHeroes } from '../../store';

import { Hero, HeroForm } from '../../types';
import { client } from '../../utils';

export const AddHeroPage = () => {
  const { register, handleSubmit } = useForm<HeroForm>();
  const addHeroFunc = useHeroes(state => state.addNewHero);
  const navigate = useNavigate();

  const submitAddingNewHero: SubmitHandler<HeroForm> = (data: HeroForm) => {
    const newHero: Hero = {
      ...data,
      images: [data.image],
      id: str10_36()
    };

    client
      .post('/heroes', newHero)
      .then(() => {
        addHeroFunc(newHero);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.7 } }}
      className="bg-[rgb(0_0_0_/_30%)] p-7 sm:text-xl flex flex-col gap-2 sm:gap-7 rounded-3xl text-white"
    >
      <section className="flex justify-between items-center">
        <h1>Add hero page</h1>

        <button
          onClick={() => {
            navigate(-1);
          }}
          className={
            'font-light bg-[rgb(0_0_0_/_30%)] text-white  rounded-xl p-1 hoveredButton'
          }
        >{`<-- Back`}</button>
      </section>

      <form
        onSubmit={handleSubmit(submitAddingNewHero)}
        className="flex flex-col gap-3 sm:gap-5"
      >
        <div className="flex flex-col sm:flex-row sm:gap-3 justify-between items-center">
          <label>Nickname:</label>
          <input
            className="text-black rounded px-2 py-1 hoveredInput outline-purple-800"
            type="text"
            {...register('nickname')}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-3 justify-between items-center">
          <label>Real name:</label>
          <input
            className="text-black rounded px-2 py-1 hoveredInput outline-purple-800"
            type="text"
            {...register('real_name')}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-3 justify-between items-center">
          <label>Description:</label>
          <textarea
            className="text-black rounded px-2 py-1 resize-none col-span-10 hoveredInput outline-purple-800"
            rows={4}
            {...register('origin_description')}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-3 justify-between items-center">
          <label>Superpowers:</label>
          <textarea
            className="text-black rounded px-2 py-1 resize-none col-span-10 hoveredInput outline-purple-800"
            rows={2}
            {...register('superpowers')}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-3 justify-between items-center">
          <label>Catch phrase:</label>
          <input
            className="text-black rounded px-2 py-1 hoveredInput outline-purple-800"
            type="text"
            {...register('catch_phrase')}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-3 justify-between items-center">
          <label>Image URL:</label>
          <input
            className="text-black rounded px-2 py-1 hoveredInput outline-purple-800"
            type="text"
            {...register('image')}
          />
        </div>

        <button
          className="border rounded border-white px-3 py-1 hoveredButton"
          type="submit"
        >
          Add a new buddy!
        </button>
      </form>
    </motion.section>
  );
};
