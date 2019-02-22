const etherlime = require('etherlime');
const CryptoCollectibnle = require('../build/CryptoCollectible.json');

describe('Crypto Collectible Test', async () => {
	let deployer;
	let deployedContractWrapper;
	let deployedContract;
	let zeroAccount;
	before(async () => {
		deployer = new etherlime.EtherlimeGanacheDeployer();
		deployedContractWrapper = await deployer.deploy(CryptoCollectibnle);
		deployedContract = deployedContractWrapper.contract
		zeroAccount = accounts[0].signer.address;
	});


	it('account should have zero tokens', async () => {
		const currentAccountBalance = await deployedContract.balanceOf(zeroAccount);
		assert(currentAccountBalance.eq(0), 'The accout balance is NOT zero');
	});

	it('account should have one tokens', async () => {
		await deployedContract.mint();
		const currentAccountBalance = await deployedContract.balanceOf(zeroAccount);
		assert(currentAccountBalance.eq(1), 'The accout balance is NOT one');
	});
})