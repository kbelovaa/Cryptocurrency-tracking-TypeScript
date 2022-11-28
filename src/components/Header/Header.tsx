import React, { FC, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useTypedSelector from 'Hooks/useTypedSelector';
import { IAddedCurrency } from 'Types/portfolio';
import { ICurrency } from 'Types/currencies';
import { getSomeCurrencies } from 'Services/requests';
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

  return (
    <ModalsContext.Provider value={{ setIsPortfolioModalOpen, setIsInputModalOpen }}>
      <div className="top">
        <div className="container">
          <div className="header">
            <TopCurrencies />
            <PortfolioPrice currencies={currencies} addedCurrencies={addedCurrencies} />
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
