class Client_Control{
    main(req,res)
    {
            res.render('temp_client', {layout: 'client.handlebars'})
          
    }
}

module.exports = new Client_Control