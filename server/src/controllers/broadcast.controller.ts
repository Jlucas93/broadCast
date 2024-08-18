import { Request, Response, NextFunction } from 'express';
import z from 'zod';

import {
	createBroadcastService,
	deleteBroadcastService,
	getAllBroadcastsService,
	updateBroadcastService,
} from '../services/broadcast';
import { logger } from '../utils';

async function getAllBroadcasts(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const userID = req.user?.id as string;
		const { broadcasts } = await getAllBroadcastsService({ userID });

		return res.status(200).json(broadcasts);
	} catch (error) {
		logger({
			message: error instanceof Error ? error.message : String(error),
			type: 'error',
		});

		next(error);
	}
}

async function createBroadcast(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const bodySchema = z.object({
			name: z.string(),
			status: z.string(),
			broadcastMessage: z.string(),
			sendDate: z.string(),
			sendTime: z.string(),
			connectionID: z.string(),
			contactsIDs: z.array(z.string()),
		});

		const userID = req.user?.id as string;

		const {
			name,
			status,
			sendDate,
			sendTime,
			connectionID,
			contactsIDs,
			broadcastMessage,
		} = bodySchema.parse(req.body);

		const { message } = await createBroadcastService({
			name,
			status,
			sendDate,
			sendTime,
			connectionID,
			contactsIDs,
			broadcastMessage,
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

async function deleteBroadcast(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { id } = req.params;
		const userID = req.user?.id as string;

		await deleteBroadcastService({ id, userID });

		return res
			.status(200)
			.json({ message: 'Transmissão deletada com sucesso!' });
	} catch (error) {
		logger({
			message: error instanceof Error ? error.message : String(error),
			type: 'error',
		});

		next(error);
	}
}

async function updateBroadcast(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { id } = req.params;
		const userID = req.user?.id as string;

		const bodySchema = z.object({
			name: z.string().optional(),
			status: z.string().optional(),
			broadcastMessage: z.string().optional(),
			sendDate: z.string().optional(),
			sendTime: z.string().optional(),
			connectionID: z.string().optional(),
			contactsIDs: z.array(z.string()).optional(),
		});

		const updateData = bodySchema.parse(req.body);

		const { message } = await updateBroadcastService({
			id,
			broadcast: {
				...updateData,
				userID,
			},
		});

		return res.status(200).json({ message });
	} catch (error) {
		logger({
			message: error instanceof Error ? error.message : String(error),
			type: 'error',
		});

		next(error);
	}
}

export { getAllBroadcasts, createBroadcast, deleteBroadcast, updateBroadcast };
