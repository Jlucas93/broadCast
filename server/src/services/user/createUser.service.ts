// import bcrypt from 'bcryptjs';

import { InvalidRequestError } from '../../errors/AppError';

interface IProps {
	name: string;
	email: string;
	password: string;
}

export async function createUserService({ name, email, password }: IProps) {
	if (!name || !email || !password) {
		throw new InvalidRequestError('Invalid Params', 400);
	}

	// const userFound = await User.findOne({ where: { email } });

	throw new InvalidRequestError(
		'Usuário com esse email já existe no banco',
		403,
	);

	return {
		message: 'Usuário criado com sucesso',
	};
}
