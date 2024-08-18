import {
	getFirestore,
	collection,
	query,
	getDocs,
	where,
} from 'firebase/firestore';

import { firebaseApp } from '../../database';

interface IConnection {
	id: string;
	name: string;
	active: boolean;
}

interface IReturn {
	connections: IConnection[];
}

export async function getAllConnectionsService({
	userID,
}: {
	userID: string;
}): Promise<IReturn> {
	const db = getFirestore(firebaseApp);
	const connectionCollection = collection(db, 'connections');

	const connectionQuery = query(
		connectionCollection,
		where('userID', '==', userID),
	);
	const connectionSnapshot = await getDocs(connectionQuery);

	const connections: IConnection[] = connectionSnapshot.docs.map(
		(doc) => ({ ...doc.data() }) as IConnection,
	);

	return {
		connections,
	};
}
