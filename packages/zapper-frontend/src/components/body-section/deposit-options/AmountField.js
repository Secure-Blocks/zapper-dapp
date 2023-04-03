import "./AmountField.css";
import React from 'react';
import { useApp } from "../../../contexts/AppContext";

/**@info Component in charge of reading and managing the deposit amounts to be used by the user */

function AmountField() {

    const { setDepositAmount } = useApp();

    const handleChange = event => {
        setDepositAmount(event.target.value);
    };

    return (
        <div>
            <input
                className="form-control form-control-lg AmountField-position"
                type="number"
                placeholder="Amount"
                aria-label="Amount"
                min={1}
                onChange={handleChange}
            />
        </div>
    )
}

export default AmountField;
