import express from 'express';

import authRoute from './routes/auth.routes';
import broadcastRoute from './routes/broadcast.routes';
import connectionRoute from './routes/connection.routes';
import contactRoute from './routes/contact.routes';
import healthCheckRoute from './routes/health.routes';

const routes = express.Router();

routes.use('/auth', authRoute);
routes.use('/health', healthCheckRoute);

routes.use('/contact', contactRoute);
routes.use('/connection', connectionRoute);
routes.use('/broadcast', broadcastRoute);

export default routes;
