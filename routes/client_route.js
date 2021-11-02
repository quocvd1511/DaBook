const express = require('express')
const route = express.Router()

const client_Control = require('../controllers/client_control')

// <<<<<<< HEAD
// route.get('/boloc',client_Control.searchBL)
// route.get('/search',client_Control.search)
// route.get('/',client_Control.main)
// //route.get('/:value',client_Control.searchTL)

route.get('/khuyenmai', client_Control.khuyenmai)
route.get('/boloc',client_Control.searchBL)
route.get('/search', client_Control.search)
route.get('/theloai/:value', client_Control.searchTL)
route.get('/logout', client_Control.logout)
route.get('/', client_Control.main)


route.post('/',client_Control.post_client)
route.get('/',client_Control.get_client)


module.exports = route