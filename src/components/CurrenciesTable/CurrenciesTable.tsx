import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePagination from 'Hooks/usePagination';
import { ICurrency } from 'Types/currencies';
import CurrencyRow from 'Components/CurrenciesTable/CurrencyRow/CurrencyRow';
import Pagination from 'Components/Pagination/Pagination';
import './CurrenciesTable.scss';

const CurrenciesTable: FC = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.screen.width);

  const { num } = useParams<{ num?: string }>();
  const currentPage: number = Number.isNaN(Number(num)) ? 1 : Number(num);

  const { currentCurrencies, currenciesPerPage } = usePagination(currentPage);

  useEffect(() => {
    const handleResizeWindow = () => setScreenWidth(window.screen.width);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return (
    <div className="container">
      <table className="table">
        <thead className="table-head">
          <tr>
            <th className="table-head__cell table-head__cell_btn"></th>
            <th className="table-head__cell table-head__cell_rank">#</th>
            <th className="table-head__cell table-head__cell_name">Name</th>
            <th className="table-head__cell table-head__cell_price">Price</th>
            <th className="table-head__cell table-head__cell_percent">24h %</th>
            <th className="table-head__cell table-head__cell_avgprice">
              {screenWidth <= 600 ? 'Avg Price' : 'Avg Price (24h)'}
            </th>
            <th className="table-head__cell table-head__cell_mcap">Market Cap</th>
            <th className="table-head__cell table-head__cell_volume table__cell_additional">Volume</th>
            <th className="table-head__cell table-head__cell_supply table__cell_additional">
              {screenWidth <= 600 ? 'C. Supply' : 'Circulating Supply'}
            </th>
            <th className="table-head__cell table-head__cell_maxsupply table__cell_additional">Max Supply</th>
          </tr>
        </thead>
        <tbody>
          {currentCurrencies.map((currency: ICurrency) => (
            <CurrencyRow key={currency.id} currency={currency} />
          ))}
        </tbody>
      </table>
      <Pagination currenciesPerPage={currenciesPerPage} currentPage={currentPage} />
    </div>
  );
};

export default CurrenciesTable;
