import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { ENV } from '../config/env';

const firebaseConfig = {
	apiKey: ENV.API_KEY,
	authDomain: ENV.AUTH_DOMAIN,
	projectId: ENV.PROJECT_ID,
	storageBucket: ENV.STORAGE_BUCKET,
	messagingSenderId: ENV.MESSAGING_SENDER_ID,
	appId: ENV.APP_ID,
};

const serviceAccount = {
	type: 'service_account',
	project_id: 'broadcast-api-cdcd5',
	private_key_id: 'a6bee4d5a3422bbefe7a735f22d9de8b46b4a37f',
	private_key:
		'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqB4DBmjrqQ6KI\nEPOVUVsCjwCEYnpzgcO6NpNaEeKqYdN63kghT4o0Rb4iPUWtD0xF3GdIQtUhAWVa\nlz8ux17zJ53tQfqJqNmV6UEIKDiTUw3urPWNrQBjgAT8iGCsrqZmc7+IOWcObcnp\nw7V/LLpFWUvXyM8W09GU/++4T34fAfUc9YdWOUli4PG+InlUofoRETVBtgweIu/A\nZIhN2DnkfxA+8TXlvsHCjokU3vxg/gEiSoljDIr211m9eYhJ5Uwq/hXsUk6OYxrj\nmQsuELL9DnKbw6lNvWwYQ0D8omiw9i0orIW3vSRhXU4tOkAikGROtvYqSca2caWM\nfh1KokiBAgMBAAECggEAULM98+Xhd6YBYwZ0rlbOVPENpEffaapZ/SyBFJtvk0Ha\nL7OH1bOcW4IMo9CkHOcpYvEg3kXGRaOVeQFXXjsHgG45wU3y/Vp0Z3gtwxLgA2DE\nuJdD9un5SMCO3VNXWy6L0Q24Bw6DsPAACSE4KDPQ9zBSVIk9bU685zTwkPC94jXz\n9z0mcQl5YXbnF3No+74tY3D5+99UMPCBQ3B0H3xGyqRnQMZK7wHdEQesjjcVskGT\n79LcKOMBTevPvkGFQAlid0b7Nz2wq6l4Ch6qjeMMn8dGZVKbIpT1UMqvnr5O+KUj\n0nakkCinYLCr3EvYNFvGwljJGhrs8zjAV+mmKZB/hwKBgQDYChYCs0nOv9/1hO5Z\nWMc8t0ZtFfDk8qsVwiEz9UGAvb4QdrY6VGGaqEnap76SSsFZFDP3FYMTFzQohguN\nbY4PvDFZsP3IAMkRYYOsto6SuW/YCzrd+2Q/69cyQbHu9/4+lGxy/ZuC14fZ95vO\nJb8x4fdeywjJmLxbyy3oSbKSfwKBgQDJer5i9BOHAcuYrqA8SSQ+zOHgRiDgX2Xw\n9rj1AFjQgkqFJyF7+H8SgwsLql2E6PDJPljGMgn8u2Mh29KjN+c0VDihoWEo0n6O\nKd8+HCQ4k7+J/QsjWUsx1GKbJd1lfURJXCE8I2NMXveXgAzD2aqxEm5wcu12ISvd\nwDGvbZek/wKBgCn144qIuigu+lfchtLRvHjdfA9J+KzvOS2TtBE8bImN0PGvrPst\nUnvQfe+7LveJD362vtUZ14iItDe+uVWx1qrVuZwbFV+YT3VRxFpyZsS2wbNrkvZ0\nkmcb7oMzYVTx0+7hsyKugVrrc9ZxElD64eTVZ8+AjediBAusLfF1BvsPAoGAHoyW\n64gYoeLazQbFUv7AGSmVohzgBUVRvqyaNMPds5fd1rytLg/qrJLkDNvDHFD5mXnz\nmfGiZAjBqjObh5YFX4DZqWA/zCHGgKXGrLM1psJ4S2Lr2mtCpIaQgPfHzwikXv8y\nJt0yxDSuE/GdfeC2Ke0ig7hZWw0CirgGkJPsZ18CgYEAsOhT9wXeElLmnKBfIsxH\nDKOBDKyOe/MAMKl3v9MMcJtuPEgKRsK8FYzQCbqUPPeOeSOqMhkC0grmp/gxpoYZ\nzaqNaGx0a73NLMIDtYrmRMHlchu2eBFcEGlxDqzCJ3hVsKiYHiT+6PtcdotMRl2Y\n9V0Nenubda7DlUMa9S7U9Kw=\n-----END PRIVATE KEY-----\n',
	client_email:
		'firebase-adminsdk-7w9wn@broadcast-api-cdcd5.iam.gserviceaccount.com',
	client_id: '101049476011538024243',
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url:
		'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7w9wn%40broadcast-api-cdcd5.iam.gserviceaccount.com',
	universe_domain: 'googleapis.com',
};

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

export const fireabaseAdmin = admin.auth();
