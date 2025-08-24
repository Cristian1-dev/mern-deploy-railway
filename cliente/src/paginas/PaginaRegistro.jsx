import '../estilos/PaginaRegistro.css';
import { useForm } from 'react-hook-form';
import { UsarRegistroContexto } from '../contexto/ContextoRegistroUsuario.jsx';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export const PaginaRegistro = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registroUsuario, error, isAutenticated } = UsarRegistroContexto();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAutenticated) {
            navigate('/tareas');
        }
    }, [isAutenticated])

    const manejarEnvio = handleSubmit(async (valores) => {
        registroUsuario(valores);

    })
    return (
        <div className="pagina-registro">
            <h1 className='h1registro'>Registro</h1>
            {/* errores del backend */}
            {error.length > 0 && (
                <div className='error-container'>
                    {error.map((err, index) => (
                        <p key={index} className='errorp'>{err}</p>
                    ))}
                </div>
            )}
            <form onSubmit={manejarEnvio} className='formulario-registro'>
                <div className='input-group'>
                    <input
                        className={`inputform ${errors.username ? 'input-error' : ''}`}
                        type="text"
                        placeholder="username"
                        {...register("username", { required: "Username es requerido" })}
                        autoFocus
                    />
                    {errors.username && <p className='error-message'>Username es requerido</p>}
                </div>

                <div className='input-group'>
                    <input
                        className={`inputform ${errors.email ? 'input-error' : ''}`}
                        type="email"
                        placeholder="email"
                        {...register("email", {
                            required: "Email es requerido"
                        })}
                    />
                    {errors.email && <p className='error-message'>Email es requerido</p>}
                </div>

                <div className='input-group'>
                    <input
                        className={`inputform ${errors.password ? 'input-error' : ''}`}
                        type="password"
                        placeholder="password"
                        {...register("password", { required: "La contraseña es requerida" })}
                    />
                    {errors.password && <p className='error-message'>La contraseña es requerida</p>}
                </div>
                <div className='yacuenta'>
                    <input type="submit" value="Registrar" className='inputform inputEnviar' />
                    <div className='linkylogin'>
                        <p>Ya tienes cuenta? <Link to={'/login'} className='iniciarsesion'>Iniciar Sesion</Link> </p>
                    </div>

                </div>

            </form>
        </div>
    )
}