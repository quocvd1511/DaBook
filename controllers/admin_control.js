const admin_login = require('../models/admin_account')
const books=require('../models/books')
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
                        req.session.isAuth=true;
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
    //--------------------------------------------QUAN LY SACH-------------------------------------------------------------------------------------
    Ql_Sach(req,res,next)
    {
       // console.log(req.session.username)
       if(!req.session.isAuth) res.redirect('/admin')
       else 
       {
           books.find({})
                .then(books => 
                    {
                        books=books.map(course => course.toObject())
                        res.render('admin_qlSach',{layout: 'admin.handlebars', books})
                    })
        }
    }

    Them_Sach(req,res,next)
    {
        res.render('admin_ThemSach',{layout: 'admin.handlebars'})
    }

    chitietSach(req,res,next)
    {
        books.findOne({masach: req.params.slug})
            .then(books =>
                {
                    books=mongooseToObject(books)
                    //res.json(books)
                    res.render('admin_chitietSach',{layout:'admin.handlebars',books})
                })
        
    }
    chitietSach_update(req,res,next)
    {
        books.updateOne({masach:req.body.masach}, {
            tensach: req.body.tensach,
            tacgia: req.body.tacgia,
            theloai: req.body.theloai,
            nxb: req.body.nxb,
            namxb: req.body.namxb,
            khuvuc: req.body.khuvuc,
            ngonngu: req.body.ngonngu,
            hinhanh: req.body.hinhanh,
            hinhthuc: req.body.hinhthuc,
            giaban: req.body.giaban,
            soluongton: req.body.soluongton,
            mota: req.body.mota})
            .then(() => 
            {
                res.redirect('/admin/quan-ly-sach/'+req.body.masach)
            })
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------


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

    //---------------------------------------------------------------------------------------------------------------------------------------------------



}

module.exports = new Admin_Control