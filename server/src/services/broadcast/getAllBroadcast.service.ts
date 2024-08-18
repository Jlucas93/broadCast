import {
	getFirestore,
	collection,
	query,
	getDocs,
	where,
} from 'firebase/firestore';

import { firebaseApp } from '../../database';

interface IBroadcast {
	id: string;
	name: string;
	status: string;
	sendDate: string;
	sendTime: string;
	connectionID: string;
	userID: string;
	contactsIDs: string[];
}

interface IReturn {
	broadcasts: IBroadcast[];
}

export async function getAllBroadcastService({
	userId,
}: {
	userId: string;
}): Promise<IReturn> {
	const db = getFirestore(firebaseApp);
	const boradcastCollection = collection(db, 'broadcasts');

	const broadcastQuery = query(
		boradcastCollection,
		where('userId', '==', userId),
	);

	const broadcastSnapshot = await getDocs(broadcastQuery);

	const broadcasts: IBroadcast[] = broadcastSnapshot.docs.map(
		(doc) => ({ ...doc.data() }) as IBroadcast,
	);

	return {
		broadcasts,
	};
}
