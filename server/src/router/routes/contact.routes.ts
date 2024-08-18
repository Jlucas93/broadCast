import { Router } from 'express';

import {
	getAllContacts,
	createContact,
	deleteContact,
	updateContact,
} from '../../controllers/contact.controller';
import jwt from '../../middleware/jwt';

const contactRoute = Router();

contactRoute.get('/', jwt, getAllContacts);
contactRoute.post('/', jwt, createContact);
contactRoute.put('/:id', jwt, updateContact);
contactRoute.delete('/:id', jwt, deleteContact);

export default contactRoute;
