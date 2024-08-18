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

interface IProps {
	id: string;
	userID: string;
}

export async function deleteBroadcastService({
	id,
	userID,
}: IProps): Promise<{ message: string }> {
	const db = getFirestore(firebaseApp);
	const broadcastCollection = collection(db, 'broadcasts');

	const broadcastQuery = query(
		broadcastCollection,
		where('id', '==', id),
		where('userID', '==', userID),
	);
	const broadcastSnapshot = await getDocs(broadcastQuery);

	if (broadcastSnapshot.empty) {
		throw new InvalidRequestError('Transmição não encontrada', 404);
	}

	const broadcastDoc = doc(db, 'broadcasts', broadcastSnapshot.docs[0].id);

	await deleteDoc(broadcastDoc);

	return {
		message: 'Transmição deletada com sucesso!',
	};
}
