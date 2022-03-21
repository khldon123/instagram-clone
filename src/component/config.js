import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAGlQVuGH0h1gPg1p14fieiMCoyQoGTZio",
    authDomain: "intagram-clone-488f5.firebaseapp.com",
    databaseURL: "https://intagram-clone-488f5-default-rtdb.firebaseio.com",
    projectId: "intagram-clone-488f5",
    storageBucket: "intagram-clone-488f5.appspot.com",
    messagingSenderId: "379438366594",
    appId: "1:379438366594:web:f06bc4f4f9bc1f9bd7199b",
    measurementId: "G-CE5KBMKRHG"
};
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth()
const storage = getStorage()
export {db, auth, storage}