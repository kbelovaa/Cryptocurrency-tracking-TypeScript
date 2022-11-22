import { combineReducers } from 'redux';
import portfolioReducer from 'Store/reducers/portfolioReducer';
import currenciesReducer from 'Store/reducers/currenciesReducer';

export const rootReducer = combineReducers({
  addedCurrencies: portfolioReducer,
  currencies: currenciesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
