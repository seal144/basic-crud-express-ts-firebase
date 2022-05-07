import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore, collection, Firestore, CollectionReference } from 'firebase/firestore/lite';

import firebaseConfig from './firebaseConfig';

const appFirebase: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(appFirebase);

const users: CollectionReference = collection(db, 'users');

export default users;
