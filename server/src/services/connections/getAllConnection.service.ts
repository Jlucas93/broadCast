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
	status: string;
}

interface IReturn {
	connections: IConnection[];
}

export async function getAllConnectionsService({
	userId,
}: {
	userId: string;
}): Promise<IReturn> {
	const db = getFirestore(firebaseApp);
	const connectionCollection = collection(db, 'connections');

	const connectioQuery = query(
		connectionCollection,
		where('userId', '==', userId),
	);
	const connectionSnapshot = await getDocs(connectioQuery);

	const connections: IConnection[] = connectionSnapshot.docs.map(
		(doc) => ({ ...doc.data() }) as IConnection,
	);

	return {
		connections,
	};
}
