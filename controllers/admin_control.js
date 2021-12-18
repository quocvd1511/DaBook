const admin_login = require('../models/admin_account')
const books=require('../models/books')
const khuyenmais = require('../models/khuyenmai')
const client_account=require('../models/client_account')
const theloai = require('../models/theloai')
const donhang = require('../models/donhang')
const {multipleMongooseToObject} = require('../util/mongoose.js')
const {mongooseToObject} = require('../util/mongoose.js')
const req = require('express/lib/request')


class Admin_Control{
    login(req,res,next)
    {
        //console.log(req.session)
        res.render('login', {layout: 'admin_login.handlebars'})  
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
                        res.render('xemds_sach',{layout: 'admin.handlebars', books})
                    })
        }
    }

    Them_Sach(req,res,next)
    {
        res.render('themsach',{layout: 'admin.handlebars'})
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
        books.updateOne({_id:req.body._id},
            {
            hinhanh:req.body.hinhanh,
            tensach:req.body.tensach,
            theloai:req.body.theloai,
            tacgia:req.body.tacgia,
            mota:req.body.mota,
            nxb:req.body.nxb,
            namxb:req.body.namxb,
            soluong:req.body.soluong,
            giamgia:req.body.giamgia,
            ngonngu:req.body.ngonngu,
            giaban:req.body.giaban}
            )
            .then(() => 
            {
                res.redirect('/admin/quan-ly-sach/cap-nhat-sach/'+req.body._id)
            })
    }

    chitietSach_save(req,res,next)
    {
        const book=books(req.body)
        //console.log(req.body)
        console.log(book)
        book.save()
        res.redirect('/admin/quan-ly-sach')
    }
    
    chitietSach_delete(req,res,next)
    {
        books.deleteOne({masach: req.body.masach})
            .then(() => res.redirect('/admin/quan-ly-sach'))
    }

    CapNhatSach(req,res,next)
    {
        books.find({_id: req.params.slug})
            .then(books =>
                {
                    books=books.map(course => course.toObject())
                    console.log(books)
                    //res.send(books)
                    res.render('capnhat_sach',{layout: 'admin.handlebars', books: books})
                })
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
                    res.render('QLtaikhoan',{layout: 'admin.handlebars', admin_account: req.session.username, client_account: client_account})
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
       khuyenmais.find({})
        .then(khuyenmais => {
            console.log(khuyenmais)
            khuyenmais=khuyenmais.map(course => course.toObject())
            res.render('DS_khuyenmai',{layout: 'admin.handlebars', khuyenmais: khuyenmais})
        })
    }

    ThemKhuyenMai(req,res,next)
    {
        res.render('them_km',{layout: 'admin.handlebars'})
    }

    Ql_HoaDon(req,res,next)
    {
        donhang.find({})
            .then(donhang => {
                donhang = donhang.map(course => course.toObject())
                res.render('DS_donhang',{layout: 'admin.handlebars',donhang: donhang})
            })
    }

    CapNhatKhuyenMai(req,res,next)
    {
        khuyenmais.find({_id: req.params.slug})
            .then(khuyenmais =>{
                khuyenmais = khuyenmais.map(course => course.toObject())
                res.render('capnhat_km', {layout: 'admin.handlebars',khuyenmais: khuyenmais})
            })
        
    }

    ThemKhuyenMai_save(req,res,next)
    {
        var khuyenmai = {
            makm: req.body.makm,
            noidung: req.body.noidung,
            tinhtrang: req.body.tinhtrang,
            phantram: req.body.demo1,
            dieukien: req.body.demo3,
            ngaybd: req.body.ngaybd,
            ngaykt: req.body.ngaykt,
        }

        khuyenmai = new khuyenmais(khuyenmai)
        khuyenmai.save()
        res.redirect('/admin/quan-ly-khuyen-mai')
    }

    CapNhatKhuyenMai_save(req,res,next)
    {
        khuyenmais.updateOne({_id: req.body._id},{
            makm: req.body.makm,
            noidung: req.body.noidung,
            tinhtrang: req.body.tinhtrang,
            phantram: req.body.demo1,
            dieukien: req.body.demo3,
            ngaybd: req.body.ngaybd,
            ngaykt: req.body.ngaykt,
        })
        .then(khuyenmais =>{
            const id=req.body._id
            res.redirect('/admin/quan-ly-khuyen-mai/cap-nhat-khuyen-mai/' + id)
        })
    }

    //---------------------------------------------------------------------------------------------------------------------------------------------------

    
    //---Quan ly thong ke----
    Ql_ThongKe(req,res,next)
    {
        books.find({})
            .then(books => 
            {
                var dulieuthongke=[{
                    sosachdaban: 0,
                    sodondathang: 0,
                    soluongtaikhoan: 0,
                    doanhthu: 0,
                }]
                for(var i=0;i<books.length;i++)
                {
                    var temp = parseInt(books[i].soluongdaban)
                    dulieuthongke[0].sosachdaban+=temp
                }

                client_account.count({}, function(err,count){
                    dulieuthongke[0].soluongtaikhoan = count
                    theloai.find({})
                        .then(theloai =>{
                            theloai = theloai.map(course => course.toObject())

                            donhang.find({})
                                .then(donhang =>{
                                    for(var i=0;i<donhang.length;i++)
                                    {
                                        dulieuthongke[0].doanhthu+=parseInt(donhang[i].tongtien)
                                    }

                                    dulieuthongke[0].sodondathang=donhang.length
                                    console.log(dulieuthongke)
                                    //console.log(theloai)
                                    res.render('thongke',{layout: 'admin.handlebars',dulieuthongke: dulieuthongke, theloai: theloai})
                                })
                            
                        })

                })
            })
    }



    //---Quan lu van chuyen-----
    Ql_VanChuyen(req,res,next)
    {
        res.render('vanchuyen',{layout: 'admin.handlebars'})
    }

    chitietdonhang(req,res,next)
    {
        donhang.find({madh: req.params.slug})
            .then(donhang =>{
                    console.log(donhangg)
                    donhang = donhang.map(course => course.toObject())
                    client_account.find({matk: donhang[0].matk})
                    .then(client_account =>{
                        client_account = client_account.map(course => course.toObject())
                        var tinhtien={
                            tamtinh: 0,
                            phivanchuyen: 0,
                            tongtien: 0,
                            sotiengiam: 0,
                            ds_makm:[]}
                        var temp=donhang[0].ds_sach
                        for(var i=0;i<temp.length;i++)
                        {
                            tinhtien.tamtinh+=parseInt(temp[i].tongtien);
                        }

                        if(donhang[0].vanchuyen==="Nội Thành")
                        {
                            tinhtien.phivanchuyen=20000
                        } else { tinhtien.phivanchuyen=40000}

                        tinhtien.tongtien=tinhtien.tamtinh+tinhtien.phivanchuyen

                        temp=donhang[0].makm
                        for(var i=0;i<temp.length;i++)
                        {
                            tinhtien.ds_makm[i]=temp[i]
                        }

                        khuyenmais.find({makm: {$in: tinhtien.ds_makm}})
                            .then(khuyenmais => 
                                {
                                for(var i=0;i<khuyenmais.length;i++)
                                {
                                    //console.log(khuyenmais[i])
                                    if(khuyenmais[i].loai==="Sale")
                                    {
                                        if(tinhtien.tongtien>=parseInt(khuyenmais[i].dieukien)*1000)
                                        {
                                            //console.log((parseInt(khuyenmais[i].phantram)/100))
                                            tinhtien.sotiengiam+=tinhtien.tamtinh*(parseInt(khuyenmais[i].phantram)/100)
                                            //console.log(tinhtien.sotiengiam)
                                        }
                                    }
                                    else {
                                        tinhtien.sotiengiam+=tinhtien.phivanchuyen*(parseInt(khuyenmais[i].phantram)/100)
                                        //console.log(tinhtien.sotiengiam)
                                    }
                                }
                                tinhtien.tongtien-=tinhtien.sotiengiam
                                console.log(tinhtien)
                                res.render('vanchuyen',{layout: 'admin.handlebars',khachhang: client_account,donhang: donhang, ds_sach: donhang[0].ds_sach, tinhtien: tinhtien})
                            })

                        //console.log(tinhtien)
                        
                    })
            })
    }
}

module.exports = new Admin_Control