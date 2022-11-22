import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Pagination.scss';

interface PaginationProps {
  currenciesPerPage: number;
  totalCurrencies: number;
  currentPage: number;
}

const Pagination: FC<PaginationProps> = ({ currenciesPerPage, totalCurrencies, currentPage }) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalCurrencies / currenciesPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number: number) => (
          <li className="page" key={number}>
            <Link
              to={`/${number}`}
              className={number === Number(currentPage) ? 'page__link page__link_current' : 'page__link'}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
