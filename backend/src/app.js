import express from 'express';
import morgan from 'morgan';
import authRouter from './rutas/auth.ruta.js';
import tareaRouter from './rutas/tareas.ruta.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';




export const app = express();
app.use(cors({
    // origin: 'http://localhost:5173',
    origin: 'https://backend-production-afec.up.railway.app',
    credentials: true
}));

app.use(cookieParser());

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', authRouter);
app.use('/api', tareaRouter);

