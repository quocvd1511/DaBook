const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const khuyenmai = new Schema({
    makm:String,
    phantram:Number,
    loai:String,
    noidung:String,
    ngaybd:Date,
    ngaykt:Date,
    sl:Number,
    manhap:String,
    dieukien:Number,
    daluu:Number,
  });
  
module.exports = mogoose.model('khuyenmais',khuyenmai)