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

export default defineEventHandler(async (event) => {
	const query = getQuery(event);

	let uid = '';
	if (query.orgId) {
		uid = query.orgId.toString();
	}

	let action = '';
	if (query.action) {
		action = query.action.toString();
	}

	let token = '';
	if (query.token) {
		token = query.token.toString();
	}

	const snap = await db.collection('organizations').doc(uid).get();
	const organization = snap.data();
	if (!snap.exists || !organization) {
		return {error: 'We could not find this organization, they may have been deleted.'};
	}

	if (organization && organization.token !== token) {
		return {error: 'We found this organization, however an invalid token was provided, please try clicking the ' + action + ' link in the email again.'};
	}

	if (action === 'approve') {
		await db.collection('approved_org_uids').doc(uid).set({}).then(() => {
			console.log('Added an org uid to approved list!', organization);
		});
	}
	else if (action === 'deny') {
		await db.collection('approved_org_uids').doc(uid).delete().then(() => {
			console.log('Deleted an org uid from approved list', organization);
		});
	}

	return {message: 'Organization permissions were updated', name: organization.name};
});