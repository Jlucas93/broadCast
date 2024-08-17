require('dotenv/config');

export default {
	secret: process.env.APP_SECRET as string,
	expiresIn: '3d',
};
