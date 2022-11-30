import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Currency } from 'Types/currencies';
import AddingButton from 'Components/AddingButton/AddingButton';
import { round, convert } from 'Utils/roundingFunctions';
import './CurrencyRow.scss';

const CurrencyRow: FC<Currency> = ({ currency }) => {
  const [screenWidth, setScreenWidth] = useState<number>(window.screen.width);

  useEffect(() => {
    const handleResizeWindow = () => setScreenWidth(window.screen.width);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return (
    <tr className="table__row">
      <td className="table__cell">
        <AddingButton currency={currency} />
      </td>
      <td className="table__cell">
        <Link className="table__link" to={`/currency/${currency.id}`}>
          {currency.rank}
        </Link>
      </td>
      <td className="table__cell">
        <Link className="table__link" to={`/currency/${currency.id}`}>
          {screenWidth > 600 && <span className="table__currency-name">{currency.name}</span>}
          <span className="table__currency-ticker">{currency.symbol}</span>
        </Link>
      </td>
      <td className="table__cell">
        <Link className="table__link" to={`/currency/${currency.id}`}>
          ${screenWidth <= 600 ? convert(currency.priceUsd) : round(currency.priceUsd)}
        </Link>
      </td>
      <td className="table__cell">
        <Link
          to={`/currency/${currency.id}`}
          className={
            currency.changePercent24Hr.slice(0, 1) === '-'
              ? 'table__link table__link_deleting'
              : 'table__link table__link_adding'
          }
        >
          {round(currency.changePercent24Hr)}%
        </Link>
      </td>
      <td className="table__cell">
        <Link className="table__link" to={`/currency/${currency.id}`}>
          ${screenWidth <= 600 ? convert(currency.vwap24Hr) : round(currency.vwap24Hr)}
        </Link>
      </td>
      <td className="table__cell">
        <Link className="table__link" to={`/currency/${currency.id}`}>
          ${convert(currency.marketCapUsd)}
        </Link>
      </td>
      <td className="table__cell table__cell_additional">
        <Link className="table__link" to={`/currency/${currency.id}`}>
          ${convert(currency.volumeUsd24Hr)}
        </Link>
      </td>
      <td className="table__cell table__cell_additional">
        <Link className="table__link" to={`/currency/${currency.id}`}>
          {convert(currency.supply)} {currency.symbol}
        </Link>
      </td>
      <td className="table__cell table__cell_additional">
        <Link className="table__link" to={`/currency/${currency.id}`}>
          {convert(currency.maxSupply)} {currency.symbol}
        </Link>
      </td>
    </tr>
  );
};

export default CurrencyRow;
