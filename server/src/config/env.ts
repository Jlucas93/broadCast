import * as dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchema = z.object({
	PORT: z.number().optional().default(9010),
	PROXY_PORT: z.number().optional().default(9010),
	NODE_ENV: z.string().default('DEVELOPMENT'),

});

export const ENV = envSchema.parse({
	PORT: Number(process.env.PORT),
	PROXY_PORT: Number(process.env.PROXY_PORT),
	NODE_ENV: process.env.NODE_ENV,


});
