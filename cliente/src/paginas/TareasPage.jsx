import { useEffect } from "react";
import { UsarRegistroContexto } from "../contexto/ContextoRegistroUsuario.jsx"
import { usarTareaContexto } from "../contexto/TareaContexto.jsx";
import { TareaCard } from "../componentes/TareaCard.jsx";
import '../estilos/TareasPage.css'

export const TareasPage = () => {
    const { tarea, getTareas } = usarTareaContexto();
    const { user } = UsarRegistroContexto();


    useEffect(() => {
        getTareas();
    }, []);

    if (tarea.length === 0) {
        return <h1>No hay tareas para este Usuario</h1>
    }

    return (
        <>
            <div className="contenedor-general">
                <h1 className="tituloTareas">Tareas de {user.username.toUpperCase()}</h1>
                <div className="contenedor-card">

                    {tarea.map((tarea) => {
                        return (
                            <TareaCard key={tarea.id ?? tarea._id ?? `tarea-${index}`}  tarea={tarea} />
                        )
                    })}
                </div>
            </div>



        </>
    )
}