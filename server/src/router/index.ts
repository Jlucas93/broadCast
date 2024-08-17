import express from 'express';

// import { auth } from '../middlewares/auth';
import healthCheckRoute from './routes/health.routes';

const routes = express.Router();


routes.use('/health', healthCheckRoute);


export default routes;
