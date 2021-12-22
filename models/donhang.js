const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const donhang = new Schema({
    madh: String,
<<<<<<< HEAD
    ngaylap: {type: Date, default: Date.now},
=======
    ngaylap: {type: Date, default: Date.now, transform: v => v.getDate() + "/" + v.getMonth() + "/" + v.getFullYear()},
>>>>>>> 088b502eaf9e673b40164d309fa0540b80a8d4f2
    matk: String,
    hinhthucthanhtoan: String,
    vanchuyen: String,
    makm: Array,
    tongtien: Number,
    tiengiam: Number,
    thongtinnguoinhan: String,
    tinhtrangthanhtoan: String,
    tinhtrangdonhang: String,
<<<<<<< HEAD
    ds_sach: [{
      masach: String,
      tensach: String,
      giaban: Number,
      giagiam: Number,
      hinhanh: String,
      soluong: Number,
    }],
=======
    ds_sach: Array
>>>>>>> 088b502eaf9e673b40164d309fa0540b80a8d4f2
  });
  
module.exports = mogoose.model('donhangs',donhang)