import React, { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import useActions from 'Hooks/useActions';
import Header from 'Components/Header/Header';
import CurrencyPage from 'Components/CurrencyPage/CurrencyPage';
import CurrenciesTable from 'Components/CurrenciesTable/CurrenciesTable';
import './App.scss';

const App: FC = () => {
  const { fetchCurrencies } = useActions();

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <div className="content">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<CurrenciesTable />} />
            <Route path=":num" element={<CurrenciesTable />} />
            <Route path="currency/:id" element={<CurrencyPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
