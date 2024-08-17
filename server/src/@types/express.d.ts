import { AppError } from '../errors/AppError';
import { User } from '../models';

// src/types/express/index.d.ts

// declare module 'express' {
// 	export interface Request {
// 		user?: User;
// 		userId?: string;
// 	}
// }

declare global {
	namespace Express {
		interface Request {
			user?: User;
			userId?: string;
		}
		interface Response {
			sendAppError: (error: AppError) => Response;
		}
	}
}
