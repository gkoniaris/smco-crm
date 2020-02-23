const config = require('../config.js')
const Sentry = require('@sentry/node')
Sentry.init({ dsn: config.logging.sentryDSN });

module.exports = () => {
    return (err, req, res, next) => {
        if (err) {
            if (!err.status) {
                console.log(err)
                Sentry.captureException(err)
            }
            return res.status(err.status || 500).json({"error": err.status ? err.message : "Something went wrong"})
        }
        next()
    }
}