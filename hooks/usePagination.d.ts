import { ICurrency } from 'Types/currencies';
declare const usePagination: (pageNumber: number) => {
    currentCurrencies: ICurrency[];
    currenciesPerPage: number;
};
export default usePagination;
