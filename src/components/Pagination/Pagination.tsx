import { useEffect, useState } from 'react';
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
  const [arrayOfPagesCount, setArrayOfPagesCount] = useState([1]);

  useEffect(() => {
    const newArrayOfPages = [1];
    const countOfPages = Math.ceil(arrayLength / 5);

    for (let i = 2; i <= countOfPages; i++) {
      newArrayOfPages.push(i);
    }

    setArrayOfPagesCount(newArrayOfPages);
  }, [arrayLength]);

  return (
    <nav className="align-end">
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
