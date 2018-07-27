import web3 from './web3';
import compiledGvCoin from './build/GvCoin.json';

const instance = new web3.eth.Contract(
  JSON.parse(compiledGvCoin.interface),
  '0x41Aa37ea9CfAe660965D801b26227B19233c6360'
);

export default instance;
