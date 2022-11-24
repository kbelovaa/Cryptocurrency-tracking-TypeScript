import React, { FC, useEffect, useState } from 'react';
import { ICurrency } from 'Types/currencies';
import { getTopCurrencies } from 'Services/requests';
import { round } from 'Utils/roundingFunctions';
import './TopCurrencies.scss';

const TopCurrencies: FC = () => {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTopCurrencies();
      const topCurrencies: ICurrency[] = response.data.data;
      setCurrencies(topCurrencies);
    };

    fetchData();
  }, []);

  return (
    <div className="top-currencies">
      <ul className="top-currencies__list">
        {currencies.map((currency: ICurrency) => (
          <li key={currency.id} className="top-currencies__item">
            <span className="top-currencies__ticker">{currency.symbol}</span>
            <span className="top-currencies__price">${round(currency.priceUsd)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCurrencies;
