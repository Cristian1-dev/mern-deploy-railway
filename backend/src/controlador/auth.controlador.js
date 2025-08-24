import User from '../modelos/user.model.js'
import { tokenDeAcceso } from '../Token/jwt.js';
import { TOKEN_SECRET } from '../config.js';
import bcryptj from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const registrar = async (req, res) => {
    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(['Email ya registrado, intente con otro correo!'])

    try {
        const passwordHash = await bcryptj.hash(password, 10);

        const nuevoUsuario = await new User({
            username,
            email,
            password: passwordHash
        });

        const usuarioGuardado = await nuevoUsuario.save();

        // crear token
        const token = await tokenDeAcceso({ id: usuarioGuardado.id })
        res.cookie('token', token)

        res.json({
            id: usuarioGuardado.id,
            username: usuarioGuardado.username,
            email: usuarioGuardado.email,
            // password: usuarioGuardado.password

        });

        console.log(usuarioGuardado);
    } catch (error) {
        return res.status(500).json(['Error al registrar'])
    }

};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(404).json(['Usuario no encontrado']);
        const isMatch = await bcryptj.compare(password, userFound.password);
        if (!isMatch) return res.status(404).json(['Contraseña incorrecta']);
        const token = await tokenDeAcceso({ id: userFound.id })
        res.cookie('token', token);

        res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email
        });

    } catch (error) {
        return res.status(500).json(['No hay token, error al iniciar'])

    };
};

export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const veriTokendesFrontend = (req, res) => {
    const {token} = req.cookies;
    if(!token) return res.status(401).json(['No autorizado']);
    
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json(['No autorizado']);

        const userFound = await User.findById(user.id);
        if(!userFound) return res.status(401).json(['No autorizado']);

        return res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email
        });
    })
}

