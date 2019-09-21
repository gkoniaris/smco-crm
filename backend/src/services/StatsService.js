const sequelize = require('../models')
const _ = require('lodash')

class StatService {
    async getClientHapiness (userId) {
        return await sequelize.query(`SELECT client_happy, SUM(count) as count FROM (
            SELECT client_happy, COUNT(*) as count FROM devices
            JOIN clients ON devices.client_id = clients.id 
            WHERE closed_date IS NOT NULL
            AND client_happy IS NOT NULL
            GROUP BY devices.client_happy
        
            UNION
        
            SELECT client_happy, COUNT(*) as count FROM visits
            JOIN clients ON visits.client_id = clients.id 
            WHERE closed_date IS NOT NULL
            AND client_happy IS NOT NULL
            GROUP BY visits.client_happy
        ) AS finalQuery
        GROUP BY client_happy`
            
        ).then(statsArray => {
            const happyResult = statsArray[0].find(stat => stat.client_happy === 1)
            const unhappyResult = statsArray[0].find(stat => stat.client_happy === 0)

            const stats = {
                happyCount: parseInt(_.get(happyResult, 'count', 0)),
                unhappyCount: parseInt(_.get(unhappyResult, 'count', 0))
            }

            return stats
        })
    }
    async getDaysUntilClosed (userId) {
        return Promise.map(['devices', 'questions'], async (table) => {
            const results = await sequelize.query(`SELECT 
            CONVERT(sum(count), UNSIGNED INTEGER) as count,
            CONVERT(sum(count) / (SELECT COUNT(*) FROM ${table} JOIN clients ON ${table}.client_id = clients.id  WHERE closed_date IS NOT NULL) * 100, UNSIGNED INTEGER) as percentage,
            case 
                when days_diff between 0 and 1 then 0
                when days_diff between 2 and 4 then 1
                when days_diff between 5 and 8 then 2
                when days_diff between 9 and 14 then 3
                when days_diff between 15 and 1000 then 4
            end as numeric_range,
            case 
                when days_diff between 0 and 1 then 'Up to 1 days'
                when days_diff between 2 and 4 then '2 to 4 days'
                when days_diff between 5 and 8 then '5 to 8 days'
                when days_diff between 9 and 14 then '9 to 14 days'
                when days_diff between 15 and 1000 then 'more than 15 days'
            end as text_range
            FROM (
                SELECT 
                COUNT(*) as count,
                (DATEDIFF(closed_date, date)) AS days_diff FROM ${table}
                JOIN clients ON ${table}.client_id = clients.id 
                WHERE closed_date IS NOT NULL
                GROUP by days_diff
            ) as finalQuery
            GROUP BY numeric_range;`, { type: sequelize.QueryTypes.SELECT })
            const statsRetrieved = {
                type: table,
                data: results
            }
            return statsRetrieved
        })
    }

    async getPending (userId) {
        return await sequelize.query(`SELECT * FROM (
            (
            SELECT COUNT(*) as openDevicesCount FROM devices
            JOIN clients ON devices.client_id = clients.id
            WHERE devices.status = 'open'
            ) AS openDevicesQuery,
            (
            SELECT COUNT(*) as openQuestionsCount FROM questions
            JOIN clients ON questions.client_id = clients.id
            WHERE questions.status = 'open'
            ) AS openQuestionsQuery,
            
            (
            SELECT COUNT(*) as delayedQuestionsCount from questions
            JOIN clients ON questions.client_id = clients.id
            WHERE questions.status = 'open' AND DATE_ADD(questions.date, INTERVAL 10 DAY) < NOW()
            ) AS delayedQuestionsQuery,
            
            (
            SELECT COUNT(*) as delayedDevicesCount from devices
            JOIN clients ON devices.client_id = clients.id
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
