const { Venta } = require('../models');
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

exports.crearVenta = async (req, res) => {
    try {
        const { fecha, categoria, monto, descripcion } = req.body;
        const usuario_id = req.usuario?.id || null;
        const venta = await Venta.create({ fecha, categoria, monto, descripcion, usuario_id });
        res.status(201).json(venta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.listarVentas = async (req, res) => {
    try {
        const { periodo } = req.query;
        const dateFilter = periodo ? getDateFilter(periodo) : {};

        const ventas = await Venta.findAll({
            where: {
                eliminado: false,
                ...dateFilter
            },
            order: [['fecha', 'DESC']]
        });

        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha, categoria, monto, descripcion } = req.body;

        const venta = await Venta.findByPk(id);
        if (!venta || venta.eliminado) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        await venta.update({ fecha, categoria, monto, descripcion });
        res.json(venta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarVenta = async (req, res) => {
    try {
        const { id } = req.params;

        const venta = await Venta.findByPk(id);
        if (!venta || venta.eliminado) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        await venta.update({ eliminado: true });
        res.json({ mensaje: 'Venta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
