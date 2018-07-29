const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledGvCoin = require('./build/GvCoin.json');

const provider = new HDWalletProvider(
  'manual round arrive spy load gospel spy violin close distance rookie banana',
  'https://rinkeby.infura.io/v3/7c5f1d509fe64238befbf589c3a386ed'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Deploy da conta: ', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledGvCoin.interface)
  )
    .deploy({ data: compiledGvCoin.bytecode })
    .send({ gas: '2000000', from: accounts[0] });

  console.log('Deploy do contrato em: ', result.options.address);
};
deploy();
