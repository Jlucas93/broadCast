class AppError {
	public readonly message: string;

	public readonly statusCode: number;

	constructor(message: string, statusCode = 400) {
		this.message = message;
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

class InvalidRequestError extends AppError {
	constructor(message: string, statusCode: number) {
		super(message, statusCode);
	}
}

export { AppError, InvalidRequestError };
