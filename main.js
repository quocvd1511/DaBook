const { urlencoded, json } = require('express')
const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars')
const path = require('path')
const route = require('./routes/main_route')
const connect_db = require('./src/config/db/db_connect')

connect_db.connect()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


route(app)

app.engine('handlebars',
        handlebars({
          extname: '.handlebars',
          helpers:{
            "if": function(conditional, options) {
              if (conditional > 40) {
                return options.fn(this);
              }
            }
          }
}));
app.set('view engine', 'handlebars')
app.set('views', [__dirname + '\\src\\views\\views_admin', __dirname + '\\src\\views\\views_client', __dirname + '\\src\\views\\views_delivery'])

app.use(express.static(path.join(__dirname, 'src/public')))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})