import { instancia } from "./axios";

export const crearTareaRequest = (tarea) => instancia.post('/crear-tarea', tarea);
export const getTareasRequest = () => instancia.get('/tareas');
export const deleteTareaRequest = (id) => instancia.delete(`/eliminar-tarea/${id}`);
export const getTareaRequest = (id) => instancia.get(`/tarea/${id}`);
export const updateTareaRequest = (id, tarea) => instancia.put(`/actualizar-tarea/${id}`, tarea);