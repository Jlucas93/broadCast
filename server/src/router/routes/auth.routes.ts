import { Router } from 'express';

import { login, singup } from '../../controllers/auth.controller';

const AuthRoutes = Router();

AuthRoutes.post('/login', login);
AuthRoutes.post('/singup', singup);

export default AuthRoutes;
