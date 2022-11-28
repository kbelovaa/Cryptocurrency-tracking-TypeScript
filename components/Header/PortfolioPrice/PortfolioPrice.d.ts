import { FC } from 'react';
import { ICurrency } from 'Types/currencies';
import { IAddedCurrency } from 'Types/portfolio';
import './PortfolioPrice.scss';
interface PortfolioPriceProps {
    currencies: ICurrency[];
    addedCurrencies: IAddedCurrency[];
    uniqueIds: Set<string>;
}
declare const PortfolioPrice: FC<PortfolioPriceProps>;
export default PortfolioPrice;
