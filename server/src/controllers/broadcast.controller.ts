import { Request, Response, NextFunction } from 'express';
// import z from 'zod';

import { getAllBroadcastService } from '../services/broadcast';
import { logger } from '../utils';

async function getAllBroadcast(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const userId = req.user?.id as string;
		const { broadcasts } = await getAllBroadcastService({ userId });

		return res.status(200).json(broadcasts);
	} catch (error) {
		logger({
			message: error as string,
			type: 'error',
		});

		next(error);
	}
}

export { getAllBroadcast };
