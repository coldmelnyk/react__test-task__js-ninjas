import { SetURLSearchParams } from 'react-router';
import cn from 'classnames';

interface Props {
  page: number;
  currentPage: number;
  handleSearchParams: SetURLSearchParams;
}

export const PaginationCell = ({
  page,
  currentPage,
  handleSearchParams
}: Props) => {
  return (
    <li
      onClick={() => {
        handleSearchParams({ page: page.toString() });
      }}
      className={cn('p-3 text-center bg-none text-black border border-black', {
        'bg-red-600 text-black': page === currentPage
      })}
    >
      <button>{page}</button>
    </li>
  );
};
