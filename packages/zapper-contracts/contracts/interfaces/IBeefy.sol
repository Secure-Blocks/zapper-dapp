//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IBeefy {

    //view functions
    function want() external view returns (IERC20);
    function balance() external view returns (uint256);
    function balanceOf(address _user) external view returns (uint256);
    function totalSupply() external view returns (uint256);
    function getPricePerFullShare() external view returns (uint256);
    function strategy() external view returns (address);

    //use functions
    function deposit(uint256 _amount) external;
    function withdraw(uint256 _shares) external;
}
