const { urlencoded, json } = require('express')
const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars')
const path = require('path')
const route = require('./routes/main_route')
const connect_db = require('./src/config/db/db_connect')
const passport = require("passport")
const FacebookStrategy = require("passport-facebook").Strategy

connect_db.connect()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(passport.initialize())
// app.use(passport.session())


// passport.serializeUser(function(user, done) {
//   done(null, user)
// })
// passport.deserializeUser(function(user, done) {
//   done(null, user)
// })

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: "Client ID",
//       clientSecret: "Client Secret",
//       callbackURL: "http://localhost:3000/auth/facebook/callback",
//     },
//     function(accessToken, refreshToken, profile, cb) {
//       return cb(null, profile)
//     }
//   )
// )
// app.get("/auth/facebook", passport.authenticate("facebook"))
// app.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/" }),
//   function(req, res) {
//     console.log("req", req.user)
//     res.render("data", {
//       user: req.user,
//     })
//   }
// )

// app.get("/", (req, res) => {
//   res.render(res.render("home_client.hanlebars", { layout: 'client_handlebars',username: req.user}))
// })

route(app)

app.engine('handlebars',
        handlebars({
          extname: '.handlebars',
          helpers:{
            "when": function(conditional, options) {
              if (conditional > 22) {
                return options.fn(this);
              }else {
                return options.inverse(this);
            }
            },
            "if": function(conditional, options) {
              if (conditional) {
                return options.fn(this);
              }else {
                return options.inverse(this);
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