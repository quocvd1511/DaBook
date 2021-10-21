const admin_login = require('../models/admin_account')
const books=require('../models/books')
const {multipleMongooseToObject} = require('../util/mongoose.js')
const {mongooseToObject} = require('../util/mongoose.js')

class Client_Control
{
    main(req,res,next)
    {
        books.find({})
            .then(books => 
                {
                    books=books.map(course => course.toObject())
                    res.render('home_client.handlebars',{layout:'client.handlebars',books
                    });
                })
            .catch(next)
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
                    res.render('home_client.handlebars',{layout:'client.handlebars',books});
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
                    res.render('home_client.handlebars',{layout:'client.handlebars',books});
                })
            .catch(next)
    }
    
    // Tìm kiếm theo bộ lọc {$lt: req.query.giaban}
    searchBL(req,res,next)
    {   
       
       if(req.query.giaban === "50000") {
        books.find({$and :[
            { giaban : {
                $lt: "50.000"
            }},
           { nxb :  { $in: req.query.nxb}}
            ]})
         .then(books => 
        {
            books=books.map(course => course.toObject())
            res.render('home_client.handlebars',{layout:'client.handlebars',books});
        })
        .catch(next)
        } else if(req.query.giaban === "100000") {
                books.find({$and :[
                     { giaban : {
                         $gte:"50.000",
                         $lt: "100.000"
                     }},
                    { nxb :  { $in: req.query.nxb}}
                ]})
        .then(books => 
        {
            books=books.map(course => course.toObject())
            res.render('home_client.handlebars',{layout:'client.handlebars',books});
        })
            .catch(next)
        } else if (req.query.giaban === "150000") {
            books.find({$and :[
             { giaban : {
                 $gte:"100.000",
                 $lt: "150.000"
             }},
              { nxb :  { $in: req.query.nxb}}
         ]})
            .then(books => 
             {
                    books=books.map(course => course.toObject())
                    res.render('home_client.handlebars',{layout:'client.handlebars',books});
                })
            .catch(next)
        } else if (req.query.giaban === "200000") {
            books.find({$and :[
            { giaban : {
                 $gte:"150.000",
                 $lt: "200.000"
             }},
        { nxb :  { $in: req.query.nxb}}
         ]})
         .then(books => 
             {
                 books=books.map(course => course.toObject())
                 res.render('home_client.handlebars',{layout:'client.handlebars',books});
              })
            .catch(next)
        } else {
            books.find({$and :[
             { giaban : {
                   $gte: "200.000"
                 }},
                 { nxb :  { $in: req.query.nxb}}
             ]})
             .then(books => 
                {
                   books=books.map(course => course.toObject())
                   res.render('home_client.handlebars',{layout:'client.handlebars',books});
                 })
            .catch(next)
            }
    }

}
//layout:'client.handlebars', 
// if(req.query.giaban === "50000") {
//     books.find({giaban : "59220"})
//     .then(books => 
//         {
//             books=books.map(course => course.toObject())
//             res.render('home_client.handlebars',{layout:'client.handlebars',books});
//         })
//     .catch(next)
// } else if(req.query.giaban == 100000) {
//     books.find({$and :[
//        { giaban : {
//             $gte:"50.000",
//             $lt: "100.000"
//         }},
//         { nxb :  { $in: req.query.nxb}}
//     ]})
//     .then(books => 
//         {
//             books=books.map(course => course.toObject())
//             res.render('home_client.handlebars',{layout:'client.handlebars',books});
//         })
//     .catch(next)
//   } else if (req.query.giaban == "150000") {
//     books.find({$and :[
//        { giaban : {
//             $gte:"100.000",
//             $lt: "150.000"
//         }},
//         { nxb :  { $in: req.query.nxb}}
//     ]})
//     .then(books => 
//         {
//             books=books.map(course => course.toObject())
//             res.render('home_client.handlebars',{layout:'client.handlebars',books});
//         })
//     .catch(next)
//   } else if (req.query.giaban == 200000) {
//     books.find({$and :[
//        { giaban : {
//             $gte:"150.000",
//             $lt: "200.000"
//         }},
//         { nxb :  { $in: req.query.nxb}}
//     ]})
//     .then(books => 
//         {
//             books=books.map(course => course.toObject())
//             res.render('home_client.handlebars',{layout:'client.handlebars',books});
//         })
//     .catch(next)
//   } else {
//     books.find({$and :[
//         { giaban : {
//              $gte: "200.000"
//          }},
//          { nxb :  { $in: req.query.nxb}}
//      ]})
//      .then(books => 
//          {
//              books=books.map(course => course.toObject())
//              res.render('home_client.handlebars',{layout:'client.handlebars',books});
//          })
//      .catch(next)
//   }
// }

module.exports = new Client_Control