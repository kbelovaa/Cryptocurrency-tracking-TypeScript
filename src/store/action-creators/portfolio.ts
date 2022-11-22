import { IAddedCurrency, PortfolioActionTypes, PortfolioAction } from 'Types/portfolio';

export const makeTemporaryChoiceAction = (id: string): PortfolioAction => ({
  type: PortfolioActionTypes.MAKE_TEMPORARY_CHOICE,
  payload: id,
});

export const addCurrencyAction = (currency: IAddedCurrency): PortfolioAction => ({
  type: PortfolioActionTypes.ADD_CURRENCY,
  payload: currency,
});

export const deleteCurrencyAction = (date: number): PortfolioAction => ({
  type: PortfolioActionTypes.DELETE_CURRENCY,
  payload: date,
});
