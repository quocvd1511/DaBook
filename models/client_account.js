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
      hoten: String,
      sdt: String,
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
      soluong: Number,
    }],
    sl_giohang: Number,
    diachi: {type: String, default: ""},
    ngaysinh: String,
  });
  
module.exports = mogoose.model('client_accounts',client_account)