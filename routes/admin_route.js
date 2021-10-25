const express = require('express')
const admin_control = require('../controllers/admin_control')
const route = express.Router()
const admin_Control = require('../controllers/admin_control')

route.get('/quan-ly-tai-khoan/:slug',admin_Control.chitietTaiKhoan)


route.post('/quan-ly-sach/them-sach/save', admin_Control.chitietSach_save)
route.post('/quan-ly-sach/:slug/update', admin_Control.chitietSach_update)
route.post('/quan-ly-sach/:slug/delete', admin_Control.chitietSach_delete)
route.get('/quan-ly-sach/:slug', admin_Control.chitietSach)
route.post('/quan-ly-sach/them-sach/save', admin_Control.chitietSach)
route.get('/them-sach',admin_control.Them_Sach)

route.get('/quan-ly-khuyen-mai',admin_Control.Ql_KhuyenMai)
route.get('/quan-ly-don-hang',admin_Control.Ql_HoaDon)
route.get('/quan-ly-tai-khoan',admin_Control.Ql_TaiKhoan)
route.get('/quan-ly-sach',admin_Control.Ql_Sach)
route.get('/logout',admin_Control.logout)
route.get('/',admin_Control.login)



route.post('/home',admin_Control.post_home)
route.get('/home',admin_Control.get_home)



module.exports = route