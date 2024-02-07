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

const generateToken = function (length : number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};

const getRequestURL = function (query : any) {
    return 'https://in2itchicago.com/api/permissions?orgId=' + query.orgId + '&action=' + query.action + '&token=' + query.token;
};

const saveOrgDetails = async (body: any) => {
    const organization = body.organization;
    organization.token = generateToken(32);

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
    emailContent += 'Click to approve: <a href=' + getRequestURL({orgId: uid, action: 'approve', token: organization.token}) + '>Approve ' + organization.name + '</a><br>';
    emailContent += 'Click to deny: <a href=' + getRequestURL({orgId: uid, action: 'deny', token: organization.token}) + '>Deny ' + organization.name + '</a><br>';

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