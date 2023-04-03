import "./WithoutWallet.css"
import React from 'react';
import Card from 'react-bootstrap/Card';

/**@info Component in charge of rendering an information message for the user to connect their wallet */

function WithoutWallet() {

    return (
        <Card>
            <Card.Body className="message-style">
                <img
                    alt="metamask-logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
                    className="metamask-logo"
                />
                Please connect your Wallet!
            </Card.Body>
        </Card>
    )
}

export default WithoutWallet;
