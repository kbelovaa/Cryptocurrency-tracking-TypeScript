import React, { FC, useContext } from 'react';
import useTypedSelector from 'Hooks/useTypedSelector';
import { ICurrency } from 'Types/currencies';
import { IAddedCurrency } from 'Types/portfolio';
import { round } from 'Utils/roundingFunctions';
import ModalsContext from 'Context/ModalsContext';
import './PortfolioPrice.scss';

const PortfolioPrice: FC = () => {
  const context = useContext(ModalsContext);

  const portfolioClickHandle = () => {
    if (context !== null) {
      context.setIsPortfolioModalOpen(true);
    }
  };

  const allCurrencies = useTypedSelector<ICurrency[]>((state) => state.currencies.currencies);
  const addedCurrencies = useTypedSelector<IAddedCurrency[]>((state) => state.addedCurrencies.addedCurrencies);

  let totalPrice = 0;
  let firstPrice = 0;

  if (allCurrencies.length === 0) {
    return null;
  }

  for (let i = 0; i < addedCurrencies.length; i += 1) {
    const currency: ICurrency | undefined = allCurrencies.find(
      (currencyObj: ICurrency) => currencyObj.id === addedCurrencies[i].id
    );
    if (currency !== undefined) {
      totalPrice += Number(currency.priceUsd) * addedCurrencies[i].quantity;
    }
    firstPrice += Number(addedCurrencies[i].firstPrice) * addedCurrencies[i].quantity;
  }

  const diff: number = totalPrice - firstPrice;
  const percent: number = round((diff / firstPrice) * 100);

  return (
    <div className="portfolio" onClick={portfolioClickHandle}>
      {addedCurrencies.length !== 0 && (
        <>
          <p className="portfolio__title">Your portfolio</p>
          <span className="portfolio__price">${round(totalPrice)}</span>
          <span
            className={diff >= 0 ? 'portfolio__diff portfolio__diff_plus' : 'portfolio__diff portfolio__diff_minus'}
          >
            {diff >= 0 ? `+${round(diff)}` : `${round(diff)}`} ({percent} %)
          </span>
        </>
      )}
      {addedCurrencies.length === 0 && (
        <>
          <p className="portfolio__title">Your portfolio</p>
          <span className="portfolio__price portfolio__price_only">$0</span>
        </>
      )}
    </div>
  );
};

export default PortfolioPrice;
