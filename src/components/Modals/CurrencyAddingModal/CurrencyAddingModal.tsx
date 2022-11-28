import React, { FC, useState, useContext } from 'react';
import useTypedSelector from 'Hooks/useTypedSelector';
import useActions from 'Hooks/useActions';
import { IAddedCurrency } from 'Types/portfolio';
import { ICurrency } from 'Types/currencies';
import ModalsContext from 'Context/ModalsContext';
import { getCurrency } from 'Services/requests';
import './CurrencyAddingModal.scss';

const CurrencyAddingModal: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const context = useContext(ModalsContext);

  const { addCurrencyAction } = useActions();

  const selectedCurrencies = useTypedSelector<IAddedCurrency[]>((state) => state.addedCurrencies.addedCurrencies);
  const temporaryChoice = useTypedSelector<string>((state) => state.addedCurrencies.temporaryChoice);

  const fetchData = async () => {
    const response = await getCurrency(temporaryChoice);
    return response.data.data;
  };

  const addCurrency = async (e: React.FormEvent<HTMLFormElement>, number: number) => {
    e.preventDefault();
    if (number > 0) {
      const currency: ICurrency = await fetchData();
      const price = currency.priceUsd;
      const day: Date = new Date();
      addCurrencyAction({ id: temporaryChoice, quantity: number, firstPrice: price, date: day.getTime() });
      localStorage.setItem(
        'selectedCurrencies',
        JSON.stringify([
          ...selectedCurrencies,
          {
            id: temporaryChoice,
            quantity: number,
            firstPrice: price,
            date: day.getTime(),
          },
        ])
      );
    }
    setInputValue('');
    if (context !== null) {
      context.setIsInputModalOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[\d.,]*$/.test(e.target.value)) {
      if (
        (/[.,]/.test(e.target.value.slice(-1)) && /[.,]/.test(e.target.value.slice(0, -1))) ||
        /[.,]/.test(e.target.value.slice(0, 1))
      ) {
        return;
      }
      setInputValue(e.target.value);
    }
  };

  return (
    <form
      className="adding__form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => addCurrency(e, Number(inputValue.replaceAll(',', '.')))}
    >
      <label className="adding__label" htmlFor="crypto-amount">
        Enter the amount of cryptocurrency
      </label>
      <input
        onChange={handleInputChange}
        value={inputValue}
        className="adding__input"
        type="text"
        id="crypto-amount"
        autoComplete="off"
        required
      />
      <input className="adding__btn" type="submit" value="Add to portfolio" />
    </form>
  );
};

export default CurrencyAddingModal;
