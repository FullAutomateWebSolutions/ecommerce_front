
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";



export { db, analytics };
const firebaseConfig = {
  apiKey: "AIzaSyBQAYEvKU_85Xrj_1HFiazdc4G5x7Pa8vs",
  authDomain: "fullautomatewebsolution.firebaseapp.com",
  projectId: "fullautomatewebsolution",
  storageBucket: "fullautomatewebsolution.firebasestorage.app",
  messagingSenderId: "544476675765",
  appId: "1:544476675765:web:402af9e09b228b563d88fc",
  measurementId: "G-PJ0HKP092Y"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);         
const analytics = getAnalytics(app);  

export default db



// regras

// rules_version = '2';
//prod
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if false;
//     }
//   }
// }

/// teste
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if true;
//     }
//   }
// }
