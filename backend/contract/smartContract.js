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
        internalType: 'int256',
        name: 'owner_public_key',
        type: 'int256',
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
        name: 'private_key',
        type: 'string',
      },
      {
        internalType: 'int256',
        name: 'public_key',
        type: 'int256',
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
        name: 'private_key',
        type: 'string',
      },
      {
        internalType: 'int256',
        name: 'amount',
        type: 'int256',
      },
    ],
    name: 'sendVexcoins',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'from_private_key',
        type: 'string',
      },
      {
        internalType: 'int256',
        name: 'to_public_key',
        type: 'int256',
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
        name: 'from_private_key',
        type: 'string',
      },
      {
        internalType: 'int256',
        name: 'to_public_key',
        type: 'int256',
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
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'int256',
        name: 'public_key',
        type: 'int256',
      },
    ],
    name: 'getBalance',
    outputs: [
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
            internalType: 'int256',
            name: 'currentOwner',
            type: 'int256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'date',
                type: 'uint256',
              },
              {
                internalType: 'int256',
                name: 'owner',
                type: 'int256',
              },
            ],
            internalType: 'struct Vexcoin.OwnerHistory[]',
            name: 'ownerHistory',
            type: 'tuple[]',
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
        name: 'private_key',
        type: 'string',
      },
    ],
    name: 'getUser',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'private_key',
            type: 'string',
          },
          {
            internalType: 'int256',
            name: 'public_key',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'balance',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'index',
            type: 'uint256',
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
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
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
const smartContract = new web3.eth.Contract(
  abi,
  '0xBF260c63d032047ebDCcE89fA2F2bEED182A31D6',
  {
    from: signer.address,
  }
);

module.exports = { smartContract };
