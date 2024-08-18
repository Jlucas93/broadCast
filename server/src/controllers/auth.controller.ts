import { Request, Response, NextFunction } from 'express';
import z from 'zod';

import { loginService, singupService } from '../services/auth';
import { logger } from '../utils';

async function singup(req: Request, res: Response, next: NextFunction) {
	try {
		const bodySchema = z.object({
			email: z.string(),
			name: z.string(),
			password: z.string(),
		});

		const { email, name, password } = bodySchema.parse(req.body);

		const { message } = await singupService({
			email,
			name,
			password,
		});

		return res.status(201).json({ message });
	} catch (error) {
		logger({
			message: error,
			type: 'error',
		});

		next(error);
	}
}

async function login(req: Request, res: Response, next: NextFunction) {
	try {
		const bodySchema = z.object({
			email: z.string(),
			password: z.string(),
		});

		const { email, password } = bodySchema.parse(req.body);

		const { user, token } = await loginService({ email, password });

		return res.status(201).json({ user, token });
	} catch (error) {
		logger({
			message: error,
			type: 'error',
		});

		next(error);
	}
}

export { singup, login };
