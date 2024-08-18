import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { ENV } from '../config/env';

const firebaseConfig = {
	apiKey: ENV.FIREBASE_API_KEY,
	authDomain: ENV.FIREBASE_AUTH_DOMAIN,
	projectId: ENV.FIREBASE_PROJECT_ID,
	storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID,
	appId: ENV.FIREBASE_APP_ID,
};

const serviceAccount = {
	type: ENV.FIREBASE_SERVICE_ACCOUNT_TYPE,
	project_id: ENV.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
	private_key_id: ENV.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
	private_key: ENV.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
	client_email: ENV.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
	client_id: ENV.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
	auth_uri: ENV.FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
	token_uri: ENV.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
	auth_provider_x509_cert_url:
		ENV.FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
	client_x509_cert_url: ENV.FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
	universe_domain: ENV.FIREBASE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
};

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

export const fireabaseAdmin = admin.auth();
