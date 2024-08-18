import { Router } from 'express';

import { getAllBroadcast } from '../../controllers/broadcast.controller';
import jwt from '../../middleware/jwt';

const broadcastRoute = Router();

broadcastRoute.use(jwt);

broadcastRoute.get('/', getAllBroadcast);
// broadcastRoute.put('/:id', updateConnection);
// broadcastRoute.post('/', createConnection);
// broadcastRoute.delete('/:id', deleteConnection);

export default broadcastRoute;
