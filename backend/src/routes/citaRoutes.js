const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
//const protegerRuta = require('../middlewares/authMiddleware');

// === Rutas específicas por Rol (Paciente y Médico) ===
router.get('/paciente/:id', citaController.getCitasByPaciente); // Obtener Citas de un paciente
router.get('/medico/:id', citaController.getCitasByMedico);     // 🚀 NUEVA: Obtener Citas de un médico

// === se agregó esta NUEVA RUTA: para obtener disponibilidad en bloques de 20 min ===
router.get('/disponibilidad', citaController.obtenerDisponibilidad);

// === Rutas CRUD generales para las citas ===
//router.use(protegerRuta);
router.get('/', citaController.getAllCitas);
router.post('/', citaController.createCita);
router.put('/:id', citaController.updateCita);
router.delete('/:id', citaController.deleteCita);

module.exports = router;