import { Router } from 'express';

const healthCheckRoute = Router();

healthCheckRoute.get('/', (_req, res) => {
	return res.json({ message: 'Server is running!' });
});

export default healthCheckRoute;
