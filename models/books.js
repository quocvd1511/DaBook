const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const Book = new Schema({
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