import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { addDoc, getDocs } from 'firebase/firestore/lite';

import users from './configDB';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', async (req: Request, res: Response) => {
  let userDocs: UserID[] = [];

  await getDocs(users).then((snapshot) => {
    snapshot.forEach((doc) => {
      userDocs.push({ id: doc.id, name: doc.data().name, age: doc.data().age });
      // userDocs.push({ id: doc.id, ...doc.data() });
    });
  });

  res.send(userDocs);
});

app.post('/create', async (req: Request, res: Response) => {
  const data: User = req.body;
  await addDoc(users, data);
  res.send({ message: 'User added' });
});

app.listen(4000, () => {
  console.log('app listening on port 4000');
});

interface User {
  name: string;
  age: number;
}

interface UserID extends User {
  id: string;
}
