import { Request, Response } from 'express';

import { AppError } from '../errors/AppError';

export default function errorMiddleware(
	err: Error | AppError,
	_req: Request,
	res: Response,
) {
	if (err instanceof AppError) {
		console.info('entrei aqui???');
		return res.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	}

	return res.status(500).json({
		status: 'error',
		message: 'Internal server error',
	});
}
