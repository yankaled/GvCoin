import web3 from './web3';
import compiledGvCoin from './build/GvCoin.json';

const instance = new web3.eth.Contract(
  JSON.parse(compiledGvCoin.interface),
  '0x67003aE3E2c33B68d6C8a5947131B569af8a7916'
);

export default instance;
