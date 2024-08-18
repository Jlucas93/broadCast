import { Request, Response, NextFunction } from 'express';
import z from 'zod';

import {
	getAllConnectionsService,
	createConnectionService,
	deleteConnectionService,
	updateConnectionService,
} from '../services/connections';
import { logger } from '../utils';

async function getAllConnection(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const userId = req.user?.id as string;
		const { connections } = await getAllConnectionsService({ userId });

		return res.status(200).json(connections);
	} catch (error) {
		logger({
			message: error as string,
			type: 'error',
		});

		next(error);
	}
}

async function createConnection(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const bodySchema = z.object({
			status: z.boolean(),
			name: z.string(),
		});

		const userId = req.user?.id as string;

		const { status, name } = bodySchema.parse(req.body);

		const { message } = await createConnectionService({
			status,
			name,
			userId,
		});

		return res.status(201).json({ message });
	} catch (error) {
		logger({
			message: error as string,
			type: 'error',
		});

		next(error);
	}
}

async function updateConnection(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const bodySchema = z.object({
			name: z.string().or(z.undefined()),
			status: z.boolean().or(z.undefined()),
		});

		const paramsSchema = z.object({
			id: z.string(),
		});
		const { id } = paramsSchema.parse(req.params);

		const { status, name } = bodySchema.parse(req.body);

		const { message } = await updateConnectionService({
			connection: {
				name,
				status,
			},
			id,
		});

		return res.status(201).json({ message });
	} catch (error) {
		logger({
			message: error as string,
			type: 'error',
		});

		next(error);
	}
}

async function deleteConnection(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const paramsSchema = z.object({
			id: z.string(),
		});

		const { id } = paramsSchema.parse(req.params);

		const { message } = await deleteConnectionService({ id });

		return res.status(200).json({ message });
	} catch (error) {
		logger({
			message: error as string,
			type: 'error',
		});

		next(error);
	}
}

export {
	getAllConnection,
	createConnection,
	updateConnection,
	deleteConnection,
};
