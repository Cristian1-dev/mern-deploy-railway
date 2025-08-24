import '../estilos/Navbar.css'

import { Link } from 'react-router-dom'
import { UsarRegistroContexto } from '../contexto/ContextoRegistroUsuario.jsx'
import { usarTareaContexto } from '../contexto/TareaContexto'

export const Navbar = () => {
    const { user, isAutenticated, logout } = UsarRegistroContexto();
    const { limpiarTareas } = usarTareaContexto();

    return (
        <nav className="navbar">
            <h1> <Link to='/'>Administrador de Tareas</Link></h1>
            <ul className='links'>

                {isAutenticated ? (
                    <>
                        <li className='bienvenidoUsuario'>Bienvenido {user.username.toUpperCase()}</li>
                        <li><Link to='/tareas'>Tareas</Link></li>
                        <li><Link to='/crear-tarea'>Nueva Tarea</Link></li>
                        <li><Link to='/' onClick={() => {
                            limpiarTareas();
                            logout();
                        }}>Cerrar Sesion</Link></li>

                    </>
                ) : (
                    <>
                        <li><Link to='/login' >Login</Link></li>
                        <li> <Link to='/registrar'>Registrarse</Link></li>
                    </>
                )}
            </ul>
        </nav>
    )
}