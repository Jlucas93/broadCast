import app from './app/app';
import { logger } from './utils';

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () =>
	logger({
		message: `Server is running 🚀 on ${PORT}`,
		type: 'info',
	}),
);
