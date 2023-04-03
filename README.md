# Zapper Monorepo

This Monorepo contains everything related to the Zapper Dapp project.

This project consists of a Dapp which will invest in Beefy Finance Vaults. In this Monorepo you can find the "zapper-contracts" folder which contains all the development of Smart Contracts and the "zapper-frontend" folder which contains all the Dapp Frontend

- Project Links:
* [Dapp on Netlify](https://zapper-dapp-by-ljrr3045.netlify.app/)
* [Smart contracts in polygon](https://polygonscan.com/address/0x293f3170955446bf49f07af90538fb5439a6a881#code)

- Notes:

This project makes use of the Beefy Finance Vault https://app.beefy.finance/vault/sushi-poly-usdc-eth

## Getting started

The first step is to clone this repository:
```
# Get the latest version of the project
git clone https://github.com/Ljrr3045/zapper-monorepo.git

# Change to home directory
cd zapper-monorepo
```

To install all package dependencies run:
```
# Install all dependencies
npm run bootstrap
```

This will install all packages in the monorepo as well as all the packages.

## Smart contracts

- Address on Polygon: 0x293f3170955446BF49F07af90538fb5439A6a881

### Technologies and protocols used

This project uses the following technologies and protocols:
* [Solidity](https://docs.soliditylang.org/en/v0.8.17/)
* [Hardhat](https://hardhat.org/docs)
* [OpenZeppelin](https://docs.openzeppelin.com/)
* [Beefy Finance](https://docs.beefy.finance/)
* [Polygon](https://bscscan.com/)

### Documentation

The information on smart contracts can be found at the following link:
* [Documentation](https://github.com/Ljrr3045/zapper-monorepo/tree/master/packages/zapper-contracts/docs/index.md)

### Useful commands

```
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test (or npx hardhat coverage)

# Run local node
npm run run:node

# Run deploy script
npm run contract:deploy

# Generate documentation
npx hardhat docgen
```

## Frontend

### Technologies used

This project uses the following technologies:
* [React.js](https://reactjs.org/docs/getting-started.html)
* [Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
* [Sass](https://sass-lang.com/documentation/)
* [Ethers.js](https://docs.ethers.io/v5/)

### Useful commands

```
# Runs the app in the development mode
npm start

# Launches the test runner in the interactive watch mode
npm test

# Builds the app for production to the `build` folder
npm run build

# Compile Bootstrap's SCSS to CSS
npx run sass:compile
```



