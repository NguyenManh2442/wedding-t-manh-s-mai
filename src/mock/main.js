import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/* code from our Firebase console */
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "wedding-2m",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore()

export default db
