const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const donhang = new Schema({
    madh: String,
    matk: String,
    tinhtrang: String,
    diachigh: String,
    ds_sach: {
      tensach: String,
      giaban: Number,
      hinhanh: String,
      soluong: Number,
    },
    sl_sach: Number,
    makm: String,
    giamgia: Number,
    phigiaohang: Number,
    ngaydat: {type: Date, default: Date.now},
    ngaygiao: Date,
    tongtien: Number,
  });
  
module.exports = mogoose.model('donhangs',donhang)