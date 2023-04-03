//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/**
    @title Zapper Contract
    @author ljrr3045
    @notice Contract created to invest in Beefy Finance Vaults, all in a single transaction from MATIC or WMATIC.
*/

import "./interfaces/IBeefy.sol";
import "./utils/Swapper.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Zapper is Swapper {

    IBeefy public vaultContract;
    IERC20 public liquidityToken;

//Events

    event userDeposit(address _user, uint _amount, uint _date);
    event userWithdraw(address _user, uint _amount, uint _date);

//Mappins

    ///@dev Stores the amount of Vault Token that the user has deposited.
    mapping (address => uint) internal _userBalance;

//Modifiers

    /**
        @dev Verify if the user approved the contract to use an amount greater than or equal to the amount
        he wishes to invest in WMATIC
    */
    modifier checkToDepositWithWmatic(uint _amount) {
        uint _allowedBalance = IERC20(wMatic).allowance(msg.sender, address(this));
        require(
            _allowedBalance >= _amount,
            "Zapper: The amount exceeds the allowed balance"
        );
        _;
    }

    /**
        @dev Check if the user has previously invested from the contract and check if they have funds to withdraw
    */
    modifier checkToWithdraw(){
        require(
            _userBalance[msg.sender] > 0,
            "Zapper: User has no funds to withdraw"
        );
        _;
    }

//Constructor

    /**
        @param _vaultContract Address of the Beefy Finance Vault to be used
        @param _wMatic WMATIC address in the network used
        @param _token1 Address of the first token to use in the token pair
        @param _token2 Address of the second token to use in the token pair
        @param _routerV2 Uniswap Router V2 address (or its forks)
    */
    constructor(
        address _vaultContract,
        address _wMatic,
        address _token1,
        address _token2,
        address _routerV2
    ) Swapper (
        _wMatic,
        _token1,
        _token2,
        _routerV2
    ) {

        vaultContract = IBeefy(_vaultContract);
        liquidityToken = vaultContract.want();

        require(
            address(liquidityToken) == _getPair(_token1, _token2),
            "Zapper: LP token is different from the token that the Vault uses"
        );
    }

//View Functions

    ///@dev Returns the balance that the user has invested in the Vault.
    function userBalance(address _user) external view returns(uint){
        return _userBalance[_user];
    }

//Use Functions

    ///@notice Function to invest in the Vault using MATIC
    function depositWithMatic() external payable{

        uint _liquidityAdded = _addLiquidityWithMatic();

        uint _balanceBeforeDeposit = vaultContract.balanceOf(address(this));

        liquidityToken.approve(address(vaultContract), _liquidityAdded);
        vaultContract.deposit(_liquidityAdded);

        uint _balanceAfterDeposit = vaultContract.balanceOf(address(this));

        uint _totalBalanceAddedForUser = _balanceAfterDeposit - _balanceBeforeDeposit;
        _userBalance[msg.sender] += _totalBalanceAddedForUser;

        emit userDeposit(msg.sender, _totalBalanceAddedForUser, block.timestamp);
    }

    ///@notice Function to invest in the Vault using WMATIC
    function depositWithWMatic(uint _amount) external checkToDepositWithWmatic(_amount){

        uint _liquidityAdded = _addLiquidityWithWmatic(_amount);

        uint _balanceBeforeDeposit = vaultContract.balanceOf(address(this));

        liquidityToken.approve(address(vaultContract), _liquidityAdded);
        vaultContract.deposit(_liquidityAdded);

        uint _balanceAfterDeposit = vaultContract.balanceOf(address(this));

        uint _totalBalanceAddedForUser = _balanceAfterDeposit - _balanceBeforeDeposit;
        _userBalance[msg.sender] += _totalBalanceAddedForUser;

        emit userDeposit(msg.sender, _totalBalanceAddedForUser, block.timestamp);
    }

    ///@notice Function to withdraw the user's funds from the Vault and return the money in WMATIC.
    function withdraw() external checkToWithdraw{

        uint _balanceToWithdraw = _userBalance[msg.sender];
        _userBalance[msg.sender] = 0;

        vaultContract.withdraw(_balanceToWithdraw);
        uint _balanceForUser = liquidityToken.balanceOf(address(this));

        _removeLiquidityAndSwap(_balanceForUser);

        emit userWithdraw(msg.sender, _balanceToWithdraw, block.timestamp);
    }
}
