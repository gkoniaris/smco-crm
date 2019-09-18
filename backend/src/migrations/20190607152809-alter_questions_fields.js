'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('questions', 'closedDate', 'closed_date')
    .then(() => queryInterface.renameColumn('questions', 'freezedDate', 'freezed_date'))
    .then(() => queryInterface.changeColumn('questions', 'askedDate', {
        type: Sequelize.DATE,
        defaultValue: null,
        allowNull: true,
    }))
    .then(() => queryInterface.renameColumn('questions', 'askedDate', 'date'))
    .then(() => queryInterface.changeColumn('questions', 'date', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false
    }))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('questions', 'closed_date', 'closedDate')
    .then(() => queryInterface.renameColumn('questions', 'freezed_date', 'freezedDate'))
    .then(() => queryInterface.changeColumn('questions', 'date', {
        type: Sequelize.DATE,
        defaultValue: null,
        allowNull: true
    }))
    .then(() => queryInterface.renameColumn('questions', 'date', 'askedDate'))
    .then(() => queryInterface.changeColumn('questions', 'askedDate', {
        type: Sequelize.DATE,
        defaultValue:  Sequelize.fn('NOW'),
        allowNull: false,
    }))
  }
};
