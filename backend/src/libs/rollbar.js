const config = require('../config.js')
const Rollbar = require("rollbar")

// Mock rollbar in case of development environment
if (config.env === 'development' || !config.logging.rollbarToken) {
    module.exports = {
        debug: () => {},
        info: () => {},
        warning: () => {},
        error: () => {},
        trace: () => {},
        log: () => {}
    }
} else {
    const rollbar = new Rollbar({
        accessToken: config.logging.rollbarToken,
        captureUncaught: true
    })
    module.exports = rollbar
}
