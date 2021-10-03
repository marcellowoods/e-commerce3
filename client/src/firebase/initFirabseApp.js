//save firebaseConfig.js in current folder and import on top of index.js

import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';
initializeApp(firebaseConfig);