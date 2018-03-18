let EthTipJar = artifacts.require("./EthTipJar.sol");

module.exports = function(deployer) {
  deployer.deploy(EthTipJar);
};
