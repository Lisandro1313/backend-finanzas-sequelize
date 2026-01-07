'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        // Agregar columna sin FK primero
        await queryInterface.addColumn('ventas', 'usuario_id', {
            type: Sequelize.INTEGER,
            allowNull: true
        });
        
        // Intentar agregar FK si existe la tabla usuarios
        try {
            await queryInterface.addConstraint('ventas', {
                fields: ['usuario_id'],
                type: 'foreign key',
                name: 'ventas_usuario_id_fkey',
                references: {
                    table: 'usuarios',
                    field: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        } catch (error) {
            console.log('⚠️  FK no creada, tabla usuarios no existe aún');
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('ventas', 'usuario_id');
    }
};
