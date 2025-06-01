// src/assets/firebase/firebaseConfig.js
    import { initializeApp } from 'firebase/app';
    import { getFirestore } from 'firebase/firestore';

    const firebaseConfig = {
      apiKey: "AIzaSyCza2TyPxTYUIJgd1Lk2tGktJQDAcKGL00",
      authDomain: "libreria-scorpio.firebaseapp.com",
      projectId: "libreria-scorpio",
      storageBucket: "libreria-scorpio.firebasestorage.app",
      messagingSenderId: "1014651308898",
      appId: "1:1014651308898:web:5270ec6994d2bb3aaa3a3b",
      measurementId: "G-75TK98MB3X"
    };

    const app = initializeApp(firebaseConfig);
    export const db = getFirestore(app);