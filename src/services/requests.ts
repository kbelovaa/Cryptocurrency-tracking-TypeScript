import axios from 'axios';
import PATH from 'Constants/url';

export const getCurrency = (currencyId: string) => axios.get(`${PATH}/${currencyId}`);
export const getSomeCurrencies = (currencyIds: string) => axios.get(`${PATH}?ids=${currencyIds}`);
export const getTopCurrencies = () => axios.get(`${PATH}?limit=3`);
export const getCurrencies = (limit: number, offset: number) => axios.get(`${PATH}?limit=${limit}&offset=${offset}`);
export const getCurrencyChangesHistory = (currencyId: string) => axios.get(`${PATH}/${currencyId}/history?interval=d1`);
