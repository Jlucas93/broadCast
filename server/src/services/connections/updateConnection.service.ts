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
	active?: boolean;
	userId?: string;
}

interface IUpdateConnectionParams {
	id: string;
	connection: IContact;
}

export async function updateConnectionService({
	id,
	connection,
}: IUpdateConnectionParams): Promise<{ message: string }> {
	const db = getFirestore(firebaseApp);
	const connectionCollection = collection(db, 'connections');

	const connectionQuery = query(connectionCollection, where('id', '==', id));
	const connectionSnapshot = await getDocs(connectionQuery);

	if (connectionSnapshot.empty) {
		throw new InvalidRequestError('Conexão não encontrada', 404);
	}

	const docRef = doc(db, 'connections', connectionSnapshot.docs[0].id);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	await updateDoc(docRef, connection as { [x: string]: any });

	return {
		message: 'Conexão atualizado com sucesso!',
	};
}
