import { Request, Response, NextFunction } from 'express';
import { signInWithCustomToken } from 'firebase/auth';
import {
	getFirestore,
	getDocs,
	collection,
	query,
	where,
} from 'firebase/firestore';

import { firebaseApp, firebaseAuth } from '../database';

interface IUser {
	id: string;
	name: string;
	email: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ error: 'Token não fornecido' });
	}

	const [, token] = authHeader.split(' ');

	try {
		const decodedToken = await signInWithCustomToken(firebaseAuth, token);

		const { user } = decodedToken;

		const db = getFirestore(firebaseApp);
		const usersCollection = collection(db, 'users');
		const userQuery = query(usersCollection, where('id', '==', user.uid));
		const userSnapshot = await getDocs(userQuery);

		if (userSnapshot.empty) {
			return res.status(401).json({ error: 'User not found' });
		}

		const loggedUser = userSnapshot.docs[0].data() as IUser;

		req.user = loggedUser;

		return next();
	} catch (error) {
		console.error(error);
		return res.status(401).json({ error: 'Token inválido' });
	}
};
