import React, { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTypedSelector from 'Hooks/useTypedSelector';
import { ICurrency } from 'Types/currencies';
import AddingButton from 'Components/AddingButton/AddingButton';
import CurrencyChart from 'Components/CurrencyPage/CurrencyChart/CurrencyChart';
import { round, convert } from 'Utils/roundingFunctions';
import './CurrencyPage.scss';

const CurrencyPage: FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const allCurrencies = useTypedSelector<ICurrency[]>((state) => state.currencies.currencies);

  const currency: ICurrency | undefined = allCurrencies.find((currencyObj: ICurrency) => currencyObj.id === id);

  if (allCurrencies.length === 0 || currency === undefined || id === undefined) {
    return null;
  }

  const screenWidth: number = window.screen.width;

  return (
    <div>
      <div className="container">
        <button className="btn-back" onClick={() => navigate('/')}>
          To main page
        </button>
        <table className="table-currency">
          <thead className="table-head">
            <tr>
              <th className="table-head__btn"></th>
              <th className="table-head__rank">#</th>
              <th className="table-head__name">Name</th>
              <th className="table-head__price">Price</th>
              <th className="table-head__percent">24h %</th>
              <th className="table-head__avgprice">{screenWidth <= 600 ? 'Avg Price' : 'Avg Price (24h)'}</th>
              <th className="table-head__mcap">Market Cap</th>
              <th className="table-head__volume">Volume</th>
              <th className="table-head__supply">{screenWidth <= 600 ? 'C. Supply' : 'Circulating Supply'}</th>
              <th className="table-head__maxsupply">Max Supply</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table__row">
              <td>
                <AddingButton currency={currency} />
              </td>
              <td>{currency.rank}</td>
              <td>
                <div className="table__cell">
                  {screenWidth > 600 && <span className="table__currency-name">{currency.name}</span>}
                  <span className="table__currency-ticker">{currency.symbol}</span>
                </div>
              </td>
              <td>${screenWidth <= 600 ? convert(currency.priceUsd) : round(currency.priceUsd)}</td>
              <td
                className={
                  currency.changePercent24Hr.slice(0, 1) === '-' ? 'table__percent_deleting' : 'table__percent_adding'
                }
              >
                {round(currency.changePercent24Hr)}%
              </td>
              <td>${screenWidth <= 600 ? convert(currency.priceUsd) : round(currency.vwap24Hr)}</td>
              <td>${convert(currency.marketCapUsd)}</td>
              <td>${convert(currency.volumeUsd24Hr)}</td>
              <td>
                {convert(currency.supply)} {currency.symbol}
              </td>
              <td>
                {convert(currency.maxSupply)} {currency.symbol}
              </td>
            </tr>
          </tbody>
        </table>
        <CurrencyChart currencyId={id} />
      </div>
    </div>
  );
};

export default CurrencyPage;
