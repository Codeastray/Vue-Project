import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB7WO2hZFR1cU-npuLTgFYbDPEIFpXR-Ro",
    authDomain: "vue-project-4a236.firebaseapp.com",
    projectId: "vue-project-4a236",
    storageBucket: "vue-project-4a236.appspot.com",
    messagingSenderId: "414391582066",
    appId: "1:414391582066:web:29bdc7120beaac9997b1eb"
  };
 
  initializeApp(firebaseConfig)


  const db = getFirestore()
  const auth = getAuth()  
  const storage = getStorage();

  const timestamp = serverTimestamp()

  export { db, auth, storage, timestamp}