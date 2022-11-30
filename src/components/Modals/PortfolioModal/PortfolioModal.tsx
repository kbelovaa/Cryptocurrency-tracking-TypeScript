import React, { FC } from 'react';
import { IAddedCurrency } from 'Types/portfolio';
import { ICurrency } from 'Types/currencies';
import DeletingButton from 'Components/Modals/PortfolioModal/DeletingButton/DeletingButton';
import { round, convert } from 'Utils/roundingFunctions';
import './PortfolioModal.scss';

interface PortfolioModalProps {
  currencies: ICurrency[];
  addedCurrencies: IAddedCurrency[];
  uniqueIds: Set<string>;
}

const PortfolioModal: FC<PortfolioModalProps> = ({ currencies, addedCurrencies, uniqueIds }) => (
  <div className="portfolio__content">
    <h2 className="portfolio__name">Your portfolio</h2>
    {addedCurrencies.length !== 0 ? (
      <table className="portfolio-table">
        <thead className="portfolio-table-head">
          <tr>
            <th className="portfolio-table-head__cell"></th>
            <th className="portfolio-table-head__cell">#</th>
            <th className="portfolio-table-head__cell">Name</th>
            <th className="portfolio-table-head__cell">Quantity</th>
            <th className="portfolio-table-head__cell">Old Price</th>
            <th className="portfolio-table-head__cell">Current Price</th>
            <th className="portfolio-table-head__cell">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {addedCurrencies.map((addedCurrency: IAddedCurrency, index: number) => {
            if (currencies.length !== 0 && currencies.length === Array.from(uniqueIds).length) {
              const currency: ICurrency = currencies.filter((cur: ICurrency) => cur.id === addedCurrency.id)[0];
              return (
                <tr key={currency.id + index} className="portfolio-table__row">
                  <td className="portfolio-table__cell">
                    <DeletingButton currencyDate={addedCurrency.date} />
                  </td>
                  <td className="portfolio-table__cell">{index + 1}</td>
                  <td className="portfolio-table__cell">
                    <div className="portfolio-table__cell-wrap">
                      <span className="portfolio-table__currency-name">{currency.name}</span>
                      <span className="portfolio-table__currency-ticker">{currency.symbol}</span>
                    </div>
                  </td>
                  <td className="portfolio-table__cell">{convert(addedCurrency.quantity)}</td>
                  <td className="portfolio-table__cell">${round(addedCurrency.firstPrice)}</td>
                  <td className="portfolio-table__cell">${round(currency.priceUsd)}</td>
                  <td className="portfolio-table__cell">
                    ${convert(Number(currency.priceUsd) * addedCurrency.quantity)}
                  </td>
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

export default PortfolioModal;
