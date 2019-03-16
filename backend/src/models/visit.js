const Sequelize = require('sequelize')
const sequelize = require('.')
const Client = require('./client.js')
const VisitAppointment = require ('./Associations/visitAppointment')

const Visit = sequelize.define('visits', {
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
    failureDescription: {
      type: Sequelize.TEXT,
      allowNull: false,
      field: 'failure_description'
    },
    diagnosisDescription: {
      type: Sequelize.TEXT,
      field: 'diagnosis_description'
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false
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
        defaultValue: new Date(),
        allowNull: false
    },
    freezedDate: {
        type: Sequelize.DATE,
        field: 'freezed_date'
    },
    closedDate: {
        type: Sequelize.DATE,
        field: 'closed_date'
    },
    clientHappy: {
        type: Sequelize.BOOLEAN,
        field: 'client_happy'
    },
    shopHappy: {
        type: Sequelize.BOOLEAN,
        field: 'shop_happy'
    },
    completed: {
        type: Sequelize.BOOLEAN
    },
    profit: {
        type: Sequelize.BOOLEAN
    },
    contactComments: {
        type: Sequelize.TEXT,
        field: 'contact_comments'
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
})

Visit.prototype.toJSON =  function () {
    const values = Object.assign({}, this.get());
  
    ['clientHappy', 'shopHappy', 'completed', 'profit'].forEach(key => {
        if (values[key] === '1') values[key] = true
        if (values[key] === '0') values[key] = false
    })
    return values;
}

Visit.belongsTo(Client)
Visit.hasMany(VisitAppointment, {as: 'appointments'})

module.exports = Visit
