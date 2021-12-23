const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const khuyenmai = new Schema({
    makm:String,
    phantram:Number,
    loai:String,
    noidung:String,
    ngaykt:{type: Date,
      transform: v => v.getDate() + "-" + v.getMonth() + "-" + v.getFullYear()
    },
    ngaybd: Date,
    sl:Number,
    manhap:String,
    dieukien:Number,
    daluu:Number,
    img: {type: String, default: 'https://cdn2.iconfinder.com/data/icons/solid-black-labels/128/sale_copy-512.png'}
  });
  
module.exports = mogoose.model('khuyenmais',khuyenmai)





