import { useEffect } from 'react';
import useActions from 'Hooks/useActions';
import useTypedSelector from 'Hooks/useTypedSelector';
import { ICurrency } from 'Types/currencies';

const usePagination = (pageNumber: number) => {
  const { fetchCurrencies } = useActions();

  const currencies = useTypedSelector<ICurrency[]>((state) => state.currencies.currencies);

  const currenciesPerPage = 10;
  const lastCurrencyIndex: number = pageNumber * currenciesPerPage;
  const firstCurrencyIndex: number = lastCurrencyIndex - currenciesPerPage;
  const currentCurrencies: ICurrency[] = currencies.filter(
    (currencyObj: ICurrency) =>
      Number(currencyObj.rank) > firstCurrencyIndex && Number(currencyObj.rank) <= lastCurrencyIndex
  );

  useEffect(() => {
    if (currentCurrencies.length === 0) {
      fetchCurrencies(currenciesPerPage, firstCurrencyIndex);
    }
  }, [pageNumber]);

  return { currentCurrencies, currenciesPerPage };
};

export default usePagination;
