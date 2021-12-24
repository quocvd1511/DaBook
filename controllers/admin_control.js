const admin_login = require('../models/admin_account')
const books=require('../models/books')
const khuyenmais = require('../models/khuyenmai')
const client_account=require('../models/client_account')
const theloai = require('../models/theloai')
const donhang = require('../models/donhang')
const {multipleMongooseToObject} = require('../util/mongoose.js')
const {mongooseToObject} = require('../util/mongoose.js')
const req = require('express/lib/request')
const theloais = require('../models/theloai')

class Admin_Control{
    login(req,res,next)
    {
        // admin_login.findOne( {$and: [{matk: req.body.username},{matkhau: req.body.matkhau}]}, 
        //     function (err,admin_account){
        //         if(!err)
        //         {
        //             if(Boolean(admin_account)==false) {
        //                 res.redirect('/')
        //             }
        //             else 
        //             {    
        //                 req.session.username=admin_account.matk;
        //                 req.session.isAuth=true;
        //                 res.render('login', {layout: 'admin_login.handlebars'})                  
        //             }
        //         } else {
        //             next(err)
        //         }
        //     })
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
                        books.find({})
                        .then(books => 
                        {
                        books=books.map(course => course.toObject())
                        res.render('xemds_sach',{layout: 'admin.handlebars',admin_account: req.session.username, books: books})
                        })
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
           books.find({})
                .then(books => 
                    {
                        books=books.map(course => course.toObject())
                        res.render('xemds_sach',{layout: 'admin.handlebars',admin_account: req.session.username, books: books})
                    })
    }

    Them_Sach(req,res,next)
    {
        res.render('themsach',{layout: 'admin.handlebars', admin_account: req.session.username})
    }


    chitietSach_update(req,res,next)
    {
        console.log(req.body)
        books.updateOne({masach:req.body.masach},
            {
            masach: req.body.masach,
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
                res.redirect('/admin/quan-ly-sach/cap-nhat-sach/'+req.body.masach)
            })
    }

    chitietSach_save(req,res,next)
    {
        var book=books(req.body)
        //console.log(req.body)
        books.count({})
            .then(count =>{
                var newmasach="BOOK"+count.toString()
                book.masach=newmasach
                book.save()
                res.redirect('/admin/quan-ly-sach')
            })
    }
    
    chitietSach_delete(req,res,next)
    {
        books.deleteOne({masach: req.body.masach})
            .then(() => res.redirect('/admin/quan-ly-sach'))
    }

    CapNhatSach(req,res,next)
    {
        books.find({masach: req.params.slug})
            .then(books =>
                {
                    books=books.map(course => course.toObject())
                    //console.log(books)
                    //res.send(books)
                    res.render('capnhat_sach',{layout: 'admin.handlebars',admin_account: req.session.username, books: books})
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
                    var thongtint
                    for(var i=0;i<client_account.length;i++)
                    {
                        var danhsach_km = client_account[i].danhsach_km
                        var danhsanh_ma =''
                        var soluongma=0
                        for(var k=0;k<danhsach_km.length;k++)
                        {
                            danhsanh_ma+= " " + danhsach_km[k].manhap
                        }
                        client_account[i].danhsach_ma = danhsanh_ma
                        // console.log(client_account[i])
                    }
                    //console.log(client_account[0].danhsach_ma)
                    client_account=client_account.map(course => course.toObject())
                    //console.log(client_account)
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

    khoataikhoan(req,res,next)
    {
        client_account.updateOne({matk: req.query.matk},{tinhtrang:'Khóa'})
            .then(res.redirect('/admin/quan-ly-tai-khoan'))
    }

    mokhoataikhoan(req,res,next)
    {
        client_account.updateOne({matk: req.query.matk},{tinhtrang:'Đang sử dụng'})
            .then(res.redirect('/admin/quan-ly-tai-khoan'))
    }

    //--------------------------------------------------------------

    Ql_KhuyenMai(req,res,next)
    {
       // console.log(req.session.username)
       khuyenmais.find({})
        .then(khuyenmais => {
            console.log(khuyenmais)
            khuyenmais=khuyenmais.map(course => course.toObject())
            res.render('DS_khuyenmai',{layout: 'admin.handlebars',  admin_account: req.session.username, khuyenmais: khuyenmais})
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
                res.render('DS_donhang',{layout: 'admin.handlebars', admin_account: req.session.username, donhang: donhang})
            })
    }

    CapNhatKhuyenMai(req,res,next)
    {
        khuyenmais.find({makm: req.params.slug})
            .then(khuyenmais =>{
                khuyenmais = khuyenmais.map(course => course.toObject())
                res.render('capnhat_km', {layout: 'admin.handlebars', admin_account: req.session.username,khuyenmais: khuyenmais})
            })
        
    }

    ThemKhuyenMai_save(req,res,next)
    {
        //res.send(req.body)
        khuyenmais.count({})
            .then(count =>{
                var ngaybd = new Date(req.body.ngaydb)
                var ngaykt = new Date(req.body.ngaykt)
                var phantram = parseInt(req.body.demo1)
                var dieukien = parseInt(req.body.demo3)
                var soluong = parseInt(req.body.sl)
                var makm = "V00"+ (count+1).toString()
                var khuyenmai = 
                {
                    makm: makm,
                    manhap: req.body.manhap+makm,
                    noidung: req.body.noidung,
                    trangthai: req.body.trangthai,
                    phantram: phantram,
                    dieukien: dieukien,
                    ngaybd: ngaybd,
                    ngaykt: ngaykt,
                    sl: soluong,
                }
                
                
                khuyenmai = new khuyenmais(khuyenmai)
                khuyenmai.save()
                 .then(
                    res.redirect('/admin/quan-ly-khuyen-mai')
                 )
                //console.log(khuyenmai)
            })
    }

    CapNhatKhuyenMai_save(req,res,next)
    {
        //res.send(req.body)
        var ngaybd = new Date(req.body.ngaybd)
        var ngaykt = new Date(req.body.ngaykt)
        var soluong = parseInt(req.body.sl)
        var phantram = parseInt(req.body.demo1)
        var dieukien = parseInt(req.body.demo3)
        var trangthai = req.body.trangthai

        khuyenmais.updateOne({makm: req.body.makm},{
            makm: req.body.makm,
            manhap: req.body.manhap+req.body.makm,
            noidung: req.body.noidung,
            trangthai: trangthai,
            phantram: phantram,
            dieukien: dieukien,
            ngaybd: ngaybd,
            ngaykt: ngaykt,
            sl: soluong,
        })
        .then(khuyenmais =>{
            res.redirect('/admin/quan-ly-khuyen-mai/cap-nhat-khuyen-mai/' + req.body.makm)
        })
    }

    xoakhuyenmai(req,res,next)
    {
        khuyenmais.deleteOne({makm: req.query.makm})
            .then(res.redirect('/admin/quan-ly-khuyen-mai'))
    }

    //---------------------------------------------------------------------------------------------------------------------------------------------------

    
    //---Quan ly thong ke----
    Ql_ThongKe(req,res,next)
    {
                client_account.count({}, function(err,count)
                {
                    var dulieuthongke=[{
                        sosachdaban: 0,
                        sodondathang: 0,
                        soluongtaikhoan: 0,
                        doanhthu: 0,}]

                    dulieuthongke[0].soluongtaikhoan = count

                            donhang.find({})
                                .then(donhang =>
                                {
                                    for(var i=0;i<donhang.length;i++)
                                    {
                                        if(donhang[i].tinhtrangthanhtoan==="Đã thanh toán")
                                        {
                                            dulieuthongke[0].doanhthu+=parseInt(donhang[i].tongtien)
                                        }
                                        var listbook = donhang[i].ds_sach
                                        for(var k=0;k<listbook.length;k++)
                                        {
                                            dulieuthongke[0].sosachdaban+=listbook[k].soluong
                                        }
                                    }
                                    dulieuthongke[0].sodondathang=donhang.length


                                    books.find().distinct('theloai')
                                        .then(theloais =>
                                        {
                                            var arraySoluong=[]
                                            for(var i=0;i<theloais.length;i++)
                                            {
                                                arraySoluong[i] = new Object()
                                                arraySoluong[i].theloai=theloais[i]
                                                arraySoluong[i].soluong=0
                                            }

                                            for(var i=0;i<donhang.length;i++)
                                            {
                                                var listbook = donhang[i].ds_sach
                                                for(var k=0;k<listbook.length;k++)
                                                {
                                                    var temp=listbook[k].theloai
                                                    for(var h=0;h<arraySoluong.length;h++)
                                                    {
                                                        if(arraySoluong[h].theloai===temp)
                                                        {
                                                            arraySoluong[h].soluong+=listbook[k].soluong
                                                        }
                                                    }
                                                }
                                            }
                                            res.render('thongke',{layout: 'admin.handlebars',dulieuthongke: dulieuthongke, admin_account: req.session.username, theloai: arraySoluong})
                                        })
                                })
                            
                        })

    }



    //---Quan lu van chuyen-----
    Ql_VanChuyen(req,res,next)
    {
        donhang.find({})
        .then(donhang => {
            donhang = donhang.map(course => course.toObject())
            res.render('vanchuyen',{layout: 'admin.handlebars', admin_account: req.session.username, donhang: donhang})
        })
    }

    capnhatvc(req,res,next)
    {
       
        const ngaycn = new Date().getTime();
        var list_review = req.body.review;
        var list_madh = req.body.madh;
        var index =  0, review = '', madh = '';
        for(var i=0; i < list_review.length; i++)
            {
               if(list_review[i] != ''){
                    review = list_review[i];
                    index = i;
               }
            }
        
            madh = list_madh[index];

        console.log(list_review, review, index, madh)
        donhang.updateOne({"madh": madh},
            {"tinhtrangdonhang": req.body.tinhtrang, "phanhoi": review, "ngaycapnhat": ngaycn
        })
        .then(() => 
        {
            res.redirect('/admin/quan-ly-van-chuyen')
        });
    }


    chitietdonhang(req,res,next)
    {
        donhang.find({madh: req.params.slug})
            .then(donhang =>{
                    console.log(donhang)
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
                                res.render('vanchuyen',{layout: 'admin.handlebars',khachhang: client_account,donhang: donhang, ds_sach: donhang[0].ds_sach, tinhtien: tinhtien,  admin_account: req.session.username})
                            })

                        //console.log(tinhtien)
                        
                    })
            })
    }
}

module.exports = new Admin_Control