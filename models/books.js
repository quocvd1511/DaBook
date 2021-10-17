const mogoose = require('mongoose')
const Schema = mogoose.Schema;
const ObjectId=Schema.ObjectId

const Book = new Schema({
  sachtrongnuoc:String,
  nhom:String,
  theloai:String,
  danhsach:String,  
  hinhanh:String,
  tensach:String,
  tacgia:String,
  nxb:String,
  namxb:String,
  hinhthuc:String,
  mota:String,
  giaban:String, 
  giamgia:String,
  sodanhgia:String,
  sobinhchon:String,
  });

module.exports = mogoose.model('Book',Book)