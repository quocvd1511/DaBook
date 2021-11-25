const { urlencoded, json } = require('express')
const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars')
const path = require('path')
const route = require('./routes/main_route')
const connect_db = require('./src/config/db/db_connect')
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
            "chanle": function(conditional, options) {
              if (conditional%2 == 0) {
                return options.fn(this);
              }else {
                return options.inverse(this);
            }
            }
            , 
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
          },
          'tinhtien': function (v1, operator, v2, options) {
            switch (operator) {
                case '+':
                    return (v1 + v2);
                case '-':
                    return (v1 - v2);
                case '*':
                    return (v1 * v2);
                case '/':
                    return (v1 / v2);
                case '%':
                    return (v1 * v2 / 100);
               
            }
          },
          'total': function(arr) {
            const s = 0;
            for(const i=0; i<arr.length; i++) {
              s = s + arr[i];
            }
            return s;
          }
        }        
}));

app.set('view engine', 'handlebars')
app.set('views', [__dirname + '\\src\\views\\views_admin', __dirname + '\\src\\views\\views_client', __dirname + '\\src\\views\\views_delivery'])

app.use(express.static(path.join(__dirname, 'src/public')))





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})