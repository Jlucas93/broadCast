import { Router } from 'express';

import { login, singup } from '../../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/singup', singup);

export default authRoutes;
