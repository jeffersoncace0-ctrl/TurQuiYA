import Usuario from '../model/Usuario.js';
import bcrypt from 'bcrypt';

export const registrarUsuario = async (req, res) => {
    const { nombre, correo, password } = req.body;

    if (!nombre || !correo || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).json({ error: 'El formato del correo electrónico no es válido.' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._#-])[A-Za-z\d@$!%*?&._#-]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ 
            error: 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.' 
        });
    }

    try {
        const usuarioExistente = await Usuario.buscarPorCorreo(correo);
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        const saltRounds = 10;
        const passwordEncriptado = await bcrypt.hash(password, saltRounds);

        const nuevoUsuario = await Usuario.crear(nombre, correo, passwordEncriptado);

        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente.',
            usuario: nuevoUsuario
        });

    } catch (error) {
        console.error('Error interno en el registro:', error);
        return res.status(500).json({ error: 'Error interno del servidor al procesar el registro.' });
    }
};