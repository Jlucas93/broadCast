import { Router } from 'express';

import {
	getAllBroadcasts,
	createBroadcast,
	deleteBroadcast,
	updateBroadcast,
} from '../../controllers/broadcast.controller';
import jwt from '../../middleware/jwt';

const broadcastRoute = Router();

broadcastRoute.use(jwt);

broadcastRoute.get('/', getAllBroadcasts);
broadcastRoute.post('/', createBroadcast);
broadcastRoute.put('/:id', updateBroadcast);
broadcastRoute.delete('/:id', deleteBroadcast);

export default broadcastRoute;
