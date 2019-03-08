const Sequelize = require('sequelize')
const sequelize = require('.')
const Client = require('./client.js')

const Question = sequelize.define('questions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'client_id'
    },
    question: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    contactComments: {
      type: Sequelize.TEXT,
      field: 'contact_comments'
    },
    status: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['open', 'freezed', 'closed'],
      defaultValue: 'open'
    },
    answer: {
        type: Sequelize.TEXT
    },
    askedDate: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false
    },
    freezedDate: {
        type: Sequelize.DATE
    },
    closedDate: {
        type: Sequelize.DATE
    },
    clientHappy: {
        type: Sequelize.BOOLEAN
    },
    shopHappy: {
        type: Sequelize.BOOLEAN
    },
    completed: {
        type: Sequelize.BOOLEAN
    },
    profit: {
        type: Sequelize.BOOLEAN
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
    }
})

Question.prototype.toJSON =  function () {
    const values = Object.assign({}, this.get());
  
    ['clientHappy', 'shopHappy', 'completed', 'profit'].forEach(key => {
        if (values[key] === '1') values[key] = true
        if (values[key] === '0') values[key] = false
    })
    return values;
}

Question.belongsTo(Client)

module.exports = Question
