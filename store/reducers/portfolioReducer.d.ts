import { IAddedCurrencies, PortfolioAction } from 'Types/portfolio';
declare const portfolioReducer: (state: IAddedCurrencies | undefined, action: PortfolioAction) => IAddedCurrencies;
export default portfolioReducer;
