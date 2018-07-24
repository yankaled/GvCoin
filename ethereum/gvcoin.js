import web3 from './web3';
import NOME from './build/GvCoin.json'; //REvER

const instance = new web3.eth.Contract(
    //REVER
  JSON.parse(NOME.interface),
  'COLOCAR CONTA AQUI'
);

export default instance;
