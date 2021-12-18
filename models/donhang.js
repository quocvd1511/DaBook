const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const donhang = new Schema({
    madh: String,
    ngaylap: String,
    matk: String,
    hinhthucthanhtoan: String,
    vanchuyen: String,
    makm: Array,
    tongtien: Number,
    thongtinnguoinhan: String,
    tinhtrangthanhtoan: String,
    tinhtrangdonhang: String,
    ds_sach: {
      tensach: String,
      giaban: Number,
      hinhanh: String,
      soluong: Number,
    },
  });
  
module.exports = mogoose.model('donhangs',donhang)