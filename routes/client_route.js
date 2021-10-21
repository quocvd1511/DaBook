const express = require('express')
const route = express.Router()

const client_Control = require('../controllers/client_control')

route.get('/search', client_Control.search)
route.get('/theloai/:value', client_Control.searchTL)
route.get('/', client_Control.main)


module.exports = route