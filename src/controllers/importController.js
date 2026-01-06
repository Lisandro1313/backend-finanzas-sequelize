const { Venta, Gasto } = require('../models');
const fs = require('fs');

exports.importarJSON = async (req, res) => {
    try {
        const { tipo, datos } = req.body;

        if (!tipo || !datos || !Array.isArray(datos)) {
            return res.status(400).json({
                error: 'Se requiere tipo (ventas/gastos) y un array de datos'
            });
        }

        let registrosCreados;

        if (tipo === 'ventas') {
            registrosCreados = await Venta.bulkCreate(datos);
        } else if (tipo === 'gastos') {
            registrosCreados = await Gasto.bulkCreate(datos);
        } else {
            return res.status(400).json({
                error: 'Tipo debe ser "ventas" o "gastos"'
            });
        }

        res.json({
            mensaje: `${registrosCreados.length} registros importados correctamente`,
            registros: registrosCreados
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
