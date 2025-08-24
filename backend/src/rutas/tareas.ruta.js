import { Router } from "express";
import { actualizarTarea, crear_tarea, eliminarTarea, getTarea, getTareas, perfil } from "../controlador/tareas.controlador.js";
import { validarToken } from "../middlewares/validarToken.js";

const router = Router();

router.post('/crear-tarea', validarToken, crear_tarea);
router.get('/tareas', validarToken, getTareas);
router.get('/tarea/:id', validarToken, getTarea);
router.put('/actualizar-tarea/:id', validarToken, actualizarTarea);
router.delete('/eliminar-tarea/:id', validarToken, eliminarTarea);
router.post('/perfil', validarToken, perfil );


export default router;