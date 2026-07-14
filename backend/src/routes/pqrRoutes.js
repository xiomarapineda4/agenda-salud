const express = require('express');
const router = express.Router();
// Importamos el controlador del PQR
const pqrController = require('../controllers/pqrController');
// Importamos su middleware de autenticacion
//const protegerRuta = require('../middlewares/authMiddleware');
// Ruta para el POST
router.post('/', pqrController.createPqr);
// Ruta para ver los PQRs del usuario
router.get('/:id_usuario', pqrController.getPqrsByUser);

module.exports = router;