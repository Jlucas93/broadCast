import * as dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchema = z.object({
	PORT: z.number().optional().default(9010),
	PROXY_PORT: z.number().optional().default(9010),
	NODE_ENV: z.string().default('DEVELOPMENT'),
	APP_SECRET: z.string().default('secrectKey'),
	API_KEY: z.string(),
	AUTH_DOMAIN: z.string(),
	PROJECT_ID: z.string(),
	STORAGE_BUCKET: z.string(),
	MESSAGING_SENDER_ID: z.string(),
	APP_ID: z.string(),
});

export const ENV = envSchema.parse({
	PORT: Number(process.env.PORT),
	PROXY_PORT: Number(process.env.PROXY_PORT),
	NODE_ENV: process.env.NODE_ENV,
	APP_SECRET: process.env.APP_SECRET,
	API_KEY: process.env.API_KEY,
	AUTH_DOMAIN: process.env.AUTH_DOMAIN,
	PROJECT_ID: process.env.PROJECT_ID,
	STORAGE_BUCKET: process.env.STORAGE_BUCKET,
	MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
	APP_ID: process.env.APP_ID,
});
