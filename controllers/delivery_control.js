class Delivery_Control{
    main(req,res)
    {
        res.render('temp_delivery', {layout: 'delivery.handlebars'})
    }
}

module.exports = new Delivery_Control