import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useActions from 'Hooks/useActions';
import useTypedSelector from 'Hooks/useTypedSelector';
import { ICurrency } from 'Types/currencies';
import CurrencyRow from 'Components/CurrenciesTable/CurrencyRow/CurrencyRow';
import Pagination from 'Components/Pagination/Pagination';
import './CurrenciesTable.scss';

const CurrenciesTable: FC = () => {
  const { fetchCurrencies } = useActions();

  const { num } = useParams<{ num?: string }>();
  const currentPage: number = Number.isNaN(Number(num)) ? 1 : Number(num);

  const currencies = useTypedSelector<ICurrency[]>((state) => state.currencies.currencies);

  const currenciesPerPage = 10;
  const lastCurrencyIndex: number = currentPage * currenciesPerPage;
  const firstCurrencyIndex: number = lastCurrencyIndex - currenciesPerPage;
  const currentCurrencies: ICurrency[] = currencies.filter(
    (currencyObj: ICurrency) =>
      Number(currencyObj.rank) > firstCurrencyIndex && Number(currencyObj.rank) <= lastCurrencyIndex
  );

  useEffect(() => {
    if (currentCurrencies.length === 0) {
      fetchCurrencies(currenciesPerPage, firstCurrencyIndex);
    }
  }, [num]);

  return (
    <div className="container">
      <table className="table">
        <thead className="table-head">
          <tr>
            <th className="table-head__btn"></th>
            <th className="table-head__rank">#</th>
            <th className="table-head__name">Name</th>
            <th className="table-head__price">Price</th>
            <th className="table-head__percent">24h %</th>
            <th className="table-head__avgprice">Avg Price (24h)</th>
            <th className="table-head__mcap">Market Cap</th>
            <th className="table-head__volume table__additional">Volume</th>
            <th className="table-head__supply table__additional">Circulating Supply</th>
            <th className="table-head__maxsupply table__additional">Max Supply</th>
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
