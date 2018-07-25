import web3 from './web3';
import compiledGvCoin from './build/GvCoin.json';

const instance = new web3.eth.Contract(
    //REVER
  JSON.parse(compiledGvCoin.interface),
  process.env.MN
);

export default instance;
