const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const client_account = new Schema({
    matk: String,
    hoten: String,
    email: {type: String, default: ""},
    matkhau: String,
    ngaytao: {type: Date, default: Date.now,  transform: v => v.getDate() + "/" + v.getMonth() + "/" + v.getFullYear()},
    diem: Number,
    tinhtrang: String,
    danhsach_km: Array,
    diachigh: {
      diachi: String,
    },
    diachigoc:{
      type: Array ,  default: ["","","",""]
    },
    gioitinh: String,
    sodt: String,
    giohang: [{
      masach: String,
      tensach: String,
      giaban: Number,
      hinhanh: String,
      SoLuong: Number,
    }],
    sl_giohang: Number,
    diachi: {type: String, default: ""}
  });
  
module.exports = mogoose.model('client_accounts',client_account)