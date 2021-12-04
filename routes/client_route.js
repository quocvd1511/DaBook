const express = require('express')
const route = express.Router()

const client_Control = require('../controllers/client_control')



route.get('/nhapkhuyenmai', client_Control.nhapkhuyenmai)
route.get('/themgiohang', client_Control.themgiohang)
route.get('/chitietgiohang', client_Control.chitietgiohang)
route.get('/chitiettk', client_Control.chitiettk)
route.get('/luukhuyenmai/:value', client_Control.luukhuyenmai)
route.get('/chitietsach/:tensach', client_Control.chitietsach)
route.post('/signup', client_Control.signup)
route.get('/khuyenmai', client_Control.dskhuyenmai)
route.get('/boloc',client_Control.searchBL)
route.get('/search', client_Control.search)
route.get('/theloai/:value', client_Control.searchTL)
route.get('/logout', client_Control.logout)
route.get('/', client_Control.main)
route.get('/payment', client_Control.thanhtoan)

route.get('/',client_Control.get_client)
route.post('/',client_Control.post_client)

module.exports = route