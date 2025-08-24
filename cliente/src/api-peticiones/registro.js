
import {instancia} from "./axios";


export const registrarUsuario = user => instancia.post('/registrar', user);
export const loginUsuario = user => instancia.post('/login', user);
export const verificarTokenUsuario = user => instancia.get('/veriTokendesFrontend', user);


