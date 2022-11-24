import { Dispatch } from 'redux';
import { UploadCurrenciesAction } from 'Types/currencies';
export declare const fetchCurrencies: (limit: number, offset: number) => (dispatch: Dispatch<UploadCurrenciesAction>) => Promise<void>;
