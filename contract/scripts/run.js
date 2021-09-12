/**
 * * Script to run the contract
 * * @param {string} [network] - Network to deploy to
 * * => const [owner, randoPerson] = await hrs.ethers.getSigners();
 * *	1. In order to deploy to a network, you need to have a wallet
 * * 	2. Grab the signers from the wallet, and a random person
 */

async function main() {
	const [owner, randoPerson] = await hre.ethers.getSigners();
	// compile the contract and generate files we need to work with
	// our contract under the artifacts dir.
	const waveContractFactory = await hre.ethers.getContractFactory(
		'WavePortal'
	);

	// hardhat creates a local Ethereum network, just for the WavePortal contract
	// after the script is run, the local network is destroyed
	// everytime you run the script, it'll be a fresh blockchain
	// this is a good way to test your code

	// const waveContract = await waveContractFactory.deploy();

	const waveContract = await waveContractFactory.deploy({
		value: hre.ethers.utils.parseEther('1000'),
	});

	// wait until the contract is deployed to local blockchain
	// contract constructor runs when deployed
	await waveContract.deployed();

	// get the deployed contract address
	// This address is how we actually find our contract
	// on the blockchain
	// console.log(`Deployed WavePortal at ${waveContract.address}`);

	console.log('Contract Deployed to: ', waveContract.address);
	console.log('Contract Deployed by: ', owner.address);

	let contractBalance = await hre.ethers.provider.getBalance(
		waveContract.address
	);
	console.log(
		'Contract Balance: ',
		hre.ethers.utils.formatEther(contractBalance)
	);

	let waveCount = await waveContract.getTotalWaves();
	console.log('Total Waves: ', waveCount.toNumber());

	let waveTxn = await waveContract.wave('A message!');
	await waveTxn.wait(); // wait for the transaction to be mined

	contractBalance = await hre.ethers.provider.getBalance(
		waveContract.address
	);
	console.log(
		'Contract Balance: ',
		hre.ethers.utils.formatEther(contractBalance)
	);

	waveTxn = await waveContract.wave('Another message!');
	await waveTxn.wait(); // wait for the transaction to be mined

	contractBalance = await hre.ethers.provider.getBalance(
		waveContract.address
	);
	console.log(
		'Contract Balance: ',
		hre.ethers.utils.formatEther(contractBalance)
	);

	let allWaves = await waveContract.getAllWaves();
	console.log(allWaves);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
