import React, { FC, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useTypedSelector from 'Hooks/useTypedSelector';
import { IAddedCurrency } from 'Types/portfolio';
import { ICurrency } from 'Types/currencies';
import { getCurrency, getSomeCurrencies } from 'Services/requests';
import PortfolioPrice from 'Components/Header/PortfolioPrice/PortfolioPrice';
import TopCurrencies from 'Components/Header/TopCurrencies/TopCurrencies';
import ModalWindow from 'Components/Modals/ModalWindow';
import CurrencyAddingModal from 'Components/Modals/CurrencyAddingModal/CurrencyAddingModal';
import PortfolioModal from 'Components/Modals/PortfolioModal/PortfolioModal';
import ModalsContext from 'Context/ModalsContext';
import './Header.scss';

const Header: FC = () => {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState<boolean>(false);
  const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);

  const addedCurrencies = useTypedSelector<IAddedCurrency[]>((state) => state.addedCurrencies.addedCurrencies);
  const ids: string[] = addedCurrencies.map((cur: IAddedCurrency) => cur.id);
  const uniqueIds: Set<string> = new Set(ids);
  const currencyIds: string = Array.from(uniqueIds).join(',');

  useEffect(() => {
    const fetchData = async () => {
      if (currencies.length === 0) {
        if (currencyIds !== '') {
          const response = await getSomeCurrencies(currencyIds);
          const currenciesData: ICurrency[] = response.data.data;
          setCurrencies(currenciesData);
        } else {
          setCurrencies([]);
        }
      } else {
        if (addedCurrencies.length !== 0) {
          const lastAddedCurrency: ICurrency | undefined = currencies.filter(
            (cur: ICurrency) => cur.id === addedCurrencies[addedCurrencies.length - 1].id
          )[0];
          if (lastAddedCurrency === undefined) {
            const response = await getCurrency(addedCurrencies[addedCurrencies.length - 1].id);
            const currenciesData: ICurrency = response.data.data;
            setCurrencies((prevState) => [...prevState, currenciesData]);
          }
        }
        currencies.forEach((currency: ICurrency) => {
          const oldCurrency: IAddedCurrency | undefined = addedCurrencies.filter(
            (addedCur: IAddedCurrency) => addedCur.id === currency.id
          )[0];
          if (oldCurrency === undefined) {
            setCurrencies(currencies.filter((cur: ICurrency) => cur.id !== currency.id));
          }
        });
      }
    };

    fetchData();
  }, [addedCurrencies]);

  return (
    <ModalsContext.Provider value={{ setIsPortfolioModalOpen, setIsInputModalOpen }}>
      <div className="top">
        <div className="container">
          <div className="header">
            <TopCurrencies />
            <PortfolioPrice currencies={currencies} addedCurrencies={addedCurrencies} uniqueIds={uniqueIds} />
          </div>
        </div>
      </div>
      <Outlet />
      <ModalWindow
        id="adding-modal"
        isOpen={isInputModalOpen}
        setIsOpen={setIsInputModalOpen}
        content={<CurrencyAddingModal />}
      />
      <ModalWindow
        id="portfolio-modal"
        isOpen={isPortfolioModalOpen}
        setIsOpen={setIsPortfolioModalOpen}
        content={<PortfolioModal currencies={currencies} addedCurrencies={addedCurrencies} uniqueIds={uniqueIds} />}
      />
    </ModalsContext.Provider>
  );
};

export default Header;
