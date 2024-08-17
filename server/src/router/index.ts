import express from 'express';

// import { auth } from '../middlewares/auth';
import authRoute from './routes/auth.routes';
import contactRoute from './routes/contact.routes';
import healthCheckRoute from './routes/health.routes';

const routes = express.Router();

routes.use('/auth', authRoute);
routes.use('/contact', contactRoute);

routes.use('/health', healthCheckRoute);

export default routes;
