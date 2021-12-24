const client_login = require('../models/client_account')
const books=require('../models/books')
const {multipleMongooseToObject} = require('../util/mongoose.js')
const {mongooseToObject} = require('../util/mongoose.js')
const client_account = require('../models/client_account')
const khuyenmai = require('../models/khuyenmai')
const giohang = require('../models/giohang')
const donhang = require('../models/donhang')
const { json } = require('express')
const { redirect } = require('express/lib/response')



class Client_Control
{
    main(req,res,next)
    {
        //console.log(req.session)
        books.find({'giamgia': {$gte: 22}},
            function (err,flash_sales){
                if(!err)
                {
                    flash_sales=flash_sales.map(course => course.toObject())
                    client_login.findOne({'matk': req.session.username}).then((thongtintk => {
                    thongtintk=mongooseToObject(thongtintk);
                    books.find({}, function(err,temp_book)
                    {
                        temp_book=temp_book.map(course => course.toObject())
                        const page = parseInt(req.query.page)
                        books.find({}).limit(36).skip(36*page)
                        .then(books => 
                            {
                                books=books.map(course => course.toObject())
                                res.render('home_client.handlebars',{layout:'client.handlebars',client_accounts: thongtintk, flash_sales: flash_sales, books: books, sl_sach: temp_book });     
                            })
                        .catch(next) 
                    })
                    }))           
                } else {
                    next(err)
                }
            })   
    }

      
    // POST signup
    signup(req, res, next){
        const formData = req.body;
        formData.diem = 0;
        formData.tinhtrang = "Đang sử dụng";
        formData.diachigoc = "";
        formData.gioitinh = "";
        formData.sodt = "";
        formData.sl_giohang = 0;

        const Client_account = new client_account(formData);
        Client_account.save()
            .then(() => res.redirect('/'))
            .catch(error => {});
        
    }

    // Logout account
    logout(req,res,next)
    {
        req.session.destroy()
        res.redirect('/')
    }

    // Login account
    post_client(req,res,next)
    {
        client_login.findOne( {$or: [{matk: req.body.username},{email: req.body.username}], matkhau: req.body.password}, 
            function (err,client_account){
                if(!err)
                {
                    if(Boolean(client_account)==false) {
                        res.redirect('/')
                    }
                    else 
                    {    
                        req.session.username=client_account.matk;
                        req.session.isAuth=true;
                        res.redirect('/')                 
                    }
                } else {
                    next(err)
                }
            })
    }

    // Login with facebook
    auth_facebook_callback(req,res)
    {
        console.log(req.session.passport);
        req.session.username=req.session.passport.user.id
        req.session.isAuth=true
        client_account.findOne({matk: req.session.username}, 
            function (err, Client_account)
            {
                if(Boolean(Client_account)==false)
                {
                    const new_client=
                    {
                        // matk: req.session.username,
                        // email: "none",
                        // diem: 0,
                        // tinhtrang: "Đang sử dụng",
                        // sodt: "none",
                        matk: req.session.username,
                        email: "",
                        diem: 0,
                        tinhtrang: "Đang sử dụng",
                        diachigoc: "",
                        gioitinh: "",
                        sodt: "",
                        sl_giohang: 0,
                    }

                    const Client_account = new client_account(new_client);
                    Client_account.save()
                    .then(() => res.redirect('/'))
                    .catch(error => {});
                }
            })
        res.redirect('/')
    }

    get_client(req,res,next)
    {
        res.redirect('/')
    }

    // Tìm kiếm theo tên sách, tác giả
    search(req,res,next)
    {   
         // lấy giá trị của key name trong query parameters gửi lên
         if(req.session.isAuth) 
         {
            client_login.findOne({'matk': req.session.username}).then((thongtintk => {
                thongtintk=mongooseToObject(thongtintk);
                books.find({ $or :[
                    { 'tensach' : {'$regex' : req.query.name , '$options' : 'i'}},
                    { 'tacgia' :  {'$regex' : req.query.name , '$options' : 'i'}}
                ]})
                .then(books => 
                    { 
                        books=books.map(course => course.toObject())
                        res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1, client_accounts:thongtintk});
                    })
                .catch(next)}))     
         }else{
            books.find({ $or :[
                { 'tensach' : {'$regex' : req.query.name , '$options' : 'i'}},
                { 'tacgia' :  {'$regex' : req.query.name , '$options' : 'i'}}
            ]})
            .then(books => 
                { 
                    books=books.map(course => course.toObject())
                    res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                })
            .catch(next)
         }
    }

    // Tìm kiếm theo danh sách các thể loại
    searchTL(req,res,next)
    {   
            if(req.session.isAuth) {
                client_login.findOne({'matk': req.session.username}).then((thongtintk => {
                    thongtintk=mongooseToObject(thongtintk);
                    books.find(
                        {'theloai':{'$regex' : req.params.value , '$options' : 'i'}}
                    )
                    .then(books => 
                        {
                            books=books.map(course => course.toObject())
                            res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1, client_accounts: thongtintk});
                        })
                    .catch(next)}))     
             }else{
                books.find(
                    {'theloai':{'$regex' : req.params.value , '$options' : 'i'}}
                )
                .then(books => 
                    {
                        books=books.map(course => course.toObject())
                        res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                    })
                .catch(next)
             }
    }
    
    // Tìm kiếm theo bộ lọc
    searchBL(req,res,next)
    {
        if(req.query.giaban && req.query.nxb && req.query.ngonngu){
            if(req.query.giaban === "50000") {
             books.find({$and :[
                 { giaban : {
                     $lt: 50
                 }},
                { nxb :  { $in: req.query.nxb}},
                { ngonngu :  { $in: req.query.ngonngu}}
                 ]}).limit(30).skip(30*1)
              .then(books => 
             {
                 books=books.map(course => course.toObject())
                 res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
             }).limit(30).skip(30*1)
             .catch(next)
             } else if(req.query.giaban === "100000") {
                     books.find({$and :[
                          { giaban : {
                              $gte:"50",
                              $lt: "100"
                          }},
                         { nxb :  { $in: req.query.nxb}},
                         { ngonngu :  { $in: req.query.ngonngu}}
                     ]}).limit(30).skip(30*1)
             .then(books => 
             {
                 books=books.map(course => course.toObject())
                 res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
             }).limit(30).skip(30*1)
                 .catch(next)
             } else if (req.query.giaban === "150000") {
                 books.find({$and :[
                  { giaban : {
                      $gte:"100",
                      $lt: "150"
                  }},
                   { nxb :  { $in: req.query.nxb}},
                   { ngonngu :  { $in: req.query.ngonngu}}
              ]}).limit(30).skip(30*1)
                 .then(books => 
                  {
                         books=books.map(course => course.toObject())
                         res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                     })
                 .catch(next)
             } else if (req.query.giaban === "200000") {
                 books.find({$and :[
                 { giaban : {
                      $gte:"150",
                      $lt: "200"
                  }},
             { nxb :  { $in: req.query.nxb}},
             { ngonngu :  { $in: req.query.ngonngu}}
              ]}).limit(30).skip(30*1)
              .then(books => 
                  {
                      books=books.map(course => course.toObject())
                      res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                   })
                 .catch(next)
             } else {
                 books.find({$and :[
                  { giaban : {
                        $gte: "200"
                      }},
                      { nxb :  { $in: req.query.nxb}},
                      { ngonngu :  { $in: req.query.ngonngu}}
                  ]}).limit(30).skip(30*1)
                  .then(books => 
                     {
                        books=books.map(course => course.toObject())
                        res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                      })
                 .catch(next)
                 }
        } else if(!req.query.giaban && req.query.nxb && req.query.ngonngu){
            books.find({$and :[
                    { nxb :  { $in: req.query.nxb}},
                    { ngonngu :  { $in: req.query.ngonngu}}
                ]}).limit(30).skip(30*1)
                .then(books => 
                   {
                      books=books.map(course => course.toObject())
                      res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                    })
               .catch(next)
            }
            else if(!req.query.giaban && !req.query.nxb && req.query.ngonngu){
                books.find(
                        { ngonngu :  { $in: req.query.ngonngu}}
                    ).limit(30).skip(30*1)
                    .then(books => 
                       {
                          books=books.map(course => course.toObject())
                          res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                        })
                   .catch(next)
                }
                else if(!req.query.giaban && req.query.nxb && !req.query.ngonngu){
                    books.find(
                            { nxb :  { $in: req.query.nxb}}
                        ).limit(30).skip(30*1)
                        .then(books => 
                           {
                              books=books.map(course => course.toObject())
                              res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                            })
                       .catch(next)
                    }
                else if(req.query.giaban && req.query.nxb && !req.query.ngonngu){
                    if(req.query.giaban === "50000") {
                        books.find({$and :[
                            { giaban : {
                                $lt: "50"
                            }},
                            { nxb :  { $in: req.query.nxb}},
                            ]}).limit(30).skip(30*1)
                            .then(books => 
                        {
                            books=books.map(course => course.toObject())
                            res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                        })
                        .catch(next)
                } else if(req.query.giaban === "100000") {
                        books.find({$and :[
                                { giaban : {
                                    $gte:"50",
                                    $lt: "100"
                                }},
                            { nxb :  { $in: req.query.nxb}}
                        ]}).limit(30).skip(30*1)
                .then(books => 
                {
                    books=books.map(course => course.toObject())
                    res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                })
                    .catch(next)
                } else if (req.query.giaban === "150000") {
                    books.find({$and :[
                        { giaban : {
                            $gte:"100",
                            $lt: "150"
                        }},
                        { nxb :  { $in: req.query.nxb}}
                    ]}).limit(30).skip(30*1)
                    .then(books => 
                        {
                            books=books.map(course => course.toObject())
                            res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                        })
                    .catch(next)
                } else if (req.query.giaban === "200000") {
                    books.find({$and :[
                    { giaban : {
                            $gte:"150",
                            $lt: "200"
                        }},
                { nxb :  { $in: req.query.nxb}}
                    ]}).limit(30).skip(30*1)
                    .then(books => 
                        {
                            books=books.map(course => course.toObject())
                            res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                        })
                    .catch(next)
                } else {
                    books.find({$and :[
                        { giaban : {
                            $gte: "200"
                            }},
                            { nxb :  { $in: req.query.nxb}}
                        ]}).limit(30).skip(30*1)
                        .then(books => 
                        {
                            books=books.map(course => course.toObject())
                            res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                            })
                    .catch(next)
                    }
            }
            else if(req.query.giaban && !req.query.nxb && req.query.ngonngu){
                if(req.query.giaban === "50000") {
                    books.find({$and :[
                        { giaban : {
                            $lt: "50"
                        }},
                        { ngonngu :  { $in: req.query.ngonngu}}
                        ]}).limit(30).skip(30*1)
                        .then(books => 
                    {
                        books=books.map(course => course.toObject())
                        res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                    })
                    .catch(next)
                    } else if(req.query.giaban === "100000") {
                            books.find({$and :[
                                    { giaban : {
                                        $gte:"50",
                                        $lt: "100"
                                    }},
                                { ngonngu :  { $in: req.query.ngonngu}}
                            ]}).limit(30).skip(30*1)
                    .then(books => 
                    {
                        books=books.map(course => course.toObject())
                        res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                    })
                        .catch(next)
                    } else if (req.query.giaban === "150000") {
                        books.find({$and :[
                            { giaban : {
                                $gte:"100",
                                $lt: "150"
                            }},
                            { ngonngu :  { $in: req.query.ngonngu}}
                        ]}).limit(30).skip(30*1)
                        .then(books => 
                            {
                                books=books.map(course => course.toObject())
                                res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                            })
                        .catch(next)
                    } else if (req.query.giaban === "200000") {
                        books.find({$and :[
                        { giaban : {
                                $gte:"150",
                                $lt: "200"
                            }},
                    { ngonngu :  { $in: req.query.ngonngu}}
                        ]}).limit(30).skip(30*1)
                        .then(books => 
                            {
                                books=books.map(course => course.toObject())
                                res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                            })
                        .catch(next)
                    } else {
                        books.find({$and :[
                            { giaban : {
                                $gte: "200"
                                }},
                                { ngonngu :  { $in: req.query.ngonngu}}
                            ]}).limit(30).skip(30*1)
                            .then(books => 
                            {
                                books=books.map(course => course.toObject())
                                res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                                })
                        .catch(next)
                        }
            }
            else if(req.query.giaban && !req.query.nxb && !req.query.ngonngu){
                if(req.query.giaban === "50000") {
                    books.find({giaban : {
                        $lt: 50
                    }}    
                ).limit(30).skip(30*1)
                    .then(books => 
                    {
                            books=books.map(course => course.toObject())
                            res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                        })
                    .catch(next)
                    } else if(req.query.giaban === "100000") {
                        books.find({giaban : {
                            $gte: 50,
                            $lt: 100
                        }}    
                    ).limit(30).skip(30*1)
                        .then(books => 
                        {
                                books=books.map(course => course.toObject())
                                res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                            })
                        .catch(next)
                    } else if (req.query.giaban === "150000") {
                        books.find({giaban : {
                                $gte:"100",
                                $lt: "150"
                            }}    
                        ).limit(30).skip(30*1)
                        .then(books => 
                            {
                                books=books.map(course => course.toObject())
                                res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                            })
                        .catch(next)
                    } else if (req.query.giaban === "200000") {
                        books.find({ giaban : {
                                $gte:"150",
                                $lt: "200"
                            }
                    }).limit(30).skip(30*1)
                        .then(books => 
                            {
                                books=books.map(course => course.toObject())
                                res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                            })
                        .catch(next)
                    } else {
                        books.find({ giaban : {
                                $gte: "200"
                                }
                            }).limit(30).skip(30*1)
                            .then(books => 
                            {
                                books=books.map(course => course.toObject())
                                res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1});
                                })
                        .catch(next)
                        }
            }
    }

    // Khuyến mãi
    dskhuyenmai(req,res,next)
    {
        if(req.session.isAuth) {
            client_login.findOne({'matk': req.session.username}).then((thongtintk => {
                thongtintk=mongooseToObject(thongtintk);
                khuyenmai.find({})
        .then(khuyenmai => 
            {
                khuyenmai=khuyenmai.map(course => course.toObject())
                res.render('khuyenmai_client.handlebars',{layout:'client.handlebars',khuyenmai: khuyenmai, client_accounts: thongtintk});
            })
        .catch(next)}))     
         }else{
            khuyenmai.find({})
        .then(khuyenmai => 
            {
                khuyenmai=khuyenmai.map(course => course.toObject())
                res.render('khuyenmai_client.handlebars',{layout:'client.handlebars',khuyenmai: khuyenmai});
            })
        .catch(next)
         }
    }

    // Chi tiết sách
    chitietsach(req,res,next)
    {
        //console.log(req.sessionID)
        const query = books.findOne({ 'tensach': req.params.tensach });
        query.exec(function (err, book) {
            if(!err)
                {
                    if(Boolean(book)==false) {
                        res.redirect('/')
                    }
                    else 
                    {    
                    book = mongooseToObject(book);
                    let date = new Date(book.namxb);
                    let dateString;
                   
                    // chuyển về đúng định dạng ngày tháng năm
                    if(date.getDate() != 0 && date.getMonth() != 0 &&date.getFullYear() != 0){
                        dateString = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
                    } else if(date.getDate() === 0) {
                        dateString =  date.getMonth() + "-" + date.getFullYear()
                    }else if(date.getMonth() === 0){
                        dateString =  date.getFullYear()
                    } else dateString = "2021"
                    
                    if(req.session.isAuth) 
                    {
                        client_login.findOne({'matk': req.session.username}).then((thongtintk => {
                            thongtintk=mongooseToObject(thongtintk);
                            books.find({theloai: book.theloai}).limit(10).skip(10*1)
                    .then(list_book => 
                    {
                        list_book=list_book.map(course => course.toObject())
                        res.render('chitietsach_client.handlebars',{layout:'client.handlebars',books: book, list_books: list_book, Date: dateString, client_accounts: thongtintk});
                    })
                    .catch(next)   }))     
                     }else{
                        books.find({theloai: book.theloai}).limit(10).skip(10*1)
                    .then(list_book => 
                    {
                        list_book=list_book.map(course => course.toObject())
                        res.render('chitietsach_client.handlebars',{layout:'client.handlebars',books: book, list_books: list_book, Date: dateString});
                    })
                    .catch(next)   
                     }          
                    }
                } else {
                    next(err)
                }
            })
    }

    //phân trang cũ
    get_pagination(req, res, next){
    var perPage = 30; // số lượng sản phẩm xuất hiện trên 1 page
    var page2, page3, page4;
    let page = Number(req.params.page);
    var number = req.params.number;
    
    if(number == 2){
        page2 = page + 1;
        page3 = page + 2;
        page4 = page + 3;
    }else if(number == 3){
        page3 = page;
        page2 = page - 1;
        page4 = page + 1;
    }else if(number == 4){
        page3 = page -1;
        page2 = page - 2;
        page4 = page;
    }else if(page == 28){
        page4 = page;
        page2 = page - 2;
        page3 = page - 1;
    }
    if(number == 6){
        page2 = page - 1;
        page3 = page;
        page4 = page + 1;
    }
    if(number == -6){
        page2 = page - 2;
        page3 = page - 1;
        page4 = page;
    }
    
    books.find({'giamgia': {$gte: 22}},
    function (err,flash_sales){
        if(!err)
        {
            flash_sales=flash_sales.map(course => course.toObject());
           
                    books.find({}).limit(perPage).skip((perPage * page) - perPage)
                    .then(books => 
                        {
                            books=books.map(course => course.toObject())
                            res.render('home_client.handlebars',{layout:'client.handlebars', flash_sales: flash_sales, books: books, CurrentPage: req.params.page, CountPage: 28, Number2:page2, Number3: page3, Number4: page4});     
                        })
                    .catch(next) 
           
                
        } else {
            next(err)
        }
    })   
    }

    //lưu khuyến mãi
    luukhuyenmai(req,res,next){
        if(req.session.isAuth){
        client_login.updateOne({"matk": req.session.username}, 
        { $push: { "danhsach_km":  {"manhap": req.query.manhap, "phantram": req.query.phantram, "ngaykt": req.query.ngaykt}}
        //{"manhap": req.params.manhap, "ngaykt": req.params.ngaykt, "phantram": req.params.phantram}
            })
            .then(() => 
            {
                khuyenmai.updateOne({"manhap": req.query.manhap},
                { $inc: {"sl": -1, "daluu": + 1}}).then(()=>{
                    res.redirect('/khuyenmai');
                })    
            })
        }else{
            res.redirect('/khuyenmai');
        }
            // if(req.session.isAuth){
            //     client_login.updateOne({"matk": req.session.username}, 
            //         { $push: { "danhsach_km":  {"manhap": req.body.manhap, "phantram": req.body.phantram, "ngaykt": req.body.ngaykt}}
            //     })
            //     .then(() => 
            //     {
            //         khuyenmai.updateOne({"manhap": req.body.manhap},
            //         { $inc: {"sl": -1, "daluu": + 1}}).then(()=>{
            //             res.redirect('/khuyenmai');
            //         })    
            //     })
            // }else{
            //     res.redirect('/khuyenmai');
            // }
    }


    //xem chi tiết tài khoản
    chitiettk(req,res,next){

        client_login.findOne({'matk': req.session.username})
        .then(thongtintk =>
            {
                thongtintk=mongooseToObject(thongtintk);
                donhang.find({'matk': req.session.username})
                .then(donhang => {

                    donhang=donhang.map(course => course.toObject())
                res.render('taikhoan.handlebars',{layout: 'client.handlebars', client_accounts: thongtintk, thongtin: thongtintk, donhang: donhang})
                })

            })

        .catch(next)

    }

    // thêm vào giỏ hàng
    themgiohang(req,res,next)
    {
        req.session.username=req.body.matk
        req.session.isAuth = true
        //console.log(req.body.matk)
        //req.body = JSON.parse(req.body)
       //console.log(req.body)
       client_account.findOne({'matk': req.body.matk})
        .then(thongtintk =>
            {
                //console.log(thongtintk)
                var cart = thongtintk.giohang
                var flag=false
                for(var i=0; i<cart.length;i++)
                {
                    if(cart[i].tensach===req.body.tensach)
                    {
                        flag=true
                        cart[i].soluong+=req.body.soluong
                    }
                }
                if(flag===true)
                {
                    client_account.updateOne({'matk': req.session.username},{'giohang': cart})
                        .then(res.send('Update'))
                }
                else
                {
                    client_account.updateOne({"matk": req.session.username},
                    { $push: { "giohang": {"tensach": req.body.tensach, "giaban": req.body.giaban, "hinhanh": req.body.hinhanh, "soluong": req.body.soluong}}, 
                    $inc: {"sl_giohang": +1}
                    })
                        .then(res.send('Add'))
                }
            })
        // client_account.updateOne({"matk": req.session.username},
        //     { $push: { "giohang": {"tensach": req.body.tensach, "giaban": req.body.giaban, "hinhanh": req.body.hinhanh, "soluong": req.body.soluong}}, 
        //     $inc: {"sl_giohang": +1}
        // })
        // .then(() => 
        // {
        // const tongtien = req.body.giaban * req.body.soluong;

        // giohang.find({"matk": req.session.username}).exec(function(err, docs) {
        //     if (docs.length){
        //         giohang.updateOne({"matk": req.session.username},
        //         { $push: { "ds_sach": {"tensach": req.body.tensach, "giaban": req.body.giaban, "hinhanh": req.body.hinhanh, "soluong": req.body.soluong}}, 
        //         $inc: {"sl_sach": +1, "tongtien": + tongtien}
        //         })
        //         .then(() => 
        //         {
        //             res.redirect('/chitietsach/' + req.body.tensach);
        //         }).catch(next)
        //     } else {
        //         const newgiohang = new giohang({
        //             matk: req.session.username,
        //             sl_sach: 1,
        //             tongtien: tongtien,
        //             $push: {"ds_sach": {"tensach": req.body.tensach, "giaban": req.body.giaban, "hinhanh": req.body.hinhanh, "soluong": req.body.soluong}},
        //             diachigh: req.body.diachigh,
        //         });
                
        //         newgiohang.save(function (err, gh) {
        //             if (err) return console.error(err);
        //             res.redirect('/chitietsach/' + req.body.tensach)
        //           });
        //       }
        //     });
        // });
    }

    //xem chi tiết giỏ hàng
    chitietgiohang(req,res,next){
                client_login.findOne({'matk': req.session.username})
                .then(thongtintk => 
                    {
                        thongtintk=mongooseToObject(thongtintk);
                        giohang.findOne({'matk': req.session.username}).then(gh =>{
                            gh=mongooseToObject(gh);
                            res.render('cart_client.handlebars',{layout: 'client.handlebars', client_accounts: thongtintk, giohang: gh})         
                        })
                    })
                    .catch(next)
    }

    // áp dụng khuyến mãi
    nhapkhuyenmai(req,res,next)
    {

        client_login.find({"danhsach_km": {"makm": req.query.makm}})
        .then(() => 
            {
                client_login.updateOne({"matk": req.session.username}, 
                { $pull: { "danhsach_km": {"makm": req.query.makm }}
                })
                .then(() => 
                {
                client_login.findOne({'matk': req.session.username})
                .then(thongtintk => 
                    {
                        thongtintk=mongooseToObject(thongtintk);
                        khuyenmai.findOne({'makm': req.query.makm})
                        .then(makm =>
                        {
                            makm=mongooseToObject(makm);
                            res.render('cart_client.handlebars',{layout: 'client.handlebars', client_accounts: thongtintk, makhuyenmai: makm})           
                        })
                        .catch(next)       
                    })
                    .catch(next)
                                    
                })  
                 
            })
            .catch(next)
        
    }

    // thanh toán đơn hàng
    taohoadon(req,res,next)
    {
        // client_login.findOne({'matk': req.session.username})
        // .then(thongtintk => 
        //     {
        //         thongtintk=mongooseToObject(thongtintk);
        //         res.render('payment.handlebars',{layout: 'client.handlebars', client_accounts: thongtintk})            })
        //     .catch(next)
        donhang.find({})
            .then(donhang_x =>{
                //console.log(donhang)
                var MangTien = JSON.parse(req.body.data)
                //console.log(MangTien)
                var TongTien=0
                for(var i=0;i<MangTien.length;i++)
                {
                    TongTien+=parseInt(MangTien[i].TongTien)
                }
                 var n = donhang_x.length
                 if(n!=0)
                 {
                    var code = donhang_x[n-1].madh
                    code = code.substring(2,5)
                    var madh="dh00"+(parseInt(code)+1).toString()
                    var ThanhToan = ''
                    var TinhTrangThanhToan =''
                    if(req.body.value==='first')
                    {
                        ThanhToan = "Trực tiếp"
                        TinhTrangThanhToan = "Chưa thanh toán"
                    } 
                    else
                    {
                        ThanhToan = "Trực tuyến"
                        TinhTrangThanhToan = "Đã thanh toán"
                    }
                    var FormData=
                    {
                        ds_sach: MangTien,
                        matk: req.session.username,
                        madh: madh,
                        hinhthucthanhtoan: 'Trực tiếp',
                        tinhtrangthanhtoan: 'Chưa thanh toán',
                        tinhtrangdonhang: 'chờ xác nhận',
                        tongtien: TongTien
                    }
                    //console.log(FormData)
                    FormData = new donhang(FormData)
                    FormData.save()
                 } else
                 {
                    var madh="dh00"+(1).toString()
                    var ThanhToan = ''
                    var TinhTrangThanhToan =''
                    if(req.body.value==='first')
                    {
                        ThanhToan = "Trực tiếp"
                        TinhTrangThanhToan = "Chưa thanh toán"
                    } 
                    else
                    {
                        ThanhToan = "Trực tuyến"
                        TinhTrangThanhToan = "Đã thanh toán"
                    }
                    var FormData={
                        ds_sach: MangTien,
                        matk: req.session.username,
                        madh: madh,
                        hinhthucthanhtoan: 'Trực tiếp',
                        tinhtrangthanhtoan: 'Chưa thanh toán',
                        tinhtrangdonhang: 'chờ xác nhận',
                        tongtien: TongTien
                    }

                    FormData = new donhang(FormData)
                    FormData.save()

                 }

                 client_account.find({'matk': req.session.username})
                    .then(client_account =>{
                        res.render('payment.handlebars',{layout: 'client.handlebars',client_accounts: client_account, sach: MangTien})
                    })
            })

        
    }

    thanhtoan(req,res,next)
    {
        if(req.session.isAuth)
        {
            client_account.findOne({'matk': req.session.username})
                .then(client_account => 
                {
                    var MangSach = JSON.parse(req.body.data)
                    var SoLuong =0
                    var ThanhTien=0
                    for(var i=0;i<MangSach.length;i++)
                    {
                        SoLuong+=parseInt(MangSach[i].SoLuong)
                        ThanhTien+=parseInt(MangSach[i].TongTien)
                    }
                    SoLuong=SoLuong.toString()
                    ThanhTien=ThanhTien.toString()
                    var shipday = new Date()
                    shipday.setDate(shipday.getDate() + 4)
                    var ShipDay = new Date(shipday)
                    ShipDay = ShipDay.getDate().toString() + '/' + ShipDay.getMonth().toString()+ '/' + ShipDay.getFullYear().toString()
                    client_account=mongooseToObject(client_account)
                    res.render('payment.handlebars',{layout: 'client.handlebars',client_accounts: client_account, sach: MangSach, tongtien: ThanhTien ,soluong: SoLuong, thanhtien: ThanhTien, shipday: ShipDay})
                })
        } else res.redirect('/')
    }

    binhluan(req,res,next)
    {
        if(req.session.isAuth)
        {
            const ngay = new Date().getDate();
            const thang = new Date().getMonth();
            const nam = new Date().getFullYear();
            const ngaybl = ngay + "-" + thang + "-" + nam; 
            console.log(ngaybl, req.query.star)
            books.updateOne({"tensach": req.query.tensach},
                { $push: { "review": {"matk": req.session.username, "noidung": req.query.review, "sosao": req.query.star, "ngaybl": ngaybl}},
                $inc: {"danhgia": +1}
            })
            .then(() => 
            {
                res.redirect('/chitietsach/' + req.query.tensach)
            });
        } else {
            res.redirect('/chitietsach/' + req.query.tensach)
        }
    }

    capnhattk(req,res,next)
    {
        console.log(req.body.email, req.body.phone, req.body.sex)
        const ngaysinh = req.body.day + "/" + req.body.month + "/" + req.body.year
        client_account.updateOne({"matk": req.session.username},
            { "email": req.body.email,
              "sodt": req.body.phone,
              "gioitinh": req.body.sex,
              "ngaysinh": ngaysinh,
        })
        .then(() => 
        {
            res.redirect('/chitiettk')
        });
        // console.log(req.query.email)
        // res.json(req.query.email)
    }

    themdiachi(req,res,next){
        console.log(req.body.hoten, req.body.sodt, req.body.diachi)
        client_account.updateOne({"matk": req.session.username},
        { $push: { "diachigh": {"hoten": req.body.hoten, "sdt": req.body.sodt, "diachi": req.body.diachi}}
        })
        .then(() => 
        {
            res.redirect('/chitiettk')
        });
    }

    capnhatmatkhau(req,res,next)
    {
        console.log(req.body.matkhau)
        client_account.updateOne({"matk": req.session.username},
            { "matkhau": req.body.matkhau,
        })
        .then(() => 
        {
            res.redirect('/chitiettk')
        });
    }

    capnhatgiohang(req,res,next)
    {
        client_account.findOne({'matk': req.body.matk})
            .then(thongtintk =>{
                var cart = thongtintk.giohang
                for(var i=0;i<cart.length;i++)
                {
                    if(cart[i].tensach===req.body.tensach)
                    {
                        cart[i].soluong=req.body.soluong
                    }
                }
                client_account.updateOne({'matk': req.body.matk},{'giohang': cart})
                 .then(res.send('OK'))
                
            })
    }

    xoagiohang(req,res,next)
    {
        req.session.username=req.body.matk
        req.session.isAuth=true
        client_account.findOne({'matk': req.body.matk})
            .then(thongtintk =>
            {
                //console.log(thongtintk)
                var cart = thongtintk.giohang
                for(var i=0;i<cart.length;i++)
                if(cart[i].tensach===req.body.tensach)
                {
                    cart.splice(i,1)
                    break
                }
                client_account.updateOne({'matk': req.body.matk},{giohang: cart, $inc: {sl_giohang: -1}})
                .then(res.send('OK'))
            })
    }
}

module.exports = new Client_Control