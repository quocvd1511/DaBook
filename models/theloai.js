const mogoose = require('mongoose')
const Schema = mogoose.Schema;
const ObjectId=Schema.ObjectId

const Theloai = new Schema({
  tentheloai: String,
  soluongdaban: String,
  doanhthu: String,
  });

module.exports = mogoose.model('Theloai',Theloai)