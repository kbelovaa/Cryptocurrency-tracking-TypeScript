import React, { FC } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from 'Components/Header/Header';
import CurrencyPage from 'Components/CurrencyPage/CurrencyPage';
import CurrenciesTable from 'Components/CurrenciesTable/CurrenciesTable';
import './App.scss';

const App: FC = () => (
  <div className="content">
    <HashRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<CurrenciesTable />} />
          <Route path=":num" element={<CurrenciesTable />} />
          <Route path="currency/:id" element={<CurrencyPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  </div>
);

export default App;
