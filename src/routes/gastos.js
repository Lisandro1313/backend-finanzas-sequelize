const express = require('express');
const router = express.Router();
const gastosController = require('../controllers/gastosController');
const { verificarToken } = require('../middleware/auth');

router.post('/', verificarToken, gastosController.crearGasto);
router.get('/', gastosController.listarGastos);
router.put('/:id', gastosController.actualizarGasto);
router.delete('/:id', gastosController.eliminarGasto);

module.exports = router;
