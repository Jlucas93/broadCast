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

interface IConnection {
	name: string;
	active: boolean;
	userID: string;
}

interface IReturn {
	message: string;
}

export async function createConnectionService({
	name,
	active,
	userID,
}: IConnection): Promise<IReturn> {
	const db = getFirestore(firebaseApp);
	const connectionCollection = collection(db, 'connections');

	const connectionQuery = query(
		connectionCollection,
		where('name', '==', name),
		where('userID', '==', userID),
	);

	const connectionSnapshot = await getDocs(connectionQuery);

	if (!connectionSnapshot.empty) {
		throw new InvalidRequestError(
			'Conexão já existe com esse nome para esse usuário.',
			400,
		);
	}

	await addDoc(connectionCollection, {
		id: uuidv4(),
		name,
		active,
		userID,
		createdAt: new Date(),
	});

	return {
		message: 'Conexão criado com sucesso!',
	};
}
