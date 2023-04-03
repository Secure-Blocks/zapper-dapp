import "./WithdrawButton.css";
import React from 'react';
import { useApp } from "../../../contexts/AppContext";

/**@info Component in charge of rendering an information message for the user to connect their wallet */

function WithdrawButton() {

    const { WithdrawBalance, amountToWithdraw } = useApp();

    return (
        <div className="row WithdrawButton-position">
            <button
                className="btn btn-primary WithdrawButton-size-matic"
                type="button"
                onClick={WithdrawBalance}
                disabled={amountToWithdraw === 0}
            >
                Withdraw All
            </button>
        </div>
    )
}

export default WithdrawButton;
