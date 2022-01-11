const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const khuyenmai = new Schema({
    makm:String,
    phantram:Number,
    loai:String,
    noidung:String,
    ngaykt:{type: Date,
      transform: v => v.getDate() + "/" + (v.getMonth()+1) + "/" + v.getFullYear()
    },
    ngaybd: {type: Date, 
      transform: v => v.getDate() + "/" + (v.getMonth()+1) + "/" + v.getFullYear()},
    sl:Number,
    manhap:String,
    dieukien:Number,
    daluu:Number,
    trangthai: {type: String, default: 'Đang mở'},
    img: {type: String, default: 'https://cdn2.iconfinder.com/data/icons/solid-black-labels/128/sale_copy-512.png'}
  });
  
module.exports = mogoose.model('khuyenmais',khuyenmai)





