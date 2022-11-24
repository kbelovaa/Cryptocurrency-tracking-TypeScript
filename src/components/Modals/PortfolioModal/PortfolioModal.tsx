import React, { FC, useEffect, useState } from 'react';
import useTypedSelector from 'Hooks/useTypedSelector';
import { IAddedCurrency } from 'Types/portfolio';
import { ICurrency } from 'Types/currencies';
import DeletingButton from 'Components/Modals/PortfolioModal/DeletingButton/DeletingButton';
import { getSomeCurrencies } from 'Services/requests';
import { round } from 'Utils/roundingFunctions';
import './PortfolioModal.scss';

const PortfolioModal: FC = () => {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);

  const addedCurrencies = useTypedSelector<IAddedCurrency[]>((state) => state.addedCurrencies.addedCurrencies);
  const ids: string[] = addedCurrencies.map((cur: IAddedCurrency) => cur.id);
  const uniqueIds: Set<string> = new Set(ids);
  const currencyIds: string = Array.from(uniqueIds).join(',');

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSomeCurrencies(currencyIds);
      const currenciesData: ICurrency[] = response.data.data;
      setCurrencies(currenciesData);
    };

    fetchData();
  }, [addedCurrencies]);

  return (
    <div className="portfolio__content">
      <h2 className="portfolio__name">Your portfolio</h2>
      {addedCurrencies.length !== 0 ? (
        <table className="portfolio-table">
          <thead className="portfolio-table__head">
            <tr>
              <th></th>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Old Price</th>
              <th>Current Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {addedCurrencies.map((addedCurrency: IAddedCurrency, index: number) => {
              if (currencies.length !== 0 && currencies.length === Array.from(uniqueIds).length) {
                const currency: ICurrency = currencies.filter((cur: ICurrency) => cur.id === addedCurrency.id)[0];
                return (
                  <tr key={currency.id + index} className="portfolio-table__row">
                    <td>
                      <DeletingButton currencyDate={addedCurrency.date} />
                    </td>
                    <td>{index + 1}</td>
                    <td>
                      <div className="portfolio-table__cell">
                        <span className="portfolio-table__currency-name">{currency.name}</span>
                        <span className="portfolio-table__currency-ticker">{currency.symbol}</span>
                      </div>
                    </td>
                    <td>{addedCurrency.quantity}</td>
                    <td>${round(addedCurrency.firstPrice)}</td>
                    <td>${round(currency.priceUsd)}</td>
                    <td>${round(round(currency.priceUsd) * addedCurrency.quantity)}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      ) : (
        <p className="portfolio__empty">It&apos;s empty here!</p>
      )}
    </div>
  );
};

export default PortfolioModal;
