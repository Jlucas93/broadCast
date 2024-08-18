import bcrypt from 'bcryptjs';
import {
	getFirestore,
	collection,
	query,
	where,
	getDocs,
	addDoc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { firebaseApp } from '../../database';
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
		throw new InvalidRequestError(
			'Usuário com esse email já existe no banco',
			403,
		);
	}

	const newUser = {
		id: uuidv4(),
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
