import { Dispatch } from 'redux';
import { UploadCurrenciesAction } from 'Types/currencies';
export declare const fetchCurrencies: () => (dispatch: Dispatch<UploadCurrenciesAction>) => Promise<void>;
