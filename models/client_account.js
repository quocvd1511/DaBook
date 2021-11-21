const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const client_account = new Schema({
    matk: String,
    email: String,
    matkhau: String,
    ngaytao: {type: Date, default: Date.now},
    diem: Number,
    tinhtrang: String,
    danhsach_km: {
      makm: String,
    },
    diachigh: {
      diachi: String,
    },
    diachigoc: String,
    gioitinh: String,
    sodt: String,
    giohang: {
      tensach: String,
      giaban: Number,
      hinhanh: String,
      soluong: Number,
    },
    sl_giohang: Number,
  });
  
module.exports = mogoose.model('client_accounts',client_account)