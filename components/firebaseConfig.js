/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-11-15 03:11:17
 * @modify date 2024-11-15 03:56:22
 * @desc [description]
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { EXPO_PUBLIC_apiKey, 
    EXPO_PUBLIC_authDomain, 
    EXPO_PUBLIC_projectId, 
    EXPO_PUBLIC_storageBucket, 
    EXPO_PUBLIC_messagingSenderId, 
    EXPO_PUBLIC_appId, 
    EXPO_PUBLIC_measurementId } from process.env;


// Initialize Firebase
const firebaseConfig = {
  apiKey: EXPO_PUBLIC_apiKey,
  authDomain: EXPO_PUBLIC_authDomain,
//   databaseURL: 'https://project-id.firebaseio.com',
  projectId: EXPO_PUBLIC_projectId,
  storageBucket: EXPO_PUBLIC_storageBucket,
  messagingSenderId: EXPO_PUBLIC_messagingSenderId,
  appId: EXPO_PUBLIC_appId,
  measurementId: EXPO_PUBLIC_measurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * sample GET URL for a document located: transactions/Z7azeQUBB5QeZhdxrNUv
 * https://firestore.googleapis.com/v1beta1/projects/groupbill-f9c8d/databases/(default)/documents/transactions/Z7azeQUBB5QeZhdxrNUv
 */