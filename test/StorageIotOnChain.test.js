const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

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
  it('Deploy a contract', () => {
    assert.ok(storageIotOnChain.options.address);
  });

  it('Has a default num', async () => {
    const num = await storageIotOnChain.methods.testNum().call();
    assert.equal(num, 0);
  });

  it('Can change num', async () => {
    await storageIotOnChain.methods.setter(100).send({ from: accounts[0] });
    const num = await storageIotOnChain.methods.testNum().call();
    assert.equal(num, 100);
  });
});
