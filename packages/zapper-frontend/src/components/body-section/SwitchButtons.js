import "./SwitchButtons.css";
import React from 'react';
import { useApp } from "../../contexts/AppContext";

/**@info Component in charge of managing user actions (deposit or withdrawal) */

function SwitchButtons() {

    const { userAction, setUserAction } = useApp();

    const buttonOptions = [
        {
            id: 0,
            text: "Deposit"
        },
        {
            id: 1,
            text: "Withdraw"
        }
    ]

    return (
        <div className="row align-items-center">
            {
                buttonOptions.map( option => (
                    <div
                        key={option.id}
                        className={userAction === option.id ? "col-6 option-box-style-active" : "col-6 option-box-style-deactivate"}
                        onClick={()=>{
                            setUserAction(option.id);
                        }}
                    >
                        { option.text }
                    </div>
                ))
            }
        </div>
    )
}

export default SwitchButtons;
