module.exports = (sequelize, DataTypes) => {
    const Venta = sequelize.define('Venta', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: false
        },
        monto: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        eliminado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'ventas',
        timestamps: true
    });

    return Venta;
};
