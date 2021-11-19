const client_login = require('../models/client_account')
const books=require('../models/books')
const {multipleMongooseToObject} = require('../util/mongoose.js')
const {mongooseToObject} = require('../util/mongoose.js')
const client_account = require('../models/client_account')
const khuyenmai = require('../models/khuyenmai')


class Client_Control
{
    main(req,res,next)
    {
        if(req.session.isAuth) {
            books.find({'giamgia': {$gte: 22}},
            function (err,flash_sales){
                if(!err)
                {
                    flash_sales=flash_sales.map(course => course.toObject())
                    books.find({}).limit(20).skip(20*1)
                    .then(books => 
                        {
                            books=books.map(course => course.toObject())
                            res.render('home_client.handlebars',{layout:'client.handlebars',client_accounts: req.session.username, flash_sales: flash_sales, books: books, CurrentPage: 1});     
                        })
                    .catch(next)            
                } else {
                    next(err)
                }
            })   
        }else{
            books.find({'giamgia': {$gte: 22}},
            function (err,flash_sales){
                if(!err)
                {
                    flash_sales=flash_sales.map(course => course.toObject())
                    books.find({}).limit(20).skip(20*1)
                    .then(books => 
                        {
                            books=books.map(course => course.toObject())
                            res.render('home_client.handlebars',{layout:'client.handlebars', flash_sales: flash_sales, books: books, CurrentPage: 1});     
                        })
                    .catch(next)            
                } else {
                    next(err)
                }
            })   
        }
    }
      
    // POST signup
    signup(req, res, next){
        const formData = req.body;
        formData.diem = 0;
        formData.makm = 0;
        formData.diachigh = '';
        formData.sodt = '';
        formData.tinhtrang = 'đang sử dụng';

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
        client_login.findOne({$or: [{matk: req.body.username},{email: req.body.username}], matkhau: req.body.password}, 
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

    get_client(req,res,next)
    {
        res.redirect('/')
    }

    // Tìm kiếm theo tên sách, tác giả
    search(req,res,next)
    {   
         // lấy giá trị của key name trong query parameters gửi lên
            books.find({ $or :[
                { 'tensach' : {'$regex' : req.query.name , '$options' : 'i'}},
                { 'tacgia' :  {'$regex' : req.query.name , '$options' : 'i'}}
            ]})
            .then(books => 
                {
                    books=books.map(course => course.toObject())
                    res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1, client_accounts: req.session.username});
                })
            .catch(next)
    }

    // Tìm kiếm theo danh sách các thể loại
    searchTL(req,res,next)
    {   
            books.find(
                {'theloai':{'$regex' : req.params.value , '$options' : 'i'}}
            )
            .then(books => 
                {
                    books=books.map(course => course.toObject())
                    res.render('search_client.handlebars',{layout:'client.handlebars',books: books, CurrentPage: 1, client_accounts: req.session.username});
                })
            .catch(next)
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
        khuyenmai.find({})
        .then(khuyenmai => 
            {
                khuyenmai=khuyenmai.map(course => course.toObject())
                console.log(khuyenmai);
                res.render('khuyenmai_client.handlebars',{layout:'client.handlebars',khuyenmai: khuyenmai, client_accounts: req.session.username});
            })
        .catch(next)
    }
    
    // Giỏ hàng
    get_giohang(req,res,next)
    {
        client_login.findOne({'matk': req.session.username})
        .then(thongtintk => 
            {
                thongtintk=mongooseToObject(thongtintk);
                res.render('cart_client.handlebars',{layout: 'client.handlebars', client_accounts: req.session.username, thongtin: thongtintk})           
            })
        .catch(next)
        
    }

    // Chi tiết sách
    chitietsach(req,res,next)
    {
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
              
                    books.find({theloai: book.theloai}).limit(10).skip(10*1)
                    .then(list_book => 
                    {
                        list_book=list_book.map(course => course.toObject())
                        res.render('chitietsach_client.handlebars',{layout:'client.handlebars',books: book, list_books: list_book, Date: dateString, client_accounts: req.session.username});
                    })
                    .catch(next)             
                    }
                } else {
                    next(err)
                }
            })
    }

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

    search_pagination(req, res, next){
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
            books.find({}).limit(perPage).skip((perPage * page) - perPage)
            .then(books => 
                {
                    books=books.map(course => course.toObject())
                    res.render('search_client.handlebars',{layout:'client.handlebars', books: books, CurrentPage: req.params.page, CountPage: 28, Number2:page2, Number3: page3, Number4: page4});     
                })
            .catch(next) 
                  
        }

    luukhuyenmai(req,res,next){
        client_login.findOneAndUpdate({'matk':req.session.username}, {
            $push: { 'danhsach_km': req.params.value }
        })
        .then(() => 
        {
            res.redirect('/khuyenmai')
        })
    }

    chitiettk(req,res,next){
        client_login.findOne({'matk': req.session.username})
        .then(thongtintk => 
            {
                thongtintk=mongooseToObject(thongtintk);
                res.render('taikhoan.handlebars',{layout: 'client.handlebars', client_accounts: req.session.username, thongtin: thongtintk})
            })
        .catch(next)
    }
}

module.exports = new Client_Control