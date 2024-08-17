import { Router } from 'express';

import { createUser } from '../../controllers/user.controller';

const UserRoute = Router();

UserRoute.post('/', createUser);

export default UserRoute;
