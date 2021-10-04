class Admin_Control{
    main(req,res)
    {
            res.render('temp_admin', {layout: 'admin.handlebars'})  
    }
}

module.exports = new Admin_Control