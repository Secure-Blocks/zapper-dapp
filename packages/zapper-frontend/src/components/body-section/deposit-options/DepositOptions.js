import "./DepositOptions.css";
import React from 'react';
import CurrencyOptions from "./CurrencyOptions";
import AmountField from "./AmountField";
import ButtonsActions from "./ButtonsActions";

/**@info Component in charge of rendering everything related to the deposit of funds */

function DepositOptions() {
  return (
    <div>
        <CurrencyOptions/>
        <AmountField/>
        <ButtonsActions/>
    </div>
  )
}

export default DepositOptions;
