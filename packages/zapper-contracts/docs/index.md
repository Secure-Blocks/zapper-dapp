# Zapper

### vaultContract

```solidity
contract IBeefy vaultContract
```

### liquidityToken

```solidity
contract IERC20 liquidityToken
```

### userDeposit

```solidity
event userDeposit(address _user, uint256 _amount, uint256 _date)
```

### userWithdraw

```solidity
event userWithdraw(address _user, uint256 _amount, uint256 _date)
```

### _userBalance

```solidity
mapping(address => uint256) _userBalance
```

_Stores the amount of Vault Token that the user has deposited._

### checkToDepositWithWmatic

```solidity
modifier checkToDepositWithWmatic(uint256 _amount)
```

_Verify if the user approved the contract to use an amount greater than or equal to the amount
        he wishes to invest in WMATIC_

### checkToWithdraw

```solidity
modifier checkToWithdraw()
```

_Check if the user has previously invested from the contract and check if they have funds to withdraw_

### constructor

```solidity
constructor(address _vaultContract, address _wMatic, address _token1, address _token2, address _routerV2) public
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vaultContract | address | Address of the Beefy Finance Vault to be used |
| _wMatic | address | WMATIC address in the network used |
| _token1 | address | Address of the first token to use in the token pair |
| _token2 | address | Address of the second token to use in the token pair |
| _routerV2 | address | Uniswap Router V2 address (or its forks) |

### userBalance

```solidity
function userBalance(address _user) external view returns (uint256)
```

_Returns the balance that the user has invested in the Vault._

### depositWithMatic

```solidity
function depositWithMatic() external payable
```

Function to invest in the Vault using MATIC

### depositWithWMatic

```solidity
function depositWithWMatic(uint256 _amount) external
```

Function to invest in the Vault using WMATIC

### withdraw

```solidity
function withdraw() external
```

Function to withdraw the user's funds from the Vault and return the money in WMATIC.

# IBeefy

### want

```solidity
function want() external view returns (contract IERC20)
```

### balance

```solidity
function balance() external view returns (uint256)
```

### balanceOf

```solidity
function balanceOf(address _user) external view returns (uint256)
```

### totalSupply

```solidity
function totalSupply() external view returns (uint256)
```

### getPricePerFullShare

```solidity
function getPricePerFullShare() external view returns (uint256)
```

### strategy

```solidity
function strategy() external view returns (address)
```

### deposit

```solidity
function deposit(uint256 _amount) external
```

### withdraw

```solidity
function withdraw(uint256 _shares) external
```

# IUniswapV2Factory

### getPair

```solidity
function getPair(address token0, address token1) external view returns (address)
```

# IUniswapV2Pair

### token0

```solidity
function token0() external view returns (address)
```

### token1

```solidity
function token1() external view returns (address)
```

### getReserves

```solidity
function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)
```

### swap

```solidity
function swap(uint256 amount0Out, uint256 amount1Out, address to, bytes data) external
```

# IUniswapV2Router

### factory

```solidity
function factory() external pure returns (address)
```

### getAmountsOut

```solidity
function getAmountsOut(uint256 amountIn, address[] path) external view returns (uint256[] amounts)
```

### swapExactTokensForTokens

```solidity
function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline) external returns (uint256[] amounts)
```

### swapExactTokensForETH

```solidity
function swapExactTokensForETH(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline) external returns (uint256[] amounts)
```

### swapExactETHForTokens

```solidity
function swapExactETHForTokens(uint256 amountOutMin, address[] path, address to, uint256 deadline) external payable returns (uint256[] amounts)
```

### addLiquidity

```solidity
function addLiquidity(address tokenA, address tokenB, uint256 amountADesired, uint256 amountBDesired, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) external returns (uint256 amountA, uint256 amountB, uint256 liquidity)
```

### removeLiquidity

```solidity
function removeLiquidity(address tokenA, address tokenB, uint256 liquidity, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) external returns (uint256 amountA, uint256 amountB)
```

### addLiquidityETH

```solidity
function addLiquidityETH(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline) external payable returns (uint256 amountToken, uint256 amountETH, uint256 liquidity)
```

### removeLiquidityETH

```solidity
function removeLiquidityETH(address token, uint256 liquidity, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline) external returns (uint256 amountToken, uint256 amountETH)
```

# MathSqrt

### _getSwapAmount

```solidity
function _getSwapAmount(uint256 r, uint256 a) internal pure returns (uint256)
```

Function that calculates the most optimal amount to swap a pair of tokens.
        @dev It receives as a parameter the reserve amount of both tokens in the pool and returns the most
        optimal amount that should be swapped for tokenA.

### _sqrt

```solidity
function _sqrt(uint256 y) private pure returns (uint256 z)
```

Function to get the square root of a number.

# Swapper

### token1

```solidity
address token1
```

### token2

```solidity
address token2
```

### wMatic

```solidity
address wMatic
```

### routerV2

```solidity
contract IUniswapV2Router routerV2
```

### factoryV2

```solidity
contract IUniswapV2Factory factoryV2
```

### constructor

```solidity
constructor(address _wMatic, address _token1, address _token2, address _routerV2) public
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wMatic | address | WMATIC address in the network used |
| _token1 | address | Address of the first token to use in the token |
| _token2 | address | Address of the second token to use in the token pair |
| _routerV2 | address | Uniswap Router V2 address (or its forks) |

### _addLiquidityWithMatic

```solidity
function _addLiquidityWithMatic() internal returns (uint256 _liquidity)
```

Function to add liquidity to the pool, using MATIC.
        @dev This function swaps MATIC to Token1 and then calculates the optimal amount to swap from token1 to token2,
        finally adds liquidity to the pool.
        @dev Returns the amount of LP Token that was obtained in the operation.

### _addLiquidityWithWmatic

```solidity
function _addLiquidityWithWmatic(uint256 _amount) internal returns (uint256 _liquidity)
```

Function to add liquidity to the pool, using WMATIC.
        @dev This function swaps WMATIC to Token1 and then calculates the optimal amount to swap from token1 to token2,
        finally adds liquidity to the pool.
        @dev Returns the amount of LP Token that was obtained in the operation.

### _removeLiquidityAndSwap

```solidity
function _removeLiquidityAndSwap(uint256 _amount) internal
```

This function changes and removes funds from the pool (LP Token).
        @dev This function changes and returns all the money to the user in WMATIC.

### _swapMaticForToken

```solidity
function _swapMaticForToken(address _token, uint256 _amount) private
```

_Function to swap exactly MATIC for Token_

### _swapTokenForToken

```solidity
function _swapTokenForToken(address _tokenA, address _tokenB, uint256 _amount) private
```

_Function to swap exactly Token for Token_

### _getPair

```solidity
function _getPair(address _tokenA, address _tokenB) internal view returns (address)
```

_Returns the address of the LP Token contract of the token pair._

### _swapAmount

```solidity
function _swapAmount(address _tokenA, address _tokenB, uint256 _amount) private view returns (uint256 _swap)
```

_Returns the total amount to be swapped of TokenA to add liquidity in an equivalent way in the pool._

