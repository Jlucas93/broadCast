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
	userID?: string;
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

	if (contact.phone) {
		const duplicateQuery = query(
			contactsCollection,
			where('phone', '==', contact.phone),
			where('userID', '==', contact.userID),
		);

		const duplicateSnapshot = await getDocs(duplicateQuery);

		const existingContact = duplicateSnapshot.docs.find((doc) => doc.id !== id);

		if (existingContact) {
			throw new InvalidRequestError(
				`Já existe um contato com esse telefone para este usuário.`,
				400,
			);
		}
	}

	const updateData = {
		...contact,
		updatedAt: new Date(),
	};

	await updateDoc(docRef, updateData);

	return {
		message: 'Contato atualizado com sucesso!',
	};
}
