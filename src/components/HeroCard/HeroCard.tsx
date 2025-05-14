import { NavLink } from 'react-router';

import { Hero } from '../../types';

interface Props {
  hero: Hero;
}

export const HeroCard = ({ hero }: Props) => {
  return (
    <NavLink to={`/${hero.id}`}>
      <article className="p-5 bg-slate-900 flex flex-col rounded-3xl justify-center items-center gap-2">
        <img
          className="h-40 w-40"
          src={hero.images[0]}
          alt={`${hero.nickname}-image`}
        />

        <h2>
          <span className="font-light">Nickname:</span>{' '}
          <span className="font-bold">{hero.nickname}</span>
        </h2>
      </article>
    </NavLink>
  );
};
