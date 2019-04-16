'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'visits',
        'address_id',
        {
            type: Sequelize.INTEGER,
            after: "client_id",
            allowNull: false
        }
      ).then(() => queryInterface.addConstraint('visits', ['address_id'], {
        type: 'FOREIGN KEY',
        name: 'fk_address_id_visits',
        references: {
          table: 'addresses',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      }))
  },

  down: (queryInterface, Sequelize) => {
    return  queryInterface.removeConstraint('visits', 'fk_address_id_visits')
    .then(() => {
        return queryInterface.removeColumn('visits', 'address_id')
    })
  }
};
