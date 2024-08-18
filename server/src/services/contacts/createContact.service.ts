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

interface IContact {
	name: string;
	phone: string;
	email?: string;
	userId: string;
}

interface ICreateContactsResponse {
	message: string;
}

export async function createContactService({
	name,
	phone,
	email,
	userId,
}: IContact): Promise<ICreateContactsResponse> {
	const db = getFirestore(firebaseApp);
	const contactsCollection = collection(db, 'contacts');

	const contactQuery = query(
		contactsCollection,
		where('phone', '==', phone),
		where('userId', '==', userId),
	);

	const contactSnapshot = await getDocs(contactQuery);

	if (!contactSnapshot.empty) {
		throw new InvalidRequestError(
			'Contato já existe com o mesmo telefone.',
			400,
		);
	}

	await addDoc(contactsCollection, {
		id: uuidv4(),
		name,
		phone,
		email,
		userId,
	});

	return {
		message: 'Contato criado com sucesso!',
	};
}
