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

export async function deleteConnectionService({
	id,
	userID,
}: IProps): Promise<{ message: string }> {
	const db = getFirestore(firebaseApp);
	const connectionCollection = collection(db, 'connections');

	const connectionQuery = query(
		connectionCollection,
		where('id', '==', id),
		where('userID', '==', userID),
	);
	const connectionSnapshot = await getDocs(connectionQuery);

	if (connectionSnapshot.empty) {
		throw new InvalidRequestError('Conexão não encontrada', 404);
	}

	const connectionDoc = doc(db, 'connections', connectionSnapshot.docs[0].id);

	await deleteDoc(connectionDoc);

	return {
		message: 'Conexão deletada com sucesso!',
	};
}
