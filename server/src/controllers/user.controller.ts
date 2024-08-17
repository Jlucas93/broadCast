import { Request, Response, NextFunction } from 'express';
import z from 'zod';

import { createUserService } from '../services/user';
import { logger } from '../utils';

async function createUser(req: Request, res: Response, next: NextFunction) {
	try {
		const bodySchema = z.object({
			email: z.string(),
			name: z.string(),
			password: z.string(),
		});

		const { email, name, password } = bodySchema.parse(req.body);
		console.info({
			email,
			name,
			password,
		});

		await createUserService({
			email,
			name,
			password,
		});

		return res.status(201).json('feito');
	} catch (error) {
		logger({
			message: error as string,
			type: 'error',
		});

		next(error);
	}
}

export { createUser };
