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
      className={cn('cursor-pointer px-5 py-3 rounded-full border bg-none', {
        'bg-red-600 border-black text-black': page === currentPage,
        ' text-white border-white': page !== currentPage
      })}
    >
      <button>{page}</button>
    </li>
  );
};
