import bcrypt from 'bcryptjs';
import {
	getFirestore,
	collection,
	query,
	where,
	getDocs,
} from 'firebase/firestore';
import jwt from 'jsonwebtoken';

import auth from '../../config/auth';
import { firebaseApp } from '../../database';
import { InvalidRequestError } from '../../errors/AppError';

interface IUser {
	id: string;
	email: string;
	name: string;
	password?: string;
}

interface LoginProps {
	email: string;
	password: string;
}

export async function loginService({ email, password }: LoginProps): Promise<{
	user: IUser;
	token: string;
}> {
	const db = getFirestore(firebaseApp);
	const usersCollection = collection(db, 'users');
	const userQuery = query(usersCollection, where('email', '==', email));
	const userSnapshot = await getDocs(userQuery);

	if (userSnapshot.empty) {
		throw new InvalidRequestError('Usuário não encontrado', 404);
	}

	const user = userSnapshot.docs[0]?.data() as IUser;

	if (!(await bcrypt.compare(password, user.password as string))) {
		throw new InvalidRequestError('Usuário ou senha inválidos!', 401);
	}

	const token = jwt.sign(
		{
			email: user.email,
			userId: user.id,
		},
		auth.secret,
		{
			expiresIn: auth.expiresIn,
		},
	);

	delete user.password;

	return {
		user,
		token,
	};
}
