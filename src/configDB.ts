import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore, collection, Firestore, CollectionReference } from 'firebase/firestore/lite';

import firebaseConfig from './firebaseConfig';

const appFirebase: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(appFirebase);

export const users: CollectionReference = collection(db, 'users');
