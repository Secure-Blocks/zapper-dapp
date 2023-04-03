import "./WalletButton.css";
import React from 'react';
import { useApp } from "../../contexts/AppContext";

/**@info Component that handles everything related to connecting with the RPC provider (Metamask) */

function WalletButton() {

    const {buttonText, connectWallet} = useApp();

    return (
        <>
            <button
                className="btn btn-outline-primary"
                type="button"
                onClick={connectWallet}
            >
                { buttonText }
            </button>
        </>
    )
}

export default WalletButton;
