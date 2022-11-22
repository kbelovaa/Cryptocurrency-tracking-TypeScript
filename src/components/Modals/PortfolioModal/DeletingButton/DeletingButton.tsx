import React, { FC } from 'react';
import useActions from 'Hooks/useActions';
import useTypedSelector from 'Hooks/useTypedSelector';
import { IAddedCurrency } from 'Types/portfolio';
import './DeletingButton.scss';

interface DeletingButtonProps {
  currencyDate: number;
}

const DeletingButton: FC<DeletingButtonProps> = ({ currencyDate }) => {
  const { deleteCurrencyAction } = useActions();

  const selectedCurrencies = useTypedSelector<IAddedCurrency[]>((state) => state.addedCurrencies.addedCurrencies);

  const deleteCurrency = () => {
    deleteCurrencyAction(currencyDate);
    localStorage.setItem(
      'selectedCurrencies',
      JSON.stringify(selectedCurrencies.filter((oneOfCurrency: IAddedCurrency) => oneOfCurrency.date !== currencyDate))
    );
  };

  return (
    <button onClick={deleteCurrency} className="btn-delete">
      -
    </button>
  );
};

export default DeletingButton;
