import "./ButtonsActions.css";
import React from 'react';
import { useApp } from "../../../contexts/AppContext";

/**@info Component in charge of rendering the buttons with which the user will make the deposit actions */

function ButtonsActions() {

    const {
        currency,
        depositWithMatic,
        approveWmatic,
        depositWithWmatic,
        depositAmount,
        approveAmount
    } = useApp();

    const wMaticSteps = [
        {
            id: 0,
            step: "Approve",
            action: approveWmatic,
            disabled: !(depositAmount > 0)
        },
        {
            id: 1,
            step: "Deposit",
            action: depositWithWmatic,
            disabled: !(approveAmount > 0 && depositAmount > 0 && approveAmount >= depositAmount)
        }
    ]

    if(currency === 0){
        return (
            <div className="row ButtonsActions-position">
                <button
                    className="btn btn-primary ButtonsActions-size-matic"
                    type="button"
                    onClick={depositWithMatic}
                    disabled={!(depositAmount > 0)}
                >
                    Deposit
                </button>
            </div>
        )
    }

    if(currency === 1){
        return (
            <div className="ButtonsActions-position">
                {
                    wMaticSteps.map( step => (
                        <button
                            key={step.id}
                            type="button"
                            className="btn btn-primary ButtonsActions-size-wmatic"
                            onClick={step.action}
                            disabled={step.disabled}
                        >
                            {step.step}
                        </button>
                    ))
                }
            </div>
        )
    }
}

export default ButtonsActions
