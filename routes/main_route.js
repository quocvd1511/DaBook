const express= require('express')
const route =  express.Router()

const adminRouter = require('../routes/admin_route')
const clientRouter = require('../routes/client_route')
const deliveryRoute = require('../routes/delivery_route')

function router(app)
{
    app.use('/admin',adminRouter)
    app.use('/delivery',deliveryRoute)
    app.use('/',clientRouter)
}


module.exports = router