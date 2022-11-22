import * as CurrenciesActionCreators from './currencies';
import * as PortfolioActionCreators from './portfolio';

export default {
  ...CurrenciesActionCreators,
  ...PortfolioActionCreators,
};
