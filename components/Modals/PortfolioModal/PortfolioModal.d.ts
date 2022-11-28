import { FC } from 'react';
import { IAddedCurrency } from 'Types/portfolio';
import { ICurrency } from 'Types/currencies';
import './PortfolioModal.scss';
interface PortfolioModalProps {
    currencies: ICurrency[];
    addedCurrencies: IAddedCurrency[];
    uniqueIds: Set<string>;
}
declare const PortfolioModal: FC<PortfolioModalProps>;
export default PortfolioModal;
