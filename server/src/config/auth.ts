import { ENV } from './env';

export default {
	secret: ENV.APP_SECRET as string,
	expiresIn: '3d',
};
