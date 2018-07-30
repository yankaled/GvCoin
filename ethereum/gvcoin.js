import web3 from './web3';
import compiledGvCoin from './build/GvCoin.json';

const instance = new web3.eth.Contract(
  JSON.parse(compiledGvCoin.interface),
  '0x1069579775aD93549B5F22e5104F2aD0c3ad84C5'
);

export default instance;
