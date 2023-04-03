import "./WithdrawText.css";
import React from 'react';
import { useApp } from "../../../contexts/AppContext";

/**@info Component in charge of rendering the user's current withdrawal balance */

function WithdrawText() {

    const { amountToWithdraw } = useApp();

  return (
    <div className="WithdrawText-position">
        <div>
            <b>Your total balance to withdraw from Beefy Finance is</b>
        </div>
        <div className="WithdrawText-value">
            {`${amountToWithdraw}`}
        </div>
        <div className="WithdrawText-token">
            Vault Token
        </div>
    </div>
  )
}

export default WithdrawText;
