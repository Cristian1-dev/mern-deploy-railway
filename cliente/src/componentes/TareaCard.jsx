import '../estilos/TareaCard.css'
import { Link } from 'react-router-dom';

import { usarTareaContexto } from '../contexto/TareaContexto.jsx';


export const TareaCard = ({ tarea }) => {

    

    const {eliminarTarea, titulo} = usarTareaContexto();
    return (

        <div className="card">
            <div className="contenedor">
                <p>{tarea.titulo}</p>
                <div className="botones">
                    <button onClick={() => {eliminarTarea(tarea._id)}} className='eliminar'>Eliminar</button>
                    <button className='actual'> <Link to={`/actualizar/${tarea._id}` } className='actualizarboton'>Actualizar</Link></button>

                </div>

            </div>
            <p className='descripcion'>{tarea.descripcion}</p>
            <p className="fecha">{new Date(tarea.fecha).toLocaleDateString()}</p>

        </div>


    )
}