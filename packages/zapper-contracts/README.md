# Zapper Contracts

Contracts designed to interact with the Beefy Finance protocol and automatically invest in Vaults.

## Technologies and protocols used

This repository uses the following technologies and protocols:
* [Solidity](https://docs.soliditylang.org/en/v0.8.17/)
* [Hardhat](https://hardhat.org/docs)
* [OpenZeppelin](https://docs.openzeppelin.com/)
* [Beefy Finance](https://docs.beefy.finance/)
* [Polygon](https://bscscan.com/)

## Documentation

The information on smart contracts can be found at the following link:
* [Documentation](https://github.com/Ljrr3045/zapper-monorepo/tree/master/packages/zapper-contracts/docs/index.md)

## Useful commands

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

## Connect with Hardhat Fork

To connect to the Hardhat Fork on the LocalHost, you must follow the steps below:
```
# Start the LocalHost
npm run run:node

# Deploy smart contracts
npm run contract:deploy
```
Once this is done, you will need to configure the LocalHost network in your Metamask with the address: http://127.0.0.1:8545/

You must also add one of the accounts provided by Hardhat to your metamask in order to have a balance and be able to interact with the Dapp.
```
# Add the private key of one of the addresses in your metamask
Private Key: <PRIVATE KEY>
```
