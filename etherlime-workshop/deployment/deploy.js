const etherlime = require('etherlime');
const LimeFactory = require('../build/LimeFactory.json');
const CryptoCollectible = require('../build/CryptoCollectible.json');


const deploy = async (network, secret) => {

	const localDeployer = new etherlime.EtherlimeGanacheDeployer();
	const deployedContractWrapper = await localDeployer.deploy(LimeFactory);
	const apiKey = '3801387aad28485289aa7caf07bda48a'
	const deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network, apiKey);
	const deployedContractWrapper = await deployer.deploy(CryptoCollectible);
	const deployedContract = deployedContractWrapper.contract;
	const mintTransaction = await deployedContract.mint();
	const secondMintTransaction = await deployedContract.mint();
	await deployedContractWrapper.verboseWaitForTransaction(mintTransaction, 'First Minted Token');
	await deployedContractWrapper.verboseWaitForTransaction(secondMintTransaction, 'First Minted Token');


};

module.exports = {
	deploy
};