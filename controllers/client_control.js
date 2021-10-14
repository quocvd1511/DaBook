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
                    res.render('home_client.handlebars',{layout:'client.handlebars', books})
                })
            .catch(next)
    }
}

module.exports = new Client_Control