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
const { session } = require('passport')
const { Strategy } = require('passport-facebook')

connect_db.connect()


//--Tạo API with facebook
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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
            }, 
            'ifCond': function (v1, operator, v2, options) {
              switch (operator) {
                  case '==':
                      return (v1 == v2) ? options.fn(this) : options.inverse(this);
                  case '===':
                      return (v1 === v2) ? options.fn(this) : options.inverse(this);
                  case '!=':
                      return (v1 != v2) ? options.fn(this) : options.inverse(this);
                  case '!==':
                      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                  case '<':
                      return (v1 < v2) ? options.fn(this) : options.inverse(this);
                  case '<=':
                      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                  case '>':
                      return (v1 > v2) ? options.fn(this) : options.inverse(this);
                  case '>=':
                      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                  case '&&':
                      return (v1 && v2) ? options.fn(this) : options.inverse(this);
                  case '||':
                      return (v1 || v2) ? options.fn(this) : options.inverse(this);
                  default:
                      return options.inverse(this);
              }
          },
          'pagination': function(currentPage, totalPage, size, options) {
            var startPage, endPage, context;
          
            if (arguments.length === 3) {
              options = size;
              size = 5;
            }
          
            startPage = currentPage - Math.floor(size / 2);
            endPage = currentPage + Math.floor(size / 2);
          
            if (startPage <= 0) {
              endPage -= (startPage - 1);
              startPage = 1;
            }
          
            if (endPage > totalPage) {
              endPage = totalPage;
              if (endPage - size + 1 > 0) {
                startPage = endPage - size + 1;
              } else {
                startPage = 1;
              }
            }
          
            context = {
              startFromFirstPage: false,
              pages: [],
              endAtLastPage: false
            };
            if (startPage === 1) {
              context.startFromFirstPage = true;
            }
            for (var i = startPage; i <= endPage; i++) {
              context.pages.push({
                page: i,
                isCurrent: i === currentPage
              });
            }
            if (endPage === totalPage) {
              context.endAtLastPage = true;
            }
          
            return options.fn(context);
          }
        }        
}));

app.set('view engine', 'handlebars')
app.set('views', [__dirname + '\\src\\views\\views_admin', __dirname + '\\src\\views\\views_client', __dirname + '\\src\\views\\views_delivery'])

app.use(express.static(path.join(__dirname, 'src/public')))


//----Connect with facebook-----------------------
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(function(user, done) {
  done(null, user)
})
passport.deserializeUser(function(user, done) {
  done(null, user)
})
passport.use(
  new FacebookStrategy(
    {
      clientID: "1585513025115259",
      clientSecret: "6eba2961329ccbcdad2a580bcc184eab",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile)
    }
  )
)
app.get("/auth/facebook", passport.authenticate("facebook"))
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  function(req, res) {
    req.session.username=req.session.passport.user.id
    req.session.isAuth=true
    res.redirect('/')
  }
)
//--------------------------------------------------------





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})