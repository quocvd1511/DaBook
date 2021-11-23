const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const giohang = new Schema({
    matk: String,
    diachigh: String,
    ds_sach: {
      tensach: String,
      giaban: Number,
      hinhanh: String,
      soluong: Number,
    },
    sl_sach: Number,
    tongtien: Number,
  });
  
module.exports = mogoose.model('giohangs',giohang)