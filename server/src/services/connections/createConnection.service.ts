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
	userId: string;
}

interface IReturn {
	message: string;
}

export async function createConnectionService({
	name,
	active,
	userId,
}: IConnection): Promise<IReturn> {
	const db = getFirestore(firebaseApp);
	const connectionCollection = collection(db, 'connections');

	const connectioQuery = query(
		connectionCollection,
		where('name', '==', name),
		where('userId', '==', userId),
	);

	const connectionSnapshot = await getDocs(connectioQuery);

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
		userId,
		createdAt: new Date(),
	});

	return {
		message: 'Conexão criado com sucesso!',
	};
}
