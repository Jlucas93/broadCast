import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

import { AppError } from '../errors/AppError';
export default function errorMiddleware(
	error: Error | AppError,
	_req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction,
) {
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			status: 'error',
			message: error.message,
		});
	}

	if (error instanceof ZodError) {
		return res
			.status(400)
			.json({ message: 'Validation error.', issues: error.format() });
	}

	return res.status(500).json({
		status: 'error',
		message: 'Internal server error',
	});
}
