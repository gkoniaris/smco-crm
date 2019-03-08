const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const config = require('./config')
const handleError = require('./middlewares/handleError.js')
const injectSession = require('./middlewares/injectSession.js')
const router = express.Router()
const validate = require('./middlewares/validateRequestData.js')

router.use(cors())
router.use(bodyParser({extended: true}))

router.use('/', express.static(path.join(process.cwd(), 'frontend/dist')))
router.get('/api/login', validate('query', require('./validators/get/login.js')), require('./controllers/AuthController').login)

if (config.disableSignup !== true) {
    router.post('/api/signup', validate('body', require('./validators/post/signup.js')), require('./controllers/AuthController').signup)
}

router.use('/api/', injectSession())

router.get('/api/ping', (req, res) => res.json({status: 'ok'}))

router.get('/api/client', validate('query', require('./validators/get/client.js')), require('./controllers/ClientController').get)
router.get('/api/client/:id', validate('params', require('./validators/get/clientId.js')), require('./controllers/ClientController').find)
router.post('/api/client', validate('body', require('./validators/post/client.js')), require('./controllers/ClientController').create)

router.get('/api/question', require('./controllers/QuestionController').get)
router.get('/api/question/:id', require('./controllers/QuestionController').find)
router.post('/api/question', validate('body', require('./validators/post/question.js')), require('./controllers/QuestionController').create)
router.patch('/api/question/:id', validate('body', require('./validators/patch/question.js')), require('./controllers/QuestionController').update)

router.get('/api/device', require('./controllers/DeviceController').get)
router.get('/api/device/:id', require('./controllers/DeviceController').find)
router.post('/api/device', validate('body', require('./validators/post/device.js')), require('./controllers/DeviceController').create)
router.patch('/api/device/:id', validate('body', require('./validators/patch/device.js')), require('./controllers/DeviceController').update)

router.get('/api/usefulPhone', require('./controllers/UsefulPhoneController').get)

router.get('/api/geolocate', validate('query', require('./validators/get/geolocate.js')), require('./controllers/GeolocateController').address)

router.use('/api/', handleError())

module.exports = router
