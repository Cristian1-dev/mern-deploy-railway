import { email, z } from 'zod';

export const registroSchema = z.object({
    username: z.string({
        error: 'Nombre de usuario requerido'
    }),
    email: z.string({
        error: 'Email es requerido'

    }).email({
        error: 'Email no valido'
    }),

    password: z.string({
        error: "La contrasena es requerida"
    }).min(6, {
        error: "La contrasena debe tener al menos 6 digitos"
    })
});

export const loginSchema = z.object({
    email: z.string({
        error: "Email es requerido"
    }).email({
        error: "Email no valido"
    }),
    password: z.string({
        error: "La contrasena es requerida"
    }).min(6, {
        error: "La contrasena debe tener al menos 6 digitos"
    })
})

