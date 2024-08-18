import {
	getFirestore,
	collection,
	query,
	where,
	getDocs,
	deleteDoc,
	doc,
} from 'firebase/firestore';

import { firebaseApp } from '../../database';
import { InvalidRequestError } from '../../errors/AppError';
interface IDeleteContactParams {
	id: string;
}

export async function deleteContactService({
	id,
}: IDeleteContactParams): Promise<{ message: string }> {
	const db = getFirestore(firebaseApp);
	const contactsCollection = collection(db, 'contacts');

	const contactQuery = query(contactsCollection, where('id', '==', id));
	const contactSnapshot = await getDocs(contactQuery);

	if (contactSnapshot.empty) {
		throw new InvalidRequestError('Conato não encontrado', 404);
	}

	const contactDoc = doc(db, 'contacts', contactSnapshot.docs[0].id);

	await deleteDoc(contactDoc);

	return {
		message: 'Contato deletado com sucesso!',
	};
}
