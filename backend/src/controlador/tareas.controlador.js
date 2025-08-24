import Tarea from '../modelos/tarea.model.js';
import User from '../modelos/user.model.js';


export const crear_tarea = async (req, res) => {
    const { titulo, descripcion } = req.body;
    try {
        const tareaNueva = await new Tarea({
            titulo,
            descripcion,
            user: req.user.id
        });
        const tareaGuardada = await tareaNueva.save();
        res.json({
            _id: tareaGuardada._id,
            titulo: tareaGuardada.titulo,
            descripcion: tareaGuardada.descripcion,
            fecha: tareaGuardada.fecha
        });
    } catch (error) {
        return res.status(500).json(['Error al crear la Tarea!'])
    }
}

export const getTareas = async (req, res) => {
    try {
        console.log(req.user.id);
        // porque .find siempre retorna un [], no null poreso se usa .length === 0
        const tarea = await Tarea.find({ user: req.user.id });
        if (tarea.length === 0) return res.status(404).json(['No se encontraron tareas para este Usuario!']);
        // console.log(tarea);
        res.json(tarea)
    } catch (error) {
        return res.status(404).json(['Error al obtener las Tareas!']);

    }
}

export const getTarea = async (req, res) => {
    try {
        // findById retorna null por eso solo se necesita !tareaFound
        const tareaFound = await Tarea.findById(req.params.id);
        if (!tareaFound) return res.status(404).json(['Tarea no encontrada!']);

        // Verificar que el usuario autenticado sea el propietario de la tarea
        if (req.user.id !== tareaFound.user.toString()) return res.status(401).json(['No autorizado!']);
        res.json(tareaFound);
    } catch (error) {
        return res.status(404).json(['Error al obtener la Tarea!']);
    }
}

export const actualizarTarea = async (req, res) => {
    try {
        // Primero buscar la tarea sin actualizarla
        const tarea = await Tarea.findById(req.params.id);
        if (!tarea) return res.status(404).json(['Tarea no encontrada!']);
        if (req.user.id !== tarea.user.toString()) return res.status(401).json(['No autorizado para actualizar!']);

        // Ahora sí actualizar la tarea
        const tareaActualizada = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            _id: tareaActualizada._id,
            titulo: tareaActualizada.titulo,
            descripcion: tareaActualizada.descripcion,
            fecha: tareaActualizada.fecha
        });
    } catch (error) {
        return res.status(404).json(['Error al actualizar la Tarea!']);
    }
}

export const eliminarTarea = async (req, res) => {
    try {
        // Primero buscar la tarea sin eliminarla
        const tareaFound = await Tarea.findById(req.params.id);
        if (!tareaFound) return res.status(404).json(['Tarea no encontrada!']);
        if (req.user.id !== tareaFound.user.toString()) return res.status(401).json(['No autorizado para eliminar!']);

        // Ahora sí eliminar la tarea
        await Tarea.findByIdAndDelete(req.params.id);
        res.json(['Tarea eliminada con exito!']);
    } catch (error) {
        return res.status(404).json(['Error al eliminar la Tarea!']);
    }
}

export const perfil = async (req, res) => {
    try {
        // .select('-password'); excluye la contrasena por seguridad
        const userFound = await User.findById(req.user.id).select('-password');
        if (!userFound) return res.status(404).json(['Usuario no encontrado!']);

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    } catch (error) {
        return res.status(500).json(['Error al obtener el perfil!']);
    }
}