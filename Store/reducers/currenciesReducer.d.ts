import { ICurrencies, UploadCurrenciesAction } from 'Types/currencies';
declare const currenciesReducer: (state: ICurrencies | undefined, action: UploadCurrenciesAction) => ICurrencies;
export default currenciesReducer;
