const express = require('express')
const route = express.Router()

const client_Control = require('../controllers/client_control')

route.get('/',client_Control.main)

module.exports = route