const express = require('express')
const admin_control = require('../controllers/admin_control')
const route = express.Router()
const admin_Control = require('../controllers/admin_control')


route.get('/quan-ly-sach/:slug', admin_Control.chitietSach)

route.get('/them-sach',admin_control.Them_Sach)

route.get('/quan-ly-khuyen-mai',admin_Control.Ql_KhuyenMai)
route.get('/quan-ly-hoa-don',admin_Control.Ql_HoaDon)
route.get('/quan-ly-tai-khoan',admin_Control.Ql_TaiKhoan)
route.get('/quan-ly-sach',admin_Control.Ql_Sach)
route.get('/logout',admin_Control.logout)
route.get('/',admin_Control.login)



route.post('/home',admin_Control.post_home)
route.get('/home',admin_Control.get_home)



module.exports = route