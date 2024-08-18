import { Router } from 'express';

import {
	getAllContacts,
	createContact,
	deleteContact,
	updateContact,
} from '../../controllers/contact.controller';
import jwt from '../../middleware/jwt';

const contactRoute = Router();

contactRoute.use(jwt);

contactRoute.get('/', getAllContacts);
contactRoute.post('/', createContact);
contactRoute.put('/:id', updateContact);
contactRoute.delete('/:id', deleteContact);

export default contactRoute;
