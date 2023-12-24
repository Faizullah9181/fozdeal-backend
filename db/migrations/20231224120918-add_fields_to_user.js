'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Users', 'consultant_id', {
            type: Sequelize.STRING,
            allowNull: true
        });

        // Add other columns as needed

        // If you need to update existing records, you can do it here
        // For example:
        // await queryInterface.sequelize.query('UPDATE Users SET isConsultant = false WHERE isConsultant IS NULL;');
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Users', 'consultant_id');
        // Remove other columns as needed
    }
};
