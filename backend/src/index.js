require('dotenv').config()
const express = require("express")
const app = express()
const config = require('./config.js')
const router = require('./routes')
const rollbar = require('./libs/rollbar')

app.use(router)

app.listen(config.port, (err) => {
    console.log(`Server started at port ${config.port}`)
})

process.on('uncaughtException', (err) => {
    console.log(err)
    rollbar.error(err)
});
