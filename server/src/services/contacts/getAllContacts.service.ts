import {
	getFirestore,
	collection,
	query,
	getDocs,
	where,
} from 'firebase/firestore';

import { firebaseApp } from '../../database';

interface IContact {
	name: string;
	phone: string;
}

interface IGetAllContactsResponse {
	contacts: IContact[];
}

export async function getAllContactsService({
	userId,
}: {
	userId: string;
}): Promise<IGetAllContactsResponse> {
	const db = getFirestore(firebaseApp);
	const contactsCollection = collection(db, 'contacts');

	const contactsQuery = query(
		contactsCollection,
		where('userId', '==', userId),
	);
	const contactsSnapshot = await getDocs(contactsQuery);

	const contacts: IContact[] = contactsSnapshot.docs.map(
		(doc) => ({ ...doc.data() }) as IContact,
	);

	return {
		contacts,
	};
}
