const express = require('express')
const route = express.Router()

const client_Control = require('../controllers/client_control')

route.get('/',client_Control.main)
route.get('/search',client_Control.search)
route.get('/:value',client_Control.searchTL)

module.exports = route