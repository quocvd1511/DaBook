const express = require('express')
const route = express.Router()

const admin_Control = require('../controllers/admin_control')

route.get('/',admin_Control.main)

module.exports = route