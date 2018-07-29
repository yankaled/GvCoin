import web3 from './web3';
import compiledGvCoin from './build/GvCoin.json';

const instance = new web3.eth.Contract(
  JSON.parse(compiledGvCoin.interface),
  '0x6CFFE0495Fb456EF2263429371A009bC39ef4cC9'
);

export default instance;
