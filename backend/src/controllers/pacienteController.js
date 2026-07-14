const Paciente = require('../models/pacienteModel');

// Guardar un nuevo paciente en el sistema
exports.createPaciente = async (req, res) => {
    try {
        const result = await Paciente.crear(req.body);
        res.status(201).json({ mensaje: '¡Paciente guardado con éxito!', id: result.insertId });
    } catch (error) {
        console.error('Error al insertar paciente:', error);
        res.status(500).json({ mensaje: 'Error en el servidor al intentar guardar el paciente', error: error.message });
    }
};

// Obtener el directorio completo de pacientes (para la tabla izquierda)
exports.getAllPacientes = async (req, res) => {
    try {
        const result = await Paciente.obtenerTodos();
        console.log("Cantidad de pacientes encontrados:", result.length);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un paciente específico por su ID único (para el botón "Ver Ficha")
exports.getPacienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Paciente.obtenerPorIdConUsuario(id);

        // Como el modelo ya retorna rows[0], validamos si el objeto existe directamente
        if (!resultado) {
            return res.status(404).json({ mensaje: 'Paciente no encontrado' });
        }

        // Enviamos el objeto limpio a React
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error al obtener paciente por id:', error);
        res.status(500).json({ error: error.message });
    }
};

// Obtener un paciente vinculando su ID de la tabla de usuarios
exports.getPacienteByUsuarioId = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const resultado = await Paciente.obtenerPorUsuarioConUsuario(id_usuario);

        if (!resultado) {
            return res.status(404).json({ mensaje: 'Paciente no encontrado para este usuario' });
        }

        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error al obtener paciente por usuario:', error);
        res.status(500).json({ error: error.message });
    }
};

// Actualizar el expediente de un paciente
exports.updatePaciente = async (req, res) => {
    try {
        const { id } = req.params;
        await Paciente.actualizar(id, req.body);
        res.status(200).json({ mensaje: 'Paciente actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar paciente correctamente', error);
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un paciente del sistema
exports.deletePaciente = async (req, res) => {
    try {
        const { id } = req.params;
        await Paciente.eliminar(id);
        res.status(200).json({ mensaje: 'Paciente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar paciente en Mysql:', error);
        res.status(500).json({ error: error.message });
    }
};