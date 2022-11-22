import React, { FC, useContext } from 'react';
import useActions from 'Hooks/useActions';
import ModalsContext from 'Context/ModalsContext';
import { Currency } from 'Types/currencies';
import './AddingButton.scss';

const AddingButton: FC<Currency> = ({ currency }) => {
  const { makeTemporaryChoiceAction } = useActions();

  const context = useContext(ModalsContext);

  const markCurrency = (): void => {
    makeTemporaryChoiceAction(currency.id);
    if (context !== null) {
      context.setIsInputModalOpen(true);
    }
  };

  return (
    <button onClick={markCurrency} className="btn-add">
      +
    </button>
  );
};

export default AddingButton;
