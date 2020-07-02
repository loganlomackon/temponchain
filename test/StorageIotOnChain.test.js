const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const output = require('../compile');
const interface = JSON.parse(output.StorageIotOnChain.metadata).output.abi;
const bytecode = output.StorageIotOnChain.evm.bytecode.object;

//package.json: "test": "mocha"
//Command: npm run test

//Local test network
const web3 = new Web3(ganache.provider());

let accounts;
let storageIotOnChain;
beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  //Use one of accounts to deploy
  //Contract
  storageIotOnChain = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('StorageIotOnChain', () => {
  it('deploy a contract', () => {
    console.log(storageIotOnChain);
  });
});
