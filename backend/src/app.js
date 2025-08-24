import express from 'express';
import morgan from 'morgan';
import authRouter from './rutas/auth.ruta.js';
import tareaRouter from './rutas/tareas.ruta.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';




export const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', authRouter);
app.use('/api', tareaRouter);

