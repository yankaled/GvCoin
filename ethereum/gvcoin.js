import web3 from './web3';
import compiledGvCoin from './build/GvCoin.json';

const instance = new web3.eth.Contract(
  JSON.parse(compiledGvCoin.interface),
  '0x4d374B5c538Abea5bC4cC024B2510fbD78DB75a4'
);

export default instance;
