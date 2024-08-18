import { Request, Response, NextFunction } from 'express';
import z from 'zod';

import {
	getAllConnectionsService,
	getActiveConnectionsService,
	createConnectionService,
	deleteConnectionService,
	updateConnectionService,
} from '../services/connections';
import { logger } from '../utils';

async function getAllConnections(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const userID = req.user?.id as string;
		const { connections } = await getAllConnectionsService({ userID });

		return res.status(200).json(connections);
	} catch (error) {
		logger({
			message: error instanceof Error ? error.message : String(error),
			type: 'error',
		});

		next(error);
	}
}

async function getActiveConnections(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const userID = req.user?.id as string;
		const { connections } = await getActiveConnectionsService({ userID });

		return res.status(200).json(connections);
	} catch (error) {
		logger({
			message: error instanceof Error ? error.message : String(error),
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
			active: z.boolean(),
			name: z.string(),
		});

		const userID = req.user?.id as string;

		const { active, name } = bodySchema.parse(req.body);

		const { message } = await createConnectionService({
			active,
			name,
			userID,
		});

		return res.status(201).json({ message });
	} catch (error) {
		logger({
			message: error instanceof Error ? error.message : String(error),
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
			id: z.string().or(z.undefined()),
			name: z.string().or(z.undefined()),
			active: z.boolean().or(z.undefined()),
		});

		const paramsSchema = z.object({
			id: z.string(),
		});
		const { id } = paramsSchema.parse(req.params);

		const { active, name } = bodySchema.parse(req.body);

		const { message } = await updateConnectionService({
			connection: {
				name,
				active,
				userID: req.user?.id as string,
			},
			id,
		});

		return res.status(201).json({ message });
	} catch (error) {
		logger({
			message: error instanceof Error ? error.message : String(error),
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

		const userID = req.user?.id as string;

		const { message } = await deleteConnectionService({ id, userID });

		return res.status(200).json({ message });
	} catch (error) {
		logger({
			message: error instanceof Error ? error.message : String(error),
			type: 'error',
		});

		next(error);
	}
}

export {
	getAllConnections,
	getActiveConnections,
	createConnection,
	updateConnection,
	deleteConnection,
};
