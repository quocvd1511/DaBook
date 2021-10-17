const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const Book = new Schema({
  book_list: String,
  giaban:String, 
  hinhanh_src:String,
  hinhthuc:String,
  mini2_subhome:String,
  mini_subhome:String,
  mota:String,
  namxb:String,
  ngonngu:String,
  nxb:String,
  subhome:String,
  tacgia:String,
  tensach:String,
  });
  
module.exports = mogoose.model('Book',Book)