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
    
    // Tìm kiếm theo bộ lọc
    search(req,res,next)
    {   
         // lấy giá trị của key name trong query parameters gửi lên
            books.find({ $or :[
                { 'giaban' : {'$regex' : req.query.name , '$options' : 'i'}},
                { 'nxb' :  {'$regex' : req.query.name , '$options' : 'i'}}
               // { 'ngonngu' :  {'$regex' : req.query.name , '$options' : 'i'}}
            ]})
            .then(books => 
                {
                    books=books.map(course => course.toObject())
                    res.render('search_client.handlebars',{layout:'search.handlebars',books});
                })
            .catch(next)
    }
}
//layout:'client.handlebars', 

module.exports = new Client_Control