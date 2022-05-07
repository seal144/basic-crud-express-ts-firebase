import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { addDoc, deleteDoc, doc, DocumentReference, getDocs, UpdateData, updateDoc } from 'firebase/firestore/lite';

import { db, users } from './configDB';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/users', async (req: Request, res: Response) => {
  let userDocs: UserID[] = [];

  await getDocs(users).then((snapshot) => {
    snapshot.forEach((doc) => {
      userDocs.push({ id: doc.id, name: doc.data().name, age: doc.data().age });
      // userDocs.push({ id: doc.id, ...doc.data() });
    });
  });

  res.send(userDocs);
});

app.post('/users', async (req: Request, res: Response) => {
  const data: User = req.body;
  await addDoc(users, data);
  res.send({ message: 'User added' });
});

app.patch('/users', async (req: Request, res: Response) => {
  const id: string = req.body.id;
  delete req.body.id;
  const dataUpdate: UpdateData<UserUpdate> = req.body;
  const docRef: DocumentReference = doc(db, 'users', id);

  await updateDoc(docRef, dataUpdate);

  res.send({ message: 'updated' });
});

app.delete('/users', async (req: Request, res: Response) => {
  const id: string = req.body.id;
  const docRef: DocumentReference = doc(db, 'users', id);

  await deleteDoc(docRef);

  res.send({ message: 'deleted' });
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

interface UserUpdate {
  name?: string;
  age?: number;
}

//pliki TS robily mi jeden scpope w innym projekcie
//czy wiesz jak zrobić żeby formatować nie na save a na przycisk

//czy każdy formatuje jak chce w pracy?

//jak pracujesz z TS to robisz cały czas kompilację? i de fakto używasz tylko pliki js są uruchamiane?
//jak robisz import to jakoś to typujesz?
//w app.get wiem, że // userDocs.push({ id: doc.id, ...doc.data() }); będzie dobrze ale TS wywala mi błąd

// w app.post niby typuje, że data: User. a de facto jak dziala server to i tak mogę wrzucić tam co chce, czyli TS pomaga tylko przy pisaniu a nie przy działaniu?

//Jak się robi w praktyce? czy interface jest w jednym pliku
