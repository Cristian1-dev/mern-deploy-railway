
export const validarRegistro_Login = (schema_Registro_Login) => (req, res, next) => {
    try {
        schema_Registro_Login.parse(req.body);
        next();
    } catch (error) {
        console.log(error.issues);
        return res.status(400).json(error.issues.map(error => error.message));           
        
    };
};