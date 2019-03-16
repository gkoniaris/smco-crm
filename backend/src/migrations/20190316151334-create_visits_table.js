'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('visits', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        client_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        failure_description: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        diagnosis_description: {
          type: Sequelize.TEXT
        },
        type: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        },
        serialNumber: {
            type: Sequelize.STRING
        },
        status: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ['open', 'freezed', 'closed'],
          defaultValue: 'open'
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
            allowNull: false
        },
        freezed_date: {
            type: Sequelize.DATE
        },
        closed_date: {
            type: Sequelize.DATE
        },
        client_happy: {
            type: Sequelize.BOOLEAN
        },
        shop_happy: {
            type: Sequelize.BOOLEAN
        },
        completed: {
            type: Sequelize.BOOLEAN
        },
        profit: {
            type: Sequelize.BOOLEAN
        },
        contact_comments: {
            type: Sequelize.TEXT
        },
        comments: {
            type: Sequelize.TEXT
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at'
        }
    }).then(() => queryInterface.addConstraint('visits', ['client_id'], {
        type: 'FOREIGN KEY',
        name: 'fk_client_id_visits',
        references: {
          table: 'clients',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      }))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('visits', 'fk_client_id_visits')
     .then(() => {
      return queryInterface.dropTable('visits')
    })
  }
};
