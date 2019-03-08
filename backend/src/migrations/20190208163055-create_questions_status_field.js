'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'questions',
        'status',
        {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['open', 'freezed', 'closed'],
            after: "contact_comments"
        }
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('questions', 'status')
  }
};
