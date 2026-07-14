const db = require('../config/db');

const Paciente = {
    // 🔍 Obtener todos los pacientes con sus datos de usuario (para la tabla general)
    obtenerTodos: async () => {
        const [rows] = await db.query(`
            SELECT 
                p.id_paciente,
                p.id_usuario,
                p.tipo_sangre,
                p.sexo,
                p.fecha_nacimiento,
                p.telefono,
                p.direccion,
                p.estado,
                u.nombre,
                u.apellido,
                u.documento,
                u.correo
            FROM paciente p
            LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
        `);
        return rows; // Retorna el arreglo completo de pacientes
    },

    // ➕ Crear un nuevo registro de paciente
    crear: async (datos) => {
        const { id_usuario, tipo_sangre, sexo, fecha_nacimiento, telefono, direccion, estado } = datos;
        const query = `INSERT INTO paciente (id_usuario, tipo_sangre, sexo, fecha_nacimiento, telefono, direccion, estado) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.query(query, [id_usuario, tipo_sangre, sexo, fecha_nacimiento, telefono, direccion, estado]);
        return result;
    },

    // 🔍 Obtener datos crudos de la tabla paciente por su ID
    obtenerPorId: async (id) => {
        const [rows] = await db.query('SELECT * FROM paciente WHERE id_paciente = ?', [id]);
        return rows[0]; // 🚀 CORREGIDO: Retorna el objeto directo, no un arreglo
    },

    // 📋 Obtener expediente completo por ID del Paciente (Uso clave para "Ver Ficha")
    obtenerPorIdConUsuario: async (id) => {
        const [rows] = await db.query(`
            SELECT
                p.id_paciente,
                p.id_usuario,
                p.tipo_sangre,
                p.sexo,
                p.fecha_nacimiento,
                p.telefono,
                p.direccion,
                p.estado,
                u.nombre,
                u.apellido,
                u.correo,
                u.documento,
                u.tipo_usuario
            FROM paciente p
            LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
            WHERE p.id_paciente = ?
        `, [id]);
        return rows[0]; // 🚀 CORREGIDO: Retorna el objeto directo para que React lo lea sin problemas
    },

    // 👤 Obtener expediente por el ID del Usuario asociado
    obtenerPorUsuarioConUsuario: async (idUsuario) => {
        const [rows] = await db.query(`
            SELECT
                p.id_paciente,
                p.id_usuario,
                p.tipo_sangre,
                p.sexo,
                p.fecha_nacimiento,
                p.telefono,
                p.direccion,
                p.estado,
                u.nombre,
                u.apellido,
                u.correo,
                u.documento,
                u.tipo_usuario
            FROM paciente p
            LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
            WHERE p.id_usuario = ?
            ORDER BY p.id_paciente DESC
            LIMIT 1
        `, [idUsuario]);
        return rows[0]; // 🚀 CORREGIDO: Retorna el objeto directo para que coincida con el controlador
    },

    // ✏️ Actualizar datos del paciente
    actualizar: async (id, datos) => {
        try {
            const [result] = await db.query('UPDATE paciente SET ? WHERE id_paciente = ?', [datos, id]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    // ❌ Eliminar un paciente
    eliminar: async (id) => {
        try {
            const [result] = await db.query('DELETE FROM paciente WHERE id_paciente = ?', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Paciente;