const {ethers} = require("hardhat");

async function main() {

    const VaultContract = "0xE4DB97A2AAFbfef40D1a4AE8B709f61d6756F8e1"; //USDC-ETH
    const WMatic = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
    const Token1 = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; //USDC
    const Token2 = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"; //WETH
    const SushiSwapRouterV2 = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";

    const Zapper = await ethers.getContractFactory("Zapper");
    const zapper = await Zapper.deploy(
        VaultContract,
        WMatic,
        Token1,
        Token2,
        SushiSwapRouterV2
    );

    console.log("Contract deployed to:", zapper.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
