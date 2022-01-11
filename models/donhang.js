const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const donhang = new Schema({
    madh: String,
    ngaylap: {type: Date, default: Date.now, transform: v => v.getDate() + "/" + (v.getMonth()+1) + "/" + v.getFullYear()},
    matk: String,
    hinhthucthanhtoan: String,
    vanchuyen: String,
    makm: [{
      phantram: String,
      manhap: String,
      ngaykt: String,
    }],
    tongtien: Number,
    tiengiam: Number,
    thongtinnguoinhan: String,
    tinhtrangthanhtoan: String,
    tinhtrangdonhang: String,
    ds_sach: [{
      masach: String,
      tensach: String,
      giaban: Number,
      giagiam: Number,
      hinhanh: String,
      soluong: Number,
      theloai: String,
    }],
    phanhoi: Array,
    ngaycapnhat: Date,
  });
  
module.exports = mogoose.model('donhangs',donhang)