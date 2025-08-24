import '../estilos/LoginPagina.css';
import { useForm } from 'react-hook-form';
import { UsarRegistroContexto } from '../contexto/ContextoRegistroUsuario.jsx';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const { login, error, isAutenticated } = UsarRegistroContexto();
    const manejarEnvio = handleSubmit(async (valores) => {
        const res = await login(valores);
    })

    useEffect(() => {
        if (isAutenticated) {
            navigate('/tareas')
        }
    }, [isAutenticated])

    

    return (
        <div className="pagina-login">
            <h1 className='login'>Login</h1>
            {/* errores del backend */}

            {error.length > 0 && (
                <div className='error-container'>
                    {error.map((err, index) => (
                        <p key={index} className='errorp'>{err}</p>
                    ))}
                </div>
            )}

            <form className="formulario-login" onSubmit={manejarEnvio}>

                <div className="input-grupo">
                    <input
                        type="text" className={`inputlogin ${errors.email ? 'input-error' : ""}`}
                        {...register('email', { required: "El email es requerido para iniciar sesion" })}
                        placeholder='email' autoFocus
                    />
                    {errors.email && <p className='error-message'>El email es requerido para iniciar sesion</p>}
                </div>

                <div className="input-grupo">
                    <input type="password" className={`inputlogin  ${errors.password ? 'input-error' : ""}`}
                        placeholder='password'
                        {...register('password', { required: "El password es requerido para iniciar sesion!" })}
                    />
                    {errors.password && <p className='error-message'>El password es requerido para iniciar sesion</p>}
                </div>
                <div className="yaregistro">
                <input type="submit" value="Login" className=' inputLogin inputcursor' />
                <div className='nocuenta'>
                <p>No tienes una cuenta? <Link to={'/registrar'} className='registro'>Registrarse</Link> </p>

                </div>
                </div>

            </form>
        </div>
    )
}