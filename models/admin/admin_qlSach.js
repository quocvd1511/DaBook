const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const Sach = new Schema({
    MaSach: String,
    TenSach: String,
    MaTL: String,
    GiaTien: String,
    MaTG: String,
    MaNXB: String,
    SLTon: String,
    NamXB: String,
    MaHD: String,
    SLDBan: String,
    KhuVuc: String,
    NgonNgu: String,
    PTGiam: String,
  });
  
module.exports = mogoose.model('Sach',Sach)