import axios from 'axios';
import PATH from 'Constants/url';

export const getCurrencies = () => axios.get(PATH);
export const getCurrencyChangesHistory = (currencyId: string) => axios.get(`${PATH}/${currencyId}/history?interval=d1`);
