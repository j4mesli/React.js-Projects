import firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD6NLQDf6xBTHGrfOhAmkksOJ032ptrX6c",
    authDomain: "recipe-book-react-36654.firebaseapp.com",
    projectId: "recipe-book-react-36654",
    storageBucket: "recipe-book-react-36654.appspot.com",
    messagingSenderId: "642317437544",
    appId: "1:642317437544:web:07be2be5e40f648a5309dd"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = getFirestore();

export { projectFirestore };