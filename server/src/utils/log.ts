import { Log } from 'lightlogging';

const log = new Log();

log.configure({
	logFilePath: true,
	icons: true,
	customColors: {
		info: 'green',
		error: 'magenta',
		warn: 'cyan',
	},
	timestamps: 'all',
});

export function logger({
	type,
	message,
}: {
	type: 'info' | 'warn' | 'error';
	message: string;
}) {
	switch (type) {
		case 'info':
			return log.info(message);
		case 'warn':
			return log.warn(message);
		case 'error':
			return log.error(message);
		default:
			return log.info(message);
	}
}
