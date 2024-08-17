import { Request, Response, NextFunction } from 'express';
import z from 'zod';

import { getAllContactsService } from '../services/contacts';
import { logger } from '../utils';

async function getAllContacts(req: Request, res: Response, next: NextFunction) {
	try {
		const { contacts } = await getAllContactsService();

		return res.status(201).json(contacts);
	} catch (error) {
		logger({
			message: error as string,
			type: 'error',
		});

		next(error);
	}
}

async function createContact(req: Request, res: Response, next: NextFunction) {
	try {
		const bodySchema = z.object({
			email: z.string(),
			password: z.string(),
		});

		const { email, password } = bodySchema.parse(req.body);

		return res.status(201).json({ email, password });
	} catch (error) {
		logger({
			message: error as string,
			type: 'error',
		});

		next(error);
	}
}

async function editContact(req: Request, res: Response, next: NextFunction) {
	try {
		const bodySchema = z.object({
			email: z.string(),
			password: z.string(),
		});

		const { email, password } = bodySchema.parse(req.body);

		return res.status(201).json({ email, password });
	} catch (error) {
		logger({
			message: error as string,
			type: 'error',
		});

		next(error);
	}
}

async function deleteContact(req: Request, res: Response, next: NextFunction) {
	try {
		const bodySchema = z.object({
			email: z.string(),
			password: z.string(),
		});

		const { email, password } = bodySchema.parse(req.body);

		return res.status(201).json({ email, password });
	} catch (error) {
		logger({
			message: error as string,
			type: 'error',
		});

		next(error);
	}
}

export { getAllContacts, createContact, editContact, deleteContact };
