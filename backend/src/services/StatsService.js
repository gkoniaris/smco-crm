const sequelize = require('../models')

class StatService {
    async get (userId) {
        return await sequelize.query(`SELECT * FROM (
            (
            SELECT COUNT(*) as openDevicesCount FROM devices
            WHERE devices.status = 'open'
            ) AS openDevicesQuery,
            (
            SELECT COUNT(*) as openQuestionsCount FROM questions
            WHERE questions.status = 'open'
            ) AS openQuestionsQuery,
            
            (
            SELECT COUNT(*) as delayedQuestionsCount from questions
            WHERE questions.status = 'open' AND DATE_ADD(questions.askedDate, INTERVAL 10 DAY) < NOW()
            ) AS delayedQuestionsQuery,
            
            (
            SELECT COUNT(*) as delayedDevicesCount from devices
            WHERE devices.status = 'open' AND DATE_ADD(devices.date, INTERVAL 10 DAY) < NOW()
            ) AS delayedDevicesQuery
        )`, { type: sequelize.QueryTypes.SELECT})
        .then(statsArray => {
            const stats = statsArray[0]
            stats.totalDelayedCount = stats.delayedQuestionsCount + stats.delayedDevicesCount
            stats.totalOpenCount = stats.openQuestionsCount + stats.openDevicesCount
            return stats
        })
    }
}

module.exports = new StatService()