const { expect } = require("chai");
const { ethers } = require("hardhat");
const Erc20Abi = require("./ContractJson/Erc20.json");

describe("Zapper USDC-ETH", function () {

    const sushiSwapRouterV2 = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
    let Zapper, zapper, vaultContract, wMatic, token1, token2, liquidityToken, user1, user2, user3, impersonalAccount;

    before(async ()=> {
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: ["0xfffbcd322ceace527c8ec6da8de2461c6d9d4e6e"],
        });

        [user1, user2, user3] = await ethers.getSigners();
        impersonalAccount = await ethers.getSigner("0xfffbcd322ceace527c8ec6da8de2461c6d9d4e6e"); //user with WMatic

        vaultContract = await new ethers.Contract( "0xE4DB97A2AAFbfef40D1a4AE8B709f61d6756F8e1" , Erc20Abi );
        wMatic = await new ethers.Contract( "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" , Erc20Abi );
        token1 = await new ethers.Contract( "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" , Erc20Abi ); //USDC
        token2 = await new ethers.Contract( "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619" , Erc20Abi ); //WETH
        liquidityToken = await new ethers.Contract( "0x34965ba0ac2451A34a0471F04CCa3F990b8dea27" , Erc20Abi );

        Zapper = await ethers.getContractFactory("Zapper");
        zapper = await Zapper.deploy(
            vaultContract.address,
            wMatic.address,
            token1.address,
            token2.address,
            sushiSwapRouterV2
        );

        await network.provider.send("hardhat_setBalance", [
            impersonalAccount.address,
            ethers.utils.formatBytes32String("5000000000000000000"),
        ]);

        await wMatic.connect(impersonalAccount).transfer(user2.address, ethers.utils.parseEther("1000"));
    });

    describe("Deposit With Matic", async ()=> {

        it("User should deposit", async ()=> {

            let _userBalanceBefore = await ethers.provider.getBalance(user1.address);
            await zapper.connect(user1).depositWithMatic({ value: ethers.utils.parseEther("100") })
            let _userBalanceAfter = await ethers.provider.getBalance(user1.address);

            expect(_userBalanceBefore).to.be.above(_userBalanceAfter);
            expect(await zapper.connect(user1).userBalance(user1.address)).to.equal("799373024608");
        });

        it("Zapper should not keep funds", async ()=> {

            expect(await ethers.provider.getBalance(zapper.address)).to.equal(0);
            expect(await token1.connect(user1).balanceOf(zapper.address)).to.equal(0);
            expect(await token2.connect(user1).balanceOf(zapper.address)).to.equal(0);
            expect(await liquidityToken.connect(user1).balanceOf(zapper.address)).to.equal(0);
        });

        it("Zapper should return the surplus to the user", async ()=> {

            expect(await token1.connect(user1).balanceOf(user1.address)).to.equal(2);
            expect(await token2.connect(user1).balanceOf(user1.address)).to.equal(0);
        });

        it("Zapper should invest in the Vault", async ()=> {

            expect(await vaultContract.connect(user1).balanceOf(zapper.address)).to.equal("799373024608");
        });
    });

    describe("Deposit With WMatic", async ()=> {

        it("Error: If it is not approved the user cannot deposit", async ()=> {
            await expect(zapper.connect(user2).depositWithWMatic(
                ethers.utils.parseEther("100"))
            ).to.be.revertedWith("Zapper: The amount exceeds the allowed balance");
        });

        it("User should deposit", async ()=> {

            let _userBalanceBefore = await wMatic.connect(user2).balanceOf(user2.address);
            await wMatic.connect(user2).approve(zapper.address, ethers.utils.parseEther("100"));

            await zapper.connect(user2).depositWithWMatic(ethers.utils.parseEther("100"));
            let _userBalanceAfter = await wMatic.connect(user2).balanceOf(user2.address);

            expect(_userBalanceBefore).to.be.above(_userBalanceAfter);
            expect(await zapper.connect(user2).userBalance(user2.address)).to.equal("798751871473");
        });

        it("Zapper should not keep funds", async ()=> {

            expect(await wMatic.connect(user2).balanceOf(zapper.address)).to.equal(0);
            expect(await token1.connect(user2).balanceOf(zapper.address)).to.equal(0);
            expect(await token2.connect(user2).balanceOf(zapper.address)).to.equal(0);
            expect(await liquidityToken.connect(user2).balanceOf(zapper.address)).to.equal(0);
        });

        it("Zapper should return the surplus to the user", async ()=> {

            expect(await token1.connect(user2).balanceOf(user2.address)).to.equal(3);
            expect(await token2.connect(user2).balanceOf(user2.address)).to.equal(0);
        });

        it("Zapper should invest in the Vault", async ()=> {

            expect(await vaultContract.connect(user1).balanceOf(zapper.address)).to.equal("1598124896081");
        });
    });

    describe("Withdraw Matic", async ()=> {

        it("Error: If the user did not deposit, he cannot withdraw", async ()=> {

            await expect(zapper.connect(user3).withdraw()).to.be.revertedWith(
                "Zapper: User has no funds to withdraw"
            );
        });

        it("User 1 should be able to withdraw", async ()=> {

            expect(await wMatic.connect(user1).balanceOf(user1.address)).to.equal("60591825912360339313");
            await zapper.connect(user1).withdraw();

            expect(await wMatic.connect(user1).balanceOf(user1.address)).to.equal("159607744738093063167");
        });

        it("Zapper should have removed user 1 balance from the Vault", async ()=> {
            expect(await vaultContract.connect(user1).balanceOf(zapper.address)).to.equal("798751871473");
        });

        it("User 2 should be able to withdraw", async ()=> {

            expect(await wMatic.connect(user2).balanceOf(user2.address)).to.equal("1850988396755673177098");
            await zapper.connect(user2).withdraw();

            expect(await wMatic.connect(user2).balanceOf(user2.address)).to.equal("1949907167304866535122");
        });

        it("Zapper should have removed user 2 balance from the Vault", async ()=> {
            expect(await vaultContract.connect(user1).balanceOf(zapper.address)).to.equal(0);
        });

        it("Zapper should not keep funds", async ()=> {

            expect(await ethers.provider.getBalance(zapper.address)).to.equal(0);
            expect(await wMatic.connect(user1).balanceOf(zapper.address)).to.equal(0);
            expect(await token1.connect(user1).balanceOf(zapper.address)).to.equal(0);
            expect(await token2.connect(user1).balanceOf(zapper.address)).to.equal(0);
            expect(await liquidityToken.connect(user1).balanceOf(zapper.address)).to.equal(0);
        });

        it("Zapper should return the surplus to the user", async ()=> {

            expect(await token1.connect(user1).balanceOf(user1.address)).to.equal(2);
            expect(await token2.connect(user1).balanceOf(user1.address)).to.equal(0);

            expect(await token1.connect(user2).balanceOf(user2.address)).to.equal(3);
            expect(await token2.connect(user2).balanceOf(user2.address)).to.equal(0);
        });
    });
});
