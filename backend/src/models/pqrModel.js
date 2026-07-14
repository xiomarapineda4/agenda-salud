const db = require('../config/db');
const pqrModel = {
    // 1. Funcion para guardar un nuevo PQR (POST)
    crear: async (datos) => {
        const { id_usuario, tipo_solicitud, asunto, descripcion } = datos;
        const query = 'INSERT INTO pqr (id_usuario, tipo_solicitud, asunto, descripcion) VALUES (?, ?, ?, ?)';

        const [result] = await db.query(query, [id_usuario, tipo_solicitud, asunto, descripcion]);
        return result;
    },
    // 2. Funcion para obtener los PQRS de un usuario
    obtenerPorUsuario: async (id_usuario) => {
        const query = 'SELECT * FROM pqr WHERE id_usuario = ?';
        const [rows] = await db.query(query, [id_usuario]);
        return rows;
    }
};
module.exports = pqrModel;