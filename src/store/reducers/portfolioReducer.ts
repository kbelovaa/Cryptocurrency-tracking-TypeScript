import { IAddedCurrency, IAddedCurrencies, PortfolioActionTypes, PortfolioAction } from 'Types/portfolio';

const selectedCurrencies: IAddedCurrency[] =
  localStorage.getItem('selectedCurrencies') !== null
    ? JSON.parse(localStorage.getItem('selectedCurrencies') || '{}')
    : [];

const defaultState: IAddedCurrencies = {
  addedCurrencies: [...selectedCurrencies],
  temporaryChoice: '',
};

const portfolioReducer = (state = defaultState, action: PortfolioAction): IAddedCurrencies => {
  switch (action.type) {
    case PortfolioActionTypes.MAKE_TEMPORARY_CHOICE:
      return { ...state, temporaryChoice: action.payload };
    case PortfolioActionTypes.ADD_CURRENCY:
      return {
        ...state,
        addedCurrencies: [...state.addedCurrencies, action.payload],
      };
    case PortfolioActionTypes.DELETE_CURRENCY:
      return {
        ...state,
        addedCurrencies: state.addedCurrencies.filter((currency) => currency.date !== action.payload),
      };
    default:
      return state;
  }
};

export default portfolioReducer;
