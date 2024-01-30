import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    appId: process.env.FIREBASE_APP_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = getApps().length === 0 ? initializeApp(config) : getApps()[0];
const db = getFirestore(app);

let approvedOrgUids: string[] = [];
db.collection('approved_org_uids').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        approvedOrgUids.push(doc.id);
    });
});

const saveOrgDetails = async (body: any) => {
    const organization = body.organization;

    let uid = null;

    await getAuth().verifyIdToken(body.token).then((decodedToken) => {
        uid = decodedToken.uid;
    });

    if (uid === null) {
        return {state: false, message: 'Invalid token'};
    }

    let emailContent = 'A new organization has registered on IN2IT! <br>';
    emailContent += 'Name: <b>' + organization.name + '</b><br>';
    emailContent += 'Mission: <b>' + organization.mission + '</b><br>';
    emailContent += 'Website: ' + organization.website + '<br>';

    await db.collection('organizations').doc(uid).set(organization).then(() => {
        console.log('org details saved successfully!', body);
    });

    await db.collection('mail').add({
        to: 'in2itchicago@gmail.com', 
        message: {
            subject: 'New Organization Registration',
            text: emailContent,
            html: emailContent
        }
    }).then(() => {
        console.log('Queued email for delivery!');
    });

    return {state: true, message: 'Made it to the end of saveOrgDetails'};
};

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return saveOrgDetails(body);
});