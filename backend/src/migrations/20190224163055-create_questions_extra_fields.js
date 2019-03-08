'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'questions',
        'answer',
        {
            type: Sequelize.TEXT,
            after: "status"
        }
      ).then(() => {
        return queryInterface.addColumn(
            'questions',
            'askedDate',
            {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW'),
                after: "answer"
            }
        )
      }).then(() => {
        return queryInterface.addColumn(
            'questions',
            'freezedDate',
            {
                type: Sequelize.DATE,
                after: "askedDate"
            }
        )
      }).then(() => {
        return queryInterface.addColumn(
            'questions',
            'closedDate',
            {
                type: Sequelize.DATE,
                after: "freezedDate"
            }
        )
      }).then(() => {
        return queryInterface.addColumn(
            'questions',
            'clientHappy',
            {
                type: Sequelize.TEXT,
                after: "closedDate"
            }
        )
      }).then(() => {
        return queryInterface.addColumn(
            'questions',
            'shopHappy',
            {
                type: Sequelize.TEXT,
                after: "clientHappy"
            }
        )
      }).then(() => {
        return queryInterface.addColumn(
            'questions',
            'completed',
            {
                type: Sequelize.TEXT,
                after: "shopHappy"
            }
        )
      }).then(() => {
        return queryInterface.addColumn(
            'questions',
            'profit',
            {
                type: Sequelize.TEXT,
                after: "completed"
            }
        )
      })
      .then(() => queryInterface.addIndex('questions', {fields:['status']}))
      .then(() => queryInterface.addIndex('questions', {fields:['askedDate']}))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('questions', ['status'])
    .then(() => queryInterface.removeIndex('questions', ['askedDate']))
    .then(() => queryInterface.removeColumn('questions', 'answer'))
    .then(() => queryInterface.removeColumn('questions', 'askedDate'))
    .then(() => queryInterface.removeColumn('questions', 'freezedDate'))
    .then(() => queryInterface.removeColumn('questions', 'closedDate'))
    .then(() => queryInterface.removeColumn('questions', 'clientHappy'))
    .then(() => queryInterface.removeColumn('questions', 'shopHappy'))
    .then(() => queryInterface.removeColumn('questions', 'completed'))
    .then(() => queryInterface.removeColumn('questions', 'profit'))
  }
};
