import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import wMaticABI from "../contractsAbi/Erc20.json";
import zapperABI from "../contractsAbi/Zapper.json";

/**
 * TODO
 * @type {React.Context<{}>}
 */
export const AppContext = createContext({});

/**
 * TODO
 * @param children
 * @return {JSX.Element}
 * @constructor
*/
export const AppProvider = ({ children }) => {

    /**@dev Addresses of the contracts to use, in the polygon network */
    const wMaticAddress = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
    const zapperAddress = "0x293f3170955446BF49F07af90538fb5439A6a881";

//UseState

    //Wallet options
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [buttonText, setButtonText] = useState("Connect Wallet");

    //User method options
    const [userAction, setUserAction] = useState(0);

    //Deposit options
    const [currency, setCurrency] = useState(0);
    const [approveAmount, setApproveAmount] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);

    //Withdraw options
    const [amountToWithdraw, setAmountToWithdraw] = useState(0);

//Utility Functions

    /**@notice This function allows establishing communication with the RPC provider of the browser (Metamask) */
    const connectWallet = async () => {

        if(!isConnected){

            try {

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);

                setWalletAddress(accounts[0]);
                setButtonText(`${accounts[0].slice(0, 4)}...${accounts[0].slice(-4)}`);

                getVaultUserBalance(accounts[0]);

                setIsConnected(true);
            } catch (error) {

                alert("An error occurred connecting Metamask");
                setIsConnected(false);
            }
        }
    };

    /**@notice This function allows extracting the current value of the Vault Token that the user has within the contract */
    const getVaultUserBalance = async (_walletAddress) => {

        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();

            const zapper = new ethers.Contract(zapperAddress, zapperABI, signer);

            let _userBalance = await zapper.userBalance(_walletAddress);

            if(_userBalance > 0){
                setAmountToWithdraw(ethers.utils.formatEther(_userBalance));
            }
        } catch (error) {

            console.log("Error when get vault user balance: ", error);
        }
    }

    /**@notice This function allows you to deposit into the Beefy Finance Vault using MATIC */
    const depositWithMatic = async () => {

        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();

            const zapper = new ethers.Contract(zapperAddress, zapperABI, signer);
            await zapper.depositWithMatic({value: ethers.utils.parseEther(String(depositAmount))});

        } catch (error) {

            console.log("Error when depositing with MATIC: ", error);
        }
    }

    /**@notice This function allows to approve a quantity of WMATIC from the user to the Zapper contract */
    const approveWmatic = async () => {

        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();

            const wMatic = new ethers.Contract(wMaticAddress, wMaticABI, signer);
            await wMatic.approve(zapperAddress, ethers.utils.parseEther(String(depositAmount)));

            setApproveAmount(depositAmount);

        } catch (error) {

            console.log("Error when approve with MATIC: ", error);
        }
    }

    /**@notice This function allows you to deposit into the Beefy Finance Vault using WMATIC */
    const depositWithWmatic = async () => {

        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();

            const zapper = new ethers.Contract(zapperAddress, zapperABI, signer);
            await zapper.depositWithWMatic(ethers.utils.parseEther(String(depositAmount)));

            setApproveAmount(approveAmount - depositAmount);

        } catch (error) {

            console.log("Error when depositing with WMATIC: ", error);
        }
    }

    /**
     * @notice This function allows you to withdraw the entire balance of Vault Token from the contract and receive the
     * money in WMATIC
     */
    const WithdrawBalance = async () => {

        try {

            if(amountToWithdraw !== 0){

                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner();

                const zapper = new ethers.Contract(zapperAddress, zapperABI, signer);

                await zapper.withdraw();
            }
        } catch (error) {

            console.log("Error when withdraw balance: ", error);
        }
    }

//Return component
  return (
    <AppContext.Provider
      value={{
        isConnected,
        walletAddress,
        buttonText,
        connectWallet,
        userAction,
        setUserAction,
        currency,
        setCurrency,
        depositAmount,
        setDepositAmount,
        amountToWithdraw,
        approveAmount,
        setAmountToWithdraw,
        depositWithMatic,
        approveWmatic,
        depositWithWmatic,
        WithdrawBalance

      }}
    >
      {children}
    </AppContext.Provider>
  );

};

export const useApp = () => useContext(AppContext);
