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

interface IBroadcast {
	name?: string;
	status?: string;
	sendDate?: string;
	sendTime?: string;
	connectionID?: string;
	broadcastMessages?: string;
	userID: string;
	contactsIDs?: string[];
}

interface IBroadcasttParams {
	id: string;
	broadcast: IBroadcast;
}

interface IReturn {
	message: string;
}

export async function updateBroadcastService({
	broadcast,
	id,
}: IBroadcasttParams): Promise<IReturn> {
	const db = getFirestore(firebaseApp);
	const broadcastCollection = collection(db, 'broadcasts');

	const broadcastQuery = query(broadcastCollection, where('id', '==', id));

	const broadcastSnapshot = await getDocs(broadcastQuery);

	if (broadcastSnapshot.empty) {
		throw new InvalidRequestError('Transmissão não encontrada.', 404);
	}

	const broadcastDoc = broadcastSnapshot.docs[0];
	const docRef = doc(db, 'broadcasts', broadcastDoc.id);

	if (broadcast.name && broadcast.userID) {
		const broadcastNameQuery = query(
			broadcastCollection,
			where('name', '==', broadcast.name),
			where('userID', '==', broadcast.userID),
		);

		const existingBroadcasts = await getDocs(broadcastNameQuery);

		const existingBroadcast = existingBroadcasts.docs.find(
			(doc) => doc.id !== broadcastDoc.id,
		);

		if (existingBroadcast) {
			throw new InvalidRequestError(
				`Já existe uma transmissão com esse nome para este usuário.`,
				400,
			);
		}
	}

	const updateData = {
		...broadcast,
		updatedAt: new Date(),
	};

	await updateDoc(docRef, updateData);

	return {
		message: 'Transmissão atualizada com sucesso!',
	};
}
