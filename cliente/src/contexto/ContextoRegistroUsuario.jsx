import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { loginUsuario, registrarUsuario, verificarTokenUsuario } from "../api-peticiones/registro.js";
import Cookies from "js-cookie";



// importando solicitudes HTTP de api-peticiones
export const RegistroContexto = createContext();

// para importar el usarRegistroContexto para que nos traiga los datos
// del RegistroContexto.Provider values{{}}
export const UsarRegistroContexto = () => {
    const contexto = useContext(RegistroContexto);
    if (!contexto) { throw new Error("UsarRegistroContexto debe ser usado dentro de un RegistroContexto.Provider"); }
    return contexto;
}



export const RegistroProvider = ({ children }) => {
    // cuando se usa un registrar o un login vamos a llenar este user
    const [user, setUser] = useState(null);
    const [error, setError] = useState([])
    const [isAutenticated, setisAutenticate] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (error.length > 0) {
            const timer = setTimeout(() => {
                setError([])
            }, 5000)
            return () => clearTimeout(timer);

        }
    }, [error])

    // registrar usuario
    const registroUsuario = async (usuario) => {
        try {
            const res = await registrarUsuario(usuario);
            setUser(res.data);
            setisAutenticate(true);
            console.log(res.data);
        } catch (error) {
            // console.log(error.response.data);

            setError(error.response.data);

        }
    }

    // Login de usuario
    const login = async (usuario) => {
        try {
            const res = await loginUsuario(usuario);
            setUser(res.data);
            setisAutenticate(true);
            console.log(res);

        } catch (error) {
            // console.log(error.response.data);

            setError(error.response.data);

        }
    }

    // al momento de que cargue el componente que haga una comprobacion al backend
    useEffect(() => {
        async function checkLogin() {
            const cookieUser = Cookies.get();
            if (!cookieUser.token) {
                setisAutenticate(false)
                setLoading(false)
                return;
            }
            try {
                const res = await verificarTokenUsuario(cookieUser.token);
                // console.log(res);

                if (!res.data) {
                    setisAutenticate(false)
                    setLoading(false)
                    return;
                }
                setisAutenticate(true)
                setUser(res.data)
                setLoading(false)
                console.log(res.data);




            } catch (error) {
                setisAutenticate(false)
                setUser(null)
                setLoading(false)
            }
        }

        checkLogin();
    }, [])

    const logout = () => {
        Cookies.remove('token');
        setUser(null)
        setisAutenticate(false)

    }

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    return (
        <RegistroContexto.Provider value={{
            registroUsuario,
            user,
            error,
            isAutenticated,
            loading,
            login,
            logout
        }}>
            {children}
        </RegistroContexto.Provider>
    )
}