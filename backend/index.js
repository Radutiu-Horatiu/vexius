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
app.post('/getUser', async (req, res) => {
  const { id } = req.body;

  try {
    const response = await smartContract.methods.getUser(id).call();
    return res.status(200).send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

/* Adds a new user */
app.post('/addNewUser', async (req, res) => {
  const { id } = req.body;

  try {
    const tx = smartContract.methods.addNewUser(id);

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
