const admin_login = require('../models/admin/admin_login')
const {multipleMongooseToObject} = require('../util/mongoose.js')
const {mongooseToObject} = require('../util/mongoose.js')


class Admin_Control{
    login(req,res,next)
    {
        //console.log(req.session)
       res.render('admin_login', {layout: 'adminlogin.handlebars'})  
    }

    logout(req,res,next)
    {
        req.session.destroy()
        res.redirect('/admin')
    }

    post_home(req,res,next)
    {
        admin_login.findOne({ MaTK: req.body.username, MatKhau: req.body.password}, 
            function (err,admin_account){
                if(!err)
                {
                    if(Boolean(admin_account)==false) res.redirect('/admin')
                    else 
                    {
                        req.session.username=req.body.username
                        res.render('admin_home',{layout: 'admin.handlebars',admin_account: req.session.username})
                    }
                } else {
                    next(err)
                }
            })
        /*
            .then (admin_account => res.render('admin_home',{layout: 'admin.handlebars',admin_account: mongooseToObject(admin_account)}))
            .catch(next)*/
        
    }

    get_home(req,res,next)
    {
        if(!req.session.isAuth) res.redirect('/admin')
        else res.render('admin_home',{layout: 'admin.handlebars',admin_account: req.session.username})
        /*
            .then (admin_account => res.render('admin_home',{layout: 'admin.handlebars',admin_account: mongooseToObject(admin_account)}))
            .catch(next)*/
        
    }

    Ql_Sach(req,res,next)
    {
       // console.log(req.session.username)
       if(!req.session.isAuth) res.redirect('/admin')
       else res.render('admin_qlSach',{layout: 'admin.handlebars', admin_account: req.session.username})
    }

    Ql_TaiKhoan(req,res,next)
    {
       // console.log(req.session.username)
       if(!req.session.isAuth) res.redirect('/admin')
        else res.render('admin_qlTaiKhoan',{layout: 'admin.handlebars', admin_account: req.session.username})
    }

    Ql_KhuyenMai(req,res,next)
    {
       // console.log(req.session.username)
       if(!req.session.isAuth) res.redirect('/admin')
       else res.render('admin_qlKhuyenMai',{layout: 'admin.handlebars', admin_account: req.session.username})
    }

    Ql_HoaDon(req,res,next)
    {
       // console.log(req.session.username)
       if(!req.session.isAuth) res.redirect('/admin')
       else res.render('admin_qlHoaDon',{layout: 'admin.handlebars', admin_account: req.session.username})
    }




}

module.exports = new Admin_Control