const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} = require('./compile.js');

//First parameter is security encode
//second parameter is key from infura
//infura gives a link to connect to rinkyby testnet
const provider = new HDWalletProvider(
  'wine across script bachelor forward hair escape battle helmet arena giggle pelican',
  'https://rinkeby.infura.io/v3/7c1cf64f1b0d46b288836bbcf88319d0'
);

const web3 = new Web3(provider);

const deploy = async () =>{
  const accounts = await web3.eth.getAccounts();
  //get account function help us to get all the account from metamask
  console.log(accounts);
}

deploy();
