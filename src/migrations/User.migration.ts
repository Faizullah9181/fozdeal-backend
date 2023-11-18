'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        if (process.env.NODE_ENV === 'test') {
            return queryInterface.createTable('users', {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                isActive: {
                    type: Sequelize.DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: true
                },

                updatedAt: {
                    type: 'TIMESTAMP',
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    allowNull: false
                },
                createdAt: {
                    type: 'TIMESTAMP',
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    allowNull: false
                }
            });
        }
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('users');
    }
};
