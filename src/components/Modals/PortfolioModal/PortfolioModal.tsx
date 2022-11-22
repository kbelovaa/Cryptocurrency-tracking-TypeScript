import React, { FC } from 'react';
import useTypedSelector from 'Hooks/useTypedSelector';
import { IAddedCurrency } from 'Types/portfolio';
import { ICurrency } from 'Types/currencies';
import DeletingButton from 'Components/Modals/PortfolioModal/DeletingButton/DeletingButton';
import { round } from 'Utils/roundingFunctions';
import './PortfolioModal.scss';

const PortfolioModal: FC = () => {
  const addedCurrencies = useTypedSelector<IAddedCurrency[]>((state) => state.addedCurrencies.addedCurrencies);
  const allCurrencies = useTypedSelector<ICurrency[]>((state) => state.currencies.currencies);

  if (allCurrencies.length === 0) {
    return null;
  }

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
            {addedCurrencies.map((cur: IAddedCurrency, index: number) => {
              const currency: ICurrency | undefined = allCurrencies.find(
                (currencyObj: ICurrency) => currencyObj.id === cur.id
              );
              if (currency !== undefined) {
                return (
                  <tr key={cur.id + index} className="portfolio-table__row">
                    <td>
                      <DeletingButton currencyDate={cur.date} />
                    </td>
                    <td>{index + 1}</td>
                    <td>
                      <div className="portfolio-table__cell">
                        <span className="portfolio-table__currency-name">{currency.name}</span>
                        <span className="portfolio-table__currency-ticker">{currency.symbol}</span>
                      </div>
                    </td>
                    <td>{cur.quantity}</td>
                    <td>${round(cur.firstPrice)}</td>
                    <td>${round(currency.priceUsd)}</td>
                    <td>${round(round(currency.priceUsd) * cur.quantity)}</td>
                  </tr>
                );
              }
              return <></>;
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
