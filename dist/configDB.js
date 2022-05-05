const { initializeApp } = require('firebase/app');
const { getFirestore, collection } = require('firebase/firestore/lite');

const firebaseConfig = require('./firebaseConfig');

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

const users = collection(db, 'users');
module.exports = users;
