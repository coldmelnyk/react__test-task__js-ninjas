import { NavLink } from 'react-router';
import { motion } from 'motion/react';

import { Hero } from '../../types';

interface Props {
  hero: Hero;
}

export const HeroCard = ({ hero }: Props) => {
  return (
    <NavLink className={'p-1 rounded-3xl block'} to={`/hero/${hero.id}`}>
      <motion.article
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 0.7 }
        }}
        className="p-5 hoveredCard bg-slate-900 flex flex-col rounded-3xl justify-center items-center gap-2"
      >
        <img
          className="h-40 w-40 aspect-auto"
          src={hero.images[0]}
          alt={`${hero.nickname}-image`}
        />

        <h2 className="text-nowrap">
          <span className="font-light">Nickname:</span>{' '}
          <span className="font-bold">{hero.nickname}</span>
        </h2>
      </motion.article>
    </NavLink>
  );
};
