const admin_login = require('../models/admin_account')
const books=require('../models/books')
const client_account=require('../models/client_account')
const {multipleMongooseToObject} = require('../util/mongoose.js')
const {mongooseToObject} = require('../util/mongoose.js')


class Admin_Control{
    login(req,res,next)
    {
        console.log(req.session)
       res.render('admin_login', {layout: 'admin_login.handlebars'})  
        //console.log(req.session)
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
        res.render('admin_home',{layout: 'admin.handlebars',admin_account: req.session.username})
        /*
            .then (admin_account => res.render('admin_home',{layout: 'admin.handlebars',admin_account: mongooseToObject(admin_account)}))
            .catch(next)*/
    }
    //--------------------------------------------QUAN LY SACH-------------------------------------------------------------------------------------
    Ql_Sach(req,res,next)
    {
       // console.log(req.session.username)
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
            khuvuc: req.body.khuvuc,
            nhom: req.body.nhom,
            theloai: req.body.theloai,
            danhsach: req.body.danhsach,
            hinhanh: req.body.hinhanh,
            tensach: req.body.tensach,
            tacgia: req.body.tacgia,
            nxb: req.body.nxb,
            namxb: req.body.namxb,
            hinhthuc: req.body.hinhthuc,
            mota: req.body.mota,
            giaban: req.body.giaban,
            giamgia:req.body.giamgia,
            sodanhgia: req.body.sodanhgia,
            sobinhchon: req.body.sobinhchon })
            .then(() => 
            {
                res.redirect('/admin/quan-ly-sach/'+req.body.masach)
            })
    }

    chitietSach_save(req,res,next)
    {
        const book=new books(req.body)
        book.save()
        res.redirect('/admin/quan-ly-sach')
    }
    
    chitietSach_delete(req,res,next)
    {
        books.deleteOne({masach: req.body.masach})
            .then(() => res.redirect('/admin/quan-ly-sach'))
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------

    //------------QUAN LY TAI KHOAN---------------------------------
    Ql_TaiKhoan(req,res,next)
    {
       // console.log(req.session.username)
            client_account.find({})
            .then(client_account => 
                {
                    client_account=client_account.map(course => course.toObject())
                    //console.log(client_account)
                    res.render('admin_qlTaiKhoan',{layout: 'admin.handlebars', admin_account: req.session.username, client_account})
                })
    }

    chitietTaiKhoan(req,res,next)
    {
        client_account.find({MaTK: req.params.slug})
        .then(client_account => 
            {
                client_account=client_account.map(course => course.toObject())
                //console.log(client_account)
                res.render('admin_chitietTaiKhoan',{layout: 'admin.handlebars', admin_account: req.session.username, client_account})
            })
    }

    //--------------------------------------------------------------

    Ql_KhuyenMai(req,res,next)
    {
       // console.log(req.session.username)
       res.render('admin_qlKhuyenMai',{layout: 'admin.handlebars', admin_account: req.session.username})
    }   

    Ql_HoaDon(req,res,next)
    {
       // console.log(req.session.username)
        res.render('admin_qlHoaDon',{layout: 'admin.handlebars', admin_account: req.session.username})
    }

    //---------------------------------------------------------------------------------------------------------------------------------------------------
}

module.exports = new Admin_Control