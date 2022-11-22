import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Currency } from 'Types/currencies';
import AddingButton from 'Components/AddingButton/AddingButton';
import { round, convert } from 'Utils/roundingFunctions';
import './CurrencyRow.scss';

const CurrencyRow: FC<Currency> = ({ currency }) => (
  <tr className="table__row">
    <td>
      <AddingButton currency={currency} />
    </td>
    <td>
      <Link to={`/currency/${currency.id}`}>{currency.rank}</Link>
    </td>
    <td>
      <div className="table__cell">
        <Link to={`/currency/${currency.id}`}>
          <span className="table__currency-name">{currency.name}</span>
          <span className="table__currency-ticker">{currency.symbol}</span>
        </Link>
      </div>
    </td>
    <td>
      <Link to={`/currency/${currency.id}`}>${round(currency.priceUsd)}</Link>
    </td>
    <td>
      <Link
        to={`/currency/${currency.id}`}
        className={currency.changePercent24Hr.slice(0, 1) === '-' ? 'table__percent_deleting' : 'table__percent_adding'}
      >
        {round(currency.changePercent24Hr)}%
      </Link>
    </td>
    <td>
      <Link to={`/currency/${currency.id}`}>${round(currency.vwap24Hr)}</Link>
    </td>
    <td>
      <Link to={`/currency/${currency.id}`}>${convert(currency.marketCapUsd)}</Link>
    </td>
    <td className="table__additional">
      <Link to={`/currency/${currency.id}`}>${convert(currency.volumeUsd24Hr)}</Link>
    </td>
    <td className="table__additional">
      <Link to={`/currency/${currency.id}`}>
        {convert(currency.supply)} {currency.symbol}
      </Link>
    </td>
    <td className="table__additional">
      <Link to={`/currency/${currency.id}`}>
        {convert(currency.maxSupply)} {currency.symbol}
      </Link>
    </td>
  </tr>
);

export default CurrencyRow;
