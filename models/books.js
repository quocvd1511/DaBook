const mogoose = require('mongoose')
const Schema = mogoose.Schema;
const ObjectId=Schema.ObjectId

const Book = new Schema({
  _id:ObjectId,
  subhome:String,
  mini_subhome:String,
  mini2_subhome: String,
  book_list:String,
  hinhanh_src:String,
  tensach:String,
  tacgia:String,
  nxb:String,
  namxb:String,
  ngonngu:String,
  hinhthuc:String,
  giaban:String,
  mota:String,
  });
  
module.exports = mogoose.model('Book',Book)