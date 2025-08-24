import { useNavigate, Outlet, Navigate } from "react-router-dom"
import { UsarRegistroContexto } from "./contexto/ContextoRegistroUsuario.jsx"


export const RutasProtegidas = () => {

    const { isAutenticated, loading } = UsarRegistroContexto();

    if (!loading && !isAutenticated) return <Navigate to={'/login'} replace/>
    return (
        <Outlet />
    )
}