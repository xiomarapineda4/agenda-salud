const pqrModel = require('../models/pqrModel');
// 1. Crear un nuevo PQR (POST)
exports.createPqr = async (req, res) => {
    try {
        //Extraemos los datos que vienen de formulario de la interfaz
        const { id_usuario, tipo_solicitud, asunto, descripcion } = req.body;
         // Agrupamos todos los datos
         const datos = { id_usuario, tipo_solicitud, asunto, descripcion };
         const result = await pqrModel.crear(datos);
         res.status(201).json({
            mensaje:"PQR registrada con exito",
            id: result.insertId
         });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    // 2. OBTENER PQRS POR USUARIO (GET)
    exports.getPqrsByUser = async (req, res) => {
        try {
            //Obtenemos el id del usuario loguado desde el token validado
            const id_usuario = req.params.id_usuario;
            const results = await pqrModel.obtenerPorUsuario(id_usuario);
            res.status(200).json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    
