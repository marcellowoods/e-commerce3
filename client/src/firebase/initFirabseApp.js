//save firebaseConfig.js in current folder and import on top of index.js

//example firebaseConfig
// var firebaseConfig = {
//     apiKey: "AIzaSyB5suDBRaldAU0hSlC28CPvkvQHyyoMhBc",
//     authDomain: "ecommerce-8dd67.firebaseapp.com",
//     projectId: "ecommerce-8dd67",
//     storageBucket: "ecommerce-8dd67.appspot.com",
//     messagingSenderId: "610306716686",
//     appId: "1:610306716686:web:c26b62e977493b107bb85f"
// };

// export default firebaseConfig;

import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';
initializeApp(firebaseConfig);