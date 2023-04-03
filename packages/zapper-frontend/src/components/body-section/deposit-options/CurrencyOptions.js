import "./CurrencyOptions.css";
import React from 'react';
import { useApp } from "../../../contexts/AppContext";

/**@info Component in charge of managing which tokens the user will use to deposit */

function CurrencyOptions() {

    const { currency, setCurrency } = useApp();

    const options = [
        {
            id: 0,
            name: "MATIC",
        },
        {
            id: 1,
            name: "WMATIC",
        }
    ]

    return (
        <div className="row currency-options-total-position">
            {
                options.map( opt => (
                    <div
                        key={opt.id}
                        className="col-6"
                    >
                        <input
                            checked={ currency === opt.id }
                            class="form-check-input"
                            type="radio"
                            name="CurrencyRadio"
                            id={`${opt.name} ${opt.id}`}
                            onClick={() => {
                                setCurrency(opt.id);
                            }}
                        />
                        <label
                            class="form-check-label
                            currency-options-label-position"
                            for={`${opt.name} ${opt.id}`}
                        >
                            {opt.name}
                        </label>
                    </div>
                ))
            }
        </div>
    )
}

export default CurrencyOptions;
