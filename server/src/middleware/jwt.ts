import { FastifyReply, FastifyRequest } from 'fastify';

export default async function jwtMiddleware(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		await request.jwtVerify();
	} catch (err) {
		console.error(err);
		return reply.status(401).send({ message: 'Unauthorized.' });
	}
}
