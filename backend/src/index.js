require('dotenv').config()
const config = require('./config.js')
const Sentry = require('@sentry/node')
Sentry.init({ dsn: config.logging.sentryDSN });

global.Promise=require("bluebird")

const express = require("express")
const app = express()

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
// The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

const router = require('./routes')

app.use(router)

app.listen(config.port, (err) => {
    console.log(`Server started at port ${config.port}`)
})

// process.on('uncaughtException', (err) => {
//     console.log(err)
// });
