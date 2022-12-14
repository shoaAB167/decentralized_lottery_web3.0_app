//get the 12 character string from metamask and link from infurs
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} = require('./compile.js');

//First parameter is security encode
//second parameter is key from infura
//infura gives a link to connect to rinkyby testnet
const provider = new HDWalletProvider(
  '//provide private mnemonics here',
  '//provide infura URL here'
);

const web3 = new Web3(provider);

const deploy = async () =>{
  const accounts = await web3.eth.getAccounts();
  //get account function help us to get all the account from metamask
  console.log('Contract is deployed by the manager with address',accounts[0]);
 // 0x29128b1681e61Db941634fFa8AbD7E9DEf11B911
  const result = await new web3.eth.Contract(JSON.parse(interface))//this contract(interface abi) need bytecode for deploy
  .deploy({data : '0x' + bytecode})//bytecode
  .send({gas : '2000000', from : accounts[0]});//sendong gas fee
  console.log('Contract deployed to address', result.options.address);
  // 0x980CcE56928676Ed367E4b0a33Bc6D4dbba57E8e
}

deploy();
