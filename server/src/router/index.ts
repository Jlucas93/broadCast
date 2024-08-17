import express from 'express';

// import { auth } from '../middlewares/auth';
import healthCheckRoute from './routes/health.routes';
import userRoute from './routes/user.routes';

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/health', healthCheckRoute);

export default routes;
