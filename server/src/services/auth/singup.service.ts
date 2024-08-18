import bcrypt from 'bcryptjs';
import {
	getFirestore,
	collection,
	query,
	where,
	getDocs,
	addDoc,
} from 'firebase/firestore';

import { firebaseApp, fireabaseAdmin } from '../../database';
import { InvalidRequestError } from '../../errors/AppError';
interface IProps {
	name: string;
	email: string;
	password: string;
}

export async function singupService({ name, email, password }: IProps) {
	const db = getFirestore(firebaseApp);
	const usersCollection = collection(db, 'users');
	const userQuery = query(usersCollection, where('email', '==', email));
	const userSnapshot = await getDocs(userQuery);

	if (!userSnapshot.empty) {
		throw new InvalidRequestError('Esse email já está em uso', 403);
	}

	const user = await fireabaseAdmin.createUser({
		email,
		emailVerified: false,
		password,
		displayName: name,
		disabled: false,
	});

	const newUser = {
		id: user.uid,
		name,
		email,
		password: bcrypt.hashSync(password, 8),
		createdAt: new Date(),
	};

	await addDoc(usersCollection, newUser);

	return {
		message: 'Usuário criado com sucesso',
	};
}
