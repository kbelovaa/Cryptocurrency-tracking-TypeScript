import { ICurrencies, CurrenciesActionTypes, UploadCurrenciesAction } from 'Types/currencies';

const defaultState: ICurrencies = {
  currencies: [],
};

const currenciesReducer = (state = defaultState, action: UploadCurrenciesAction): ICurrencies => {
  switch (action.type) {
    case CurrenciesActionTypes.UPLOAD_CURRENCIES:
      return { ...state, currencies: [...action.payload] };
    default:
      return state;
  }
};

export default currenciesReducer;
