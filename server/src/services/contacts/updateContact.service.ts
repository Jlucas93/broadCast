import {
	getFirestore,
	collection,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
} from 'firebase/firestore';

import { firebaseApp } from '../../database';
import { InvalidRequestError } from '../../errors/AppError';

interface IContact {
	name?: string;
	email?: string;
	phone?: string;
}

interface IUpdateContactParams {
	id: string;
	contact: IContact;
}

export async function updateContactService({
	id,
	contact,
}: IUpdateContactParams): Promise<{ message: string }> {
	const db = getFirestore(firebaseApp);
	const contactsCollection = collection(db, 'contacts');

	const contactQuery = query(contactsCollection, where('id', '==', id));
	const contactSnapShot = await getDocs(contactQuery);

	if (contactSnapShot.empty) {
		throw new InvalidRequestError('Contato não encontrado', 404);
	}

	const docRef = doc(db, 'contacts', contactSnapShot.docs[0].id);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	await updateDoc(docRef, contact as { [x: string]: any });

	return {
		message: 'Contato atualizado com sucesso!',
	};
}
