const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(
  __dirname,
  'contracts',
  'StorageIotOnChain.sol'
);
const source = fs.readFileSync(contractPath, 'utf8');

module.exports = JSON.parse(
  solc.compile(
    JSON.stringify({
      language: 'Solidity',
      sources: {
        'StorageIotOnChain.sol': {
          content: source,
        },
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['metadata', 'evm.bytecode', 'evm.bytecode.sourceMap'],
          },
          def: {
            StorageIotOnChain: ['abi', 'evm.bytecode.opcodes'],
          },
        },
      },
    })
  )
).contracts['StorageIotOnChain.sol'];

// console.log(JSON.parse(solc.compile(JSON.stringify({
//   language: 'Solidity',
//   sources: {
//     'lottery.sol': {
//       content: source,
//     },
//   },
//   settings: {
//     outputSelection: {
//       '*': {
//         '*': ['evm', 'bytecode'],
//       },
//     },
//   },
// }))).contracts['StorageIotOnChain.sol'].StorageIotOnChain);
