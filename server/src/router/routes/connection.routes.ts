import { Router } from 'express';

import {
	getAllConnection,
	createConnection,
	updateConnection,
	deleteConnection,
} from '../../controllers/connections.controllet';
import jwt from '../../middleware/jwt';

const connectionRoute = Router();

connectionRoute.use(jwt);

connectionRoute.get('/', getAllConnection);
connectionRoute.put('/:id', updateConnection);
connectionRoute.post('/', createConnection);
connectionRoute.delete('/:id', deleteConnection);

export default connectionRoute;
