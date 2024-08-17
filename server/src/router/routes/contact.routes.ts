import { Router } from 'express';

import jwt from '../../middleware/jwt';
const ContactRoute = Router();

ContactRoute.post('/create', jwt, (req, res) => {
	return res.json({ message: 'Hello World' });
});

export default ContactRoute;
