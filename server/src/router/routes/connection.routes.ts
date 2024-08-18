import { Router } from 'express';

import {
	getAllConnections,
	getActiveConnections,
	createConnection,
	updateConnection,
	deleteConnection,
} from '../../controllers/connections.controllet';
import jwt from '../../middleware/jwt';

const connectionRoute = Router();

connectionRoute.use(jwt);

connectionRoute.get('/', getAllConnections);
connectionRoute.get('/active', getActiveConnections);
connectionRoute.put('/:id', updateConnection);
connectionRoute.post('/', createConnection);
connectionRoute.delete('/:id', deleteConnection);

export default connectionRoute;
