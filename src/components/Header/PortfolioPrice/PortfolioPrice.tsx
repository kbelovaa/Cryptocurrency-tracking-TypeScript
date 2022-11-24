import React, { FC, useContext, useEffect, useState } from 'react';
import useTypedSelector from 'Hooks/useTypedSelector';
import { ICurrency } from 'Types/currencies';
import { IAddedCurrency } from 'Types/portfolio';
import { getSomeCurrencies } from 'Services/requests';
import { round } from 'Utils/roundingFunctions';
import ModalsContext from 'Context/ModalsContext';
import './PortfolioPrice.scss';

const PortfolioPrice: FC = () => {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [firstPrice, setFirstPrice] = useState<number>(0);

  const context = useContext(ModalsContext);

  const portfolioClickHandle = () => {
    if (context !== null) {
      context.setIsPortfolioModalOpen(true);
    }
  };

  const addedCurrencies = useTypedSelector<IAddedCurrency[]>((state) => state.addedCurrencies.addedCurrencies);
  const ids: string[] = addedCurrencies.map((cur: IAddedCurrency) => cur.id);
  const uniqueIds: Set<string> = new Set(ids);
  const currencyIds: string = Array.from(uniqueIds).join(',');

  useEffect(() => {
    const fetchData = async () => {
      if (currencyIds !== '') {
        const response = await getSomeCurrencies(currencyIds);
        const currenciesData: ICurrency[] = response.data.data;
        setCurrencies(currenciesData);
      } else {
        setCurrencies([]);
      }
    };

    fetchData();
  }, [addedCurrencies]);

  useEffect(() => {
    if (currencies.length !== 0) {
      setTotalPrice(0);
      setFirstPrice(0);
      addedCurrencies.map(async (addedCur: IAddedCurrency) => {
        const currency: ICurrency = currencies.filter((cur: ICurrency) => cur.id === addedCur.id)[0];
        setTotalPrice((prevState) => prevState + Number(currency.priceUsd) * addedCur.quantity);
        setFirstPrice((prevState) => prevState + Number(addedCur.firstPrice) * addedCur.quantity);
      });
    }
  }, [currencies]);

  return (
    <div className="portfolio" onClick={portfolioClickHandle}>
      {currencies.length !== 0 && (
        <>
          <p className="portfolio__title">Your portfolio</p>
          <span className="portfolio__price">${round(totalPrice)}</span>
          <span
            className={
              totalPrice - firstPrice >= 0
                ? 'portfolio__diff portfolio__diff_plus'
                : 'portfolio__diff portfolio__diff_minus'
            }
          >
            {totalPrice - firstPrice >= 0 ? `+${round(totalPrice - firstPrice)}` : `${round(totalPrice - firstPrice)}`}{' '}
            ({round(((totalPrice - firstPrice) / firstPrice) * 100)} %)
          </span>
        </>
      )}
      {addedCurrencies.length === 0 && currencies.length === 0 && (
        <>
          <p className="portfolio__title">Your portfolio</p>
          <span className="portfolio__price portfolio__price_only">$0</span>
        </>
      )}
    </div>
  );
};

export default PortfolioPrice;
