const express = require('express')
const route = express.Router()

const client_Control = require('../controllers/client_control')



route.get('/pagenumber/:number/:page',client_Control.get_pagination)
route.get('/chitietsach/:tensach', client_Control.chitietsach)
route.post('/signup', client_Control.signup)
route.get('/khuyenmai', client_Control.khuyenmai)
route.get('/boloc',client_Control.searchBL)
route.get('/search', client_Control.search)
route.get('/theloai/:value', client_Control.searchTL)
route.get('/logout', client_Control.logout)
route.get('/', client_Control.main)

route.get('/',client_Control.get_client)
route.post('/',client_Control.post_client)



module.exports = route