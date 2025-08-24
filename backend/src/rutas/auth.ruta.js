import { Router } from "express";
import { login, logout, registrar, veriTokendesFrontend } from "../controlador/auth.controlador.js";
import { loginSchema, registroSchema } from "../validacionesZod/registro_Login_Zod.js";
import { validarRegistro_Login } from "../middlewares/validar_Registro_Login.js";

const router = Router();

router.post('/registrar', validarRegistro_Login(registroSchema), registrar);
router.post('/login', validarRegistro_Login(loginSchema),login);
router.post('/logout', logout);
router.get('/veriTokendesFrontend', veriTokendesFrontend)

export default router;