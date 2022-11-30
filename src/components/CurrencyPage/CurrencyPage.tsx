import React, { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTypedSelector from 'Hooks/useTypedSelector';
import { ICurrency } from 'Types/currencies';
import AddingButton from 'Components/AddingButton/AddingButton';
import CurrencyChart from 'Components/CurrencyPage/CurrencyChart/CurrencyChart';
import { round, convert } from 'Utils/roundingFunctions';
import { getCurrency } from 'Services/requests';
import './CurrencyPage.scss';

const CurrencyPage: FC = () => {
  const [currency, setCurrency] = useState<ICurrency>({
    id: '',
    rank: '',
    symbol: '',
    name: '',
    supply: '',
    maxSupply: '',
    marketCapUsd: '',
    volumeUsd24Hr: '',
    priceUsd: '',
    changePercent24Hr: '',
    vwap24Hr: '',
    explorer: '',
  });
  const [screenWidth, setScreenWidth] = useState<number>(window.screen.width);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const allCurrencies = useTypedSelector<ICurrency[]>((state) => state.currencies.currencies);
  const curr: ICurrency = allCurrencies.filter((currencyObj: ICurrency) => currencyObj.id === id)[0];

  useEffect(() => {
    const handleResizeWindow = () => setScreenWidth(window.screen.width);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        const response = await getCurrency(id);
        const currencyData: ICurrency = response.data.data;
        setCurrency(currencyData);
      }
    };

    if (curr === undefined) {
      fetchData();
    } else {
      setCurrency(curr);
    }
  }, []);

  if (id === undefined) {
    return null;
  }

  return (
    <div>
      <div className="container">
        <button className="btn-back" onClick={() => navigate('/')}>
          To main page
        </button>
        <table className="table-currency">
          <thead className="table-head">
            <tr>
              <th className="table-head__cell table-head__cell_btn"></th>
              <th className="table-head__cell table-head__cell_rank">#</th>
              <th className="table-head__cell table-head__cell_name">Name</th>
              <th className="table-head__cell table-head__cell_price">Price</th>
              <th className="table-head__cell table-head__cell_percent">24h %</th>
              <th className="table-head__cell table-head__cell_avgprice">
                {screenWidth <= 600 ? 'Avg Price' : 'Avg Price (24h)'}
              </th>
              <th className="table-head__cell table-head__cell_mcap">Market Cap</th>
              <th className="table-head__cell table-head__cell_volume table__cell_additional">Volume</th>
              <th className="table-head__cell table-head__cell_supply table__cell_additional">
                {screenWidth <= 600 ? 'C. Supply' : 'Circulating Supply'}
              </th>
              <th className="table-head__cell table-head__cell_maxsupply table__cell_additional">Max Supply</th>
            </tr>
          </thead>
          <tbody>
            {currency.id !== '' && (
              <tr className="table__row">
                <td className="table__cell">
                  <AddingButton currency={currency} />
                </td>
                <td className="table__cell">{currency.rank}</td>
                <td className="table__cell">
                  <div className="table__cell-wrap">
                    {screenWidth > 600 && <span className="table__currency-name">{currency.name}</span>}
                    <span className="table__currency-ticker">{currency.symbol}</span>
                  </div>
                </td>
                <td className="table__cell">
                  ${screenWidth <= 600 ? convert(currency.priceUsd) : round(currency.priceUsd)}
                </td>
                <td
                  className={
                    currency.changePercent24Hr.slice(0, 1) === '-'
                      ? 'table__cell table__link_deleting'
                      : 'table__cell table__link_adding'
                  }
                >
                  {round(currency.changePercent24Hr)}%
                </td>
                <td className="table__cell">
                  ${screenWidth <= 600 ? convert(currency.vwap24Hr) : round(currency.vwap24Hr)}
                </td>
                <td className="table__cell">${convert(currency.marketCapUsd)}</td>
                <td className="table__cell table__cell_additional">${convert(currency.volumeUsd24Hr)}</td>
                <td className="table__cell table__cell_additional">
                  {convert(currency.supply)} {currency.symbol}
                </td>
                <td className="table__cell table__cell_additional">
                  {convert(currency.maxSupply)} {currency.symbol}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <CurrencyChart currencyId={id} />
      </div>
    </div>
  );
};

export default CurrencyPage;
