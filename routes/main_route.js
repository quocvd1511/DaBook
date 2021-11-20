const express= require('express')
const route =  express.Router()
const session = require('express-session')
const passport = require("passport")

const adminRouter = require('../routes/admin_route')
const clientRouter = require('../routes/client_route')
const deliveryRoute = require('../routes/delivery_route')
const faceRoute = require('../routes/facebook_route')

function router(app)
{
    app.use(session({
        secret: 'dabook',
        resave: false,
        saveUninitialized: false,
    }))
    app.use(passport.initialize())
    app.use(passport.session())    
    app.use('/auth',faceRoute)
    app.use('/admin',adminRouter)
    app.use('/delivery',deliveryRoute)
    app.use('/',clientRouter)
}
module.exports = router