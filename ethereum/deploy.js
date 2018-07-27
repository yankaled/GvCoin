const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledGvCoin = require('./build/GvCoin.json');

const provider = new HDWalletProvider(
  process.env.MN,
  process.env.INF
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Deploy da conta: ', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledGvCoin.interface)
  )
    .deploy({ data: compiledGvCoin.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Deploy do contrato em: ', result.options.address);
};
deploy();
