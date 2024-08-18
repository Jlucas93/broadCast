import { Request, Response, NextFunction } from 'express';
import {
	getFirestore,
	getDocs,
	collection,
	query,
	where,
} from 'firebase/firestore';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';
import { firebaseApp } from '../database';

interface IUser {
	id: string;
	name: string;
	email: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ error: 'Token not provided' });
	}

	const [, token] = authHeader.split(' ');

	try {
		const decoded = jwt.verify(token, authConfig.secret) as unknown as {
			id: string;
			email: string;
			userID: string;
			iat: string;
			exp: string;
		};

		const db = getFirestore(firebaseApp);
		const usersCollection = collection(db, 'users');
		const userQuery = query(usersCollection, where('id', '==', decoded.userID));
		const userSnapshot = await getDocs(userQuery);

		if (userSnapshot.empty) {
			return res.status(401).json({ error: 'User not found' });
		}

		const user = userSnapshot.docs[0].data() as IUser;
		req.user = user;

		return next();
	} catch (error) {
		console.error(error);
		return res.status(401).json({ error: 'Token inválido' });
	}
};
