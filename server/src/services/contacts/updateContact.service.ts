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

interface IContact {
	name?: string;
	phone?: string;
	email?: string;
	userId?: string;
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
	const contactSnapshot = await getDocs(contactQuery);

	if (contactSnapshot.empty) {
		throw new Error('Contato não encontrado');
	}

	const docRef = doc(db, 'contacts', contactSnapshot.docs[0].id);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	await updateDoc(docRef, contact as { [x: string]: any });

	return {
		message: 'Contato atualizado com sucesso!',
	};
}
