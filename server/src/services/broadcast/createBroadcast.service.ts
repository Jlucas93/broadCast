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

interface IBroadcast {
	name: string;
	status: string;
	sendDate: string;
	sendTime: string;
	connectionID: string;
	userID: string;
	contactsIDs: string[];
}

interface IReturn {
	message: string;
}

export async function createBroadcastService(
	broadcastData: IBroadcast,
): Promise<IReturn> {
	const db = getFirestore(firebaseApp);
	const broadcastCollection = collection(db, 'broadcasts');
	const connectionsCollection = collection(db, 'connections');

	const broadcastQuery = query(
		broadcastCollection,
		where('name', '==', broadcastData.name),
		where('userID', '==', broadcastData.userID),
	);

	const existingBroadcasts = await getDocs(broadcastQuery);

	if (!existingBroadcasts.empty) {
		throw new InvalidRequestError(
			`Já existe uma transmissão com esse nome para este usuário.`,
			400,
		);
	}

	const connectionQuery = query(
		connectionsCollection,
		where('id', '==', broadcastData.connectionID),
	);

	const connectionSnapshot = await getDocs(connectionQuery);
	let connectionName = '';

	if (!connectionSnapshot.empty) {
		const connectionDoc = connectionSnapshot.docs[0].data();
		connectionName = connectionDoc.name;
	} else {
		throw new InvalidRequestError('Conexão não encontrada.', 400);
	}

	await addDoc(broadcastCollection, {
		id: uuidv4(),
		name: broadcastData.name,
		status: broadcastData.status,
		sendDate: broadcastData.sendDate,
		sendTime: broadcastData.sendTime,
		connectionID: broadcastData.connectionID,
		connectionName,
		userID: broadcastData.userID,
		contactsIDs: broadcastData.contactsIDs,
		createdAt: new Date(),
	});

	return {
		message: 'Transmissão criada com sucesso!',
	};
}
