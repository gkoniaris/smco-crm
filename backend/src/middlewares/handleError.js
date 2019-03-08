const rollbar = require('../libs/rollbar')

module.exports = () => {
    return (err, req, res, next) => {
        if (err) {
            if (!err.status) {
                console.log(err)
                rollbar.error(err, req)
            }
            return res.status(err.status || 500).json({"error": err.status ? err.message : "Something went wrong"})
        }
        next()
    }
}