const { Gasto } = require('../models');
const { Op } = require('sequelize');

const getDateFilter = (periodo) => {
    const now = new Date();
    let startDate;

    switch (periodo) {
        case 'dia':
            startDate = new Date(now.setHours(0, 0, 0, 0));
            break;
        case 'semana':
            startDate = new Date(now.setDate(now.getDate() - 7));
            break;
        case 'mes':
            startDate = new Date(now.setMonth(now.getMonth() - 1));
            break;
        case 'año':
            startDate = new Date(now.setFullYear(now.getFullYear() - 1));
            break;
        default:
            return {};
    }

    return {
        fecha: {
            [Op.gte]: startDate
        }
    };
};

exports.crearGasto = async (req, res) => {
    try {
        const { fecha, categoria, monto, descripcion } = req.body;
        const usuario_id = req.usuario?.id || null;
        const gasto = await Gasto.create({ fecha, categoria, monto, descripcion, usuario_id });
        res.status(201).json(gasto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.listarGastos = async (req, res) => {
    try {
        const { periodo } = req.query;
        const dateFilter = periodo ? getDateFilter(periodo) : {};

        const gastos = await Gasto.findAll({
            where: {
                eliminado: false,
                ...dateFilter
            },
            order: [['fecha', 'DESC']]
        });

        res.json(gastos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarGasto = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha, categoria, monto, descripcion } = req.body;

        const gasto = await Gasto.findByPk(id);
        if (!gasto || gasto.eliminado) {
            return res.status(404).json({ error: 'Gasto no encontrado' });
        }

        await gasto.update({ fecha, categoria, monto, descripcion });
        res.json(gasto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarGasto = async (req, res) => {
    try {
        const { id } = req.params;

        const gasto = await Gasto.findByPk(id);
        if (!gasto || gasto.eliminado) {
            return res.status(404).json({ error: 'Gasto no encontrado' });
        }

        await gasto.update({ eliminado: true });
        res.json({ mensaje: 'Gasto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
