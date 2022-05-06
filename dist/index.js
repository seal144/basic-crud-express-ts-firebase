const express = require('express');
const cors = require('cors');
const { addDoc, getDocs } = require('firebase/firestore/lite');

const users = require('./configDB');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  let usersDocs = [];

  await getDocs(users).then((snapshot) => {
    snapshot.forEach((doc) => {
      usersDocs.push({ id: doc.id, ...doc.data() });
    });
  });
  res.send(usersDocs);
});

app.post('/create', async (req, res) => {
  const data = req.body;
  await addDoc(users, data);
  res.send({ message: 'User added' });
});

app.listen(4000, console.log('app listening on port 4000'));
