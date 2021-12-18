const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const khuyenmai = new Schema({
    makm:String,
    phantram:Number,
    loai:String,
    noidung:String,
    ngaykt: String,
    ngaybd: String,
    sl:Number,
    manhap:String,
    dieukien:Number,
    daluu:Number,
  });
  
module.exports = mogoose.model('khuyenmais',khuyenmai)