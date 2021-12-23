const express = require('express')
const route = express.Router()

const client_Control = require('../controllers/client_control')





route.post('/capnhatmatkhau', client_Control.capnhatmatkhau)
route.post('/themdiachi', client_Control.themdiachi)
route.post('/capnhattaikhoan', client_Control.capnhattk)
route.get('/binhluan', client_Control.binhluan)
route.get('/nhapkhuyenmai', client_Control.nhapkhuyenmai)
route.post('/themgiohang', client_Control.themgiohang)
route.get('/chitietgiohang', client_Control.chitietgiohang)
route.get('/chitiettk', client_Control.chitiettk)
route.get('/luukhuyenmai', client_Control.luukhuyenmai)
route.get('/chitietsach/:tensach', client_Control.chitietsach)
route.post('/signup', client_Control.signup)
route.get('/khuyenmai', client_Control.dskhuyenmai)
route.get('/boloc',client_Control.searchBL)
route.get('/search', client_Control.search)
route.get('/theloai/:value', client_Control.searchTL)
route.get('/logout', client_Control.logout)
route.get('/', client_Control.main)
route.post('/payment', client_Control.taohoadon)
route.post('/temppayment', client_Control.thanhtoan)
route.post('/updategiohang', client_Control.capnhatgiohang)

route.get('/',client_Control.get_client)
route.post('/',client_Control.post_client)

module.exports = route