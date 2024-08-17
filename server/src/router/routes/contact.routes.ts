import { Router } from 'express';

import { getAllContacts } from '../../controllers/contact.controller';
import jwt from '../../middleware/jwt';

const contactRoute = Router();

contactRoute.get('/', jwt, getAllContacts);

export default contactRoute;
