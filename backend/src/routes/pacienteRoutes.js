const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const protegerRuta = require('../middlewares/authMiddleware'); // <--- El Guardián

// 1. RUTAS PÚBLICAS (Se ejecutan ANTES del guardián, no piden token)
router.post('/', pacienteController.createPaciente);
router.get('/', pacienteController.getAllPacientes); // <--- Temporalmente encima del guardian

// 2. EL GUARDIÁN (Bloquea todo lo que esté abajo si no hay token)
router.use(protegerRuta); 

// 3. RUTAS PROTEGIDAS (Piden token obligatoriamente)
router.get('/usuario/:id_usuario', pacienteController.getPacienteByUsuarioId);
router.get('/:id', pacienteController.getPacienteById);
router.put('/:id', pacienteController.updatePaciente);
router.delete('/:id', pacienteController.deletePaciente);

module.exports = router;