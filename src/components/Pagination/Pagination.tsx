import { SetURLSearchParams } from 'react-router';

import { PaginationCell } from '../PaginationCell';

interface Props {
  currentPage: number;
  handleSearchParams: SetURLSearchParams;
  arrayLength: number;
}

export const Pagination = ({
  currentPage,
  handleSearchParams,
  arrayLength
}: Props) => {
  const countOfPages = Math.ceil(arrayLength / 5);
  const arrayOfPagesCount: number[] = [1];

  for (let i = 2; i <= countOfPages; i++) {
    arrayOfPagesCount.push(i);
  }

  return (
    <nav className='align-end'>
      <ul className="flex justify-center gap-3">
        {arrayOfPagesCount.map(number => (
          <PaginationCell
            key={number}
            page={number}
            currentPage={currentPage}
            handleSearchParams={handleSearchParams}
          />
        ))}
      </ul>
    </nav>
  );
};
