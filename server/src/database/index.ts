import { initializeApp } from 'firebase/app';

import { ENV } from '../config/env';

const firebaseConfig = {
	apiKey: ENV.API_KEY,
	authDomain: ENV.AUTH_DOMAIN,
	projectId: ENV.PROJECT_ID,
	storageBucket: ENV.STORAGE_BUCKET,
	messagingSenderId: ENV.MESSAGING_SENDER_ID,
	appId: ENV.APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
