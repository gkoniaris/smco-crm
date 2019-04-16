'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'visit_appointments',
        'duration',
        {
            type: Sequelize.INTEGER,
            after: "actions"
        }
      )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('visit_appointments', 'duration')
  }
};
