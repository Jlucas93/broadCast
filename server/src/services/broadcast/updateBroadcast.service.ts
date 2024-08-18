import {
	getFirestore,
	doc,
	getDoc,
	query,
	where,
	getDocs,
	updateDoc,
	collection,
} from 'firebase/firestore';

import { firebaseApp } from '../../database';
import { InvalidRequestError } from '../../errors/AppError';

interface IBroadcastUpdate {
	id: string;
	name?: string;
	status?: string;
	sendDate?: string;
	sendTime?: string;
	connectionID?: string;
	userID: string;
	contactsIDs?: string[];
}

interface IReturn {
	message: string;
}

export async function updateBroadcastService(
	broadcastData: IBroadcastUpdate,
): Promise<IReturn> {
	const db = getFirestore(firebaseApp);
	const broadcastRef = doc(db, 'broadcasts', broadcastData.id);

	const broadcastDoc = await getDoc(broadcastRef);

	if (!broadcastDoc.exists()) {
		throw new InvalidRequestError(`Transmissão não encontrada.`, 404);
	}

	if (broadcastData.name) {
		const broadcastQuery = query(
			collection(db, 'broadcasts'),
			where('name', '==', broadcastData.name),
			where('userID', '==', broadcastData.userID),
		);

		const existingBroadcasts = await getDocs(broadcastQuery);

		const existingBroadcast = existingBroadcasts.docs.find(
			(doc) => doc.id !== broadcastData.id,
		);

		if (existingBroadcast) {
			throw new InvalidRequestError(
				`Já existe uma transmissão com o nome "${broadcastData.name}" para este usuário.`,
				400,
			);
		}
	}

	const updateData = {
		...broadcastData,
		updatedAt: new Date(),
	};

	await updateDoc(broadcastRef, updateData);

	return {
		message: 'Transmissão atualizada com sucesso!',
	};
}
