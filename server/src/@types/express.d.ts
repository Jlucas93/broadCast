import { AppError } from '../errors/AppError';


declare global {
	namespace Express {
		interface Request {
			user?: {id: string, name: string, email: string};
		}

		interface Response {
			sendAppError: (error: AppError) => Response;
		}
	}
}
