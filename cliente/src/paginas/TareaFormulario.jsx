import { usarTareaContexto } from '../contexto/TareaContexto';
import '../estilos/TareaFormulario.css';
import { useNavigate, useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export const TareaFormulario = () => {

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const { tarea, creaTarea, titulo, getTarea, actualizarTarea } = usarTareaContexto();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const conseTarea = async () => {
            if (params.id) {
                console.log('Obteniendo tarea con ID:', params.id);
                const tarea = await getTarea(params.id)
                console.log('Tarea obtenida:', tarea);

                if (tarea) {
                    setValue('titulo', tarea.titulo)
                    setValue('descripcion', tarea.descripcion)
                }
            } else {
                // Limpiar completamente el formulario cuando no hay ID (modo crear)
                reset()
            }
        }
        conseTarea();

    }, [params.id])


    // console.log(tarea);


    // ----------------------------------------------------------------------------------------
    const manejarEnvio = handleSubmit((values) => {

        if (params.id) {
            actualizarTarea(params.id, values)
        } else {
            creaTarea(values);
        }

        navigate('/tareas');



    }
    )
    return (
        <div className="tareaFormulario">
            <h1 className='h1crearTarea'>{params.id ? "Actualizar Tarea" : "Crear Tarea"}</h1>
            <form onSubmit={manejarEnvio} className='contenedor-formulario'>
                <div className='input-group'>
                    <input
                        className={`inputTarea ${errors.titulo ? 'input-error' : ''}`}
                        type="text"
                        placeholder='Ingrese tarea'
                        autoFocus
                        {...register('titulo', { required: "El titulo es requerido" })}
                    />
                    {errors.titulo && <p className='error-message'>El titulo es requerido</p>}
                </div>

                <div className="input-group">
                    <textarea
                        className={`inputTarea textarea ${errors.descripcion ? 'input-error' : ''}`}
                        type="text"
                        rows={8}
                        placeholder='Descripcion'
                        {...register('descripcion', { required: "La descripcion es requerida" })}
                    />
                    {errors.descripcion && <p className='error-message'>La descripcion es requerida</p>}
                </div>
                {/* <textarea <textarea> */}
                <div className='contenedor-boton'>
                    <input className='CrearTareaboton' type="submit" value={params.id ? "Actualizar" : "Crear"} />
                </div>
            </form>

        </div>
    )
}