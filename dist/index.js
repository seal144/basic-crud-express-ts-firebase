const express = require('express');
const cors = require('cors');

const users = require('./configDB');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/create', async (req, res) => {
  const data = req.body;
  console.log('Body: ', data);
  res.send({ message: 'User added' });
});

app.listen(4000, console.log('app listening on port4000'));
