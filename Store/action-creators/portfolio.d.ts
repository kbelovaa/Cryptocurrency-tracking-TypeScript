import { IAddedCurrency, PortfolioAction } from 'Types/portfolio';
export declare const makeTemporaryChoiceAction: (id: string) => PortfolioAction;
export declare const addCurrencyAction: (currency: IAddedCurrency) => PortfolioAction;
export declare const deleteCurrencyAction: (date: number) => PortfolioAction;
