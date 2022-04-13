import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyA_eqwsnIKLGDGTMUckUDkHsJQ4sYnv0x4",
    authDomain: "quartet-card-game.firebaseapp.com",
    projectId: "quartet-card-game",
    storageBucket: "quartet-card-game.appspot.com",
    messagingSenderId: "293435934296",
    appId: "1:293435934296:web:6c03b5edb93844f84e6c2d",
    measurementId: "G-W7EK0Z73SN"
  };

const firebase = initializeApp(firebaseConfig);

const storage = getStorage();
export { uploadBytes, ref, getDownloadURL, storage, firebase as default};