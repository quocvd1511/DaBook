const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars')
const path = require('path')


app.engine('handlebars',handlebars())
app.set('view engine','handlebars')
app.set('views',[__dirname + '\\src\\views\\views_admin',__dirname + '\\src\\views\\views_client',__dirname + '\\src\\views\\views_shiper'])

app.use(express.static(path.join(__dirname,'src\\public')))


app.get('/', (req, res) => {
  res.render('temp_client', {layout: 'client.handlebars'})
})

app.get('/admin', (req, res) => {
  res.render('temp_admin', {layout: 'admin.handlebars'})
})


app.get('/shiper', (req, res) => {
  res.render('temp_shiper', {layout: 'shiper.handlebars'})
})





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})