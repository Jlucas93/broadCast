import { Request, Response } from 'express';
import z from 'zod';

import { createUserService } from '../services/user';

async function createUser(req: Request, res: Response) {
	const bodySchema = z.object({
		email: z.string(),
		name: z.string(),
		password: z.string(),
	});

	const { email, name, password } = bodySchema.parse(req.body);

	const { user_id } = await createUserService({
		email,
		name,
		password,
	});

	return res.status(201).json({ user_id });
}

export { createUser };
