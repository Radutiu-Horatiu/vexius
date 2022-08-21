const Web3 = require('web3');

// Vexcoin ABI
const abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'itemId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'ownerId',
        type: 'string',
      },
    ],
    name: 'addNewItem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string',
      },
    ],
    name: 'addNewUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string',
      },
      {
        internalType: 'int256',
        name: 'amount',
        type: 'int256',
      },
    ],
    name: 'buyVexcoins',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'itemId',
        type: 'string',
      },
    ],
    name: 'getItem',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'ownerId',
            type: 'string',
          },
        ],
        internalType: 'struct Vexcoin.Item',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string',
      },
    ],
    name: 'getUser',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string',
          },
          {
            internalType: 'int256',
            name: 'balance',
            type: 'int256',
          },
        ],
        internalType: 'struct Vexcoin.User',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getVexcoinData',
    outputs: [
      {
        internalType: 'int256',
        name: '',
        type: 'int256',
      },
      {
        internalType: 'int256',
        name: '',
        type: 'int256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'from',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'to',
        type: 'string',
      },
      {
        internalType: 'int256',
        name: 'amount',
        type: 'int256',
      },
    ],
    name: 'transferCoins',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'itemId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'from',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'to',
        type: 'string',
      },
      {
        internalType: 'int256',
        name: 'cost',
        type: 'int256',
      },
    ],
    name: 'transferItem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

// Create web3 instance and connecte to Coinex Testnet
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.WEB_PROVIDER)
);

// Creating a signing account from a private key
const signer = web3.eth.accounts.privateKeyToAccount(
  process.env.SIGNER_PRIVATE_KEY
);
web3.eth.accounts.wallet.add(signer);

// Creating a Contract instance
const smartContract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

module.exports = { smartContract, signer };
