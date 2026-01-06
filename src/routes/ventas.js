const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');
const { verificarToken } = require('../middleware/auth');

router.post('/', verificarToken, ventasController.crearVenta);
router.get('/', ventasController.listarVentas);
router.put('/:id', ventasController.actualizarVenta);
router.delete('/:id', ventasController.eliminarVenta);

module.exports = router;
