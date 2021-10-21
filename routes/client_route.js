const express = require('express')
const route = express.Router()

const client_Control = require('../controllers/client_control')

route.get('/boloc',client_Control.searchBL)
route.get('/search',client_Control.search)
route.get('/',client_Control.main)
//route.get('/:value',client_Control.searchTL)
module.exports = route