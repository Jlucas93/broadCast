import { Router } from 'express';

const HealthCheckRoute = Router();

HealthCheckRoute.get('/',(_req, res)=>{
	return res.json({ message: 'Server is running!' });
});


export default HealthCheckRoute;
