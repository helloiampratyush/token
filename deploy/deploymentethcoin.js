const { verify } = require("../utils/verify");
const { ethers, network } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log("trying to deploy crypto currency");
  const f3 = await deploy("cryptoCurrency", {
    from: deployer,
    log: true,
    args: [],
  });
  console.log("your contract is successfully deployed");
  console.log("time to verify ");
  const chainId = network.config.chainId;
  if (chainId == "11155111") {
    await verify(f3.address, []);
  }
  console.log("your contract has been verified successfully");
};
module.exports.tags = ["ethCoin", "all"];
