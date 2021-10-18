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

    search(req,res,next)
    {   
         // lấy giá trị của key name trong query parameters gửi lên
            books.find({ $or:[
                {'tacgia':{$in: [req.query.name]}},
                {'tensach':{$in: [req.query.name]}}
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