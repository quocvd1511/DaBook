const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const client_account = new Schema({
    MaTK: String,
    TenTK: String,
    Matkhau: String,
    NgayTao: String,
    Diem: String,
    TinhTrang: String,
  });
  
module.exports = mogoose.model('client_accounts',client_account)