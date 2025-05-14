import { Hero } from '../../types';

interface Props {
  hero: Hero;
}

export const HeroCard = ({ hero }: Props) => {
  return (
    <article className="p-5 bg-slate-400 flex flex-col justify-center items-center">
      <img
        className="h-40 w-40"
        src={hero.images[0]}
        alt={`${hero.nickname}-image`}
      />

      <h2>Nickname: {hero.nickname}</h2>
    </article>
  );
};
