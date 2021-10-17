const mogoose = require('mongoose')
const Schema = mogoose.Schema;
const ObjectId=Schema.ObjectId

const Book = new Schema({
<<<<<<< HEAD
  masach:String,
  tensach:String,
  tacgia: String,
=======
  sachtrongnuoc:String,
  nhom:String,
>>>>>>> 5f5896b7cd4a7c526a8d230ce59c560bf905a40d
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