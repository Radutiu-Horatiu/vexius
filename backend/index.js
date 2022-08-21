require('dotenv').config();
const express = require('express');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');

const { smartContract, signer } = require('./contract/smartContract');

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

/* Get user by id */
app.get('/getUser', async (req, res) => {
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
  const { privateKey, publicKey } = req.body;

  try {
    const tx = smartContract.methods.addNewUser(privateKey, publicKey);

    const receipt = await tx.send({
      from: signer.address,
      gas: await tx.estimateGas(),
    });

    return res.status(200).send(receipt);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

/* Get Vexcoin data */
app.get('/getVexcoinData', async (req, res) => {
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
      from: signer.address,
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
      from: signer.address,
      gas: await tx.estimateGas(),
    });

    return res.status(200).send(receipt);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

/* Get item by id */
app.get('/getItem', async (req, res) => {
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
      from: signer.address,
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
      from: signer.address,
      gas: await tx.estimateGas(),
    });

    return res.status(200).send(receipt);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
