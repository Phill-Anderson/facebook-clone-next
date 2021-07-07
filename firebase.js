import firebase from 'firebase'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBkFWcbFIlyK3wPTBOaUkNFwRsyhW94eIE",
    authDomain: "facebook-clone-7859a.firebaseapp.com",
    projectId: "facebook-clone-7859a",
    storageBucket: "facebook-clone-7859a.appspot.com",
    messagingSenderId: "20677870450",
    appId: "1:20677870450:web:8c7647b0c824953806d3eb"
};


const instance = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const db = instance.firestore()
const storage = firebase.storage()


export { db, storage, firebase }