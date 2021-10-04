const express = require('express')
const route = express.Router()

const delivery_Control = require('../controllers/delivery_control')

route.get('/',delivery_Control.main)

module.exports = route