import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    appId: process.env.FIREBASE_APP_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
const app = initializeApp(config);
const db = getFirestore(app);

let approvedOrgUids: string[] = [];
const approvedOrgsRef = collection(db, 'approved_org_uids');
const approvedOrgsSnapshot = getDocs(approvedOrgsRef);
approvedOrgsSnapshot.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        approvedOrgUids.push(doc.id);
    });
});


export default defineEventHandler(({ context }) => {
	return {state: true, approvedOrgUids: approvedOrgUids};
});