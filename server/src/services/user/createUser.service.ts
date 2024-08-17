// import bcrypt from 'bcryptjs';

import { InvalidRequestError } from '../../errors/AppError';
import { logger } from '../../utils';

interface IProps {
	name: string;
	email: string;
	password: string;
	company_id: number;
	profile_id: number;
	queue_ids: number[];
	groups_ids: number[];
	whatsapp_ids: number[];
	image_url: string;
}

export async function createUserService({ name, email, password }: IProps) {
	try {
		if (!name || !email || !password) {
			throw new InvalidRequestError('Invalid Params', 400);
		}

		// const userFound = await User.findOne({ where: { email } });

		if (true)
			throw new InvalidRequestError(
				'Usuário com esse email já existe no banco',
				403,
			);

		return {
			message: 'Usuário criado com sucesso',
		};
	} catch (error) {
		logger({
			message: error as string,
			type: 'error',
		});

		throw new InvalidRequestError('Internal server error', 500);
	}
}
