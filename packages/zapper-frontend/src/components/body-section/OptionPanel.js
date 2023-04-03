import "./OptionPanel.css";
import React from 'react';
import WalletConnected from "./WalletConnected";
import WithoutWallet from "./WithoutWallet";
import { useApp } from "../../contexts/AppContext";

/**@info Component in charge of rendering the card component depending on whether the user's wallet is connected or not */

function OptionPanel() {

    const { isConnected } = useApp();

    return (
        <div className="container text-center Panel-size">
            <div className="row align-items-center">
                {
                    isConnected ?
                    <div className="effect-WalletConnected">
                        <WalletConnected/>
                    </div> :
                    <div className="effect-WithoutWallet">
                        <WithoutWallet/>
                    </div>
                }
            </div>
        </div>
    )
}

export default OptionPanel;
