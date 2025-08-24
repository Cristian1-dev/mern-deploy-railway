import { createContext, useContext, useState } from "react";
import {
    crearTareaRequest, getTareasRequest, deleteTareaRequest,
    getTareaRequest, updateTareaRequest
} from "../api-peticiones/tarea.js";

export const TareaContexto = createContext();

export const usarTareaContexto = () => {
    const contexto = useContext(TareaContexto);
    if (!contexto) {
        throw new Error('usarTareaContexto debe ser usado dentro de TareaProvider');
    }
    return contexto
}

export const TareaProvider = ({ children }) => {
    const [tarea, setTarea] = useState([]);
    const [titulo, setTitulo] = useState(true)
    const limpiarTareas = () => setTarea([]);

    const creaTarea = async (nuevaTarea) => {
        try {
            const res = await crearTareaRequest(nuevaTarea)
            console.log(res.data);
            setTitulo(true)
            // Actualizar el estado local agregando la nueva tarea
            setTarea(prev => [...prev, res.data]);
        } catch (error) {
            console.log(error);

        }
    }
    const getTareas = async () => {
        try {
            const res = await getTareasRequest();
            setTarea(res.data);
            console.log(res);

        } catch (error) {
            console.log(error);

        }
    }

    const eliminarTarea = async (id) => {
        try {
            const res = await deleteTareaRequest(id)
            // Solo actualizar el estado local si la eliminación fue exitosa
            if (res.status === 200 || res.status === 204) {
                setTarea(prev => prev.filter((tarea) => tarea._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getTarea = async (id) => {
        try {
            console.log('Haciendo petición para tarea ID:', id);
            const res = await getTareaRequest(id);
            console.log('Respuesta del servidor:', res);
            return res.data;

        } catch (error) {
            console.log('Error al obtener tarea:', error);
            return null;
        }
    }

    const actualizarTarea = async (id, tareaActualizada) => {
        try {
            const res = await updateTareaRequest(id, tareaActualizada);
            // Actualizar el estado local con la tarea actualizada
            // setTarea(prev => prev.map(t => t._id === id ? res.data : t));
            getTareas();

        } catch (error) {
            console.log(error);
        }
    }







    return (
        <TareaContexto.Provider value={{
            tarea,
            creaTarea,
            getTareas,
            limpiarTareas,
            eliminarTarea,
            titulo,
            getTarea,
            actualizarTarea
        }} >
            {children}
        </TareaContexto.Provider>
    )
}

