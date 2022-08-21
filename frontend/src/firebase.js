import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA0K2f14SRll-QvKnevIvgUbvY06IBDy4I',
  authDomain: 'react-boilerplate-f39c8.firebaseapp.com',
  projectId: 'react-boilerplate-f39c8',
  storageBucket: 'react-boilerplate-f39c8.appspot.com',
  messagingSenderId: '276083503906',
  appId: '1:276083503906:web:6d0220a50939a08f292b7b',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
