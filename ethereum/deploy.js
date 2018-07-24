const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/GvCoin.json'); //SETAR NOME DA COOOIN

const provider = new HDWalletProvider(
  'call glow acoustic vintage front ring trade assist shuffle mimic volume reject',
  'https://rinkeby.infura.io/v3/7c5f1d509fe64238befbf589c3a386ed'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Deploy da conta: ', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(NOME.interface) //REVER
  )
    .deploy({ data: NOME.bytecode }) //REVER
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Deploy do contrato em: ', result.options.address);
};
deploy();
