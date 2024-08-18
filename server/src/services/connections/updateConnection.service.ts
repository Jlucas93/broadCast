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
	userID?: string;
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

	if (connection.name && connection.userID) {
		const duplicateQuery = query(
			connectionCollection,
			where('name', '==', connection.name),
			where('userID', '==', connection.userID),
		);

		const duplicateSnapshot = await getDocs(duplicateQuery);

		const existingConnection = duplicateSnapshot.docs.find(
			(doc) => doc.data().id !== id,
		);

		if (existingConnection) {
			throw new InvalidRequestError(
				`Já existe uma conexão com o nome "${connection.name}" para este usuário.`,
				400,
			);
		}
	}

	const updateData = {
		...connection,
		updatedAt: new Date(),
	};

	await updateDoc(docRef, updateData);

	return {
		message: 'Conexão atualizada com sucesso!',
	};
}
