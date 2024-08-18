import bcrypt from 'bcryptjs';
import {
	getFirestore,
	collection,
	query,
	where,
	getDocs,
} from 'firebase/firestore';

import { fireabaseAdmin, firebaseApp } from '../../database';
import { InvalidRequestError } from '../../errors/AppError';

interface ILoginProps {
	email: string;
	password: string;
}

export async function loginService({ email, password }: ILoginProps) {
	const db = getFirestore(firebaseApp);
	const usersCollection = collection(db, 'users');
	const userQuery = query(usersCollection, where('email', '==', email));
	const userSnapshot = await getDocs(userQuery);

	if (userSnapshot.empty) {
		throw new InvalidRequestError('Usuário não encontrado', 404);
	}

	const userDoc = userSnapshot.docs[0];
	const user = userDoc.data();

	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch) {
		throw new InvalidRequestError('Senha ou usuário incorreto', 401);
	}

	const token = await fireabaseAdmin.createCustomToken(user.id);

	return {
		message: 'Login realizado com sucesso',
		token,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
		},
	};
}
