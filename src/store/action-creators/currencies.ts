import { Dispatch } from 'redux';
import { getCurrencies } from 'Services/requests';
import { ICurrency, UploadCurrenciesAction, CurrenciesActionTypes } from 'Types/currencies';

export const fetchCurrencies =
  (limit: number, offset: number) => async (dispatch: Dispatch<UploadCurrenciesAction>) => {
    const response = await getCurrencies(limit, offset);
    const currencies: ICurrency[] = response.data.data;
    dispatch({ type: CurrenciesActionTypes.UPLOAD_CURRENCIES, payload: currencies });
  };
