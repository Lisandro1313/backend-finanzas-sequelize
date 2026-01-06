const { Venta, Gasto, sequelize } = require('../models');
const { Op } = require('sequelize');

exports.getLineChartData = async (req, res) => {
    try {
        const { periodo = 'mes' } = req.query;

        const now = new Date();
        let startDate;

        switch (periodo) {
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
                startDate = new Date(now.setMonth(now.getMonth() - 1));
        }

        const ventas = await Venta.findAll({
            where: {
                eliminado: false,
                fecha: { [Op.gte]: startDate }
            },
            attributes: [
                [sequelize.fn('DATE', sequelize.col('fecha')), 'fecha'],
                [sequelize.fn('SUM', sequelize.col('monto')), 'total']
            ],
            group: [sequelize.fn('DATE', sequelize.col('fecha'))],
            order: [[sequelize.fn('DATE', sequelize.col('fecha')), 'ASC']],
            raw: true
        });

        const gastos = await Gasto.findAll({
            where: {
                eliminado: false,
                fecha: { [Op.gte]: startDate }
            },
            attributes: [
                [sequelize.fn('DATE', sequelize.col('fecha')), 'fecha'],
                [sequelize.fn('SUM', sequelize.col('monto')), 'total']
            ],
            group: [sequelize.fn('DATE', sequelize.col('fecha'))],
            order: [[sequelize.fn('DATE', sequelize.col('fecha')), 'ASC']],
            raw: true
        });

        const data = {
            ventas: ventas,
            gastos: gastos
        };

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
