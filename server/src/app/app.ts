import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import errorMiddleware from '../middleware/error';
import routes from '../router';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json({ limit: '100mb' }));
app.use(routes);

app.use(errorMiddleware)

export default app;
