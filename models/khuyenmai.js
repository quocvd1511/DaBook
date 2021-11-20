const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const khuyenmai = new Schema({
    makm:String,
    phantram:Number,
    loai:String,
    noidung:String,
    ngaykt:{type: Date,
      transform: v => v.getDate() + "/" + v.getMonth() + "/" + v.getFullYear()
    },
    ngaybd: Date,
    sl:Number,
    manhap:String,
    dieukien:Number,
    daluu:Number,
  });
  
module.exports = mogoose.model('khuyenmais',khuyenmai)