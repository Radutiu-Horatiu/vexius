require('dotenv').config();
const express = require('express');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const Web3EthAccounts = require('web3-eth-accounts');

const { smartContract } = require('./contract/smartContract');
const { auth } = require('./firebase');

const app = express();

/* Google Cloud requirement */
app.set('trust proxy', true);

/* Middlewares */
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(xss());
app.use(helmet());

/* Hello */
app.get('/', async (req, res) => {
  return res.status(200).send('Hello, Vexius!');
});

/* Get user by id */
app.post('/getUser', async (req, res) => {
  const { privateKey } = req.body;

  try {
    const response = await smartContract.methods.getUser(privateKey).call();
    return res.status(200).send({
      privateKey: response[0],
      publicKey: response[1],
      balance: response[2],
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

/* Adds a new user */
app.post('/addNewUser', async (req, res) => {
  try {
    // verify authorization
    let bearerToken = req.headers.authorization.split(' ')[1];
    auth.verifyIdToken(bearerToken);

    // generate account private key and public key
    const web3Account = new Web3EthAccounts();
    let data = web3Account.create();

    // register on blockchain
    const tx = smartContract.methods.addNewUser(data.privateKey, data.address);

    await tx.send({
      gas: await tx.estimateGas(),
    });

    // return public key only
    return res
      .status(200)
      .send({ privateKey: data.privateKey, publicKey: data.address });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

/* Get Vexcoin data */
app.post('/getVexcoinData', async (req, res) => {
  try {
    const response = await smartContract.methods.getVexcoinData().call();
    return res
      .status(200)
      .send({ vexcoin_amount: response[0], total_users: response[1] });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

/* Transfer coins to user balance */
app.post('/sendVexcoins', async (req, res) => {
  const { publicKey, amount } = req.body;

  try {
    const tx = smartContract.methods.sendVexcoins(publicKey, amount);

    const receipt = await tx.send({
      gas: await tx.estimateGas(),
    });

    return res.status(200).send(receipt);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

/* Transfer coins to user balance */
app.post('/transferCoins', async (req, res) => {
  const { fromPrivateKey, toPublicKey, amount } = req.body;

  try {
    const tx = smartContract.methods.transferCoins(
      fromPrivateKey,
      toPublicKey,
      amount
    );

    const receipt = await tx.send({
      gas: await tx.estimateGas(),
    });

    return res.status(200).send(receipt);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

/* Get item by id */
app.post('/getItem', async (req, res) => {
  const { id } = req.body;

  try {
    const response = await smartContract.methods.getItem(id).call();
    return res.status(200).send({ itemId: response[0], ownerId: response[1] });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

/* Adds and creates a new item */
app.post('/addNewItem', async (req, res) => {
  const { itemId, ownerId } = req.body;

  try {
    const tx = smartContract.methods.addNewItem(itemId, ownerId);

    const receipt = await tx.send({
      gas: await tx.estimateGas(),
    });

    return res.status(200).send(receipt);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

/* Transfer items between users */
app.post('/transferItem', async (req, res) => {
  const { itemId, fromPrivateKey, toPublicKey, cost } = req.body;

  try {
    const tx = smartContract.methods.transferItem(
      itemId,
      fromPrivateKey,
      toPublicKey,
      cost
    );

    const receipt = await tx.send({
      gas: await tx.estimateGas(),
    });

    return res.status(200).send(receipt);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`);
});
