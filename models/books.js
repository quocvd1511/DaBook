const mogoose = require('mongoose')
const Schema = mogoose.Schema;
const ObjectId=Schema.ObjectId

const Book = new Schema({
  _id:ObjectId,
  masach:String,
  tensach:String,
  tacgia: String,
  theloai:String,
  nxb:String,
  namxb:String,
  khuvuc:String,
  ngonngu:String,
  hinhanh:String,
  hinhthuc:String,
  giaban:String,
  mota:String,
  soluongton:String,
  });
  
module.exports = mogoose.model('Book',Book)