import { Request, Response, NextFunction } from 'express';
import z from 'zod';

import {
	getAllContactsService,
	createContactService,
	deleteContactService,
	updateContactService,
} from '../services/contacts';
import { logger } from '../utils';

async function getAllContacts(req: Request, res: Response, next: NextFunction) {
	try {
		const userId = req.user?.id as string;
		const { contacts } = await getAllContactsService({ userId });

		return res.status(200).json(contacts);
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
			name: z.string(),
			phone: z.string(),
		});

		const userId = req.user?.id as string;

		console.info({ userId });

		const { email, phone, name } = bodySchema.parse(req.body);

		const { message } = await createContactService({
			email,
			name,
			phone,
			userId,
		});

		return res.status(201).json({ message });
	} catch (error) {
		logger({
			message: error as string,
			type: 'error',
		});

		next(error);
	}
}

async function updateContact(req: Request, res: Response, next: NextFunction) {
	try {
		const bodySchema = z.object({
			email: z.string().or(z.undefined()),
			name: z.string().or(z.undefined()),
			phone: z.string().or(z.undefined()),
		});

		const paramsSchema = z.object({
			id: z.string(),
		});
		const { id } = paramsSchema.parse(req.params);

		const { email, name, phone } = bodySchema.parse(req.body);

		const { message } = await updateContactService({
			contact: {
				email,
				name,
				phone,
			},
			id,
		});

		return res.status(201).json({ message });
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
		const paramsSchema = z.object({
			id: z.string(),
		});

		const { id } = paramsSchema.parse(req.params);

		const { message } = await deleteContactService({ id });

		return res.status(200).json({ message });
	} catch (error) {
		logger({
			message: error as string,
			type: 'error',
		});

		next(error);
	}
}

export { getAllContacts, createContact, updateContact, deleteContact };
